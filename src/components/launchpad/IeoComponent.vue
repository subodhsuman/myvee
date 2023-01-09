<template>
<div class="p-2">
    <div  v-if="status=='upcoming'"></div>
    <!-- ________IEO BOX________ -->
    <div v-else>
        <div class="ieo_box">
            <div class="ieo_haed">
                <h6 class="p-3" v-if="mainData">
                    {{ mainData.name }}
                </h6>
            </div>

            <!-- IEO ROUND TABLE HEAD-->
            <div class="ieo_round d-flex justify-content-between p-2">
                <div class="round">
                    <span class="text-uppercase">IEO Round</span>
                </div>
                <div class="price">
                    <span class="text-uppercase">IEO Price</span>
                </div>
            </div>
            <!--IEO ROUND TABLE CONTENT -->
            <div class="round_content d-flex justify-content-between align-items-center p-2" :class="round.status?'active' : ''" v-for="(round, index) in mainData.rounds" :key="index">
                <div class="round_content_box">
                    <h5> Round {{ index + 1 }}</h5>
                    <span class="text-capitalize">{{new Date(round.started_at).toLocaleString("en-us", Date_options)}}-{{new Date(round.expired_at).toLocaleString("en-us", Date_options)}} </span>
                </div>
                <div class="round_content_box">
                    <h5 class="text-uppercase">{{ round.price }} {{ round.currency }} </h5>
                </div>
            </div>
            <div class="p-3" v-if="status=='past'">Crowdsale ended.</div>
            <div v-if="status=='ongoing'">
                <form class="row p-3">
                    <div class="col-md-7 col-lg-7 col-xl-12 col-xxl-7">
                        <div class="position-relative">
                            <label for="basic-url" class="form-label px-1">Amount</label>
                            <div class="input-group mb-3 ">
                                <input v-model="tokenAmount" onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == -1)))" type="text" class="form-control mt-4" id="basic-url" aria-describedby="basic-addon3" required />
                            </div>
                        </div>
                    </div>

                    <div class="col-md-5 col-lg-5 col-xl-12 col-xxl-5">
                        <div class="position-relative">
                            <label for="basic-url" class="form-label px-1">Currency</label>
                            <div class="input-group mb-3 ">
                                <!-- dropdown  -->
                                <div class="currency_box  w-100 mt-4">
                                    <div class="select-box">
                                        <div class="dropdown">
                                            <!-- <button class="btn_drop   dropdown-toggle d-flex align-items-between align-items-center w-100" type="button" id="dropdownMenuButtonbuy-sell" data-bs-toggle="dropdown" aria-expanded="false"> -->
                                            <select class="btn_drop   dropdown-toggle d-flex align-items-between align-items-center w-100" id="dropdownMenuButtonbuy-sell" data-bs-toggle="dropdown" aria-expanded="false">
                                                <option class="list_items  px-2 rounds" aria-labelledby="dropdownMenuButtonbuy-sell" selected="1">USDT</option>
                                            </select>
                                            <!-- </button> -->
                                            <!-- <ul class="dropdown-menu" aria-labelledby="dropdownMenuButtonbuy-sell">
                                        <li class="list_items  px-2" v-for="(currencylist, index) in CurrencyListData" :key="index" @click="currencySelect(currencylist)">
                                            <p class="mb-0 pe-1">{{ currencylist.currencyname }}</p>
                                            <span>{{ currencylist.subname }}</span>
                                        </li>
                                    </ul> -->

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Minimum amount -->
                    <div class="col-md-12 col-lg-12 col-xl-12 ">
                        <div class="Min_amt d-flex justify-content-between mb-2">
                            <span>Minimum amount</span>
                            <span class="border_bottom"></span>
                            <span class="text-uppercase"> 1 {{ mainData.symbol }}</span>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-xl-12 ">
                        <div class="Min_amt  d-flex justify-content-between mb-2">
                            <span>Amount to pay</span>
                            <span class="border_bottom"></span>
                            <span class="text-uppercase"> {{parseFloat(roundPrice*tokenAmount)}} {{currency}}</span>
                        </div>
                    </div>
                    <div class="minimum-amount d-flex justify-content-between  mb-3 error" v-if="submitted&& zeroBalance">
                        <span style="color:red;">You Don't Have Sufficient Balance</span>
                    </div>

                    <div class="col-md-12">
                        <div class="text-center mt-3">
                            <button type="button" class="order_btn w-100" @click="placeOrder">
                                Place Order
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ApiClass from '@/api/api';
export default {
    name: 'IeoComponent',
    props: {
        roundData: Object,
        status: String
    },
    watch: {
        roundData: function (v) {
            console.log(v, "rounds");
            if (!v) return this.mainData = {};
            console.log({ v });
            this.mainData = v;
            console.log(this.mainData, "maindata");
            this.activeRound = this.mainData.rounds.find((ele) => { return ele.status == true });
            this.roundPrice = this.activeRound.price;
        },
    },
    data() {
        return {
            activeRound: {},
            submitted: false,
            zeroBalance: false,
            funds: [],
            mainData: {},
            tokenAmount: null,
            currency: 'usdt',
            roundPrice: null,
            amountToPay: 0.3,
            Date_options: {
                day: "numeric",
                month: "long"
            },
            RoundData: {},
            currencylist: {
                currencyicon: "cu-usdt.png",
                currencyname: "Tether",
                subname: 'usdt'
            },

            CurrencyListData: [{
                    currencyicon: "cu-usdt.png",
                    currencyname: "Tether",
                    subname: 'usdt'
                },
                {
                    currencyicon: "aave.png",
                    currencyname: "aave",
                    subname: 'aave'
                },

            ]
        }
    },
    mounted() {
        if (localStorage.getItem("token")) { this.getFunds(); }
    },

    methods: {
        currencySelect(select_Currency) {
            console.log("currencySelect");
            this.currencylist = select_Currency;
        },
        async getFunds() {
            this.logeedIn = true;
            let ress = await ApiClass.getNodeRequest("user-crypto/funds/get", true);
            let allFunds = ress.data.data || [];
            this.funds = allFunds.find((v) => { return v.currency == 'USDT' })
            if (this.funds.balance == '0') this.zeroBalance = true;
        },
        async placeOrder() {
            this.submitted = true;
            this.zeroBalance = this.roundPrice * this.tokenAmount > parseFloat(this.funds.balance) ? true : false;
            if (this.zeroBalance) { return; }
            if (!localStorage.getItem("token")) { return this.$router.push('/login') }

            this.submitted = false;
            var data = {
                "launch_token_id": this.mainData.launch_token_id,
                "amount": this.tokenAmount,
                "currency": this.mainData.currency,
                "pay_amount": this.roundPrice * this.tokenAmount,
                "launch_round_id": this.activeRound.t_id,
            }
            let response = await ApiClass.postNodeRequest('launchpad/order_place', true, data);
            console.log({ response });
            if (response.data.status_code == 1) {
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                })
                this.tokenAmount = "";

            } else {
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
            }

        }
    }
}
</script>

