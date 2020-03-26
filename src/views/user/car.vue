<template>
  <div class="outDiv">
    <div class="insideDiv">
      <div class="headDiv">
        <div class="headInsideDiv">
          <i class="el-icon-shopping-cart-2"></i>
          <span class="headSpan">购物车</span>
          <div class="topReturnButtomDiv">
            <el-button type="primary" @click="returnMain">返回主页</el-button>
          </div>
        </div>
        <el-divider style="margin: 4px 0;"></el-divider>
      </div>

      <div class="buyCarIteamsDiv">
        <el-container class="thDiv">
          <div class="allSelectTh">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"><span class="allSelectThSpan">全选</span></el-checkbox>
          </div>
          <div class="goodsNameTh">商品</div>
          <div class="specificationsTh"></div>
          <div class="priceTh">单价</div>
          <div class="quantityTh">数量</div>
          <div class="smallCountTh">小计</div>
          <div class="operateTh">操作</div>
        </el-container>
        <div v-for="iteam in userBuyCarIteams" :key="iteam.id" class="buyCarIteamDiv">
          <div class="shopDiv">

          </div>

          <el-container class="goodsInfoDiv">
            <div class="allSelectIteam">
              <el-checkbox-group v-model="checkedIteams" @change="handleCheckChange" style="width:15.6px;float: left;" ref="checkbox">
                <el-checkbox :label="iteam.id" style="width:15.6px;overflow:hidden"></el-checkbox>

              </el-checkbox-group>
              <img :src="iteam.goods.image" style="width:80px;height:80px">
            </div>
            <div class="goodsNameIteam">
              <span style="color:#303133">{{iteam.goods.name}}</span>
            </div>

            <div class="priceIteam">
              <span>{{iteam.onePrice}}</span>
            </div>
            <div class="quantityIteam">
              <span style="color:#303133">{{iteam.amount}}</span>
            </div>
            <div class="smallCountIteam">
              <span style="color:#303133">{{iteam.subtotal}}</span>
            </div>
            <div class="operateIteam">
              <a href="#" style="text-decoration:none;"><span style="color:crimson" @click="detele(iteam.id)">删除</span></a>
            </div>
          </el-container>

        </div>
      </div>
      <div class="bottom">
        <div class="bottomInside">
          <div class="bottomSelectDiv">
            <div style="padding-top: 12px;">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"><span class="allSelectThSpan">全选</span></el-checkbox>
            </div>

          </div>
          <div class="deleteSelctDiv">
            <div style="padding-top: 11px;">
              <a href="#"><span style="color:crimson;float: left;margin-left: 15px;" @click="deleteSelect">删除选中商品</span></a>
            </div>
          </div>
          <div class="nullDiv">

          </div>
          <div class="showAllPriceDiv">
            <div class="showAllPriceSpanDiv">
              <span>总价：</span>
              <span style="color:crimson">¥{{allCount}}</span>
            </div>
          </div>

          <div class="buttonDiv">
            <el-button type="danger" style="height:96%;width:100%;" @click="gotoOrderConfirm">去结算</el-button>
          </div>

        </div>
        <div>
          <el-button type="primary" @click="returnMain">返回主页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        checked: false,
        checkAll: false,
        isIndeterminate: false,
        checkList: [],
        checkedIteams: [],
        orderList: [],
        allCount: 0.00,
        userBuyCarIteams: []
      }
    },
    methods: {
      returnMain() {
        window.location.href = "http://localhost:8081/main";
      },
      handleCheckAllChange(val) {
        this.isIndeterminate = false;
        this.checkedIteams = val ? (this.checkList) : [];
        for (var i = 0; i < this.checkedIteams.length; i++) {
          for (var q = 0; q < this.userBuyCarIteams.length; q++) {
            if (this.userBuyCarIteams[q].id == this.checkedIteams[i]) {
              this.orderList.push(this.userBuyCarIteams[q]);
            }
          }
        }
        this.doAccount();
      },
      handleCheckChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.userBuyCarIteams.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkList.length;
        for (var i = 0; i < this.checkedIteams.length; i++) {
          for (var q = 0; q < this.userBuyCarIteams.length; q++) {
            if (this.userBuyCarIteams[q].id == this.checkedIteams[i]) {
              this.orderList.push(this.userBuyCarIteams[q]);
            }
          }
        }
        this.doAccount();
      },
      doAccount() {
        this.allCount = 0.00;
        this.allCount = this.allCount * 100;

        for (var i = 0; i < this.checkedIteams.length; i++) {
          var middleAllCount = 0.00;
          for (var q = 0; q < this.userBuyCarIteams.length; q++) {
            if (this.userBuyCarIteams[q].id == this.checkedIteams[i]) {
              middleAllCount = this.userBuyCarIteams[q].subtotal;
            }
          }
          middleAllCount = middleAllCount * 100;
          this.allCount = this.allCount + middleAllCount;
        }
        this.allCount = this.allCount / 100;
        console.log(this.orderList);

      },
      //单个删除
      detele(id) {
        let _this = this;
        let buyCars = [{
          id: id
        }];
        // buyCars = qs.stringify(buyCars);
        axios({
          method: 'post',
          url: "buyCar/delete",
          data: JSON.stringify(buyCars),
          headers:
          {
            'Content-Type': 'application/json'
          }
        }).then(function (response) {
          if (response.data.code == "200") {
            window.location.reload(true);
          }
          else {
            window.alert("删除购物车失败，原因" + response.data.message);
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      deleteSelect() {
        let _this = this;

        if (_this.checkedIteams.length <= 0) {
          window.alert("你所选的为空，无法删除");
        } else {
          let params = [];
          for (var i = 0; i < _this.checkedIteams.length; i++) {
            for (var q = 0; q < _this.userBuyCarIteams.length; q++) {
              if (_this.userBuyCarIteams[q].id == _this.checkedIteams[i]) {
                params.push(_this.userBuyCarIteams[q]);
              }
            }
          }
          axios({
            method: 'post',
            url: "buyCar/delete",
            data: JSON.stringify(params),
            headers:
            {
              'Content-Type': 'application/json'
            }
          }).then(function (response) {
            if (response.data.code == "200") {
              window.location.reload(true);
            }
            else {
              window.alert("删除购物车失败，原因" + response.data.message);
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }

      },
      gotoOrderConfirm() {
        let _this = this;
        console.log(_this.orderList);
        if (_this.orderList.length <= 0) {
          window.alert("您所选为空，无法下单");
        }
        else {
          let param = _this.orderList;

          this.$router.push({
            path: '/payment',
            query: {
              orderList: param,
            },
          })

        }

      },
      initBuyCars() {
        let _this = this;
        axios({
          method: 'get',
          url: "buyCar/findBuyCarById",
          data: {
          }
        }).then(function (response) {
          if (response.data.code == "200") {
            _this.userBuyCarIteams = response.data.data
            for (var i = 0; i < _this.userBuyCarIteams.length; i++) {
              _this.checkList.push(_this.userBuyCarIteams[i].id);
            }
          }
          else {
            window.alert("获取购物车失败，原因" + response.data.message);
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      },
    },
    mounted() {

      this.initBuyCars();

    },

  }

</script>
<style scoped>
  .outDiv {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    ;
  }

  .insideDiv {
    width: 990px;
    height: 93%;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0px 3px;
  }

  .headDiv {}

  .headInsideDiv {}

  .headSpan {
    font-size: x-large;
  }

  .el-icon-shopping-cart-2 {
    font-size: 22px;
    margin: 9px;
  }


  .buyCarIteamsDiv {
    width: 100%;
    height: 100%;
  }

  .buyCarIteamDiv {
    width: 990px;
    height: 151px;
    margin-bottom: 20px;
    border-bottom-style: inset;
    border-bottom-color: #F2F6FC;
  }

  .el-divider.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 1.4px 0px;
  }

  .shopDiv {
    height: 30px;
    width: 990px;
  }

  .goodsDiv {
    border-top-style: outset;
    border-top-color: #DCDFE6;
  }

  .bottom {
    width: 990px;
    height: 96px;
  }

  .thDiv {
    width: 990px;
    height: 43px;
    margin: 0px 0px 10px;
    padding: 5px 0px;
    background: #F2F6FC;
  }

  .allSelectTh {
    width: 122px;
    height: 18px;
    line-height: 18px;
    padding-top: 7px;
    padding-left: 11px;
    float: left;
  }

  .goodsNameTh {
    height: 32px;
    width: 208px;
    float: left;
    padding-top: 4px;
    font-size: 17px;
  }

  .allSelectThSpan {
    font-size: 17px;
  }

  .specificationsTh {
    width: 170px;
    height: 32px;
  }

  .priceTh {
    width: 160px;
    height: 32px;
    float: left;
    padding-top: 4px;
    font-size: 17px;
  }

  .quantityTh {
    width: 80px;
    height: 32px;
    float: left;
    padding-top: 4px;
    font-size: 17px;
  }

  .smallCountTh {
    width: 140px;
    height: 32px;
    float: left;
    padding-top: 4px;
    font-size: 17px;
  }

  .operateTh {
    width: 75px;
    height: 32px;
    float: left;
    padding-top: 4px;
    font-size: 17px;
  }

  .goodsInfoDiv {
    border-top-style: outset;
    border-top-color: #DCDFE6;
  }

  .allSelectIteam {
    width: 121.5px;
    height: 83%;
    line-height: 18px;
    padding-top: 9px;
    padding-left: 11px;
    float: left;
  }

  .goodsNameIteam {
    width: 377.5px;
    height: 86%;
    float: left;
    padding-top: 6px;
    font-size: 17px;
  }

  .specificationsIteam {
    height: 86%;
    float: left;
    padding-top: 6px;
    font-size: 17px;
    width: 170px;
  }

  .priceIteam {
    height: 86%;
    float: left;
    padding-top: 6px;
    font-size: 17px;
    width: 160px;
  }

  .quantityIteam {
    height: 86%;
    float: left;
    padding-top: 6px;
    font-size: 17px;
    width: 80px;
  }

  .smallCountIteam {
    height: 86%;
    float: left;
    padding-top: 6px;
    font-size: 17px;
    width: 140px;
  }

  .operateIteam {
    height: 86%;
    float: left;
    padding-top: 6px;
    font-size: 17px;
    width: 75px;
  }

  .bottomInside {
    height: 50px;
    width: 990px;
    border-top-style: outset;
    border-top-color: #DCDFE6;
    border-bottom-style: inset;
    border-bottom-color: #DCDFE6;
  }

  .bottomSelectDiv {
    line-height: 18px;

    padding-left: 11px;
    float: left;
    height: 100%;
    width: 54px;
  }

  .deleteSelctDiv {
    height: 100%;
    width: 111px;
    float: left;
  }

  .showAllPriceDiv {
    height: 100%;
    float: left;
    width: 110px;
  }

  .buttonDiv {
    height: 100%;
    width: 100px;
    float: right;
    padding-top: 1px;
  }

  .nullDiv {
    height: 100%;
    width: 596px;
    float: left;
  }

  .showAllPriceSpanDiv {
    padding-top: 13px;
  }

  .topReturnButtomDiv {
    float: right;
    height: 96%;
  }
</style>