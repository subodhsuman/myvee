<template>
<div>
    <TokenLayout :listData="response" :tokenData="tokenData" :roundData="roundData" v-on:update:tokenData="tokenData = $event"  v-on:update:roundData="roundData = $event">
        <div class="token_main_box row pt-1 pt-md-3 p-2">

            <!-- ______token details______ -->
            <div class="col-md-12 col-lg-6 col-xl-8 mb-md-2 mb-3">
                <div class="token_detail d-block d-md-flex mb-2 mb-md-0">
                    <div class="token-head">
                        <h2 class="text-uppercase"> {{ tokenData.name }}</h2>
                    </div>
                    <div class="token_tag" v-for="(hash, index) in tokenData.hash_tags" :key="index">
                        <span class="badge mx-2">#{{ hash }}</span>
                        <!-- <span class="badge mx-2">#token</span>
                        <span class="badge mx-2">#token</span> -->
                    </div>
                </div>
                <div class="token-link">
                    <a :href="tokenData.token_url" target="_blank" class="link-primary">{{ tokenData.token_url }}</a>
                </div>
            </div>
            <!-- ______token Links______ -->
            <div class="col-md-12 col-lg-6 col-xl-4 mb-2">
                <div class="web-text text-xl-end text-start">
                    <p class="m-0">Web 3.0 Supermarket</p>
                </div>
                <!-- icon list -->
                <div class="icon-list">
                    <ul class="list-unstyled d-flex gap-2 justify-content-start justify-content-xl-end mb-md-0 mb-3">
                        
                            <li><a :href="social_links.twitter" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="fill: var(--kb-white);">
                                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z">
                                    </path>
                                </svg></a></li>
                        
                        
                            <li><a :href="social_links.facebook" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="fill: var(--kb-white);">
                                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z">
                                    </path>
                                </svg></a></li>
                        
                        
                            <li><a :href="social_links.linkedin" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="fill: var(--kb-white);">
                                    <circle cx="4.983" cy="5.009" r="2.188"></circle>
                                    <path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z">
                                    </path>
                                </svg></a></li>
                        
                        
                            <li><a :href="social_links.telegram" target="_blank"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" style="fill: var(--kb-white);">
                                    <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z">
                                    </path>
                                </svg></a></li>
                        
                    </ul>
                </div>
            </div>
            <div class="col-md-12 col-lg-12 col-xl-12 mb-4">
                <!-- slider component -->
                <LaunchpadSliderComponent :gallery="gallery"/>
            </div>
            <!-- Project summary -->
            <div class="col-md-12 col-lg-12 col-xl-12">
                <div class="project-summary mb-4">
                    <h6>Project summary</h6>
                    <p>{{ tokenData.project_summary }}</p>
                </div>
            </div>
            <!-- Data Room -->
            <div class="col-md-12 col-lg-12 col-xl-12">
                <div class="project-summary mb-4">
                    <h6>Data Room</h6>
                    <ul class="data-room-list mb-2 list-unstyled">
                        <li class="p-2">
                            <div class="data-file d-flex gap-3">
                                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" style="fill: var(--bq-gray);">
                                        <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z">
                                        </path>
                                    </svg></span>
                                <a  :href="tokenData.whitepaper_link" target="_blank" class="m-0" style="text-decoration:none;">WhitePaper</a>
                            </div>
                        </li>

                    </ul>
                    <div class="data-room-btn px-3">
                        <router-link to="" class="text-decoration-none">Get Access To Data Room
                        </router-link>
                    </div>
                </div>

            </div>
            <!-- Highlights -->
            <div class="col-md-12 col-lg-12 col-xl-12">
                <div class="project-summary mb-4">
                    <h6>Highlights</h6>
                    <ul>
                        <li>{{ tokenData.company_highlight }}</li>
                    </ul>
                </div>

            </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="project-summary mt-4">
                        <h6 class="m-0 mb-3">Token Economics</h6>
                    </div>

                    <div class="token-data d-flex justify-content-between align-items-center mb-3" v-for="(allocated,index) in tokenData.token_economics" :key="index">
                        <div class="token-head">
                            <h6 class="m-0">{{(index).toUpperCase()}}:</h6>
                        </div>
                        <div class="token-head">
                            <p class="m-0">{{allocated}}</p>
                        </div>
                    </div>

                </div>
                <div class="col-md-6">
                    <div class="ps-3 project-summary mt-4">
                        <h6 class="m-0 mb-3">Fund Raising</h6>
                    </div>
                    <div class="ps-3 token-data d-flex justify-content-between align-items-center mb-3" v-for="(allocated,index) in tokenData.fund_raising" :key="index">
                        <div class="token-head">
                            <h6 class="m-0">{{(index).toUpperCase()}}:</h6>
                        </div>
                        <div class="token-head">
                            <p class="m-0"> {{allocated}}</p>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-md-12">
                <div class="project-summary mt-4">
                    <h6 class="m-0 mb-3">Token Allocation</h6>
                    <!-- <ul class="round p-0">
                            <li v-for="(allocated,index) in tokenData.token_allocation" :key="index">{{(index).toUpperCase()}}: 
                                {{allocated}}
                            </li>

                        </ul> -->
                    <div id="chart" class="round p-0">
                        <apexchart type="donut" :options="chartOptions" :series="series" height=300></apexchart>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <div class="project-summary mt-4">
                    <h6 class="m-0 mb-3">Use Of Funds</h6>

                    <table class="table table-striped">
                        <tbody>
                            <tr class="launchpad-table " v-for="(allocated,index) in tokenData.use_of_funds" :key="index">
                                <th scope="row">{{(index).toUpperCase()}}</th>
                                <td class="">{{allocated}}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div class="col-md-12">
                <div class="project-summary1 mt-3">
                    <h6 class="m-0 mb-3">Disclaimer</h6>
                    <p class="m-0 mb-3">{{tokenData.disclaimer}}</p>

                </div>
            </div>
        </div>

    </TokenLayout>