<style scoped>
.round span,
.price span {
    color: var(--ieo);
    font-size: 14px;
}

.ieo_round {
    box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
}

.round_content {
    border-bottom: 1px solid var(--ieo-border);
}

.round_content h5 {
    font-size: 14px;
    color: var(--black);
    font-weight: 700;
    margin-bottom: 0;
}

.round_content span {
    color: #1e272e;
    font-size: 12px;
}

label {
    position: absolute;
    top: 14px;
    left: 13px;
    font-size: 14px;
    z-index: 1;
    background: var(--white);
}

.form-control {
    padding: 15px 10px;
    border: 1px solid var(--ieo-border);
    background-color: transparent;
    font-size: 14px;
}

.form-control:focus {
    box-shadow: none;
    color: var(--black);
    background-color: transparent;
    border-color: var(--ieo-border);
    z-index: -1;
}

.btn_drop {
    background: transparent;
    color: var(--black);
    border: 1px solid var(--ieo-border);
    padding: 15px 10px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    border-radius: 0.375rem;
}

.dropdown-menu {
    --bs-dropdown-min-width: 8rem;
}

.dropdown ul li {
    cursor: pointer;
}

.border_bottom {
    flex: 1;
    margin: 0 5px;
    border-bottom: 1px solid var(--ieo-border);
}

.Min_amt span {
    font-size: 12px;
}

.order_btn {
    background-color: var(--dark-bg);
    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 0px;
    cursor: pointer;
    color: var(--white);
}

.round_content h5 {
    color: var(--chart-tab-btn);
}

.round_content.active .round_content_box h5 {
    color: var(--black);
}

.round_content.active {
    color: var(--black);
}

.round_content_box span {
    font-size: 12px;
    color: var(--chart-tab-btn);
}

.round_content.active .round_content_box span {
    color: var(--black);
}
</style>
