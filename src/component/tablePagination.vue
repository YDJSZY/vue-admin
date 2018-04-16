<template>
    <div class="pagination-msg" style="padding: 15px 0 0;text-align: right">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage || 1"
                :page-sizes="[20, 50, 100, 200]"
                :page-size="pageSize || 20"
                background
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage || 1">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        props:['pageSize','totalPage','currentPage'],
        data:function () {
            return {

            }
        },
        methods:{
            handleCurrentChange: function (currentPage) {
                this.$emit("handleCurrentChange",currentPage)
            },

            handleSizeChange: function (pageSize) {
                this.$emit("handleSizeChange",pageSize)
            }
        }
    }
</script>