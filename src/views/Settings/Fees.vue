<template>
  <SettingsLayout>
    <div class="row">
      <div class="col-md-12">
        <div class="exchange_setting_heading">
          <h3 class="fw-bold">Fees Detail</h3>
        </div>
      </div>
    </div>
    <!-- Heading  -->
    <div class="row mt-2">
      <div class="col-md-12">
        <div class="fee_setting_box">
          <ul class="list-group">
            <li class="list-group-item row" style="background-color:var(--nav-active);color:var(--white)">
              <div
                class="
                  p-0
                  form-check form-switch
                  d-flex
                  justify-content-between
                "
              >
                <label
                  class="form-check-label fw-600 col-md-12"
                  for="flexSwitchCheckChecked"
                  >Pay trading fees with {{ token_name }}</label
                >
                <input
                  v-model="checked"
                  class="form-check-input switch_cursor col-md-12"
                  type="checkbox"
                  id="flexSwitchCheckChecked"
                  v-on:change="change_dt"
                />
              </div>
              <p class="m-0 p-0">
                Enable this option to pay trading fees with:
              </p>
              <ul class="list-group">
                <li class="list-group-item border-0 p-0" style="background-color:var(--nav-active);color:var(--white)">
                  1. {{ token_name }} you buy from the exchange.
                </li>
                <li class="list-group-item border-0 p-0" style="background-color:var(--nav-active);color:var(--white)">
                  2. Unlocked {{ token_name }} balance reserved for trading
                  fees.
                </li>
              </ul>
              <p class="m-0 pt-2 px-0">
                <span class="fw-600">Note:</span> You'll get 50% discount if you
                pay fees via {{ token_name }}.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- Content  -->
  </SettingsLayout>
</template>

<script>
import ApiClass from "@/api/api";
import SettingsLayout from "@/layouts/SettingsLayout.vue";
import Brand from "@/assets/brand/name.json";

export default {
  name: "Fees",
  components: {
    SettingsLayout,
  },
  data() {
    return {
      checked: false,
      fee_by_lbm: null,
      user: null,
      token_name: Brand.token_name,
    };
  },
  mounted() {
    var userdata = localStorage.getItem("user");
    this.user = JSON.parse(userdata);
    if (this.user.fee_by_lbm) {
      this.checked = true;
    }
  },
  methods: {
    async change_dt() {
      this.fee_by_lbm = this.checked ? 1 : 0;

      await ApiClass.postRequest("fee_by_lbm/update", true, {
        fee_by_lbm: this.fee_by_lbm,
      }).then((res) => {
        if (res.data.status_code == "1") {
          this.$swal({
            toast: true,
            position: "top-end",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 3000,
          });
          this.user.fee_by_lbm = this.fee_by_lbm;
          localStorage.setItem("user", JSON.stringify(this.user));
        }
      });
    },
  },
};
</script>


<style scoped>

.exchange_setting_heading{
  color: var(--white);
}
.fw-600 {
  font-weight: 600;
  color: var(--white);
}

.form-switch .form-check-input {
  width: 3.25em;
}

.form-check-input {
  height: 1.5em;
  border: 2px solid rgb(42, 42, 42);
}

.form-check-input:focus {
  box-shadow: none;
}

.form-check-input:checked {
  background-color: #0e0e0e;
  border-color: #000000;
}

.form-switch .form-check-input:focus {
  background-image: url(../../assets/circle.png) !important;
}
input.switch_cursor {
  cursor: pointer;
}

@media all and (max-width: 991px) {
  .form-switch .form-check-input {
    width: 2.75em;
  }

  .form-check-input {
    height: 1.05em;
    border: 2px solid rgb(42, 42, 42);
  }
}
</style>