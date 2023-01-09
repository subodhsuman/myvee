<template>
    <div>
        <section class="newsletter-sec">
            <div class="container">
                <div class="row">
                    <div class="col-xl-6 col-lg-8 col-md-10 mx-auto">
                        <div class="inner-warpper">
                            <div class="form-heading mb-4">
                                <h3 class="pb-3">Bitqix Newsletter</h3>
                                <p class="mb-0">Subscribe with Myvee to get the latest coin listings, market <br> data
                                    updates, contest alerts, news and more.</p>
                            </div>
                            <!--form-heading-->

                            <div class="newsletter-form">
                                <form @submit.prevent="submitForm">
                                    <div class="row form-row">
                                        <div class="col-xl-12 col-lg-12 col-md-12 mb-3">
                                            <div class="input-group">
                                                <input type="email" class="form-control" placeholder="Email"
                                                    v-model="email">
                                            </div>
                                            <div class="error" v-if="submitted && !$v.email.required">
                                                Email is required
                                            </div>
                                            <div class="error" v-if="submitted && !$v.email.email">
                                                This must be an email
                                            </div>
                                        </div>
                                        <!--col-xl-12 col-lg-12 col-md-12-->

                                        <div class="col-xl-12 col-lg-12 col-md-12">
                                            <div class="submit-btn text-center">
                                                <button type="submit" class="btn submit-btn">Submit</button>
                                            </div>
                                        </div>
                                        <!--col-xl-12 col-lg-12 col-md-12-->
                                    </div>
                                    <!--row form-row-->
                                </form>
                            </div>
                            <!--newsletter-form-->
                        </div>
                        <!--inner-wrapper-->
                    </div>
                    <!--col-xl-6 col-lg-6 col-md-6-->
                </div>
                <!--row-->
            </div>
            <!--container-->
        </section>
        <!--newsletter-sec-->
    </div>
</template>

<script>
// import ApiClass from "../api/api";
import {
    required,
    email
} from "vuelidate/lib/validators";

export default {
    name: "News",

    data() {
        return {
            loading: false,
            submitted: false,
            email: "",
        };

    },
    validations: {
        email: {
            required,
            email,
        },
    },
    methods: {
        submitForm() {
            this.submitted = true;

            if (this.$v.email?.$invalid) {
                return;
            }
            this.submitted = false;
            this.loading = true;

        },

    },
}
</script>

<style scoped>
section.newsletter-sec {
    min-height: 500px;
    display: flex;
    align-items: center;
}

.inner-warpper {
    background-color: var(--dark-bg);
    padding: 25px 25px;
    border-radius: 10px;
}

.form-heading h3 {
    margin: 0;
    text-transform: uppercase;
    font-size: 25px;
    font-weight: 600;
    color: var(--white);
    font-family: 'Poppins';
    text-align: center;
}

.form-heading p {
    text-align: center;
    color: var(--white);
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
}


.input-group .form-control {
    min-height: 45px;
    border-radius: 3px;
    font-family: Poppins;
    font-size: 16px;
    font-weight: 500;
    color: var(--black);
    border-color: var(--white);
}

.input-group .form-control:focus {
    box-shadow: none;
}

.submit-btn .submit-btn {
    min-height: 40px;
    background: var(--signup-btn);
    border-color: var(--signup-btn);
    min-width: 150px;
    font-size: 16px;
    font-weight: 500;
    font-family: "Poppins";
    border-radius: 3px;
    color: var(--white);
}

.submit-btn .submit-btn:focus {
    box-shadow: none;
}



</style>