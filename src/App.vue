<template>
    <div id="app">
        <Navbar />
        <router-view />
        <Footer v-if="!state"/>
        <!-- Toast Message Html 
    
        data-bs-autohide="true"
        -->
        <div class="toast text-white position-absolute p-3" data-bs-autohide="true" id="basicToast" style="z-index: 11">
            <div class="d-flex">
                <div class="toast-body" id="msgToast"></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import Navbar from "@/components/Navbar.vue";
    import Footer from "@/components/Footer.vue";
    import ApiClass from "./api/api.js";
    
    export default {
        data: () => ({
            mobileAt: 991,
            maintenanceInt: null,
        }),
        state:false,
        components: {
            Navbar,
            Footer,
        },
        watch:{
               "$route.path":function(v){
                if(v.includes("exchange")){
                    this.state = true;
                }else{
                    this.state =false;
                }
               }
        },
        mounted() {
            // document.body.style.zoom = "90%";
            window.addEventListener("resize", this.resizeHandler);
            var value = window.innerWidth <= this.mobileAt ? true : false;
            this.$store.commit("changeMob", value);
    
            this.nodeHit();
            
        },
    
        methods: {
            resizeHandler(e) {
                var value = e.target.innerWidth <= this.mobileAt ? true : false;
                this.$store.commit("changeMob", value);
            },
            async nodeHit() {
                var data = await ApiClass.getNodeRequest("user/get/authority", false);
                var arr = data.data.data ?.find(
                    (element) => element.type == "maintenance"
                );
    
                if (arr) {
                    this.$store.commit("initialMaintenance", arr.status);
    
                    if (arr.status == "on") {
                        this.maintenanceInt = setInterval(() => {
                            this.$store.commit("initialMaintenance", arr.status);
                            if (this.$router.currentRoute.path != "/maintenance") {
                                localStorage.clear();
                                window.location.href = window.location.origin + "/maintenance";
                            }
                        }, 1000);
                    }
                }
    
                var socketConnection = new WebSocket(ApiClass.nodeWebsocket);
    
                socketConnection.onopen = function () {
                    console.log("Successfully connected to the trade history...");
                };
    
                socketConnection.onclose = function (event) {
                    console.log("Successfully Disconnected to the trade history...", event);
                };
    
                var Streamer = socketConnection;
                var $this = this;
                socketConnection.onopen = function onStreamOpen() {
                    Streamer.onmessage = function (event) {
                        // console.log(event.data);
                        var status = JSON.parse(event.data).status;
                        if (status) {
                            $this.$store.commit("initialMaintenance", status);
                            if (status == "on") {
                                $this.maintenanceInt = setInterval(() => {
                                    $this.$store.commit("initialMaintenance", arr.status);
                                    if ($this.$router.currentRoute.path != "/maintenance") {
                                        localStorage.clear();
                                        window.location.href =
                                            window.location.origin + "/maintenance";
                                    }
                                }, 1000);
                                //   $this.$router.push("/maintenance");
                            } else {
                                clearInterval($this.maintenanceInt);
                                $this.$router.push("/");
                            }
                        }
                    };
                };
            },
        },
    };
    </script>
    
    <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap");
    
    .portfolio-currency-heading span table {
        border-color: #fff !important;
    }
    
    .flash-message {
        z-index: 999;
        position: absolute;
    }
    
    .error-msg {
        color: darkred;
        font-size: 14px;
        font-weight: 600;
        padding-left: 7px;
    }
    
    .flash-message ._vue-flash-msg-body._vue-flash-msg-body_success {
        border: 1px solid var(--green);
        background-color: var(--green) !important;
        width: fit-content;
    }
    
    ._vue-flash-msg-body._vue-flash-msg-body_error {
        border: 1px solid var(--red);
        background-color: var(--red) !important;
        width: fit-content;
    }
    
    ._vue-flash-msg-body._vue-flash-msg-body_error ._vue-flash-msg-body__content {
        padding: 0;
    }
    
    ._vue-flash-msg-body._vue-flash-msg-body_success ._vue-flash-msg-body__content {
        padding: 0;
    }
    
    ._vue-flash-msg-body__title {
        display: none;
    }
    
    ._vue-flash-msg-body__text {
        margin: 0;
        padding: 8px 16px;
    }
    
    html,
    body {
        font-family: "Poppins", sans-serif;
        counter-reset: my-sec-counter;
    }
    
    #app {
        font-family: "Poppins", sans-serif;
    }
    
    /** LIGHT **/
    :root {
        --notify-bg:#101621;
        --exchange-bg: #fff;
        --green: #23ac50;
        --red: #f1432f;
        --white: #fff;
        --black: #000;
        --nav-active: #495057;
        --nav-bg: #f5f8fa;
        --serach-border: rgb(34 35 38 / 19%);
        --pair-list: #9b9b9b;
        --ticker-border: hsla(0, 0%, 59.2%, 0.2);
        --ticker-sub: #92989b;
        --fav-color: #dca92d;
        --exchange-scroll: hsl(210deg 4% 78%);
        --box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
        --upper-border: #cccc;
        --order-nav-bg: rgb(247, 250, 252);
        --depth-table-head: #5c5c5cf1;
        --order-depth-td: #000;
        --login-bg: rgba(255, 255, 255, 0.7);
        --login-span-color: rgb(28, 27, 33);
        --login-border-color: rgba(28, 27, 33, 0.07);
        --border-color: rgb(0 0 0 / 28%);
        --chart-tab-btn: rgb(177, 177, 178);
        --limit-tab-bg: #f1f1f1;
        --input-border: #ced4da;
        --buy-active-color: #fff;
        --bg-red: rgb(255 61 0 / 11%);
        --bg-green: rgb(43 205 118 / 11%);
        --blog-text: #dca92d;
    
        --signup-btn: #dca92d;
        --section-bg: #111111;
        --table-head-color: rgba(0, 0, 0, 0.5);
        --trade-bg: #ededed;
        --hover-link: #0066edba;
        --dark-bg: #111111;
        --trading-form: #ededed;
        --social-link: #dca92d;
    
        --bq-gray: #5f6368;
        --staking-tr-bg: #e5f4ff;
        --green: #06a43a;
        --light-text: #e3e3e3f1;
        --dark-hover: #5367742e;
        --grey-text: #6c757d;
        --bq-link: #5661ff;
        --ieo: #808e9b;
        --ieo-border: #dce1e6;
    
        --bit-referral: rgb(23, 57, 79);
        --gray-text: rgba(111, 117, 131);
        --border-box: #dca92d;
    
        --kb-blue: #17394f;
        --kb-border: #d7d7d7;
        --kb-black: #303030;
        --kb-nav: #dca92d;
        --kb-head: #222e62;
        --kb-white: #fff;
        --kb-light-gray: #f7f7f7;
    
        --test:#000;
        --cross-white: url('./assets/cross-black.svg')
    }
    
    /** DARK **/
    /* :root {
        --exchange-bg: rgb(11 11 11);
        --border-color: #9d9797;
        --green: #23ac50;
        --red: #f1432f;
        --black: #fff;
        --white: #000;
        --nav-active: #d6dce2;
        --nav-bg: #101621;
        --serach-border: #ccc;
        --pair-list: #9b9b9b;
        --ticker-border: hsla(0, 0%, 59.2%, 0.2);
        --ticker-sub: #92989b;
        --fav-color: #ff9b00;
        --exchange-scroll: hsl(210deg 4% 78%);
        --box-shadow: 1px 0px 10px #e7e7e747;
        --upper-border: #fff;
        --order-nav-bg: #404142;
        --depth-table-head: #bdbdbdf1;
        --order-depth-td: #a8a7a7;
        --login-bg: rgba(19, 16, 16, 0.7);
        --login-span-color: rgb(28, 27, 33);
        --login-border-color: rgba(28, 27, 33, 0.07);
        --chart-tab-btn: rgb(177, 177, 178);
        --limit-tab-bg:#404142;
        --buy-active-color: #fff;
    
      } */
    .bg-exchange {
        background-color: #111111;
    }
    
    /* width */
    body::-webkit-scrollbar {
        width: 5px;
    }
    
    /* Track */
    body::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    
    /* Handle */
    body::-webkit-scrollbar-thumb {
        background: #000;
    }
    
    
    section {
        padding: 70px 0;
    }
    
    .slick-prev:before,
    .slick-next:before {
        font-family: "slick";
        font-size: 20px;
        line-height: 1;
        opacity: 1 !important;
        color: var(--white) !important;
    }
    
    .slick-prev {
        left: 0px !important;
        z-index: 1 !important;
        height: 60px !important;
        width: 40px !important;
    }
    
    .slick-next {
        right: 0px !important;
        z-index: 1 !important;
        height: 60px !important;
        width: 40px !important;
    }
    
    .slick-dots {
        bottom: -16px !important;
    }
    
    .slick-prev,
    .slick-next {
        background: #0000004c !important;
    }
    
    /* .token_box ::-webkit-scrollbar-thumb {
        background-color: #DCE1E5;
        border-radius: 8px;
        border: 2px solid #fff;
        box-sizing: border-box;
    }
     .token_box ::-webkit-scrollbar-track {
        background: #fff;
        box-sizing: border-box;
    } */
    
    /************* ScrollBar Css *************/
    
    .token_box ::-webkit-scrollbar {
        background: transparent;
        width: 3px;
        height: 0;
        border-radius: 10px;
    }
    
    .token_box ::-webkit-scrollbar-thumb {
        background-color: var(--ieo-border);
        border: solid rgba(0, 0, 0, 0) 2px;
        transition: all 0.4s ease;
    }
    
    @media all and (min-width: 320px) and (max-width: 350px) {
        .recaptcha-box {
            display: flex;
            justify-content: center;
        }
    
        iframe {
            border: 0;
            transform: scale(0.9) !important;
        }
    }
    
        /************** FEE PAGE CSS START *************/	
    /* .portfolio-currency-heading {	
        overflow: scroll;	
    }	 */
    .portfolio-currency-heading table {	
        height: auto !important;	
        overflow: scroll;	
    }	
    .portfolio-currency-heading table tbody tr td {	
        text-align: center;	
        vertical-align: middle;	
        padding: 15px 15px;	
    }	
    .portfolio-currency-heading table tbody tr td h1 {	
        font-size: 16px;	
        text-transform: uppercase;	
        font-weight: 600;	
        color: var(--white);	
        margin: 0;	
        white-space: nowrap;	
    }
    </style>
    