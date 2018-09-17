<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea class="textarea" placeholder="请输入图书短评" v-model="comment" :maxlength="100"></textarea>
      <div class="location">地理位置:
        <switch color="#EA5A49" @change="getGeo" :checked="location"></switch>
        <span class="MAIN_PRIMARY">{{location}}</span>
      </div>
      <div class="phone">
        手机型号
        <switch color="#EA5A49" @change="getPhone" :checked="phone"></switch>
        <span class="MAIN_PRIMARY">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="TEXT-FOOTER">未登录或者已经评论过了</div>
    <button open-type="share" class="btn">转发给好友</button>
  </div>
</template>

<script>
  import {get, post, showModal} from '@/util';
  import BookInfo from '../../components/BookInfo';
  import CommentList from '../../components/CommentList';

  export default {
    mounted() {
      this.bookid = this.$root.$mp.query.id;
      this.getDetail();
      this.getComments();
      const userinfo = wx.getStorageSync('userinfo');
      if (userinfo) {
        this.userinfo = userinfo;
      }
    },
    computed: {
      showAdd() {
        // 没登录
        if (!this.userinfo.openId) {
          return false;
        }
        // 评论列表能查到自己的openId
        if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
          return false;
        }
        return true;
      }
    },
    methods: {
      async getDetail() {
        const info = await get('/weapp/bookdetail', {id: this.bookid});
        wx.setNavigationBarTitle({
          title: info.title
        });
        this.info = info;
      },
      getGeo(e) {
        if (e.target.value) {
          const ak = 'SPMNNlxOtQ1q8gtYlPHmGH9md4rAIn3F';
          let url = 'http://api.map.baidu.com/geocoder/v2/';
          // MTDnErxGXUbKkKRXFCwrDltX
          // http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak
          wx.getLocation({
            success: geo => {
              wx.request({
                url,
                data: {
                  ak,
                  location: `${geo.latitude},${geo.longitude}`,
                  output: 'json'
                },
                success: res => {
                  if (res.data.status === 0) {
                    this.location = res.data.result.addressComponent.city;
                  } else {
                    this.location = '未知地点';
                  }
                }
              });
            }
          });
        } else {
          this.location = '';
        }
      },
      getPhone(e) {
        if (e.target.value) {
          const phoneInfo = wx.getSystemInfoSync();
          this.phone = phoneInfo.model;
        } else {
          this.phone = '';
        }
      },
      async addComment() {
        const data = {
          comment: this.comment,
          bookid: this.bookid,
          phone: this.phone,
          location: this.location,
          openid: this.userinfo.openId

        };
        try {
          await post('/weapp/addcomment', data);
          this.comment = '';
          this.getComments();
        } catch (e) {
          showModal('失败', e.msg);
        }
      },
      async getComments() {
        const comments = await get('/weapp/commentlist', {bookid: this.bookid});
        this.comments = comments.list || [];
      }
    },
    components: {
      BookInfo, CommentList
    },
    data() {
      return {
        bookid: '',
        info: [],
        comments: [],
        comment: '',
        location: '',
        phone: '',
        userinfo: {}
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/base";

  .comment {
    margin-top: 10px;
    margin-bottom: 10px;
    .textarea {
      background: #eee;
      padding: rpx(10);
      width: rpx(730);
      height: rpx(200);
    }
    .location {
      margin-top: 10px;
      margin-left: 15px;
    }
    .phone {
      margin-top: 10px;
      margin-left: 15px;
    }
  }
  .btn {
    margin-top: 15px;
    width: rpx(700);
  }
</style>
