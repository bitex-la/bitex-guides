const client = require('./HttpClient')
const sleep = require('await-sleep')
/**
 * In this example, we will create a new user, who will be under our own
 * management.
 * This goes under the Reseller program, so in order to get into that program,
 * you should contact us at comercial@bitex.la with your use case and
 * requirements.
 * 
 * The user creation is done in several steps, to carefully analyse the data you
 * provide.
 * 
 * After you submit the user profile, you can get the observations in the
 * Webhook Url provided. (Step 1)
 * You will also get a notification there when the user gets accepted.
 */

const API_URL = 'https://bitex.la/api'
const YOUR_API_KEY = 'whitelabel_api_key'

async function main() {
  //STEP 1: Configure the webhook
  console.log(`Setting up the webhook`)
  let response = await client.post(`${API_URL}/webhooks`, {
    "data": {
      "type": "webhooks",
      "attributes": {
        "url": "https://webhooktest.com/"
      }
    }
  },
  {
    headers: { 'Authorization': YOUR_API_KEY }
  })
  console.log(`Finished setting up the webhook`)

  //STEP 2: Create a new user
  console.log(`Creating a new user`)
  let user = await client.post(`${API_URL}/users`, {
    "data": {
      "type": "users",
      "attributes": {
        "email": "test2@whitelabeler.com",
        "password": "password"
      }
    }
  },
  {
    headers: { 'Authorization': YOUR_API_KEY }
  })
  console.log(`User created with id: ${user.data.data.id}`)

  /**
   * ¡¡¡¡¡¡¡¡¡¡   IMPORTANT   !!!!!!!!!!
   * From this point, you should perform the requests as the user you just
   * created. In order to do that, you should add the `user` parameter in the
   * Authorization header.
   */
  const userHeaders = {
    'Authorization': `${YOUR_API_KEY} ;user=${user.data.data.id}`
  }

  /**
   * STEP 3: Create a Natural Docket
   * 
   * A Natural Docket is a model of basic information for registering a human
   * being (not a company).
   */
  console.log(`Creating a Natural Docket`)
  let naturalDocket = await client.post(`${API_URL}/natural_docket_seeds`, {
    "data": {
      "type": "natural_docket_seeds",
      "attributes": {
        "first_name": "John",
        "last_name": "Doe",
        "nationality": "AR",
        "gender_code": "male",
        "marital_status_code": "single",
        "politically_exposed": false,
        "birth_date": "1990-12-31"
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Natural Docket created`)

  /**
   * STEP 4: Create an Identification
   * 
   * An Identification is a document that certifies your identity. It must be
   * sent along an attachment with pictures of it.
   */
  console.log(`Creating an Identification`)
  let identification = await client.post(`${API_URL}/identification_seeds`, {
    "data": {
      "type": "identification_seeds",
      "attributes": {
        "identification_kind_code": "national_id",
        "issuer": "AR",
        "number": "12345678"
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Identification created`)

  //STEP 4.1: Create an Identification Attachment
  console.log(`Creating an attachment for the Identification`)
  let identificationAttachment = await client.post(`${API_URL}/attachments`, {
    "data": {
      "type": "attachments",
      "attributes": {
        "document":
          "ENCODED FILE IN BASE64. eg: data:image/jpeg;base64,/9j/4AAQSkZJR...",
        "document_file_name": "idfront.jpg",
        "document_content_type": "image/jpeg",
        "document_file_size": 8391
      },
      "relationships": {
        "attached_to_seed": {
          "data": {
            "id": identification.data.data.id,
            "type": "identification_seeds"
          }
        }
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Identification attachment created`)

  /**
   * STEP 5: Create a Domicile
   * 
   * A Domicile corresponds to an address. It must be sent along an attachment
   * that demonstrates it (such as a police certificate or a bill to your name
   * sent to that address).
   */
  console.log(`Creating a Domicile`)
  let domicile = await client.post(`${API_URL}/domicile_seeds`, {
    "data": {
      "type":"domicile_seeds",
      "attributes": {
        "city": "CABA",
        "country": "AR",
        "floor": "0",
        "postal_code": "1001",
        "street_address": "Balcarce",
        "street_number": "50"
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Domicile created`)

  //STEP 5.1: Create a Domicile Attachment
  console.log(`Creating an attachment for the Domicile`)
  let domicileAttachment = await client.post(`${API_URL}/attachments`, {
    "data": {
      "type": "attachments",
      "attributes": {
        "document":
          "ENCODED FILE IN BASE64. eg: data:image/jpeg;base64,/9j/4jsFL2ZJR...",
        "document_file_name": "electricitybill.jpg",
        "document_content_type": "image/jpeg",
        "document_file_size": 618
      },
      "relationships": {
        "attached_to_seed": {
          "data": {
            "id": domicile.data.data.id,
            "type": "domicile_seeds"
          }
        }
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Domicile attachment created`)

  /**
   * STEP 6: Create an Email
   * There are four kind of emails you can add: 'work', 'personal', 'invoicing'
   * and 'authentication'
   */
  console.log(`Creating an Email`)
  let email = await client.post(`${API_URL}/email_seeds`, {
    "data": {
      "type":"email_seeds",
      "attributes": {
        "address": "person@example.com",
        "email_kind_code": "invoicing"
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Email created`)

  /**
   * STEP 7: Create Invoicing Details
   * In this example, we will create Argentinian Invoicing Details, but if you
   * are planning to create Chilean users, you should check out the Chilean
   * Invoicing Details required in
   * https://developers.bitex.la/#23cbd1c5-746f-46d7-8d5c-dc645d622e7d
   */
  console.log(`Creating Invoicing Details`)
  let invoicingDetails = await client.post(
    `${API_URL}/argentina_invoicing_detail_seeds`, {
      "data": {
        "type":"argentina_invoicing_detail_seeds",
        "attributes": {
          "address": "Balcarce, 50, 0, CABA",
          "country": "AR",
          "full_name": "John, Doe",
          "receipt_kind_code": "b",
          "tax_id": "20123456786",
          "tax_id_kind_code": "cuil",
          "vat_status_code": "consumidor_final"
        }
      }
    },
    { headers: userHeaders }
  )
  console.log(`Invoicing Details Created`)

  /**
   * STEP 8: Create Allowance.
   * An Allowance is an entity used to validate funds legitimacy and the
   * possibility to trade. You should only create Allowances for the users that
   * are going to trade in some way (buying or selling BTC, in general).
   * The allowance must always be accompanied by it correspondent attachment.
   * 
   * The kind_code specified, is the Currency in which the allowance will be
   * made and it should be the same as the currency you received (and you are
   * proving to have in the attachment).
   */
  console.log(`Creating Allowance`)
  let allowance = await client.post(
    `${API_URL}/allowance_seeds`, {
      "data": {
        "type":"allowance_seeds",
        "attributes": {
          "kind_code": "ARS"
        }
      }
    },
    { headers: userHeaders }
  )
  console.log(`Allowance Created`)

  //STEP 8.1: Create an Allowance Attachment
  console.log(`Creating an attachment for the allowance`)
  let allowanceAttachment = await client.post(`${API_URL}/attachments`, {
    "data": {
      "type": "attachments",
      "attributes": {
        "document":
          "ENCODED FILE IN BASE64. eg: data:image/jpeg;base64,/9j/k8sF22ZeR...",
        "document_file_name": "mysalaryreceipt.jpg",
        "document_content_type": "image/jpeg",
        "document_file_size": 7463
      },
      "relationships": {
        "attached_to_seed": {
          "data": {
            "id": allowance.data.data.id,
            "type": "allowance_seeds"
          }
        }
      }
    }
  },
  {
    headers: userHeaders
  })
  console.log(`Allowance attachment created`)

  /**
   * STEP 9: Create Phone.
   * There are two kind of phones you can add: 'main' and 'alternative'.
   */
  console.log(`Creating Phone`)
  let phone = await client.post(
    `${API_URL}/phone_seeds`, {
      "data": {
        "type":"phone_seeds",
        "attributes": {
          "country": "AR",
          "number": "1183738201",
          "phone_kind_code": "main"
        }
      }
    },
    { headers: userHeaders }
  )
  console.log(`Phone Created`)

  /**
   * STEP 10, FINAL STEP: Submitting KYC.
   * After you finish uploading the user's information, you should submit its
   * profile to be reviewed by our compliance team.
   * 
   * It's important to notice that once you submit it, it will no longer be
   * editable. Hence, if you submit it with missing information, you will be
   * able to provide it only after our team makes the observation on the
   * profile.
   * 
   * Please, in order to avoid delays in the process, be sure that you are
   * submitting all the required data for your correspondent use case and
   * country. If you have any doubt about what information to provide, don't
   * hesitate to reach out to us at hola@bitex.la
   */
  console.log(`Submitting Profile`)
  let profile = await client.post(
    `${API_URL}/issues/current/complete`, {}, { headers: userHeaders }
  )
  console.log(`Profile Submitted`)

  console.log(`End of process`)
}

main()