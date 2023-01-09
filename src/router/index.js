import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index.js";
// import ApiClass from '../api/api'
// import Market from '../views/Market.vue'
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  /***********************Staking*************************/
  {
    path: '/staking',
    name: 'StakingView',
    component: () =>
      import('../views/Staking/Staking_tableView.vue')
  },
  {
    path: '/my-staking',
    name: 'MyStakingView',
    component: () =>
      import('../views/Staking/MyStakingView.vue')
  },

  {
    path: "/portfolio",
    name: "portfolio",
    component: () =>
      import(/* webpackChunkName: "portfolio" */ "../views/Portfolio.vue"),
    meta: { authOnly: true },
  },

  {
    path: "/withdrawHistory",
    name: "withdrawHistory",
    component: () =>
      import(
        /* webpackChunkName: "withdrawHistory" */ "../views/WithdrawHistory.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: "/depositHistory",
    name: "depositHistory",
    component: () =>
      import(
        /* webpackChunkName: "depositHistory" */ "../views/DepositHistory.vue"
      ),
    meta: { authOnly: true },
  },

  {
    path: "/request/token",
    name: "Request Token",
    component: () =>
      import(
        /* webpackChunkName: "exchange" */
        "../views/Request_Token/Reqtoken.vue"
      ),
    meta: { authOnly: true },
  },

  {
    path: "/request/token_table",
    name: "Token Table",
    component: () =>
      import(
        /* webpackChunkName: "exchange" */
        "../views/Request_Token/TokenTable.vue"
      ),
    meta: { authOnly: true },
  },

  {
    path: "/request/withdraw_table",
    name: "Withdraw Table",
    component: () =>
      import(
        /* webpackChunkName: "exchange" */
        "../views/Request_Token/WithdrawTable.vue"
      ),
    meta: { authOnly: true },
  },

  {
    path: "/exchange/:slug",
    name: "Exchange",
    component: () =>
      import(/* webpackChunkName: "exchange" */ "../views/Exchange.vue"),
    meta: { authOnly: false },
  },

  {
    path: "/Products/:slug",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "exchange" */ "../views/Footer/Products.vue"),
    meta: { authOnly: false },
  },

  {
    path: "/About/:slug",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "exchange" */ "../views/Footer/About.vue"),
    meta: { authOnly: false },
  },
  {
    path: "/Support/:slug",
    name: "Support",
    component: () =>
      import(/* webpackChunkName: "exchange" */ "../views/Footer/Support.vue"),
    meta: { authOnly: false },
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue"),
    // import( /* webpackChunkName: "maintenance" */ '../views/Maintenance.vue'),
    meta: { guestOnly: true },
  },
  {
    path: "/setting",
    name: "Setting",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../components/Setting.vue"),
    meta: { authOnly: true },
  }, //Setting component
  {
    path: "/settings/profile",
    name: "Profile",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Settings/Profile.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/settings/ChangePassword",
    name: "Change-Password",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */
        "../views/Settings/ChangePassword.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: "/settings/kyc",
    name: "KycSetting",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */
        "../views/Settings/KycSetting.vue"
      ),
    meta: { authOnly: true },
  },

  // {
  //     path: '/settings/bank',
  //     name: 'BankDetail',
  //     component: () =>
  //         import ( /* webpackChunkName: "Profile" */ '../views/Settings/BankDetail.vue'),
  //     meta: { authOnly: true }
  // },
  {
    path: "/settings/two-factor",
    name: "TwoFactor",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */
        "../views/Settings/TwoFactor.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: "/settings/fees",
    name: "Fees",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Settings/Fees.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/settings/activity-log",
    name: "ActivityLog",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */
        "../views/Settings/ActivityLog.vue"
      ),
    meta: { authOnly: true },
  },
  // {
  //   path: "/settings/airdrop",
  //   name: "AirdropList",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "Profile" */
  //       "../views/Settings/AirdropList.vue"
  //     ),
  //   meta: { authOnly: true },
  // },
  {
    path: "/settings/ReferralLink",
    name: "Referral-Link",
    component: () =>
      import(
        /* webpackChunkName: "Profile" */
        "../views/Settings/ReferralLink.vue"
      ),
    meta: { authOnly: true },
  },
  // {
  //   path: "/settings/trading-report",
  //   name: "TradingReport",
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "Profile" */
  //       "../views/Settings/TradingReport.vue"
  //     ),
  //   meta: { authOnly: true },
  // },
  {
    path: "/settings/support",
    name: "Support",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Settings/Support.vue"),
    meta: { authOnly: true },
  },
  // {
  //   path: "/settings/launchpad_order",
  //   name: "Launchpad_order",
  //   component: () =>
  //     import(/* webpackChunkName: "Profile" */ "../views/Settings/Launchpad_Order_List.vue"),
  //   meta: { authOnly: true },
  // },
  // {
  //   path: "/settings/user_staking_list",
  //   name: "User_Stake_List",
  //   component: () =>
  //     import(/* webpackChunkName: "Profile" */ "../views/Settings/User_staking_List.vue"),
  //   meta: { authOnly: true },
  // },
  {
    path: "/settings/refferal_commission",
    name: "Refferal_commission",
    component: () =>
      import(/* webpackChunkName: "Profile" */ "../views/Settings/Referral_commission.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/settings",
    name: "Settings",
    component: () =>
      import(
        /* webpackChunkName: "settings" */
        "../views/Settings/Settings.vue"
      ),
    meta: { authOnly: true },
  }, //Settings Page

  {
    path: "/signup",
    name: "SignUp",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Auth/SignUp.vue"),
    // import( /* webpackChunkName: "maintenance" */ '../views/Maintenance.vue'),
    meta: { guestOnly: true },
  },

  {
    path: "/verifymail",
    name: "VerifyMail",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Auth/verifymail.vue"),
    meta: { guestOnly: true },
  },

  {
    path: "/forgetpassword",
    name: "Forgetpassword",
    component: () =>
      import(
        /* webpackChunkName: "forget-password" */
        "../views/Auth/Forgetpassword.vue"
      ),
    meta: { guestOnly: true },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () =>
      import(
        /* webpackChunkName: "forget-password" */
        "../views/Auth/ResetPassword.vue"
      ),
    meta: { guestOnly: true },
  },
  {
    path: "/verify",
    name: "Verify",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Auth/Verify.vue"),
    // meta: { guestOnly: true },
  },
  {
    path: "/reports/trading",
    name: "TradingReport",
    component: () =>
      import(
        /* webpackChunkName: "TradingReport" */
        "../views/Report/TradingReport.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: "/reports/walletreport",
    name: "WalletReport",
    component: () =>
      import(
        /* webpackChunkName: "TradingReport" */
        "../views/Report/WalletReport.vue"
      ),
    meta: { authOnly: true },
  },

  {
    path: "/market",
    name: "Market",
    // component: Market
    component: () =>
      import(/* webpackChunkName: "Market" */ "../views/Market.vue"),
  },

  {
    path: "/cryptosell",
    name: "cryptosell",
    component: () =>
      import(/* webpackChunkName: "Cryptosell" */ "../views/CryptoSell.vue"),
  },

  {
    path: "/coming",
    name: "coming",
    component: () =>
      import(/* webpackChunkName: "coming" */ "../views/Coming.vue"),
  },
  {
    path: "/coming1",
    name: "coming",
    component: () =>
      import(/* webpackChunkName: "coming" */ "../views/Coming.vue"),
  },
  {
    path: "/coming2",
    name: "coming",
    component: () =>
      import(/* webpackChunkName: "coming" */ "../views/Coming.vue"),
  },
  {
    path: "/query",
    name: "QueryOpt",
    component: () =>
      import(/* webpackChunkName: "coming" */ "../views/Settings/QueryOpt.vue"),
    meta: { authOnly: true },
  },
  {
    path: "/ticketlist",
    name: "TicketList",
    component: () =>
      import(
        /* webpackChunkName: "coming" */
        "../views/Settings/TicketList.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: "/referralProgram",
    name: "referralLink",
    component: () =>
      import(
        /* webpackChunkName: "coming" */
        "../views/ReferralLink.vue"
      ),
    // meta: { authOnly: true },
  },
  {
    path: "/ticketinfo/:id",
    name: "TicketInfo",
    component: () =>
      import(
        /* webpackChunkName: "coming" */
        "../views/Settings/TicketInfo.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: "/withdrawHistory",
    name: "WithdrawHistory",
    component: () =>
      import(
        /* webpackChunkName: "coming" */
        "../views/WithdrawHistory.vue"
      ),
    meta: { authOnly: true },
  },

  {
    path: "/depositHistory",
    name: "DepositHistory",
    component: () =>
      import(
        /* webpackChunkName: "coming" */
        "../views/DepositHistory.vue"
      ),
    meta: { authOnly: true },
  },
  {
    path: '/blog',
    name: 'AboutView',
    component: () => import('../views/Blog/AboutView.vue')
  },
  {
    path: '/readmore',
    name: 'ReadMoreView',
    component: () => import('../views/Blog/ReadMoreView.vue')
  },
  // new launchpad
  {
    path: '/launchpad',
    name: 'LaunchpadNewView',
    component: () => import('../views/Launchpad/LaunchpadNewView.vue')
  },
  {
    path: '/token',
    name: 'TokenView',
    component: () => import('../views/Launchpad/TokenView.vue')
  },




  {
    path: "/maintenance",
    name: "Maintenance",
    component: () =>
      import(/* webpackChunkName: "maintenance" */ "../views/Maintenance.vue"),
  },

  { path: "*", component: PageNotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,

  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  // localStorage.setItem('under_main', true);
  // var under_main = JSON.parse(localStorage.getItem("under_main"));
  store.getters.getMaintenance == "on" && to.name != "Maintenance"
    ? next({ path: "/maintenance" })
    : "";
  //   console.log("routes===", store.getters.getMaintenance);
  //   if (store.getters.getMaintenance == "on") {
  //     console.log("djhbfuyrgefyureyfure");
  //     next({
  //       path: "/maintenance",
  //     });
  //   } else {
  if (localStorage.getItem)
    if (to.matched.some((record) => record.meta.authOnly)) {
      if (!isLoggedIn()) {
        next({
          path: "/login",
        });
      } else {
        next();
      }
    } else if (to.matched.some((record) => record.meta.guestOnly)) {
      if (isLoggedIn()) {
        next({
          path: "exchange/BTCUSDT",
        });
      } else {
        next();
      }
    } else {
      next();
      // if(to.name == "Exchange"){

      //  var slugs = store.state.listCointData.tickers;
      //   var x =   slugs.find((e)=>{
      //    return  e == to.params.slug
      //  })
      //       x ? next() : next({path:'exchange/BTCUSDT'})
      //   }
      //   else{
      //     next();
      //   }
    }
  //   }
});

export default router;
