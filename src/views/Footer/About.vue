<template>
  <div>
    <section class="exchange-portfolio-sec" style="min-height: 90vh">
      <div class="container">
        <div class="row portfolio-upper-row mb-4">
          <div class="col-xl-12 col-lg-12 col-md-12">
            <div class="portfolio-currency-heading">
              <span v-html="content"> </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template> 
<script>
import ApiClass from "@/api/api";
export default {
  name: "Help",
  data: () => ({
    slug: "",
    content: "",
    allPages: "",
  }),
  mounted() {
    this.slug = this.$route.params.slug;
    this.termsAndCondition();
  },
  methods: {
    async termsAndCondition() {
      var response2 = await ApiClass.getRequest("pages/get", false);
      var pages = response2.data;
      if (pages.status_code == 1) {
        this.allPages = pages.data;
        var x = this.allPages.filter((value) => {
          if (this.slug == value.slug) {
            return value;
          }
        });
        x.length == 1
          ? (this.content = x[0].content)
          : this.$router.push({
              name: "Exchange",
              params: { slug: "BTCUSDT" },
            });
      }
    },
  },
  watch: {
    $route: function () {
      this.slug = this.$route.params.slug;
      this.termsAndCondition();
    },
  },
};
</script>
<style scoped>
section.exchange-portfolio-sec {
  padding: 80px 0;
  background-color: #111111;
  color: #fff;
}
.warn-error {
  text-align: center;
  font-size: 10px;
  color: rgb(255, 255, 255);
  background: rgb(254, 166, 10);
  font-weight: 700;
  transition: all 0.4s ease 0s;
  max-height: 200px;
  padding: 8px;
}

.table-search-box {
  border: 1px solid #ccc;
  border-bottom: none;
  padding: 10px 10px;
}

.balance-check-box {
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.balance-check-box::before {
  position: absolute;
  content: "";
  top: -14px;
  left: 0;
  width: 2px;
  height: 55px;
  background-color: #ccc;
}

.form-control {
  border: none;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: #000;
  border-radius: 0;
}

.form-control:focus {
  box-shadow: none;
}

.form-switch .form-check-input {
  cursor: pointer;
}

.form-switch .form-check-input:focus {
  box-shadow: none;
  border-color: #ccc;
}

label.form-check-label {
  color: #c7c7c7;
  padding-left: 5px;
  font-weight: 400;
  font-size: 14px;
  text-transform: uppercase;
}

span#basic-addon1 {
  background: transparent;
  border: none;
}

span#basic-addon1 .fas {
  font-weight: 400;
  color: #9f9d9d;
  cursor: pointer;
}

.portfolio-currency-heading {
  margin-bottom: 10px;
}

.portfolio-currency-heading h2 {
  margin-bottom: 0;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 30px;
  color: #000;
}

.portfolio-currency-description {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.portfolio-currency-description h5 {
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  text-transform: capitalize;
  margin-bottom: 0;
}

.portfolio-currency-description h6 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--green);
  margin-bottom: 0;
}

.portfolio-currency-description h6 span {
  color: #c7c7c7;
  padding-left: 10px;
  font-weight: 500;
}
/**** TABLE CSS START ****/

.portfolio-main-info.currency-name {
  display: flex;
  align-items: center;
}

.portfolio-main-info img {
  max-width: 40px;
  margin-right: 15px;
}

.portfolio-main-info h6 {
  margin-bottom: 0;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  text-transform: capitalize;
  font-weight: 500;
  color: #000;
}

.portfolio-main-info h6 span {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #c7c7c7;
  margin-top: 3px;
  text-transform: uppercase;
}

ul.actions-btn-list {
  padding: 0;
  margin: 0;
}

ul.actions-btn-list li {
  display: inline-block;
  padding-right: 6px;
  border-right: 1px solid #ccc;
  padding-left: 9px;
}

ul.actions-btn-list li:nth-child(1) {
  padding-left: 0;
}

.table {
  border: 1px solid #ccc;
}

td.action-width-box {
  max-width: 90px;
}

.table tbody tr td {
  max-width: 50px;
  padding: 15px 0.5rem;
  border: none;
}

.portfolio-main-info.currency-balance {
  max-width: 100px;
}

