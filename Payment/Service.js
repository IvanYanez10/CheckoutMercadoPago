const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "TEST-7137060902838531-082711-62e720737c91d3b723dd8c78042fd61f-385723281"
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {

    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const items = [
      {
        id: "1234",
        title: name,
        description: "Dispositivo movil",
        picture_url: "https://courseit.com.ar/static/logo.png",
        category_id: "1234",
        quantity: parseInt(unit),
        unit_price: parseFloat(price)
      }
    ];

    const preferences = {
      items,
      payer: {
        name: "Juan",
        surname: "Lopez",
        email: "user@email.com",
        phone: {
          area_code: "52",
          number: "55554444"
        },
        address: {
          street_name: "Street",
          street_number: "123",
          zip_code: "5700"
        }
      },
      back_urls: {
        success: "https://mercadopago-checout.herokuapp.com/success",
        pending: "https://mercadopago-checout.herokuapp.com/pending",
        failure: "https://mercadopago-checout.herokuapp.com/error"
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        installments: 6,
        default_installments: 0
      },
      notification_url: "https://mercadopago-checout.herokuapp.com/webhook",
      external_reference: "Reference_1234"
    };

    try {
      const request = await axios.post(url, preferences,{
        headers: {
          "Content-Type": "application/json"
        }
      });
      return request.data;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = PaymentService;
