<template>
    <div>
        <section class="luanchpad_main">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="luanchpad_head mb-5">
                            <h3>Launchpad</h3>
                        </div>
                    </div>

                    <!-- ________Ongoing Head________ -->
                    <div class="col-xl-12">
                        <div class="mb-5">
                            <div class="heading">
                                <p class="mb-4">Ongoing</p>
                            </div>
                            <!-- <OngoingComponent /> -->
                            <div class="row">
                                <div class="div col-xl-4" v-for="(launchpad, index) in response.ongoing" :key="index">
                                    <div class="ongoing_box">
                                        <!-- ________Ongoing content________ -->
                                        <div class="ongoing_content">
                                            <div class="card" style="width: 18rem;">
                                                <router-link :to="'/token?token='+ launchpad.symbol"
                                                    class="text-decoration-none">
                                                    <div class="card">
                                                        <img :src="launchpad.image" alt="image" class="img-fluid"
                                                            style="height=200px;  background-size: cover;">
                                                    </div>
                                                </router-link>
                                                <div class="card-body">
                                                    <h5 class="card-title mb-1">{{ launchpad.name }}</h5>
                                                    <span>{{ launchpad.symbol }}</span>
                                                    <p class="card-text mb-0">{{ (launchpad.disclaimer).slice(0, 100) }}
                                                    </p>

                                                    <div class="d-flex justify-content-between py-3 border_bottom">
                                                        <span class="dark-btn">Live </span>
                                                        <span class="dark-btn">{{ launchpad.expired_at}} </span>
                                                    </div>

                                                    <div class="card_footer d-flex justify-content-between my-3">
                                                        <router-link :to="'/token?token='+ launchpad.symbol"
                                                            class="dark-btn text-decoration-none text-center w-100">
                                                            Participate</router-link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-12">
                        <!-- ________Past Head________ -->
                        <div class="mb-5">
                            <div class="heading">
                                <p class="mb-4">Past</p>
                            </div>
                            <div class="row">
                                <div class="div col-xl-4" v-for="(multiple, index) in response.past" :key="index">
                                    <div class="ongoing_box">
                                        <!-- ________Past content________ -->
                                        <div class="ongoing_content">
                                            <div class="card" style="width: 18rem;">
                                                <router-link :to="'/token?token='+ multiple.symbol"
                                                    class="text-decoration-none">
                                                    <div class="card">
                                                        <img :src="multiple.image" alt="image" class="img-fluid">
                                                    </div>

                                                    <div class="card-body">
                                                        <h5 class="card-title mb-1">{{ multiple.name }}</h5>
                                                        <span>{{ multiple.symbol }}</span>

                                                        <div class="d-flex justify-content-between py-3 border_bottom">
                                                            <span class="dark-btn">Past </span>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-12">
                        <!-- ________Upcoming Head________ -->
                        <div class="mb-5">
                            <div class="heading">
                                <p class="mb-4">Upcoming</p>
                            </div>
                            <div class="row">
                                <div class="div col-xl-4" v-for="(multiple, index) in response.upcoming" :key="index">
                                    <div class="ongoing_box">
                                        <!-- ________Upcoming content________ -->
                                        <div class="ongoing_content">
                                            <div class="card" style="width: 18rem;">
                                                <router-link :to="'/token?token='+ multiple.symbol"
                                                    class="text-decoration-none">
                                                    <div class="card">
                                                        <img :src="multiple.image" alt="image" class="img-fluid">
                                                    </div>

                                                    <div class="card-body">
                                                        <h5 class="card-title mb-1">{{ multiple.name }}</h5>
                                                        <span>{{ multiple.symbol }}</span>


                                                        <div class="d-flex justify-content-between py-3 border_bottom">
                                                            <span class="dark-btn">Upcoming </span>
                                                            <span class="dark-btn">{{ multiple.started_at}} </span>
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </div>
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
import { } from 'dom7';
import Apiclass from '@/api/api';
// import OngoingComponent from '@/components/Launchpadnew/OngoingComponent.vue'
export default {
    name: 'LaunchpadNewView',
    // components: {
    //     OngoingComponent
    // }
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

.luanchpad_main {
    background: var(--dark-bg) url(../../assets/home_images/banner.png);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 800px;
}

.luanchpad_head h3 {
    color: var(--white);
}

.heading p {
    color: var(--white);
}
</style>
