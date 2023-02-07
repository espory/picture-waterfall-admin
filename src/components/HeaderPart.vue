<template>
  <el-row class="header" type="flex">
    <el-col :span="5" class="header__left">
      <img class="header__left__logo" alt="logo" src="../assets/logo.png" />
      <span class="header__left__title">Waterfall</span>
    </el-col>

    <el-col :span="5" class="header__right"> 管理端 </el-col>
  </el-row>
  <!-- <nav class="nav">
    <div class="nav__container">
      <div class="nav__container__left">
        <img
          class="nav__container__left__logo"
          alt="logo"
          src="../assets/logo.png"
        />
        <span class="nav__container__left__name">Waterfall</span>
      </div>
      <div class="nav__container__right">123</div>
    </div>
  </nav> -->
</template>

<script>
export default {
  name: "HeaderPart",
  props: {
    isMobileDevice: Boolean,
  },
  data: function () {
    return {};
  },
  watch: {},
  methods: {
    jump(path) {
      this.$router.push(path);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.header {
  padding: 20px 80px;
  box-shadow: 0 1px 0 #f7f7f7;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  font-family: monaco, Consolas, "Lucida Console", monospace;
  &__left {
    display: flex;
    align-items: center;
    &__logo {
      width: 40px;
      height: 40px;
    }
    &__title {
      padding: 0 25px 0 15px;
    }
  }
  &__right {
    display: flex;
    justify-content: flex-end;
  }
}

.nav {
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  left: 0;
  height: 80px;
  box-shadow: 0 1px 0 #f7f7f7;
  background-color: white;

  &__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
    height: 80px;
    &__left {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 15%;
      &__logo {
        width: 40px;
        height: 40px;
      }
      &__name {
        padding: 0 25px 0 15px;
        font-size: 20px;
        font-weight: bold;
        font-family: monaco, Consolas, "Lucida Console", monospace;
      }
    }

    &__right {
      flex: 0 0 15%;
      .nav-button {
        width: 80px;
        height: 50px;
      }
    }
  }
}
</style>
