<template>
  <div>
    <el-tree
      ref="tree1"
      :props="defaultProps"
      :filter-node-method="filterNode"
      :default-expand-all="false"
      :data="platformData"
      show-checkbox
      :default-checked-keys="Checkeds"
      node-key="menuId"
      @node-click="handlerNode"
      highlight-current
      :expand-on-click-node="false"
    />
  </div>
</template>

<script>
    import { getFrameTree} from "@/api/basic/index";
    export default {
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
                }
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
            //获取选中
            getChecked() {
                let array = this.$refs.tree1.getCheckedKeys();
                return  array
            },
            handleScroll(el) {
                console.log(el);
            },
            resetChecked() {
                this.$refs.tree1.setCheckedKeys([]);
            },
            //监听树是否被点击
            handlerNode(data, node) {
                // 保存点击节点的data
                this.$store.dispatch("tree/setNode", node);
                // 向父组件传入node
                this.$emit("handler-node", node);
            },
            loadTree() {
               /* getFrameTree().then(res => {
                    var data = res.data
                    data.forEach(item => {
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

