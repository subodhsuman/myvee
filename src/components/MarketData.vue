<template>
  <div>
    <div class="market-data">
      <div class="market-pair">
        <p>{{ MarketData.market_pair }}</p>
      </div>
      <!--market-pair-->

      <div class="market-pair-price">
        <h5
          :style="{
            color:
              MarketData.market_change >= 0 ? 'var(--green)' : 'var(--red)',
          }"
        >
          {{ MarketData.market_price }}
          <span
            :style="{
              color:
                MarketData.market_change >= 0 ? 'var(--green)' : 'var(--red)',
            }"
            >{{ MarketData.market_change }}%</span
          >
        </h5>
        <p>{{ MarketData.market_subprice }}usd</p>
      </div>
      <!--market-pair-price-->
      <svg
        :id="MarketData.market_pair"
        width="100%"
        viewBox="0 0 352 135"
        preserveAspectRatio="none"
        stroke-linejoin="round"
      ></svg>
    </div>
    <!--market-data-->
  </div>
</template>

<script>
export default {
  name: "MarketData",
  props: {
    MarketData: Object,
  },

  data() {
    return {
      height: 120, //the number of pixels high the chart is to be
      width: 360,
      minx: 0,
      maxx: 0,
      miny: 0,
      maxy: 0,
      color: "",
      svg_point: "",
    };
  },
  mounted() {
    this.CreatePolyChart();
    let  clrVal =
      this.MarketData.market_change > 0
        ? ["var(--bg-green)", "var(--green)"]
        : ["var(--bg-red)", "var(--red)"];
    var setVal = document.getElementById(this.MarketData.market_pair);
    setVal.style.fill = clrVal[0];
    setVal.style.stroke = clrVal[1];
    setVal.style.strokeWidth = 1;
  },
  methods: {
    CreatePolyChart() {
      let d = this.MarketData.seriesSpark3[0].data;
      let maped_points = d.map((r) => {
        return [r[0], r[1]];
      });
      // Set POINTS

      let points_d = this.setPoints(maped_points);
      let maxHeightArray = points_d.map(
        (i) =>
          parseInt(this.height) -
          ((i[1] - this.miny) / (this.maxy - this.miny)) *
            parseInt(this.height + 2)
      );
      // CREATE POLYLINE SVG

      let polyH = Math.max(...maxHeightArray) + 15;

      let svg = '<polyline points="0 ' + polyH + ",";
      points_d.forEach((point) => {
        svg =
          svg +
          ((point[0] - this.minx) / (this.maxx - this.minx)) *
            parseInt(this.width) +
          "," +
          Math.abs(
            parseInt(this.height) -
              ((point[1] - this.miny) / (this.maxy - this.miny)) *
                parseInt(this.height + 2)
          ) +
          " ";
      });
      svg = svg.replace(
        svg.substring(svg.lastIndexOf(",") + 1, svg.length),
        polyH
      );

      svg = svg + '" />';
      document.getElementById(this.MarketData.market_pair).innerHTML = svg;
    },
    setPoints(points_array) {
      this.minx = points_array[0][0];
      this.maxx = points_array[0][0];
      this.miny = points_array[0][1];
      this.maxy = points_array[0][1];

      points_array.forEach((point) => {
        this.minx = point[0] < this.minx ? point[0] : this.minx;
        this.maxx = point[0] > this.maxx ? point[0] : this.maxx;
        this.miny = point[1] < this.miny ? point[1] : this.miny;
        this.maxy = point[1] > this.maxy ? point[1] : this.maxy;
      });

      return points_array;
    },
  },
  updated() {
   let clrVal =
      this.MarketData.market_change > 0
        ? ["var(--bg-green)", "var(--green)"]
        : ["var(--bg-red)", "var(--red)"]; 
    var setVal = document.getElementById(this.MarketData.market_pair);
    setVal.style.fill = clrVal[0];
    setVal.style.stroke = clrVal[1];
    setVal.style.strokeWidth = 1;  
  },
};
</script>
<style scoped>
.market-data {
  background-color: var(--black);
      /* box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px; */
          box-shadow: 0 0 20px rgb(73 86 102 / 10%);
  border-radius: 5px;
  overflow: hidden;
}

.market-pair {
  padding: 5px 11px;
}

.market-pair p {
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 500;
  color: #FFF;
  font-family: "Poppins";
  text-transform: uppercase;
}

.market-pair-price {
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.market-pair-price h5 {
  margin-bottom: 0;
  font-size: 16px;
  font-weight: 600;
  font-family: "Poppins";
}

.market-pair-price h5 span {
  font-weight: 500;
  font-size: 14px;
}

.market-pair-price p {
  margin-bottom: 0;
  font-size: 15px;
  font-weight: 400;
  color: #FFF;
  font-family: "Poppins";
  text-transform: uppercase;
}

@media all and (min-width: 768px) and (max-width: 991px) {
  .market-data {
    margin-bottom: 15px;
  }
}

@media all and (min-width: 320px) and (max-width: 767px) {
  .market-data {
    margin-bottom: 15px;
  }
}
</style>