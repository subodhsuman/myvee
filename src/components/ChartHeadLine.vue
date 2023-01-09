<template>
    <span style="font-size:12px" v-if="!chk">
        O: <span :style="'color:'+ color">{{ open }}</span> ;
        H: <span :style="'color:'+ color">{{ high}}</span> ;
        L: <span :style="'color:'+ color">{{ low}}</span> ;
        C: <span :style="'color:'+ color">{{ close}}</span> ;
        Change: <span :style="'color:'+ color">{{ (parseFloat(close) - parseFloat(open)).toFixed(2)}} ({{ parseFloat(((close - open) / open) * 100).toFixed(2) }}%)</span>
    </span>
</template>

<script>
export default {
    name:"ChartHeadLine",
    props: {
        color:String,
        open:Number,
        high:Number,
        low:Number,
        close:Number,
        chk:Boolean,
    }
}
</script>