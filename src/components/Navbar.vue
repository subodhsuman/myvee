<template>
<div>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/"><img src="../assets/new_images/logo.png" class="img-fluid" alt="no_logo" v-on:click="toggle=''" />
            </router-link>

            <!-- Notification Button -->
            <div class="d-flex align-items-center">
                <button @click="show()" v-if="loggedIn" style="cursor: pointer" class="position-relative notification_button d-lg-none d-block">
                    <svg class="notification" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: var(--white)">
                        <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z">
                        </path>
                    </svg>
                    <!-- Notification Badge  -->
                    <span class="tag badge bg-danger rounded-circle" v-if="unread > 0">{{ unread }}</span>

                    <!-- DropDown  -->
                    <div class="dropdown_menu" v-show="toggle">
                        <div class="row align-items-center padding-box">
                            <div class="col">
                                <h6 class="m-0">Notifications</h6>
                            </div>
                        </div>
                        <!-- Notification Box  -->
                        <div class="wrapper_box">
                            <!-- <router-link to="" class="text-decoration-none"> -->
                            <!-- Notification-1  -->
                            <div class="alert_box d-flex border-bottom border-1 py-2" v-for="(item, index) in notification" :key="index">
                                <div class="me-3">
                                    <span class="icon_size bg-primary rounded-circle fs-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1)">
                                            <path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z">
                                            </path>
                                        </svg>
                                    </span>
                                </div>
                                <div class="flex-grow-1">
                                    <div class="font-size-12 text-muted text-end">
                                        <p class="mb-1 helo text-start" v-html="item.content"></p>
                                        <button type="button" class="btn btn-primary btn_read_more" data-bs-toggle="modal" data-bs-target="#notification" v-if="item.content.length > 45" @click="notif_data = item.content">Read More
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- </router-link> -->
                        </div>

                    </div>
                </button>

                <button class="navbar-toggler" type="button" id="navbarNavToggle" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" v-on:click="toggle=''">
                    <span class="navbar-toggler-icon"><em class="fas fa-bars"></em></span>
                </button>
            </div>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto mb-lg-0 " id="upper-nav" v-on:click="toggle=''">
                    <li class="nav-item dropdown menu-text">
                        <a class="nav-link dropdown-toggle custom-drop py-1" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="../assets/menu.png" alt="" class="img-fluid">
                        </a>
                        <ul class="dropdown-menu menu-drop" aria-labelledby="navbarDropdown">
                            <li >
                                <router-link class="dropdown-item" to="/referralProgram"><img src="../assets/drop-1.png" alt="" class="img-fluid me-1"> Referral Prog
                                </router-link>
                            </li>
                            <!-- <li>
                                    <router-link class="dropdown-item" to="/staking"><img src="../assets/drop-2.png"
                                            alt="" class="img-fluid me-1"> Staking</router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/coming"><img src="../assets/drop-3.png"
                                            alt="" class="img-fluid me-1"> Airdrop</router-link>
                                </li>
                                <li>
                                    <router-link class="dropdown-item" to="/blog"><img src="../assets/blog.png" alt=""
                                            class="img-fluid me-1"> Blogs</router-link>
                                </li> -->
                        </ul>
                    </li>
                    <li class="nav-item" @click="closeToggle">
                        <router-link class="nav-link" to="/market">Market</router-link>
                    </li>

                    <li class="nav-item" @click="closeToggle">
                        <router-link class="nav-link" to="/cryptosell">Buy & Sell</router-link>
                    </li>

                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Spot
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <!-- USDT -->
                            <li @click="closeToggle">
                                <router-link class="dropdown-item" to="/exchange/BTCUSDT"><img src="../assets/portfolio_icon/usdt.png" alt="" class="img-fluid me-1" height="20px" width="20px" />
                                    USDT</router-link>
                            </li>
                            <!-- BTC -->
                            <li @click="closeToggle">
                                <router-link class="dropdown-item" to="/exchange/XMRBTC"><img src="../assets/portfolio_icon/btc.svg" alt="" class="img-fluid me-1" /> BTC
                                </router-link>
                            </li>
                            <!-- TRX -->
                            <li @click="closeToggle">
                                <router-link class="dropdown-item" to="/exchange/WINTRX"><img src="../assets/portfolio_icon/trx.svg" alt="" class="img-fluid me-1" /> TRX
                                </router-link>
                            </li>

                            <!-- ETH -->
                            <li @click="closeToggle">
                                <router-link class="dropdown-item" to="/exchange/NEOMYV"><img src="../assets/portfolio_icon/myv.png" alt="" class="img-fluid me-1" height="20px" width="20px" /> MYV
                                </router-link>
                            </li>
                        </ul>
                    </li>

                    <!-- <li class="nav-item" @click="closeToggle">
                            <router-link class="nav-link" to="/token">Launchpad</router-link>
                        </li> -->
                    <!-- new launchpad -->
                    <!-- <li class="nav-item" @click="closeToggle">
                            <router-link class="nav-link" to="/launchpad">Launchpad</router-link>
                        </li> -->

                    <li class="nav-item" @click="closeToggle">
                        <router-link class="nav-link" to="/coming">Staking</router-link>
                    </li>

                    <li class="nav-item" @click="closeToggle">
                        <router-link class="nav-link" to="/coming1">P2p</router-link>
                    </li>
                    <li class="nav-item" @click="closeToggle">
                        <router-link class="nav-link" to="/coming2">E-Commerce</router-link>
                    </li>
                </ul>

                <div class="right-nav-box d-flex">
                    <ul class="navbar-nav align-items-center">
                        <!-- Notification Button  -->
                        <li class="nav-item pe-3 d-none d-lg-block" v-if="loggedIn">
                            <button @click="show()" style="cursor: pointer" class="position-relative notification_button">
                                <svg class="notification" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" style="fill: var(--white)">
                                    <path d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z">
                                    </path>
                                </svg>
                                <!-- Notification Badge  -->
                                <span class="tag badge bg-danger rounded-circle" v-if="unread > 0">{{ unread }}</span>

                                <!-- DropDown  -->
                                <div class="dropdown_menu" v-show="toggle">
                                    <div class="row align-items-center pb-3 padding-box">
                                        <div class="col">
                                            <h6 class="m-0">Notifications</h6>
                                        </div>
                                    </div>
                                    <!-- Notification Box  -->
                                    <div class="wrapper_box">
                                        <div class="alert_box d-flex border-bottom border-1 py-2" v-for="(item, index) in notification" :key="index">
                                            <div class="me-3">
                                                <span class="icon_size bg-primary rounded-circle fs-6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" style="fill: rgba(255, 255, 255, 1)">
                                                        <path d="m5.705 3.71-1.41-1.42C1 5.563 1 7.935 1 11h1l1-.063C3 8.009 3 6.396 5.705 3.71zm13.999-1.42-1.408 1.42C21 6.396 21 8.009 21 11l2-.063c0-3.002 0-5.374-3.296-8.647zM12 22a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22zm7-7.414V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.184 4.073 5 6.783 5 10v4.586l-1.707 1.707A.996.996 0 0 0 3 17v1a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-1a.996.996 0 0 0-.293-.707L19 14.586z">
                                                        </path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="flex-grow-1">
                                                <div class="font-size-12 text-muted text-end">
                                                    <p class="mb-1 helo text-start" v-html="getcontent(item.content)"></p>
                                                    <button type="button" class="btn btn-primary btn_read_more" data-bs-toggle="modal" data-bs-target="#notification" v-if="item.content.length > 45" @click="notif_data = item.content">
                                                        Read More
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- </router-link> -->
                                    </div>

                                </div>
                            </button>
                        </li>

                        <li class="nav-item" @click="closeToggle" v-on:click="toggle=''">
                            <router-link class="nav-link" aria-current="page" :to="`/exchange/${slug_info.slug}`">Exchange 
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="loggedIn" @click="closeToggle" v-on:click="toggle=''">
                            <router-link class="nav-link" to="/portfolio">Portfolio</router-link>
                        </li>

                        <li class="nav-item" v-if="!loggedIn" @click="closeToggle" v-on:click="toggle=''">
                            <router-link class="nav-link" to="/login">Login</router-link>
                        </li>

                        <li class="nav-item" v-if="!loggedIn" @click="closeToggle" v-on:click="toggle=''">
                            <router-link class="nav-link" to="/signup">Get Started</router-link>
                        </li>

                        <li class="nav-item" v-if="loggedIn" @click="closeToggle" v-on:click="toggle=''">
                            <router-link class="nav-link" to="/settings/profile">Settings</router-link>
                        </li>

                        <li class="nav-item" v-if="loggedIn" @click="closeToggle" v-on:click="toggle=''">
                            <!-- <span class="nav-link" @click="logout">Log Out</span> -->
                            <button type="button" class="btn btn-primary logout fw-bold" data-bs-toggle="modal" data-bs-target="#exampleModal-1" id="logout">
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
    <Modal />

    <!-- Modal -->
    <div class="modal fade" id="notification" tabindex="-1" aria-labelledby="notificationLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="notificationLabel">Notifications</h5>
                    <button type="button" class="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="28px" width="28px" style="fill:var(--white)" viewBox="0 0 512 512">
                            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                            <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></svg>
                    </button>
                </div>
                <div class="modal-body" style="max-height:300px;overflow-y:scroll" v-html="notif_data">
                </div>
                <!-- <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

