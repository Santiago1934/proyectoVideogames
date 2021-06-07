//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const  { conn } = require('./src/db.js');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001", ); // eslint-disable-line no-console
  });
});

/* app.listen(process.env.PORT || 3001, function(){
  console.log("Express server listening on port %d in %s mode", "USER: ", DB_USER, "PASS:" + DB_PASSWORD, "NAME:" + DB_NAME, "HOST:" + DB_HOST);
}); */