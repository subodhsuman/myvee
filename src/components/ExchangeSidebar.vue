<template>
    <div>
        <div class="exchange_sidebar">
            <div id="exchnage-sidebar-loader" v-if="data.length == 0 && tab != 'FAV' && tab != 'MYV'" class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div id="exchnage-sidebar-loader" v-if="data.length == 0 && tab == 'MYV'" class="">
                Coming Soon
            </div>
            <nav>
                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                    <button v-for="item in items" :key="item.tab" @click="checkPair(item.tab)" class="nav-link" v-bind:class="item.tab == tab ? 'active' : ''" :id="'nav-' + item.content + '-tab'" data-bs-toggle="tab" :data-bs-target="'#nav-' + item.content" type="button" role="tab" :aria-controls="'nav-' + item.content" aria-selected="true">
                        <span v-if="item.content == 'FAV'"><em class="fas fa-star"></em></span>
                        <span v-else>{{ item.content }}</span>
                    </button>
                </div>
            </nav>
    
            <div class="nav_center_box">
                <div class="search">
                    <em class="fas fa-search"></em>
                    <input type="text" v-model="search" class="form-control" placeholder="Search" />
                </div>
    
                <div class="table_list_box">
                    <ul class="list_table">
                        <li @click="sortByChange(data, 'currency')">
                            <a href="javascript:void(0)">Pair <em class="fas" :class="keyname"></em></a>
                        </li>
                        <!-- <li><a href="javascript:void(0)">Price <em class="fas fa-long-arrow-alt-down"></em></a></li> -->
                        <li @click="sortByChange(data, 'change')">
                            <a href="javascript:void(0)">Change <em class="fas" :class="keychange"></em></a>
                        </li>
                    </ul>
                </div>
                <!--table-list-->
            </div>
            <!--nav_center_box-->
            <div class="tab-content custom-tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" :id="'nav-' + tab" role="tabpanel" :aria-labelledby="'nav-' + tab + '-tab'" v-for="currency in computedList" :key="currency.symbol + '_' + tab" @click="handleClick(currency)">
                    <a class="ticker-item" :class="currency.symbol == slug ? 'active' : ''" href="javascript:void(0)">
                        <div class="currency-logo">
                            <img loading="lazy" :src="currency.image" alt="" class="img-fluid" />
                            <!-- ../assets/sidebar_exchange_icon/exchange_icon_1.png -->
                        </div>
                        <!-- {{currency}} -->
                        <div class="market">
                            <div class="market-name">
                                <span class="market-name-text">
                                    {{ currency.currency }}
                                    <span class="sub-text"> /{{ currency.pair_with }} </span>
                                </span>
                            </div>
                            <div class="market-change">
                                <span class="up-arrow" v-if="currency.change >= 0">▲ {{ currency.change }}%</span>
                                <span class="down-arrow" v-else>▼ {{ currency.change }}%</span>
                            </div>
                        </div>
    
                        <div class="price">
                            <div class="price-box">
                                <span class="price-text ticker-price" :style="{ color: currency.flag == 2 ? 'red' : 'green' }">
                                    {{ parseFloat(currency.price) }}
                                </span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
    </template>
    
    <script>
    import ApiClass from "../api/api";
    export default {
        name: "ExchangeSidebar",
        data() {
            return {
                tab: "SDT",
                slug: "BTCUSDT",
                favt_data: [],
                connection: null,
                myConnection: null,
                keychange: "fa-long-arrow-alt-up",
                keyname: "fa-long-arrow-alt-up",
                oldkey: null,
                items: [{
                        tab: "FAV",
                        content: "FAV",
                    },
                    {
                        tab: "USDT",
                        content: "USDT",
                    },
                    {
                        tab: "BTC",
                        content: "BTC",
                    },
                    {
                        tab: "TRX",
                        content: "TRX",
                    },
                    {
                        tab: "MYV",
                        content: "MYV",
                    },
                ],
                searchData: true,
                sortType: true,
                data: [],
                dataUsdt: [],
                dataBtc: [],
                dataTrx: [],
                dataMyv: [],
                dataEth: [],
                res: [],
                search: "",
                tickers: [],
                filterddata: [],
                fav_data: [],
                pair: "",
                socketChk: false,
                x: [],
                own_tickers: [],
                all_data: [],
            };
        },
        mounted() {
            if (this.$route.params.slug) {
                this.slug = this.$route.params.slug;
                this.tab = this.slug.slice(this.slug.length - 3, this.slug.length);
            }
            this.getCoinList();
        },
        methods: {
            async getCoinList() {
                var response2 = await ApiClass.getNodeRequest("list-crypto/get", false);
                var data2 = response2.data;
                this.$store.commit("SET_LIST_DATA", data2);
                this.setListCoin(data2);
                // this.checkPair(this.tab);
    
            },
            async setListCoin(data2) {
                this.dataUsdt = data2 ?.data.USDT ?? [];
                this.dataBtc = data2 ?.data ?.BTC ?? [];
                this.dataMyv = data2 ?.data ?.MYV ?? [];
                this.dataTrx = data2 ?.data ?.TRX ?? [];
                // this.dataEth = data2 ?.data ?.ETH ?? [];
                this.tickers = data2 ?.tickers;
                this.own_tickers = data2 ?.listed_tickers;
    
                this.all_data = this.dataUsdt.concat(
                    this.dataBtc,
                    this.dataTrx,
                    this.dataMyv,
                    // this.dataEth
                );
    
                // const market_currency = this.dataUsdt.concat(
                //     this.dataBtc,
                //     this.dataTrx,
                //     this.dataEth
                // );
    
                this.$store.commit("SET_Market_Currency", this.all_data);
    
                this.all_data.forEach((item) => {
                    if (item.symbol == this.slug) {
                        var sluginfo = {
                            slug: item.symbol,
                            current_price: parseFloat(item.price),
                            current_change: parseFloat(item.change),
                            current_high: parseFloat(item.high),
                            current_low: parseFloat(item.low),
                        };
                        console.log("BEFIRE COMMIT======================", {
                            sluginfo
                        });
                        this.$store.commit("SLUG_INFO", sluginfo);
                    }
                });
    
                if (this.$store.getters.isLoggedIn) {
                    var favcrypto = await ApiClass.getNodeRequest("favpair/get", true);
                    this.fav_data = favcrypto.data.data;
                    var exists_fav = this.fav_data.map((value) => value.symbol);
                    this.$store.commit("SET_FAVOURITE", exists_fav);
    
                    //   this.fav_data = this.all_data.filter((o1) =>
                    //         this.$store.getters.favouriteCryptos.some((o2) => o1.symbol == o2)
                    //     );
                }
    
                if (!this.$store.getters.isLoggedIn) {
                    //  this.all_data = this.dataUsdt.concat(
                    //     this.dataBtc,
                    //     this.dataTrx,
                    //     this.dataEth
                    // );
    
                    this.fav_data = this.all_data.filter((o1) =>
                        this.$store.getters.favouriteCryptos.some((o2) => o1.symbol == o2)
                    );
                    //console.log('list fvrttttt====',this.$store.getters.favouriteCryptos, this.fav_data);
                }
    
                this.connection ? "" : this.webSocketSubs();
                this.tab = this.tab == "SDT" ? "USDT" : this.tab;
                this.checkPair(this.tab);
            },
            webSocketSubs() {
                // //console.log(this.tickers);
                const ticker_subs = this.tickers.map((v) => {
                    return v.toLowerCase() + "@ticker";
                });
                const ticker_subs1 = this.own_tickers.map((v) => {
                    return v.toLowerCase() + "@ticker";
                });
                //console.log("Starting CONNECTING to WebSocket EXCHNAGE SIDE BAR");
    
                this.connection = new WebSocket("wss://stream.binance.com:9443/ws");
                this.myConnection = new WebSocket(ApiClass.nodeWebsocket);
                // var $this = this;
    
                this.connection.onopen = function () {
                    //console.log("Successfully connected to the EXCHANGE SIDEBAR server...");
                };
                this.myConnection.onopen = function () {
                    //console.log("Successfully connected to the own server...");
                };
    
                var ccStreamer = this.connection;
                var ccStreamer1 = this.myConnection;
    
                this.connection.onopen = function onStreamOpen() {
                    var subRequest2 = {
                        method: "SUBSCRIBE",
                        params: ticker_subs,
                        id: 1,
                    };
                    ccStreamer.send(JSON.stringify(subRequest2));
                };
    
                this.myConnection.onopen = function onStreamOpen() {
                    var subRequest = {
                        method: "ADD",
                        params: ticker_subs1,
                    };
                    ccStreamer1.send(JSON.stringify(subRequest));
                };
    
                this.connection.onclose = function () {
                    //console.log( "Successfully disconnected to the echo Exchange Sidebar..."          );
                };
                this.myConnection.onclose = function () {
                    //console.log(  "Successfully disconnected to the echo Exchange Sidebar..."   );
                };
            },
            checkPair(pairs) {
                this.x = this.data = [];
                this.tab = pairs;
    
                if (pairs == "BTC") {
                    this.x = this.data = this.dataBtc;
                } else if (pairs == "USDT") {
                    this.x = this.data = this.dataUsdt;
                } else if (pairs == "MYV") {
                    this.x = this.data = this.dataMyv;
                } 
                // else if (pairs == "ETH") {
                //     this.x = this.data = this.dataEth;
                // }
                 else if (pairs == "TRX") {
                    this.x = this.data = this.dataTrx;
                } else if (pairs == "FAV") {
                    this.x = this.data = this.fav_data;
                }
    
                //console.log('dshfdhfdfewyqey3qye83wue8ue89que====',this.data,pairs);
                var $this = this;
                this.connection.onmessage = function (event) {
                    var e_data = event.data;
                    e_data = JSON.parse(e_data);
                    $this.setSocketData(e_data);
                };
                this.myConnection.onmessage = function (event) {
                    var e_data = event.data;
                    e_data = JSON.parse(e_data);
                    $this.setSocketData(e_data);
                };
            },
            setSocketData(e_data) {
                var $this = this;
                // //console.log( e_data.s);
                if ($this.slug == e_data.s) {
                    var sluginfos = {
                        slug: $this.slug,
                        current_price: parseFloat(e_data.c),
                        current_change: parseFloat(e_data.P).toFixed(2),
                        current_high: parseFloat(e_data.h),
                        current_low: parseFloat(e_data.l),
                    };
                    // //console.log(sluginfos);
                    // //console.log("2nd commit here==", sluginfos);
                    $this.$store.commit("SLUG_INFO", sluginfos);
                }
    
                $this.x.find((o) => {
                    if (o.symbol == e_data.s) {
                        o.change = parseFloat(e_data.P).toFixed(2);
                        (o.high = parseFloat(e_data.h)),
                        (o.low = parseFloat(e_data.l)),
                        (o.flag = o.price < e_data.c ? 1 : 2);
    
                        o.price = parseFloat(e_data.c);
                    }
                });
            },
            handleClick(item) {
                var oldslug = this.$route.params.slug;
    
                if (item.symbol != oldslug) {
                    var sluginfo = {
                        slug: item.symbol,
                        current_price: item.price,
                        current_change: item.change,
                        current_high: item.high,
                        current_low: item.low,
                        decimal_currency: item.decimal_currency,
                        decimal_pair: item.decimal_pair,
                    };
    
                    this.$store.commit("SLUG_INFO", sluginfo);
    
                    this.$router.push({
                        name: "Exchange",
                        params: {
                            slug: item.symbol,
                            oldslug: oldslug,
                        },
                    });
                }
            },
            sortByChange(arr, key) {
                this.sortByKey(arr, key);
            },
    
            sortByKey(array, key) {
                if (key != this.oldkey) {
                    this.oldkey = key;
                    // alert('up')
    
                    key == "currency" ?
                        this.keyname == "fa-long-arrow-alt-up" ?
                        (this.keyname = "fa-long-arrow-alt-down") :
                        (this.keyname = "fa-long-arrow-alt-up") :
                        this.keychange == "fa-long-arrow-alt-up" ?
                        (this.keychange = "fa-long-arrow-alt-down") :
                        (this.keychange = "fa-long-arrow-alt-up");
    
                    return array.sort(function (a, b) {
                        var x = a[key];
                        var y = b[key];
                        if (key == "change") {
                            x = parseFloat(a[key]);
                            y = parseFloat(b[key]);
                        }
    
                        return x < y ? -1 : x > y ? 1 : 0;
                    });
                }
                key == "currency" ?
                    this.keyname == "fa-long-arrow-alt-up" ?
                    (this.keyname = "fa-long-arrow-alt-down") :
                    (this.keyname = "fa-long-arrow-alt-up") :
                    this.keychange == "fa-long-arrow-alt-up" ?
                    (this.keychange = "fa-long-arrow-alt-down") :
                    (this.keychange = "fa-long-arrow-alt-up");
                return array.reverse((a, b) => {
                    var x = a[key];
                    var y = b[key];
                    if (key == "change") {
                        x = parseFloat(a[key]);
                        y = parseFloat(b[key]);
                    }
                    return x < y ? 1 : x > y ? -1 : 0;
                });
            },
    
            //  filtersearch(filterD) {
            //   return (this.data = filterD.filter((item) => {
            //     return (
            //       item.currency.toUpperCase().indexOf(this.search.toUpperCase()) > -1
            //       //  ||       item.mobile.indexOf(this.search.toLowerCase()) > -1
            //     );
            //   }));
            // },
    
            disconnectWebsocket() {
                this.connection.close();
            },
        },
        // async created() {
        //     this.getCoinList();
        //     // this.data = this.fav_data;
        // },
        computed: {
            computedList() {
                var vm = this;
                if (vm.search) {
                    return this.data.filter((item) => {
                        return (
                            item.currency.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1
                        );
                    });
                }
                return this.data;
            },
        },
        destroyed() {
            this.disconnectWebsocket();
        },
        watch: {
            $route() {
                this.slug = this.$route.params.slug;
                this.tab = this.slug.slice(this.slug.length - 3, this.slug.length);
                this.tab = this.tab == "SDT" ? "USDT" : this.tab;
                this.checkPair(this.tab);
                this.getCoinList();
            },
            "$store.getters.favouriteCryptos": function () {
                // //console.log(this.all_data,"all+s");
                this.fav_data = this.all_data.filter((o1) =>
                    this.$store.getters.favouriteCryptos.some((o2) => o1.symbol == o2)
                );
    
                if (
                    document.getElementsByClassName("nav-link active")[0].id ==
                    "nav-FAV-tab"
                ) {
                    this.data = [];
                    this.data = this.fav_data;
                }
            },
        },
    };
    </script>
    
    <style scoped>
    /**** TABS CSS START ****/
    
    .exchange_sidebar {
        background-color: var(--white);
        box-shadow: var(--box-shadow);
        position: relative;
    }
    
    .exchange_sidebar nav {
        background-color: var(--white);
    }
    
    .nav-tabs .nav-link {
        font-size: 12px;
        text-transform: uppercase;
        font-family: "Poppins", sans-serif;
        font-weight: 600;
        background: var(--nav-bg);
        color: var(--black);
        border: none;
    }
    
    .nav-tabs .nav-link:focus-visible {
        outline: none;
    }
    
    .nav-tabs .nav-link.active {
        color: var(--nav-active);
        background-color: var(--white);
        border-top: 3px solid var(--black);
        border-radius: 0;
    }
    
    /**** TABS CSS FINISH ****/
    /**** NAV CENTER BOX CSS START ****/
    
    .nav_center_box {
        margin: 10px 5px;
        margin-bottom: 3px;
    }
    
    .search {
        position: relative;
        margin-bottom: 10px;
    }
    
    .search input {
        height: 30px;
        text-indent: 25px;
        border: 1px solid var(--serach-border);
        font-size: 14px;
        font-weight: 600;
        color: var(--black);
        font-family: "Poppins", sans-serif;
        background-color: var(--white);
    }
    
    .search input:focus {
        box-shadow: none;
        border-color: var(--serach-border);
    }
    
    .search .fa-search {
        position: absolute;
        top: 11px;
        left: 12px;
        font-weight: 600;
        font-size: 10px;
    }
    
    ul.list_table {
        padding: 0;
        margin: 0;
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    ul.list_table li a {
        font-size: 12px;
        color: var(--pair-list);
        font-weight: 600;
        font-family: "Poppins", sans-serif;
        text-decoration: none;
    }
    
    ul.list_table li:nth-child(1) {
        padding-left: 26px;
        padding-right: 22px;
    }
    
    ul.list_table li:nth-child(2) {
        padding-right: 0;
    }
    
    /**** NAV CENTER CSS FINISH ****/
    
    a.ticker-item {
        display: flex;
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-top: 1px solid var(--ticker-border);
        padding: 4px 12px;
        align-items: center;
        flex-grow: 0;
        background-color: var(--white);
        text-decoration: none;
    }
    
    a.ticker-item.active {
        border-left: 3px solid var(--black);
        border-radius: 0;
    }
    
    a.ticker-item .currency-logo {
        margin-right: 8px;
    }
    
    a.ticker-item .currency-logo img {
        max-width: 20px;
    }
    
    .ticker-item .market {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        line-height: 16px;
        padding: 8px 0;
        padding-bottom: 0;
    }
    
    .ticker-item .market-name {
        display: flex;
        flex-direction: column;
        color: var(--black);
        font-weight: 600;
    }
    
    .market-change span {
        color: var(--green);
        font-size: 11px;
        text-align: right;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
    }
    
    .ticker-item span.market-name-text {
        text-transform: uppercase;
        font-weight: 600;
        font-size: 13px;
        line-height: 10px;
        color: var(--black);
        font-family: "Poppins", sans-serif;
    }
    
    .ticker-item .market-name-text span.sub-text {
        color: var(--ticker-sub);
        font-size: 10px;
        line-height: 1.2;
        text-align: right;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
    }
    
    .ticker-item .price-text {
        font-weight: 600;
        text-align: right;
        font-size: 12px;
        font-family: "Poppins", sans-serif;
    }
    
    .nav-tabs .nav-link .fas {
        color: var(--fav-color);
    }
    
    /* width */
    .exchange_sidebar div#nav-tabContent::-webkit-scrollbar {
        width: 2px;
        overflow: hidden;
    }
    
    /* Track */
    .exchange_sidebar div#nav-tabContent::-webkit-scrollbar-track {
        background: transparent;
    }
    
    /* Handle */
    .exchange_sidebar div#nav-tabContent::-webkit-scrollbar-thumb {
        background: var(--exchange-scroll);
    }
    
    .custom-tab-content {
        overflow: scroll;
        position: relative;
        overflow-x: hidden;
        max-height: 730px;
    }
    
    .market-change span.down-arrow {
        color: var(--red);  
    }
    
    .market-change span.up-arrow {
        color: var(--green);
    }
    
    #exchnage-sidebar-loader {
        position: absolute;
        top: 390px;
        left: 0px;
        text-align: center;
        right: 0;
        margin: 0 auto;
        color: var(--pair-list);
    }
    
    @media all and (min-width: 1700px) and (max-width: 1799px) {
        .nav-tabs .nav-link {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
    
    @media all and (min-width: 1600px) and (max-width: 1699px) {
        .nav-tabs .nav-link {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
    
    @media all and (min-width: 1500px) and (max-width: 1599px) {
        .nav-tabs .nav-link {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
    
    @media all and (min-width: 1433px) and (max-width: 1499px) {
        .nav-tabs .nav-link {
            padding-left: 10px;
            padding-right: 10px;
        }
    }
    
    @media all and (min-width: 1400px) and (max-width: 1432px) {
        .nav-tabs .nav-link {
            padding-left: 8px;
            padding-right: 8px;
        }
    }
    
    @media all and (min-width: 1200px) and (max-width: 1399px) {
        .nav-tabs .nav-link {
            width: 20%;
            padding-left: 5px;
            padding-right: 5px;
        }
    }
    
    @media all and (min-width: 1025px) and (max-width: 1199px) {
        .nav-tabs .nav-link {
            padding-left: 6px;
            padding-right: 6px;
        }
    }
    
    @media all and (min-width: 992px) and (max-width: 1024px) {
        .nav-tabs .nav-link {
            padding-left: 6px;
            padding-right: 6px;
        }
    }
    
    @media all and (min-width: 768px) and (max-width: 991px) {
        .exchange_sidebar {
            margin-bottom: 20px;
            min-height: 436px;
        }
    
        .custom-tab-content {
            max-height: 323px;
        }
    
        #exchnage-sidebar-loader {
            top: 230px;
        }
    }
    
    @media all and (min-width: 320px) and (max-width: 767px) {
        .exchange_sidebar {
            margin-bottom: 20px;
            min-height: 436px;
        }
    
        .custom-tab-content {
            max-height: 323px;
        }
    
        #exchnage-sidebar-loader {
            top: 230px;
        }
    }
    </style>
    