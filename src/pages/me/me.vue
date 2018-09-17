<template>
  <div class="container">
    <div class="userinfo-s" @click="login">
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if='userinfo.openId' class="btn" @click="scanBook">添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" @getuserinfo="login">授权登录</button>
  </div>
</template>

<script>
  import {showSuccess, post, showModal} from '../../util';
  import qcloud from 'wafer2-client-sdk';
  import config from '../../config';
  import YearProgress from '@/components/YearProgress.vue';

  export default {
    data() {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: ''
        }
      };
    },
    methods: {
      getWxLogin(encryptedData, iv) {
        console.log('getWxLogin');
        this.getLoginOpenId(encryptedData, iv);
      },
      login(e) {
        const self = this;
        // 查看是否授权
        wx.getSetting({
          success: function (res) {
            // 授权信息里有用户信息
            if (res.authSetting['scope.userInfo']) {
              // 检查用户登录是否过期
              wx.checkSession({
                success: function () {
                  // 没过期，直接成功
                  this.getLoginOpenId(e);
                  showSuccess('登录成功');
                },
                fail: function () {
                  // 过期了，重新登录 先清除登录的状态
                  qcloud.clearSession();
                  // 然后重新登录
                  self.getLoginOpenId(e);
                  // var options = {
                  //   encryptedData: e.mp.detail.encryptedData,
                  //   iv: e.mp.detail.iv,
                  //   userinfo: e.mp.detail.userInfo
                  // };
                  // self.getWxLogin(options);
                }
              });
            } else {
              showModal('用户未授权', e.mp.detail.errMsg);
            }
          }
        });
      },
      getLoginOpenId(e) {
        const self = this;
        wx.login({
          success: function (loginResult) {
            var loginParams = {
              code: loginResult.code,
              encryptedData: e.mp.detail.encryptedData,
              iv: e.mp.detail.iv
            };
            console.log(loginParams);
            qcloud.setLoginUrl(config.loginUrl);
            qcloud.login({
              loginParams,
              success() {
                // 获取用户信息,主要用于获取openId
                qcloud.request({
                  url: config.userUrl,
                  login: true,
                  success(userRes) {
                    showSuccess('登录成功');
                    wx.setStorageSync('userinfo', userRes.data.data);
                    self.userinfo = userRes.data.data;
                    console.log('userinfo', userRes.data.data);
                  },
                  fail(err) {
                    console.log(err);
                  }
                });
              },
              fail(error) {
                console.log(error);
                console.log('登录失败');
                // showModal('登录失败', error)
              }
            });
          }
        });
      },
      async addbook(isbn) {
        const res = await post('/weapp/addbook', {
          isbn,
          openid: this.userinfo.openId
        });
        showModal('添加成功', `${res.title}`);
      },
      scanBook() {
        wx.scanCode({
          success: (res) => {
            // 获取isbn
            this.addbook(res.result);
          },
          fail(err) {
            console.log(err);
          }
        });
      }
    },
    components: {
      YearProgress
    },
    onShow() {
      wx.setNavigationBarTitle({
        title: '我的'
      });
      let userinfo = wx.getStorageSync('userinfo');
      if (userinfo) {
        this.userinfo = userinfo;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../common/base";

  .container {
    padding: 0 rpx(30);
    .userinfo-s {
      margin-top: rpx(100);
      text-align: center;
      margin-bottom: rpx(20);
      img {
        width: rpx(150);
        height: rpx(150);
        margin: rpx(20);
        border-radius: 50%;
      }
    }
  }

</style>
