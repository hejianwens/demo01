<template>
    <div class="goodListDiv">
        <ul class="goodsUl">
            <li v-for="good in tableList" :key="good.id" class="goodsLi">
                <div class="liDiv">
                    <div class="imgDiv">
                        <a v-if="type=='customer'" href="#" style="text-decoration:none" target="view_window">
                         <img  :src="good.image" alt="" style="width:240px;height:240px"  @click="openInfoVue(good.id)">
                       </a>
                        <a v-if="type=='shopHost'" href="#" style="text-decoration:none">
                         <img  :src="good.image" alt="" style="width:240px;height:240px"  @click="openInfoVue(good.id)">
                       </a>
                    </div>
                    <div class="priceDiv">
                        <span style="color:crimson">¥{{good.price}}</span>
                    </div>
                    <div class="nameDiv">
                        <a v-if="type=='customer'" href="#" style="text-decoration:none" target="view_window">
                           <span style="word-break:break-all;color:#606266;" @click="openInfoVue(good.id)">{{good.name}}</span>
                        </a>
                        <a v-if="type=='shopHost'" href="#" style="text-decoration:none">
                           <span style="word-break:break-all;color:#606266;" @click="openInfoVue(good.id)">{{good.name}}</span>
                         </a>
                    </div>
                    <div v-if="type=='customer'" class="shopDiv" style="width: 100%;height: 25px;">
                        <div class="shopSpanDiv">
                            <span style="font-size: large;">{{good.shop.shopName}}</span>
                        </div>
                        <div class="evaDiv">
                            <span style="font-size: large;">{{good.evaluateCount}}条评价</span>
                        </div>

                    </div>
                    <div v-if="type=='shopHost'" class="shopDiv" style="width: 100%;height: 25px;">
                        <div class="shopSpanDiv">
                            <span style="font-size: large;">库存:{{good.stockAmount}}件</span>
                        </div>
                        <div class="evaDiv">
                            <span style="font-size: large;">已售出:{{good.soldAmount}}件</span>
                        </div>

                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'goodsUl',
        props: ["tableList", "type"],
        components: {
        },
        data() {
            return {

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
        },
        mounted() {

        }
    }

</script>

<style lang="scss" scoped>
    .goodListDiv {
        width: 100%;
        height: 1000px;
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
        .pageDiv {
            width: 100%;
            height: 80px;
        }
    }
</style>