exports.loadEnv = (path) =>
{
  return (cb) =>
  {
    delete process.env.VARIABLE
    require('dotenv').config({
      path,
      override: true
    });
    console.log('查看环境变量：', process.env);
    if (cb instanceof Function) { cb(); }
  }
}
