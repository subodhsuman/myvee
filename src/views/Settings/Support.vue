<template>
  <SettingsLayout>
    <div class="row">
      <div class="col-md-12">
        <div class="exchange_setting_heading">
          <h3 class="fw-bold">Contact Support</h3>
        </div>
      </div>
    </div>
    <!--heading-->
    <div class="row mt-2">
      <div class="col-md-12">
        <div class="support_setting_box">
          <ul class="list-group com_grp">
            <li class="list-group-item">
              <div class="support_exchange_heading mb-3">
                <label
                  class="form-check-label fw-600"
                  for="flexSwitchCheckChecked"
                  >You control your data, and we respect that.</label
                >
              </div>
              <!--heading-->
              <div class="support-exchange-list mb-3">
                <p class="m-0">For requests regarding:</p>
                <ul class="list-group com_grp">
                  <li class="list-group-item border-0 p-0">
                    1. Copy of your data
                  </li>
                  <li class="list-group-item border-0 p-0">2. Data export</li>
                  <li class="list-group-item border-0 p-0">
                    3. Data correction
                  </li>
                </ul>
                <p class="m-0">
                  Please reach out to us. Our team will be happy to help you
                  out.
                </p>
              </div>
              <div class="support-exchange-button d-flex gap-3 align-items-center  mb-3">	
                <router-link	
                  to="/query"	
                  class="btn btn-dark shadow-none text-capitalize mb-3 mb-md-0"	
                  >Contact Us</router-link	
                > <span class="d-none d-md-block">| </span>	
                <router-link	
                  to="/ticketlist"	
                  class="btn btn-dark shadow-none text-capitalize mb-3 mb-md-0" 	
                  > View Previous Tickets</router-link	
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!--content-->
  </SettingsLayout>
</template>



<script>
import SettingsLayout from "@/layouts/SettingsLayout.vue";

export default {
  name: "Support",
  components: {
    SettingsLayout,
  },
};
</script>


<style scoped>
.com_grp li{
  background-color: var(--nav-active);
  color: var(--white);
}

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
</style>