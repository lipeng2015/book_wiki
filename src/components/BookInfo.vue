<template>
  <div class="book-info">
    <div class="thumb">
      <img :src="info.image" mode="aspectFill" class="back">
      <img :src="info.image" mode="aspectFit" class="img">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img :src="userInfo.image" class="avatar" mode="aspectFit"/>
      {{userInfo.name}}
      <div class="right MAIN_PRIMARY">{{info.rate}}分
        <Rate :value="info.rate"></Rate>
      </div>
    </div>
    <div class="detail">{{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" v-for="(tag,index) in info.tags" :key="index">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(item,index) in info.summary" :key="index">{{item}}</p>
    </div>
  </div>
</template>

<script>
  import Rate from './Rate';

  export default {
    props: ['info'],
    computed: {
      // 作用是避免请求未响应时先初始化一个空对象，避免取值报错
      userInfo() {
        return this.info.user_info || {};
      }
    },
    components: {
      Rate
    }
  };
</script>

<style lang="scss" scoped>
  @import "../common/base";

  .book-info {
    .badge{
      display: inline-block;
      margin: 5px;
      padding: 5px;
      border-radius: 10px;
      border: 1px #EA5A49 solid;
      color: #EA5A49;
    }
    .summary{
      padding: 0 15px;
      margin-top: 10px;
      p{
        text-indent: 2em;
        font-size: 14px;
      }
    }
    font-size: 14px;
    .detail {
      padding: 5px 10px;
      .avatar {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        vertical-align: middle;
      }
    }
    .right {
      float: right;
    }

    .thumb {
      width: rpx(750);
      height: rpx(500);
      overflow: hidden;
      .back {
        width: 100%;
        filter: blur(15px);
      }
      .img {
        position: absolute;
        width: 100%;
        height: rpx(300);
        left: 0;
        top: rpx(30);
      }
      .info {
        color: white;
        position: absolute;
        left: 0;
        width: 100%;
        top: rpx(350);
        text-align: center;
        .title {
          font-size: 20px;
        }
        .author {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
  }
</style>
