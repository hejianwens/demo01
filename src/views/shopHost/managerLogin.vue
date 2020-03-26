<template>
    <div style="height:100%" class="side">

        <el-container>
            <el-aside width="55%"></el-aside>
            <el-main style="height:600px;">
                <div style="height:400px;width:400px;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);margin-top:76px">
                    <el-tabs v-model="activeName" @tab-click="handleClick" s>
                        <el-tab-pane name="first">
                            <span slot="label" style="padding:0 76px;">登录</span>
                            <div class="loginInput" style="height:330px;width:350px;line-height:50px;padding: 22px;">
                                <div class="userLoginDiv">
                                    <span style="float:left;padding-right:7px">账号:</span>
                                    <el-input v-model="loginUser.name" placeholder="请输入账号" style="float:left;width:300px;"></el-input>
                                    <span style="float:left;padding-right:7px">密码:</span>
                                    <el-input v-model="loginUser.password" placeholder="请输入密码 " style="float:left;width:300px;" show-password></el-input>
                                </div>
                                <div class="numberCodeDiv">
                                    <div class="leftNumberCodeDiv">

                                    </div>
                                    <div class="rightNumberCodeDiv">

                                    </div>
                                </div>
                                <div style="padding-left: 42px;">
                                    <el-button type="primary" round style="padding-left:8px" @click="login">登录</el-button>
                                </div>

                            </div>
                        </el-tab-pane>
                        <el-tab-pane name="second">
                            <span slot="label" style="padding:0 76px;">注册</span>
                            <div class="registInput" style="height:250px;width:350px;line-height:50px;padding: 22px;">
                                <span style="float:left;padding-right:7px">账号:</span>
                                <el-input v-model="registUser.account" placeholder="请输入账号" style="float:left;width:300px;"></el-input>
                                <span style="float:left;padding-right:7px">密码:</span>
                                <el-input v-model="registUser.password" placeholder="请输入密码" style="float:left;width:300px;" show-password></el-input>
                                <span style="float:left;padding-right:7px">手机:</span>
                                <el-input v-model="registUser.telephone" placeholder="请输入手机" style="float:left;width:300px;"></el-input>
                                <span style="float:left;padding-right:7px">店名:</span>
                                <el-input v-model="registUser.shopName" placeholder="请输入手机" style="float:left;width:300px;"></el-input>

                                <div style="margin-top: 100px;padding-left: 42px;">
                                    <el-button type="primary" round style="padding-left:8px" @click="register">注册</el-button>
                                </div>

                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

            </el-main>
        </el-container>
    </div>
</template>

<script>
    import axios from 'axios';
    import cookie from 'vue-cookie'
    export default {
        data() {
            return {
                loginUser: {
                    name: '',
                    password: '',
                },
                registUser: {
                    account: '',
                    password: '',
                    telephone: '',
                    shopName: "",
                },

                activeIndex: '1',
                activeIndex2: '1',
                activeName: 'first'
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            login() {
                let _this = this;
                axios({
                    method: 'post',
                    url: 'shop/findShopByName',
                    data: {
                        name: _this.loginUser.name,
                        password: _this.loginUser.password,
                    }
                })
                    .then(function (response) {
                        if (response.data.code == "200") {
                            cookie.set('loginKey', response.data.data, 1);
                            window.location.href = "http://localhost:8081/manager"
                        }
                        else {
                            window.alert(response.data.message);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            register() {
                let _this = this;
                if (_this.registUser.account == "") {
                    window.alert("账号不能为空");
                    return
                }
                else if (_this.registUser.password == "") {
                    window.alert("密码不能为空");
                    return
                }
                else if (_this.registUser.telephone == "") {
                    window.alert("手机不能为空");
                    return
                }
                else if (_this.registUser.shopName == "") {
                    window.alert("店名不能为空");
                    return
                }
                else {

                    axios({
                        method: 'post',
                        url: 'shop/register',
                        data: {
                            name: _this.registUser.account,
                            password: _this.registUser.password,
                            telephone: _this.registUser.telephone,
                            shopName: _this.registUser.shopName,
                        }
                    })
                        .then(function (response) {
                            if (response.data.code == "200") {
                                window.alert("注册成功");
                                _this.registUser.account = "";
                                _this.registUser.password = "";
                                _this.registUser.telephone = "";
                                _this.registUser.shopName = "";
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
        }
    }

</script>
<style lang="scss" scoped>
    .input {
        .el-input {
            .el-input__inner {
                border-radius: 12px;
                width: 300px;
                padding-left: 10px;
            }
        }
    }

    .el-button {
        width: 300px;
    }

    .side {
        background: url('G:/background.jpg') no-repeat;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }

    .numberCodeDiv {
        height: 120px;
    }

    .userLoginDiv {
        height: 100px;
    }
</style>