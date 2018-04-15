<template>
    <div>
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-menu default-active="1-4-1"
                     style="overflow-y: auto"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     class="el-menu-vertical-demo" :collapse="isCollapse">
                <div style="width: 100%;height: 60px;text-align:center;color: #ffffff;line-height: 60px">
                    <h3>VUE-ADMIN</h3>
                </div>
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2">
                            <router-link to="/foo">
                                <i class="el-icon-menu"></i>
                                Foo
                            </router-link>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <router-link to="/bar">
                                <i class="el-icon-document"></i>
                                Bar
                            </router-link>
                        </el-menu-item>
                    </el-menu-item-group>
                    <!--<el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>-->
                </el-submenu>

            </el-menu>

            <el-container>
                <el-header style="font-size: 14px;line-height:60px;background:#fff;border-bottom: 1px solid #ddd">
                    <div style="float: left" @click="switchCollapse">
                        <i class="fa fa-align-justify"></i>
                    </div>
                    <div style="float: right">
                        <el-dropdown>
                            <i class="el-icon-setting" style="margin-right: 15px"></i>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>查看</el-dropdown-item>
                                <el-dropdown-item>新增</el-dropdown-item>
                                <el-dropdown-item>删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-header>

                <el-main style="margin-bottom: 60px;">
                    <router-view></router-view>
                </el-main>
                <el-footer style="position: fixed;bottom: 0;width: 100%;background: #fff;">Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
                isCollapse:false
            }
        },
        components:{

        },
        methods:{
            switchCollapse:function () {
                this.isCollapse = !this.isCollapse;
            }
        }
    }
</script>
