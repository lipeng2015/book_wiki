<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length">评论</div>
    <div class="comment" v-for="comment in comments" :key="comment.id" @click="clickComment(comment)">
      <div class="user">
        <div class="inline">
          <img :src="comment.image" class="avatar" mode="aspectFit">
          <span class="title">{{comment.title}}</span>
        </div>
        <div class="right">{{comment.location||'未知地点'}}
          <span class="MAIN_PRIMARY">--</span>{{comment.phone||'未知型号'}}
        </div>
      </div>
      <div class="content">{{comment.comment}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'comment-list',
    props: ['comments', 'type'],
    methods: {
      clickComment(comment) {
        if (this.type === 'user') {
          // 在评论页可以跳转
          wx.navigateTo({
            url: '/pages/detail/main?id=' + comment.bookid
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .comment-list {
    background: #eee;
    font-size: 14px;
    .page-title {
      padding-left: 20px;
      background: #eee;
      line-height: 40px;
      font-size: 14px;
    }
    .comment {
      background: white;
      margin-bottom: 10px;
      padding: 5px 20px;
      .content {
        margin: 10px 0;
      }
      .user {
        margin-top: 10px;
        .inline {
          display: inline;
          .avatar {
            width: 20px;
            height: 20px;
          }
          .title {
            vertical-align: top;
            margin-left: 10px;
          }
        }
        .right {
          float: right;
        }
      }
    }
  }
</style>