import ApiClass from "../api/api";

export default {
    name: "Navbar",
    components: {
        Modal,
    },

    data() {
        return {
            loggedIn: false,
            toggle: false,
            notification: [],
            unread: "",
            notif_data: '',
            slug_info:'',
            slsl:""
        };
    },
    mounted() {
        if (localStorage.getItem("token")) {
            this.loggedIn = true;
            // this.getNotifications();
        }
        document.addEventListener('click', this.close)
    },
    methods: {
        getcontent(a){
            return a.substring(0,30)+'...'
        },
        closeToggle() {
            const menuToggle = document.getElementById("navbarNav");
            menuToggle.classList.remove("show");
        },
        show() {
            if (this.unread != 0) {
                this.updateNotification();
            }
            this.toggle = !this.toggle;
        },
        async updateNotification() {
            if (localStorage.getItem("token")) {
                let response = await ApiClass.updateFormRequest("notification/read", true);

                if (response.data.status_code != 1) {
                    return;
                }

                this.unread = 0;
            }
        },
        close(e) {
            if (!this.$el.contains(e.target)) {
                this.toggle = false
            }
        },
        async getNotifications() {
            let response = await ApiClass.getRequest("notification/get", true);

            if (response.data.status_code != 1) {
                return;
            }

            if (response ?.data) {
                this.unread = response.data.data.totalcount ?? 0;
                this.notification = response.data.data.notifications ?? [];
            }
        }
    },

    async beforeCreate() {},
    watch: {
        $route() {
            if (localStorage.getItem("token")) {
                this.loggedIn = true;
                this.getNotifications();
            }
        },
        "$store.getters.getSlugInfo": function () {
            this.slug_info = this.$store.getters.getSlugInfo;
        },
    },
};
</script>

