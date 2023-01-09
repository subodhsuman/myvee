<template>
    <div>
        <section class="launchpad-token ">
            <div class="container cus_container">
                <div class="row justify-content-center">
                    <div class="col-md-12 col-lg-5 col-xl-3 order-2 order-lg-1">
                        <div class="token_box mb-3 mb-xl-0">
                            <InvestComponent :listData="response" :tokenData="tokenData" :roundData="roundData"
                                v-on:update:tokenData="tokenData = $event" v-on:update:roundData="roundData = $event" />
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-7 col-xl-6 order-1 order-lg-2">
                        <div class="token_box mb-3 mb-xl-0">
                            <slot></slot>

                        </div>
                    </div>
                    <div class="col-md-12 col-lg-6 col-xl-3 order-3">
                        <div class="token_box mb-3 mb-xl-0">
                            <IeoComponent :roundData="roundData" :status="status"
                                v-on:update:roundData="roundData = $event" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import InvestComponent from '../components/launchpad/InvestComponent.vue'
import IeoComponent from '../components/launchpad/IeoComponent.vue'
export default {
    name: 'TokenLayout',
    props: {
        listData: Object,
        tokenData: Object
    },
    components: {
        InvestComponent,
        IeoComponent
    },
    data() {
        return {
            response: {},
            roundData: {},
            status: 'ongoing',
        }

    },
    watch: {
        listData: function (v) {
            this.response = v;
        },
        tokenData: function (v) {
            console.log('middle child ===', v);
            this.tokenData = v;
            this.$emit("update:tokenData", v);
            this.status = v.status;
            this.$emit("update:roundData", v.launchpad_rounds[0]);
            this.roundData = v.launchpad_rounds[0];

        }
    },
}
</script>

<style scoped>
/* custome container */
.cus_container {
    max-width: 1650px;
    /* max-width: 85%; */
}


.launchpad-token {
    min-height: 100vh;
}

.token_box {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
