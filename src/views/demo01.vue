<template>
    <el-container style="height:100%;background-color:#F2F6FC">
        <el-header style="height:12%">Header</el-header>
        <el-container style="height:76%">
            <el-aside width="15%" style="background-color: rgb(84, 92, 100);">
                <div>
                    <el-col :span="12" style="width: 100%">
                        <el-menu default-active="2" class="el-menu-vertical-demo" @select="selectIndex" @open="handleOpen" @close="handleClose" background-color="#545c64"
                            text-color="#fff" active-text-color="#ffd04b">
                            <el-submenu index="导航一">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>导航一</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="导航一一" v-on:click="index11">选项1</el-menu-item>
                                    <el-menu-item index="导航一二" v-on:click="index12">选项2</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>

                            <el-menu-item :index="item.menu" v-for="item in menus" :key="item.menu" v-on:click="showIndex(item)">
                                <i class="el-icon-setting"></i>
                                <span slot="title">{{item.menu}}</span>
                            </el-menu-item>

                        </el-menu>
                    </el-col>
                </div>
            </el-aside>
            <el-container>
                <el-main style="padding: 0px;background-color:#FFFFFF">
                    <div>
                        <el-row style="height:10%">
                            <el-button type="primary" plain style="margin: 6px;" @click="selectAllIteam(pageData)">全选</el-button>
                            <el-button type="danger" plain style="margin: 6px;" @click="deleteIteams">删除</el-button>
                        </el-row>
                        <el-row>
                            <el-table ref="multipleTable" :data="pageData" tooltip-effect="dark" style="width: 100%" height="400" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="id" label="编号" width="120">
                                </el-table-column>
                                <el-table-column label="日期" width="120">
                                    <template slot-scope="scope">{{ scope.row.date }}</template>
                                </el-table-column>
                                <el-table-column prop="name" label="姓名" width="120">
                                </el-table-column>
                                <el-table-column prop="address" label="地址" show-overflow-tooltip>
                                </el-table-column>
                            </el-table>
                        </el-row>
                        <el-row>
                            <div class="block">
                                <el-pagination layout="prev, pager, next" :total="tableData.length" :page-size="6" @current-change="dividePage" style="float:right;padding: 2px 50px;">
                                </el-pagination>
                            </div>
                        </el-row>
                    </div>
                </el-main>
            </el-container>

        </el-container>
        <el-footer style="height:12%">Footer</el-footer>
    </el-container>

</template>

<script>
    export default {
        methods: {

            selectIndex(index, indexPath) {
                console.log(index, indexPath);
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            
            //
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //这是导航条需要的函数
            index11() {
                alert("导航1-1")
            },
            index12() {
                alert("导航1-2")
            },
            showIndex(index) {
                alert(index.menu)
            },
            //这是分页时候把数组分组函数，供mounted函数使用
            dividePage(currentPage) {
                this.currentPage = currentPage;
                let startIndex = (currentPage - 1) * this.pageSize;
                let endIndex = startIndex + this.pageSize;
                
                this.pageData = this.tableData.slice(startIndex, endIndex);
                console.log(startIndex,endIndex)
                
              
            },
            selectAllIteam(rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            },

            //删除选中行
            deleteIteams() {
                let _this = this;
                this.multipleSelection.forEach(function (ele, index) {
                    let tableIndex = _this.tableData.indexOf(ele)
                    _this.tableData.splice(tableIndex, 1)
                })
            
                this.dividePage(this.currentPage);    
                if(this.pageData.length==0&&this.tableData.length!=0){
                    _this.currentPage=_this.currentPage-1;
                    _this.dividePage(_this.currentPage);
                }            
            }

        },
        mounted() {
            this.dividePage(this.currentPage);

        },
        data() {
            return {
                pageData: [],
                pageSize: 6,
                currentPage: 1,
                tableData: [
                    {
                        id: 1,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 2,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 3,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 4,
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 5,
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 6,
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 7,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 8,
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 9,
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 10,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 11,
                        date: '2016-05-08',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 12,
                        date: '2016-05-06',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 13,
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        id: 14,
                        date: '2016-05-07',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        id: 15,
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                ],
                menus: [
                    {
                        'menu': '导航2'
                    },
                    {
                        'menu': '导航3'
                    },
                    {
                        'menu': '导航4'
                    },
                    {
                        'menu': '导航5'
                    }
                ]
            }
        }


    }

</script>