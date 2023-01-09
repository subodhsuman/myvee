<template>
<section class="login-page">
    <div class="container">
        <div class="row align-items-center justify-content-center">
            <!-- img  -->
            <div class="col-lg-6 d-none d-lg-block">
                <div class="login-img">
                    <object type="image/svg+xml" :data="login_svg">
                        <img :src="login_svg" class="img-fluid" alt="img">
                    </object>
                </div>
            </div>

            <!-- form  -->
            <div class="col-sm-10 col-md-8 col-lg-5 offset-lg-1">
                <div class="form-box">
                    <h3 class="m-0 mb-3">Forgot Password</h3>
                    <p class="m-0 mb-3">Fill the details asked below:</p>
                    <form action="" class="row" @submit.prevent="submitForm">
                        <!-- Email  -->
                        <div class="col-12 mb-4">
                            <div :class="{ 'form-group--error': $v.form.email.$error }">
                                <label for="exampleInputEmail1" class="form-label">Email</label>
                                <input autocomplete="off" id="exampleInputEmail1" aria-describedby="emailHelp" v-model.trim="$v.form.email.$model" type="email" class="form-control shadow-none" placeholder="Enter email-id">
                                <!-- error msg  -->
                                <div class="error" v-if="submitted && !$v.form.email.required">
                                    Email is required
                                </div>
                                <div class="error" v-if="submitted && !$v.form.email.email">
                                    This must be an email
                                </div>
                            </div>
                        </div>
                        <!-- Button  -->
                        <div class="col-12 mb-3">
                            <!-- loader  -->
                            <button v-if="loading" type="button" class="btn btn-bituix shadow-none w-100">
                                <div class="spinner-border spinner-border-sm" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                </div>
                            </button>
                            <!-- sign-btn  -->
                            <button v-else type="submit" class="btn btn-bituix shadow-none w-100">Send Email</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import ApiClass from "../../api/api";
import {
    required,
    email
} from "vuelidate/lib/validators";
export default {
    name: "Forgetpassword",
    components: {

    },
    data() {
        return {
            login_svg: require('@/assets/auth_img/login-img.svg'),
            loading: false,
            hidden: true,
            show: false,
            show_password: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" style="fill:#747474;"><path d="M14 12c-1.095 0-2-.905-2-2 0-.354.103-.683.268-.973C12.178 9.02 12.092 9 12 9a3.02 3.02 0 0 0-3 3c0 1.642 1.358 3 3 3 1.641 0 3-1.358 3-3 0-.092-.02-.178-.027-.268-.29.165-.619.268-.973.268z"></path><path d="M12 5c-7.633 0-9.927 6.617-9.948 6.684L1.946 12l.105.316C2.073 12.383 4.367 19 12 19s9.927-6.617 9.948-6.684l.106-.316-.105-.316C21.927 11.617 19.633 5 12 5zm0 12c-5.351 0-7.424-3.846-7.926-5C4.578 10.842 6.652 7 12 7c5.351 0 7.424 3.846 7.926 5-.504 1.158-2.578 5-7.926 5z"></path></svg>',
            hide_password: "<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' style='fill:#747474;'><path d='M12 19c.946 0 1.81-.103 2.598-.281l-1.757-1.757c-.273.021-.55.038-.841.038-5.351 0-7.424-3.846-7.926-5a8.642 8.642 0 0 1 1.508-2.297L4.184 8.305c-1.538 1.667-2.121 3.346-2.132 3.379a.994.994 0 0 0 0 .633C2.073 12.383 4.367 19 12 19zm0-14c-1.837 0-3.346.396-4.604.981L3.707 2.293 2.293 3.707l18 18 1.414-1.414-3.319-3.319c2.614-1.951 3.547-4.615 3.561-4.657a.994.994 0 0 0 0-.633C21.927 11.617 19.633 5 12 5zm4.972 10.558-2.28-2.28c.19-.39.308-.819.308-1.278 0-1.641-1.359-3-3-3-.459 0-.888.118-1.277.309L8.915 7.501A9.26 9.26 0 0 1 12 7c5.351 0 7.424 3.846 7.926 5-.302.692-1.166 2.342-2.954 3.558z'></path></svg>",
            submitted: false,
            form: {
                email: "",
            },
        }
    },

    mounted() {
        if (this.$route.name == "Forgetpassword") {
            this.name = "Forgot Password";
        }
    },
    validations: {
        form: {
            email: {
                required,
                email
            },
        },
    },
    methods: {
        async submitForm() {
            this.submitted = true;
            if (this.$v.form.$invalid) {
                return;
            }
            this.submitted = false;
            this.loading = true;
            var result = await ApiClass.postRequest(
                "forgotpassword",
                false,
                this.form
            );
            if (result.data.status_code == 1) {
                this.loading = false;
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
            } else {
                this.loading = false;
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "error",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
            }
        },
    },

}
</script>

<style scoped>
section.login-page {
    min-height: 95vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-block: 25px;
    background-color: var(--black);
}

section.login-page::before {
    position: absolute;
    content: '';
    top: -150px;
    right: -180px;
    background-image: url(../../assets/auth_img/upper.png);
    width: 691px;
    height: 519px;
    z-index: -1;
}

section.login-page::after {
    position: absolute;
    content: '';
    bottom: -110px;
    left: -60px;
    background-image: url(../../assets/auth_img/bottom.png);
    width: 900px;
    height: 677px;
    z-index: -1;
}


.form-box {
    z-index: -1;
    padding: 40px;
    border-radius: 25px;
    border: 0.5px solid var(--fav-color);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
}

.form-box h3 {
    font-weight: 700;
    word-spacing: 3px;
    color: var(--white);
}

.form-box h3 span {
    color: var(--fav-color);
}
.form-box p {
    color: var(--white);
}

.form-box label {
    font-weight: 600;
    color: var(--fav-color);
}

.form-box input {
    padding-block: 12px;
    border-radius: 10px;
    border-color: #b9c4cb;
    border-width: 2px;
    color: #909090;
}

.form-box a {
    color: #17394f;
    text-decoration: none;
}

.form-box a:hover {
    text-decoration: underline;
}

.btn-bituix {
    background-color: var(--fav-color) !important;
    border-radius: 10px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    padding-block: 10px;
}

.btn-bituix:hover {
    background-color: var(--fav-color) !important;
}

@media all and (min-width:320px) and (max-width:767px) {
    .form-box {
        padding: 20px;
        border-radius: 25px;
    }

}
</style>
