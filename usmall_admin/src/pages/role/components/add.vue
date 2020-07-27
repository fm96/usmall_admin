<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.show">
      <el-form :model="form">
        <el-form-item
          label="角色名称"
          label-width="80px"
          :rules="[
      { required: true, message: '角色名称不能为空'}
    ]"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="80px">
          <!-- 默认选中 :default-checked-keys="[5]"-->
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            highlight-current
            :default-checked-keys="checkedKey"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="80px">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancle">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd==true">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { roleAdd, roleInfo, roleUpdate } from "../../../util/request";
import { seccessAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  computed: {
    ...mapGetters({
      menuList: "menu/list",
      roleList: "role/list"
    })
  },
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1
      },

      defaultProps: {
        children: "children",
        label: "title"
      },
      checkedKey: []
    };
  },
  methods: {
    ...mapActions({
      resquestList: "menu/resquestList",
      resquestRoleList: "role/resquestList"
    }),
    // 清空
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1
      };
    },
    // 取消
    cancle() {
      this.info.show = false;
    },
    //   添加
    add() {
      // 获取树结构的key值赋值给menus console.log(this.$refs.tree.getCheckedKeys())
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      console.log(this.form);
      // 发起请求
      roleAdd(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert(res.data.list);
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取数据
          this.resquestRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条角色信息
    getInfo(id) {
      // 发起请求
      roleInfo({ id: id }).then(res => {
        this.form = res.data.list;
        this.form.id = id;
        // 获取信息的树结构的key值赋值给checkedKey，进行设置默认选中状态
        this.checkedKey = JSON.parse(res.data.list.menus);
        // console.log(this.checkedKey)
      });
      // console.log(this.form.id)
    },
    // 修改
    update() {
      // 获取更改后的树结构的值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      // 发起请求
      roleUpdate(this.form).then(res => {
        if (res.data.code == 200) {
          seccessAlert("修改成功");
          // 清空
          this.empty();
          // 取消
          this.cancle();
          // 重新获取列表数据
          this.resquestRoleList();
        } else {
          warningAlert(res.data.msg);
        }

        // console.log(this.form)
      });
      // console.log(this.form)
    }
  },
  mounted() {
    // 添加之前先判断是否有菜单数据
    if (this.menuList.length === 0) {
      // 请求菜单数据
      this.resquestList();
    }
  }
};
</script>
<style scoped>
</style>