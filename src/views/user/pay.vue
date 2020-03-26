<template>
  <el-button type="primary" @click="apply">支付</el-button>
</template>


<script>
  import axios from 'axios';
  export default {
    components: {

    },
    data() {
      return {
        orderNumberKey: "",
      };
    },
    mounted() {
      let _this = this;
      _this.orderNumberKey = _this.$route.query.orderNumberKey;
    },
    methods: {
      apply() {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/apply?orderNumber=' + _this.orderNumberKey,
          data: {

          }
        })
          .then(function (response) {
            if (response.data.code == "200") {
              window.location.href = "http://localhost:8081/listOrder"
            }
            else {
              window.alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

</script>

<style lang="scss" scoped>

</style>