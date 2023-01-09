import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: () => ({
    isMob: false,
    user: null,
    sluginfo: null,
    favourite: [],
    orderApiHit: false,
    editOrderInfo: null,
    market_currency: null,
    marketChartData: null,
    listCointData: null,
    topCointData: null,
    chartClr: null,
    buySellFun: false,
    maintenance: null,
    amt: null,
    new_theme:true,
    kyc_status:null,
    scrt_key:null,
    gauth_setup:false,
    gogle_auth:null
  }),
  getters: {
    getKycSatus: (state) => {
      return state.kyc_status;
    },
    getToken() {
      return localStorage.getItem("token");
    },
    getEditInfo: (state) => {
      return state.editOrderInfo;
    },
    getMarketChart: (state) => {
      return state.marketChartData;
    },
    getListData: (state) => {
      return state.listCointData;
    },
    getTopCoin: (state) => {
      return state.topCointData;
    },
    getMarketCurrency: (state) => {
      return state.market_currency;
    },
    getUser: (state) => {
      return state.user;
    },
    getSlugInfo: (state) => {
      return state.sluginfo;
    },
    isLoggedIn() {
      const tkn = localStorage.getItem("token");
      return tkn != null ? true : false;
    },
    favouriteCryptos: (state) => {
      return state.favourite;
    },
    chartColor: (state) => {
      return state.chartClr;
    },
    getBuySellFund: (state) => {
      return state.buySellFun;
    },
    getMaintenance: (state) => {
      return state.maintenance;
    },
    getAmount: (state) => {
      return state.amt;
    },
    getnewtheme: (state) => {
      return state.new_theme
    },
    scrtkey:(state)=>{
      return state.scrt_key;
    },
    getGauth:(state)=>{
      return state.gauth_setup;
    },
    getGogleAuth:(state)=>{
      return state.gogle_auth;
    }
  },
  mutations: {
    SET_KYC_STATUS(state, val) {
      state.kyc_status = val;
    },
    changeMob(state, val) {
      state.isMob = val;
    },
    SET_USER(state, user) {
      state.user = user;
    },
    SLUG_INFO(state, sluginfo) {
      state.sluginfo = sluginfo;
    },
    RESET(state) {
      state.user = null;
    },
    setEditOrderInfo(state, payload) {
      state.editOrderInfo = payload;
    },
    SET_Market_Currency(state, payload) {
      state.market_currency = payload;
    },

    SET_FAVOURITE(state, val) {
      state.favourite = val;
    },

    SET_MARKET_CHART_DATA(state, val) {
      state.marketChartData = val;
    },
    SET_LIST_DATA(state, val) {
      state.listCointData = val;
    },
    SET_TOP_COIN_DATA(state, val) {
      state.topCointData = val;
    },

    SET_CHART_THEME(state, val) {
      state.chartClr = val;
    },
    buySellFund(state, val) {
      state.buySellFun = val;
    },
    initialMaintenance(state, val) {
      state.maintenance = val;
    },
    SET_AMOUNT(state, val) {
      state.amt = val;
    },
    setnewtheme(state,payload){
      state.new_theme = payload
    },
    SET_SECRET(state,payload){
       state.scrt_key=payload

    },
    SET_GAUTH(state,payload){
        state.gauth_setup=payload
    },
    SET_GOOGLE_AUTH(state,payload){
        state.gogle_auth=payload;
    }

  },
});
