<template>
  <div class="rate">
    <span>☆☆☆☆☆</span>
    <div class="hollow" :style="getStyle">
      ★★★★★
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {type: [Number, String], default: '0'}
    },
    computed: {
      getStyle() {
        return `width:${this.value / 2}em`;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .rate {
    position relative
    display inline-block
    .hollow {
      position absolute
      display inline-block
      top 0
      left 0
      width 0
      overflow hidden

    }
  }

</style>
