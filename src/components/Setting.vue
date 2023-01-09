<template>
  <div>
    <!---setting Component-->
    <div class=" mb-3">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link to="/settings/profile" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-user px-3"></i>Profile</router-link>
        </li>
        <!--Profile-->
        <li class="list-group-item">
          <router-link to="/settings/ChangePassword" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-key px-3"></i>Change Password</router-link>
        </li>
        <!--Change Password-->
        <li class="list-group-item">
          <!-- <router-link v-if="kycStatus != 'completed'" to="/settings/kyc" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="far fa-id-card text-white px-3"></i>Verify KYC
          </router-link> -->
          <router-link to="/settings/kyc" class="
             
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="far fa-id-card text-white px-3"></i>Verify KYC
            <!-- <span v-html="tick" class="ms-2 pb-1"></span> -->
          </router-link>
        </li>

        <!-- Verify KYC  -->
        <!-- <li class="list-group-item"><router-link to="/settings/bank" class="d-flex align-items-center py-3 text-decoration-none text-white"><i class="fas fa-university px-3"></i>Bank Detail</router-link></li> -->
        <!-- Bank Detai  -->
        <li class="list-group-item">
          <router-link to="/settings/two-factor" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fad fa-user-alt px-3"></i>Two Factor<br />Authentication</router-link>
        </li>
        <!-- Two Factor Authentication  -->
        <li class="list-group-item">
          <router-link to="/settings/fees" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-comment-dollar px-3"></i>Fees</router-link>
        </li>
        <!-- Fees  -->
        <li class="list-group-item">
          <router-link to="/settings/activity-log" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-snowboarding px-3"></i>Activity Log</router-link>
        </li>
        <!-- Activity Log  -->
        <li class="list-group-item">
          <router-link to="/referralProgram" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fa fa-user-plus px-3"></i>Referral-Link</router-link>
        </li>
        <!-- Referral-Link -->
        <!-- <li class="list-group-item">
          <router-link to="/settings/trading-report" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
              br-none
            "><i class="fas fa-download px-3"></i>Download Trading
            <br />Report
          </router-link>
        </li> -->
        <!-- Download Trading Report -->
        <!-- <li class="list-group-item">
          <router-link to="/settings/airdrop" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-snowboarding px-3"></i>Airdrop Detail</router-link>
        </li> -->
        <!-- Airdrop Log  -->
        <li class="list-group-item">
          <router-link to="/settings/support" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-headphones px-3"></i>Support</router-link>
        </li>
         <!-- Support -->
        <!-- <li class="list-group-item">
          <router-link to="/settings/launchpad_order" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fab fa-fly px-3"></i>Launchpad Order History</router-link>
        </li> -->
       <!-- launchpad order -->
        <!-- <li class="list-group-item">
          <router-link to="/settings/user_staking_list" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fab fa-envira px-3"></i>User Staking List</router-link>
        </li> -->
       <!-- user staking list -->
        <li class="list-group-item">
          <router-link to="/settings/refferal_commission" class="
              d-flex
              align-items-center
              py-3
              text-decoration-none text-white
            "><i class="fas fa-cog fa-spin px-3"></i>Referral Income</router-link>
        </li>
       <!-- referral link -->
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  name: "Setting",
  data: () => ({
    dummy: "",
    tick: '<svg xmlns="http://www.w3.org/2000/svg" class="align-middle" width="30" height="30" viewBox="0 0 24 24" style="fill: var(--green);transform: ;msFilter:;"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z"></path></svg>',
    kycStatus: null,
  }), 
  mounted() { 
    this.kycStatus = this.$store.getters.getKycSatus ? this.$store.getters.getKycSatus : "";
    // this.kycStatus = localStorage.getItem("user")
    //   ? JSON.parse(localStorage.getItem("user")).user_kyc_status
    //   : "";  
  },
  watch:{
  "$store.getters.getKycSatus": function (v) {
    this.kycStatus = v;
  },
  }
};
</script>

<style scoped>
.router-link-exact-active.router-link-active {
  background-color: #ffffff3d;
  border-radius: 10px;
}

.setting_exchange_tab {
  background-color: #000;
  box-shadow: 0 6px 24px 0 rgb(0 0 0 / 5%), 0 0 0 1px rgb(0 0 0 / 8%);
  border-radius: 20px;
  padding: 20px 10px;
}

ul.list-group li {
  border: none;
  background: #000;
  color: #fff;
  padding: 5px 10px 0;
}
.disable-link {
  pointer-events: none;
}

@media all and (min-width: 992px) and (max-width: 1199px) {
  .br-none br {
    display: none !important;
  }
}
/* @media all and (min-width: 1025px) and (max-width: 1199px) {
  .br-none br {
    display: none !important;
  }
} */

@media all and (min-width: 768px) and (max-width: 991px) {
  .setting_exchange_tab {
    margin: 25px 25px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .setting_exchange_tab {
    margin: 25px 25px;
  }
}
</style>