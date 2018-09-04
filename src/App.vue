<script>
  import {get} from './util';

  export default {
    async created() {
      // 调用API从本地缓存中获取数据
      console.log('app小程序启动了');
      const res = await get('/weapp/demo');
      console.log(res);
    }
  };
</script>

<style>

</style>
