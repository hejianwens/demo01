<template>
  <div class="outDiv">

    <div class="insideDiv">
      <div class="searchBottomDiv">
        <el-input v-model="name" placeholder="请输入内容" style="width:400px;float:left;"></el-input>
        <div style="float:left;padding-left: 7px; ">
          <el-button type="primary" icon="el-icon-search" style="width:100px" @click="searchGoodsByName">搜索</el-button>
        </div>
        <div class="buyCarDiv">
          <div class="buyCarInsideDiv">
            <i class="el-icon-shopping-cart-2" style="font-size: 20px;margin: 0px;"></i>
            <a href="http://localhost:8081/shoppingCar" target="view_window" style="font-size: 18px;text-decoration:none;color:#606266;list-style: none;">购物车</a>
          </div>
        </div>
      </div>
      <div class="goodsInfoDiv">
        <div class="imageDiv">
          <img :src="form.image" style="width:350px;height:350px">
        </div>
        <div class="infoDiv">
          <table>
            <tr>
              <div class="nameDiv">
                <span class="nameSpan">{{form.name}}</span>
              </div>
            </tr>
            <tr>
              <span class="shopNameSpan">{{form.shopName}}</span>
            </tr>
            <tr>
              <span class="priceSpan">￥{{form.price}}</span>
            </tr>
            <tr>
              <span class="soldAmountSpan">已售出:{{form.soldAmount}}件</span>
            </tr>
            <tr>
              <el-input-number v-model="form.amount" :min="1" :max="10" size="small"></el-input-number>
            </tr>
            <tr>
              <el-button type="primary" @click="addBuyCar" :disabled="addBuyCarFlag">加入购物车</el-button>
            </tr>
          </table>
        </div>
      </div>
      <div class="menuDiv">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">宝贝评价({{form.evaluateCount}})</el-menu-item>
        </el-menu>
      </div>
      <div class="rateCountDiv">
        <div class="rateCountInsideDiv">
          <span>宝贝平均评分:</span>
        </div>
        <el-rate v-model="avgEvaluate" disabled show-score text-color="#ff9900" score-template="{value}">
        </el-rate>
      </div>
      <goodsEvaluate v-if="activeIndex==1" :evaluates="evaluates" />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        name: "",
        getFlag: false,
        addBuyCarFlag: false,
        loginFlag: false,
        activeIndex: "1",
        avgEvaluate: 0,
        form: {
          id: 0,
          image: "",
          name: "",
          shopName: "",
          soldAmount: 0,
          stockAmount: 0,
          price: 0,
          amount: 1,
          evaluateCount: 0,
        },
        evaluates: [],
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        let _this = this;
        console.log(key, keyPath);
      },
      searchGoodsByName() {
        window.location.href = "http://localhost:8081/searchGoods?searchGoodsName=" + this.name + "&type=" + "byName";
      },
      getGoodsEvaluates() {
        let _this = this;
        axios({
          method: 'get',
          url: "goods/findGoodsInfoEvaluates?" + "id=" + _this.form.id,
          data: {
          }
        }).then(function (response) {
          _this.evaluates = response.data.data.evaluates;
          _this.avgEvaluate = response.data.data.avgEvaluate;
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      getGoodsInfo() {
        let _this = this;
        axios({
          method: 'get',
          url: "goods/findGoodsInfo?" + "id=" + _this.form.id,
          data: {
          }
        }).then(function (response) {
          _this.form.id = response.data.data.id
          _this.form.name = response.data.data.name;
          _this.form.image = response.data.data.image;
          _this.form.stockAmount = response.data.data.stockAmount;
          _this.form.shopName = response.data.data.shop.shopName;
          _this.form.price = response.data.data.price;
          _this.form.soldAmount = response.data.data.soldAmount;
          _this.form.evaluateCount = response.data.data.evaluateCount;
          _this.getFlag = true
        })
          .catch(function (error) {
            console.log(error);
          });
        if (_this.form.stockAmount <= 0) {
          _this.addBuyCarFlag = false;
        }
        else {
          _this.addBuyCarFlag = true;
        }
      },
      addBuyCar() {
        let _this = this;
        let loginKey = _this.$cookie.get('loginKey');
        axios({
          method: 'get',
          url: 'customer/checkCustomerLogin?loginKey=' + loginKey,
        })
          .then(function (response) {
            if (response.data.code == "200") {
              _this.loginFlag = true;
              if (_this.getFlag) {
                axios({
                  method: 'post',
                  url: "buyCar/insert",
                  data: {
                    goodsId: _this.form.id,
                    name: _this.form.name,
                    onePrice: _this.form.price,
                    amount: _this.form.amount
                  }
                }).then(function (response) {
                  if (response.data.code == "200") {
                    window.alert("添加成功");
                  }
                })
                  .catch(function (error) {
                    console.log(error);
                  });
              }
            }
            else {
              window.alert("请登录");
            }
          })
          .catch(function (error) {

          });






      },
    },
    mounted() {
      let _this = this;
      _this.form.id = _this.$route.query.id;
      _this.getGoodsInfo();
      _this.getGoodsEvaluates();
    }
  }

</script>
<style lang="scss" scoped>
  .outDiv {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .insideDiv {
      width: 70%;
      height: 100%;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0px 3px;
      .searchBottomDiv {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 70px;
        .buyCarDiv {
          width: 100px;
          height: 34px;
          border-style: groove;
          border-color: rgba(0, 0, 0, 0.27);
          margin-left: 19px;
          .buyCarInsideDiv {
            padding-left: 13px;
            padding-top: 5px;
          }
        }
      }
      .menuDiv {
        width: 84%;
        padding: 0 8%;
      }
      .rateCountDiv {
        width: 84%;
        height: 50px;
        padding: 0 8%;
        .rateCountInsideDiv {
          padding: 14px 2.5%;
          width: 15%;
          float: left;
          span {
            font-size: 25px;
          }
        }
        .el-rate {
          float: left;
          margin-top: 20px
        }
      }
      .goodsInfoDiv {
        width: 100%;
        height: 530px;
        .imageDiv {
          width: 35%;
          float: left;
          padding-top: 4%;
          padding-left: 4%;
        }
        .infoDiv {
          width: 45%;
          float: left;
          table {
            padding-top: 52px;
            tr {
              display: block;
              /*将tr设置为块体元素*/
              margin: 10px 0;
              .nameDiv {
                height: 110px;
                .nameSpan {
                  font-size: 22px;
                }
              }

              .priceSpan {
                font-size: 25px;
                color: crimson
              }
              .shopNameSpan {
                color: #2114ed;
                font-size: 20px;
              }
              .soldAmountSpan {
                font-size: 20px;
              }
            }
          }
        }
      }
    }
  }
</style>