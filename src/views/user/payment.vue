<template>
    <div class="outSideDiv">
        <div class="middleDiv">
            <div class="infoDiv">
                <div class="consigneeInfoDiv">
                    <div class="consigneeSpandiv"><span>收货人信息</span></div>
                    <div>
                        <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="150px">
                            <table>
                                <tr>
                                    <el-form-item label="收货人名字:" prop="name">
                                        <el-input v-model="form.receiverName" placeholder="--请输入--" size="small"></el-input>
                                    </el-form-item>
                                </tr>
                                <tr>
                                    <el-form-item label="收货人手机:" prop="price">
                                        <el-input v-model="form.receiverTelephone" placeholder="--请输入--" size="small"></el-input>
                                    </el-form-item>
                                </tr>
                                <tr>
                                    <el-form-item label="收获地址" prop="stockAmount">
                                        <el-input v-model="form.receiverAddress" placeholder="--请输入--" size="small"></el-input>
                                    </el-form-item>
                                </tr>
                            </table>
                        </el-form>
                    </div>
                </div>
                <div class="paymentMethodDiv">
                    <div class="paymentMethodSpanDiv"><span>支付方法</span></div>
                </div>
                <div class="goodsListDiv">
                    <el-table :data="orderList" style="width: 100%" :border="false" size="small">
                        <template v-for="(item,key) in tableThs">
                            <el-table-column v-if="key=='image'" :prop="key" :label="item" align="center" width="100" height="100">
                                <template slot-scope="{ row, column, $index }">
                                    <div class="imageDiv">
                                        <img :src="orderList[$index].goods.image" style="width:80px;height:80px">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column v-else-if="key=='name'" :prop="key" :label="item" align="center" width="560">
                                <template slot-scope="{ row, column, $index }">
                                    <span>{{orderList[$index].goods.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-else :prop="key" :label="item" align="center" width="240">
                            </el-table-column>
                            <el-table-column v-else :prop="key" :label="item" align="center" width="240">
                            </el-table-column>
                        </template>
                    </el-table>
                </div>
            </div>
            <div class="bottomDiv">
                <div class="showAllPriceDiv">
                    <div class="showAllPriceSpanDiv">
                        <span>总价：</span>
                        <span style="color:crimson">¥{{allCount}}</span>
                    </div>
                </div>

                <div class="buttonDiv">
                    <el-button type="danger" style="margin-left: 15px;" @click="createOrder">购买</el-button>
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
                allCount: 0.00,
                tableThs: {
                    image: '图片',
                    name: '商品',
                    amount: '数量',
                    subtotal: '小计',
                },
                form: {
                    receiverName: "",
                    receiverTelephone: "",
                    receiverAddress: "",
                },
                rules: {

                },

                orderList: [],
            }

        },
        methods: {
            addAll() {
                let _this = this;
                for (let i = 0; i < _this.orderList.length; i++) {
                    _this.allCount = _this.orderList[i].subtotal * 100 + _this.allCount;
                }
                _this.allCount = _this.allCount / 100;
            },
            createOrder() {
                let _this = this;
                let receiveCreateOrderParams = {
                    buyCars: _this.orderList,
                    receiverName: _this.form.receiverName,
                    receiverTelephone: _this.form.receiverTelephone,
                    receiverAddress: _this.form.receiverAddress,
                }
                axios({
                    method: 'post',
                    url: "order/createOrder",
                    data: {
                        buyCars: _this.orderList,
                        receiverName: _this.form.receiverName,
                        receiverTelephone: _this.form.receiverTelephone,
                        receiverAddress: _this.form.receiverAddress,
                    }
                    ,
                    headers:
                    {
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    if (response.data.code == 200) {
                        window.location.href = "http://localhost:8081/pay?orderNumberKey=" + response.data.data;
                    } else {
                        window.alert("下单失败，原因:" + response.data.message);
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
        mounted() {

            let _this = this;
            _this.orderList = _this.$route.query.orderList;
            console.log(_this.orderList)
            _this.addAll();


        }
    }

</script>

<style lang="scss" scoped>
    .outSideDiv {
        width: 60%;
        padding: 0 20%;
    }

    .middleDiv {
        width: 100%;
    }

    .infoDiv {
        width: 100%;
        height: 80%;
        .consigneeInfoDiv {
            width: 100%;
            height: 270px;
            .consigneeSpandiv {
                padding: 16px;
                border-bottom-style: inset;
                border-bottom-color: #F2F6FC;
            }
        }
        .paymentMethodDiv {
            width: 100%;
            height: 120px;
            .paymentMethodSpanDiv {
                padding: 16px;
                border-bottom-style: inset;
                border-bottom-color: #F2F6FC;
            }
        }
        .goodsListDiv {
            width: 100%;
        }
    }

    .bottomDiv {
        width: 100%;
        height: 56px;

        .showAllPriceDiv {
            height: 56px;
            margin-left: 920px;
            width: 110px;
            .showAllPriceSpanDiv {}
        }
        .buttonDiv {
            height: 56px;
            width: 100px;

            padding-top: 1px;
        }
    }
</style>