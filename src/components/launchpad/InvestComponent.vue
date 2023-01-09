<template>
    <div class="Invest_box ">
        <div class="row">
            <div class="col-12">
                <!--________MIAN TAB LIST_______ -->
                <div class="main_tab_list p-2">
                    <ul class="nav nav-pills nav-fill mb-2" id="pills-tab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="pills-invest-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-invest" type="button" role="tab" aria-controls="pills-invest"
                                aria-selected="true">Invest</button>
                        </li>
                        <!-- <li class="nav-item" role="presentation">
                        <button class="nav-link" id="pills-show-tab" data-bs-toggle="pill" data-bs-target="#pills-show" type="button" role="tab" aria-controls="pills-show" aria-selected="false">Show</button>
                    </li> -->
                    </ul>
                </div>
                <!--MIAN tabs content -->
                <div class="tab-content" id="pills-tabContent">
                    <div class="tab-pane fade show active" id="pills-invest" role="tabpanel"
                        aria-labelledby="pills-invest-tab">
                        <!-- _________inner invest tab_________  -->
                        <div class="inner_tab_list px-2">
                            <ul class="nav nav-pills  nav-fill" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation" v-for="(data,index) in listData" :key="index">
                                    <button class="nav-link" @click="showTab(index)"
                                        :class="activeTab == index ? 'active' : ''" id="pills-ongoing-tab"
                                        data-bs-toggle="pill" data-bs-target="#pills-ongoing" type="button" role="tab"
                                        aria-controls="pills-ongoing" aria-selected="true">{{ index }}</button>
                                </li>
                                <!-- <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-past-tab" data-bs-toggle="pill" data-bs-target="#pills-past" type="button" role="tab" aria-controls="pills-past" aria-selected="false">Past</button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-upcoming-tab" data-bs-toggle="pill" data-bs-target="#pills-upcoming" type="button" role="tab" aria-controls="pills-upcoming" aria-selected="false">Upcoming</button>
                            </li> -->
                            </ul>
                        </div>

                        <div class="px-2">
                            <div class="projeact-btn my-3 text-center">
                                <router-link to="/request/token" class="text-decoration-none">Create new Project
                                </router-link>

                            </div>
                        </div>
                        <!-- ________SEARCH BOX OF INVEST_______ -->
                        <div class="search_box_invest px-2">
                            <div class="input-group mb-3">
                                <span class="input-group-text" id="basic-addon1">
                                    <img src="../../assets/images/icons/search.svg" alt="icon">
                                </span>
                                <input type="text" class="form-control shadow-none" placeholder="Search"
                                    v-model="search" aria-label="Search" aria-describedby="basic-addon1">
                            </div>
                        </div>
                        <!-- _________INNER TAB CONTENT_________ -->
                        <div class="tab-content" id="pills-tabContent">
                            <!-- inner ongoing tab content -->
                            <div class="tab-pane fade show active" id="pills-ongoing" role="tabpanel"
                                aria-labelledby="pills-ongoing-tab">
                                <div class="ongoing_box">
                                    <div class="tab_heading">
                                        <div
                                            class="currency_list_heading d-flex  justify-content-between mb-2 pb-1  px-2">
                                            <div> NAME</div>
                                            <div class="text-center" v-if="activeTab!='upcoming'">Verification score
                                            </div>
                                            <div class="text-end" v-if="activeTab!='upcoming'">TIME </div>
                                        </div>
                                    </div>
                                    <!--table content  -->
                                    <div class="tab_content" v-if="finalData.length == 0">
                                        <div class="currency_list_box">
                                            <div class=" text-center mt-2"> No Data Found </div>
                                        </div>
                                    </div>
                                    <div class="tab_content" v-if="finalData.length !=0">
                                        <div class="currency_list_box d-flex align-items-center justify-content-between mb-2 py-1 px-2"
                                            style="cursor:pointer;" :class="data.symbol==token?'active':''"
                                            @click="emitData(data)" v-for="(data,index) in finalData" :key="index">
                                            <div class="d-flex align-items-center">

                                                <img :src="data.image" alt="image" class="me-3 rounded-pill" width="25"
                                                    height="25">
                                                <div class="curruncy_box">
                                                    <p class="mb-0"> {{data.symbol}}</p>

                                                </div>
                                            </div>

                                            <div class="text-center" v-if="activeTab!='upcoming'">
                                                {{data.verification_score}}/{{data.total_score}} </div>

                                            <div class="time_box text-end" v-if="activeTab!='upcoming'"> {{ new
                                            Date(data.started_at).toLocaleString("en-us", Date_options)}}<br>
                                                <span><img src="../../assets/images/icons/long-arrow.svg" alt="icon"> {{
                                                new Date(data.expired_at).toLocaleString("en-us", Date_options)}}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="tab-pane fade" id="pills-past" role="tabpanel" aria-labelledby="pills-past-tab">
                                ...</div>
                            <div class="tab-pane fade" id="pills-upcoming" role="tabpanel"
                                aria-labelledby="pills-upcoming-tab">...</div>
                        </div>

                    </div>
                    <div class="tab-pane fade" id="pills-show" role="tabpanel" aria-labelledby="pills-show-tab">2.</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
