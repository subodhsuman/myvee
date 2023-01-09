<template>
    <div>
        <div class="buy_sell">
            <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                <!-- Buy Sell Button Tab  -->
    
                <li class="nav-item" role="presentation" v-for="order_types in order_type_items" :key="order_types.tab">
                    <button id="home-tab" :class="`nav-link ${order_types.type == order_type ? order_type == 'buy' ? 'active active-green ' : 'active active-red' : ''}`" 
                    data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="home" aria-selected="true" v-on:click="changeOrderTab(order_types.type)">
                        {{ order_types.tab }}
                    </button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane show active" id="buy" role="tabpanel" aria-labelledby="home-tab">
                    <div :class="`limits-tabs ${order_type == 'sell' ? 'limit-red-tab ' : ''}`">
                        <ul class="nav nav-tabs nav-pills nav-fill" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation" v-for="my_type in type_items" :key="my_type.tab">
                                <button class="nav-link" :class="my_type.type == type ? 'active' : ''" id="home-tab" data-bs-toggle="tab" data-bs-target="#market-red" type="button" role="tab" aria-controls="home" aria-selected="true" v-on:click="tabChange(my_type.type)">
                                    <!-- <div class="form-check"> -->
                                        <!-- <input class="form-check-input shadow-none " :checked="my_type.type == type ? true : false" v-if="order_type == 'buy'" type="radio" name="flexRadioDefault" id="flexRadioDefault1"> -->
                                        <!-- <input class="form-check-red form-check-input shadow-none" :checked="my_type.type == type ? true : false" v-else type="radio" name="flexRadioDefault" id="flexRadioDefault1"> -->
                                        {{ my_type.tab }}
                                    <!-- </div> -->
    
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane active show" id="market-red" role="tabpanel" aria-labelledby="home-tab">
                                <div class="limits_amount-box amount-upper-main">
                                    <form>
                                        <div class="limits_amount-box">
                                            <!-- <div v-if="this.type == 'stop_limit'" class="amount_inner_box trigger-price-box">
                            <div class="amount_heading">
                              <P>Trigger Price</P>
                            </div>
                            <div class="amount-input-box">
                              <div class="input-group">
                                <input v-model.trim="form3.stop_price" type="text" id="stop_price" @keypress="
                                    keyChange($event, decimal_pair, 'stop_price')
                                  " onpaste="return false;" class="form-control" placeholder="Trigger Price"
                                  aria-label="Trigger Price" aria-describedby="basic-addon1" />
                                <span class="input-group-text" id="basic-addon1">{{
                                  this.with_currency
                                  }}</span>
                              </div>
                            </div>
                          </div> -->
                                            <div v-if="this.type != 'market'" class="amount_inner_box add-price-box">
                                                <div class="amount_heading">
                                                    <P>At Price</P>
                                                    <div class="left-text">
                                                        <div class="green-text fw-bold" v-if="order_type == 'buy'" @click="form3.at_price = current_low">
                                                            Lowest Price
                                                        </div>
                                                        <div class="red-text fw-bold" v-else @click="form3.at_price = current_high">
                                                            Highest Price
                                                        </div>
                                                    </div>
                                                </div>
    
                                                <div class="amount-input-box">
                                                    <div class="input-group">
                                                        <input v-model.trim="v$.form3.at_price.$model" type="text" id="at_price" @keyup="atPriceChange" @keypress="keyChange($event, decimal_pair)" onpaste="return false;" class="form-control" placeholder="At Price" aria-label="At Price" aria-describedby="basic-addon1" />
                                                        <span class="input-group-text" id="basic-addon1">{{ this.with_currency }}</span>
                                                    </div>
                                                     <div v-if="submitted && v$.form3.at_price.$errors">
                                                        <div class="error">
                                                            {{ v$.form3.at_price.$errors[0]?.$message }}
                                                        </div>
                                                    </div>
                                                    <!-- <div class="error" v-if="submitted && !$v.form3.at_price.required">
                                                        At price is required
                                                    </div> -->
                                                </div>
                                            </div>
                                            <div class="amount_per_inner_box">
                                                <div class="amount_inner_box">
                                                    <div class="amount_heading">
                                                        <p>Amount</p>
                                                    </div>
                                                    <!-------------------wallet-------------------->
                                                    <div class="amount-input-box">
                                                        <div class="input-group">
                                                            <input placeholder="Amount" v-model.trim="v$.form3.quantity.$model" @keyup="amountChange" type="text" id="amount" @keypress="keyChange($event, decimal_currency)" onpaste="return false;" class="form-control" aria-label="Amount" aria-describedby="basic-addon1" />
                                                            <span class="input-group-text" id="basic-addon1">{{ this.currency }}</span>
                                                        </div>
                                                        <div v-if="submitted && v$.form3.quantity.$errors">
                                                            <div class="error">
                                                                {{ v$.form3.quantity.$errors[0]?.$message }}
                                                            </div>
                                                        </div>
                                                        <!-- <div class="error" v-if="submitted && !$v.form3.quantity.required">
                                                            Quantity is required
                                                        </div> -->
                                                    </div>
                                                    <!-------------------------percentages------>
    
                                                    <div class="amount-wallet-box">
                                                        <div class="amount-percantage mb-2" v-if="showPercent == true && order_type == 'sell'">
                                                            <div class="hstack gap-0">
                                                                <div class="percantage-links" v-for="(percents, index) in Percentage" :key="index">
                                                                    <a href="javascript:void(0)" @click="percentChange(`${percents.parcent}`)">{{ percents.text }}</a>
                                                                </div>
                                                            </div>
                                                            <div v-if="order_type == 'buy'" class="wallet_balance">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" style="fill: var(--black)">
                                                                    <path d="M14 9h8v6h-8z"></path>
                                                                    <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z">
                                                                    </path>
                                                                </svg>
                                                                <span class="ms-2" v-if="totalbalance">{{ totalbalance }}
                                                                </span>
                                                                <!-- <span v-else>0</span> -->
                                                                {{ balanceCurrency }}
                                                            </div>
                                                            <!-- wallet_balance -->
                                                        </div>
    
                                                        <div v-if="order_type == 'sell' && showPercent == true " class="wallet_balance">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" style="fill: var(--black)">
                                                                <path d="M14 9h8v6h-8z"></path>
                                                                <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z">
                                                                </path>
                                                            </svg>
                                                            <span class="ms-2" v-if="totalbalance">{{ totalbalance }}
                                                            </span>
                                                            <!-- <span v-else>0</span> -->
                                                            {{ balanceCurrency }}
                                                        </div>
                                                    </div>
                                                    <!--amount-wallet-box-->
                                                </div>
                                            </div>
    
                                            <div class="amount_inner_box total-price-box">
                                                <div v-if="this.type != 'market'" class="amount-input-box">
                                                    <div class="amount_heading">
                                                        <p>Total</p>
                                                    </div>
    
                                                    <div class="input-group">
                                                        <input v-model.trim="v$.form3.total.$model" type="text" @keyup="totalChange" id="total" @keypress="keyChange($event, decimal_pair)" onpaste="return false;" class="form-control" placeholder="Total" aria-label="Total" aria-describedby="basic-addon1" />
                                                        <span class="input-group-text" id="basic-addon1">{{ this.with_currency }}</span>
                                                    </div>
                                                    <div v-if="submitted && v$.form3.total.$errors">
                                                        <div class="error">
                                                            {{ v$.form3.total.$errors[0]?.$message }}
                                                        </div>
                                                    </div>
                                                    <!-- <div class="error" v-if="submitted && !$v.form3.total.required">
                                                        Total is required
                                                    </div> -->
                                                </div>
    
                                                <div class="amount-percantage" v-if="showPercent == true && order_type == 'buy'">
                                                    <div class="hstack gap-0 mb-3">
                                                        <div class="percantage-links" v-for="(percents, index) in Percentage" :key="index">
                                                            <a href="javascript:void(0)" @click="percentChange(`${percents.parcent}`)">{{ percents.text }}</a>
                                                        </div>
                                                    </div>
                                                    <div v-if="order_type == 'buy'" class="wallet_balance">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" style="fill: var(--black)">
                                                            <path d="M14 9h8v6h-8z"></path>
                                                            <path d="M20 3H5C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h15c1.103 0 2-.897 2-2v-2h-8c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h8V5c0-1.103-.897-2-2-2z">
                                                            </path>
                                                        </svg>
                                                        <span class="ms-2" v-if="totalbalance">{{ totalbalance }}
                                                        </span>
                                                        <!-- <span v-else>0</span> -->
                                                        {{ balanceCurrency }}
                                                    </div>
                                                    <!-- wallet_balance -->
                                                </div>
                                            </div>
    
                                            <div v-if="loading" :class="`loader mt-3 mb-3 ${ order_type == 'buy' ? 'buysellbtnbox' : 'sellbtnbox'}`">
                                                <div class="spinner-border text-light" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
    
                                            <div v-else :class="` ${ order_type == 'buy' ? 'buysellbtnbox' : 'sellbtnbox'}`" class="mt-3 mb-3" @click="submitForm3">
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
    // import { mapGetters } from "vuex";
    const config = {
        returnString: true,
        trim: false,
        eMinus: Infinity,
        ePlus: Infinity,
    };
    import {useVuelidate} from "@vuelidate/core";
    import {
        required,
        helpers,
        minValue,
    } from "@vuelidate/validators";
    import ApiClass from "../api/api";
    // import { required } from "vuelidate/lib/validators";
    // import moment from "moment";
    export default {
        name: "BuySell",
        setup() {
            return {
                v$: useVuelidate(),
            };
        },
        data() {
            return {
                onlyKeyEnter: true,
                current_high: "",
                current_low: "",
                Percentage: [{
                        parcent: 25,
                        text: "25%"
                    },
                    {
                        parcent: 50,
                        text: "50%"
                    },
                    {
                        parcent: 75,
                        text: "75%"
                    },
                    {
                        parcent: 98,
                        text: "MAX"
                    },
                ],
                commonVar: "",
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
                decimal_currency: 0,
                decimal_pair: 0,
                showPercent: false,
                totalbalance: "",
                balance: "",
                order_type_items: [{
                        tab: "BUY",
                        type: "buy"
                    },
                    {
                        tab: "SELL",
                        type: "sell"
                    },
                ],
                type_items: [
                    // {
                    //     tab: "Market",
                    //     type: "market"
                    // },
                    {
                        tab: "LIMIT",
                        type: "limit"
                    },
                    // { tab: "STOP LIMIT", type: "stop_limit" },
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
                slug: "BTCUSDT",
                oldQTY: null,
                oldtotal: null,
                balanceCurrency: null,
                amtJson: null,
            };
        },
        validations() { 
          return {
            form3: {          
                at_price: {
                    required: helpers.withMessage("Price is required", required),
                    minValue: helpers.withMessage("Price should be greater than 0", minValue(0.00000001)),
                },
                quantity: {
                    required: helpers.withMessage("Amount is required", required),
                    minValue: helpers.withMessage("Amount should be greater than 0", minValue(0.00000001)),
                },
                total: {
                    required: helpers.withMessage("Total is required", required)
                },
            },
        }
    
        },
        mounted() {
            this.slug = this.$route.params.slug ? this.$route.params.slug : "BTCUSDT";
    
            if (this.$store.getters.getAmount) {
                this.amtJson = this.$store.getters.getAmount;
                this.form3.quantity = this.amtJson.amount;
                this.order_type = this.amtJson.type;
            }
    
            this.current_info = this.$store.getters.getSlugInfo;
            if (localStorage.getItem("token")) {
                this.showPercent = true;
                this.getFunds();
            }
    
            if (this.current_info ?.slug == this.slug) {
                this.decimal_currency = this.current_info.decimal_currency;
                this.decimal_pair = this.current_info.decimal_pair;
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
                    this.with_currency == "USDT" ?
                    this.current_info.slug.slice(0, this.current_info.slug.length - 4) :
                    this.currency;
                this.form3.at_price = this.current_info.current_price;
    
                this.balanceCurrency =
                    this.order_type == "buy" ? this.with_currency : this.currency;
                // for wallet
            }
        },
        methods: {
            async getFunds() {
                var $this = this;
                if (localStorage.getItem("token")) {
                    $this.showPercent = true;
                    let ress = await ApiClass.getNodeRequest("user-crypto/funds/get", true);
                    this.funds = ress.data.data || [];
                    $this.totalWalletBalance();
                }
            },
            keyChange(event, decimal = null) {
                if (decimal == 0 && event.charCode == 46) {
                    // prevent default behaviour
                    event.preventDefault();
                }
                if (
                    event.charCode != 46 &&
                    event.target.value.indexOf(".") == -1 &&
                    (event.which != 48 || event.which != 96)
                ) {
                    event.target.value = event.target.value.replace(/^0+/, "");
                }
    
                // if (
                //   event.charCode != 46 &&
                //   event.target.value.indexOf(".") == 0 &&
                //   (event.which != 48 || event.which != 96)
                // ) {
                //   // event.target.value = event.target.value.replace(/^0+/, "");
                // }
    
                let res =
                    event.charCode != 8 &&
                    ((event.charCode >= 48 && event.charCode <= 57) ||
                        (event.charCode == 46 && event.target.value.indexOf(".") == -1));
    
                if (decimal != null && res && event.target.value.indexOf(".") != -1) {
                    res = event.target.value.split(".")[1].length < parseInt(decimal);
                }
                return res ? res : event.preventDefault();
            },
            commonCheck(value = null, decimal = null) {
    
                value = value.toString();
                if (value[value ?.length - 1] == ".") {
                    if (value[0] == ".") {
                        value = "0".concat(value);
                    }
                    return true;
                }
    
                if (value.split(".")[1]) {
                    var data = value.split(".")[1].length >= parseInt(decimal);
                    return data;
                }
    
            },
    
            amountChange() {
    
                if (this.form3.quantity == "") {
                    return (this.form3.total = 0);
                }
    
                // let chk = this.commonCheck(this.form3.quantity, 0);
                if (
                    this.commonCheck(this.form3.quantity, this.decimal_currency) &&
                    this.onlyKeyEnter
                ) {
                    return;
                }
                if (
                    this.form3.quantity != "" &&
                    !isNaN(this.form3.quantity) &&
                    this.form3.at_price != ""
                ) {
                    var totalqty = exactMath.mul(this.form3.at_price, this.form3.quantity, {
                        returnString: true,
                        eMinus: Infinity,
                        ePlus: Infinity,
                    });
                    this.form3.total =
                        parseInt(this.decimal_pair) == 0 ?
                        parseInt(totalqty) :
                        this.trimIt(totalqty, parseInt(this.decimal_pair));
                    this.onlyKeyEnter = true;
                }
            },
            trimIt(number = null, decimal = null) {
                return (
                    Math.floor(number * Math.pow(10, decimal)) / Math.pow(10, decimal)
                ).toFixed(decimal);
            },
            totalChange() {
    
                if (
                    this.commonCheck(this.form3.total, this.decimal_pair) &&
                    this.onlyKeyEnter
                ) {
                    return;
                }
    
                if (this.form3.total == "") {
                    this.form3.quantity = 0;
                }
                if (
                    this.form3.total != "" &&
                    !isNaN(this.form3.total) &&
                    this.form3.at_price != ""
                ) {
                    var qty = exactMath.div(this.form3.total, this.form3.at_price, config);
                    this.form3.quantity =
                        parseInt(this.decimal_currency) == 0 ?
                        parseInt(qty) :
                        this.trimIt(qty, parseInt(this.decimal_currency));
                    this.onlyKeyEnter = true;
                }
            },
            atPriceChange() {
    
                if (this.commonCheck(this.form3.at_price, this.decimal_pair)) {
                    return;
                }
                if (this.form3.at_price == "" || parseFloat(this.form3.at_price) == 0) {
                    return (this.form3.quantity = this.form3.total = 0);
                }
                if (
                    this.form3.at_price != "" &&
                    !isNaN(this.form3.at_price) &&
                    this.form3.total != ""
                ) {
                    var amt = exactMath.div(
                        this.form3.total,
                        this.form3.at_price
                    );
    
                    this.form3.quantity =
                        parseInt(this.decimal_currency) == 0 ?
                        parseInt(amt) :
                        this.trimIt(amt, parseInt(this.decimal_currency));
                    // this.trimIt(amt, 8);
    
                    this.amountChange();
                }
            },
            tabChange(type) {
                this.submitted = false;
                this.type = type;
    
                this.totalWalletBalance();
            },
            async submitForm3() {
                this.submitted = true;
                // this.$v.$touch();
                // if (this.$v.form3.$invalid) {
                //     return;
                // }
                
                const isFormCorrect = await this.v$.form3.$validate();
                if (!isFormCorrect) return;
                this.submitted = false;
                this.loading = true;
                this.form3.order_type = this.order_type;
                this.form3.type = this.type;
                this.form3.currency = this.currency;
                this.form3.quantity = parseFloat(this.form3.quantity);
                this.form3.at_price = parseFloat(this.form3.at_price);
                this.form3.with_currency = this.with_currency;
    
                if (localStorage.getItem("token")) {
                    this.apifunction(this.form3);              
                    return;
                }
                this.$router.push({
                    name: "Login"
                });
            },
            percentChange(percent) {
    
                var totalbalance =
                    this.balance == undefined || this.balance == null ? 0 : this.balance;
    
                if (this.order_type == "buy") {
    
                    this.form3.total =
                        parseInt(this.decimal_pair) == 0 ?
                        parseInt(this.percentage(totalbalance, percent)) :
                        this.trimIt(
                            this.percentage(totalbalance, percent),
                            parseInt(this.decimal_pair)
                        );
                    // this.trimIt(this.percentage(totalbalance, percent), 8);
                    this.onlyKeyEnter = false;
                    this.totalChange();
                } else {
    
                    this.form3.quantity =
                        parseInt(this.decimal_currency) == 0 ?
                        parseInt(this.percentage(totalbalance, percent)) :
                        this.trimIt(
                            this.percentage(totalbalance, percent),
                            parseInt(this.decimal_currency)
                        );
    
                    this.onlyKeyEnter = false;
                    this.amountChange();
                }
            },
            percentage(num, per) {
                return (num / 100) * per;
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
                this.v$.$reset();
                this.order_type = tab;
                this.balanceCurrency =
                    this.order_type == "buy" ? this.with_currency : this.currency;
                this.totalWalletBalance();
            },
            totalWalletBalance() {
                var currency =
                    this.order_type == "buy" ? this.with_currency : this.currency;
                var x = this.funds.find((ele) => {
                    return ele.currency == currency;
                });
    
                this.balance = this.totalbalance = x ?.balance;
    
                // this.totalbalance = totalbalance + "" + currency;
            },
            setValue(value = null, decimal = null) {
    
                value = value.toString();
    
                if (decimal == 0 && value != "") {
    
                    return parseInt(value);
                }
    
                if (
                    decimal != 0 &&
                    value != "" &&
                    value.indexOf(".") != -1 &&
                    value.split(".")[1].length > decimal
                ) {
    
                    return parseFloat(value.slice(0, -decimal));
                }
            },
        },
    
        watch: {
            $route: function (e) {
                this.slug = e.params.slug;
                this.allmarketcurrency = this.$store.getters.getMarketCurrency;
                // if (this.allmarketcurrency) {
                var decimal_data = this.allmarketcurrency ?.find((ele) => {
                    return ele.symbol == this.slug;
                });
    
                this.decimal_currency = parseInt(decimal_data.decimal_currency);
                this.decimal_pair = parseInt(decimal_data.decimal_pair);
                // this.totalWalletBalance();
                // }
                if (localStorage.getItem("token")) {
                    this.showPercent = true;
                    this.getFunds();
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
                var $this = this;
                $this.getFunds();
                var orderinfo = JSON.parse(e);
    
                if (!Object.prototype.hasOwnProperty.call(orderinfo, "cancelId")) {
                    var slug = orderinfo.currency + orderinfo.with_currency;
                    var oldslug = this.currency + this.with_currency;
                    if (oldslug != slug) {
                        this.$router.push(slug);
                    }
                    this.form3.at_price = orderinfo.at_price;
                    this.form3.quantity = orderinfo.quantity;
                    this.form3.total = orderinfo.total;
                    this.order_type = orderinfo.order_type;
                    this.balanceCurrency =
                        this.order_type == "buy" ? this.with_currency : this.currency;
                    this.type = orderinfo.type;
                }
            },
            "$store.state.sluginfo.slug": function () {
                this.current_info = this.$store.state.sluginfo;
    
                // this.decimal_currency = this.current_info.decimal_currency;
                // this.decimal_pair = this.current_info.decimal_pair;
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
                    this.with_currency == "USDT" ?
                    this.current_info.slug.slice(0, this.current_info.slug.length - 4) :
                    this.currency;
                var atPrice = this.current_info.current_price;
                this.balanceCurrency =
                    this.order_type == "buy" ? this.with_currency : this.currency;
                this.form3.at_price =
                    parseInt(this.decimal_pair) == 0 ?
                    exactMath.floor(atPrice) :
                    exactMath.floor(atPrice, -parseInt(this.decimal_pair), config);
    
            },
            "$store.getters.getSlugInfo": function () {
                var slug_info = this.$store.getters.getSlugInfo;
                this.current_high = slug_info.current_high;
                this.current_low = slug_info.current_low;
    
            },
            "$store.getters.getAmount": function () {
                if (this.$store.getters.getAmount) {
                    this.amtJson = this.$store.getters.getAmount;
                    this.form3.quantity = this.amtJson.amount;
                    this.order_type = this.amtJson.type;
                }
            },
    
        },
    };
    </script>
    
    <style scoped>
    .form-check-input:checked {
        background-color: var(--green);
        border-color: var(--green);
    }
    
    .form-check-red:checked {
        background-color: var(--red);
        border-color: var(--red);
    }
    
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
        display: inline-block;
        vertical-align: middle;
    }
    
    .amount_heading {
        display: flex;
        justify-content: space-between;
    }
    
    .amount_heading .left-text {
        /* justify-content: right;
       */
        text-align: right;
        font-size: 12px;
        cursor: pointer;
    }
    
    .amount_heading .left-text .green-text {
        color: var(--green);
        float: right;
    }
    
    .amount_heading .left-text .red-text {
        color: var(--red);
    }
    
    .wallet_balance {
        padding-left: 10px;
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
    </style>
    