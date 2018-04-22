<template>
    <div class="data-table">
        <el-table
            highlight-current-row
            v-loading="loading"
            border
            :data="dataSource"
            style="width: 100%"
            @sort-change="sort"
            :default-sort = "defaultSort"
            @selection-change="handleSelectionChange"
            >
            <el-table-column v-if="showCheckBox"
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column type="expand" v-if="expand">
                <template slot-scope="props">
                    <slot :props="props">
                        表格嵌套
                    </slot>
                </template>
            </el-table-column>
            <template v-for="column in dataModel">
                <el-table-column
                    v-if="column.field != 'action' && !column.render && column.show != false"
                    :fixed="column.fixed"
                    :prop="column.field"
                    :label="column.name"
                    :width="column.width"
                    :show-overflow-tooltip="column.tooltip"
                    :sortable="column.sort">
                </el-table-column>
                <el-table-column
                    v-if="column.field != 'action' && column.render && column.show != false"
                    :fixed="column.fixed"
                    :label="column.name"
                    :prop="column.field"
                    :width="column.width"
                    :sortable="column.sort">
                    <template slot-scope="scope">
                        <component v-bind:is="column.render" :scopeData="scope">

                        </component>
                    </template>
                </el-table-column>
                <el-table-column
                    v-if="column.field == 'action'"
                    label="操作"
                    fixed="right"
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
        props:["dataSource", "dataModel", "defaultSort", "loading", "expand", "showCheckBox"],
        data(){
            return{

            }
        },
        created: function () {
        },
        methods:{
            tableAction (data) {
                this.$emit('tableAction', data)
            },

            sort (data) {
                this.$emit('tableSort', data)
            },

            handleSelectionChange (val) {
                this.$emit('handleSelectionChange', val)
            }
        }
    }
</script>
