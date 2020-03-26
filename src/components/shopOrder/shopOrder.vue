<template>
  <div class="shopOrderDiv">
    <div class="searchOutDiv">
      <el-input v-model="orderNumber" placeholder="请输入内容" style="width:400px;float:left;"></el-input>
      <div style="float:left;padding-left: 7px; ">
        <el-button type="primary" icon="el-icon-search" style="width:100px" @click="searchOrder">搜索</el-button>
      </div>
      <el-form ref="form" label-position="right" label-width="150px" style="padding-top: 30px;">
        <el-form-item label="订单状态：" prop="image">
          <el-select v-model="orderItemStatus" placeholder="--请选择--" size="mini" :clearable="true" @change="initOrderList">
            <el-option v-for="item in statuses" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="orderTable" v-for="order in showList" :key="order.id">
      <div class="topDiv">
        <div class="spanDiv">
          <span>订单号:{{order.orderNumber}}</span>
        </div>
        <div class="createTime">
          <span>下单时间:{{order.createTime}}</span>
        </div>

      </div>
      <el-table :data="order.list" style="width: 100%" :border="false" size="medium">
        <template v-for="(item,key) in tableThs">
          <el-table-column v-if="key=='image'" :prop="key" :label="item" align="center" width="100" height="100">
            <template slot-scope="{ row, column, $index }">
              <div class="imageDiv">
                <img :src="order.list[0].image" style="width:80px;height:80px">
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="key=='name'" :prop="key" :label="item" align="center" height="300" width="325">
            <template slot-scope="{ row, column, $index }">
              <span>{{order.list[0].name}}</span>
            </template>
          </el-table-column>

          <el-table-column v-else-if="key=='sendMessage'" :prop="key" :label="item" align="center" width="510">
            <template slot-scope="{ row, column, $index }">
              <div style="width: 510px">
                <div style="width:60px;float: left"><span>收货人:</span></div>
                <div style="display:inline"><span>{{order.list[0].sendMessage.receiverName}}</span></div>
              </div>
              <div style="width:  510px">
                <div style="width:60px;float: left"><span>收货地址:</span></div>
                <div style="display:inline"><span>{{order.list[0].sendMessage.receiverTelephone}}</span></div>
                <!-- <span>收货地址:{{order.list[0].sendMessage.receiverTelephone}}</span> -->
              </div>
              <div style="width: 510px">
                <div style="width:60px;float: left"><span>收货地址:</span></div>
                <div style="display:inline"><span>{{order.list[0].sendMessage.receiverAddress}}</span></div>
                <!-- <span>收货地址:{{order.list[0].sendMessage.receiverAddress}}</span> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column v-else-if="key=='operate'" :prop="key" :label="item" align="center" width="180">
            <template slot-scope="{ row, column, $index }">
              <a href="#" style="text-decoration:none">
                <el-button v-if="order.list[0].status=='1'" type="primary" @click="sendGoods(order.orderNumber,order.id)">已发货</el-button>
                <el-button v-if="order.list[0].status=='-1'" type="primary" @click="refund(order.orderNumber,order.id)">退款</el-button>
                <!-- <span v-if="order.list[0].status=='1'" style="color:#606266;    font-size: large;" @click="sendGoods(order.orderNumber,order.id)">已发货</span> -->
              </a>
            </template>
          </el-table-column>
          <el-table-column v-else-if="key=='status'" :prop="key" :label="item" align="center" width="180">
            <template slot-scope="{ row, column, $index }">

              <span v-if="order.list[0].status=='0'">未付款</span>
              <span v-if="order.list[0].status=='1'">已付款</span>
              <span v-if="order.list[0].status=='2'">已发货</span>
              <span v-if="order.list[0].status=='3'">已收货</span>
              <span v-if="order.list[0].status=='-1'">退款中</span>
              <span v-if="order.list[0].status=='-2'">已取消</span>

            </template>
          </el-table-column>
          <el-table-column v-else :prop="key" :label="item" align="center" width="180">
          </el-table-column>
        </template>
      </el-table>
      <div></div>
    </div>
    <div class="pageDiv">
      <el-pagination :page-size="form.rows" :current-page="form.page" layout="total, prev, pager, next, jumper" :total="data.totalSize"
        :small="size == 'small'|| size == 'mini'" :hide-on-single-page="hiddenFlag" @current-change="pageChange"></el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {

    name: 'shopOrder',
    props: [""],
    components: {


    },
    data() {
      return {
        tableThs: {
          image: '图片',
          name: '商品',
          amount: '数量',
          subtotal: '小计',
          status: '订单状态',
          sendMessage: '配送信息',
          operate: "操作"
        },
        statuses: [],
        orderItemStatus: "",
        data: [],
        tableList: [],
        hiddenFlag: true,
        showList: [],
        orderNumber: "",
        form: {
          page: 1,
          rows: 4,
        },
        size: "small",
      }
    },
    methods: {
      initStatuses() {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/getOrderStatus',
          data: {
          }
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.statuses = response.data.data;
            }
            else {
              window.alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      searchOrder() {
        this.showList = [],
          this.initOrderList();
      },
      refund(orderNumber, id) {
        window.location.href = 'http://localhost:8081/refund?orderNumber=' + orderNumber + "&orderItemId=" + id;
      },
      sendGoods(orderNumber, id) {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/alreadySendGoods?orderNumber=' + orderNumber + "&orderItemId=" + id,
          data: {
          }
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.showList = [];
              _this.initOrderList();
            }
            else {
              window.alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      pageChange(currentPage) {
        let _this = this;
        _this.form.page = currentPage;
        _this.showList = [],
          _this.initOrderList();
      },
      initOrderList() {
        let _this = this;
        axios({
          method: 'get',
          url: 'orderItem/findOrderItems?' + "page=" + _this.form.page + "&rows=" + _this.form.rows + "&orderNumber=" + _this.orderNumber + "&orderItemStatus=" + _this.orderItemStatus,
          data: [],
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.data = response.data.data;
              _this.tableList = _this.data.content;
              if (_this.data.totalSize > 3) {
                _this.hiddenFlag = false;
              }
              for (let i = 0; i < _this.tableList.length; i++) {
                _this.showList.push({
                  orderNumber: _this.tableList[i].orderNumber,
                  createTime: _this.tableList[i].order.createTime,
                  id: _this.tableList[i].id,
                  list: [{
                    image: _this.tableList[i].goods.image,
                    name: _this.tableList[i].goods.name,
                    amount: _this.tableList[i].amount,
                    subtotal: _this.tableList[i].subtotal,
                    status: _this.tableList[i].orderItemStatus,
                    sendMessage: {
                      receiverName: _this.tableList[i].order.receiverName,
                      receiverTelephone: _this.tableList[i].order.receiverTelephone,
                      receiverAddress: _this.tableList[i].order.receiverAddress,
                    },

                  }]
                });
              }
              console.log(_this.showList);

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
      this.initOrderList();
      this.initStatuses();
    }
  }

</script>

<style lang="scss" scoped>
  .shopOrderDiv {
    .searchOutDiv {

      width: 99%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    .orderTable {
      margin-top: 45px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 20px 0px rgba(0, 0, 0, 0.04);
      margin-bottom: 100px;
      .topDiv {
        border-bottom-style: inset;
        border-bottom-color: #DCDFE6;
        height: 50px;
        .spanDiv {
          margin: 0 2%;
          padding-top: 10px;
          width: 30%;
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
  }
</style>