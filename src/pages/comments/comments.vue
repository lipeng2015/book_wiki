<template>
  <div class="container">
    <CommentList :comments="comments" type="user" v-if="userinfo.openId"></CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <Card v-for="book in books" :key="book.id" :book="book">
      </Card>
      <div v-if="!books.length">暂时还没添加过书，快去添加几本吧</div>
      <!--<p class="TEXT-FOOTER" v-show="more">没有更多数据</p>-->
    </div>

  </div>
</template>

<script>
  import CommentList from '../../components/CommentList';
  import {get} from '../../util';
  import Card from '../../components/Card';

  export default {
    components: {
      CommentList, Card
    },
    data() {
      return {
        comments: [],
        userinfo: {},
        books: [],
        more: false,
        page: 0
      };
    },
    methods: {
      init() {
        wx.showNavigationBarLoading();
        this.getComments();
        this.getBooks();
        wx.hideNavigationBarLoading();
      },
      async getComments() {
        const comments = await get('/weapp/commentlist', {
          openid: this.userinfo.openId
        });
        this.comments = comments.list || [];
      },
      async getBooks() {
        const books = await get('/weapp/booklist', {
          openid: this.userinfo.openId,
          page: this.page
        });
        // if (books.list.length < 10 && this.page > 0) {
        //   // 没有更多了
        //   this.more = true;
        // }
        // if (this.page > 0) {
        //   this.books = this.books.concat(books.list);
        // } else {
        //   this.books = books.list;
        // }
        this.books = books.list;
      }
    },
    onPullDownRefresh() {
      this.init();
      // 停止掉下拉刷新
      wx.stopPullDownRefresh();
    },
    // onReachBottom() {
    //   if (this.more) {
    //     // 没有更多了
    //     return false;
    //   } else {
    //     this.page = this.page + 1;
    //     this.getBooks();
    //   }
    // },
    onShow() {
      wx.setNavigationBarTitle({
        title: '评论列表'
      });
      if (!this.userinfo.openId) {
        let userinfo = wx.getStorageSync('userinfo');
        if (userinfo) {
          this.userinfo = userinfo;
          this.init();
        }
      }
    }
  };
</script>

<style scoped>

</style>
