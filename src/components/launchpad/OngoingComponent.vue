<template>
    <div>
        <div class="ongoing_box" v-for="(launchpad, index) in response.ongoing" :key="index">
            <!-- ________Ongoing content________ -->
            <div class="ongoing_content">
                <div class="card" style="width: 18rem;">
                    <router-link :to="'/token?token='+ launchpad.symbol">
                        <div class="card">
                            <img :src="launchpad.image" alt="image" class="img-fluid">
                        </div>
                    </router-link>
                    <div class="card-body">
                        <h5 class="card-title mb-1">{{ launchpad.name }}</h5>
                        <span>{{ launchpad.symbol }}</span>
                        <p class="card-text mb-0">{{ (launchpad.disclaimer).slice(0, 100) }}</p>

                        <div class="d-flex justify-content-between py-3 border_bottom">
                            <span class="dark-btn">Live </span>
                            <span class="dark-btn">{{ launchpad.expired_at}} </span>
                        </div>

                        <div class="card_footer d-flex justify-content-between my-3">
                            <router-link :to="'/token?token='+ launchpad.symbol"
                                class="dark-btn text-decoration-none text-center w-100">Participate</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { } from 'dom7';
import Apiclass from '@/api/api';
export default {
    name: 'OngoingComponent',
    data() {
        return {
            response: {}
        }
    },
    created() {
        this.tokenGet();
    },
    methods: {
        async tokenGet() {
            let res = await Apiclass.getNodeRequest('launchpad/user/token_get')
            this.response = res.data.data;
            console.log({ res: this.response });
        }
    }
}
</script>

<style scoped>
.card-text {
    color: var(--grey-text);
    font-size: 15px;
}

.card-body span {
    font-size: 13px;
}

.card-body h5 {
    font-size: 16px;
    font-weight: 500;
}

.dark-btn {
    background: var(--dark-bg);
    padding: 6px 12px;
    border: 1px solid var(--dark-bg);
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 3px;
    color: var(--white);
}

.card {
    /* box-shadow: 10px 10px 50px rgba(0, 0, 0, 0.3); */
    box-shadow: 10px 10px 42px rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.5);
    border-left: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
    border-radius: 15px;
}

.border_bottom {
    border-bottom: 1px solid #ccc;
}
</style>
