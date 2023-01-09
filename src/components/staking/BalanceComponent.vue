<template>
<div>
    <div class="holding-table table-responsive">
        <table class="table">
            <thead>
                <tr class="text-center mb-2" >
                    <th scope="col" class="pb-3">Currency</th>
                    <th scope="col" class="pb-3">Balance</th>
                    <th scope="col" class="pb-3">Withdrawable</th>
                    <th scope="col" class="pb-3">Action</th>
                </tr>
            </thead>
            <tbody v-if="skeletonLoad">
                <tr class=" text-center align-middle" v-for="(data,index) in Balance_currencyData" :key="index">
                    <td class="text-uppercase"><img :src=" require(`@/assets/images/${data.currencycoin}`)" alt="" class="img-fluid me-2" style="height:30px" /> {{data.currency}}</td>
                    <td class="text-uppercase">{{data.balance}}</td>
                    <td class="text-capitalize">{{data.withdrawable}}</td>
                    <!-- Button trigger modal -->
                    <td><button type="button" class="transfer-btn" data-bs-toggle="modal" data-bs-target="#transferModal">Transfer</button></td>
                </tr>
            </tbody>
             <tbody v-else>
                <tr class=" text-center align-middle"  v-for="i in 4" :key="i">
                    <td class="text-uppercase">  <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto;" :rounded="true" /></td>
                    <td class="text-uppercase">  <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto; " :rounded="true" /></td>
                    <td class="text-capitalize">  <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto; " :rounded="true" /></td>
                    <!-- Button trigger modal -->
                    <td>  <VueSkeletonLoader type="react" :width="100" :height="15" animation="wave" color="#adb5bd" wave-color="#fff" style="margin:0 auto;" :rounded="true" /></td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- Modal -->
    <div class="modal transfer_modal fade" id="transferModal" tabindex="-1" aria-labelledby="transferModalLabel" aria-hidden="true">
        <div class="modal-dialog  modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header ">
                    <h6 class="modal-title" id="transferModalLabel">Transfer to wallet</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="transfer_box">
                        <p>Do you want to transfer ?</p>

                        <div class="d-flex justify-content-between">
                            <label class="form-label">Lock Amount</label>
                            <label class="form-label">Available Amount: <span>0.00116 BNB</span></label>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control shadow-none" placeholder="0" id="basic-url" aria-describedby="basic-addon3">
                            <span class="input-group-text  border-end-secondary" id="basic-addon3">BNB</span>
                            <span class="input-group-text max_box" id="basic-addon3">MAX</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="modal_btn" data-bs-dismiss="modal">Transfer</button>
                    <button type="button" class="modal_btn">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import VueSkeletonLoader from "skeleton-loader-vue";
export default {
    name: 'BalanceComponent',
    components:{
        VueSkeletonLoader
    },
    data() {
        return {
            skeletonLoad: true,
            Balance_currencyData: [{
                    currencycoin: 'bnb.png',
                    currency: 'bnb',
                    balance: '1.5',
                    withdrawable: '0'

                },
                {
                    currencycoin: 'bnb.png',
                    currency: 'bnb',
                    balance: '1.5',
                    withdrawable: '0'

                },
                {
                    currencycoin: 'bnb.png',
                    currency: 'bnb',
                    balance: '1.5',
                    withdrawable: '0'

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
.transfer_modal .form-control  {
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
.max_box ,
.transfer_modal label span{
    color: var(--signup-btn) !important ;
}
</style>
