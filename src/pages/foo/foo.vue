<template>
    <div class='page-content'>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>foo</span>
            </div>
            <div class="some-filter">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <dateRange v-on:dateChange='dateChange'></dateRange>
                    </el-form-item>
                    <el-form-item>
                        <el-input size="small" type='text' placeholder="搜索" @clear="searchData" @keyup.enter.native="searchData" v-model="searchKeyWord" clearable>
                            <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-select clearable filterable v-model="filters.selectPeople" size="small" placeholder="请选择">
                            <el-option
                                    v-for="item in peoples"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <data-table :dataSource="dataSource" :dataModel="dataModel" v-on:tableAction='tableAction'></data-table>
        </el-card>
    </div>
</template>
<style>

</style>
<script>
    import mixin from '../../utils/mixin';
    import dataModel from './dataModel';
    export default{
        mixins:[mixin],
        data(){
            return{
                dataModel:dataModel,
                dataSource:[
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                filters:{selectPeople:''},
                peoples:[
                    {label:'小明',value:'xiaoming'},
                    {label:'小黄',value:'xiaohuang'}
                ]
            }
        },
        components:{

        },
        created:function () {

        },
        methods:{
            tableAction: function (actions) {
                let actionName = actions.actionName;
                this[actionName](actions)
            },

            editTable: function (data) {
                console.log(data.row.address)
            }

        }
    }
</script>
