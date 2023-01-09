<template>
  <SettingsLayout>
      <div class="row">
        <div class="col-md-12">
          <div class="exchange_setting_heading">
            <h3 class="fw-bold">Activity Log Detail</h3>
          </div>
        </div>
      </div>
      
      <!-- heading  -->
      <div class="row mt-2" v-if='this.activityLog'>
        <div class="col-md-12">
          <ul class="list-group">
            <li class="list-group-item mb-3" v-for='(log,index) in activityLog' :key='index' style="background-color:var(--nav-active);color:var(--white)">
              
              <div class="row my-1 my-md-zero">
                <div class="col-md-2 col-3">
                  <label
                    class="
                      form-check-label
                      fw-600 text-secondary
                    "
                    for="flexSwitchCheckChecked"
                    >Date:</label
                  >
                </div>
                <div class="col-md-10 col-9">
                  <label
                    class="form-check-label fw-600"
                    for="flexSwitchCheckChecked"
                    > {{moment(log.created_at).format('DD MMM YYYY, h:mm:ss')}}</label
                  >
                </div>
              </div>
              <!-- Date  -->
              <div class="row my-1 my-md-zero">
                <div class="col-md-2 col-3">
                  <label
                    class="
                      form-check-label
                      fw-600 text-secondary
                    "
                    style="color:var(--white)"
                    for="flexSwitchCheckChecked"
                    >IP:</label
                  >
                </div>
                <div class="col-md-10 col-9">
                  <label
                    class="form-check-label fw-600"
                    for="flexSwitchCheckChecked"
                    >{{log.ip}}</label
                  >
                </div>
              </div>
              <!-- IP Address  -->
              <div class="row my-1 my-md-zero">
                <div class="col-md-2 col-3">
                  <label
                    class="
                      form-check-label
                      fw-600 text-secondary
                    "
                    for="flexSwitchCheckChecked"
                    >Activity:</label
                  >
                </div>
                <div class="col-md-10 col-9">
                  <label
                    class="form-check-label fw-600 text-primary"
                    for="flexSwitchCheckChecked"
                    >{{log.message}}</label
                  >
                </div>
              </div>
              <!-- Activity  -->
            </li>
            <!-- Line1  -->
    
           
            <!-- Line4  -->
          </ul>
          <!--list group-->
        </div>
        <div class="col-md-12">
            <div class="pagination_box">
                <pagination
                    v-model="page"
                    :records="recordData"
                    :per-page="perPageData"
                    :options="options"
                    @paginate="callback"
                />
            </div>
        </div>
      </div>
      <!-- Content  -->
  </SettingsLayout>
</template>



<script>
import ApiClass from "@/api/api";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import Pagination from "vue-pagination-2";

export default {
  name: "ActivityLog",
  components: {
    SettingsLayout,
    Pagination
  },
  data(){
    return{
      activityLog: null,
      page: 1,
      recordData: 0,
      perPageData: 0,
      options: {
        edgeNavigation:false,
        chunksNavigation:false,
        chunk:4,
        texts :false,
        format:false
      },
    }
  },
  mounted(){
    this.callback(this.page);
  },
  methods:{
   async callback(page) {
      await ApiClass.getRequest("log/get?page=" + page, true).then((res) => {
        if (res.data.status_code == "1") {
          this.activityLog = res.data.data.data;
          this.recordData = res.data.data.total;
          this.perPageData = res.data.data.per_page;
        }
      });
    }
  }
};
</script>


<style scoped>
.fw-600 {
  font-weight: 600;
}
.exchange_setting_heading{
  color: var(--white);
}
label{
  color:var(--white)!important;
}

.hr_style {
  color: #cfcfcf !important;
  opacity: 1 !important;
}
 
 @media all and (max-width:991px){
   .my-md-zero{
     margin-top:0 !important;
     margin-bottom: 0 !important;
   }
 }

 a.page-link {
    cursor: pointer;
}
.pagination_box{
padding: 0 19px;
    display: flex;
    justify-content: end;
    color:white
}
</style>