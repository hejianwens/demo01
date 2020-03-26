<template>
  <div class="addGoodsDiv">
    <form ref="goodsForm" action="" enctype="multipart/form-data">
      <el-form :model="form" :rules="rules" ref="form" label-position="right" label-width="150px">
        <table>
          <tr>
            <el-form-item label="商品图片：" prop="image">
              <input type="file" ref="fileInput" @change="fileChange" name="file" accept="image/*" />
            </el-form-item>

          </tr>
          <img id="img" :src="src" class="goodsImg">
          <tr>
            <el-form-item label="商品名称：" prop="name">
              <el-input v-model="form.name" placeholder="--请输入--" size="small"></el-input>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item label="商品价格(元)：" prop="price">
              <el-input v-model="form.price" placeholder="--请输入--" size="small"></el-input>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item label="库存数量(件)：" prop="stockAmount">
              <el-input v-model="form.stockAmount" placeholder="--请输入--" size="small"></el-input>
            </el-form-item>
          </tr>
          <tr>
            <el-form-item label="商品类别：" prop="price">
              <el-select v-model="form.kind" placeholder="--请选择--" size="small" :clearable="true" style="width:300px">
                <el-option v-for="item in kinds" :key="item.value" :label="item.name" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </tr>


        </table>

      </el-form>

      <div class="btnCss">
        <el-button type="primary" size="small" @click="save">保存</el-button>
      </div>
    </form>
  </div>

</template>

<script>
  import axios from 'axios';
  export default {

    name: 'addGoods',
    props: ["url"],
    components: {


    },
    data() {
      return {
        form: {
          name: "",
          price: 0.00,
          stockAmount: 0,
          kind: "",
        },
        src: "",
        kinds: [],
        file: [],
        fileFlag: false,
        rules: {

        },
      }
    },
    methods: {
      initKinds() {
        let _this = this;
        axios({
          method: 'get',
          url: 'goods/getGoodKinds',
          data: {
          }
        })
          .then(function (response) {

            _this.kinds = response.data.data

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      fileChange(e) {
        let _this = this;
        let reader = new FileReader();
        let img = document.getElementById('img');

        if (e.target.files.length) {
          if (e.target.files.length == 1) {
            _this.fileFlag = true;
            _this.file = e.target.files;
            reader.onload = function (evt) {
              img.width = "300";
              img.height = "300";
              img.src = evt.target.result;
            }
            reader.readAsDataURL(e.target.files[0]);
          }
          else {
            window.alert("不能选择多张图片");
          }
        }
      },
      save() {
        let _this = this;
        let param = new FormData();
        let resFileNmae;
        if (_this.fileFlag) {
          let file = _this.file[0];
          param.append('file', file);
          const instance = axios.create({
            withCredentials: true
          })
          instance.post("goods/uploadImage", param)
            .then(function (response) {
              if (response.data.code == "200") {
                let resFilePath = response.data.data;
                console.log(resFilePath)
                console.log(response)
                //调用增加商品服务
                axios({
                  method: 'post',
                  url: 'goods/insert',
                  data: {
                    name: _this.form.name,
                    price: _this.form.price,
                    stockAmount: _this.form.stockAmount,
                    kind: _this.form.kind,
                    image: resFilePath
                  }
                }).then(function (response) {
                  if (response.data.code == "200") {
                    window.alert("增加成功");
                    _this.form.name = "";
                    _this.form.price = 0;
                    _this.form.stockAmount = 0;
                    _this.form.kind = "";
                    _this.$refs.fileInput.file = null;
                    img.src = null;
                    _this.file[0] = null;
                  }
                  else {
                    window.alert("请求增加商品失败,插入数据库异常,原因:" + response.data.message);
                  }
                })
              }
              else {
                window.alert("请求增加商品失败,因为上传图片失败,具体原因:" + response.data.message);
              }
            }).catch(function (error) {
              console.log(error);
              window.alert("请求失败");
            });
        } else {
          window.alert("未上传图片");
        }
      },
    },
    mounted() {
      let _this = this;
      _this.initKinds();

    }
  }

</script>

<style lang="scss" scoped>
  .addGoodsDiv {
    .goodsImg {
      margin-left: 32.5%;
      width: 300px;
      height: 300px;
    }
    .btnCss {
      margin-left: 10.5%;
    }
    .el-form {
      table {
        tr {
          height: 70px;
          .el-form-item {
            margin-bottom: 5px;
          }
          .el-input {
            width: 300px;
          }
        }
      }
    }
  }
</style>
<style>
  .el-form-item__content {
    line-height: 25px;
  }
</style>