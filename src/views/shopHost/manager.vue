<template>
  <div class="shopManagerDiv">
    <div class="top">
      <div class="sysImageDiv">

      </div>
    </div>
    <div class="middle">
      <div class="left">
        <el-menu :default-active="active" class="el-menu-vertical-demo" ref="menu">
          <el-menu-item :index="menu.value" v-for="menu in menus" :key="menu.value" v-on:click="selectMenu(menu)">
            <i class="el-icon-setting"></i>
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
          <el-menu-item :index="updateGoodMenus.value" :key="updateGoodMenus.value" disabled="">
            <i class="el-icon-setting"></i>
            <span slot="title">{{updateGoodMenus.name}}</span>
          </el-menu-item>
        </el-menu>

      </div>
      <div class="right">
        <shopGoods v-if="currentMenu==1" @selectUpdataGoodsMenu="selectUpdataGoodsMenu" />
        <shopOrder v-else-if="currentMenu==2" />
        <addGoods v-else-if="currentMenu==3" />
        <shopUpdateGoods v-else-if="currentMenu==5" :goodsId="goodsId" @changMenu="changMenu" />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        menus: [
          {
            name: '店铺商品',
            value: '1',
          },
          {
            name: '店铺订单',
            value: '2',
          },
          {
            name: '增加商品',
            value: '3',
          },
          {
            name: '修改商店或者账号信息',
            value: '4',
          },
        ],
        updateGoodMenus: {
          name: '更新商品',
          value: '5',
        },
        currentMenu: 1,
        active: "1",
        goodsId: 0,
      }
    },
    methods: {
      selectMenu(menu) {
        let _this = this;
        _this.currentMenu = menu.value;
        _this.active = menu.value;
      },
      selectUpdataGoodsMenu(emData) {
        let _this = this;
        _this.goodsId = emData.goodsId;

        _this.currentMenu = _this.updateGoodMenus.value;
        _this.active = "5";
      },
      changMenu(menuValue) {
        let _this = this;
        _this.currentMenu = menuValue;
        _this.active = menuValue;
      }
    },
    mounted() {

    }
  }

</script>
<style lang="scss" scoped>
  .shopManagerDiv {
    .top {
      width: 100%;
      .sysImageDiv {
        height: 100px;
      }
    }
    .middle {
      width: 100%;
      .left {
        float: left;
        width: 13%;
        .el-menu {
          height: 1000px;
        }
      }
      .right {
        width: 87%;
        float: left;
      }
    }
  }
</style>