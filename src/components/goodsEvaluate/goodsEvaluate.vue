<template>
  <div class="outEvaDiv">
    <div class="insideDiv" v-for="eva in evaluates" :key="eva.id">
      <el-rate v-model="eva.goodsQualityMark" disabled show-score text-color="#ff9900" score-template="{value}">
      </el-rate>
      <div class="rateDiv">
        <div class="rateSpanDiv">
          <span class="">用户:{{eva.nickName}}</span>
        </div>
      </div>
      <div class="rateDiv">
        <div class="rateSpanDiv">
          <span class="">时间:{{eva.createTime}}</span>
        </div>
      </div>
      <div class="bottonDiv">
        <div class="bottonSpanDiv">
          <span class="">内容:{{eva.content}}</span>
        </div>
      </div>
    </div>
  </div>


</template>
<script>
  export default {

    name: 'goodsEvaluate',
    props: ["evaluates"],
    components: {


    },
    data() {
      return {


      }
    },
    methods: {

      mounted() {
        console.log(this.evaluates);
      },
    }
  }

</script>
<style lang="scss" scoped>
  .outEvaDiv {
    width: 84%;
    padding: 0 8%;
    .insideDiv {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0px 3px;
      height: 180px;
      margin-top: 17px;
      .el-rate {
        margin-left: 24px;
        padding-top: 12px;
      }
      .rateDiv {
        float: left;
        width: 100%;
        height: 23px;
        margin-left: 25px;
        margin-top: 7px;
        .rateSpanDiv {
          float: left
        }
      }
      .bottonDiv {
        float: left;
        width: 100%;
        height: 100px;
        margin-left: 25px;
        margin-top: 7px;
        .bottonSpanDiv {
          float: left
        }
      }
    }
  }
</style>