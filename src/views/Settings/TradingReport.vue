<template>
  <SettingsLayout>
      <div class="row">
        <div class="col-md-12">
          <div class="exchange_setting_heading">
            <h3 class="fw-bold">Download Trading Report</h3>
          </div>
        </div>
      </div>
      <!-- heading  -->
      <div class="row mt-2">
          <div class="col-md-12">
          <div class="report_setting_box">
            <ul class="list-group">
              <li class="list-group-item" style="background-color:var(--nav-active);color:var(--white)">
                <div class="report_trading_heading mb-3">
                  <label
                    class="form-check-label fw-600"
                    for="flexSwitchCheckChecked"
                    >Get your trading report on your email.</label
                  >
                </div>
                <!--heading-->

                <div class="report_select_date row m-0 mb-3">
                  <div class="start_repart_date col-md-5 me-2 me-md-zero mb-2">
                    <label class="fw-500 ps-12" for="start">From Date</label>

                    <input
                      type="date"
                      class="form-control input_style_cus shadow-none border-0"
                      id="inputDate"
                      value="2019-07-22"
                    />
                  </div>
                  <!--start date-->
                  <div class="end_repart_date col-md-5 ms-2 mb-2 ms-md-zero">
                    <label for="start" class="fw-500 ps-12">To Date</label>
                    <input
                      type="date"
                      class="form-control input_style_cus shadow-none border-0"
                      id="inputDate"
                      value="2021-10-29"
                    />
                  </div>
                  <!--end date-->
                </div>
                <!--select date-->
                <div class="trading-report-list mb-3">
                  <p class="m-0">The report will include:</p>
                  <ul class="list-group grp">
                    <li class="list-group-item border-0 p-0" >
                    1. Exchange Trades
                    </li>
                    <!-- <li class="list-group-item border-0 p-0">2. P2P Trades</li> -->
                    <!-- <li class="list-group-item border-0 p-0" >2. STF Trades</li> -->
                    <li class="list-group-item border-0 p-0" >
                    2. Current Coin Balance
                    </li>
                    <li class="list-group-item border-0 p-0">
                    3. Deposit and withdrawals
                    </li>
                    <li class="list-group-item border-0 p-0">
                    4. Ledger History
                    </li>
                    <li class="list-group-item border-0 p-0">
                    5. Airdrops and other distributions
                    </li>
                  </ul>
                </div>
                <div class="trading-report-button mb-3">
                  <router-link to="#" class="btn btn-dark shadow-none text-capitalize"
                    >Request Trading Report</router-link
                  >
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Content  -->
  </SettingsLayout>
</template>



<script>
import SettingsLayout from "@/layouts/SettingsLayout.vue";

export default {
  name: "TradingReport",
  components: {
    SettingsLayout,
  },
};
</script>


<style scoped>
.grp li{
  background-color: var(--nav-active);
  color: var(--white);
}
/* .input_style_cus{ */
  /* background-color: #111111;
  color: var(--white); */
/* } */
.exchange_setting_heading{
  color: var(--white);
}
.fw-600 {
  font-weight: 600;
}
.fw-500 {
  font-weight: 500;
}
.ps-12 {
  padding: 6px 12px 0;
}

@media all and (max-width:767px){
  .me-md-zero,
  .ms-md-zero{
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>