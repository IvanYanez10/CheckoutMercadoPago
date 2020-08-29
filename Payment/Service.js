const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {
        access_token:
          "APP_USR-7137060902838531-082711-de5f14f75b65c49c53bae60ea45d3c22-385723281"
      },
      test: {
        access_token:
          "APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {

    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`; // change to production

    const preferences = {
      collector_id: "617633181",
      client_id: "535650015",
      operation_type: "regular_payment",
      external_reference: "iyanez717@gmail.com",
      items : [
        {
          id: "1234",
          title: name,
          description: "Dispositivo móvil de Tienda e-commerce",
          picture_url: img,    // foto del producto seleccionado
          category_id: "SmartPhones",
          quantity: parseInt(unit),
          unit_price: parseFloat(price)
        }
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_58295862@testuser.com",
        phone: {
          area_code: "52",
          number: "5549737300"
        },
        address: {
          street_name: "Insurgentes Sur",
          street_number: "1602",
          zip_code: "03940"
        }
      },
      back_urls: {
        success: "https://mercadopago-checout.herokuapp.com/success",
        pending: "https://mercadopago-checout.herokuapp.com/pending",
        failure: "https://mercadopago-checout.herokuapp.com/error"
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [{id: "amex"}],
        excluded_payment_types: [{ id: "atm" }],
        installments: 6,
        default_installments: 1
      },
      notification_url: "https://mercadopago-checout.herokuapp.com/webhook"
    };

    try {
      const request = await axios.post(url, preferences,{
        headers: {
          "Content-Type": "application/json",
          "x-integrator-id":"dev_24c65fb163bf11ea96500242ac130004"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
