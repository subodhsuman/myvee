<template>
  <div>
    <section class="query_form">
      <div class="container">
        <Heading title="Request Token" />
        <div class="row justify-content-center">
          <div class="col-xl-7 col-lg-12 col-md-12 mx-auto">
            <div class="show-list-button">
              <router-link to="/request/token_table"><button class="btn btn-primary">
                  Show Token List
                </button></router-link>
            </div>
          </div>
          <!--col-xl-12 col-lg-12 col-md-12-->
          <div class="col-xl-7 col-lg-12 col-md-12 mx-auto">
            <div class="form-box">
              <form class="form" @submit.prevent="submit">
                <div class="row form-row">
                  <div class="col-md-12 mb-3">
                    <label class="form-label">Name<span class="red">*</span></label>
                    <input type="text" class="form-control" placeholder="Enter Name"
                      v-model.trim="$v.form.name.$model" />
                    <div class="error" v-if="submitted && !$v.form.name.required">
                      Name is required
                    </div>
                  </div>
                  <!--Name-->

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Email<span class="red">*</span></label>
                    <input type="text" class="form-control" placeholder="Enter Email"
                      v-model.trim="$v.form.email.$model" />
                    <div class="error" v-if="submitted && !$v.form.email.required">
                      Email is required
                    </div>
                    <div class="error" v-if="submitted && !$v.form.email.email">
                      This must be an email
                    </div>
                  </div>
                  <!-- Email  -->

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Number</label>
                    <input type="text" class="form-control shadow-none" id="validationCustom03"
                      v-model.trim="$v.form.mobile.$model" placeholder="Enter Mobile Number"
                      onkeypress="return (event.charCode !=8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57))"
                      onpaste="return false;" />
                    <!-- <div
                      class="error"
                      v-if="submitted && !$v.form.mobile.required"
                    >
                      Mobile Number is required
                    </div> -->
                    <div class="error" v-if="submitted && !$v.form.mobile.maxLength">
                      Mobile Number must be at least 10 digits.
                    </div>
                    <div class="error" v-if="submitted && !$v.form.mobile.minLength">
                      Mobile Number must be at least 10 digits.
                    </div>
                  </div>
                  <!--Mobile-->

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Decimal <span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Decimal"
                      v-model.trim="$v.form.decimal.$model"
                      onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57 && event.charCode != 46)))" />
                    <div class="error" v-if="submitted && !$v.form.decimal.required">
                      Decimal Number is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Logo<span class="red">* (84*84) </span></label>
                    <input type="file" class="form-control" id="text" accept="image/*"
                      @change="choseImage($event, 'logo_image')" />
                    <div v-if="submitted && this.logo_image == null" class="error">
                      Image is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Token Address<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Token Address"
                      v-model.trim="$v.form.token_address.$model" />
                    <div class="error" v-if="submitted && !$v.form.token_address.required">
                      Token Address is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Blockchain<span class="red">*</span></label>

                    <multiselect placeholder="Blockchain" v-model.trim="$v.form.blockchain.$model"
                      :options="Blockchainoptions" multiple>
                    </multiselect>

                    <div class="error" v-if="submitted && !$v.form.blockchain.required">
                      Blockchain is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Token Symbol<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Token Symbol"
                      v-model.trim="$v.form.token_name.$model" />
                    <div class="error" v-if="submitted && !$v.form.token_name.required">
                      Token Name is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Token Pairs<span class="red">*</span></label>

                    <multiselect placeholder="Token Pairs" v-model.trim="$v.form.pair_with.$model" :options="options"
                      multiple>
                    </multiselect>

                    <div class="error" v-if="submitted && !$v.form.pair_with.required">
                      Token Pairs is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">Token Total supply<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Token Total supply"
                      v-model.trim="$v.form.total_token_supply.$model"
                      onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57 && event.charCode != 46)))" />
                    <div class="error" v-if="submitted && !$v.form.total_token_supply.required">
                      Token Total supply is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">
                      Supply in Circulation<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Supply in Circulation"
                      v-model.trim="$v.form.circulation.$model"
                      onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57 && event.charCode != 46)))" />
                    <div class="error" v-if="submitted && !$v.form.circulation.required">
                      Supply in Circulation is required
                    </div>
                  </div>


                  <div class="col-md-12 mb-3">
                    <label class="form-label">
                      Whitepaper Link<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Whitepaper Link"
                      v-model.trim="$v.form.whitepaper_link.$model" />
                    <div class="error" v-if="submitted && !$v.form.whitepaper_link.required">
                      Whitepaper Link is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">
                      Official Website<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Official Website"
                      v-model.trim="$v.form.official_website.$model" />
                    <div class="error" v-if="submitted && !$v.form.official_website.required">
                      Official Website is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">
                      Official Telegram<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Official Telegram"
                      v-model.trim="$v.form.official_telegram.$model" />
                    <div class="error" v-if="submitted && !$v.form.official_telegram.required">
                      Token Address is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label">
                      Telegram for Chat<span class="red">*</span></label>
                    <input type="text" class="form-control shadow-none" placeholder="Telegram for Chat"
                      v-model.trim="$v.form.telegram_for_chat.$model" />
                    <div class="error" v-if="submitted && !$v.form.telegram_for_chat.required">
                      Telegram for Chat is required
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label"> Instagram</label>
                    <input type="text" class="form-control shadow-none" placeholder="Instagram"
                      v-model.trim="$v.form.instagram.$model" />
                    <!-- <div
                      class="error"
                      v-if="submitted && !$v.form.instagram.required"
                    >
                      Instagram is required
                    </div> -->
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label"> Youtube</label>
                    <input type="text" class="form-control shadow-none" placeholder="Youtube"
                      v-model.trim="$v.form.youtube.$model" />
                    <!-- <div
                      class="error"
                      v-if="submitted && !$v.form.youtube.required"
                    >
                      Youtube is required
                    </div> -->
                  </div>

                  <div class="col-md-12 mb-3">
                    <label class="form-label"> Facebook</label>
                    <input type="text" class="form-control shadow-none" placeholder="Facebook"
                      v-model.trim="$v.form.facebook.$model" />
                    <!-- <div
                      class="error"
                      v-if="submitted && !$v.form.facebook.required"
                    >
                      Facebook is required
                    </div> -->
                  </div>

                  <div class="col-md-12 mb-3">
                    <div class="form-check">
                      <input class="form-check-input shadow-none" type="checkbox" v-model.trim="$v.form.terms.$model" />
                      <router-link to="/legal/terms_of_use" class="form-check-label fw-normal">
                        I agree to terms and conditions.
                      </router-link>
                    </div>
                    <!-- <div
                      class="error"
                      v-if="submitted && !$v.form.terms.required"
                    >
                      Terms and conditions are required.
                    </div> -->
                    <div class="error" v-if="submitted && !$v.form.terms.sameAs">
                      Terms and conditions are required.
                    </div>
                  </div>
                  <div class="col-md-12 mt-3 text-center">
                    <button type="submit" id="submit-btn" class="btn btn-outline-dark">
                      Submit
                    </button>
                  </div>
                  <!-- Query  -->
                </div>
                <!--row form-row-->
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>


