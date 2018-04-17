<template>
    <div>
        <el-dialog
                title="提示"
                :visible="dialogVisible"
                width="30%"
                @close="afterClose"
                :before-close="beforeClose">
            <el-form :inline="true">
                <el-form-item label="活动名称">
                    <el-input  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动名称">
                    <el-input  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeDialog">取 消</el-button>
                <el-button type="primary" @click="confirmAction">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style>

</style>
<script>
    export default{
        props:['dataModel','dialogVisible'],

        data(){
            return{

            }
        },

        components:{

        },

        methods:{
            confirmAction: function () {
                this.$emit('confirmAction')
            },

            formCancel: function () {
                this.$emit('formCancel')
            },

            beforeClose: function (done) {
                this.$emit('beforeClose',done)
            },

            closeDialog: function () {
                this.$emit('update:dialogVisible', false)
            },

            afterClose: function () {
                this.$emit('afterClose')
            }
        },

        mounted: function () {

        }
    }
</script>
