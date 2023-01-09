<template>
<div>
    <section class="exchange-portfolio-sec">
        <div class="container">
            <div class="row portfolio-upper-row mb-0">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="portfolio-currency-heading">
                            <h2>{{ total_currency_get }} USDT</h2>
                            <h5 class="mb-0">{{total_freezed}} Freezed Balance</h5>
                        </div>
                        <div class="text-end d-block d-md-flex align-items-center gap-2 component-add mb-1" style="color: var(--social-link)">
                            <router-link to="withdrawHistory" class="links_history">Withdraw History
                            </router-link> <span class="d-none d-md-block">|</span>
                            <router-link class="links_history" to="depositHistory">
                                Deposit History </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row portfolio-bottom-row">
                <div class="col-xl-12 col-lg-12 col-md-12">
                    <div class="portfolio-currency-main-box">
                        <div class="table-search-box">
                            <div class="row table-inner-row align-items-center">
                                <div class="col-xl-9 col-lg-9 col-md-7">
                                    <div class="input-group">
                                        <span class="input-group-text" id="basic-addon1">
                                            <em class="fas fa-search"></em>
                                        </span>
                                        <input type="text" class="form-control" placeholder="Search All Assets" style="background-color: var(--bs-body-color);color: var(--white)" aria-label="Search All Assets" aria-describedby="basic-addon1" id="flexTextCheckDefault" v-on:keyup="searchData()" />
                                    </div>
                                </div>
                                <!--col-xl-9 col-lg-9 col-md-9-->
                                <div class="col-xl-3 col-lg-3 col-md-5">
                                    <div class="balance-check-box">
                                        <div class="form-check form-switch">
                                            <input class="form-check-input" type="checkbox" role="switch" checked id="flexSwitchCheckDefault" v-on:change="searchZeroData()" />
                                            <label class="form-check-label" for="flexSwitchCheckDefault">Show Empty Balances</label>
                                        </div>
                                    </div>
                                    <!--balance-check-box-->
                                </div>
                                <!--col-xl-3 col-lg-3 col-md-3-->
                            </div>
                            <!--row table-inner-row-->
                        </div>
                        <!--table-serch-box-->
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Assets</th>
                                        <th id="balance-main">Balance</th>
                                        <th class="price-hours">Lock Quantity</th>
                                        <th class="portfolio-head">Portfolio %</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="loader-box" v-if="loading">
                                        <div id="table-loader" class="d-flex justify-content-center text-light">
                                            <div class="spinner-border" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    </tr>
                                    <!-- Base Currency -->
                                    <!--data-->
                                    <tr v-else-if="other_currency.length == 0 && !loading" class="text-center">
                                        <td colspan="5" style="color:var(--input-border)">
                                            No Data Found
                                        </td>
                                    </tr>
                                    <tr v-else v-for="base in base_currency" :key="base.currency">
                                        <td>
                                            <div class="portfolio-main-info currency-name">
                                                <img loading="lazy" :src="base.image" class="img-fluid" alt />

                                                <h6>
                                                    {{ base.name }}

                                                    <span>{{ base.symbol }}</span>
                                                </h6>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                        <td id="balance-main">
                                            <div class="portfolio-main-info currency-balance">
                                                <h6>
                                                    {{ base.quantity }}
                                                    <span>${{ base.c_bal }}</span>
                                                </h6>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                        <td class="price-hours-box">
                                            <div class="portfolio-main-info high-price">
                                                <h6> {{ base.freezed_balance }}</h6>
                                            </div>
                                        </td>
                                        <td class="portfolio-head-box">
                                            <div class="portfolio-main-info portfolio-percantage">
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" :style="'width: ' + base.portfolio_share + '%'" :aria-valuenow="base.portfolio_share" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h6>
                                                    <span>{{ base.portfolio_share }}%</span>
                                                </h6>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                        <td class="action-width-box">
                                            <div class="portfolio-main-info actions-btn">
                                                <ul class="actions-btn-list">
                                                    <li>
                                                        <button type="button" class="btn btn-primary color-red" data-bs-toggle="modal" :data-bs-target="'#exampleModal1_' + base.currency">
                                                            Withdraw
                                                        </button>

                                                        <!-- Button trigger modal -->
                                                        <!-- Modal -->
                                                        <div class="modal fade" :id="'exampleModal1_' + base.currency" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">
                                                                            Withdraw {{ base.currency }}
                                                                        </h5>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div v-if="base.withdraw">
                                                                            <div class="withdraw-main-box">
                                                                                <div class="destination-box mb-4">
                                                                                    <h5>destination</h5>

                                                                                    <div class="form-main-box">
                                                                                        <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Wallet Address" />
                                                                                    </div>

                                                                                    <span class="short-head" style="color: var(--green)">
                                                                                        Valid
                                                                                        {{ base.currency }} Address
                                                                                    </span>
                                                                                </div>
                                                                                <!--destination-box-->

                                                                                <div class="destination-box amount-box">
                                                                                    <h5>amount</h5>

                                                                                    <div class="form-main-box">
                                                                                        <input type="text" onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == -1)))" onpaste="return false;" class="form-control" id="formGroupExampleInput" placeholder="Amount" />
                                                                                    </div>

                                                                                    <span class="short-head" style="color: rgb(147 147 147)">$9,640,721.38
                                                                                        USD</span>
                                                                                </div>
                                                                                <!--destination-box-->
                                                                            </div>
                                                                            <!--withdraw-main-box-->

                                                                            <div class="withdraw-btn-box">
                                                                                <button type="button" class="btn btn-success main-btn">
                                                                                    Proceed Withdraw
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                        <div class="height-box text-center" v-else>
                                                                            <span class="warn-error">
                                                                                {{ base.currency }} deposits and
                                                                                withdrawals not enabled.
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <button type="button" class="btn btn-primary color-green" data-bs-toggle="modal" :data-bs-target="'#exampleModaldeposite1_' + base.currency
                                ">
                                                            deposit
                                                        </button>

                                                        <!-- Button trigger modal -->

                                                        <!-- Modal -->
                                                        <div class="modal fade" :id="'exampleModaldeposite1_' + base.currency" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                            <div class="modal-dialog modal-dialog-centered">
                                                                <div class="modal-content">
                                                                    <div class="modal-header">
                                                                        <h5 class="modal-title" id="exampleModalLabel">
                                                                            Deposit {{ base.currency }}
                                                                        </h5>
                                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" style="fill:var(--white)" viewBox="0 0 512 512">
                                                                                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                                                <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></svg>
                                                                        </button>
                                                                    </div>
                                                                    <div class="modal-body">
                                                                        <div class="deposite-upper-box" v-if="base.deposit">
                                                                            <div class="deposit-main-box">
                                                                                <h5>Wallet Address</h5>
                                                                                <div class="deposite-field mb-4">
                                                                                    <div class="input-group">
                                                                                        <input type="text" class="form-control" :value="base.address" :id="'myInput_' + base.currency" placeholder="Wallet Address" readonly />
                                                                                        <span class="input-group-text" id="copy-add">
                                                                                            <button class="copy-text-btn" :disabled="copy_disable" @click="copyAddress('myInput_' + base.currency)">
                                                                                                {{ copy_text }}
                                                                                                <em class="far fa-copy"></em>
                                                                                            </button>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                                <!--deposite-field-->

                                                                                <div class="deposit_qrcode_img">
                                                                                    <p>scan QR Code</p>
                                                                                    <img :src="generateQRCode(base.address)" class="qr-code img-thumbnail img-fluid" alt />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div class="height-box text-center" v-else>
                                                                            <span class="warn-error">
                                                                                {{ base.currency }} deposits and
                                                                                withdrawals not enabled.
                                                                            </span>
                                                                        </div>
                                                                        <!--deposit-main-box-->
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                    </tr>

                                    <!-- Base Currency End-->

                                    <!--withdrawl Modal -->
                                    <div class="modal fade" id="exampleModalWithdrawal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content" style="background-color:var(--black);color:var(--white);">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">
                                                        Withdraw {{ this.withdrawModal.itemCurrrency }}
                                                    </h5>
                                                    <button type="button" id="closeModall" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" style="fill:var(--white)" viewBox="0 0 512 512">
                                                            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                            <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></svg>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div v-if="dataVisibleWithdraw">
                                                        <div class="withdraw-main-box">
                                                            <div class="destination-box mb-3">
                                                                <h5>destination</h5>

                                                                <div class="form-main-box" :class="{'form-group--error': v$.form.toAddress.$error,}">
                                                                    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Wallet Address" autocomplete="off" v-model.trim="v$.form.toAddress.$model" />
                                                                        <div v-if="submitted && v$.form.toAddress.$error" class="error">
                                                                            {{ v$.form.toAddress.$errors[0]?.$message }}
                                                                        </div>

                                                                    <!-- <div class="error" v-if="submitted && !$v.form.toAddress.required">
                                                                        Destination is required.
                                                                    </div> -->
                                                                </div>
                                                            </div>
                                                            <!--destination-box-->

                                                            <div class="destination-box select-box mb-3">
                                                                <!-- Token -->
                                                                <div class="token_box">
                                                                    <h5>Token</h5>
                                                                    <select class="form-select shadow-none border" name="token" form="exampleModalWithdrawal" id="token" v-model="form.token_type">
                                                                        <option v-for="(data, index) in withdraw_net" :key="index" :value="data.token_type">
                                                                            <!-- {{ data.token_type }} -->
                                                                            {{ alterTokenName(data.token_type)}}
                                                                        </option>
                                                                    </select>
                                                                     <div v-if="submitted && v$.form.token_type.$error" class="error">
                                                                            {{ v$.form.token_type.$errors[0]?.$message }}
                                                                        </div>
                                                                </div>
                                                            </div>

                                                            <div class="destination-box amount-box">
                                                                <h5>amount</h5>

                                                                <div class="form-main-box" :class="{'form-group--error': v$.form.amount.$error,}">
                                                                    <input type="text" onkeypress="return (event.charCode !=8 && ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 && this.value.indexOf('.') == -1)))" onpaste="return false;" class="form-control" id="formGroupExampleInput" placeholder="Amount" v-model.trim="v$.form.amount.$model" autocomplete="off" />
                                                                    <!-- <div class="error text-start" v-if="submitted && !$v.form.amount.required">
                                                                        Amount is required.
                                                                    </div>-->
                                                                    <div v-if="submitted && v$.form.amount.$error" class="error text-start">
                                                                            {{ v$.form.amount.$errors[0]?.$message }}
                                                                    </div>
                                                                    <div v-if="this.form.amount != ''">
                                                                        <div class="error text-start" v-if="submitted && between">
                                                                            Amount should be less or equal to your
                                                                            balance
                                                                        </div>
                                                                    </div> 
                                                                    <!--destination-box-->
                                                                </div>

                                                                <div class="text-text-box">
                                                                    <span class="short-head" style="color: var(--green)">
                                                                        Transaction Fees:
                                                                        {{ this.withdraw_commission }}
                                                                        <span v-if="withdraw_commission_per">%</span>
                                                                    </span>
                                                                    <span class="short-head" style="color: rgb(147 147 147)">
                                                                        {{ this.withdrawModal.balance }}
                                                                        {{ this.withdrawModal.itemCurrrency }}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!--withdraw-main-box-->
                                                        <div class="withdraw-btn-box">
                                                            <button v-if="withdraw_loading" type="button" class="btn btn-success main-btn" data-bs-target="#proceedwithdrawl">
                                                                <div class="spinner-border text-light" role="status"></div>
                                                            </button>
                                                            <button v-else type="button" class="btn btn-success main-btn" data-bs-target="#proceedwithdrawl" @click="submitWithdrawal">
                                                                Proceed Withdraw
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="height-box text-center" v-else>
                                                        <span class="warn-error">{{this.withdrawModal.message}}</span>
                                                    </div>

                                                    <div class="warning" v-show="dataVisibleWithdraw">
                                                        <h5>
                                                            <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: var(--red); transform: ; msfilter: ;">
                                                                    <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z">
                                                                    </path>
                                                                </svg></span>
                                                            Warning
                                                        </h5>

                                                        <ul class="warning-text">
                                                            <li class="mb-2">
                                                                Please Double-Check The Destination Address.
                                                                Withdrawal Requests Cannot Be Cancelled After
                                                                Submission.
                                                            </li>
                                                            <li>
                                                                Withdrawals To Smart Contract Addresses Will
                                                                Be Lost Forever.
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!--withdraw data-->

                                    <!--Deposit Modal -->
                                    <div class="modal fade" id="exampleModaldeposite" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-dialog-centered">
                                            <div class="modal-content" style="background-color:var(--black);color:var(--white);">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">
                                                        Deposit {{ depositModal.itemCurrrency }}

                                                    </h5>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" width="25px" style="fill:var(--white)" viewBox="0 0 512 512">
                                                            <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                                            <path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" /></svg>
                                                    </button>
                                                </div>
                                                <div class="modal-body" v-if="dataVisibleDeposit">
                                                    <ul class="nav nav-pills nav-fill mb-3" id="pills-tab" role="tablist">
                                                        <li class="nav-item" role="presentation" v-for="(data, index) in deposit_net" :key="index">
                                                            <button :class="
                                  data.id == showData.id
                                    ? 'nav-link active'
                                    : 'nav-link'
                                " id="pills-home-tab" data-bs-toggle="pill" :data-bs-target="
                                  'pills-home' + data.token_type
                                " type="button" role="tab" aria-controls="pills-home" aria-selected="true" @click="assignDeposit(data)">
                                                                <!-- {{ data.token_type }} -->
                                                                {{ alterTokenName(data.token_type)}}
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <div class="tab-content" id="pills-tabContent">
                                                        <div class="tab-pane fade show active" :id="'pills-home' + showData.token_type" role="tabpanel" aria-labelledby="pills-home-tab">
                                                            <div class="deposit-main-box">
                                                                <h5>Wallet Address</h5>
                                                                <div class="deposite-field mb-4">
                                                                    <div class="input-group">
                                                                        <input type="text" class="form-control" :value="depositModal.toAddress" :id="'myInput_' + showData.token_type" placeholder="Wallet Address" readonly />
                                                                        <span class="input-group-text" id="copy-add">
                                                                            <button class="copy-text-btn" :disabled="copy_disable" @click="copyAddress('myInput_' + showData.token_type)">
                                                                                {{ copy_text }}

                                                                                <em class="far fa-copy"></em>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                </div>

                                                                <div class="deposit_qrcode_img">
                                                                    <p>scan QR Code</p>
                                                                    <img :src="generateQRCode(depositModal.toAddress)" class="qr-code img-thumbnail img-fluid" alt />
                                                                </div>
                                                            </div>
                                                            <!-- <div class="height-box text-center" v-else>
                              <span class="warn-error">
                                {{ this.depositModal.message }}
                              </span>
                            </div> -->
                                                        </div>
                                                        <!--deposit-main-box-->
                                                    </div>
                                                    <!-- min-deposit -->
                                                    <div class="min-deposit bg" style="padding: 16px">
                                                        <div class="d-flex justify-content-between">
                                                            <p class="m-0 fw-bold">Min Deposit</p>
                                                            <p>{{ this.depositModal.deposit_min }}</p>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <p class="m-0 fw-bold">Expected Arrival</p>
                                                            <p>15 Network Confirmation</p>
                                                        </div>
                                                        <div class="d-flex justify-content-between">
                                                            <p class="m-0 fw-bold">Expected Lock</p>
                                                            <p>15 Network Confirmation</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="height-box text-center" v-else>
                                                    <span class="warn-error">
                                                        {{ this.depositModal.message }}
                                                    </span>
                                                </div>

                                                <div class="warning" id="deposit-warning" v-show="dataVisibleDeposit">
                                                    <h5>
                                                        <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="
                                    fill: var(--red);
                                    transform: ;
                                    msfilter: ;
                                  ">
                                                                <path d="M11.953 2C6.465 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.493 2 11.953 2zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z">
                                                                </path>
                                                            </svg></span>
                                                        Warning
                                                    </h5>

                                                    <ul class="warning-text">
                                                        <li class="mb-2">
                                                            Send Only Using The
                                                            {{ networkInfo(showData.token_type).name }} ({{
                                  showData.token_type == 'SELF' ?
                                networkInfo(showData.token_type).token_type :
                                showData.token_type
                                }}) Network. Using Any Other Network Will Result
                                                            In Loss Of Funds.
                                                        </li>
                                                        <li>
                                                            Deposit Only
                                                            {{ networkInfo(showData.token_type).short }} To
                                                            This Deposit Address. Depositing Any Other Asset
                                                            Will Result In A Loss Of Funds.
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Other Currency -->
                                    <tr v-for="(item, index) in other_currency" :key="index" :visible="!loading">
                                        <td>
                                            <div class="portfolio-main-info currency-name">
                                                <img loading="lazy" :src="item.image" class="img-fluid" alt />
                                                <h6>
                                                    {{ item.name }}
                                                    <span>{{ item.symbol }}</span>
                                                </h6>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                        <td>
                                            <div class="portfolio-main-info currency-balance">
                                                <h6>
                                                    {{ item.quantity }}
                                                    <span>${{ item.c_bal }}
                                                    </span>
                                                </h6>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                        <td>
                                            <div class="portfolio-main-info currency-balance">
                                                <h6>
                                                    {{ item.freezed_balance }}
                                                </h6>
                                            </div>
                                        </td>
                                        <!-- <td class="price-hours-box">
                        <div class="portfolio-main-info high-price">
                          <h6>
                            $6.02<span style="color: var(--red);">+1.56%</span>
                          </h6>
                        </div>
                      </td>-->
                                        <td class="portfolio-head-box">
                                            <div class="portfolio-main-info portfolio-percantage">
                                                <div class="progress">
                                                    <div class="progress-bar" role="progressbar" :style="'width: ' + item.portfolio_share + '%'" :aria-valuenow="item.portfolio_share" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <h6>
                                                    <span>{{ item.portfolio_share }}%</span>
                                                </h6>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                        <td class="action-width-box">
                                            <div class="portfolio-main-info actions-btn">
                                                <ul class="actions-btn-list">
                                                    <li>
                                                        <button type="button" v-on:click="resetForm()" class="btn btn-primary color-red" data-bs-toggle="modal" data-bs-target="#exampleModalWithdrawal" @click="withdraw(item)">
                                                            Withdraw
                                                        </button>

                                                        <!-- Button trigger modal -->
                                                    </li>
                                                    <li>
                                                        <button type="button" class="btn btn-primary color-green" data-bs-toggle="modal" data-bs-target="#exampleModaldeposite" @click="deposit(item)">
                                                            deposit
                                                        </button>

                                                        <!-- Button trigger modal -->
                                                    </li>
                                                </ul>
                                            </div>
                                            <!--portfolio-main-info-->
                                        </td>
                                    </tr>
                                    <!-- Other Currency End -->
                                </tbody>
                            </table>
                        </div>
                        <!--table-responsive-->
                    </div>
                    <!--portfolio-currency-main-box-->
                </div>
                <!--col-xl-12 col-lg-12 col-md-12-->
            </div>
            <!--row portfolio-bottom-row-->
        </div>
        <!--exchange-sec-->
    </section>
    <!--exchange-sec-->
