<template>
<div class="crypto-sel-main">
    <section class="cryptobuysell-sec">
        <div class="container">
            <!-- <MainHeading heading_main_title="Buy & Sell Crypto" /> -->
            <Heading title="Buy & Sell Crypto" />

            <div class="row top-row">
                <div class="col-xl-5 col-lg-8 col-md-10 mx-auto">
                    <div class="cryptosell-tab">
                        <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="buy-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="buy" aria-selected="true" @click="type = 'buy'">
                                    Buy
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="sell-tab" data-bs-toggle="tab" data-bs-target="#buy" type="button" role="tab" aria-controls="sell" aria-selected="false" @click="type = 'sell'">
                                    Sell
                                </button>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-pane show active" id="buy" role="tabpanel" aria-labelledby="buy-tab">
                                <div class="buysell-inner-box">
                                    <div class="inner-warpper">
                                        <div class="buysell-box">
                                            <form>
                                                <div class="col-xl-12 col-lg-12 col-md-12 mb-4">
                                                    <div class="live-price-text">
                                                        <p>
                                                            1 {{ currency }} ≈ {{ calPrice }}
                                                            {{ title }}
                                                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-text">
                                                                    <path d="M2 10V8l5-5 1.414 1.414L4.83 8h17.17v2H2zM22 14v2l-5 5-1.414-1.414L19.172 16H2v-2h20z" fill="#76808F"></path>
                                                                </svg>
                                                            </span>
                                                        </p>
                                                    </div>
                                                    <!--live-price-text-->
                                                </div>
                                                <!--col-xl-12 col-lg-12 col-md-12-->
                                                <div class="col-xl-12 col-lg-12 col-md-12 mb-4">
                                                    <div class="label-head">
                                                        <span>Select Pair here</span>
                                                    </div>
                                                    <!--label-head-->
                                                    <div class="main-select">
                                                        <v-select v-on:input="pairChange(selected)" v-model="selected" :options="pairs" label="title"></v-select>
                                                    </div>
                                                    <!--main-select-->
                                                </div>
                                                <!--col-xl-12 col-lg-12 col-md-12-->

                                                <div class="col-xl-12 col-lg-12 col-md-12 mb-4">
                                                    <div class="label-head">
                                                        <span>Select Currency</span>
                                                    </div>
                                                    <div class="input-group">
                                                        <span class="d-flex text-center" id="pay-box">
                                                            <div class="main-select">
                                                                <v-select id="mySelect" v-on:input="assignIt(select)" v-model="select" :options="currencies" label="currency"></v-select>

                                                            </div>
                                                            <!--main-select-->
                                                        </span>
                                                        <input type="text" class="form-control" placeholder="0" aria-label="0" aria-describedby="pay-box" v-model="numberValue" onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == -1)))" />
                                                    </div>
                                                </div>
                                                <!--col-xl-12 col-lg-12 col-md-12-->

                                                <div class="col-12">
                                                    <button type="submit" class="btn btn-primary" id="buy-btn" v-if="type == 'buy'" @click.prevent="goTo()">
                                                        Buy
                                                    </button>

                                                    <button type="submit" class="btn btn-primary" id="sell-btn" v-else @click.prevent="goTo()">
                                                        Sell
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                        <!--buysell-box-->
                                    </div>
                                    <!--inner-warpper-->
                                </div>
                                <!--buysell-inner-box--->
                            </div>
                            <!--buysell-inner-box-->

                            <div class="tab-pane" id="sell" role="tabpanel" aria-labelledby="sell-tab">
                                <div class="buysell-inner-box">
                                    <div class="inner-warpper">
                                        <div class="buysell-box">
                                            <form>
                                                <div class="col-xl-12 col-lg-12 col-md-12 mb-4">
                                                    <div class="live-price-text">
                                                        <p>
                                                            1 BTC ≈ 0.00000004 BTC
                                                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" class="css-text">
                                                                    <path d="M2 10V8l5-5 1.414 1.414L4.83 8h17.17v2H2zM22 14v2l-5 5-1.414-1.414L19.172 16H2v-2h20z" fill="#76808F"></path>
                                                                </svg></span>
                                                        </p>
                                                    </div>
                                                    <!--live-price-text-->
                                                </div>
                                                <!-- <div class="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <div class="label-head">
                              <span>Select Pair</span>
                            </div>

                            <div class="main-select">
                              <v-select
                                @change="pairChange(selected)"
                                v-model="selected"
                                :options="pairs"
                                label="title"
                              ></v-select>
                            </div>

                          </div> -->
                                                <!--col-xl-12 col-lg-12 col-md-12-->

                                                <!-- <div class="col-xl-12 col-lg-12 col-md-12 mb-4">
                            <div class="label-head">
                              <span>Select Curerncy</span>
                            </div>
                            <div class="input-group">
                              <span class="input-group-text" id="pay-box">
                                <div class="main-select">
                                  <v-select
                                    v-model="select"
                                    :options="currencies"
                                    label="currency"
                                  ></v-select>
                                </div>
                              </span>
                              <input
                                type="text"
                                class="form-control"
                                placeholder="0"
                                aria-label="0"
                                aria-describedby="pay-box"
                              />
                            </div>
                          </div> -->
                                                <!--col-xl-12 col-lg-12 col-md-12-->

                                                <!-- <div class="col-12">
                            <button
                              type="submit"
                              class="btn btn-primary"
                              id="sell-btn"
                            >
                              Sell
                            </button>
                          </div> -->
                                            </form>
                                        </div>
                                        <!--buysell-box-->
                                    </div>
                                    <!--inner-warpper-->
                                </div>
                                <!--buysell-inner-box--->
                            </div>
                        </div>
                    </div>
                    <!--cryptosell-tab-->
                </div>
                <!--col-xl-8 col-lg-12 col-md-12-->
            </div>
            <!--row top-row-->
        </div>
        <!--container-->
    </section>
    <!--cryptobuysell-sec-->

    <section class="buy-sell-hint">
        <div class="container">
            <Heading title="Where You Trade Crypto in 3 Steps" info="Myvee is a safe and secure platform to buy and sell cryptocurrencies quickly using" subinfo="our streamlined buy/sell process. You're just three steps away from your first Bitcoin." />
            <!-- <MainHeading
          heading_main_title="Where You Trade Crypto in 3 Steps"
          heading_main_desc="Bitqix is a safe and secure platform to buy and sell cryptocurrencies quickly using"
          heading_sub_desc="our streamlined buy/sell process. You're just three steps away from your first Bitcoin."
        /> -->
            <div class="row">
                <div class="col-xl-4 col-lg-4 col-md-4">
                    <div class="hint-main-box">
                        <div class="hint-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="35" height="35" style="fill: var(--white)">
                                <path d="M19 8h-2v3h-3v2h3v3h2v-3h3v-2h-3zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z"></path>
                            </svg>
                        </div>
                        <!--hint-icon-->

                        <div class="hint-info">
                            <span>Register for an account</span>
                        </div>
                        <!--hint-info-->
                    </div>
                    <!--hint-main-box-->
                </div>
                <!--col-xl-4 col-lgt-4 col-md-4-->

                <div class="col-xl-4 col-lg-4 col-md-4">
                    <div class="hint-main-box">
                        <div class="hint-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style="fill: var(--white)">
                                <path d="M19 2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l3 3 3-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-7 3c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zM7.177 16c.558-1.723 2.496-3 4.823-3s4.266 1.277 4.823 3H7.177z"></path>
                            </svg>
                        </div>
                        <!--hint-icon-->

                        <div class="hint-info">
                            <span>Verify your identity</span>
                        </div>
                        <!--hint-info-->
                    </div>
                    <!--hint-main-box-->
                </div>
                <!--col-xl-4 col-lgt-4 col-md-4-->

                <div class="col-xl-4 col-lg-4 col-md-4">
                    <div class="hint-main-box">
                        <div class="hint-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style="fill: var(--white)">
                                <path d="m11.953 8.819-.547 2.19c.619.154 2.529.784 2.838-.456.322-1.291-1.673-1.579-2.291-1.734zm-.822 3.296-.603 2.415c.743.185 3.037.921 3.376-.441.355-1.422-2.029-1.789-2.773-1.974z"></path>
                                <path d="M14.421 2.299C9.064.964 3.641 4.224 2.306 9.581.97 14.936 4.23 20.361 9.583 21.697c5.357 1.335 10.783-1.924 12.117-7.281 1.336-5.356-1.924-10.781-7.279-12.117zm1.991 8.275c-.145.974-.686 1.445-1.402 1.611.985.512 1.485 1.298 1.009 2.661-.592 1.691-1.998 1.834-3.87 1.48l-.454 1.82-1.096-.273.447-1.794a44.624 44.624 0 0 1-.875-.228l-.449 1.804-1.095-.275.454-1.823c-.257-.066-.517-.136-.782-.202L6.87 15l.546-1.256s.808.215.797.199c.311.077.448-.125.502-.261l.719-2.875.115.029a.864.864 0 0 0-.114-.037l.512-2.053c.013-.234-.066-.528-.511-.639.018-.011-.797-.198-.797-.198l.291-1.172 1.514.378-.001.005c.227.057.461.111.7.165l.449-1.802 1.097.273-.44 1.766c.294.067.591.135.879.207l.438-1.755 1.097.273-.449 1.802c1.384.479 2.396 1.195 2.198 2.525z"></path>
                            </svg>
                        </div>
                        <!--hint-icon-->

                        <div class="hint-info">
                            <span>Buy Crypto!</span>
                        </div>
                        <!--hint-info-->
                    </div>
                    <!--hint-main-box-->
                </div>
                <!--col-xl-4 col-lgt-4 col-md-4-->
            </div>
            <!--row-->
        </div>
        <!--container-->
    </section>
    <!--buy-sell-hint-->
