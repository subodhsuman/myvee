import axios from "axios";

export default class ApiClass {

  // LIVE LINKS
  // static CAPTCHA_SITE_KEY = "6LeA8aMeAAAAAIZ430h3mJAoaOWKWOZJiIp_5Mag";
  // static VUE_DOMAIN = "https://myvee.exchange/";
  // static nodeUrl = "https://lnode.myvee.exchange/";
  // static nodeWebsocket = 'wss://lnode.myvee.exchange/';
  // static baseUrl = "https://lbackend.myvee.exchange/api/";

  // DEMO LINKS
  // static CAPTCHA_SITE_KEY = '6LeA8aMeAAAAAIZ430h3mJAoaOWKWOZJiIp_5Mag';
  // static VUE_DOMAIN = 'https://demo.myvee.exchange/';
  // static nodeUrl = 'https://node.myvee.exchange/';
  // static nodeWebsocket = 'wss://node.myvee.exchange/';
  // static baseUrl = 'https://demo.myvee.exchange/backend/public/api/';

  // LOCAL LINKS
  static CAPTCHA_SITE_KEY = "6LeA8aMeAAAAAIZ430h3mJAoaOWKWOZJiIp_5Mag";
  static VUE_DOMAIN = "http://192.168.10.60:8080/";
  static nodeUrl = "http://192.168.10.60:5055/";
  static nodeWebsocket = "ws://192.168.10.60:5055/";
  static baseUrl = "http://192.168.10.60:8001/api/";

  static fm;
  static fms(FlashMessage) {
    this.fm = FlashMessage;
  }

  //******************************* Post api *******************************************//

  static postRequest(
    apiUrl,
    isToken = true,
    formData = null,
    headers = null,
    params = null
  ) {
    return axios
      .post(
        this.baseUrl + apiUrl,
        formData,
        this.config(isToken, headers, params)
      )
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }

  //******************************* Get api *******************************************//

  static getRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios
      .get(this.baseUrl + apiUrl, this.config(isToken, headers, params))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }

  //******************************** Update api ********************************************** */

  //******************* if form data with image ************************ */

  static updateFormRequest(
    apiUrl,
    isToken = true,
    formData = null,
    headers = null,
    params = null
  ) {
    baseParam = { _method: "PUT" };
    if (params != null) {
      // var baseParam = $.extend(params, baseParam)
      var baseParam = Object.assign(params, baseParam);
    }
    return axios
      .post(
        this.baseUrl + apiUrl,
        formData,
        this.config(isToken, headers, baseParam)
      )
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }
  //******************* form data in json format ************************ */

  static updateRequest(
    apiUrl,
    isToken = true,
    formData = null,
    headers = null,
    params = null
  ) {
    return axios
      .put(
        this.baseUrl + apiUrl,
        formData,
        this.config(isToken, headers, params)
      )
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }

  //*********************************** Delete api *************************************************** */

  static deleteRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios
      .delete(this.baseUrl + apiUrl, this.config(isToken, headers, params))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }

  //******************************* Configrations of header and parameters ******************************* */

  static config(isToken = true, headers = null, parameters = null) {
    var defaultHeaders = {
      Accept: "application/json",
    };
    var merge = {};
    if (isToken) {
      var token = { Authorization: "Bearer " + localStorage.getItem("token") };
      // var token = {
      //     Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDY0NGVlOGQ5ZDBmNTAyZTc1YzEyODgwZmIxNjFkNmIzNzZlZTZmYzEwYTNhNjU5MTVlYzNjY2I5ODJmYjlkYjA0MDExZGI0YzhlNjI2YjYiLCJpYXQiOjE2NDM3ODI5NzIuNjI1NjU4LCJuYmYiOjE2NDM3ODI5NzIuNjI1NjYyLCJleHAiOjE2NDM4NjkzNzIuNDYwODEyLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.HgGHqAWkttJjkoQawBPS9DS9zz_VhBpcJEkroQKrrFYDxQdHdYhmVROI50lwVKLw-itNQW9TMdwU55X9Mk48dwHUklA-apZSL_zoHL1yqoy3689Gz58C-lO1HBUd_64ItbhB9-xDIgsvspV98j6L0yaDwWvE2s1J-zKgLHeMsAAYh_gwi0bDdYdU_4ySZktM2_lz4OGT5WbgVB66FBGb7jLOSw2nd7zZIR9ITUtF3JC2nLPzrq6piG-riNh9k9LmtszJyOxjS-AeFCtjhF98YrF96Z4IRh9prOWdY6nIyN_mbF5Ff6J8SSQO6P8DOZlA5a7tX8v-KT4WXB05hzbzDHwRBMT3Ro4q0Rao5ej09hEZqvFhiHSV7prND6swE6cfCc4qleH0Yxdrst3TmVnCEkrzb7Iygi1KhO-OBtWd54rfGd06g9XBK_-jm2oxC_ZS7h04bX8_X1P3eugzW8T6m3Gtm1NMDX60ktxHkFY6YAhT0qclY3IBtlG3tCqjLgv-ogb1PwKp9zDLNfUmXR3virOKTaOY6UTx1x-AbxpOtsPwmIDfEd2A9E6ZDcqB8Bl8P1Jec5a1gPIfPlPvtNt3zwsCjdJw4ILE2Yh-vCuuw2YnnI8JEemR_K4aFKArvWlbhJDFixZwlQSGEgDWNVdidKjuACgQP1JylZlD5UbRxF4"
      // };
      // var merge = $.extend(defaultHeaders, token)
      merge = Object.assign(defaultHeaders, token);
    }
    // var merge = $.extend(defaultHeaders, headers)
    merge = Object.assign(defaultHeaders, headers);
    return {
      headers: merge,
      params: parameters,
    };
  }

  //********************************* If the unautherntication Error..... ************************************** */

  static unauthenticateRedirect() {

    localStorage.clear();
    location.replace("/login");
    // this.fms.show({
    //   status: "error",
    //   title: "UnAuthentication",
    //   message: "You are currently blocked by the admin or try to login again",
    // });
  }

  // node Api

  static getNodeRequest(apiUrl, isToken = true, headers = null, params = null) {
    return axios
      .get(this.nodeUrl + apiUrl, this.config(isToken, headers, params))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.log("ERROR => ", error);
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }
  // POst
  static postNodeRequest(
    apiUrl,
    isToken = true,
    formData = null,
    headers = null,
    params = null
  ) {
    return axios
      .post(
        this.nodeUrl + apiUrl,
        formData,
        this.config(isToken, headers, params)
      )
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }

  static putNodeRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {

    return axios.put(this.nodeUrl + apiUrl, formData, this.config(isToken, headers, params)).then(result => {
      return result;
    }).catch(error => {
      if (error.response.status == 401) {
        this.unauthenticateRedirect();
      }
    });
  }

  static updatenodeRequest(apiUrl, isToken = true, formData = null, headers = null, params = null) {
    return axios.put(this.nodeUrl + apiUrl, formData, this.config(isToken, headers, params))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.unauthenticateRedirect();
        }
      });
  }
}
