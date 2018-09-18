// 针对请求的一些配置
// 本地请求的地址
// const host = 'http://localhost:5757';

// 微信开发环境
const host = 'https://ovilcwhe.qcloud.la';

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  userUrl: `${host}/weapp/user`
};
export default config;
