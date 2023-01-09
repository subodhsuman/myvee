<template>
<div>
    <section class="my_staking">
        <div class="container">
            <div class="row">
                <div class="col-md-12 col-lg-12 col-xl-12">
                    <div class="stake-haed  d-md-flex  d-block justify-content-between">
                        <div class="back_to_table mb-3 mb-md-0">
                            <router-link to="/staking" class="rounded-1 text-decoration-none"><img src="../../assets/images/icons/arrow-left.svg" alt="icon"> Back</router-link>
                        </div>
                        <div class="staking-tabs">
                            <ul class="nav nav-pills mb-4" id="pills-tab" role="tablist">
                                <li class="nav-item mb-2 mb-md-0" role="presentation" v-for="(item, index) in tabItems" :key="index">
                                    <button class="nav-link" :class="active_tab == item.id ? 'active' : ''" @click="selectTab(item.id)" :id="`pills-${item.id}-tab`" data-bs-toggle="pill" :data-bs-target="`#pills-${item.id}`" type="button" role="tab" :aria-controls="`pills-${item.id}`" aria-selected="true">{{
                                            item.tab }}</button>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div class="col-md-12 col-lg-12 col-xl-12">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-holdings" role="tabpanel" aria-labelledby="pills-holdings-tab">
                            <div>
                                <div class="holding_box">
                                    <div class="accordion accordion-flush" id="accordionFlushExample">
                                        <div class="accordion-item" v-for="(cards, index) in subsData" :key="index">
                                            <h2 class="accordion-header" :id="`flush-heading${index}`">
                                                <button class="accordion-button collapsed py-4 rounded-top" type="button" data-bs-toggle="collapse" :data-bs-target="`#flush-collapse${index}`" aria-expanded="false" :aria-controls="`flush-collapse${index}`">
                                                    <div class="accordion_box d-flex gap-md-3 gap-1">
                                                        <div class="currecncy_image d-flex">
                                                            <div class="currency_one img-fluid us_img1"><img :src="cards.stake_currency_image" alt="image" style="height:35px"></div>
                                                            <div class="currency_two img-fluid us_img2"><img :src="cards.reward_currency_image" alt="image" style="height:35px"></div>
                                                        </div>
                                                        <div class="currency-info d-flex gap-3 gap-md-5">
                                                            <div>
                                                                <p class="text-uppercase mb-0">{{
                                                                    cards.stake_currency }}-{{ cards.reward_currency
                                                                        }}</p>
                                                                <span>Liquidity: {{ cards.total_liquidity}}</span>
                                                            </div>
                                                            <div>
                                                                <p class="text-uppercase mb-0">{{ cards.total_active
                                                                    }}</p>
                                                                <span>Active Plan</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </h2>
                                            <div :id="`flush-collapse${index}`" class="accordion-collapse collapse" :aria-labelledby="`flush-heading${index}`" data-bs-parent="#accordionFlushExample">
                                                <div class="accordion-body">
                                                    <div class="my_staling_table table-responsive">
                                                        <table class="table">
                                                            <thead>
                                                                <tr class="text-center mb-2">
                                                                    <th scope="col" class="pb-3">Plan Type</th>
                                                                    <th scope="col" class="pb-3">Maturity Days</th>
                                                                    <th scope="col" class="pb-3">Est APR</th>
                                                                    <th scope="col" class="pb-3">ROI</th>
                                                                    <th scope="col" class="pb-3">Staking Amount</th>
                                                                    <th scope="col" class="pb-3">Stake Date</th>
                                                                    <th scope="col" class="pb-3">Expiry Date</th>
                                                                    <th scope="col" class="pb-3">Status</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody v-if="h_loading">
                                                                <tr class="text-center align-middle" v-for="i in 4" :key="i">
                                                                    <td class="text-uppercase">
                                                                        <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                                    </td>
                                                                    <td>
                                                                        <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                                    </td>
                                                                    <td class="text-uppercase">
                                                                        <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                                    </td>
                                                                    <td class="text-capitalize">
                                                                        <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                                    </td>
                                                                    <td>
                                                                        <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                                    </td>
                                                                    <td>
                                                                        <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                            <tbody v-else>
                                                                <tr class="text-center align-middle" v-for="(data, i) in cards.pair_data" :key="i" :class="data.is_active ? '' : 'disabled-body'">

                                                                    <td class="text-uppercase">
                                                                        <div class="plan-inner">
                                                                            <div class="plan-text">
                                                                                <span>{{ data.plan_type }} </span>
                                                                            </div>
                                                                            <!--plan-text-->
                                                                        </div>
                                                                        <!--plan-inner-->
                                                                    </td>
                                                                    <td>{{ maturity_day(data.expiry_date) }}</td>
                                                                    <td class="text-uppercase"> {{
                                                                        data.staking_plan.roi_percentage}}%</td>
                                                                    <td class="text-capitalize">{{data.roi_income}}
                                                                    </td>
                                                                    <td class="text-capitalize">{{data.amount}}
                                                                    </td>
                                                                    <td>{{ showdate(data.next_roi_date) }}</td>
                                                                    <td>{{showdate(data.expiry_date)}}</td>
                                                                    <td>
                                                                        <div class="plan-btn">
                                                                            <div v-if="data.plan_type == 'flexible' && data.is_active == true">
                                                                                <button @click="confirmFunc(data.id)" type="button" class="lock-btn ms-2">
                                                                                    Unsubscribe </button>
                                                                            </div>
                                                                            <div v-if="data.plan_type == 'fixed' && data.is_active == true">
                                                                                <button type="button" class="lock-btn ms-2"> Locked
                                                                                </button>
                                                                            </div>
                                                                            <div v-if="data.plan_type == 'flexible' && data.is_active == false">
                                                                                Inactive At :
                                                                                <small class="m-0">{{
                                                                                    showdate(data.unactive_at)
                                                                                    }}</small>
                                                                            </div>
                                                                        </div>
                                                                        <!--plan-btn-->
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="h_totalData>10">
                                    <pagination v-model="h_page" :records="h_totalData" :per-page="h_perPageData" :options="options" @paginate="getSubscribed" />
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-balance" role="tabpanel" aria-labelledby="pills-balance-tab">
                            <div>
                                <div class="holding-table table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr class="text-center mb-2">
                                                <th scope="col" class="pb-3">Currency</th>
                                                <th scope="col" class="pb-3">Balance</th>
                                                <th scope="col" class="pb-3">Withdrawable</th>
                                                <th scope="col" class="pb-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="skeletonLoad1">
                                            <tr class=" text-center align-middle" v-for="i in 4" :key="i">
                                                <td class="text-uppercase">
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto;" :rounded="true" />
                                                </td>
                                                <td class="text-uppercase">
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto; " :rounded="true" />
                                                </td>
                                                <td class="text-capitalize">
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto; " :rounded="true" />
                                                </td>
                                                <!-- Button trigger modal -->
                                                <td>
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto;" :rounded="true" />
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr class=" text-center align-middle" v-for="(wallet, index) in walletData" :key='index'>
                                                <td class="text-uppercase"><img :src="wallet.currency_image" alt="" class="img-fluid me-2" style="height:30px" />
                                                    {{wallet.currency}}</td>
                                                <td class="text-uppercase">{{wallet.balance}}</td>
                                                <td class="text-capitalize">{{ wallet.withdrawable }}</td>
                                                <!-- Button trigger modal -->
                                                <td><button type="button" class="transfer-btn" data-bs-toggle="modal" data-bs-target="#transferModal" @click="setTransfer(wallet)">Transfer</button></td>
                                            </tr>
                                        </tbody>
                                       
                                    </table>
                                     <div v-if="totalData>10">
                                        <pagination v-model="page" :records="totalData" :per-page="perPageData" :options="options" @paginate="walletTransactions" />
                                    </div>
                                </div>
                                
                                 <div v-if="h_totalData>10">
                                    <pagination v-model="w_page" :records="h_totalData" :per-page="h_perPageData" :options="options" @paginate="getSubscribed" />
                                </div>

                                <!-- Modal -->
                                <div class="modal transfer_modal fade" id="transferModal" tabindex="-1" aria-labelledby="transferModalLabel" aria-hidden="true">
                                    <div class="modal-dialog  modal-dialog-centered">
                                        <div class="modal-content">
                                            <form @submit.prevent="submittransfer">
                                                <div class="modal-header ">
                                                    <h6 class="modal-title" id="transferModalLabel">Transfer to
                                                        wallet</h6>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" id="transfer_close" aria-label="Close"></button>
                                                </div>

                                                <div class="modal-body">
                                                    <div class="transfer_box">
                                                        <p>Do you want to transfer ?</p>

                                                        <div class="d-flex justify-content-between">
                                                            <label class="form-label">Lock Amount</label>
                                                            <label class="form-label">Available Amount: <span>{{
                                                                trans_amount }} {{
                                                                        transferCurrency}}</span></label>
                                                        </div>
                                                        <div class="input-group mb-2">
                                                            <input type="text" class="form-control shadow-none" disabled v-model="trans_with_amount" placeholder="" id="basic-url" aria-describedby="basic-addon3">
                                                            <span class="input-group-text  border-end-secondary" id="basic-addon3">{{ transferCurrency}}</span>
                                                            <span class="input-group-text max_box" id="basic-addon3">MAX</span>
                                                        </div>
                                                    </div>
                                                    <div class="input-errors">
                                                         <div class="text-danger">
                                                          {{ $v.trans_with_amount.$errors[0] ? $v.trans_with_amount.$errors[0].$message : ""}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer justify-content-center">
                                                    <div class="modal_btn" v-if="transferLoader">
                                                        <div class="spinner-border text-light " role="status">
                                                        </div>
                                                    </div>
                                                    <button type="submit" class="modal_btn" v-else>Transfer</button>
                                                    <button type="button" class="modal_btn" data-bs-dismiss="modal">Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-transaction" role="tabpanel" aria-labelledby="pills-transaction-tab">
                            <div>
                                <div class="holding-table table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr class="text-center mb-2">
                                                <th scope="col" class="pb-3">Currency</th>
                                                <th scope="col" class="pb-3">Type</th>
                                                <th scope="col" class="pb-3">Debit</th>
                                                <th scope="col" class="pb-3">Credit</th>
                                                <th scope="col" class="pb-3">Action</th>
                                                <th scope="col" class="pb-3">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody v-if="skeletonLoad">
                                            <tr class="text-center align-middle" v-for="i in 4" :key="i">
                                                <td class="text-uppercase">
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                </td>
                                                <td>
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                </td>
                                                <td class="text-uppercase">
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                </td>
                                                <td class="text-capitalize">
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                </td>
                                                <td>
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                </td>
                                                <td>
                                                    <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;" />
                                                </td>
                                            </tr>
                                        </tbody>
                                        <tbody v-else>
                                            <tr class=" text-center align-middle" v-for="(transaction, index) in transactionData" :key="index">
                                                <td class="text-uppercase"><img :src="transaction.currency_image" alt="" class="img-fluid me-2" style="height:30px" /> {{
                                                            transaction.currency }}</td>
                                                <td class="text-uppercase">{{transaction.transaction_type}}</td>
                                                <td class="text-capitalize">{{transaction.debit}}</td>
                                                <td class="text-capitalize">{{transaction.credit}}</td>
                                                <td class="text-uppercase">{{transaction.balance}}</td>
                                                <td class="text-uppercase">{{transaction.comment}}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                     <div v-if="h_totalData>10">
                                    <pagination v-model="h_page" :records="h_totalData" :per-page="h_perPageData" :options="options" @paginate="getSubscribed" />
                                </div>
                                  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</div>
</template>

<script>
// import HoldingComponent from "@/components/staking/HoldingComponent.vue"; 
// import BalanceComponent from "@/components/staking/BalanceComponent.vue"; 
import VueSkeletonLoader from "skeleton-loader-vue";
import Pagination from 'vue-pagination-2';

// import TransactionComponent from "@/components/staking/TransactionComponent.vue";
import ApiClass from "@/api/api";
import useVuelidate from "@vuelidate/core";
// import {
//     // required,
//     // helpers,
//     // minValue,
// } from "@vuelidate/validators";

import { required } from "vuelidate/lib/validators";

export default {
    name: 'MyStakingView',
    components: {
        Pagination,
        // HoldingComponent ,
        // BalanceComponent ,
        VueSkeletonLoader
        // TransactionComponent
    },

     setup() {
        return {
            $v: useVuelidate(),
        };
    },


    validations: {
    trans_with_amount:{
            required
        }
  },

//  validations () {
    
//         trans_with_amount:{
//             required:helpers.withMessage("Amount is required", required),
//             minValue:helpers.withMessage("Minimum amount is too low",minValue(0.000000001))
            
//         }
     
    
//   },

    data() {
        return {
            skeletonLoad1: true,
            skeletonLoad: true,
            balance_search: false,
            h_loading: true,
            page: 1,
            per_page: 10,
            totalData: 0,
            perPageData: 0,
            w_page: 1,
            w_totalData: 0,
            w_perPageData: 10,
            h_page: 1,
            h_totalData: 0,
            h_perPageData: 10,
            options: {
                edgeNavigation: false,
                chunksNavigation: false,
                chunk: 3,
                texts: false,
                format: false,
            },
            trans_with_amount: "",
            trans_amount:"",
            transferCurrency: "",
            transferLoader: false,
            subsData: [],
            userStake_id: "",
            search_currency: "",
            search_w_currency: "",
            active_tab: "holdings",
            walletData: [],
            tabItems: [{
                    tab: 'My Holdings',
                    id: 'holdings'
                },
                {
                    tab: 'Wallet Balance',
                    id: 'balance'
                },
                {
                    tab: 'Transaction',
                    id: 'transaction'
                },
            ],
            transactionData: [],
        }
    },
    mounted() {
        console.log(this.$v);
        this.getSubscribed(1);
    },
    methods: {
        showdate(date) {
            date = date.split("T")[0].split("-")
            return date[2] + "/" + date[1] + "/" + date[0];
        },
        async confirmFunc(id) {
            this.$swal.fire({
                title: 'Are you sure you want to Unsubscribe?',
                showCloseButton: true,
                confirmButtonText: 'Yes',
                confirmButtonColor: "#db9d2b",
                showCancelButton: true,
                cancelButtonText: 'No',
                cancelButtonColor: "#db9d2b"
            }).then((result) => {
                if (result.isConfirmed) {
                    this.unsubscribe(id);
                }
            })
        },
        async unsubscribe(id) {
            let res = await ApiClass.putNodeRequest("staking/unsubscribe", true, { user_stake_id: id });
            if (res.data.status_code == 1) {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                });
                this.getSubscribed(1);
            } else {
                this.$swal({
                    position: "top-end",
                    icon: "error",
                    title: res.data.message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                });
            }
        },

        maturity_day(expiry_date) {
            let Exp_date = new Date(expiry_date).getTime();
            let today_date = new Date().getTime();
            var Difference_In_Time = Exp_date - today_date;
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            return Math.ceil(Difference_In_Days);

        },
        selectTab(item) {
            this.balance_search = (item == 'balance') ? true : false;
            this.active_tab = item;
            if (item == 'balance') {
                this.getstakeWallet(1);

            }
            if (item == 'transaction') {
                this.walletTransactions(1);
            }
        },
        setTransfer(data) {
            this.trans_amount = data.withdrawable;
            this.trans_with_amount = (data.withdrawable == 0) ? "" : data.withdrawable;
            this.transferCurrency = data.currency;
        },
        async getSubscribed(h_page) {
            const response = await ApiClass.getNodeRequest("staking/myplans?per_page=" + this.per_page + "&page=" + h_page, true);
            if (response.data.status_code == 1) {
                this.h_loading = false;
                this.subsData = response.data.data.data;
                this.h_totalData = response.data.data.total;
                this.h_perPageData = response.data.data.per_page;
            }
        },
        async getstakeWallet(w_page) {
            const response = await ApiClass.getNodeRequest("staking/stake-wallet?per_page=" + this.per_page + "&page=" + w_page, true);
            if (response.data.status_code == 1) {
                console.log(response.data.data);
                this.skeletonLoad1 = false;
                this.walletData = response.data.data.data;
                let ress = response.data;
                this.w_totalData = ress.total;
                this.w_perPageData = ress.per_page;
                 this.h_totalData = response.data.data.total;
                     this.h_perPageData = response.data.data.per_page;
            }
        },
        async walletTransactions(page) {
            const response = await ApiClass.getNodeRequest("staking/wallet-transactions?per_page=" + this.per_page + "&page=" + page, true);
            if (response.data.status_code == 1) {
                this.skeletonLoad = false;
                this.transactionData = response.data.data.data
                let ress = response.data.data;
                this.totalData = ress.total;
                this.perPageData = ress.per_page;
            }
        },

        async submittransfer() {
            this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
            this.transferLoader = true;
            let form_data = {
                currency: this.transferCurrency,
                amount: this.trans_with_amount,
            };
console.log(form_data);
            let response = await ApiClass.postNodeRequest("staking/portfolio-transfer", true, form_data);

            if (response.data.status_code == 1) {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                });
                this.getstakeWallet(1);
                this.transferLoader = false;
                document.getElementById("transfer_close").click();
            } else {
                this.transferLoader = false;
                this.$swal({
                    position: "top-end",
                    icon: "error",
                    title: response.data.message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                });
            }
        }
    },
}
</script>