</div>
</template>

<script>
// import {
//     required
// } from "vuelidate/lib/validators";

import useVuelidate from '@vuelidate/core'
import {
    helpers,   
    required,
    // maxValue,
    // requiredIf
   
} from '@vuelidate/validators'
import {
    Modal
} from "bootstrap";
import ApiClass from "@/api/api";
import exactMath from "exact-math";
export default {
    name: "Portfolio",
     setup() {
        return {
            v$: useVuelidate()
        }
    },
    data: () => ({
        theModal: "",
        withdraw_loading: false,
        form: {
            // token_types: [],
            token_type: "",
            amount: "",
            toAddress: "",
            currency: "",
        },
        withdraw_commission: "",
        withdraw_commission_per: false,
        withdraw_type: "",
        currency_networks: [],
        withdraw_net: [],
        deposit_net: [],
        showData: [],
        withdrawl_data: "",
        submitted: false,
        between: false,
        withdrawModal: {
            itemCurrrency: "",
            itemWithdraw: "",
            message: "",
            token_type: "",
            balance: "",
            toAddress: "",
        },
        depositModal: {
            itemCurrrency: "",
            itemDeposit: "",
            message: "",
            toAddress: "",
            deposit_min: "",
        },
        copy_text: "Copy",
        copy_disable: false,
        base_currency: [],
        other_currency: [],
        total_currency: "",
        response: [],
        loading: true,
        showData1: [],
        dataVisibleDeposit: false,
        dataVisibleWithdraw: false,
        total_freezed: null

    }),
    validations() {
        // var blnc = this.withdrawModal.balance? this.withdrawModal.balance : 0;
        return {
            form: {
                toAddress: {
                      required: helpers.withMessage("Destination is required", required),
                },
                token_type: {
                      required: helpers.withMessage("Token Type is required", required),
                },
                // token_type: { required },
                amount: {
                    required: helpers.withMessage("Amount is required", required),                                                                     
                    // requiredIf: helpers.withMessage("Amount should be less or equal to your balance", requiredIf(
                    //    (parseFloat(this.form.amount) > parseFloat(this.withdrawModal.balance)) || this.form.amount == "0"
                    // )),
                }
            },
        };
    },
    async mounted() {
        this.theModal = new Modal(
            document.getElementById("exampleModalWithdrawal")
        );
        //  new ClipboardJS('.copy-text-btn');
        this.generateQRCode();
        if (
            localStorage.getItem("token") != null ||
            localStorage.getItem("token") != undefined
        ) {
            await this.callApi();
        }
    },
    computed: {
        total_currency_get() {
            let total = 0;
            this.other_currency ?.map((el) => {
                let s = exactMath.mul(exactMath.add(el.quantity, el.freezed_balance), el.c_price);
                //  console.log({s,total,sym :el.symbol},el.c_price)
                total = s + total;
            });
            // return total.toFixed(4);
            return (Math.floor(10000 * total) / 10000).toFixed(4);
        },

    },
    watch:{
        "form.amount":function(v) { 
            ((parseFloat(v) > parseFloat(this.withdrawModal.balance)) || v == "0") ? this.between = true : this.between = false;
        }
    },
    methods: {
        resetForm() {
            this.form.amount= this.form.toAddress = "";
            // this.$v.form.$reset();  
            // this.$validator.reset();
            this.$nextTick(() => {
                this.v$.form.$reset();
            });
            // this.$refs.form.reset();       
        },
        alterTokenName(token_type) {

            if ((this.withdrawModal.itemCurrrency == 'ETH' || this.depositModal.itemCurrrency == 'ETH') &&
                token_type == 'SELF') {
                return 'ERC20';
            }
            if ((this.withdrawModal.itemCurrrency == 'TRX' || this.depositModal.itemCurrrency == 'TRX') &&
                token_type == 'SELF') {
                return 'TRC20';
            }
            return token_type;

        },
        networkInfo(tType = null) {
            tType = tType ?.substring(0, 3);
            if (tType == "ERC") return {
                name: "Ethereum",
                short: "ERC"
            };
            else if (tType == "TRC") return {
                name: "Tron",
                short: "TRC"
            };
            else if (tType == "BEP") return {
                name: "Binance",
                short: "BEP"
            };
            else if (tType == 'SEL') {
                return (this.depositModal.itemCurrrency == 'ETH') ? {
                    name: "Ethereum",
                    short: "ERC",
                    token_type: "ERC20"
                } : {
                    name: "Tron",
                    short: "TRC",
                    token_type: "TRC20"
                };
            } else return {
                name: tType,
                short: tType
            };
        },
        assignDeposit(data = null) {
            this.showData = data;
            this.depositModal.toAddress = data.wallet_address;
            this.depositModal.deposit_min = data.deposit_min;
            this.copy_text = "Copy";
            this.copy_disable = false;
        },
        assignWithdraw(data = null) {

            this.showData1 = data;
            this.submitted = false;
            this.withdraw_commission_per = (data.type == "percentage") ? true : false;
            this.withdraw_commission = data.withdraw_commission;
            this.form.token_type = data.token_type;
            this.form.amount = this.form.toAddress = "";
        },
        hi() {
            this.currency_networks = this.withdrawl_data.filter((e) => {
                if (this.form.token_type == e.token_type) {
                    return e;
                }
            });

            let arr = this.currency_networks[0];
            this.withdraw_commission =
                //  arr.type == "percentage"
                //   ? (arr.withdraw_commission * 10 * (this.form.amount * 10)) / 100
                //   : arr.withdraw_commission;
                arr.type == "percentage" ?
                (arr.withdraw_commission * this.form.amount) / 100 :
                arr.withdraw_commission;

        },

        copyAddress(elid = null) {
            var copyText = document.getElementById(elid);

            copyText.select();
            copyText.setSelectionRange(0, 99999);
            var $this = this;
            var res = document.execCommand("copy");
            this.copy_text = res ? "Copied" : "Copy";
            this.copy_disable = true;

            setTimeout(() => {
                $this.copy_text = "Copy";
                $this.copy_disable = false;
            }, 2000);
        },

        generateQRCode(address) {
            return (
                "https://chart.googleapis.com/chart?cht=qr&chl=" +
                address +
                "&chs=160x160&chld=L|0"
            );
        },

        async callApi() {
            this.loading = true;
            this.response = await ApiClass.getNodeRequest("user-crypto/get", true);

            if (this.response.data.status_code == 1) {
                this.loading = false;
                this.base_currency = this.response.data.data.filter((e) => {
                    if (e.currency_type == "fiat") {
                        return e;
                    }
                });
                this.other_currency = this.response.data.data.filter((e) => {
                    if (e.currency_type == "crypto") {
                        return e;
                    }
                });
                this.total_currency = this.response.data.mainTotal;
                this.total_freezed = this.response.data.freezedTotal;

            }

        },

        searchData() {
            var search = document
                .getElementById("flexTextCheckDefault")
                .value.toUpperCase();
            if (search) {
                this.base_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "fiat" && e.symbol.includes(search)
                );
                this.other_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "crypto" && e.symbol.includes(search)
                );
            } else {
                this.base_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "fiat"
                );
                this.other_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "crypto"
                );

                this.searchZeroData();
            }
        },
        searchZeroData() {
            if (document.getElementById("flexSwitchCheckDefault").checked) {
                this.base_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "fiat"
                );
                this.other_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "crypto"
                );
            } else {
                this.base_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "fiat" && parseFloat(e.c_bal) != 0
                );
                this.other_currency = this.response.data.data.filter(
                    (e) => e.currency_type == "crypto" && parseFloat(e.c_bal) != 0
                );
            }
        },
        withdraw(item) {
            this.withdrawModal.itemCurrrency = item.symbol;
            this.withdrawModal.itemWithdraw = item.withdraw_enable;
            this.withdrawModal.message = item.withdraw_desc;
            this.form.currency = item.symbol;
            this.dataVisibleWithdraw = item.withdraw_enable;
            this.withdrawModal.balance = item.quantity;
            // this.resetForm();

            if (this.dataVisibleWithdraw) {
                this.withdraw_net = item.currency_networks.filter(
                    (e) => e.withdraw_enable == true
                );

                if (this.withdraw_net.length != 0) {
                    this.showData1 = this.withdraw_net[0];

                    this.withdrawModal.toAddress = this.withdraw_net[0].address;
                    this.form.token_type = this.withdraw_net[0].token_type;
                    this.withdraw_commission_per = this.withdraw_net[0].type == 'percentage' ? true : false;
                    this.withdraw_commission = this.withdraw_net[0].withdraw_commission;

                    // this.form.token_types = abc.map((e) => {
                    //   if (e.withdraw_enable) {
                    //     return e.token_type;
                    //   }
                    // });
                    // this.form.token_type = this.form.token_types[0];
                    this.withdrawl_data = item.currency_networks;
                } else {
                    this.dataVisibleWithdraw = false;
                }
            }
        },
        deposit(item) {

            this.depositModal.itemCurrrency = item.symbol;
            this.depositModal.token_type = item.token_type;
            this.depositModal.itemDeposit = item.deposit_enable;
            this.depositModal.message = item.deposit_desc;
            this.dataVisibleDeposit = item.deposit_enable;

            if (this.dataVisibleDeposit) {
                this.deposit_net = item.currency_networks.filter(
                    (e) => e.deposit_enable == true
                );

                if (this.deposit_net.length != 0) {
                    this.showData = this.deposit_net[0];
                    this.depositModal.toAddress = this.deposit_net[0].wallet_address;
                    this.depositModal.deposit_min = this.deposit_net[0].deposit_min;

                    // this.copy_disable = false;
                    // this.copy_text = "Copy";
                }
            } else {
                this.dataVisibleDeposit = false;
            }
        },
        
        async submitWithdrawal() {
            this.submitted = true;
            const rval = await this.v$.form.$validate();
            if(!rval) return; 
            if (
                parseFloat(this.form.amount) > parseFloat(this.withdrawModal.balance) ||
                this.form.amount == "0"
            ) {
                this.between = true;
                return;
            }
            this.submitted = false;
            this.withdraw_loading = !this.withdraw_loading;

            var result = await ApiClass.postRequest("block/transfer", true,
                this.form
            );
            this.withdraw_loading = !this.withdraw_loading;
            // if(!result)  return this.loading=false;
            if (result.data.status_code == 1) {
                // this.theModal.close();
                document.getElementById('closeModall').click();

                this.form.amount = "";
                this.form.toAddress = "";
                this.$swal({
                    toast: true,
                    position: "top-end",
                    icon: "success",
                    title: result.data.message,
                    showConfirmButton: false,
                    timer: 3000,
                });
                return this.$router.push({
                    name: "Verify",
                    params: {
                        data: result.data.data,
                    },
                });
            } else {
                // this.loading = false;
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
.btn-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' style='fill: %23FFF%3Btransform: %3BmsFilter:%3B'%3E%3Cpath d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'%3E%3C/path%3E%3C/svg%3E")center/2em auto no-repeat;
}

/* .btn-close {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' style='fill: %23FFF%3Btransform: %3BmsFilter:%3B'%3E%3Cpath d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'%3E%3C/path%3E%3C/svg%3E");
} */

.links_history {
    text-decoration: none;
    color: var(--white);
}

.links_history:hover {
    color: var(--social-link);
    /* text-decoration: underline; */
}

section.exchange-portfolio-sec {
    padding: 80px 0;
    background-color: #111111;
}

.warn-error {
    text-align: center;
    font-size: 16px;
    /* color: rgb(255, 255, 255); */
    color: var(--black);
    background: rgb(254, 166, 10);
    font-weight: 700;
    transition: all 0.4s ease 0s;
    max-height: 200px;
    padding: 8px;
}

.table-search-box {
    border: 1px solid #ccc;
    border-bottom: none;
    padding: 10px 10px;
}

.balance-check-box {
    display: flex;
    justify-content: flex-end;
    position: relative;
}

.balance-check-box::before {
    position: absolute;
    content: "";
    top: -14px;
    left: 0;
    width: 2px;
    height: 55px;
    background-color: #ccc;
}

.form-control {
    border: none;
    font-size: 15px;
    font-family: "Poppins", sans-serif;
    font-weight: 500;
    color: #000;
    border-radius: 0;
}

.form-control:focus {
    box-shadow: none;
}

.form-switch .form-check-input {
    cursor: pointer;
}

.form-switch .form-check-input:focus {
    box-shadow: none;
    border-color: #ccc;
}

label.form-check-label {
    color: #c7c7c7;
    padding-left: 5px;
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
}

span#basic-addon1 {
    background: transparent;
    border: none;
}

