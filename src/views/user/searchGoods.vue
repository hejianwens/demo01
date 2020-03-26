<template>
  <div class="searchOutDiv">

    <div class="searchInsideDiv">
      <div class="searchBottomDiv">
        <div>
          <el-input v-model="name" placeholder="请输入内容" style="width:400px;float:left;"></el-input>
          <div style="float:left;padding-left: 7px; ">
            <el-button type="primary" icon="el-icon-search" style="width:100px" @click="getGoodsList">搜索</el-button>
          </div>
        </div>
        <div class="buyCarDiv">
          <div class="buyCarInsideDiv">
            <i class="el-icon-shopping-cart-2" style="font-size: 20px;margin: 0px;"></i>
            <a href="http://localhost:8081/shoppingCar" target="view_window" style="font-size: 18px;text-decoration:none;color:#606266;list-style: none;">购物车</a>
          </div>
        </div>
      </div>
      <goodsUl :tableList="tableList" :type="type" />
     
      <div class="pageDiv">
        <el-pagination :page-size="form.rows" :current-page="form.page" layout="total, prev, pager, next, jumper" :total="tableData.totalSize"
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
        kind: "",
        name: "",
        size: "small",
        hiddenFlag: true,
        goodsName: "",
        type: "customer",
        tableList: {},
        tableData: {},
        pageSizes: 10,
        form: {
          page: 1,
          rows: 10
        },


      }
    },
    methods: {
      pageChange(currentPage) {
        let _this = this;
        _this.form.page = currentPage;
        _this.getGoodsList();
      },
      openInfoVue(idValue) {
        window.open("http://localhost:8081/info?id=" + idValue);
      },
      getGoodsList() {
        let _this = this;
        if (_this.name != null) {
          axios({
            method: 'get',
            url: "goods/findGoodsListByName?" + "page=" + _this.form.page + "&rows=" + _this.form.rows + "&name=" + _this.name,
            data: {
              page: _this.form.page,
              rows: _this.form.rows,
              name: _this.name
            }
          }).then(function (response) {
            _this.tableData = response.data.data;
            _this.tableList = _this.tableData.content;
          })
            .catch(function (error) {
              console.log(error);
            });
        }
        else {

          axios({
            method: 'get',
            url: "goods/findGoodsListByKind?" + "page=" + _this.form.page + "&rows=" + _this.form.rows + "&kind=" + _this.kind,
            data: {
              page: _this.form.page,
              rows: _this.form.rows,
              kind: _this.kind
            }
          }).then(function (response) {
            _this.tableData = response.data.data;
            _this.tableList = _this.tableData.content;
          })
            .catch(function (error) {
              console.log(error);
            });
        }
      }
    },
    mounted() {
      let _this = this;
      _this.name = _this.$route.query.searchGoodsName;
      _this.kind = _this.$route.query.gooosKind;
      _this.getGoodsList();
    }
  }

</script>
<style lang="scss" scoped>
  .searchOutDiv {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .searchInsideDiv {
    width: 70%;
    height: 100%;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 9px 0px, rgba(0, 0, 0, 0.04) 0px 0px 3px;
  }

  .goodListDiv {
    width: 100%;
  }

  .searchBottomDiv {
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

    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
  }
</style>