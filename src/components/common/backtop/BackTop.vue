<template>
  <div class="backTop" @click="backtop"></div>
</template>
<script>
export default {
  name: "BackTop",
  setup(props, {emit}) { // 参数：props 接收属性，emit 上下文里的一个属性
    return {
      backtop: () => {
        emit('bTop') // 子组件通过 emit 方法调用父组件自定义的事件 bTop ，传索引
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.backTop {
  width: 35px;
  height: 35px;
  position: fixed; // 固定定位
  bottom: 70px;
  right: 10px;
  z-index: 20;
  box-shadow: 3px 3px 3px #888888;
  border-radius: 50%;
  background: #FCFCFC url('~assets/css/icon/up.png') no-repeat center center;
}
</style>
