<template>
    <div class='page-content'>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>foo</span>
            </div>
            <div style="display: flex;justify-content: space-between">
                <div class="some-filter">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <dateRange v-on:dateChange='dateChange' :defaultDateRange="dateRangeName"></dateRange>
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
                <div>
                    <el-button type="primary" size="small" @click="createForm">新增</el-button>
                </div>
            </div>
            <data-table :dataSource="tableDataSource" :dataModel="dataModel" :loading="loading"
                        v-on:tableAction='tableAction' v-on:tableSort="tableSort" :showCheckBox="true"
                        :defaultSort="{prop: 'date', order: 'descending'}" :expand="false"
            >
                <!--<template slot-scope="props">
                    <expand-table :dataSource="tableDataSource" :dataModel="dataModel" :loading="loading"
                                v-on:tableAction='tableAction' v-on:tableSort="tableSort"
                                :defaultSort="{prop: 'date', order: 'descending'}"
                    ></expand-table>
                </template>嵌套-->
            </data-table>
            <table-pagination :totalPage="loadDataParams.totalPage" :currentPage="loadDataParams.currentPage"
                              v-on:handleCurrentChange="handleCurrentChange"
                              v-on:handleSizeChange="handleSizeChange"
            >
            </table-pagination>
            <form-edit :dataModel="dataModel" :dialogVisible.sync="formDialogVisible" :dataSource="editingObject"
                       v-on:confirmAction="formConfirm" v-on:afterClose="afterClose" v-on:beforeClose="beforeClose"
                       :selectSource="selectSource" :editType="editType"
            >
            </form-edit>
        </el-card>
    </div>
</template>
<style>

</style>
<script>
    import mixin from '../../utils/mixin';
    import ExpandTable from './expandTable.vue';
    import dataModel from './dataModel';
    export default{
        mixins:[mixin],
        data(){
            return{
                baseUrl:'./data.json/',
                dataModel:dataModel,
                tableDataSource:[],
                filters:{selectPeople:''},
                peoples:[
                    {label:'小明',value:'xiaoming'},
                    {label:'小黄',value:'xiaohuang'}
                ],
                selectSource:{
                    actionArea:[
                        {label:'区域一',value:'shanghai'},
                        {label:'区域二',value:'xiaohuang'}
                    ],
                    students:[
                        {label:'daxun',text:'大学'},
                        {label:'gaozhong',text:'高中'}
                    ]
                }
            }
        },
        components: {
            'expand-table': ExpandTable
        },
        created:function () {
            console.log(this.$myInfo)
        },
        mounted: function () {
            this.loadFirstPage();
        },
        methods:{

        }
    }
</script>
