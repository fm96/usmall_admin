<template>
  <div>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="id" label="商品编号" width="180"></el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="price" label="商品价格"></el-table-column>
      <el-table-column prop="market_price" label="市场价格"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$imgUrl+scope.row.img" alt />
        </template>
      </el-table-column>
      <el-table-column label="是否新品">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
          <el-button type="danger" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启 用</el-button>
          <el-button type="info" v-else>禁 用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="update(scope.row.id)">编 辑</el-button>
          <v-btn @comifirm="del(scope.row.id)"></v-btn>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="page"
      :page-size="size"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { seccessAlert, warningAlert } from "../../../util/alert";
import { goodsDel } from "../../../util/request";
export default {
  computed: {
    ...mapGetters({
      list: "goods/list",
      size: "goods/size",
      total: "goods/total"
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      requestList: "goods/requestList",
      requestPage: "goods/changePage",
      // 商品总数
      resquesTotal: "goods/requestTotal"
    }),
    //   点击编辑通知父组件修改数据
    update(id) {
      this.$emit("update", id);
    },
    // 修改当前页
    page(page) {
      this.requestPage(page);
      this.requestList();
    },
    // 删除
    del(id) {
      // 发起请求
      goodsDel({ id: id }).then(res => {
        if (res.data.code == 200) {
          seccessAlert("删除成功");
        //   获取商品列表
        this.requestList();
        // 商品总数
        this.resquesTotal()
        } else {
          warningAlert(res.data.msg);
        }
      });
    }
  },
  mounted() {
    //   获取商品列表
    this.requestList();
    // 商品总数
    this.resquesTotal()
  }
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>