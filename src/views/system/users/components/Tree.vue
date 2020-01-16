<template>
  <div>
    <el-table :data="list" border height="250px" stripe size="mini" :highlight-current-row="true" >
      <el-table-column align="center" type="selection"></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
        v-if="t.default!=undefined?t.default:true"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {getSysMenuTree, getRoleMenu} from "@/api/system/permissions";

    export default {
        props: {
            //是否自适应宽度，不自适应宽度默认为120px
            selfAdaption: {
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                activeName: 'first',
                platformData: [],
                clientDdata: [],
                filterText: "",
                Checkeds:[],
                defaultProps: {
                    children: "children",
                    label: "text",
                    isLeaf: "leaf",
                    id: "menuId"
                },
                columns: [
                    { text: "用户组", name: "" },
                ],
                list:{}
            };
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        created() {
            this.loadTree();
        },
        mounted() {
            //window.addEventListener("scroll", this.handleScroll);
        },
        methods: {
            getChecked() {
                let array = this.$refs.tree1.getCheckedKeys();
                array = array.concat(this.$refs.tree2.getCheckedKeys())
                return  array
            },
            handleScroll(el) {
                console.log(el);
            },
            setMeunKeys(val){
                getRoleMenu(val.rid).then(res => {
                    this.resetChecked();
                    this.Checkeds = res.data;


                });
            },
            resetChecked() {
                this.$refs.tree1.setCheckedKeys([]);
                this.$refs.tree2.setCheckedKeys([]);
            },
            loadTree() {
               /* getSysMenuTree().then(res => {
                    var data1 = res.data.adminTreeVoList,
                        data2 = res.data.userTreeVoList;
                    data1.forEach(item => {
                        //返回的leaf是string类型  要转为boolean才能正常加载
                        item.leaf = eval(item.leaf.toLowerCase());
                    });
                    data2.forEach(item => {
                        //返回的leaf是string类型  要转为boolean才能正常加载
                        item.leaf = eval(item.leaf.toLowerCase());
                    });
                    this.platformData = data1;
                    this.clientDdata = data2;
                });*/
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            }
        }
    };
</script>

