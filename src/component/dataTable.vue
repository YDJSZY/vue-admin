<template>
    <div class="data-table">
        <el-table
            v-loading="loading"
            border
            :data="dataSource"
            style="width: 100%"
            @sort-change="sort"
            :default-sort = "defaultSort"
            >
            <el-table-column type="expand" v-if="expand">
                <template slot-scope="props">
                    <slot :props="props">
                        只有在没有要分发的内容时才会显示。
                    </slot>
                </template>
            </el-table-column>
            <template v-for="column in dataModel">
                <el-table-column
                    v-if="column.field != 'action' && !column.render && column.show != false"
                    :fixed="column.fixed"
                    :prop="column.field"
                    :label="column.name"
                    :sortable="column.sort">
                </el-table-column>
                <el-table-column
                    v-if="column.field != 'action' && column.render && column.show != false"
                    :fixed="column.fixed"
                    :label="column.name"
                    :prop="column.field"
                    :sortable="column.sort">
                    <template slot-scope="scope">
                        <component v-bind:is="column.render" :scopeData="scope">

                        </component>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="column.field == 'action'"
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <component v-bind:is="column.action" :scopeData="scope" v-on:action='tableAction'>

                        </component>
                    </template>
                </el-table-column>
            </template>
        </el-table>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props:["dataSource","dataModel","defaultSort","loading","expand"],
        data(){
            return{

            }
        },
        created: function () {
        },
        methods:{
            tableAction: function (data) {
                this.$emit('tableAction',data)
            },

            sort: function (data) {
                this.$emit('tableSort',data)
            }
        }
    }
</script>