</div>
</template>

<script>
// import MainHeading from "@/components/MainHeading.vue";
import Heading from "@/components/Home_New/Heading.vue";
import "vue-select/dist/vue-select.css";
import ApiClass from "@/api/api";
export default {
    name: "CryptoSell",
    components: {
        // MainHeading,
        Heading,
    },
    data() {
        return {
            type: "buy",
            selected: "Choose Pair...",

            pairs: [{
                    title: "USDT",
                },
                {
                    title: "BTC",
                },
                {
                    title: "TRX",
                },
                {
                    title: "MYV",
                },
            ],
            dataBtc: [],
            dataUsdt: [],
            dataTrx: [],
            dataMyv: [],
            currencies: [],
            numberValue: 1,
            price: 0,
            title: "USDT",
            currency: "BTC",
            symbol: "BTCUSDT",
            anyInt: 0,
            select: 'Choose'
        };
    },
    computed: {
        calPrice() {
            if (!isNaN(this.price) && this.numberValue) {
                return parseFloat(this.price) * parseFloat(this.numberValue);
            } else {
                return 0;
            }
        },
    },
    watch: {
        selected: function (v) {

            if (v === "BTC") {
                this.currencies = this.dataBtc;
            } else if (v === "USDT") {
                this.currencies = this.dataUsdt;
            } else if (v === "TRX") {
                this.currencies = this.dataTrx;
            } else if (v === "MYV") {
                this.currencies = this.dataMyv;
            }
            let data = this.select = this.currencies[0];
            this.assignIt(data);
        },
    },
    async mounted() {
        var response2 = await ApiClass.getNodeRequest("list-crypto/get", false);
        this.dataBtc = response2.data.data.BTC;
        this.dataUsdt = response2.data.data.USDT;
        this.dataTrx = response2.data.data.TRX;
        this.dataMyv = response2.data.data.MYV;
        this.price = parseFloat(this.dataUsdt[0] ?.price);
    },
    methods: {
        pairChange(pair) {
            this.title = pair.title;

            if (pair.title === "BTC") {
                this.currencies = this.dataBtc;
            } else if (pair.title === "USDT") {
                this.currencies = this.dataUsdt;
            } else if (pair.title === "TRX") {
                this.currencies = this.dataTrx;
            } else if (pair.title === "MYV") {
                this.currencies = this.dataMyv;
            }
        },
        assignIt(select) {
            this.symbol = select.symbol;
            this.price = parseFloat(select.price);
            this.currency = select.currency;
        },
        goTo() {
            console.log("hi");
            var data = {
                amount: this.numberValue,
                type: this.type,
            };
            if (localStorage.getItem("token")) {
                this.$store.commit("SET_AMOUNT", data);
                this.$router.push("/exchange/" + this.symbol);
            } else {
                this.$router.push({
                    name: "Login",
                    params: {
                        noImg: true,
                    },
                });
            }
        },
        // calPrice() {
        //   console.log(this.price, this.title, this.currency);
        //   return this.price * parseFloat(this.numberValue);
        // },
    },
};
</script>