<style scoped>
/* width */
::-webkit-scrollbar {
    width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #000;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: rgb(95, 93, 93);
}
.btn_read_more {
    font-size: 14px !important;
    font-weight: 500;
    padding: 4px 10px;
    color: var(--white);
    background-color: #d3ac35 !important;
    box-shadow: none;
    border: 1px solid #d3ac35;
}

/* .helo{ 
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
} */
nav.navbar {
    background: var(--dark-bg);
    /* background: linear-gradient(to left, #303030, #000000); */
    min-height: 55px;
    padding: 0;
}

a.nav-link.router-link-exact-active.router-link-active {
    border-bottom: 3px solid #d3ac35;
    color: #d3ac35 !important;
}

a.nav-link.router-link-exact-active.router-link-active {
    border-bottom: 3px solid #d3ac35;
    color: #d3ac35 !important;
}

ul.navbar-nav li.nav-item a.nav-link {
    font-size: 13px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    line-height: 1.33;
    color: rgb(255, 255, 255);
    font-family: "Poppins", sans-serif;
}

ul.navbar-nav li.nav-item #logout {
    background-color: transparent;
    border: none;
    font-size: 14px;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    text-align: center;
    font-weight: 600;
    color: rgb(255, 255, 255);
    font-family: "Poppins", sans-serif;
}

ul.navbar-nav li.nav-item #logout:focus {
    box-shadow: none;
    outline: none;
}

ul.dropdown-menu li a {
    padding-left: 9px;
    font-family: "Poppins";
    text-transform: uppercase;
    font-weight: 500;
    color: var(--white);
}

ul.dropdown-menu {
    min-width: auto;
    padding: 20px 0;
    margin: 0;
    box-shadow: rgb(0 0 0 / 16%) 0px 1px 4px;
    background-color: var(--black);
}

