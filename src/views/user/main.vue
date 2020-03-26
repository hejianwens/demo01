<template>
    <div class="outBox">
        <el-header style="height:10%"></el-header>
        <div style="width:100%;height:80%">
            <div class="containerLeft">
                <div class="containerLeftTop">
                    <el-input v-model="searchGoodsKey" placeholder="请输入内容" style="width:400px;float:left;"></el-input>
                    <div style="float:left;padding-left: 7px; ">
                        <el-button type="primary" icon="el-icon-search" style="width:100px" @click="searchGoodsByName">搜索</el-button>
                    </div>
                </div>
                <div class="containerLeftSecFloorLeft">
                    <ul class="goodsKindsUl">
                        <li v-for="item in goodsKinds" :key="item.value" class="goodsKindsLi">
                            <a href="#" style="text-decoration:none">
                               <span style="color:#606266;    font-size: large;" @click="queryGoodsByKind(item.value)">{{item.name}}</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="containerLeftSecFloorRight">
                    <div style="height:6%">
                        <div class="smallHeartDiv">
                            <img src="../../img/smallHeart.png" alt="" style="width:50px;height:50px">
                        </div>
                        <div class="smallHeartSpanDiv">
                            <span>猜你喜欢</span>
                        </div>
                        <div class="changRecommandDiv">
                            <el-button type="primary" v-if="isLoginFlag==true" @click="initTableList">换一批</el-button>
                            <span v-if="isLoginFlag==false">亲亲~你还没登录，请登录</span>
                        </div>
                    </div>
                    <ul class="goodsUl">
                        <li v-for="good in showlist" :key="good.id" class="goodsLi">
                            <div class="liDiv">
                                <div class="imgDiv">
                                    <a href="#" style="text-decoration:none">
                                        <img  :src="good.image" alt="" style="width:240px;height:240px"  @click="openInfoVue(good.id)">
                                    </a>
                                </div>
                                <div class="priceDiv">
                                    <span style="color:crimson">¥{{good.price}}</span>
                                </div>
                                <div class="nameDiv">
                                    <a href="#" style="text-decoration:none">
                                       <span style="word-break:break-all;color:#606266;" @click="openInfoVue(good.id)">{{good.name}}</span>
                                   </a>

                                </div>
                                <div class="shopDiv" style="width: 100%;height: 25px;">
                                    <div class="shopSpanDiv">
                                        <span style="font-size: large;">{{good.shop.shopName}}</span>
                                    </div>
                                    <div class="evaDiv">
                                        <span style="font-size: large;">{{good.evaluateCount}}条评价</span>
                                    </div>

                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="containerLeftSecFloorRightBottom">

                    </div>

                </div>
            </div>

            <div class="secondFloorRight">
                <el-col :span="12" style="width: 152px">
                    <div class="userDiv">
                        <div class="userImageDiv">
                            <el-avatar :size="60" src="">
                                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                            </el-avatar>
                        </div>
                        <div style="margin-top: 3px;">
                            <span v-if="isLoginFlag==false" style="padding-left: 40px;color:#606266;">请</span>
                            <a v-if="isLoginFlag==false" href="http://localhost:8081/login" style="padding-left: 2px;color:#f56c6c;">登录!</a>
                            <span v-if="isLoginFlag==true" style="color:#606266;">Hi~欢迎{{customerNickName}}用户！</span>

                        </div>
                        <a href="#"><span v-if="isLoginFlag==true" style="padding-left: 40px;color:#f56c6c;" @click="outLogin">退出登录</span></a>
                    </div>
                    <div class="userFuctionDiv">
                        <ul class="userFuctionUl">
                            <li index="order" style="list-style: none">
                                <div class="order">
                                    <i class="el-icon-tickets" style="font-size: 18px;"></i>
                                    <a href="http://localhost:8081/listOrder" style="font-size: 18px;text-decoration:none;color:#606266;list-style: none;">查看订单</a>
                                </div>
                            </li>
                            <li index="buyCar" style="list-style: none;margin-top: 7px;">
                                <div class="buyCar">
                                    <i class="el-icon-shopping-cart-2" style="font-size: 20px;margin: 0px;"></i>
                                    <a href="http://localhost:8081/car" target="view_window" style="font-size: 18px;text-decoration:none;color:#606266;list-style: none;">购物车</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </el-col>
            </div>
        </div>

        <el-footer style="height:10%">
            <div>

            </div>
        </el-footer>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                type: "customer",
                showlist: [],
                searchGoodsKey: '',
                goodsKinds: [],
                isLoginFlag: false,
                customerNickName: "",
                outHref: "",
            }
        },
        methods: {
            openInfoVue(idValue) {
                let _this = this;
                if (_this.type == "customer") {

                    window.open("http://localhost:8081/info?id=" + idValue);
                }
                else if (_this.type == "shopHost") {
                    let emData = {
                        goodsId: idValue,
                    }
                    this.$emit("selectUpdataGoodsMenu", emData);

                }
            },
            outLogin() {
                let _this = this;
                let key = _this.$cookie.get('loginKey');
                axios({
                    method: 'get',
                    url: 'customer/outLogin?loginKey=' + key,
                })
                    .then(function (response) {
                        if (response.data.code == "200") {
                            _this.isLoginFlag = false;
                            _this.showlist = null;
                            _this.$cookie.remove(key);
                        }
                    })
                    .catch(function (error) {
                    });

            },
            checkLogin() {
                let _this = this;
                let key = _this.$cookie.get('loginKey');
                axios({
                    method: 'get',
                    url: 'customer/checkCustomerLogin?loginKey=' + key,
                })
                    .then(function (response) {
                        if (response.data.code == "200") {
                            _this.customerNickName = response.data.data;
                            _this.initTableList();
                        }
                        else {
                            window.alert(response.data.message);
                        }
                    })
                    .catch(function (error) {
                    });



            },
            initTableList() {
                let _this = this;
                _this.isLoginFlag = true;
                axios({
                    method: 'get',
                    url: 'recommendGoods/getRecommendGoods',
                    data: {

                    }
                })
                    .then(function (response) {
                        _this.showlist = response.data.data;
                        console.log(_this.showlist);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            },
            queryGoodsByKind(goodsKind) {
                let _this = this;
                _this.type = "byGoodsKind"

                window.open("http://localhost:8081/searchGoods?gooosKind=" + goodsKind + "&type=" + _this.type);
            },
            searchGoodsByName() {
                let _this = this;
                _this.type = "byGoodsName";
                if (this.searchGoodsKey == '') {
                    alert("对不起,您输入的搜索信息为空,请输入正确信息");
                }
                else {
                    window.open("http://localhost:8081/searchGoods?searchGoodsName=" + this.searchGoodsKey + "&type=" + _this.type);
                }

            },
            changRecommand() {

            },
            getGoodsKinds() {
                let _this = this;
                axios({
                    method: 'get',
                    url: 'goods/getGoodKinds',
                    data: {

                    }
                }).then(function (response) {
                    _this.goodsKinds = response.data.data
                    console.log(_this.goodsKinds);
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },



        },
        mounted() {
            let _this = this;
            _this.getGoodsKinds();
            _this.checkLogin();


        },


    }

</script>
<style lang="scss" scoped>
    .outBox {
        background: url('G:/mainBackGround3.jpg') no-repeat;
        overflow: hidden;
        background-size: cover;
        height: 1400px;
    }

    .el-header {
        height: 10%;
    }

    .el-container {
        height: 80%;
        width: 100%;
    }

    .containerLeft {
        float: left;
        width: 90%;
        height: 100%;
    }

    .containerLeftTop {
        width: 100%;
        float: left;
        height: 75.6px;
        padding-left: 35%
    }

    .containerLeftSecFloorLeft {
        width: 12%;
        float: left;
        margin: 0px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        height: 1000px;
        padding-left: 8px;
        padding: 12px;
    }

    .goodsKindsUl {
        margin: 0px;
        padding-left: 9px;
    }

    .goodsKindsLi {
        list-style: none;
        margin: 5px
    }

    .containerLeftSecFloorRight {
        height: 1023px;
        float: left;
        width: 82%;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, .12), 2px 0 6px rgba(0, 0, 0, .04);
        margin-top: 0px;
        margin-left: 45px;
    }

    .recommendGoodsUl {
        height: 1000px;
        margin: 4px
    }

    .recommendGoodsLi {
        float: left;
        list-style: none;
        width: 240px;
        margin: 5px;
        height: 450px;
    }

    .secondFloorRight {
        height: 1023px;
        padding: 0px;
        float: left;
        width: 8%;
        margin-top: 75px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    }

    .userImageDiv {
        width: 69%;
        margin-top: 10px;
        position: relative;
        padding-left: 36px;
        height: 60%;
    }

    .userDiv {
        height: 20%;
        margin-left: 10px;
    }

    .userFuctionDiv {
        width: 139px;
        margin-top: 11px;
    }

    .userFuctionUl {
        padding-left: 34px;
    }

    .liDiv {
        padding: 38px 9px 10px;
        width: 100%;
        height: 100%;
    }

    .imgDiv {
        width: 240px;
        height: 240px;
    }

    .priceDiv {
        position: relative;
        line-height: 22px;
        height: 22px;
        overflow: hidden;
        width: 100%;
        margin: 0 0 8px;
    }

    .nameDiv {
        height: 60px;
        width: 100%;
    }

    .shopDiv {
        width: 100%;
        height: 25px;
    }

    .liBottom {
        width: 100%;
        height: 27px;
    }

    .smallHeartDiv {
        float: left;
        width: 50px;
        height: 50px;
    }

    .smallHeartSpanDiv {
        width: 64px;
        height: 21px;
        float: left;

        margin-top: 12px;
    }

    .changRecommandDiv {
        float: right;
        margin: 10px;
    }

    .goodsUl {
        .goodsLi {
            float: left;
            list-style: none;
            width: 240px;
            margin: 5px;
            height: 450px;
            .imgDiv {
                width: 240px;
                height: 240px;
            }
            .priceDiv {
                position: relative;
                line-height: 22px;
                height: 22px;
                overflow: hidden;
                width: 100%;
                margin: 0 0 8px;
            }
            .nameDiv {
                height: 105px;
                width: 100%;
            }
            .shopDiv {
                width: 100%;
                height: 25px;
                .shopSpanDiv {
                    float: left;
                }
                .evaDiv {
                    float: right;
                }
            }
        }
    }
</style>