// import LaunchpadData from "@/assets/jsonfiles/LaunchpadData.json";
// import Choose from "@/assets/jsonfiles/Choose.json";
export default {
    name: 'InvestComponent',
    props: {
        listData: Object,
        tokenData: Object
    },
    data() {
        return {
            search: "",
            token: '',
            activeTab: '',
            tabData: {},
            Date_options: {
                day: "numeric",
                month: "long",
                year: "numeric"
            },
        }
    },
    watch: {
        listData: async function (v) {
            if (this.token) {
                for (let x in v) {
                    this.activeTab = v[x].find((e) => {
                        return e.symbol == this.token
                    });
                    if (this.activeTab) {
                        console.log(this.activeTab, "ddd");
                        this.$emit("update:tokenData", this.activeTab);
                        await this.showTab(x);
                        break;
                    }
                }
            } else {
                await this.showTab('ongoing');
                this.$emit("update:tokenData", this.tabData[0]);
                this.$router.push({ path: '/token', query: { token: this.tabData[0].symbol } });
                this.token = this.tabData[0].symbol;
            }

        }
    },
    computed: {
        finalData() {
            if (this.search.toLowerCase().length == 0) {
                return this.tabData;
            }

            return this.tabData.filter((e) => {
                return e.symbol.toLowerCase().includes(this.search.toLowerCase());
            });

        }

    },
    mounted() {
        if (this.$route.query) {
            this.token = this.$route.query.token;
            console.log(this.token);
        }
    },
    methods: {
        async showTab(tab) {
            this.activeTab = tab
            // this.loading = true;
            this.tabData = await this.listData[tab];

        },
        emitData(data) {
            this.token = data.symbol;
            console.log(data, "grandchild emitt");
            this.$emit("update:tokenData", data);
            this.$router.push({ path: '/token', query: { token: data.symbol } });

        },
    },
}
</script>

<style scoped>
/* MAIN TAB LIST LIST */
.main_tab_list .nav-pills .nav-link.active,
.main_tab_list .nav-pills .show>.nav-link {
    color: var(--nav-active);
    background-color: var(--white);
    border-top: 3px solid var(--black);
    border-radius: 5px;
}

.main_tab_list .nav-pills .nav-link {
    font-size: 12px;
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    background: var(--nav-bg);
    color: var(--black);
    border-top: 3px solid transparent;
    border-radius: 5px;
}

.nav-fill {
    min-width: 100%
}

.inner_tab_list .nav-pills .nav-link {
    font-size: 12px;
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    border-radius: 5px;
    background-color: #f5f5f7;
    color: #222222;
}

.inner_tab_list .nav-pills .nav-link.active,
.inner_tab_list .nav-pills .show>.nav-link {
    background-color: var(--dark-bg);
    color: var(--white);
    border-radius: 5px;
}

.search_box_invest .form-control,
.form-control .input-group-text {
    padding: 4px 7px;
    font-size: 13px;
}

.form-control:focus {
    border-color: #ced4da;
}

.projeact-btn {
    background-color: var(--dark-bg);

    border-radius: 5px;
    font-size: 14px;
    font-weight: 600;
    padding: 6px 0px;
}

.tab_heading {
    font-size: 12px;
    color: var(--pair-list);
    font-weight: 600;
    font-family: "Poppins", sans-serif;
}

.projeact-btn a {
    color: var(--white);
}

.curruncy_box {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    line-height: 16px;
    padding-bottom: 0;
    font-size: 13px;
}

.curruncy_box span,
.time_box span {
    color: var(--ticker-sub);
    font-size: 12px;
    line-height: 1.2;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
}

.currency_list_box {
    font-size: 13px;
    font-weight: 500;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    /* border-bottom: 1px solid var(--input-border); */
}

.currency_list_box:hover {
    background-color: var(--limit-tab-bg);
}


.currency_list_box.active {
    background-color: var(--limit-tab-bg);
    border-radius: 5px;
}

.currency_list_heading {
    border-bottom: 1px solid var(--input-border);
}

.tab_content {
    height: 700px;
    overflow-y: scroll;
}

@media all and (min-width: 768px) and (max-width: 1200px) {
    .tab_content {
        height: 447px;
        overflow-y: scroll;
    }
}

@media all and (min-width: 320px) and (max-width: 767px) {
    .tab_content {
        height: 447px;
        overflow-y: scroll;
    }
}
</style>
