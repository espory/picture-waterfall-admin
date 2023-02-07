<template>
  <div class="container">
    <el-table :data="pictureList">
      <el-table-column label="图片" width="100">
        <template slot-scope="scope">
          <ElImage
            class="table__img"
            :src="scope.row.path"
            :preview-src-list="previewPictureList"
            @click="handlePreview(scope.row)"
            :onPreviewOpen="onPreviewOpen"
            :onPreviewClose="onPreviewClose"
          >
          </ElImage>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.status"
            placeholder="请选择"
            @change="handleSelectChange(scope.row)"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.updateAt }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <p>住址: {{ scope.row.address }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        :pageSize="limit"
        :total="38"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div v-if="isPreviewShow" class="preview-option">
      <el-button
        type="primary"
        icon="el-icon-success"
        @click="handleSelectChange(curPreview, 'pass')"
        >审核通过</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-error"
        @click="handleSelectChange(curPreview, 'reject')"
        >拒绝展示</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  postGetPics,
  getItemTotal,
  postDelPic,
  postChangePic,
} from "../service";
import { HOST } from "../common/fetch";
import ElImage from "../element-ui/image";
export default {
  components: {
    ElImage,
  },

  data() {
    return {
      offset: 0,
      limit: 6,
      total: 0, //用于分页，显示总数
      done: false,
      //瀑布流列数
      pictureList: [],
      //预览图片
      previewPictureList: [],
      curPreview: {},
      isPreviewShow: false,
      //控制图片遮罩层
      mask: {
        show: false,
        index: 0,
        status: "LOADING",
        // rawScrollTop: 0, //记录弹出遮罩层前，滚动高度，方便后续还原
      },
      //避免图片请求冲突
      isRequesting: false,
      // 图片加载状态
      //   PIC_TYPES: {
      //     LOADING: "LOADING",
      //     DONE: "DONE",
      //   },
      options: [
        {
          value: "pending",
          label: "待处理",
        },
        {
          value: "pass",
          label: "同意展示",
        },
        {
          value: "reject",
          label: "拒绝展示",
        },
      ],
    };
  },
  created() {
    this.getData();
    this.getTotal();
  },
  watch: {
    pictureList(newValue) {
      this.previewPictureList = newValue.map((pic) =>
        pic.path.replace("small-", "")
      );
    },
  },
  computed: {
    // previewPictureList() {
    //   return this.pictureList.map((pic) => pic.path.replace("small-", ""));
    // },
  },
  methods: {
    onPreviewOpen() {
      this.isPreviewShow = true;
    },
    onPreviewClose() {
      this.isPreviewShow = false;
    },
    async getTotal() {
      const { data } = getItemTotal();
      this.total = data;
    },
    async handleSelectChange(row, newStatus = "") {
      const { id, status } = row;
      if (newStatus) {
        postChangePic(id, "status", newStatus);
        row.status = newStatus;
      } else {
        postChangePic(id, "status", status);
      }
    },
    handleCurrentChange(val) {
      this.offset = (val - 1) * this.limit;
      this.getData();

      console.log("当前：", val);
    },
    handlePreview(row) {
      // 因为 previewList 总是在首个图片开始预览，这里做一下适配
      const { path } = row;
      console.log(path);
      const index = this.previewPictureList.indexOf(path.replace("small-", ""));
      if (index !== -1) {
        const right = this.previewPictureList.slice(0, index);
        const left = this.previewPictureList.slice(index);
        this.previewPictureList = [...left, ...right];
      }
      this.curPreview = row;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    async handleDelete(index, row) {
      const { id } = row;
      await postDelPic(id);
      this.pictureList.splice(index, 1);
    },
    async getData() {
      this.isRequesting = true;
      const { data, done } = await postGetPics(this.limit, this.offset);
      data.forEach((pic) => {
        // 为了加快首屏渲染，初始加载缩略图，点击图片展示大图
        pic.path = `${HOST}/small-${pic.path}`;
        // pic.status = this.PIC_TYPES.LOADING; //初始页面处于loading 状态
        pic.updateAt = pic.updatedAt?.split(".")[0].replace("T", " ");
      });
      this.pictureList = data;
      console.log(data);
      // 刷新图片 index ，方便大图展示
      this.pictureList.forEach((pic, index) => {
        pic.index = index;
      });
      this.done = done;
      this.isRequesting = false;
    },
  },
};
</script>
<style scoped lang="less">
.container {
  padding: 10px 80px;
  .preview-option {
    .el-button:first-child {
      position: absolute;
      bottom: 10px;
      bottom: 90px;
      right: 20px;
      z-index: 2099;
    }
    .el-button:last-child {
      position: absolute;
      bottom: 30px;
      right: 20px;
      z-index: 2099;
    }
  }
  .el-table {
    width: 100%;
    height: 100%;
    max-height: calc(100vh - 130px);
    overflow: scroll;
  }
  .el-table::before {
    z-index: inherit;
  }
  .table__img {
    width: 100%;
    object-fit: contain;
  }
  .pagination {
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
