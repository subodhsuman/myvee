<template>
  <div>
    <div class="buy_sell">
      <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
        <!-- Buy Sell Button Tab  -->

        <li
          class="nav-item"
          role="presentation"
          v-for="order_types in order_type_items"
          :key="order_types.tab"
        >
          <button
            id="home-tab"
            :class="`nav-link ${
              order_types.type == order_type
                ? order_type == 'buy'
                  ? 'active active-green '
                  : 'active active-red'
                : ''
            }`"
            data-bs-toggle="tab"
            data-bs-target="#buy"
            type="button"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            v-on:click="changeOrderTab(order_types.type)"
          >
            {{ order_types.tab }}
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane show active"
          id="buy"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <div
            :class="`limits-tabs ${
              order_type == 'sell' ? 'limit-red-tab ' : ''
            }`"
          >
            <ul
              class="nav nav-tabs nav-pills nav-fill"
              id="myTab"
              role="tablist"
            >
              <li
                class="nav-item"
                role="presentation"
                v-for="my_type in type_items"
                :key="my_type.tab"
              >
                <button
                  class="nav-link"
                  :class="my_type.type == type ? 'active' : ''"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#market-red"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                  v-on:click="tabChange(my_type.type)"
                >
                  {{ my_type.tab }}
                </button>
              </li>
            </ul>
            <div class="tab-content" id="myTabContent">
              <div
                class="tab-pane active show"
                id="market-red"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="limits_amount-box amount-upper-main">
                  <form>
                    <div class="limits_amount-box">
                      <div
                        v-if="this.type == 'stop_limit'"
                        class="amount_inner_box trigger-price-box"
                      >
                        <div class="amount_heading"><P>Trigger Price</P></div>

                        <div class="amount-input-box">
                          <div class="input-group">
                            <input
                              v-model.trim="form3.stop_price"
                              type="text"
                              @keypress="keyChange($event, decimal_pair)"
                              onpaste="return false;"
                              class="form-control"
                              placeholder="Trigger Price"
                              aria-label="Trigger Price"
                              aria-describedby="basic-addon1"
                            />
                            <span class="input-group-text" id="basic-addon1">{{
                              this.with_currency
                            }}</span>
                          </div>
                        </div>
                      </div>
                      <div
                        v-if="this.type != 'market'"
                        class="amount_inner_box add-price-box"
                      >
                        <div class="amount_heading"><P>At Price</P></div>

                        <div class="amount-input-box">
                          <div class="input-group">
                            <input
                              v-model.trim="$v.form3.at_price.$model"
                              type="text"
                              @keyup="atPriceChange"
                              @keypress="keyChange($event, decimal_pair)"
                              onpaste="return false;"
                              class="form-control"
                              placeholder="At Price"
                              aria-label="At Price"
                              aria-describedby="basic-addon1"
                            />
                            <span class="input-group-text" id="basic-addon1">{{
                              this.with_currency
                            }}</span>
                          </div>
                          <div
                            class="error"
                            v-if="submitted && !$v.form3.at_price.required"
                          >
                            At price is required
                          </div>
                        </div>
                      </div>
                      <div class="amount_per_inner_box">
                        <div class="amount_inner_box">
                          <div class="amount_heading"><p>Amount</p></div>

                          <div class="amount-input-box">
                            <div class="input-group">
                              <input
                                value="0"
                                v-model.trim="$v.form3.quantity.$model"
                                @keyup="amountChange"
                                type="text"
                                @keypress="keyChange($event, decimal_currency)"
                                onpaste="return false;"
                                class="form-control"
                                aria-label="Amount"
                                aria-describedby="basic-addon1"
                              />
                              <span
                                class="input-group-text"
                                id="basic-addon1"
                                >{{ this.currency }}</span
                              >
                            </div>
                            <div
                              class="error"
                              v-if="submitted && !$v.form3.quantity.required"
                            >
                              Quantity is required
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="amount_inner_box total-price-box">
                        <div
                          v-if="this.type != 'market'"
                          class="amount-input-box"
                        >
                          <div class="amount_heading"><p>Total</p></div>

                          <div class="input-group">
                            <input
                              v-model.trim="$v.form3.total.$model"
                              type="text"
                              @keyup="totalChange"
                              @keypress="keyChange($event, decimal_pair)"
                              onpaste="return false;"
                              class="form-control"
                              placeholder="Total"
                              aria-label="Total"
                              aria-describedby="basic-addon1"
                            />
                            <span class="input-group-text" id="basic-addon1">{{
                              this.with_currency
                            }}</span>
                          </div>
                          <div
                            class="error"
                            v-if="submitted && !$v.form3.total.required"
                          >
                            Total is required
                          </div>
                        </div>

                        <div class="amount-percantage" v-if="showPercent">
                          <div class="hstack gap-0">
                            <div
                              class="percantage-links"
                              v-for="(percents, index) in Percentage"
                              :key="index"
                            >
                              <a
                                href="javascript:void(0)"
                                @click="percentChange(`${percents.parcent}`)"
                                >{{ percents.text }}</a
                              >
                            </div>
                          </div>
                          <div class="wallet_balance">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              style="fill: var(--black)"
                            >
                              <path d="M14 9h8v6h-8z"></path>
                              <path
                                d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z"
                              ></path>
                            </svg>
                            <span class="ms-2">{{ totalbalance }}</span>
                          </div>
                          <!-- wallet_balance -->
                        </div>
                      </div>

                      <div
                        v-if="loading"
                        :class="`loader mt-3 mb-3 ${
                          order_type == 'buy' ? 'buysellbtnbox' : 'sellbtnbox'
                        }`"
                      >
                        <div class="spinner-border text-light" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>
                      </div>

                      <div
                        v-else
                        :class="` ${
                          order_type == 'buy' ? 'buysellbtnbox' : 'sellbtnbox'
                        }`"
                        class="mt-3 mb-3"
                        @click="submitForm3"
                      >
                        <p>Place {{ currency }} Order</p>
                      </div>
                      <!--buysellbtnbox-->
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exactMath from "exact-math";
import ApiClass from "../api/api";
import { required } from "vuelidate/lib/validators";
// import moment from "moment";
export default {
  name: "BuySell",
  data() {
    return {
      Percentage: [
        { parcent: 25, text: "25%" },
        { parcent: 50, text: "50%" },
        { parcent: 75, text: "75%" },
        { parcent: 98, text: "MAX" },
      ],
      //buy stop limit variable
      form3: {
        order_type: "buy",
        type: "limit",
        currency: "",
        with_currency: "",
        stop_price: 0,
        at_price: 0,
        quantity: 0,
        total: 0,
      },
      decimal_currency: null,
      decimal_pair: null,
      showPercent: false,
      totalbalance: "",
      order_type_items: [
        { tab: "BUY", type: "buy" },
        { tab: "SELL", type: "sell" },
      ],
      type_items: [
        { tab: "Market", type: "market" },
        { tab: "LIMIT", type: "limit" },
        { tab: "STOP LIMIT", type: "stop_limit" },
      ],
      funds: [],

      loading: false,
      order_type: "buy",
      type: "limit",
      current_info: null,
      submitted: false,
      currency: null,
      with_currency: null,
      allmarketcurrency: null,
      slug: "",
      oldQTY: null,
      oldtotal: null,
    };
  },
  validations: {
    form3: {
      // stop_price: { required },
      at_price: { required },
      quantity: { required },
      total: { required },
    },
  },
  mounted() {
    this.slug = this.$route.params.slug;

    // this.current_info = this.$store.state.sluginfo;
    this.current_info = this.$store.getters.getSlugInfo;

    
    if (this.current_info.slug == this.slug) {
      this.with_currency = this.current_info.slug.slice(
        this.current_info.slug.length - 3,
        this.current_info.slug.length
      );
      this.with_currency =
        this.with_currency == "SDT" ? "USDT" : this.with_currency;
      this.currency = this.current_info.slug.slice(
        0,
        this.current_info.slug.length - 3
      );
      this.currency =
        this.with_currency == "USDT"
          ? this.current_info.slug.slice(0, this.current_info.slug.length - 4)
          : this.currency;
      // this.form3.total = exactMath.round(this.form3.total,this.decimal_pair)

      // console.log(this.current_info);
      this.form3.at_price = this.current_info.current_price;

      // for wallet
    }
    this.getFunds();
  },

  methods: {
    async getFunds() {
      // console.log(localStorage.getItem("token"));
      var $this = this;
      if (localStorage.getItem("token")) {
        $this.showPercent = true;
        // console.log(this.showPercent);
        let ress = await ApiClass.getNodeRequest("user-crypto/funds/get", true);
        this.funds = ress.data.data || [];
        this.totalWalletBalance();
      }
    },
    keyChange(event, decimal = null) {
      
      if (decimal == 0 && event.charCode == 46) {
        return event.preventDefault();
      }
      if (event.which != 48 || event.which != 96) {
        event.target.value = event.target.value.replace(/^0+/, "");
      }

      let res =
        event.charCode != 8 &&
        ((event.charCode >= 48 && event.charCode <= 57) ||
          (event.charCode == 46 && event.target.value.indexOf(".") == -1));
    
      if (decimal != null && res && event.target.value.indexOf(".") != -1) {
        res = event.target.value.split(".")[1].length < decimal;
      
      }
      return res ? res : event.preventDefault();
    },
    amountChange() {
      // if (
      //   e.keyCode == 8 &&
      //   this.form3.quantity[this.form3.quantity.length - 1] == "."
      // ) {
      //   this.form3.quantity = this.form3.quantity.slice(
      //     0,
      //     this.form3.quantity.length - 1
      //   );
      // }

      // if (this.form3.quantity[this.form3.quantity.length] == ".") {
      //   return;
      // }

      if (this.form3.quantity != "" && !isNaN(this.form3.quantity)) {
       

        if (this.decimal_pair == null) {
          this.decimal_pair = 0;
        }

        var totalqty = exactMath.mul(this.form3.at_price, this.form3.quantity);
        this.form3.total = exactMath.floor(totalqty);

        // this.form3.total =
        //   this.decimal_pair == 0
        //     ? exactMath.floor(totalqty)
        //     : exactMath.floor(totalqty, -parseInt(this.decimal_pair));
      }
      if (this.form3.quantity == "") {
        this.form3.total = 0;
      }
    },
    percentChange(percent) {
      // console.log(percents)
      var currency =
        this.order_type == "buy"
          ? (currency = this.with_currency)
          : (currency = this.currency);
      var x = this.funds.find((ele) => {
        return ele.currency == currency;
      });
      var totalbalance = x.balance;

      if (this.order_type == "buy") {
        this.form3.total = exactMath.floor(
          this.percentage(totalbalance, percent),
          -parseInt(this.decimal_currency)
        );
        this.totalChange();
      } else {
        this.form3.quantity =
          parseInt(this.decimal_currency) == 0
            ? exactMath.floor(this.percentage(totalbalance, percent))
            : exactMath.floor(
                this.percentage(totalbalance, percent),
                -parseInt(this.decimal_currency)
              );
        var totalqty = exactMath.mul(this.form3.at_price, this.form3.quantity);

        this.form3.total =
          parseInt(this.decimal_pair) == 0
            ? exactMath.floor(totalqty)
            : exactMath.floor(totalqty, -parseInt(this.decimal_pair));
      }
      // this.form3.total = this.percentage(totalbalance, percents);
      // var qty = exactMath.div(this.form3.total, this.form3.at_price);
      // this.form3.quantity =
      //   parseInt(this.decimal_currency) == 0
      //     ? exactMath.floor(qty)
      //     : exactMath.floor(qty, -parseInt(this.decimal_currency));
    },
    percentage(num, per) {
      return (num / 100) * per;
    },

    totalChange() {
      if (this.form3.total != "" && !isNaN(this.form3.total)) {
        var qty = exactMath.div(this.form3.total, this.form3.at_price);
        this.form3.quantity =
          parseInt(this.decimal_currency) == 0
            ? exactMath.floor(qty)
            : exactMath.floor(qty, -parseInt(this.decimal_currency));
      }
      if (this.form3.total == "") this.form3.quantity = 0;
    },
    atPriceChange() {
      if (this.form3.at_price == "") return;

      if (
        this.form3.at_price != "" &&
        !isNaN(this.form3.at_price) &&
        parseFloat(this.form3.at_price) != 0
      ) {
        var amt = exactMath.div(this.form3.total, this.form3.at_price);

        this.form3.quantity =
          parseInt(this.decimal_currency) == 0
            ? exactMath.floor(amt)
            : exactMath.floor(amt, -parseInt(this.decimal_currency));
      }
      // console.log(amt,'amt');
    },
    tabChange(type) {
      this.submitted = false;

      this.type = type;
      this.totalWalletBalance();
    },
    submitForm3() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.form3.$invalid) {
        return;
      }
      this.loading = true;
      this.form3.order_type = this.order_type;
      this.form3.type = this.type;
      this.form3.currency = this.currency;
      this.form3.quantity = parseFloat(this.form3.quantity);
      this.form3.at_price = parseFloat(this.form3.at_price);
      this.form3.with_currency = this.with_currency;
      if (localStorage.getItem("token")) {
        this.apifunction(this.form3);
        this.submitted = false;
        return;
      }
      this.$router.push({ name: "Login" });
    },

    async apifunction(form) {
      await ApiClass.postNodeRequest("orders/place-order", true, form).then(
        (res) => {
          this.loading = false;
          if (res.data.status_code == 1) {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "success",
              title: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
            this.getFunds();
          } else {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "error",
              title: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
          }
        }
      );
    },

    // for total balance
    changeOrderTab(tab) {
      this.order_type = tab;
      this.totalWalletBalance();
    },
    totalWalletBalance() {
     
      // if (localStorage.getItem("token")) {
    
      
      var currency =
        this.order_type == "buy" ? this.with_currency : this.currency;
    

      var x = this.funds.find((ele) => {
        return ele.currency == currency;
      });
   
      var totalbalance = x.balance ? x.balance : 0;
      this.totalbalance = totalbalance + "" + currency;

      // }
    },
  },

  watch: {
    $route: function (e) {
      this.slug = e.params.slug;
      this.allmarketcurrency = this.$store.getters.getMarketCurrency;
      if (this.allmarketcurrency) {
        var decimal_data = this.allmarketcurrency.find((ele) => {
          return ele.symbol == this.slug;
        });

        
        this.decimal_currency = decimal_data.decimal_currency;
        this.decimal_pair = decimal_data.decimal_pair;
        this.totalWalletBalance();
      }
    },
    "$store.getters.getMarketCurrency": function (value) {
      this.allmarketcurrency = value;
    },
    allmarketcurrency: function (e) {
      if (e) {
        var decimal_data = e.find((ele) => {
          return ele.symbol == this.slug;
        });
       

        this.decimal_currency = decimal_data.decimal_currency;
        this.decimal_pair = decimal_data.decimal_pair;
      }
    },
    "$store.state.editOrderInfo": function (e) {
      var orderinfo = JSON.parse(e);
      var slug = orderinfo.currency + orderinfo.with_currency;
      var oldslug = this.currency + this.with_currency;
      if (oldslug != slug) {
        this.$router.push(slug);
      }
      this.form3.at_price = orderinfo.at_price;
      this.form3.quantity = orderinfo.quantity;
      this.form3.total = orderinfo.total;
      this.order_type = orderinfo.order_type;
      this.type = orderinfo.type;
    },
    "$store.state.sluginfo.slug": function () {
      this.current_info = this.$store.state.sluginfo;
    
      this.with_currency = this.current_info.slug.slice(
        this.current_info.slug.length - 3,
        this.current_info.slug.length
      );
      this.with_currency =
        this.with_currency == "SDT" ? "USDT" : this.with_currency;
      this.currency = this.current_info.slug.slice(
        0,
        this.current_info.slug.length - 3
      );
      this.currency =
        this.with_currency == "USDT"
          ? this.current_info.slug.slice(0, this.current_info.slug.length - 4)
          : this.currency;
      // this.form3.at_price = this.current_info.current_price;
      var atPrice = this.current_info.current_price;
   
      this.form3.at_price =
        parseInt(this.decimal_pair) == 0
          ? exactMath.floor(atPrice)
          : exactMath.floor(atPrice, -parseInt(this.decimal_pair));
      
    },
  },

  // async created() {
  //   if (localStorage.getItem("token")) {
  //     this.showPercent = true;
  //     let ress = await ApiClass.getNodeRequest("user-crypto/funds/get", true);
  //     this.funds = ress.data.data || [];
  //     this.totalWalletBalance();
  //   }
  // },
};
</script>

<style scoped>
.buy_sell {
  overflow: hidden;
  box-shadow: var(--box-shadow);
  background-color: var(--white);
}

.nav-tabs .nav-item .active-green.active {
  background: var(--green);
  color: var(--buy-active-color);
  border: none;
}

.nav-tabs .nav-item .active-red.active {
  background: var(--red);
  color: var(--buy-active-color);
  border: none;
}

.nav-tabs .nav-link {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 12px;
  color: var(--black);
  min-height: 40px;
  border: none;
}

.nav-tabs .nav-link:focus,
.nav-tabs .nav-link:hover {
  border: none;
}

.nav-tabs .nav-link:focus-visible {
  outline: none;
}
/**** LIMITS TABS CSS ***/

.limits-tabs .nav-tabs {
  background-color: var(--limit-tab-bg);
}

.limits-tabs .nav-tabs .nav-link {
  font-size: 12px;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  color: var(--black);
  border-bottom: none;
  border-radius: 0;
}

.limits-tabs .nav-tabs .nav-link.active {
  background-color: var(--white);
  border-bottom: 3px solid var(--green);
}

.amount_inner_box {
  padding: 5px 5px;
  padding-bottom: 3px;
}

.amount_heading p {
  font-size: 11px;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  margin: 0;
  text-transform: uppercase;
  padding-bottom: 4px;
  padding-left: 4px;
  color: var(--black);
}

.form-control {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  color: var(--black);
  font-size: 14px;
  background: var(--white);
}

.form-control:focus {
  box-shadow: none;
  border-color: var(--input-border);
}

.input-group-text {
  background-color: transparent;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 600;
  color: var(--black);
}

.hstack {
  justify-content: space-between;
  padding: 0 10px;
  padding-bottom: 7px;
}

.percantage-links a {
  font-family: "Poppins", sans-serif;
  text-decoration: none;
  font-size: 12px;
  margin: 0;
  font-weight: 600;
  color: var(--black);
}

.buy-btn-box {
  padding: 10px 5px;
}

.buy-btn-box button.btn.btn-primary.buy-btc {
  width: 100%;
  background-color: var(--green);
  border-color: var(--green);
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: var(--white);
}

.buy-btn-box button.btn.btn-primary.buy-btc:focus {
  box-shadow: none;
}
/**** SELL CSS START ****/

.limits-tabs.limit-red-tab .nav-tabs .nav-link.active {
  background-color: var(--white);
  border-bottom: 3px solid var(--red);
}

.limits-tabs.limit-red-tab .buy-btn-box button.btn.btn-primary.buy-btc {
  background: var(--red);
  border-color: var(--red);
}

@media all and (min-width: 1500px) and (max-width: 1596px) {
  .limits-tabs .nav-tabs .nav-link {
    padding: 10px 10px;
  }
}

@media all and (min-width: 1400px) and (max-width: 1499px) {
  .limits-tabs .nav-tabs .nav-link {
    padding: 7px 7px;
    font-size: 11px;
  }
}

@media all and (min-width: 1367px) and (max-width: 1399px) {
  .limits-tabs .nav-tabs .nav-link {
    padding: 10px 10px;
    font-size: 11px;
  }
}

@media all and (min-width: 1200px) and (max-width: 1366px) {
  .limits-tabs .nav-tabs .nav-link {
    padding: 7px 7px;
    font-size: 11px;
  }
  .buy-btn-box button.btn.btn-primary.buy-btc {
    font-size: 14px;
  }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
  .limits-tabs .nav-tabs .nav-link {
    font-size: 11px;
    padding: 10px 10px;
  }
  .buy-btn-box button.btn.btn-primary.buy-btc {
    font-size: 14px;
  }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
  .limits-tabs .nav-tabs .nav-link {
    font-size: 11px;
    padding: 10px 10px;
  }
  .buy-btn-box button.btn.btn-primary.buy-btc {
    font-size: 14px;
  }
}

.limits_amount-box.amount-upper-main {
  margin-top: 25px;
}

.limits_amount-box.amount-upper-main .percantage-links {
  margin-top: 10px;
}

.limits_amount-box.limit_main_upper {
  margin-top: 15px;
}
.limits_amount-box.limit_main_upper .amount_inner_box {
  padding-bottom: 10px;
}

.limits_amount-box.limit_main_upper .amount-percantage {
  margin-top: 7px;
}

/********* NEW BTN STYLE **************/

.buysellbtnbox {
  background-color: var(--green);
  text-align: center;
  width: 100%;
  max-width: 281px;
  min-height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin: 0 auto;
  cursor: pointer;
}

.buysellbtnbox p {
  margin-bottom: 0;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.sellbtnbox {
  background-color: var(--red);
  text-align: center;
  width: 100%;
  max-width: 281px;
  min-height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin: 0 auto;
  cursor: pointer;
}

.sellbtnbox p {
  margin-bottom: 0;
  text-transform: uppercase;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.loader {
  cursor: none;
}

.loader .spinner-border {
  width: 22px;
  height: 22px;
}

.wallet_balance span {
  font-size: 14px;
  font-weight: 600;
}
</style>