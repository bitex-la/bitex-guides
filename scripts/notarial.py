#!/usr/bin/python3

import hashlib
import json
import requests

class Stats:
    def __init__(self):
        self.btc_address_counter = 0
        self.bch_address_counter = 0
        self.deposits = {}
        self.withdrawals = {}
        self.matches = {}
        self.transfers = {}

    @classmethod
    def _print_dic(cls, d):
        for key, value in d.items():
            print(f'{key}: {value}')

    def show(self):
        print(f'Total number of registered BTC addresses: {self.btc_address_counter}')
        print(f'Total number of registered BCH addresses: {self.bch_address_counter}')
        print('Total amount of deposits:')
        self._print_dic(self.deposits)
        print('Total amount of withdrawals:')
        self._print_dic(self.withdrawals)
        print('Total volume operated (Matches):')
        self._print_dic(self.matches)
        print('Total transferred between Bitex.la users:')
        self._print_dic(self.transfers)

    def _process_match(self, d):
        code = d['orderbook_code']
        if "btc_" in code:
            self.matches["btc"] += d['seller_given']
        elif "_btc" in code:
            self.matches["btc"] += d['buyer_given']
        elif "bch_" in code:
            self.matches["bch"] += d['seller_given']
        elif "_bch" in code:
            self.matches["bch"] += d['buyer_given']

    def process(self, raw_data):
        lines = raw_data.splitlines()

        for line in lines:
            d = json.loads(line)

            if d['type'] == 'bitcoin_address':
                self.btc_address_counter += 1
            elif d['type'] == 'bcash_address':
                self.bch_address_counter += 1
            elif d['type'] == 'cash_deposit':
                self.deposits[d['fiat_code']] += d['gross_amount']
            elif d['type'] == 'coin_deposit':
                self.deposits[d['coin_code']] += d['amount']
            elif d['type'] == 'cash_withdrawal':
                self.withdrawals[d['fiat_code']] += d['gross_amount']
            elif d['type'] == 'coin_withdrawal':
                self.withdrawals[d['coin_code']] += d['amount']
            elif d['type'] == 'match':
                self._process_match(d)
            elif d['type'] == 'transfer':
                self.transfers[d['currency_code']] += d['sent']

def hash_contents(contents):
    return hashlib.sha256(str(contents).encode('utf-8')).hexdigest()

def blockchain_verify(transaction_id, content_hash_digest):
    url_str = f'https://api.blockchair.com/bitcoin-cash/raw/transaction/{transaction_id}'
    r = requests.get(url_str)
    if r.status_code != 200:
        print(f'{url_str} returns status code {r.status_code}')
        return False

    json_response = r.json()
    scriptPubKey_asm = json_response['data'][transaction_id]['decoded_raw_transaction']['vout'][1]['scriptPubKey']['asm']
    return scriptPubKey_asm == f'OP_RETURN 186116122 {content_hash_digest}'

def process_attestation(data, stats):
    attestation_id = data['id']
    attrs = data['attributes']
    transaction_id = attrs['transaction_id']
    content_hash_digest = attrs['content_hash_digest']
    file_url = attrs['file_url']

    r_file = requests.get(file_url)
    if r_file.status_code != 200:
        print(f'{file_url} returns status code {r_file.status_code}')
        return False

    calculated_content_hash_digest = hash_contents(r_file.text)
    if content_hash_digest != calculated_content_hash_digest:
        print(f'File content does not match with the attestated hash digest for attestation_id: {attestation_id}, {content_hash_digest} != {calculated_content_hash_digest}')
        return False

    if not blockchain_verify(transaction_id, content_hash_digest):
        print(f'Blockchain verification failed for attestation_id: {attestation_id}')
        return False

    stats.process(r_file.text)
    return True

def explore_bitex_notarial(per_page = 10):
    page_number = 0
    stats = Stats()

    while (True):
        url_str = f'https://bitex.la/api/notarial_attestations?page[number]={page_number}&page[size]={per_page}'
        r = requests.get(url_str)
        if r.status_code != 200:
            print(f'{url_str} returns status code {r.status_code}')
            return

        json_response = r.json()
        data_all = json_response['data']
        if len(data_all) == 0:
            # we finished
            break

        for data in data_all:
            print('.', end='', flush=True)
            if not process_attestation(data, stats):
                return
        
        page_number += 1

    stats.show()

def main():
    explore_bitex_notarial()

if __name__ == "__main__":