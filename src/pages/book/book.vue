<template>
  <div>
    <TopSwiper :tops="tops"></TopSwiper>
    <Card v-for="book in books" :key="book.id" :book="book" @click="">{{book.title}}</Card>
    <p class="TEXT-FOOTER" v-show="more">没有更多数据</p>
  </div>

</template>

<script>
  import {get} from '@/util';
  import Card from '@/components/Card';
  import TopSwiper from '../../components/TopSwiper';

  export default {
    methods: {
      async getList(init) {
        if (init) {
          this.page = 0;
        }
        wx.showNavigationBarLoading();
        const books = await get('/weapp/booklist', {page: this.page});
        if (books.list.length < 10 && this.page > 0) {
          // 没有更多了
          this.more = true;
        }
        if (init) {
          // 初始状态直接覆盖数据
          this.books = books.list;
          wx.stopPullDownRefresh();
        } else {
          // 下拉刷新，不能直接覆盖，直接累加
          this.books = this.books.concat(books.list);
        }

        wx.hideNavigationBarLoading();
      },
      async getTop() {
        const tops = await get('/weapp/top');
        this.tops = tops.list;
      }
    },
    mounted() {
      this.getList(true);
      this.getTop();
    },
    data() {
      return {
        books: [],
        page: 0,
        more: false,
        tops: []
      };
    },
    onShow() {
      this.getList(true);
    },
    components: {
      Card, TopSwiper
    },
    onPullDownRefresh() {
      this.getList(true);
      this.getTop();
    },
    onReachBottom() {
      if (this.more) {
        // 没有更多了
        return false;
      } else {
        this.page = this.page + 1;
        this.getList();
      }
    }
  };
</script>

<style>

</style>
