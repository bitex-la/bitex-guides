#!/usr/local/bin/ruby -w

require 'digest'
require 'json'
require 'open-uri'

class Stats
    def initialize 
        @btc_address_counter = 0
        @bch_address_counter = 0
        @deposits = Hash.new
        @withdrawals = Hash.new
        @matches = Hash.new
        @transfers = Hash.new
    end        

    def self._print_dic(d)
        d.each do |key, value| 
            puts("#{key}: #{value}")
        end
    end

    def show
        puts("Total number of registered BTC addresses: #{@btc_address_counter}")
        puts("Total number of registered BCH addresses: #{@bch_address_counter}")
        puts("Total amount of deposits:")
        self.class._print_dic(@deposits)
        puts("Total amount of withdrawals:")
        self.class._print_dic(@withdrawals)
        puts("Total volume operated (Matches):")
        self.class._print_dic(@matches)
        puts("Total transferred between Bitex.la users:")
        self.class._print_dic(@transfers)
    end

    def _process_match(d)
        code = d["orderbook_code"]
        if code.include? "btc_"
            matches["btc"] += d["seller_given"]
        elsif code.include? "_btc"
            matches["btc"] += d["buyer_given"]
        elsif code.include? "bch_"
            matches["bch"] += d["seller_given"]
        elsif code.include? "_bch"
            matches["bch"] += d["buyer_given"]
        end
    end

    def process(raw_data)
        raw_data.split(/\n+/).each do |line| 
            d = JSON.parse(line)

            if d["type"] == "bitcoin_address"
                @btc_address_counter += 1
            elsif d["type"] == "bcash_address"
                @bch_address_counter += 1
            elsif d["type"] == "cash_deposit"
                @deposits[d["fiat_code"]] += d["gross_amount"]
            elsif d["type"] == "coin_deposit"
                @deposits[d["coin_code"]] += d["amount"]
            elsif d["type"] == "cash_withdrawal"
                @withdrawals[d["fiat_code"]] += d["gross_amount"]
            elsif d["type"] == "coin_withdrawal"
                @withdrawals[d["coin_code"]] += d["amount"]
            elsif d["type"] == "match"
                self._process_match(d)
            elsif d["type"] == "transfer"
                @transfers[d["currency_code"]] += d["sent"]
            end
        end
    end
end

def hash_contents(contents)
    return Digest::SHA256.hexdigest contents
end

def blockchain_verify(transaction_id, content_hash_digest)
    url_str = "https://api.blockchair.com/bitcoin-cash/raw/transaction/#{transaction_id}"
    data = URI.parse(url_str).read
    json_response = JSON.parse(data)

    scriptPubKey_asm = json_response["data"][transaction_id]["decoded_raw_transaction"]["vout"][1]["scriptPubKey"]["asm"]
    return scriptPubKey_asm == "OP_RETURN 186116122 #{content_hash_digest}"
end

def process_attestation(data, stats)
    attestation_id = data["id"]
    attrs = data["attributes"]
    transaction_id = attrs["transaction_id"]
    content_hash_digest = attrs["content_hash_digest"]
    file_url = attrs["file_url"]
    file_data = URI.parse(file_url).read

    calculated_content_hash_digest = hash_contents(file_data)
    if content_hash_digest != calculated_content_hash_digest
        puts("File content does not match with the attestated hash digest for attestation_id: #{attestation_id}, #{content_hash_digest} != #{calculated_content_hash_digest}")
        return false
    end

    if not blockchain_verify(transaction_id, content_hash_digest)
        puts("Blockchain verification failed for attestation_id: #{attestation_id}")
        return false
    end

    stats.process(file_data)
    return true
end

def explore_bitex_notarial(per_page = 10)
    page_number = 0
    stats = Stats.new

    while (true)
        url_str = "https://bitex.la/api/notarial_attestations?page[number]=#{page_number}&page[size]=#{per_page}"
        data = URI.parse(url_str).read
        json_response = JSON.parse(data)

        data_all = json_response["data"]
        break if data_all.length == 0 # we finished

        for data in data_all
            print(".")
            return unless process_attestation(data, stats)
        end
        page_number += 1
    end

    stats.show()
    puts stats
end

explore_bitex_notarial()