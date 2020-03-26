<template>
  <div class="orderOutSide">
    <div class="middle">

      <div class="orderThDiv">
        <div class="thInsideDiv">
          <div class="spanDiv">
            <span>我的订单</span>
          </div>
        </div>
        <div class="bottonDid">
          <el-button type="primary" @click="returnMain">返回主页</el-button>
        </div>
      </div>
      <orderTable :tableThs="tableThs" :list="tableList" :type="type" @initOrderList="initOrderList" />
      <div class="pageDiv">
        <el-pagination :page-size="form.rows" :current-page="form.page" layout="total, prev, pager, next, jumper" :total="data.totalSize"
          :small="size == 'small'|| size == 'mini'" :hide-on-single-page="hiddenFlag" @current-change="pageChange"></el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        tableThs: {

          image: '图片',
          name: '商品',
          amount: '数量',
          subtotal: '小计',
          orderItemStatus: '订单状态(子订单)',
        },
        data: [],
        tableList: [],
        type: 'customerOrderList',
        hiddenFlag: true,
        form: {
          page: 1,
          rows: 3
        },
        size: "small",
      }
    },
    methods: {
      pageChange(currentPage) {
        let _this = this;
        _this.form.page = currentPage;
        _this.initOrderList();
      },
      returnMain() {
        window.location.href = "http://localhost:8081/main";
      },
      initOrderList() {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/findOrders?' + "page=" + _this.form.page + "&rows=" + _this.form.rows,
          data: [],
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.data = response.data.data;
              _this.tableList = _this.data.content;
              if (_this.data.totalSize > 3) {
                _this.hiddenFlag = false;
              }
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
    }
  }

</script>
<style lang="scss" scoped>
  .orderOutSide {
    width: 70%;
    padding: 0px 15%;
    .middle {
      box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0px 3px;
      width: 100%;
      .pageDiv {
        width: 100%;
        height: 50px;
      }
      .orderThDiv {
        height: 50px;
        .thInsideDiv {
          width: 30%;
          height: 50px;
          float: left;
          .spanDiv {
            margin-left: 20%;
            margin-top: 7px;
            span {
              font-size: 24px;
            }
          }
        }
        .bottonDid {
          float: right;
        }
        span {}
      }
    }
  }
</style>