<template>
<SettingsLayout>
    <div class="row">
        <div class="col-md-12">
            <div class="exchange_setting_heading">
                <h3 class="fw-bold">Stake List</h3>
            </div>
        </div>
    </div>

    <!-- heading  -->
    <div class="row " v-if='this.activityLog'>
        <div class="staking_main">
        <div class="container">
            <div class="row">
                <!-- HEADING -->

                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-tabContent" role="tabpanel" aria-labelledby="pills-tabContent-list-tab">
                        <div class="staking-table table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="text-center mb-2">
                                        <th scope="col" class="pb-3">Id</th>
                                        <th scope="col" class="pb-3">Stake Currency</th>
                                        <th scope="col" class="pb-3">Reward Currency</th>
                                        <th scope="col" class="pb-3">Amount</th>
                                        <th scope="col" class="pb-3">Plan Type</th>
                                        <th scope="col" class="pb-3">Created At</th>
                                        <th scope="col" class="pb-3">Expired At</th>
                                        <th scope="col" class="pb-3">Activate Status</th>
                                    </tr>
                                </thead>
                                <tbody v-if="activityLog.length != 0">
                                    <tr class="text-center align-middle" v-for="(item, index) in activityLog" :key="index">
                                        <td>{{item.id}}</td>
                                        <td>{{item.staking_plan.stake_currency}}</td>
                                        <td>{{item.reward_currency}}</td>
                                        <td>{{item.amount}}</td>
                                        <td class="text-capitalize">{{item.plan_type}}</td>
                                        <td>{{moment(item.created_at).format('DD MMM YYYY, h:mm:ss')}}</td>                                        
                                        <td class="text-capitalize">{{moment(item.expiry_date).format('DD MMM YYYY, h:mm:ss')}}</td>  
                                        <td class="text-center py-1 px-3 rounded fw-bold" :class="item.is_active == 1 ? 'bg-success' : 'bg-warning'">
                                                {{ item.is_active == 1 ? "ON" : "OFF" }}
                                        </td>                                      
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="7">
                                            <div class="record-found d-flex align-items-center justify-content-center">
                                                <p class="m-0">No Record Found</p>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                        <div>
                            <pagination v-model="page" :records="recordData" :per-page="per_page" :options="options" @paginate="getallOrders" />
                        </div>
                    </div>
                </div>

            </div>
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
    name: "User_Stake_List",
    components: {
        SettingsLayout,
        Pagination
    },
    data() {
        return {
            activityLog: null,
            page: 1,
            recordData: 0,
            per_page:10,
            options: {
                edgeNavigation: false,
                chunksNavigation: false,
                chunk: 4,
                texts: false,
                format: false
            },
        }
    },
    mounted() {
        this.getallOrders();
    },
    methods: {
        async getallOrders() {
            await ApiClass.getNodeRequest("staking/getuser_stakelist?page=" + this.page+ "&per_page=" + this.per_page, true).then((res) => {
            
                if (res.data.status_code == "1") {  
                    this.activityLog = res.data.data.data;
                    this.recordData = res.data.data.total;
                    this.perPageData = res.data.data.per_page;
               
                }
            });
        },
    }
};
</script>

<style scoped>
/* .rounded {
    border-radius: 10px 5px 15px 15px !important;
} */

.exchange_setting_heading{
  color: var(--white);
}
.bg-warning {
    background-color: #f1b44c !important;
}
.fw-bold {
    font-weight: 600 !important;
}
/* .py-1 {
    padding-top: 0.25rem !important;
    padding-bottom: 0.25rem !important;
} */
/* .px-3 {
    padding-right: 1rem !important;
    padding-left: 1rem !important;
} */
.fw-600 {
    font-weight: 600;
}

.hr_style {
    color: #cfcfcf !important;
    opacity: 1 !important;
}

@media all and (max-width:991px) {
    .my-md-zero {
        margin-top: 0 !important;
        margin-bottom: 0 !important;
    }
}

a.page-link {
    cursor: pointer;
}

.pagination_box {
    padding: 0 19px;
    display: flex;
    justify-content: end;
}