span#basic-addon1 .fas {
    font-weight: 400;
    color: #9f9d9d;
    cursor: pointer;
}

.portfolio-currency-heading {
    margin-bottom: 10px;
}

.portfolio-currency-heading h2 {
    margin-bottom: 0;
    font-family: "Poppins", sans-serif;
    font-weight: 400;
    font-size: 19px;
    color: var(--white);
}

.portfolio-currency-heading h5 {
    color: var(--white);
    font-size: 19px;
    font-weight: 300;
}

.portfolio-currency-description {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.portfolio-currency-description h5 {
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
    margin-bottom: 0;
}

.portfolio-currency-description h6 {
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: var(--green);
    margin-bottom: 0;
}

.portfolio-currency-description h6 span {
    color: #c7c7c7;
    padding-left: 10px;
    font-weight: 500;
}

/**** TABLE CSS START ****/

.portfolio-main-info.currency-name {
    display: flex;
    align-items: center;
}

.portfolio-main-info img {
    width: 40px;
    margin-right: 15px;
}

.portfolio-main-info h6 {
    margin-bottom: 0;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    text-transform: capitalize;
    font-weight: 500;
    color: var(--white);
}

.portfolio-main-info h6 span {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #c7c7c7;
    margin-top: 3px;
    text-transform: uppercase;
}

ul.actions-btn-list {
    padding: 0;
    margin: 0;
}

ul.actions-btn-list li {
    display: inline-block;
    padding-right: 6px;
    border-right: 1px solid #ccc;
    padding-left: 9px;
}

ul.actions-btn-list li:nth-child(1) {
    padding-left: 0;
}

.table {
    border: 1px solid #ccc;
}

td.action-width-box {
    max-width: 90px;
}

.table tbody tr td {
    max-width: 50px;
    padding: 15px 0.5rem;
    border: none;
}

.portfolio-main-info.currency-balance {
    max-width: 100px;
}

.portfolio-main-info.currency-balance h6 {
    text-align: end;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.portfolio-main-info.currency-balance h6 span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.portfolio-main-info.high-price {
    max-width: 100px;
}

.portfolio-main-info.high-price h6 span {
    color: var(--green);
    text-align: end;
}

.progress {
    width: 140px;
    height: 10px;
    margin-bottom: 9px;
    margin-top: 5px;
}

table.table tbody tr {
    border-top: 1px solid #cccc;
}

table.table thead tr th {
    font-size: 15px;
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    color: var(--white);
    padding-left: 34px;
    padding-top: 15px;
    padding-bottom: 15px;
}

table.table thead tr th:nth-child(4) {
    padding-left: 0.5rem;
}

table.table thead tr th:nth-child(5) {
    padding-left: 0.5rem;
}

table.table tbody {
    border-top: none;
}

ul.actions-btn-list li a {
    text-decoration: none;
    font-size: 16px;
    font-family: "Poppins", sans-serif;
    text-transform: capitalize;
    font-weight: 500;
    color: #4f8ce7;
}

.progress-bar {
    background-color: #70859a;
}

ul.actions-btn-list li:nth-child(2) {
    border-right: 0;
}

ul.actions-btn-list li button.btn.btn-primary {
    background-color: transparent;
    padding: 0;
    border: none;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 500;
    font-family: "Poppins";
}

button.btn.btn-primary.color-red {
    color: var(--red);
}

button.btn.btn-primary.color-green {
    color: var(--green);
}

ul.actions-btn-list li button.btn.btn-primary:focus {
    box-shadow: none;
}

.portfolio-main-info.high-price h6 {
    text-align: end;
}

h5.modal-title {
    text-align: center;
    width: 100%;
    text-transform: uppercase;
    font-family: "Poppins";
    font-weight: 500;
    color: var(--white);
    margin: 0;
}

.destination-box h5 {
    padding-bottom: 5px;
    padding-left: 3px;
    font-size: 14px;
    color: #000;
    font-family: "Poppins";
    margin-bottom: 0;
    text-transform: capitalize;
}

.form-main-box .form-control {
    border: 1px solid #cccc;
    height: 45px;
    border-radius: 5px;
    font-weight: 400;
    color: #000;
    margin-bottom: 2px;
}

.destination-box span.short-head {
    font-size: 12px;
    padding-left: 5px;
}

.destination-box.amount-box {
    text-align: right;
}

.destination-box.amount-box h5 {
    text-align: left;
}

.withdraw-btn-box {
    margin-top: 25px;
}

.withdraw-btn-box button.btn.btn-success.main-btn {
    width: 100%;
    /* background-color: #1652f0; */
    background-color: var(--signup-btn);
    /* border-color: #1652f0; */
    border-color: var(--signup-btn);
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    min-height: 50px;
}

.btn-close:focus {
    box-shadow: none;
}

.modal-content {
    border-color: #ccc;
}

button.copy-text-btn {
    background: #00c853;
    padding: 10px 23px;
    color: #fff;
    border: none;
    text-transform: uppercase;
    font-size: 16px;
    font-family: "Poppins";
    border-radius: 0;
}

input#myInput {
    border-radius: 5px 0 0 5px;
    border: 1px solid #ccc;
}

span#copy-add {
    background-color: transparent;
    padding: 0;
}

