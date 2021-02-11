<template>
  <!-- <router-view/>-->
  <!-- 添加下面这一块，给所有请求加缓存 -->
  <router-view v-slot="{Component}">
    <transition>
      <keep-alive>
        <component :is="Component"/>
      </keep-alive>
    </transition>
  </router-view>

  <!-- 底部导航-->
  <div id="nav">
    <router-link class="tab-bar-item" to="/">
      <div class="icon"><i class="iconfont icon-yemian-copy-copy"></i></div>
      <div>首页</div>
    </router-link>
    <router-link class="tab-bar-item" to="/category">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link class="tab-bar-item" to="/shopcart">
      <div class="icon"><i class="iconfont icon-gouwuche"></i></div>
      <div>购物车</div>
    </router-link>
    <router-link class="tab-bar-item" to="/profile">
      <div class="icon"><i class="iconfont icon-gerenzhongxin1"></i></div>
      <div>我的</div>
    </router-link>
  </div>
</template>

<style lang="scss"> // scoped 局部使用
@import "assets/css/base.css";
// 因已设置路径别名
@import "assets/css/icon/iconfont.css"; // 引入字体图标

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background-color: #F6F6F6;
  display: flex; /* 变成弹性盒子 */
  position: fixed; // 固定定位到底部
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);


  // 首页、分类、购物车、我的
  .tab-bar-item {
    flex: 1; // 每个各占1份
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
    // 图标
    .icon {
      width: 24px;
      height: 24px;
      margin-top: 5px;
      vertical-align: middle; // 设置元素的垂直对齐方式,把此元素放置在父元素的中部。
      display: inline-block; // 转行级块元素
    }
  }

  a {
    //font-weight: bold;
    color: var(--color-text);

    &.router-link-exact-active {
      //color: #42b983;
      color: var(--color-high-text); // 使用变量文本高亮颜色
    }
  }
}
</style>
