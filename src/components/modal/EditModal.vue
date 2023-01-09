<template>
  <div>
    <!-- Modal -->
    <div
      class="modal"
      id="editmodal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Order</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="order-cancelmain mb-4">
              <p>Are you sure want to cancel or modify your order</p>
            </div>
            <!--order-cancelmain-->

            <div class="cancel-btn-box">
              <div class="row">
                <div class="col">
                  <button
                    type="button"
                    @click="cancelOrder(orderDetail)"
                    class="btn btn-primary"
                    id="cancel-btn"
                  >
                    edit and cancel
                  </button>
                </div>
                <div class="col">
                  <button
                    type="button"
                    @click="theModal.hide()"
                    class="btn btn-primary"
                    id="cancel-btn"
                  >
                    cancel
                  </button>
                </div>
              </div>
            </div>
            <!--cancel-btn-box-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { Modal } from "bootstrap";
import ApiClass from "../../api/api";
export default {
  name: "EditModal",
  props: ["orderDetail"],
  data() {
    return {
      theModal: null,
    };
  },
  mounted() {
    this.theModal = new Modal(document.getElementById("editmodal"));
  },
  methods: {
    async cancelOrder(order) {
      // this.$store.commit("setEditOrderInfo",JSON.stringify(result.data.data.user));
      this.theModal.hide();
      var url = "orders/cancel-order/" + order.id;
      let response = await ApiClass.postNodeRequest(url, true);

      if (response.data.status_code == 1) {
        this.$swal({
          toast: true,
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 3000,
        });

        this.$store.commit("setEditOrderInfo", JSON.stringify(order));
        return;
      }
      this.$swal({
        toast: true,
        position: "top-end",
        icon: "error",
        title: response.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
    },
  },
};
</script>


<style scoped>
.modal {
  background-color: #edf0f2bf;
}
.modal-content {
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  border: none;
  border-radius: 3px;
}
.modal-header h5 {
  font-family: "Poppins";
  text-transform: capitalize;
  font-size: 16px;
  margin-bottom: 0;
  line-height: normal;
  font-weight: 500;
  color: #000;
}

.modal-header .btn-close:focus {
  box-shadow: none;
}

.order-cancelmain p {
  font-weight: 500;
  text-align: center;
  font-family: "Poppins";
  font-size: 16px;
  color: rgb(72, 81, 86);
}

.cancel-btn-box {
  text-align: center;
}

.cancel-btn-box .btn.btn-primary {
  height: 50px;
  padding: 0px 14px;
  font-size: 16px;
  border-radius: 4px;
  position: relative;
  box-shadow: none;
  cursor: pointer;
  outline: 0px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background: rgb(244, 67, 54);
  color: #fff;
  border: 1px solid rgb(244, 67, 54);
  margin: 0 auto;
  width: 100%;
  max-width: 250px;
  text-transform: uppercase;
  transition: all 0.5s ease;
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .order-cancelmain p {
    font-size: 13px;
  }
}
</style>