.deposit-main-box h5 {
    padding-bottom: 5px;
    padding-left: 3px;
    font-size: 14px;
    color: #000;
    font-family: "Poppins";
    margin-bottom: 0;
    text-transform: capitalize;
}

.deposit_qrcode_img img.qr-code {
    max-width: 125px;
}

.deposit_qrcode_img {
    text-align: center;
}

.deposit_qrcode_img p {
    margin-bottom: 0;
    padding-bottom: 10px;
    text-transform: uppercase;
    font-family: "Poppins";
    font-size: 16px;
    font-weight: 600;
    color: #000;
}

.btn-success:focus {
    box-shadow: none;
}

div#table-loader {
    position: relative;
    left: 522px;
    right: 0;
    margin: 0 auto;
}

.token_box select {
    border: 1px solid #cccc !important;
}

.modal-body {
    min-height: 380px;
}

.height-box {
    min-height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.deposite-upper-box {
    min-height: 380px;
    display: flex;
    align-items: center;
    justify-content: center;
}

/**************** NEW CSS ***********************/
ul#pills-tab {
    border-radius: 7px;
    background: var(--white);
    box-shadow: var(--box-shadow);
}

.nav-pills .nav-link.active {
    color: #fff;
    background: var(--dark-bg);
}

.nav-item .nav-link {
    font-size: 12px;
    text-transform: uppercase;
    font-family: "Poppins", sans-serif;
    color: var(--black);
    font-weight: 600;
}

