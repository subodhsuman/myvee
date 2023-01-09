<template>
<div>
    <section class="restpass-sec form-box" style="height: 95vh">
        <div class="container">
            <div class="row">
                <!-- Reset Password Error -->
                <div class="col-xl-5 col-lg-7 col-md-7 mx-auto" v-if="isError">
                    <div class="reset-link-main">
                        <p class="mb-3">Link is either incorrect or expired.Try again!</p>
                        <router-link to="/forgetpassword"><button type="button" class="btn btn-primary try-btn">
                                Try Again
                            </button></router-link>
                    </div>
                    <!--reset-link-main-->
                </div>

                <!-- Reset Password Form -->
                <div class="col-xl-5 col-lg-6 col-md-8 mx-auto" v-if="show">
                    <form @submit.prevent="submitForm">
                        <div class="resetpass-box">
                            <h3 class="m-0 mb-3">Reset Password</h3>
                            <div class="reset-form">
                                <div class="row">
                                    <div class="col-12 mb-3">
                                        <div class="input-group" :class="{
                          'form-group--error': $v.form.password.$error,
                        }">
                                            <input :type="type" class="form-control" placeholder="New Password" aria-label="New Password" v-model.trim="$v.form.password.$model" />
                                            <span class="input-group-text" id="basic-addon1">
                                                <i v-if="type == 'password'" class="fas fa-eye-slash" @click="type = 'text'"></i>
                                                <i v-else class="fas fa-eye" @click="type = 'password'"></i></span>
                                        </div>
                                        <div class="error" v-if="submitted && !$v.form.password.required">
                                            Password is required
                                        </div>
                                        <div class="error" v-if="submitted && !$v.form.password.minLength">
                                            Minimum length must be 8 character.
                                        </div>
                                        <div class="error" v-if="submitted && !$v.form.password.maxLength">
                                            Maximum length should be less than 18 character.
                                        </div>
                                    </div>

                                    <div class="col-12 mb-4">
                                        <div class="input-group" :class="{
                          'form-group--error': $v.form.confirm_password.$error,
                        }">
                                            <input :type="type2" class="form-control" placeholder="Confirm Password" aria-label="Confirm Password" v-model.trim="$v.form.confirm_password.$model" />
                                            <span class="input-group-text" id="basic-addon1">
                                                <i v-if="type2 == 'password'" class="fas fa-eye-slash" @click="type2 = 'text'"></i>
                                                <i v-else class="fas fa-eye" @click="type2 = 'password'"></i></span>
                                        </div>

                                        <div class="error" v-if="submitted && !$v.form.confirm_password.required">
                                            Confirm Password is required
                                        </div>
                                        <div class="error" v-if="
                          submitted && !$v.form.confirm_password.sameAsPassword
                        ">
                                            Password and Confirm Password is not match.
                                        </div>
                                    </div>

                                    <div class="col-12">
                                        <button v-if="loading" type="submit" class="btn btn-bitqix shadow-none w-100">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </button>

                                        <button v-else type="submit" class="btn btn-bitqix shadow-none w-100">
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!--reset-form-->
                        </div>
                    </form>
                    <!--resetpass-box-->
                </div>
            </div>
            <!--row-->
        </div>
        <!--container-->
    </section>
    <!--restpass-sec-->
</div>
</template>

<script>
import ApiClass from "../../api/api";
import {
    required,
    sameAs
} from "vuelidate/lib/validators";

export default {
    name: "ResetPassword",
    data() {
        return {
            type: "password",
            type2: "password",
            isError: false,
            show: false,
            submitted: false,
            loading: false,
            form: {
                password: "",
                confirm_password: "",
            },
        };
    },
    validations: {
        form: {
            password: {
                required,
                valid: function (value) {
                    const containsUppercase = /[A-Z]/.test(value);
                    const containsLowercase = /[a-z]/.test(value);
                    const containsSpecial = /[#?!@$%^&*-]/.test(value);
                    return containsUppercase && containsLowercase && containsSpecial;
                },
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs("password")
            },
        },
    },
    created() {
        this.validToken();
    },
    methods: {
        async validToken() {
            var result = await ApiClass.postRequest("password/valid", false, {
                token: this.$route.query.token,
            });
            if (result.data.status_code == 0) {
                this.isError = true;
            } else {
                this.show = true;
            }
        },
        async submitForm() {
            this.submitted = true;
            if (this.$v.form.$invalid) {
                return;
            }
            this.submitted = false;
            this.loading = true;
            this.form.token = this.$route.query.token ?? "";
            var result = await ApiClass.postRequest(
                "password/reset",
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
                /* Redirect To Verify Email */
                return this.$router.push({
                    name: "Login",
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
};
</script>

<style scoped>
section.restpass-sec {
    padding: 80px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #111111;
}

.resetpass-box {
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    padding: 20px 20px;
    border-radius: 20px;
}


.reset-form .form-control {
    min-height: 50px;
    border: 1px solid #ccc;
    font-size: 14px;
    font-weight: 500;
    color: #000;
    border-right: none;
}

.reset-form .form-control:focus {
    box-shadow: none;
    border-color: #ccc;
}


.reset-link-main {
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    padding: 20px 20px;
    text-align: center;
}

.reset-link-main p {
    font-size: 16px;
    font-family: "Poppins";
    font-weight: 400;
    color: #000;
    margin: 0;
}

.input-group .input-group-text {
    background-color: transparent;
    border-left: 0;
    border-color: #b9c4cb;
    border-width: 2px;
    border-radius: 0 10px 10px 0;
}

.form-box h3 {
    font-weight: 700;
    word-spacing: 3px;
}


.form-box label {
    font-weight: 600;
}

.form-box .form-control {
    padding-block: 12px;
    border-radius: 10px;
    border-color: #b9c4cb;
    border-width: 2px;
    color: #909090;
}

.btn-bitqix {
    background-color: #e5a65c !important;
    border-radius: 10px;
    color: #fff;
    font-weight: 500;
    font-size: 18px;
    padding-block: 10px;
}

.btn-bitqix:hover {
    background-color: #ebb474 !important;
}
</style>
