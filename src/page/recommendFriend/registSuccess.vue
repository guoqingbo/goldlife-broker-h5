<template>
	<div class="recommend">
    <!--<h1 class="nav-header">
      &lt;!&ndash;<span class="go-back" @click="$router.go(-1)"><i class="icon iconfont go-back-icon">&#xe60f;</i></span>&ndash;&gt;
      <span class="header-title">推荐注册</span>
    </h1>-->
    <button @click="downApp()">下载金品生活APP</button>
  </div>
</template>
<script type="text/javascript">
  import headTop from '../../components/header/head'
  import api from '../../api/axios'
	export default {

		data(){
			return{
        apkDownloadUrl : '',
			}
		},
    created(){
      document.title = "推荐注册";
    },
    mounted() {

    },
		methods:{
      downApp(){
        api.updateAppVersionJpsh()
          .then(res=>{
            if(res.data.success){
              this.apkDownloadUrl = res.data.result.apkDownloadUrl;
              console.log(this.apkDownloadUrl)
              window.location.href = this.apkDownloadUrl;
            }else{
              this.$toast({
                message: res.data.errorMessage,
                position: 'middle',
                duration: 3000
              })
            }
          })
          .catch(err=>{
            console.log(err);
          })
      }
    },
		components: {
	      headTop,
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
    background-size:cover;
    background-image:url(../../assets/img/invitesuccess_BG.png);
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
      .header-title {
        display: inline-block;
        width: 100%;
        font-weight: bold;
        text-align: center;
        letter-spacing: 0.2rem;
      }
    }
    button{
      font-size: 1.6rem;
      height: 4rem;
      width: 70%;
      border-radius: 2rem;
      background-color: #FC6A3F;
      color: #ffffff;
      position: absolute;
      bottom: 6.5rem;
      left: 15%;
    }

  }
</style>
