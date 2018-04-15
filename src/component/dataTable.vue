<template>
    <div class="data-table">
        <el-table
            border
            :data="dataSource"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <template v-for="column in dataModel">
                <el-table-column
                    v-if="column.field !='action'"
                    :fixed="column.fixed"
                    :prop="column.field"
                    :label="column.name"
                    :sortable="column.sort"
                >
                </el-table-column>
                <el-table-column
                    v-if="column.field == 'action'"
                    fixed="right"
                    label="操作"
                    width="100">
                    <template slot-scope="scope" >
                        <component v-bind:is="column.action" :row="scope.row" :column="scope.column" :index="scope.$index" v-on:action='tableAction'>

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
        props:["dataSource","dataModel"],
        data(){
            return{

            }
        },
        created: function () {
            console.log(this.dataSource)
        },
        methods:{
            tableAction: function (data) {
                this.$emit('tableAction',data)
            }
        }
    }
</script>