</div>
</template>

<script>
import ApiClass from '../../api/api.js';
import LaunchpadSliderComponent from '../../components/launchpad/LaunchpadSliderComponent.vue'
import TokenLayout from '../../layouts/TokenLayout.vue';
import {} from 'dom7';
export default {
    name: 'TokenView',
    components: {
        LaunchpadSliderComponent,
        TokenLayout
    },

    watch:{
        tokenData: async function (v) {
            this.status = v.status;
            if (this.series.length > 0 && this.chartOptions.labels.length > 0) {
                this.series = [];
                this.chartOptions.labels = [];
            }
            this.gallery = v.gallery;
            this.social_links = v.social_media_link;
            this.$emit("update:roundData", v.launchpad_rounds[0]);
            this.roundData = v.launchpad_rounds[0];
            console.log('hhhh', v.token_allocation);

            for (let key in v.token_allocation) {
                this.series.push(+(v.token_allocation[key]));
                await this.chartOptions.labels.push(key + ' ' + v.token_allocation[key] + '%');
            }
            console.log('here', this.chartOptions.labels);
        }
    },
    data() {
        return {
            status:'ongoing',
            roundData:{},
            response:{},
            tokenData:{},
            series: [],
            chartOptions: {
                labels: [],
                chart: {
                    type: 'donut',
                },
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }]
            },
            gallery: [],
            social_links: {},
        };
    },
     created() {
        this.tokenGet();
    },
    methods: {
       async tokenGet(){
         let res = await ApiClass.getNodeRequest('launchpad/user/token_get')
         this.response = res.data.data;
        //  console.log(this.response,"sdsds");
       }
    },
}
</script>

<style scoped>
.launchpad-token {
    min-height: 100vh;
}

.token_box {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.token_main_box {
    /* box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px; */
    max-height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: var(--kb-white);
}

.token_detail h2 {
    font-size: 20px;
    font-weight: 500;
}

.token_tag .badge {
    background: var(--staking-tr-bg);
    color: var(--dark-bg);
    font-weight: 500;

    /* color: var(--bq-link);
    background-color: #EEEFFF; */
}

/* token link */
.token-link a {
    font-size: 14px;
    text-decoration: none !important;
    color: var(--dark-bg) !important;
}

.token-link a:hover {
    text-decoration: underline !important;
    color: var(--dark-bg) !important;
}

/* PROJECT SUMMARY */
.project-summary h6 {
    font-weight: 500;
}

.project-summary p,
.project-summary ul li {
    color: var(--kb-black);
    font-size: 14px;
    line-height: 23px;
    letter-spacing: 0.6px;
    text-align: justify;
}

.data-room-list {
    border-bottom: 1px solid var(--bq-gray);
    padding: 5px 10px;
}

.data-room-btn a {
    background-color: var(--bq-yellow);
    color: var(--kb-white);
}

.data-room-btn a:hover {
    text-decoration: underline !important;
}

@media all and (min-width: 768px) and (max-width: 1200px) {
    .token_main_box {
        max-height: 80vh;
    }
}

@media all and (min-width: 320px) and (max-width: 768px) {
    .token_main_box {
        max-height: 77vh;
    }
}
/* .project-summary h6 {
    color: var(--kb-black);
}

.project-summary p {
    color: var(--kb-black);
    font-size: 14px;
}

.project-summary span {
    color: var(--kb-black);
    font-size: 14px;
}
.project-summary1 h6 {
    color: var(--bq-gray);
}

.project-summary1 p {
    color: var(--bq-gray);
    font-size: 14px;
} */
</style>
