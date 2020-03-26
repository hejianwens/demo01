<template>
  <div class="outSideDiv">
    <div class="middleDiv">
      <div v-for="evaluate in evaluates" :key="evaluate.goodsId" class="evaluateDiv">
        <el-table :data="evaluate.orderItem" style="width: 100%" :border="false" size="small">
          <template v-for="(item,key) in tableThs">
            <el-table-column v-if="key=='image'" :prop="key" :label="item" align="center" width="100" height="100">
              <template slot-scope="{ row, column, $index }">
                <div class="imageDiv">
                  <img :src="evaluate.orderItem[0].goods.image" style="width:80px;height:80px">
                </div>
              </template>
            </el-table-column>
            <el-table-column v-else-if="key=='name'" :prop="key" :label="item" align="center" height="300" width="500">
              <template slot-scope="{ row, column, $index }">
                <span>{{evaluate.orderItem[0].goods.name}}</span>
              </template>
            </el-table-column>
          </template>
        </el-table>
        <div class="rateDiv">
          <div class="rateSpanDiv">
            <span class="">商品质量评分:</span>
          </div>
          <el-rate v-model="evaluates[evaluate.index].goodsQualityMark"></el-rate>
        </div>
        <div class="bottonDiv">
          <div class="bottonSpanDiv">
            <span class="">商品文字评价:</span>
          </div>
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="evaluates[evaluate.index].content" style="width: 80%">
          </el-input>
        </div>
      </div>
      <div class="saveDiv">
        <el-button type="primary" size="small" @click="save">评价</el-button>
      </div>
    </div>

  </div>

</template>


<script>
  import axios from 'axios';
  export default {
    components: {

    },
    data() {
      return {
        orderItems: [],
        evaluates: [],
        tableThs: {
          image: "图片",
          name: "商品",
        },
      };
    },
    mounted() {
      let _this = this;
      _this.orderItems = _this.$route.query.orderItems;
      console.log(_this.orderItems);
      _this.initEvaluate();
    },
    methods: {
      save() {
        let _this = this;
        let params = [];
        for (let i = 0; i < _this.evaluates.length; i++) {
          params.push({
            goodsId: _this.evaluates[i].goodsId,
            goodsQualityMark: _this.evaluates[i].goodsQualityMark,
            content: _this.evaluates[i].content,
            orderNumber: _this.evaluates[i].orderNumber,
          });
        }
        axios({
          method: 'post',
          url: "orderItem/insertGoodsEvaluate",
          data: JSON.stringify(params),
          headers:
          {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (response.data.code == "200") {
            window.location.href = "http://localhost:8081/listOrder";
          }
          else {
            window.alert("评价失败失败，原因" + response.data.message);
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      initEvaluate() {
        let _this = this;
        for (let i = 0; i < _this.orderItems.length; i++) {
          _this.evaluates.push({
            orderItem: [_this.orderItems[i]],
            index: i,
            goodsId: _this.orderItems[i].goodsId,
            orderNumber: _this.orderItems[i].orderNumber,
            goodsQualityMark: 0.0,
            content: "",
          });
        }
        console.log(_this.evaluates);
      },

    }
  };

</script>

<style lang="scss" scoped>
  .outSideDiv {
    width: 44%;
    padding: 0px 28%;
    .middleDiv {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0px 3px;
      width: 100%;
      .saveDiv {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .evaluateDiv {
        .rateDiv {
          width: 400px;
          height: 50px;
          margin-left: 25px;
          margin-top: 15px;
          .rateSpanDiv {
            float: left
          }
        }
        .bottonDiv {
          width: 800px;
          height: 100px;
          margin-left: 25px;
          margin-top: 0px;
          .bottonSpanDiv {
            float: left
          }
        }
      }
    }
  }
</style>