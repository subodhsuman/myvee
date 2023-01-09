<template>
  <SettingsLayout>
    <div class="row heading-row mb-3">
      <div class="col-xl-12 col-lg-12 col-md-12">
        <div class="exchange_setting_heading">
          <h3 class="fw-bold">Referral Link</h3>
        </div>
      </div>
    </div>
    <!--row heading-row-->
    <div class="row">
      <div class="col-md-12 mb-2">
        <div class="input-group mb-3">
          <input type="text" id="referral" v-model="referral_link" readonly class="form-control shadow-none"
            aria-label="Refer Link" aria-describedby="basic-addon2" />
          <div class="input-group-append">
            <span class="border-0 ps-0" id="copy-add">
              <button class="btn btn-dark shadow-none px-4" @click="copyLink('referral')">
                {{ copy }}
                <em class="far fa-copy"></em></button></span>
          </div>
        </div>

        <div class="input-group mb-3">
          <input type="text" id="referral_code" v-model="referral_code" readonly class="form-control shadow-none"
            aria-label="Refer Link" aria-describedby="basic-addon2" />
          <div class="input-group-append">
            <span class="border-0 ps-0" id="copy-add">
              <button class="btn btn-dark shadow-none px-4" @click="copyLink('referral_code')">
                {{ copy2 }}
                <em class="far fa-copy"></em></button></span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 mb-2">
        <div class="table-responsive">
          <table class="table table-hover table-bordered text-center text-nowrap">
            <thead>
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Direct Sponser Id</th>
                <th scope="col">Status</th>
                <th scope="col">Created At</th>
              </tr>
            </thead>
            <tbody v-if="refData.length != 0">
              <tr v-for="(data, index) in refData" :key="index">
                <td>{{ data.name }}</td>
                <td>{{ data.email }}</td>
                <td>{{ user.name }}</td>
                <td>
                  <span class="badge rounded-pill" :style="changeclr(data.user_kyc_status)">{{
                      statusAssign(data.user_kyc_status)
                  }}</span>
                </td>
                <td>{{ moment(data.created_at).format("YYYY-MM-DD") }}</td>
              </tr>
            </tbody>
            <tbody v-else>
              No Data Found.
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-12">
        <div class="pagination_box">
          <pagination v-model="page" :records="recordData" :per-page="perPageData" :options="options"
            @paginate="callback" />
        </div>
      </div>
    </div>
  </SettingsLayout>
</template>

<script>
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import Pagination from "vue-pagination-2";

import ApiClass from "@/api/api";
// import ActivityLogVue from './ActivityLog.vue';
// import LoginVue from '../Auth/Login.vue';
// import {
//     required,
//     minLength,
//     sameAs
// } from 'vuelidate/lib/validators';
export default {
  name: "Referral-Link",
  components: {
    SettingsLayout,
    Pagination,
  },
  data() {
    return {
      referral_link: "",
      referral_code: "",
      copy: "Copy",
      copy2: "Copy",
      refData: [],
      user: [],
      page: 1,
      recordData: 0,
      perPageData: 0,
      options: {
        edgeNavigation: false,
        chunksNavigation: false,
        chunk: 4,
        texts: false,
        format: false,
      },
    };
  },

  async mounted() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.referral_link =
      ApiClass.VUE_DOMAIN + "signup?referral=" + this.user.referral_code;
    this.referral_code = this.user.referral_code;

    this.callback(this.page);
  },
  methods: {
    async callback(page) {
      let res = await ApiClass.getRequest(
        "user/getReferrals?page=" + page,
        true
      );
  
      if (res.data.status_code == 1) {
        this.refData = res.data.data.data;
        this.recordData = res.data.data.total;
        this.perPageData = res.data.data.per_page;
      }
    },
    changeclr(status) {
    
      if (status == "completed") {
        return {
          color: "#256029",
          backgroundColor: "#c8e6c9",
        };
      } else if (status == "new") {
        return {
          color: "#805b36",
          backgroundColor: "#ffd8b2",
        };
      } else {
        return {
          color: "#c63737",
          backgroundColor: "#ffcdd2",
        };
      }
    },
    statusAssign(status) {
      if (status == "completed") {
        return "Verified";
      } else if (status == "new") {
        return "Unverified";
      } else {
        return status;
      }
    },
    copyLink(id) {
      
      var copyText = document.getElementById(id);
    
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      var res = document.execCommand("copy");
      if (id == "referral") {
        this.copy = res ? "Copied" : "Copy";
      } else {
        this.copy2 = res ? "Copied" : "Copy";
      }

    },
  },
};
</script>

<style scoped>

.exchange_setting_heading{
  color: var(--white);
}
.name_setting_box p:nth-child(1) {
  font-weight: 600;
}

.form-box {
  border: 1px solid rgba(0, 0, 0, 0.125);
  padding: 75px 75px;
}

span.badge {
  height: 24px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.pagination_box {
  padding: 0 19px;
  display: flex;
  justify-content: end;
}
</style>