<style scoped>
section.cryptobuysell-sec {
    /* padding: 80px 0;
  min-height: 80vh;
  padding-bottom: 0; */

    background-image: url(../assets/home_images/banner.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

section.cryptobuysell-sec::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: var(--dark-bg);
    z-index: -1;
}

.cryptosell-tab {
    border-radius: 2px;
}

.cryptosell-tab .nav-tabs {
    border-color: #fff;
}

.cryptosell-tab .nav-tabs .nav-link {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 19px;
    color: #fff;
    min-height: 40px;
    border: none;
    background-color: transparent;
    border-bottom: 4px solid #fff;
}

.cryptosell-tab .nav-tabs .nav-link.active {
    border-bottom: 4px solid #f0b90b;
}

button#buy-tab.active {
    border-color: var(--green);
}

button#sell-tab.active {
    border-color: var(--red);
}

.inner-warpper {
    background-color: #fff;
    margin: 10px 0;
    padding: 10px 10px;
    border-radius: 5px;
}

.main-select {
    width: 100%;
    cursor: pointer;
    background: #f2f2f2;
}

.label-head span {
    font-size: 14px;
    color: #b2b2b2;
    font-weight: 500;
}

span#pay-box {
    background-color: #f2f2f2;
    max-width: 150px;
    width: 100%;
    border: none;
}

