<template>
  <div class="outDiv">
    <div class="insideDiv">
      <div class="searchOutDiv">
        <el-input v-model="name" placeholder="请输入内容" style="width:400px;float:left;"></el-input>
        <div style="float:left;padding-left: 7px; ">
          <el-button type="primary" icon="el-icon-search" style="width:100px" @click="getGoodsList">搜索</el-button>
        </div>
      </div>
      <div class="goodsLiDiv">
        <goodsUl :tableList="tableList" :type="type" @selectUpdataGoodsMenu="selectUpdataGoodsMenu" />
        <div class="pageDiv">
          <el-pagination :page-size="form.rows" :current-page="form.page" layout="total, prev, pager, next, jumper" :total="tableData.totalSize"
            :small="size == 'small'|| size == 'mini'" :hide-on-single-page="hiddenFlag" @current-change="pageChange"></el-pagination>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {

    name: 'shopGoods',
    props: ["url"],
    components: {

    },
    data() {
      return {
        name: "",
        type: "shopHost",
        hiddenFlag: true,
        size: "small",
        tableList: {},
        tableData: {},
        pageSizes: 10,
        form: {
          page: 1,
          rows: 12,
        },
      }
    },
    methods: {
      pageChange(currentPage) {
        let _this = this;
        _this.form.page = currentPage;
        _this.getGoodsList();
      },
      selectUpdataGoodsMenu(emData) {
        let _this = this;
        _this.$emit('selectUpdataGoodsMenu', emData);
      },
      getGoodsList() {
        let _this = this;
        if (_this.name != null) {
          axios({
            method: 'get',
            url: "goods/findGoodsListByShopHost?" + "page=" + _this.form.page + "&rows=" + _this.form.rows + "&name=" + _this.name,
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
          window.alert("您输入的商品名字为空")
        }

      }
    },
    mounted() {
      this.getGoodsList();
    }
  }

</script>

<style lang="scss" scoped>
  .outDiv {
    .insideDiv {
      width: 100%;
      .searchOutDiv {
        float: left;
        width: 99%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .goodsLiDiv {
        float: left;
        width: 99%
      }
      .pageDiv {
        width: 99%;
        height: 50px;
      }
    }
  }
</style>