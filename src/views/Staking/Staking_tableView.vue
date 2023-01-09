<template>
    <div>
        <section class="staking_main">
            <div class="container">
                <div class="row">
                    <!-- HEADING -->
                    <div class="col-xl-6 col-lg-4 col-md-5">
                        <div class="staking-header d-flex justify-content-between">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation" v-for="(item, index) in tabItems" :key="index">
                                    <button class="nav-link" :class="item == selected ? 'active' : ''"
                                        @click="change_tab(item)" :id="`pills-${item.toLowerCase()}-list-tab`"
                                        data-bs-toggle="pill" :data-bs-target="`#pills-${item.toLowerCase()}-list`"
                                        type="button" role="tab" :aria-controls="`pills-${item.toLowerCase()}-list`"
                                        aria-selected="true">{{ item }}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- SEARCH BOX -->
                    <div class="col-xl-6 col-lg-8 col-md-7">
                        <div class="search_box d-md-flex d-block justify-content-end align-items-center mb-4">
                            <div class="input-group w-75 md-w-50  me-1 me-md-2  mb-2 mb-md-0">
                                <span class="input-group-text" id="basic-addon1"><img
                                        src="../../assets/images/icons/search.svg" alt="search icon"></span>
                                <input type="text" class="form-control" placeholder="Search Stake Currency"
                                    aria-label="Search" aria-describedby="basic-addon1" v-model="search"
                                    @input="changeonSearch()">
                            </div>
                            <!-- MY STAKING -->
                            <div class="my_staking" v-if="isLoggedIn">
                                <router-link class="text-decoration-none" to="/my-staking">My Staking <img
                                        src="../../assets/images/icons/arrow-right.svg" alt="icon"></router-link>
                            </div>
                        </div>
                    </div>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" :id="`pills-${selected.toLowerCase()}-list-tab`"
                            role="tabpanel" :aria-labelledby="`pills-${selected.toLowerCase()}-list-tab`">
                            <div class="staking-table table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr class="text-center mb-2">
                                            <th scope="col" class="pb-3">Stake Currency</th>
                                            <th scope="col" class="pb-3">Reward Currency</th>
                                            <th scope="col" class="pb-3">Staking Type</th>
                                            <th scope="col" class="pb-3">Maturity Days</th>
                                            <th scope="col" class="pb-3">APR (%)</th>
                                            <th scope="col" class="pb-3">Minimum Stake</th>
                                            <th scope="col" class="pb-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="skeletonLoad">
                                        <tr class="text-center align-middle" v-for="i in 4" :key="i">
                                            <td class="text-uppercase">
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>
                                            <td class="text-uppercase">
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>
                                            <td class="text-capitalize">
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>
                                            <td>
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>
                                            <td>
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>
                                            <td>
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>

                                            <td>
                                                <VueSkeletonLoader type="react" :width="100" :height="15"
                                                    animation="wave" color="#adb5bd" wave-color="#fff" :rounded="true"
                                                    style="margin:0 auto;" />
                                            </td>
                                        </tr>

                                    </tbody>
                                    <tbody v-if="Stake_currencyData.length != 0 && !skeletonLoad">
                                        <tr class="text-center align-middle" v-for="(data,index) in Stake_currencyData"
                                            :key="index">
                                            <td class="text-uppercase"><img :src="data.stake_currency_image" alt=""
                                                    class="img-fluid me-2" style="height:30px" />
                                                {{data.stake_currency}}</td>
                                            <td class="text-uppercase"><img :src="data.reward_currency_image" alt=""
                                                    class="img-fluid me-2" style="height:30px" />
                                                {{data.reward_currency}}</td>

                                            <td class="text-capitalize ">
                                                <div class="stake-btn">
                                                    <span class="btn"
                                                        :class="plan == data.selected_plan_type ? 'plan_active' : ''"
                                                        v-for="(plan, i) in data.a_plan_types" :key="i"
                                                        @click="data.selected_plan_type = plan">{{ plan == 'flexible' ?
                                                        'Flexible' : 'Fixed'}}
                                                    </span>
                                                </div>
                                            </td>

                                            <td>
                                                <div class="stake-btn" id="stake-days">
                                                    <span class="btn stake-days"
                                                        :class="day == data.s_maturity_days ? 'day_active' : ''"
                                                        v-for="(day, i) in data.o_plan_days[data.selected_plan_type]"
                                                        :key="i" @click="data.s_maturity_days = day">{{ day }}
                                                    </span>
                                                </div>
                                            </td>

                                            <td
                                                v-if="data.s_data[`${data.selected_plan_type}-${data.s_maturity_days}`]">
                                                {{
                                                data.s_data[`${data.selected_plan_type}-${data.s_maturity_days}`].roi_percentage}}
                                            </td>
                                            <td v-else>{{
                                            data.s_data[`${data.selected_plan_type}-${reset(data)}`].roi_percentage}}
                                            </td>
                                            <td
                                                v-if="data.s_data[`${data.selected_plan_type}-${data.s_maturity_days}`]">
                                                {{
                                                data.s_data[`${data.selected_plan_type}-${data.s_maturity_days}`].min_stake_amount}}
                                            </td>
                                            <td v-else>{{
                                            data.s_data[`${data.selected_plan_type}-${reset(data)}`].min_stake_amount}}
                                            </td>

                                            <!-- Button trigger modal -->
                                            <td><button type="button" class="subscribe-btn" data-bs-toggle="modal"
                                                    v-if="isLoggedIn" data-bs-target="#subscribeModal"
                                                    @click="setmodeldata(data)">Subscribe</button>
                                                <button type="button" v-else class="subscribe-btn" @click="setlogin">
                                                    Subscribe </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else-if="Stake_currencyData.length == 0 && !skeletonLoad">
                                        <tr>
                                            <td colspan="7">
                                                <div
                                                    class="record-found d-flex align-items-center justify-content-center">
                                                    <p class="m-0">No Record Found</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>

                                </table>
                            </div>
                            <div>
                                <pagination v-model="page" :records="totalData" :per-page="perPageData"
                                    :options="options" @paginate="getStakings" />

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <!-- Staking Main page -->

        <!-- Modal -->
        <div class="modal fade" id="subscribeModal" tabindex="-1" aria-labelledby="subscribeModalLabel"
            aria-hidden="true" data-bs-backdrop="static">
            <div class="modal-dialog  modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-body p-0">
                        <form @submit.prevent="submitForm">
                            <div class="row">
                                <div class="col-md-12 col-lg-6 pe-lg-0 pe-xl-0">

                                    <div class="modal-header  d-flex align-items-center justify-content-between">
                                        <h4 class="modal-title" id="subscribeModalLabel">
                                            Locked Staking
                                        </h4>
                                        <button type="button" class="btn-close shadow-none bg-transparent d-lg-none"
                                            data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <!-- currency -->
                                    <div class="locked-staking-body p-3">

                                        <div class="d-flex justify-content-between mb-3">
                                            <div>Stake Currency : <img :src="subsData.stake_currency_image" alt="icon"
                                                    style="height:30px">
                                                <span class="text-uppercase">{{ subsData.stake_currency }}</span>
                                            </div>
                                            <div>Reward Currency : <img :src="subsData.reward_currency_image" alt="icon"
                                                    style="height:30px">
                                                <span class="text-uppercase">{{ subsData.reward_currency }}</span>
                                            </div>
                                        </div>
                                        <!-- type -->
                                        <div class="mb-3">
                                            <span>Type</span> <br>
                                            <ul
                                                class=" typelist d-flex locked-btn1 justify-content-between  list-unstyled">
                                                <li v-for="(type, i) in subsData.a_plan_types" :key="i">
                                                    <button class="btn type mt-1" type="button" :class="type == subsData.selected_plan_type ? 'flexible_btn' : ''
                                                    "
                                                        @click="(subsData.selected_plan_type = type), (set_id(subsData.selected_plan_type, subsData))">
                                                        {{ type }} </button>
                                                </li>
                                            </ul>
                                        </div>
                                        <!-- Duration -->
                                        <div class="mb-5 duration-btn mt-3">
                                            <span>Duration</span> <br>

                                            <div class="row duration-row">
                                                <div class="col-md-3 col-lg-3 col-xl-3" :v-if="subsData.o_plan_days"
                                                    v-for="(day, i) in NullishCoalescing(subsData.o_plan_days,subsData.selected_plan_type)"
                                                    :key="i"
                                                    @click="(subsData.s_maturity_days = day), (set_id(subsData.selected_plan_type, subsData, subsData.s_maturity_days))">
                                                    <div class="duration-btn">
                                                        <button class="btn day mt-1" type="button"
                                                            :class="day == subsData.s_maturity_days ? 'flexible_btn' : ''">{{
                                                            day }} </button>
                                                    </div>
                                                </div>
                                                <!--col-md-3 col-lg-3 col-xl-3-->
                                            </div>
                                            <!--row duration-row-->
                                        </div>

                                        <!-- AVAILIBLE AMOUNT -->
                                        <div class="d-flex justify-content-between">
                                            <label class="form-label">Lock Amount</label>
                                            <label class="form-label">Available Amount: {{ available_amt }} {{
                                            subsData.stake_currency }}</label>
                                        </div>
                                        <div class="input-group">
                                            <input type="text" class="form-control" v-model="amount"
                                                placeholder="Please enter the amount" id="basic-url"
                                                aria-describedby="basic-addon3"
                                                onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == -1)))">
                                            <span class="input-group-text  border-end-secondary" id="basic-addon3">{{
                                            subsData.stake_currency }}</span>
                                            <span class="input-group-text " style="cursor:pointer;" id="basic-addon3"
                                                @click="setAmount()">MAX</span>
                                        </div>
                                        <div class="input-errors">
                                            <div class="error">
                                                {{ v$.amount.$errors[0] ? v$.amount.$errors[0].$message : ""}}
                                            </div>
                                        </div>

                                        <div class="min_max">
                                            <p>Locked Amount Limitation</p>
                                            <div>
                                                <div class="d-flex justify-content-evenly">
                                                    <span> Minimum</span>
                                                    <span>{{ min_stake_amount }} {{subsData.stake_currency}}</span>
                                                </div>
                                                <div class="d-flex justify-content-evenly">
                                                    <span>Maximum</span>
                                                    <span>{{ max_stake_amount }} {{ subsData.stake_currency}}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- _____________Summary_____________ -->
                                <div class="col-md-12 col-lg-6 ps-lg-0 ps-xl-0">
                                    <div class="modal-header d-flex justify-content-between gap-2 align-items-center ">
                                        <h4 class="modal-title">Summary</h4>
                                        <button type="button" @click="amount=terms=''"
                                            class="btn-close shadow-none bg-transparent d-none d-lg-block "
                                            id="subs_close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="px-3  mt-2">

                                        <div class="summary  border_bottom mb-3">
                                            <ul class="list-unstyled">
                                                <li class="d-flex justify-content-between summary_list mb-3">
                                                    <span><img src="../../assets/images/icons/list-icon.svg" alt="icon"
                                                            class="rotent-icon me-2">Stake Date</span>
                                                    <span>{{ showdate(new Date()) }}</span>
                                                </li>
                                                <li class="d-flex justify-content-between summary_list mb-3">
                                                    <span><img src="../../assets/images/icons/list-icon.svg" alt="icon"
                                                            class="rotent-icon me-2">Value Date</span>
                                                    <span>{{ showdate(new Date()) }}</span>
                                                </li>
                                                <li class="d-flex justify-content-between summary_list mb-3">
                                                    <span><img src="../../assets/images/icons/list-icon.svg" alt="icon"
                                                            class="rotent-icon me-2">Interest Period</span>
                                                    <span>
                                                        {{Interest_period(NullishCoalescing(subsData.s_data,`${subsData.selected_plan_type}-${subsData.s_maturity_days}`).roi_interval)}}</span>
                                                </li>
                                                <li class="d-flex justify-content-between summary_list mb-3">
                                                    <span><img src="../../assets/images/icons/list-icon.svg" alt="icon"
                                                            class="rotent-icon me-2">Interest End Date</span>
                                                    <span> {{
                                                    parsedate(NullishCoalescing(subsData.s_data,`${subsData.selected_plan_type}-${subsData.s_maturity_days}`).maturity_days)}}</span>
                                                </li>
                                                <li class="d-flex justify-content-between summary_list mb-3">
                                                    <span><img src="../../assets/images/icons/list-icon.svg" alt="icon"
                                                            class="rotent-icon me-2">Redemption Period</span>
                                                    <span>2 Days</span>
                                                </li>
                                                <li class="d-flex justify-content-between mb-3">
                                                    <span><img src="../../assets/images/icons/list-icon.svg" alt="icon"
                                                            class="rotent-icon me-2">Redemption Date</span>
                                                    <span>
                                                        {{parsedate(NullishCoalescing(subsData.s_data,`${subsData.selected_plan_type}-${subsData.s_maturity_days}`).maturity_days
                                                        + 2)}}</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="estimate-iterest d-flex justify-content-between mb-1">
                                            <span>Est. APR</span>
                                            <span
                                                class="green-text">{{NullishCoalescing(subsData.s_data,`${subsData.selected_plan_type}-${subsData.s_maturity_days}`).roi_percentage}}%</span>
                                        </div>

                                        <div class="estimate-iterest d-flex justify-content-between mb-3">
                                            <span>Estimated Interest</span>
                                            <span class="green-text">- -</span>
                                        </div>
                                        <div class="mb-4">
                                            <span class="d-flex"> <img src="../../assets/images/icons/warning-icon.svg"
                                                    alt="icon" class="me-2"> The APR is adjusted daily based on the
                                                on-chain staking rewards. And the specific APR is subject to the page
                                                display on the day.</span>
                                        </div>
                                        <div class="mb-3">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" value="" v-model="terms"
                                                    id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    I have read and I agree to Myvee Staking Services Agreement.
                                                </label>
                                                <div class="input-errors">
                                                    <div class="error ">{{ v$.terms.$errors[0] ?
                                                    v$.terms.$errors[0].$message : ""}}
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- BUTTON -->
                                        <button v-if="loading" type="submit"
                                            class="subscribe-btn w-100 my-3">Confirm</button>
                                        <!-- loader -->
                                        <button class="subscribe-btn w-100 my-3" type="button" v-else>
                                            <span class="spinner-grow spinner-grow-sm" role="status"
                                                aria-hidden="true"></span>
                                            Loading...
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pagination from 'vue-pagination-2';
import ApiClass from "@/api/api";
import _ from "lodash";
import VueSkeletonLoader from "skeleton-loader-vue";
import useVuelidate from "@vuelidate/core";
import {
    required,
    helpers,
    sameAs,
    maxValue,
    between,
} from "@vuelidate/validators";
export default {
    name: 'StakingView',
    components: {
        VueSkeletonLoader,
        Pagination
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            page: 1,
            per_page: 10,
            totalData: 0,
            perPageData: 0,
            options: {
                edgeNavigation: false,
                chunksNavigation: false,
                chunk: 3,
                texts: false,
                format: false,
            },
            loading: true,
            plan_type: "",
            search: "",
            AllStaking: [],
            skeletonLoad: false,
            allData: [],
            selected: "All",
            available_amt: "",
            tabItems: ["All", "Fixed", "Flexible"],
            subsData: "",
            clickedData: "",
            typevalue: "",
            amount: "",
            vdefault: "",
            terms: "",
            staking_plan_id: "",
            max_stake_amount: "",
            min_stake_amount: "",
            isLoggedIn: false
        }
    },
    validations() {
        return {
            amount: {
                required: helpers.withMessage("Amount is required", required),
                maxValue: helpers.withMessage("Amount should be less than your wallet balance", maxValue(this.available_amt)),
                between: helpers.withMessage(`Amount should be between ${this.min_stake_amount} and ${this.max_stake_amount}`,
                    between(this.min_stake_amount, this.max_stake_amount)),
            },
            terms: {
                sameAs: helpers.withMessage("Please Agree Staking Services Agreement.", sameAs(true)),
            },
        };
    },
    mounted() {
        var arr = ["a"];
        _.map(arr, (v) => console.log(v));
        this.$store.getters.isLoggedIn == true ? this.isLoggedIn = true : this.isLoggedIn = false;
        this.getStakings(1);
    },
    computed: {
        Stake_currencyData() {
            var vm = this;
            return this.AllStaking?.filter((data) => {
                return data.stake_currency.toLowerCase().indexOf(vm.search.toLowerCase()) !== -1;
            });

        },
    },
    methods: {
        change_tab(tab) {
            this.selected = tab;
            if (tab == "Fixed") {
                this.plan_type = "fixed"
                this.page = 1;
                this.per_page = 10;
                this.totalData = 0;
                this.perPageData = 0;
                this.getStakings(1)
            }

            if (tab == "Flexible") {
                this.plan_type = "flexible"
                this.page = 1;
                this.per_page = 10;
                this.totalData = 0;
                this.perPageData = 0;
                this.getStakings(1)
            }

            if (tab == "All") {
                this.plan_type = ""
                this.page = 1;
                this.per_page = 10;
                this.totalData = 0;
                this.perPageData = 0;
                this.getStakings(1)
            }
        },
        changeonSearch() {
            this.getStakings(1);
        },
        reset(data) {
            return (data.s_maturity_days = data.o_plan_days[data.selected_plan_type][0]);
        },

        async getStakings(page) {
            const response = await ApiClass.getNodeRequest("staking/get?per_page=" + this.per_page + "&page=" + page + "&plan_type=" + this.plan_type + "&search=" + this.search, true);
            this.skeletonLoad = true;
            if (response.data.status_code == 1) {
                this.skeletonLoad = false;
                this.allData = this.AllStaking = response.data.data.data;
                this.totalData = response.data.data.total;
                this.perPageData = response.data.data.per_page;
            }
        },

        async submitForm() {
            const result = await this.v$.$validate();
            if (!result) {
                return;
            }
            this.loading = false;
            let form_data = {
                staking_plan_id: this.staking_plan_id,
                amount: this.amount,
            };

            let response = await ApiClass.postNodeRequest("staking/subscribe", true, form_data);

            if (response.data.status_code == 1) {
                this.$swal({
                    position: "top-end",
                    icon: "success",
                    title: response.data.message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                });
                //empty fields
                this.currency = "";
                this.amount = "";
                this.v$.$reset();
                this.loading = true;
                document.getElementById("flexCheckDefault").click();
                document.getElementById("subs_close").click();
            } else {
                this.loading = true;
                this.$swal({
                    position: "top-end",
                    icon: "error",
                    title: response.data.message,
                    showConfirmButton: false,
                    toast: true,
                    timer: 3000,
                });
            }
        },
        padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        },

        showdate(date) {
            var dd = this.padTo2Digits(date.getDate())
            var mm = this.padTo2Digits(date.getMonth() + 1)
            var final = dd + "/" + mm + "/" + date.getFullYear();
            return final;
        },
        Interest_period(period) {
            if (period == "D") {
                return "Daily";
            }
            if (period == "W") {
                return "Weekly";
            }
            if (period == "M") {
                return "Monthly";
            }
        },
        NullishCoalescing(a, b) {
            return a?.[b] ?? [];
        },
        parsedate(days) {
            var end_date = new Date().getDate() + days;
            var gg = new Date(parseFloat(new Date().setDate(end_date))).toLocaleDateString();
            var aa = gg.toString().split("/");
            return this.padTo2Digits(parseFloat(aa[1])) + "/" + this.padTo2Digits(parseFloat(aa[0])) + "/" + aa[2];
        },
        set_id(type, data, day = null) {
            if (day == null) {
                let dayy = data.o_plan_days[`${type}`][0];
                this.staking_plan_id = data.s_data?.[`${type}-${dayy}`]?.id;
                this.max_stake_amount =
                    data.s_data?.[`${type}-${dayy}`]?.max_stake_amount;
                this.min_stake_amount =
                    data.s_data?.[`${type}-${dayy}`]?.min_stake_amount;
            } else {
                this.staking_plan_id = data.s_data?.[`${type}-${day}`].id;
                this.max_stake_amount =
                    data.s_data?.[`${type}-${day}`].max_stake_amount;
                this.min_stake_amount =
                    data.s_data?.[`${type}-${day}`].min_stake_amount;
            }
        },

        setAmount() {
            let max_stake_amount = this.max_stake_amount;
            let available_amt = this.available_amt;
            let new_amt = Math.min(max_stake_amount, available_amt);
            this.amount = new_amt;
        },
        async redirectLog() {
            this.$router.push("/login");
        },
        setlogin() {
            this.redirectLog();
        },

        setmodeldata(data) {
            let stak_currency = data.stake_currency;
            this.getFunds(stak_currency);
            this.subsData = data;
            let selected_plan_type = this.subsData.selected_plan_type;
            let s_maturity_days = this.subsData.s_maturity_days;
            this.staking_plan_id = this.subsData.s_data?.[`${selected_plan_type}-${s_maturity_days}`].id;
            this.max_stake_amount = this.subsData.s_data?.[`${selected_plan_type}-${s_maturity_days}`].max_stake_amount;
            this.min_stake_amount = this.subsData.s_data?.[`${selected_plan_type}-${s_maturity_days}`].min_stake_amount;
            this.v$.$reset();


        },

        async getFunds(stak_currency) {
            let ress = await ApiClass.getNodeRequest("user-crypto/funds/get", true);
            if (ress.data.status_code == 1) {
                var find_funds = ress.data.data.find((el) => {
                    return el.currency == stak_currency;
                });
                this.available_amt = find_funds.balance;
            }
        },
    }
}
</script>

<style scoped>
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

/* staking background */
.staking_main {
    /* background: var(--dark-bg) url(../../assets/home_images/banner.png); */
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 800px;
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
