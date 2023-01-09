<template>
<div>
    <!-- Button trigger modal -->

    <!-- Modal -->
    <div class="modal" id="exampleModal-1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content" style="background-color: var(--bs-body-color);color: var(--white);">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Please Confirm</h5>
                    <button type="button" class="btn btn_close" data-bs-dismiss="modal" aria-label="Close" ref="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" style="fill:rgba(255,255,255,1)" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="modal-main-text">
                        <p class="pb-4 mb-0">Are you sure want to logout ?</p>

                        <div class="modal-logout">
                            <button type="button" class="btn btn-primary" id="logout-blank" @click="logout('hardlogout')" :disabled="disable">
                                <div v-if="loading" class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <span v-else>Logout from all devices</span>
                            </button>
                            <button type="button" class="btn btn-primary" @click="logout('logout')" :disabled="disable">
                                <div v-if="loading2" class="d-flex justify-content-center">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <span v-else>Logout from this device</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ApiClass from "../../api/api";

export default {
    name: "Modal",
    data() {
        return {
            loading: false,
            loading2: false,
            disable: false,
        };
    },
    methods: {
        async logout(url) {
            url == "logout" ? (this.loading2 = true) : (this.loading = true);
            this.disable = true;
            var res = await ApiClass.deleteRequest(url, true);
            if (res.data.status_code == 1) {
                this.$store.commit("RESET");
                localStorage.clear();
                this.$refs.Close.click();

                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: res.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
                console.log("logout");
                // this.$router.go();

                location.replace("/exchange/BTCUSDT");
                // this.$forceUpdate();
                // location.reload();
                //  this.$router.push("/exchange/BTCUSDT")

                this;
            } else {
                this.disable = this.loading2 = this.loading = false;
                this.$refs.Close.click();
            }
        },
    },
};
</script>

<style scoped>
.btn-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' style='fill: %23FFF%3Btransform: %3BmsFilter:%3B'%3E%3Cpath d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'%3E%3C/path%3E%3C/svg%3E");
}

.modal-body {
    padding: 2rem;
}

.modal {
    background-color: var(--border-color)
}

.modal-content {
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border: none;
    border-radius: 3px;
}
.modal-header 
{
    border-bottom: unset;
}
.modal-header h5 {
    font-family: "Poppins";
    font-size: 19px;
    font-weight: 500;
    text-transform: capitalize;
    color: var(--white);
    margin-bottom: 0;
}

.modal-main-text {
    text-align: center;
}

.modal-main-text p {
    text-align: center;
    font-family: "Poppins";
    font-size: 16px;
    color: var(--white);
}

.modal-logout {
    display: flex;
    align-items: center;
    justify-content: center;
}

button#logout-blank {
    color: rgb(244, 67, 54);
    background: transparent;
    border-color: rgb(244, 67, 54);
    margin-right: 10px;
}

.modal-logout button.btn.btn-primary {
    height: 50px;
    padding: 0px 14px;
    font-size: 14px;
    border-radius: 4px;
    position: relative;
    box-shadow: none;
    cursor: pointer;
    outline: 0px;
    user-select: none;
    width: 100%;
    background: rgb(244, 67, 54);
    color: #fff;
    border: 1px solid rgb(244, 67, 54);
    margin: 0 auto;
    max-width: 250px;
}

button.btn-close:focus {
    box-shadow: none;
    outline: none;
}
.modal-main-text p{
    font-weight: 600;
    font-size: 24px;
}


@media all and (min-width: 320px) and (max-width: 767px) {
    .modal-logout {
        display: block;
    }

    button#logout-blank {
        margin-bottom: 10px;
    }
}
</style>
