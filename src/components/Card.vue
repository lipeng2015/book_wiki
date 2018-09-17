<template>
  <a :href="detailUrl">
    <div class="book-card">
      <div class="thumb" @click.stop="showBigImage">
        <img :src="book.image" class="img" mode="aspectFit">
      </div>
      <div class="detail">
        <div class="row">
          <div class="right MAIN_PRIMARY">
            {{book.rate}}
            <Rate :value="book.rate"></Rate>
          </div>
          <div class="left MAIN_PRIMARY">
            {{book.title}}
          </div>
        </div>
        <div class="row">
          <div class="right">
            {{book.author}}
          </div>
          <div class="left">
            浏览量：{{book.count}}
          </div>
        </div>
        <div class="row">
          <div class="right">
            添加人：{{book.user_info.nickName}}
          </div>
          <div class="left">
            {{book.publisher}}
          </div>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
  import Rate from '../components/Rate';

  export default {
    props: ['book'],
    components: {
      Rate
    },
    methods: {
      showBigImage() {
        // 预览图
        wx.previewImage({
          current: this.book.image,
          urls: [this.book.image]
        });
      }
    },
    computed: {
      detailUrl() {
        return '/pages/detail/main?id=' + this.book.id;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../common/base";

  .book-card {
    padding: 5px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
    .thumb {
      width: 90px;
      height: 90px;
      float: left;
      margin: 0 auto;
      overflow: hidden;
      .img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .detail {
      margin-left: 100px;
      .row {
        font-size: 14px;
        line-height: 20px;
        margin-bottom: 3px;
      }
      .right {
        float: right;
      }
      .left {
        margin-right: 80px;
      }
    }
  }

</style>