<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<script>
import ApiClass from "@/api/api";
import Heading from "@/components/Home_New/Heading.vue";
import {
  required,
  email,
  maxLength,
  minLength,
  sameAs,
} from "vuelidate/lib/validators";
import Multiselect from "vue-multiselect";

export default {
  name: "ReqToken",
  components: {
    Heading,
    Multiselect,
  },
  mounted() {
    localStorage.getItem('token') ? '' : this.router.push('/login');
  },
  setup() { },
  data: () => ({
    ticketlist: [],
    logo_image: null,
    options: ["USDT", "BTC", "TRX", "ETH"],
    Blockchainoptions: ["ETH", "TRX", "BSC"],
    form: {
      name: "",
      email: "",
      mobile: "",
      decimal: "",
      token_address: "",
      blockchain: "",
      token_name: "",
      pair_with: "",
      total_token_supply: "",
      circulation: "",
      whitepaper_link: "",
      official_website: "",
      official_telegram: "",
      telegram_for_chat: "",
      instagram: "",
      youtube: "",
      facebook: "",
      terms: "",
    },
    submitted: false,
  }),
  validations() {
    return {
      form: {
        name: {
          required,
        },
        email: {
          required,
          email,
        },
        mobile: {
          // required,
          maxLength: maxLength(10),
          minLength: minLength(10),
        },
        decimal: {
          required,
        },
        token_address: {
          required,
        },
        blockchain: {
          required,
        },
        token_name: {
          required,
        },
        pair_with: {
          required,
        },
        total_token_supply: {
          required,
        },
        circulation: {
          required,
        },
        whitepaper_link: {
          required,
        },
        official_website: {
          required,
        },
        official_telegram: {
          required,
        },
        telegram_for_chat: {
          required,
        },
        instagram: {
          // required,
        },
        youtube: {
          // required,
        },
        facebook: {
          // required,
        },
        terms: {
          sameAs: sameAs(() => true),
        },
      },
    };
  },

  methods: {
    show() {
      alert(this.form.terms);
    },
    choseImage(event) {
      console.log("image event=", event);
      this.logo_image = event.target.files[0];
    },
    async submit() {
      this.submitted = true;
      if (this.$v.form.$invalid) {
        return;
      }
      //   console.log(this.form);

      if (this.logo_image != null) {
        var all_data = new FormData();

        this.form.pair_with.map((el, i) => {
          all_data.append("pair_with[" + i + "]", el);
        });

        this.form.blockchain.map((el, i) => {
          all_data.append("blockchain[" + i + "]", el);
        });

        all_data.append("name", this.form.name);
        all_data.append("email", this.form.email);
        all_data.append("mobile", this.form.mobile);
        all_data.append("decimal", this.form.decimal);
        all_data.append("token_address", this.form.token_address);
        all_data.append("token_name", this.form.token_name);
        all_data.append("token_supply", this.form.total_token_supply);
        all_data.append("circulation_supply", this.form.circulation);
        all_data.append("whitepaper_link", this.form.whitepaper_link);
        all_data.append("official_website", this.form.official_website);
        all_data.append("official_telegram", this.form.official_telegram);
        all_data.append("telegram_for_chat", this.form.telegram_for_chat);
        all_data.append("instagram", this.form.instagram);
        all_data.append("youtube", this.form.youtube);
        all_data.append("facebook", this.form.facebook);
        all_data.append("image", this.logo_image);

        // console.log({all_data});
        var headers = {
          "Content-Type": "multipart/form-data",
        };

        await ApiClass.postRequest(
          "request/create",
          true,
          all_data,
          headers
        ).then((response) => {
          //   console.log("fgdfgdfg=", response);
          if (response.data.status_code == 1) {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
            this.form = [];
            this.submitted = false;
            return this.$router.push("/request/token_table");
          } else {
            this.$swal({
              toast: true,
              position: "top-end",
              icon: "error",
              title: response.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
            this.submitted = false;
          }
        });
      }
    },
  },
};
</script>

<style scoped>
section.query_form {
  padding: 80px 0;
}

.form-box {
  background-color: var(--black);
  box-shadow: var(--box-shadow);
  padding: 25px 25px;
  border-radius: 10px;
}

label.form-label {
  font-weight: 600;
  font-size: 14px;
  margin-left: 6px;
  color: #fff ;
}

.form-box .form-control {
  min-height: 53px;
  border-radius: 10px;
  border-color: #b9c4cb;
  border-width: 2px;
  color: #909090;
  background-color: #fff;
}

.form-box .form-control:focus {
  box-shadow: none;
}

input[type="file"]::file-selector-button {
  padding: 12px;
  border-radius: 0.2em;
  transition: 1s;
  background: transparent;
  border: none;
}

input[type="file"]::file-selector-button:hover {
  background: transparent;
}

#text {
  min-height: 53px;
}

#submit-btn {
  background-color: #e5a65c;
  border-radius: 4px;
  color: var(--white);
  font-weight: 500;
  font-size: 18px;
  border-color: #e5a65c;
  min-width: 250px;
  min-height: 50px;
}

#submit-btn:focus {
  box-shadow: none;
}

.show-list-button {
  text-align: end;
  margin-bottom: 12px;
}

.show-list-button .btn-primary {
  background-color: var(--dark-bg);
  border-radius: 4px;
  color: var(--white);
  font-weight: 500;
  font-size: 16px;
  border-color: var(--dark-bg);
}

.show-list-button .btn-primary:focus {
  box-shadow: none;
}

span.red {
  color: var(--red);
  font-weight: bold;
}
</style>
