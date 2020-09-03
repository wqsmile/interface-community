<template functional>
  <!-- 头像的函数式组件，因为很多地方都会用到 -->
  <!-- hasBorder是否要边框。width为头像的宽高，宽高一致，imgSrc为图片路径 -->
  <div
    :style="{
      padding: '1px',
      border: props.hasBorder ? '1px solid #ccc' : 'none',
      display: 'inline-block',
      width: props.width,
      height: props.width,
    }"
  >
    <img
      :src="props.imgSrc"
      alt=""
      :style="{
        width: props.width,
        height: props.width,
        verticalAlign: 'middle'
      }"  
    >
  </div>
</template>

