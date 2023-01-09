<template>
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
                <tr class=" text-center align-middle" v-for="(data,index) in TransactionData" :key="index">
                    <td class="text-uppercase"><img :src=" require(`@/assets/images/${data.currencycoin}`)" alt="" class="img-fluid me-2" style="height:30px" /> {{data.currency}}</td>
                    <td class="text-uppercase">{{data.type}}</td>
                    <td class="text-capitalize">{{data.debit}}</td>
                    <td class="text-capitalize">{{data.credit}}</td>
                    <td class="text-uppercase">{{data.balance}}</td>
                    <td class="text-uppercase">{{data.comments}}</td>
                </tr>
            </tbody>
            <tbody v-else>
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
        </table>
    </div>
</div>
</template>

<script>
import VueSkeletonLoader from "skeleton-loader-vue";
export default {
    name: 'TransactionComponent',
    components:{
        VueSkeletonLoader
    },
    data() {
        return {
            skeletonLoad:true,
            TransactionData: [{
                    currencycoin: 'bnb.png',
                    currency: 'bnb',
                    type: 'Portfolio-Transfer',
                    debit: '0',
                    credit: '7',
                    balance: '1.5',
                    comments: '0.168 transfered To Portfolio Wallet'

                },
                {
                    currencycoin: 'bnb.png',
                    currency: 'bnb',
                    type: 'Portfolio-Transfer',
                    debit: '0',
                    credit: '7',
                    balance: '1.5',
                    comments: '0.168 transfered To Portfolio Wallet'
                },
                {
                    currencycoin: 'bnb.png',
                    currency: 'bnb',
                    type: 'Portfolio-Transfer',
                    debit: '0',
                    credit: '7',
                    balance: '1.5',
                    comments: '0.168 transfered To Portfolio Wallet'
                }
            ]
        }
    },
}
</script>

<style scoped>
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
</style>