/* ul.dropdown-menu li {
    display: inline-block;
} */

ul.dropdown-menu li a img {
    max-width: 30px;
}

ul.dropdown-menu li a:hover {
    background: transparent;
}

.dropdown-item.active,
.dropdown-item:active {
    background-color: transparent;
    
}

.navbar-brand {
    margin-right: 7rem;
}

ul#upper-nav li.nav-item {
    margin-left: 22px;
}

ul#upper-nav li.nav-item:nth-child(1) {
    margin-left: 0;
}

.navbar-brand img {
    max-width: 120px;
}

.navbar-brand:focus-visible {
    outline: none;
}

.navbar-brand img:focus-visible {
    outline: none;
}

/**** THEME TOGGLE CHANGE CSS START ****/

div#price-fav {
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-box-label-left:before,
.toggle-box-label-left:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /*transition*/
    -webkit-transition: 0.25s ease-in-out;
    -moz-transition: 0.25s ease-in-out;
    -o-transition: 0.25s ease-in-out;
    transition: 0.25s ease-in-out;
    outline: none;
}

.toggle-box input[type="checkbox"],
.toggle-box input[type="checkbox"]:active {
    position: absolute;
    top: -5000px;
    height: 0;
    width: 0;
    opacity: 0;
    border: none;
    outline: none;
}

.toggle-box label {
    display: inline-block;
    position: relative;
    padding: 0px;
    font-size: 14px;
    cursor: pointer;
    color: rgba(149, 149, 149, 0.51);
    font-weight: normal;
}

.toggle-box-label-left:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    line-height: 34px;
    text-indent: 40px;
    height: 16px;
    width: 16px;
    margin: 4px;
    /*border-radius*/
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    right: 26px;
    bottom: 0px;
    background: #ffb200;
    transform: rotate(-45deg);
    box-shadow: 0 0 10px white;
}

.toggle-box-label-left:after {
    content: "";
    display: inline-block;
    width: 40px;
    height: 24px;
    /*border-radius*/
    -webkit-border-radius: 16px;
    -moz-border-radius: 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.15);
    vertical-align: middle;
    margin: 0 10px;
    border: 2px solid #ffb200;
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left:before {
    right: 17px;
    box-shadow: 5px 5px 0 0 #eee;
    background: transparent;
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left:after {
    background: rgba(0, 0, 0, 0.15);
    border: 2px solid white;
}

.toggle-box input[type="checkbox"]+.toggle-box-label-left {
    color: rgba(250, 250, 250, 0.51);
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left {
    color: rgba(149, 149, 149, 0.51);
    font-weight: normal;
}

.toggle-box input[type="checkbox"]:checked+.toggle-box-label-left+.toggle-box-label {
    color: rgba(250, 250, 250, 0.51);
}

.navbar-toggler:focus {
    box-shadow: none;
}

/* PANKAJ SIR CSS FOR NOTIFICATIONS */

button.notification_button {
    all: unset;
}

.alert_box:hover {
    background-color: var(--notify-bg);
    padding: 5px;
}

.alert_box {
    padding: 5px;
}

span.tag {
    font-size: 10px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: -2px;
}

svg.notification {
    animation: shake 1.5s ease infinite;
}

@keyframes shake {
    0% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }

    10%,
    20% {
        -webkit-transform: scale3d(0.95, 0.95, 0.95) rotate(-10deg);
        transform: scale3d(0.95, 0.95, 0.95) rotate(-10deg);
    }

    30%,
    50%,
    70%,
    90% {
        -webkit-transform: scaleX(1) rotate(10deg);
        transform: scaleX(1) rotate(10deg);
    }

    40%,
    60%,
    80% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg);
    }

    100% {
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    }
}

.modal-header {
    background-color: var(--notify-bg);
    color: var(--white);
    border-bottom: 0 !important;
}

.modal-content {
    background-color: unset;
}

.modal-body {
    color: var(--white);
    font-size: 14px;
    background-color: var(--black);

}

.dropdown_menu {
    position: absolute;
    top: 45px;
    right: 0;
    width: 300px;
    box-shadow: 0 1rem 3rem rgb(0 0 0 / 18%);
    animation-name: DropDownSlide;
    animation-duration: 0.3s;
    animation-fill-mode: both;
    margin: 0;
    z-index: 999;
    color: var(--white);
    text-align: left;
    background-color: var(--notify-bg);
    background-clip: padding-box;
    border: 0 solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
}

