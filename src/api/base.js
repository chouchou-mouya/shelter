//api baseurl的管理
let doamin='http://127.0.0.1:3030';
//build切換網域
if (process.env.NODE_ENV === 'production') {
  doamin = ''
}

const base={
  doamin:doamin,
  api:`${doamin}/api/`,
  config:{
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    timeout: 1000 * 30 //30秒
  }
}
export default base;

