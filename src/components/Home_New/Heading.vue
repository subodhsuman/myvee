<template>
    <div>
        <div class="row heading-row">
            <div class="col-xl-12 col-lg-12 col-md-12 mx-auto">
                <div class="heading-box">
                    <h2 class="mb-0 pb-2">{{title}}</h2>
                    <p class="mb-0">{{info}} <br> {{subinfo}}</p>
                </div>
                <!--heading-box-->
            </div>
            <!--col-xl-12 col-lg-12 col-md-12-->
        </div>
        <!--row heading-row-->
    </div>
</template>

<script>
    export default {
        name: 'Heading',
        props: {
            title: String,
            info: String,
            subinfo:String
        }
    }
</script>

<style scoped>
    .heading-box {
        margin-bottom: 50px;
        /* margin-left: 50px; */
        text-align: center;
    }
    
    .heading-box h2 {
        text-transform: uppercase;
        font-size: 35px;
        font-weight: 600;
        color:rgb(220, 169, 45);
        font-family: 'Poppins';
    }
    
    .heading-box p {
        text-transform: capitalize;
        font-size: 15px;
        font-weight: 400;
        font-family: 'Poppins';
        color: var(--white);
    }
    
    /* section.mobile-app-sec .heading-box h2 {
        color: var(--white);
    } */
    
    section.mobile-app-sec .heading-box p {
        color: var(--white);
    }
    
    .choose-info .heading-box {
        text-align: left;
    }
    
    .heading-inner-box .heading-box {
        margin-bottom: 20px;
    }
    
    section.cryptobuysell-sec .heading-box h2 {
        color: var(--white);
    }
    
    @media all and (min-width:768px) and (max-width:991px) {
        .choose-info .heading-box {
            text-align: center;
        }
    }
    
    @media all and (min-width: 320px) and (max-width: 767px) {
        .choose-info .heading-box {
            text-align: center;
        }
        .choose-info .heading-box h2 {
            font-size: 27px;
        }
    }
</style>