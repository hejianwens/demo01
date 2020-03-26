<template>
  <el-button type="primary" @click="refund">支付</el-button>
</template>


<script>
  import axios from 'axios';
  export default {

    components: {

    },
    data() {
      return {
        orderNumber: "",
        orderItemId: 0,
      };
    },
    mounted() {
      let _this = this;
      _this.orderNumber = _this.$route.query.orderNumber;
      _this.orderItemId = _this.$route.query.orderItemId;
    },
    methods: {
      refund() {
        let _this = this;
        axios({
          method: 'get',
          url: 'order/refund?orderNumber=' + _this.orderNumber + "&orderItemId=" + _this.orderItemId,
          data: {
          }
        })
          .then(function (response) {
            if (response.data.code == "200") {
              history.go(-1);
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