.portfolio-main-info.currency-balance h6 {
  text-align: end;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.portfolio-main-info.currency-balance h6 span {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.portfolio-main-info.high-price {
  max-width: 100px;
}

.portfolio-main-info.high-price h6 span {
  color: var(--green);
  text-align: end;
}

.progress {
  width: 140px;
  height: 10px;
  margin-bottom: 9px;
  margin-top: 5px;
}

table.table tbody tr {
  border-top: 1px solid #cccc;
}

table.table thead tr th {
  font-size: 15px;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: #000;
  padding-left: 34px;
  padding-top: 15px;
  padding-bottom: 15px;
}

table.table thead tr th:nth-child(4) {
  padding-left: 0.5rem;
}

table.table thead tr th:nth-child(5) {
  padding-left: 0.5rem;
}

table.table tbody {
  border-top: none;
}

ul.actions-btn-list li a {
  text-decoration: none;
  font-size: 16px;
  font-family: "Poppins", sans-serif;
  text-transform: capitalize;
  font-weight: 500;
  color: #4f8ce7;
}

.progress-bar {
  background-color: #70859a;
}

ul.actions-btn-list li:nth-child(2) {
  border-right: 0;
}

ul.actions-btn-list li button.btn.btn-primary {
  background-color: transparent;
  padding: 0;
  border: none;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 500;
  font-family: "Poppins";
}

button.btn.btn-primary.color-red {
  color: var(--red);
}

button.btn.btn-primary.color-green {
  color: var(--green);
}

ul.actions-btn-list li button.btn.btn-primary:focus {
  box-shadow: none;
}

.portfolio-main-info.high-price h6 {
  text-align: end;
}

h5.modal-title {
  text-align: center;
  width: 100%;
  text-transform: uppercase;
  font-family: "Poppins";
  font-weight: 500;
  color: #000;
  margin: 0;
}

.destination-box h5 {
  padding-bottom: 5px;
  padding-left: 3px;
  font-size: 14px;
  color: #000;
  font-family: "Poppins";
  margin-bottom: 0;
  text-transform: capitalize;
}

.form-main-box .form-control {
  border: 1px solid #cccc;
  height: 45px;
  border-radius: 5px;
  font-weight: 400;
  color: #000;
  margin-bottom: 2px;
}

.destination-box span.short-head {
  font-size: 12px;
  padding-left: 5px;
}

.destination-box.amount-box {
  text-align: right;
}

.destination-box.amount-box h5 {
  text-align: left;
}

.withdraw-btn-box {
  margin-top: 25px;
}

.withdraw-btn-box button.btn.btn-success.main-btn {
  width: 100%;
  background-color: #1652f0;
  border-color: #1652f0;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  min-height: 50px;
}

.btn-close:focus {
  box-shadow: none;
}

.modal-content {
  border-color: #ccc;
}

button.copy-text-btn {
  background: #00c853;
  padding: 10px 23px;
  color: #fff;
  border: none;
  text-transform: uppercase;
  font-size: 16px;
  font-family: "Poppins";
  border-radius: 0;
}

input#myInput {
  border-radius: 5px 0 0 5px;
  border: 1px solid #ccc;
}
span#copy-add {
  background-color: transparent;
  padding: 0;
}
.deposit-main-box h5 {
  padding-bottom: 5px;
  padding-left: 3px;
  font-size: 14px;
  color: #000;
  font-family: "Poppins";
  margin-bottom: 0;
  text-transform: capitalize;
}

.deposit_qrcode_img img.qr-code {
  max-width: 125px;
}

.deposit_qrcode_img {
  text-align: center;
}

.deposit_qrcode_img p {
  margin-bottom: 0;
  padding-bottom: 10px;
  text-transform: uppercase;
  font-family: "Poppins";
  font-size: 16px;
  font-weight: 600;
  color: #000;
}

.btn-success:focus {
  box-shadow: none;
}

div#table-loader {
  position: relative;
  left: 475px;
  right: 0;
  margin: 0 auto;
}
@media all and (min-width: 1367px) and (max-width: 1399px) {
  ul.actions-btn-list li a {
    font-size: 14px;
    font-weight: 600;
  }

  div#table-loader {
    left: 400px;
  }
}

@media all and (min-width: 1200px) and (max-width: 1366px) {
  ul.actions-btn-list li a {
    font-size: 14px;
    font-weight: 600;
  }
  .balance-check-box::before {
    left: -12px;
  }

  div#table-loader {
    left: 400px;
  }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
  .table tbody tr td {
    max-width: fit-content;
  }
  .balance-check-box::before {
    left: -10px;
  }

  div#table-loader {
    left: 340px;
  }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .table tbody tr td {
    max-width: fit-content;
  }
  .balance-check-box::before {
    left: -10px;
  }
  div#table-loader {
    left: 340px;
  }
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .balance-check-box {
    left: -11px;
  }
  ul.actions-btn-list li {
    border-right: none;
    padding-right: 0;
  }

  .portfolio-main-info.currency-balance h6 {
    text-align: center;
  }

  div#table-loader {
    left: 270px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  section.exchange-portfolio-sec {
    padding: 30px 0;
  }
  .portfolio-currency-heading h2 {
    text-align: center;
  }
  .table-search-box {
    padding: 10px 0;
  }
  .balance-check-box::before {
    display: none;
  }
  .input-group {
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
  }
  .balance-check-box {
    justify-content: flex-start;
    position: relative;
    padding-left: 11px;
  }
  .table tbody tr td {
    max-width: none;
  }
  table.table thead tr th {
    padding-left: 20px;
    text-align: center !important;
  }

  .portfolio-main-info.actions-btn {
    text-align: center;
  }
  ul.actions-btn-list li {
    border-right: none;
    padding-right: 0;
  }

  .deposite-field .input-group {
    border: none;
  }

  th.price-hours {
    display: none;
  }

  th.portfolio-head {
    display: none;
  }
  td.price-hours-box {
    display: none;
  }

  td.portfolio-head-box {
    display: none;
  }

  .portfolio-main-info img {
    max-width: 25px;
    margin-right: 10px;
  }

  .portfolio-main-info.currency-balance {
    max-width: none;
  }

  .portfolio-main-info.currency-balance h6 {
    max-width: 90px;
    text-align: center;
  }

  ul.actions-btn-list li {
    display: block;
  }
  div#table-loader {
    left: 96px;
  }
}
</style>