@keyframes DropDownSlide {
    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
    }

    0% {
        -webkit-transform: translateY(10px);
        transform: translateY(10px);
    }
}

.icon_size {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    background-color: #d3ac35 !important;
}

.dropdown_menu h6 {
    font-size: 14px;
}

.dropdown_menu a {
    font-size: 10px;
}

.dropdown_menu p {
    font-size: 13px;
}

.padding-box {
    padding: 10px 15px;
    /* background-color: var(--upper-border); */
}

.view_more a {
    font-size: 14px;
    /* background-color: var(--upper-border); */

}

.wrapper_box {
    max-height: 250px;
    overflow: hidden scroll;
    padding: 5px 10px;
    background-color: var(--black);

}

.wrapper_box::-webkit-scrollbar {
    width: 5px;
    background-color: transparent;
}

.wrapper_box::-webkit-scrollbar-thumb {
    background-color: #c8c8c8;
    border-radius: 5px;
}

.font-size-12>>>p {
    margin: 0;
}

.font-size-12 p {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--white);
    max-width: 216px;

}

/**** THEME TOGGLE CHANGE CSS FINISH ****/
/**** NEW CSS START ****/

.nav-item.dropdown .custom-drop img {
    max-width: 24px;
    filter: invert(1);
}

/* ul.menu-drop {
  min-width: 100%;
        padding: 0;
} */

/* ul.menu-drop li {
  display: revert;
} */

/* ul.dropdown-menu.menu-drop {
    min-width: 413px;
} */

ul.dropdown-menu.menu-drop li a{
    font-size: 14px;

}

.menu-text .dropdown-toggle::after {
    margin-left: 10px;
}

/**** NEW CSS FINISH ****/

@media all and (min-width: 1200px) and (max-width: 1399px) {
    .navbar-brand {
        margin-right: 25px;
    }

    .navbar-brand img {
        max-width: 100px;
    }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
    .navbar-brand {
        margin-right: 25px;
    }

    .navbar-brand img {
        max-width: 80px;
    }

    ul.navbar-nav li.nav-item a.nav-link {
        font-size: 11px;
    }

    ul#upper-nav li.nav-item {
        margin-left: 10px;
    }

    ul.navbar-nav li.nav-item #logout {
        font-size: 12px;
    }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
    .navbar-brand {
        margin-right: 25px;
    }

    .navbar-brand img {
        max-width: 80px;
    }

    ul.navbar-nav li.nav-item a.nav-link {
        font-size: 11px;
    }

    ul#upper-nav li.nav-item {
        margin-left: 10px;
    }

    ul.navbar-nav li.nav-item #logout {
        font-size: 12px;
    }
}

@media all and (min-width: 768px) and (max-width: 991px) {
    nav.navbar {
        min-height: none;
    }

    .navbar-toggler {
        line-height: normal;
    }

    .navbar-collapse {
        padding: 5px 5px;
    }

    .navbar-toggler-icon .fas {
        font-weight: 600;
        color: #fff;
    }

    ul.navbar-nav li.nav-item a.nav-link {
        text-align: left;
    }

    ul#upper-nav li.nav-item {
        margin-left: 0;
    }

    ul.dropdown-menu {
        width: 150px;
        min-width: auto;
    }

    ul.dropdown-menu li {
        display: block;
    }
}

@media all and (min-width: 320px) and (max-width: 767px) {
    nav.navbar {
        min-height: auto;
        padding: 10px 0;
    }

    .navbar-brand img {
        max-width: 90px;
    }

    /* .navbar-brand {
        margin-right: 1rem;
    } */

    .navbar-toggler {
        line-height: normal;
    }

    .navbar-collapse {
        padding: 5px 5px;
    }

    .navbar-toggler-icon .fas {
        font-weight: 600;
        color: #fff;
    }

    ul.navbar-nav li.nav-item a.nav-link {
        text-align: left;
    }

    ul#upper-nav li.nav-item {
        margin-left: 0;
    }

    ul.dropdown-menu {
        width: 150px;
        min-width: auto;
    }

    ul.dropdown-menu li {
        display: block;
    }

    ul.navbar-nav li.nav-item #logout {
        padding-left: 0;
    }

    .dropdown_menu {
        top: 50px;
        right: -70px;
        width: 280px;
    }
}
</style>
