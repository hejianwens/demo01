<template>
  <div>
    <div class="orderTable" v-for="order in list" :key="order.orderNumber">
      <div class="topDiv">
        <div class="spanDiv">
          <span>订单号:{{order.orderNumber}}</span>
        </div>
        <div class="createTime">
          <span>下单时间:{{order.createTime}}</span>
        </div>

      </div>
      <el-table :data="order.orderItems" style="width: 100%" :border="false" size="small">
        <template v-for="(item,key) in tableThs">
          <el-table-column v-if="key=='image'" :prop="key" :label="item" align="center" width="100" height="100">
            <template slot-scope="{ row, column, $index }">
              <div class="imageDiv">
                <img :src="order.orderItems[$index].goods.image" style="width:80px;height:80px">
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="key=='name'" :prop="key" :label="item" align="center" width="600">
            <template slot-scope="{ row, column, $index }">
              <span>{{order.orderItems[$index].goods.name}}</span>
            </template>
          </el-table-column>
          <el-table-column v-else-if="key=='orderItemStatus'" :prop="key" :label="item" align="center" width="210">
            <template slot-scope="{ row, column, $index }">
              <span v-if="order.orderItems[$index].orderItemStatus=='0'">未付款</span>
              <span v-if="order.orderItems[$index].orderItemStatus=='1'">已付款</span>
              <span v-if="order.orderItems[$index].orderItemStatus=='2'">已发货</span>
              <span v-if="order.orderItems[$index].orderItemStatus=='3'">已收货</span>
              <span v-if="order.orderItems[$index].orderItemStatus=='-1'">退款中</span>
              <span v-if="order.orderItems[$index].orderItemStatus=='-2'">已取消</span>
            </template>
          </el-table-column>
          <el-table-column v-else :prop="key" :label="item" align="center" width="210">
          </el-table-column>
        </template>
      </el-table>
      <div class="buttomnDiv">
        <div style="float: left">
          <div class="spanDiv">
            <span v-if="order.status=='0'">订单状态:未付款</span>
            <span v-if="order.status=='1'">订单状态:已付款(等待发货)</span>
            <span v-if="order.status=='2'">订单状态:已发货</span>
            <span v-if="order.status=='3'">订单状态:已收货</span>
            <span v-if="order.status=='-1'">订单状态:退款中</span>
            <span v-if="order.status=='-2'">订单状态:已取消</span>
          </div>
        </div>
        <div style="float: right">
          <el-button v-if="order.status=='0'" type="primary" @click="apply(order.orderNumber)">支付</el-button>
          <el-button v-if="order.status=='2'" type="primary" @click="alreadyGet(order.orderNumber)">已收货</el-button>
          <el-button v-if="order.status=='3' && order.evaluateFlag=='n'" type="primary" @click="evaluate(order.orderItems)">评价</el-button>
          <el-button v-if="order.status=='3'" type="primary" @click="cancel(order.orderNumber)">申请退货</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {

    name: 'orderTable',
    props: ["list", "tableThs", "type"],
    components: {


    },
    data() {
      return {

        operates: [],
      }
    },
    methods: {
      evaluate(orderItems) {
        this.$router.push({
          path: '/evaluate',
          query: {
            orderItems: orderItems,
          },
        })
      },
      apply(orderNumber) {
        let _this = this;
        window.location.href = "http://localhost:8081/pay?orderNumberKey=" + orderNumber;
      },
      alreadyGet(orderNumber) {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/alreadyGetGoods?orderNumber=' + orderNumber,
          data: {
          }
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.$emit("initOrderList");
            }
            else {
              window.alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      cancel(orderNumber) {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/cancelOrder?orderNumber=' + orderNumber,
          data: {
          }
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.$emit("initOrderList");
            }
            else {
              window.alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },

    },
    mounted() {

    }
  }

</script>

<style lang="scss" scoped>
  .orderTable {
    margin-top: 45px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 20px 0px rgba(0, 0, 0, 0.04);
    margin-bottom: 100px;
    .buttomnDiv {
      height: 40px;
      .spanDiv {
        margin: 0 26.6px;
        padding-top: 10px;
        width: 250px;
        height: 50px;
        float: left;
        span {}
      }
    }
    .topDiv {
      border-bottom-style: inset;
      border-bottom-color: #DCDFE6;
      height: 50px;
      .spanDiv {
        margin: 0 2%;
        padding-top: 10px;
        width: 50%;
        height: 50px;
        float: left;
        span {}
      }
      .createTime {

        margin-left: 2%;
        padding-top: 10px;
        float: right;
        span {}
      }
    }
  }
</style>