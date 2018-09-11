/**
 * Created by ASUS on 2018-08-08.
 */

export default function MP() {

  return new Promise(function (resolve, reject) {
    if(typeof BMap =='undefined'){
      var script = document.createElement("script");

      script.type = "text/javascript";

      script.src = "http://api.map.baidu.com/api?v=2.0&ak=2mVgyhihCUsCif6bDgC7V1GK4chYQUfN&callback=init";

      script.onerror = reject;

      document.body.appendChild(script);

      window.onload = function () {
        resolve(BMap)
      }
    }else{
      resolve(BMap)
    }
  })
}
