import axios from 'axios';
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      let loginKey = _this.$cookie.get('loginKey');
      if (loginKey != null) {
        config.headers.token = loginKey;
      }

    }
    return config;
  },
  err => {
    return Promise.reject(err);
  });