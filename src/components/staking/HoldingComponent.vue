<template>
<div>
    <div class="holding_box">
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed py-4 rounded-top" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        <div class="accordion_box d-flex gap-md-3 gap-1">
                            <div class="currecncy_image d-flex">
                                <div class="currency_one"><img src="../../assets/images/bnb.png" alt="image" style="height:35px"></div>
                                <div class="currency_two"><img src="../../assets/images/bnb.png" alt="image" style="height:35px"></div>
                            </div>
                            <div class="currency-info d-flex gap-3 gap-md-5">
                                <div>
                                    <p class="text-uppercase mb-0">rpt-rpt</p>
                                    <span>Liquidity: 1.4</span>
                                </div>
                                <div>
                                    <p class="text-uppercase mb-0">5</p>
                                    <span>Active Plan</span>
                                </div>
                            </div>
                        </div>
                    </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div class="accordion-body">
                        <div class="my_staling_table table-responsive">
                            <table class="table">
                                <thead>
                                    <tr class="text-center mb-2">
                                        <th scope="col" class="pb-3">Plan Type</th>
                                        <th scope="col" class="pb-3">Maturity Days</th>
                                        <th scope="col" class="pb-3">Est APR</th>
                                        <th scope="col" class="pb-3">Staking Amount</th>
                                        <th scope="col" class="pb-3">Stake Date</th>
                                        <th scope="col" class="pb-3">Expiry Date</th>

                                    </tr>
                                </thead>
                                <tbody v-if="skeletonLoad">
                                    <tr class="text-center align-middle" v-for="(data,index) in My_StakeData" :key="index">
                                        <td class="text-uppercase"> {{data.stake_type}} <button type="button" class="lock-btn ms-2"> Fixed </button> </td>
                                        <td>{{data.maturity_days}}</td>
                                        <td class="text-uppercase"> {{data.apr}}%</td>
                                        <td class="text-capitalize">{{data.amount}} </td>
                                        <td>{{data.stake_date}}</td>
                                        <td>{{data.expiry_date}}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else >
                                    <tr class="text-center align-middle" v-for="i in 4" :key="i">
                                        <td class="text-uppercase">
                                            <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave"  color="#adb5bd" wave-color="#fff" :rounded="true" style="margin:0 auto;"   />
                                        </td>
                                        <td>
                                            <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave"  color="#adb5bd" wave-color="#fff" :rounded="true"  style="margin:0 auto;" />
                                        </td>
                                        <td class="text-uppercase">
                                            <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave"  color="#adb5bd" wave-color="#fff" :rounded="true"  style="margin:0 auto;" />
                                        </td>
                                        <td class="text-capitalize">
                                            <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave"  color="#adb5bd" wave-color="#fff" :rounded="true"  style="margin:0 auto;" />
                                        </td>
                                        <td>
                                            <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave"  color="#adb5bd" wave-color="#fff" :rounded="true"  style="margin:0 auto;" />
                                        </td>
                                        <td>
                                            <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave"  color="#adb5bd" wave-color="#fff" :rounded="true"  style="margin:0 auto;" />
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
</div>
</template>

<script>
import VueSkeletonLoader from "skeleton-loader-vue";
export default {
    name: 'HoldingComponent',
    components: {
        VueSkeletonLoader
    },
    data() {
        return {
            skeletonLoad: true,
            My_StakeData: [{
                    stake_type: 'Fixed',
                    maturity_days: '23',
                    apr: '3',
                    amount: '0.1',
                    stake_date: '19/08/2022',
                    expiry_date: '19/08/2022'

                },
                {
                    stake_type: 'Fixed',
                    maturity_days: '23',
                    apr: '3',
                    amount: '0.1',
                    stake_date: '19/08/2022',
                    expiry_date: '19/08/2022'

                },
                {
                    stake_type: 'Fixed',
                    maturity_days: '23',
                    apr: '3',
                    amount: '0.1',
                    stake_date: '19/08/2022',
                    expiry_date: '19/08/2022'

                }
            ]
        }
    },
}
</script>

<style scoped>
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
</style>
