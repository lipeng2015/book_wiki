<template>
  <div class="swiper">
    <swiper :indicator-dots="true"
            :autoplay="true" :interval="6000" :duration="1000" circular="true">
      <div v-for="(top,index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="img.image" class="slide-image" mode="aspectFit" v-for="(img,count) in top" :key="count"
               @click="bookDetail(img)"/>
        </swiper-item>
      </div>
    </swiper>
  </div>
</template>

<script>
  export default {
    props: ['tops'],
    computed: {
      imgUrls() {
        let res = this.tops;
        // 双重轮播
        return [res.slice(0, 3), res.slice(3, 6), res.slice(6)];
      }
    },
    methods: {
      bookDetail(item) {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + item.id
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .swiper {
    margin-top 5px
    .slide-image {
      width 33%
      height 250rpx
    }
  }
</style>
