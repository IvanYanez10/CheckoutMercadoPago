const axios = require("axios");

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      test: {
        access_token:
          "TEST-7137060902838531-082711-62e720737c91d3b723dd8c78042fd61f-385723281"   // change to production
      }
    };
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout";
  }

  async createPaymentMercadoPago(name, price, unit, img) {

    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`;

    const preferences = {
      external_reference: "ABC",
      operation_type: "regular_payment",
      items : [
        {
          id: "1234",
          title: name,
          description: "Dispositivo movil",
          picture_url: "https://image.freepik.com/free-psd/premium-mobile-phone-screen-mockup-template_53876-81688.jpg",
          category_id: "1234",
          quantity: parseInt(unit),
          unit_price: parseFloat(price)
        }
      ],
      payer: {
        name: "Juan",
        surname: "Lopez",
        email: "user@email.com",
        phone: {
          area_code: "52",
          number: "55554444"
        },
        /*identification": {  // Prevent fraud
            "type": "",
            "number": ""
        },*/
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
        default_installments: 1
      },
      notification_url: "https://mercadopago-checout.herokuapp.com/webhook"
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