.warning {
    padding: 0px 10px;
    margin-top: 35px !important;
}

#deposit-warning {
    padding: 0 35px;
}

.warning h5 {
    border-bottom: 2px solid #ccc;
    padding-bottom: 5px;
    color: var(--red);
    font-size: 18px;
    margin-bottom: 10px;
}

.warning-text {
    padding: 0;
}

.warning-text li {
    font-size: 14px;
    font-weight: 400;
    color: var(--white);
}

.text-text-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 7px;
}

@media all and (min-width: 1367px) and (max-width: 1399px) {
    ul.actions-btn-list li a {
        font-size: 14px;
        font-weight: 600;
    }

    div#table-loader {
        left: 400px;
    }
}

@media all and (min-width: 1200px) and (max-width: 1366px) {
    ul.actions-btn-list li a {
        font-size: 14px;
        font-weight: 600;
    }

    .balance-check-box::before {
        left: -12px;
    }

    div#table-loader {
        left: 400px;
    }
}

@media all and (min-width: 1025px) and (max-width: 1199px) {
    .table tbody tr td {
        max-width: fit-content;
    }

    .balance-check-box::before {
        left: -10px;
    }

    div#table-loader {
        left: 340px;
    }
}

@media all and (min-width: 992px) and (max-width: 1024px) {
    .table tbody tr td {
        max-width: fit-content;
    }

    .balance-check-box::before {
        left: -10px;
    }

    div#table-loader {
        left: 340px;
    }
}

