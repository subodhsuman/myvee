<template>
  <div>
    <section class="restpass-sec" style="height: 95vh;">
      <div class="container">
        <div class="row">

           <!-- Reset Password Error -->
           <div class="col-xl-5 col-lg-7 col-md-7 mx-auto" v-if="isError">
            <div class="reset-link-main">
                <p class="mb-3">Link is either incorrect or expired.Try again!</p>
                <button type="button" class="btn btn-primary try-btn">Try Again</button>
            </div><!--reset-link-main-->
        </div>

        <!-- Reset Password Form -->
          <div class="col-xl-6 col-lg-6 col-md-12 mx-auto" v-else>

            <div class="resetpass-box">
              <h6>Reset Password</h6>
              <div class="reset-form">
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="inputPassword4" class="form-label"
                      >Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Password"
                      aria-label="Password"
                    />
                  </div>
                  <div class="col-12 mb-4">
                    <label for="inputPassword4" class="form-label"
                      >Confirm Password</label
                    >
                    <input
                      type="password"
                      class="form-control"
                      placeholder="Confirm Password"
                      aria-label="Confirm Password"
                    />
                  </div>

                  <div class="col-12 d-grid">
                    <button type="submit" class="btn btn-primary reset-btn">
                      RESET
                    </button>
                  </div>
                </div>
              </div>
              <!--reset-form-->
            </div>

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
export default {
  name: "ResetPass",
  data() {
    return {
      isError: false
    }
  },
};
</script>



<style scoped>
section.restpass-sec {
  padding: 80px 0;
  background-color: #111111;
}

.resetpass-box {
  background-color: #fff;
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
}

button.btn.btn-primary.reset-btn:focus {
  box-shadow: none;
}

.reset-link-main {
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    padding: 20px 20px;
    text-align: center;
}

.reset-link-main p {
    font-size: 16px;
    font-family: 'Poppins';
    font-weight: 400;
    color: #000;
    margin: 0;
}

button.btn.btn-primary.try-btn:focus {
    box-shadow: none;
}
</style>