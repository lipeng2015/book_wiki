import Vue from 'vue';
import App from './App';
 // 全局引用px转rpx单位
import './common/base.scss';

Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue(App);
app.$mount();