.form-control {
    animation: none;
    /* height: 70px; */
    background-color: #f2f2f2;
    border-top: none;
    border-bottom: none;
    border-right: none;
    font-size: 16px;
    font-family: "Poppins";
    font-weight: 500;
    color: #000;
}

.form-control:focus {
    box-shadow: none;
    border-color: #ced4da;
}

button.btn.btn-primary {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    line-height: 26px;
    color: #ffffff;
    font-weight: 600;
    border-radius: 4px;
    width: 100%;
    height: 50px;
    text-transform: uppercase;
    margin: 0 auto;
}

button#buy-btn {
    background-color: var(--green);
    border-color: var(--green);
}

button#sell-btn {
    background-color: var(--red);
    border-color: var(--red);
}

button.btn.btn-primary:focus {
    box-shadow: none;
}

.live-price-text {
    text-align: center;
    padding: 10px 0;
    color: #707a8a;
    font-weight: 400;
    font-size: 17px;
    cursor: pointer;
}

svg.css-text {
    background-color: #d4d4d4;
    width: 30px;
    height: 30px;
    transform: rotate(89deg);
    border-radius: 20px;
    padding: 5px 0;
    fill: #fff;
}

/************************************************ BUY SELL HINT SEC START ************************************************/

section.buy-sell-hint {
    padding: 80px 0;
    background: var(--section-bg);
}

.hint-main-box {
    height: 150px;
    padding-top: 32px;
    padding-bottom: 32px;
    padding-left: 40px;
    padding-right: 40px;
    font-size: 24px;
    line-height: 28px;
    border: 1px solid var(--white);
    border-radius: 2px;
}

.hint-icon {
    margin-bottom: 32px;
}

.hint-info span {
    text-transform: uppercase;
    font-family: "Poppins";
    font-size: 18px;
    color: var(--white);
    font-weight: 500;
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
    .hint-info span {
        font-size: 15px;
    }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
    .hint-info span {
        font-size: 15px;
    }
}

@media all and (min-width: 768px) and (max-width: 991px) {
    section.cryptobuysell-sec {
        min-height: auto;
        padding: 40px 0;
    }

    .hint-main-box {
        padding: 15px 15px;
    }

    .hint-info span {
        font-size: 18px;
    }
}

@media all and (min-width: 320px) and (max-width: 767px) {
    section.cryptobuysell-sec {
        min-height: auto;
        padding: 40px 0;
    }

    .pay-image-box img {
        max-width: 250px;
    }

    span#pay-box {
        max-width: 113px;
        padding: 0;
    }

    .hint-main-box {
        margin-bottom: 15px;
    }

    .hint-main-box span {
        font-size: 15px;
    }
}
</style>
