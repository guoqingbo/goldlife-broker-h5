<template>
	<div class="recommend">
    <h1 class="nav-header">
      <!--<span class="go-back" @click="$router.go(-1)"><i class="icon iconfont go-back-icon">&#xe60f;</i></span>-->
      <!--<span class="go-back" @click="goApp()"><i class="icon iconfont go-back-icon">&#xe60f;</i></span>-->
    </h1>
    <!--<p class="friend-p">邀请好友</p>-->
    <div class="share">
      <div @click="shareFriend(1)">
        <p><img src="../../assets/img/icon_wechat.png"></p>
        <p>邀请微信好友</p>
      </div>
      <div @click="shareFriend(2)">
        <p><img src="../../assets/img/icon_sharetfriend.png"></p>
        <p>分享到朋友圈</p>
      </div>
    </div>
    <p class="my-p">我的二维码</p>
    <div class="qrcode" id="qrcode">
      <vue-qr :text="config.value" :size="120" :margin="0"></vue-qr>
      <div class="bottom-title" >
        <p>长按保存二维码</p>
        <p>扫码邀请</p>
      </div>
    </div>

  </div>
</template>
<script type="text/javascript">
//  import headTop from '../../components/header/head'
  import VueQr from 'vue-qr'
  //import WebViewJavascriptBridge from '../../components/WebViewJavascriptBridge'
  //import wx from 'weixin-js-sdk'
	export default {

		data(){
			return{
			  config: {
          value: 'http://'+location.hostname+'/h5broker/recommendRegist?phone='+this.$route.query.phone+'&inviterId='+this.$route.query.inviterId,//显示的值、跳转的地址
          logo:'static/img/logo.png'//中间logo的地址
        },
        phone : this.$route.query.phone,
        inviterId : this.$route.query.inviterId,
        title: '金品中心注册邀请', // 分享标题
        desc: '您的好友邀请您注册金品中心', // 分享描述
        link: '', // 分享链接
        imgUrl:'',
			}
		},
    created(){
      document.title = "推荐注册";
    },
    mounted() {

    },
		methods:{
      goApp(){
        window.location.href = '/page/toHome'
      },
      //判断手机类型
      isAndroid_ios(){
        var u = navigator.userAgent, app = navigator.appVersion;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('android') > -1; //android终端或者uc浏览器
        //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        return isAndroid==true?true:false;
      },
      //分享到微信
      shareFriend(data){
        this.link = this.config.value;
        let param = {
          'title': this.title,
          'desc': this.desc,
          'link': this.link,
          'imgUrl' : this.imgUrl,
          'type' : data,
        };
        console.log(param);
        //window.webkit.messageHandlers.share.postMessage(param);
        if(this.isAndroid_ios()){
          window.WebViewJavascriptBridge.callHandler(
            'share'
            , param
            , function(responseData) {
              console.log(responseData)
            }
          );
        }else{
          window.webkit.messageHandlers.share.postMessage(param);
        }
      },

      downloadImg(){
        var oQrcode = document.querySelector('#qrcode img')
        var url = oQrcode.src
        var a = document.createElement('a')
        var event = new MouseEvent('click')
        // 下载图名字
        a.download = '金品生活分享二维码'
        //url
        a.href = url
        //合成函数，执行下载
        a.dispatchEvent(event)
      },

    },
		components: {
        VueQr,
	    },
	}
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';
  .recommend{
    //overflow: hidden;
    //position: fixed;
    width:100%;
    height:100%;
    background-size:100% 100%;
    background-image:url(../../assets/img/invitefriend_BG.png);
    .nav-header {
      position: relative;
      font-size: 1.6rem;
      color: #fff;
      height: 4.4rem;
      line-height: 4.4rem;
      .go-back {
        position: absolute;
        left: $contentPadding;
      }
      .go-back-icon {
        font-size: 2rem;
      }
    }
    /*.friend-p{
      color: #162E6C;
      font-size: 1.6rem;
      //margin-top: 23.5rem;
      position: absolute;
      top: 42%;
      width: 100%;
      text-align: center;
      font-weight: bold;
      letter-spacing: 0.2rem;
    }*/
    .share{
      //margin-top: 2rem;
      position: absolute;
      top: 43%;
      width: 100%;
      display:flex;
      text-align: center;
      /*margin-left: 10%;
      margin-right: 10%;*/
      div{
        flex: 1;
        img{
          height: 4rem;
          width: 4rem;
        }
        p{
          font-size: 1.3rem;
          color: #888888;
        }
      }
    }
    .my-p{
      //margin-top: 5rem;
      position: absolute;
      top: 61%;
      width: 100%;
      text-align: center;
      font-weight: bold;
      font-size: 1.6rem;
      color: #162E6C;
      letter-spacing: 0.2rem;
    }
    .qrcode{
      //margin-top: 1.5rem;
      position: absolute;
      top:66%;
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      //width: 20rem;
      text-align: center;
    }
    .bottom-title{
      //margin-top: 1rem;
      //position: absolute;
      //top: 88%;
      width: 100%;
      text-align: center;
      p{
        color: #888888;
        font-size: 1.3rem;

      }
    }


  }
</style>
