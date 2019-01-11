const https = require('https')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

let mock = new MockAdapter(axios, { delayResponse: 2000 })

mock.onPost('https://bitex.la/api/webhooks').reply(200, {
  "data": {
    "id": "1545933402",
    "type": "webhooks",
    "attributes": {
      "url": "https://webhooktest.com/"
    }
  }
})
  .onPost('https://bitex.la/api/users').reply(200, {
    "data": {
      "id": "13",
      "type": "users",
      "attributes": {
        "name": "test2@whitelabeler.com",
        "email": "test2@whitelabeler.com",
        "kyc_accepted": false,
        "otp_enabled": false,
        "do_not_email": false,
        "trezor_login_enabled": false
      }
    }
  })
  .onPost('https://bitex.la/api/natural_docket_seeds').reply(200, {
    "data": {
      "id": "1",
      "type": "natural_docket_seeds",
      "attributes": {
        "first_name": "John",
        "last_name": "Doe",
        "nationality": "AR",
        "gender_code": "male",
        "marital_status_code": "single",
        "job_title": null,
        "job_description": null,
        "politically_exposed": false,
        "politically_exposed_reason": null,
        "birth_date": "1990-01-31",
        "created_at": "2018-10-23T17:32:51.000Z",
        "updated_at": "2018-10-23T17:32:51.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/identification_seeds').reply(200, {
    "data": {
      "id": "1",
      "type": "identification_seeds",
      "attributes": {
        "identification_kind_code": "national_id",
        "number": "12345678",
        "issuer": "AR",
        "public_registry_authority": null,
        "public_registry_book": null,
        "public_registry_extra_data": null,
        "created_at": "2018-10-23T17:32:52.000Z",
        "updated_at": "2018-10-23T17:32:52.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/attachments').replyOnce(200, {
    "data": {
      "id": "1",
      "type": "attachments",
      "attributes": {
        "document_file_name": "idfront.jpg",
        "document_content_type": "image/jpeg",
        "document_file_size": 8391,
        "created_at": "2018-10-23T17:32:55.000Z",
        "updated_at": "2018-10-23T17:32:55.000Z"
      },
      "relationships": {
        "attached_to_seed": {
          "data": {
            "id": "1",
            "type": "identification_seeds"
          }
        }
      }
    }
  })
  .onPost('https://bitex.la/api/domicile_seeds').reply(200, {
    "data": {
      "id": "1",
      "type": "domicile_seeds",
      "attributes": {
        "country": "AR",
        "state": null,
        "city": "CABA",
        "street_address": "Balcarce",
        "street_number": "50",
        "postal_code": "1001",
        "floor": "0",
        "apartment": null,
        "created_at": "2018-10-23T17:50:57.000Z",
        "updated_at": "2018-10-23T17:50:57.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/attachments').replyOnce(200, {
    "data": {
      "id": "2",
      "type": "attachments",
      "attributes": {
        "document_file_name": "electricitybill.jpg",
        "document_content_type": "image/jpeg",
        "document_file_size": 618,
        "created_at": "2018-10-23T17:32:55.000Z",
        "updated_at": "2018-10-23T17:32:55.000Z"
      },
      "relationships": {
        "attached_to_seed": {
          "data": {
            "id": "1",
            "type": "domicile_seeds"
          }
        }
      }
    }
  })
  .onPost('https://bitex.la/api/email_seeds').reply(200, {
    "data": {
      "id": "2",
      "type": "email_seeds",
      "attributes": {
        "address": "person@example.com",
        "email_kind_code": "invoicing",
        "created_at": "2018-10-23T17:50:58.000Z",
        "updated_at": "2018-10-23T17:50:58.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/argentina_invoicing_detail_seeds').reply(200, {
    "data": {
      "id": "1",
      "type": "argentina_invoicing_detail_seeds",
      "attributes": {
        "vat_status_code": "consumidor_final",
        "tax_id": "20123456786",
        "tax_id_kind_code": "cuil",
        "receipt_kind_code": "b",
        "full_name": "John, doe",
        "country": "AR",
        "address": "Balcarce, 50, 0, CABA",
        "created_at": "2018-10-23T18:04:41.000Z",
        "updated_at": "2018-10-23T18:04:41.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/allowance_seeds').reply(200, {
    "data": {
      "id": "1",
      "type": "allowance_seeds",
      "attributes": {
        "kind_code": "ARS",
        "created_at": "2018-10-23T18:04:40.000Z",
        "updated_at": "2018-10-23T18:04:40.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/attachments').replyOnce(200, {
    "data": {
      "id": "1",
      "type": "attachments",
      "attributes": {
        "document_file_name": "mysalaryreceipt.jpg",
        "document_content_type": "image/jpeg",
        "document_file_size": 7463,
        "created_at": "2018-10-23T17:32:55.000Z",
        "updated_at": "2018-10-23T17:32:55.000Z"
      },
      "relationships": {
        "attached_to_seed": {
          "data": {
            "id": "1",
            "type": "allowance_seeds"
          }
        }
      }
    }
  })
  .onPost('https://bitex.la/api/phone_seeds').reply(200, {
    "data": {
      "id": "1",
      "type": "phone_seeds",
      "attributes": {
        "number": "1183738201",
        "phone_kind_code": "main",
        "country": "AR",
        "has_whatsapp": false,
        "has_telegram": false,
        "note": null,
        "created_at": "2018-10-23T17:50:59.000Z",
        "updated_at": "2018-10-23T17:50:59.000Z"
      },
      "relationships": {
        "issue": {
          "data": {
            "id": "1",
            "type": "issues"
          }
        },
        "attachments": {
          "data": []
        }
      }
    }
  })
  .onPost('https://bitex.la/api/issues/current/complete').reply(200, {
    "data": {
      "id": "1",
      "type": "issues",
      "attributes": {
        "state": "new"
      }
    }
  })
  .onAny().passThrough()

let client = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

module.exports = client