@media all and (min-width: 768px) and (max-width: 991px) {
    .balance-check-box {
        left: -11px;
    }

    ul.actions-btn-list li {
        border-right: none;
        padding-right: 0;
    }

    .portfolio-main-info.currency-balance h6 {
        text-align: center;
    }

    div#table-loader {
        left: 270px;
    }
}

@media all and (min-width: 320px) and (max-width: 767px) {
    section.exchange-portfolio-sec {
        padding: 30px 0;
    }

    /* .portfolio-currency-heading h2 {
        text-align: center;
    } */

    .table-search-box {
        padding: 10px 0;
    }

    .balance-check-box::before {
        display: none;
    }

    .input-group {
        border-bottom: 1px solid #ccc;
        margin-bottom: 15px;
    }

    .balance-check-box {
        justify-content: flex-start;
        position: relative;
        padding-left: 11px;
    }

    .table tbody tr td {
        max-width: none;
    }

    table.table thead tr th {
        padding-left: 20px;
        text-align: center !important;
    }

    .portfolio-main-info.actions-btn {
        text-align: center;
    }

    ul.actions-btn-list li {
        border-right: none;
        padding-right: 0;
    }

    .deposite-field .input-group {
        border: none;
    }

    th.price-hours {
        display: none;
    }

    th.portfolio-head {
        display: none;
    }

    td.price-hours-box {
        display: none;
    }

    td.portfolio-head-box {
        display: none;
    }

    .portfolio-main-info img {
        max-width: 25px;
        margin-right: 10px;
    }

    .portfolio-main-info.currency-balance {
        max-width: none;
    }

    .portfolio-main-info.currency-balance h6 {
        max-width: 90px;
        text-align: center;
    }

    ul.actions-btn-list li {
        display: block;
    }

    div#table-loader {
        left: 96px;
    }

    .portfolio-currency-heading h2,
    .portfolio-currency-heading h5 {
        font-size: 14px;
    }
}
</style>