span.stake-days.day_active {
    background-color: var(--dark-bg);
    font-size: 15px;

}
.staking-table tbody tr td span {
    border: 1px solid var(--dark-bg);
    border-radius: 3px;
    font-size: 15px;

}
.staking-table tbody tr td span.plan_active {
    background: var(--dark-bg);
    border-radius: 3px;
    color: var(--white);
    font-size: 15px;
}
.staking-table tbody tr td span.day_active {
     background: var(--dark-bg);
    border-radius: 3px;
    color: var(--white);
}
.duration-btn button.btn.duration {
    width: 100%;
    border: 1px solid var(--dark-bg);
    min-width: 150px;
    text-transform: capitalize;
    color: var(--black);
}

.duration-btn button.btn.duration.flexible_btn {
    background-color: var(--dark-bg);
    color: var(--white);
}

ul.typelist li button.btn.type {
    width: 100%;
    border: 1px solid var(--dark-bg);
    min-width: 260px;
    text-transform: capitalize;
    color: var(--black);
}

ul.typelist li button.btn.type.flexible_btn {
    background-color: var(--dark-bg);
    color: var(--white);
}
.staking_main {
    /* background: var(--dark-bg) url(../../assets/home_images/banner.png); */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
}

.staking_main .nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background-color: var(--dark-bg);
    color: var(--white);
    box-shadow: var(--box-shadow);
}

.staking_main .nav-pills .nav-link {
    font-weight: 500;
    color: var(--black);
    font-size: 15px;
    text-transform: uppercase;
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    margin-right: 15px;
}

.my_staking a {
    color: var(--dark-bg);
    font-weight: 600;
    font-size: 15px;
}

.form-control,
.form-control {
    font-size: 15px;
    border: 1px solid transparent !important;
}

.search_box .form-control:focus,
.modal-body .form-control:focus {
    box-shadow: none;
}

.input-group-text,
.modal-body .input-group-text {
    border: 1px solid transparent;
}

.search_box .input-group,
.modal-body .input-group {
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    border-radius: 0.375rem;
}

.staking-table thead tr th {
    font-size: 15px;
    font-weight: 600;
    color: var(--depth-table-head);
    white-space: nowrap;
}

.staking-table tbody tr td {
    font-size: 14px;
    color: var(--black);
    background: var(--staking-tr-bg);

}

.staking-table tbody tr {
    background: var(--staking-tr-bg);
    border-bottom: 12px solid var(--white);
}



.subscribe-btn {
    padding: 6px 12px;
    border: 1px solid var(--dark-bg);
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 3px;
    color: var(--black);
    cursor: pointer;
    background-color: transparent;
}
.subscribe-btn:hover {
    background: var(--dark-bg);
    padding: 6px 12px;
    border: 1px solid var(--dark-bg);
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 3px;
    color: var(--white);
    cursor: pointer;
}

.table>:not(caption)>*>* {
    border-bottom-width: 0px;
}

.modal-content {
    background-color: var(--staking-tr-bg);
}

.duration-btn button.btn.day {
    width: 100%;
    border: 1px solid var(--dark-bg);
    text-transform: capitalize;
    color: var(--black);
}

.duration-btn button.btn.day.flexible_btn {
    background: var(--dark-bg);
    padding: 6px 20px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 4px;
    color: var(--white);
    cursor: pointer;
}

.modal-body span,
label {
    font-size: 15px;
    font-weight: 500;
}

.modal-header {
    border-bottom: 2px solid var(--dark-bg);
    font-size: 18px;
}

.rotent-icon {
    transform: rotate(45deg);
}

.summary_list {
    position: relative;
}

.summary_list:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 2px;
    background-color: var(--signup-btn);
    top: 14px;
    left: 4px;
}

.border_bottom {
    border-bottom: 2px solid var(--dark-bg);
}

.green-text {
    color: var(--green);
}

.form-check-input:checked {
    background-color: var(--dark-bg);
    border-color: var(--dark-bg);
}

p.VuePagination__count.VuePagination__count {
    font-weight: 400;
}

.modal-header h4 {
    font-size: 16px;
    font-weight: 600;
}

.summary_list:nth-child(7):before {
    display: none;
}

.stake-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}
</style>
