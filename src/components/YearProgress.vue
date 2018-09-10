<template>
  <div class="progressbar">
    <progress :percent="percent" color="pink"/>
    <p>{{year}}已经过去了{{days}}天，已经过去{{percent}}%了</p>
  </div>
</template>

<script>
  export default {
    name: 'year-progress',
    methods: {
      isLeapYear() {
        const year = new Date().getFullYear();
        if (year % 400 === 0) {
          return true;
        } else if (year % 4 === 0 && year % 100 !== 0) {
          return true;
        } else {
          return false;
        }
      },
      getDayOfYear() {
        return this.isLeapYear() ? 366 : 365;
      }
    },
    computed: {
      year() {
        return new Date().getFullYear();
      },
      days() {
        // 首先获取今年的第一天
        let start = new Date();
        start.setMonth(0);
        start.setDate(1);
        // 然后当前的时间戳减去第一天的时间戳
        let offset = new Date().getTime() - start.getTime();
        return parseInt(offset / 1000 / 60 / 60 / 24 + '') + 1;
      },
      percent() {
        return (this.days * 100 / this.getDayOfYear()).toFixed(0);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .progressbar {
    text-align center
    margin-top 10px
    width 100%
    progress {
      margin-bottom 10px
    }
    p {
      margin-bottom 20px
      font-size 25rpx
    }
  }
</style>
