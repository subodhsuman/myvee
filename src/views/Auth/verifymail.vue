<template>
  <div>
    <section class="restpass-sec" style="height: 95vh;">
      <div class="container">
        <div class="row">

           <!-- Reset Password Error -->
           <div class="col-xl-5 col-lg-7 col-md-7 mx-auto" v-if="valid == 0">
                <div class="reset-link-main">
                    <div class="d-flex justify-content-center"> 
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <br>
                    <p class="mb-3">Verifying your Link!</p>
                </div><!--reset-link-main-->
            </div>

           <div class="col-xl-5 col-lg-7 col-md-7 mx-auto" v-if="valid == 1">
                <div class="reset-link-main">
                    <div v-if="loading" class="d-flex justify-content-center"> 
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <p class="mb-3">Link is either incorrect or expired.Try again!</p>
                    <router-link to="/signup"><button type="button" class="btn btn-primary try-btn">Try Again</button></router-link>
                </div><!--reset-link-main-->
            </div>

            <div class="col-xl-5 col-lg-7 col-md-7 mx-auto" v-if="valid == 2">
                <div class="reset-link-main">
                    <div class="d-flex justify-content-center"> 
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                    <p class="mb-3">Congratulation!! Email has been verified.</p>
                    <p class="mb-3">redirecting to dashboard.</p>
                </div><!--reset-link-main-->
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

export default {
    name: "VerifyMail",
    data() {
        return {
            valid:0,
            loading:true,
        }
    },
    mounted(){
         this.verifyRegistration();
    },
    methods:{
        async verifyRegistration(){
            this.loading = false;
            var result = await ApiClass.postRequest("register/verify", false, {'token':this.$route.query.token});   
            if (result.data.status_code == 1) {
                this.valid = 2;
                localStorage.setItem("token", result.data.data.token)
                this.$store.commit("SET_USER",result.data.data.user);
                 localStorage.setItem("user", JSON.stringify(result.data.data.user));
                await new Promise(resolve => setTimeout(resolve, 1000));
                this.$router.push({ path: 'exchange/BTCUSDT'});
            }else{
                this.valid = 1;
            }
        }
    }
};
</script>



<style scoped>
section.restpass-sec {
  padding: 80px 0;
  background-color: #111111;
}

.resetpass-box {
  background-color: #111111;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  padding: 20px 20px;
}

.resetpass-box h6 {
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 0;
  padding-bottom: 35px;
  text-align: center;
  color: #000;
}

.reset-form label.form-label {
  font-size: 13px;
  font-weight: 500;
  color: #000;
  text-transform: capitalize;
}
.reset-form .form-control {
  min-height: 50px;
  border: 1px solid #ccc;
  font-size: 14px;
  font-weight: 500;
  color: #000;
}

.reset-form .form-control:focus {
  box-shadow: none;
  border-color: #ccc;
}

button.btn.btn-primary.reset-btn {
 
  min-height: 45px;
  font-size: 18px;
  font-weight: 500;
  background-color: #000;
}

button.btn.btn-primary.reset-btn:focus {
  box-shadow: none;
}

.reset-link-main {
    background-color: var(--nav-active);
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    padding: 20px 20px;
    text-align: center;
}

.reset-link-main p {
    font-size: 16px;
    font-family: 'Poppins';
    font-weight: 400;
    color: var(--white);
    margin: 0;
}
.top-50 {
  top: 32% !important;
}
.start-100 {
  left: 92% !important;
}

.try-btn{
    background-color: var(--fav-color);
    border: none;
}
button.btn.btn-primary.try-btn:focus {
    box-shadow: none;
    background-color: #000;
}
</style>