<style scoped>
.us_img1 {
    border: 1px solid #fff;
    padding: 6px;
    border-radius: 50px;
    z-index: 9;
    background-color: #001029;
}

.us_img2 {
    border: 1px solid #fff;
    padding: 6px;
    border-radius: 50px;
    position: relative;
    right: 15px;
    background-color: #001029;
}

.disabled-body {
    background-color: var(#0e1d36);
    opacity: 0.5
}

.holding_box .accordion-button {
    font-size: 15px;
    font-weight: 500;
    background: var(--dark-bg);
    color: var(--white);

}

/* accordion css */
.holding_box .accordion-button:focus {
    box-shadow: none;
}

.holding_box .accordion-button::after {
    background-image: url('../../assets/images/icons/arrow-down.svg');
}

.holding_box .accordion-body {
    color: var(--bs-accordion-btn-color);
    background-color: var(--dark-bg);
}

.currency_two {
    transform: translate(-15px, 0px);
}

.currency-info span {
    font-weight: 400;
    font-size: 13px;
}

/* table css */
.my_staling_table thead tr th {
    font-size: 15px;
    font-weight: 500;
    color: var(--light-text);
    white-space: nowrap;
}

.my_staling_table tbody tr td {
    font-size: 14px;
    color: var(--white);
}

.my_staling_table tbody tr:hover {
    background-color: var(--dark-hover);
}

.table>:not(caption)>*>* {
    border-bottom-width: 0px;
}

.lock-btn {
    background: var(--social-link);
    padding: 4px 10px;
    border: 1px solid var(--social-link);
    font-size: 14px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 3px;
    color: var(--white);
    cursor: pointer;
}

.transfer-btn {
    background: var(--dark-bg);
    padding: 6px 20px;
    border: 1px solid var(--dark-bg);
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 4px;
    color: var(--white);
    cursor: pointer;
}

.holding-table thead tr th {
    font-size: 15px;
    font-weight: 600;
    color: var(--depth-table-head);
}

.holding-table tbody tr td {
    font-size: 14px;
    color: var(--black);
    background: var(--staking-tr-bg);

}

.holding-table tbody tr {
    background: var(--staking-tr-bg);
    border-bottom: 12px solid var(--white);
}

.table>:not(caption)>*>* {
    border-bottom-width: 0px;
}

.transfer_modal .modal-content {
    background-color: var(--staking-tr-bg)
}

.modal_btn {
    background: var(--dark-bg);
    padding: 6px 20px;
    border: 1px solid var(--dark-bg);
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 4px;
    color: var(--white);
    cursor: pointer;
}

.transfer_modal .form-control {
    font-size: 14px;
}

.transfer_modal p,
.transfer_modal label {
    font-size: 15px;
    font-weight: 500;
}

.transfer_modal .input-group-text {
    font-size: 14px;
    background-color: var(--dark-bg);
    color: var(--white);
}

.max_box,
.transfer_modal label span {
    color: var(--signup-btn) !important;
}

.transfer-btn {
    background: var(--dark-bg);
    padding: 6px 20px;
    border: 1px solid var(--dark-bg);
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 4px;
    color: var(--white);
    cursor: pointer;
}

.holding-table thead tr th {
    font-size: 15px;
    font-weight: 600;
    color: var(--depth-table-head);
}

.holding-table tbody tr td {
    font-size: 14px;
    color: var(--black);
    background: var(--staking-tr-bg);
    white-space: nowrap;

}

.holding-table tbody tr {
    background: var(--staking-tr-bg);
    border-bottom: 12px solid var(--white);
}

.table>:not(caption)>*>* {
    border-bottom-width: 0px;
}

.my_staking {
    min-height: 100vh;
}

.back_to_table a {
    background-color: var(--dark-bg);
    padding: 6px 12px;
    color: var(--white);
}

.stake-haed .nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    background-color: var(--dark-bg);
    color: var(--white);
    box-shadow: var(--box-shadow);
}

.stake-haed .nav-pills .nav-link {
    font-weight: 500;
    color: var(--black);
    font-size: 15px;
    text-transform: uppercase;
    background-color: var(--white);
    box-shadow: var(--box-shadow);
    margin-right: 15px;
}

.plan-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}
</style>