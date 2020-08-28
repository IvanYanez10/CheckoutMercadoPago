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

    const preferences = {
      items: [{
          id: "item-ID-1234",
          title: name,
          description: "Dispositivo movil de Tienda e-commerce",
          picture_url: "",
          category_id: "Electronica",
          quantity: parseInt(unit),
          unit_price: parseFloat(price)
      }],
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
        success: "http://localhost:3000/success",
        pending: "http://localhost:3000/pending",
        failure: "http://localhost:3000/error"
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex"
          }
        ],
        installments: 6,
        default_installments: 6
      },
      notification_url: "http://localhost:3000/webhook",
      external_reference: "Reference_1234"
    };
// post to checkout body preferences
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
