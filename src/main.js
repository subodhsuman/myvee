import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import exactMath from "exact-math"

import VueAwesomeSwiper from 'vue-awesome-swiper'
import moment from 'moment'


import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import Pagination from 'vue-pagination-2';
Vue.component('pagination', Pagination);

Vue.use(VueSweetalert2);
Vue.config.productionTip = false

/* Import Validation Library */
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(exactMath)


/* Import Bootstrap Library */
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

/* APEX CHART */
import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

/* Import Global Styling File */
import './assets/css/common.css';

//****VUE SELECT BOX****//
import vSelect from "vue-select";
Vue.component("v-select", vSelect);


//SWIPER SLIDER
// import 'swiper/css/swiper.css'
import 'swiper/swiper-bundle.min.css'



import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.prototype.moment = moment
Vue.prototype.site_img_day = require('@/assets/brand/logo-light.png')
Vue.prototype.site_img_night = require('@/assets/brand/logo-dark.png')
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )

Vue.mixin({
    methods: {
        capitalizeFirstLetter(str) { return str.charAt(0).toUpperCase() + str.slice(1) },

        chartColor(firstColor, secondColor, thirdcolor) {
            return {
                layout: {
                    backgroundColor: firstColor,
                    textColor: secondColor,
                },
                timeScale: {
                    borderColor: secondColor,

                },
                rightPriceScale: {
                    visible: true,
                    borderColor: secondColor,
                },
                grid: {
                    vertLines: {
                        color: thirdcolor,
                    },
                    horzLines: {
                        color: thirdcolor,
                    },
                },
            };
        }
    }
})


const mixins = {
    methods: {
        toastMessage: function(icon, message) {
            this.$swal({
                title: message,
                position: 'top-end',
                icon,
                toast: true,
                timer: '3000',
                showConfirmButton: false,
            });
        },
        success: function(message) {
            this.$swal({
                title: message,
                position: 'top-end',
                icon: "success",
                toast: true,
                timer: '2000',
                showConfirmButton: false,
            });
        },
        failed: function(message) {
            this.$swal({
                title: message,
                position: 'top-end',
                icon: "error",
                toast: true,
                timer: '2000',
                showConfirmButton: false,
            });
        },
    }
}

Vue.mixin(mixins)


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')