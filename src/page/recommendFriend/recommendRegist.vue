<template>
  <div class="bottom-div">
  <div class="recommend">
    <!--<h1 class="nav-header">
      &lt;!&ndash;<span class="go-back" @click="$router.go(-1)"><i class="icon iconfont go-back-icon">&#xe60f;</i></span>&ndash;&gt;
      <span class="header-title">推荐注册</span>
    </h1>-->
    <div class="sender-box">
      <p class="sender-p">{{phone}}</p>
      <p class="sender-p-des">邀请您注册金品生活APP</p>
    </div>
    <div class="form-div">
      <p><input class="phone-input" v-model="phoneNum" maxlength="11" placeholder="输入手机号码" type="tel" required/></p>
      <div class="code-div"><input class="code-input" maxlength="6" v-model="verCode" placeholder="输入验证码" type="tel" required/>
        <button class="button-span" ref="buttonNum" @click="getCode()">获取验证码</button></div>
      <p class="button-p">
        <button @click="regist()">注册</button>
      </p>
      <p class="agree-p">注册即代表同意
        <router-link
          :to="{ name:'userProtocol',params: { }}">
          <span>《金品生活用户使用指南》</span>
        </router-link>
      </p>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
  import headTop from '../../components/header/head'
  import api from '../../api/axios'

  export default {

    data() {
      return {
        phone: this.$route.query.phone?this.$route.query.phone:'187****9009',//推荐人手机号
        phoneNum: '',//注册人手机号
        businessType: 6,
        verCode: '',//验证码
        inviterId: this.$route.query.inviterId?this.$route.query.inviterId:'123',//推荐人编号
        buttonDisabled:false,//防止连续点击
      }
    },
    created(){
      document.title = "推荐注册";
    },
    mounted() {

    },
    methods: {
      getCode(){
        if(this.buttonDisabled){
          return
        }
        this.buttonDisabled = true

        if (!this.phoneNum){
          this.$toast({
            message: '请输入手机号',
            position: 'bottom',
            duration: 3000
          });
          return
        }else if (!/^1\d{10}$/gi.test(this.phoneNum)) {
          this.$toast({
            message: '手机号号码格式错误',
            position: 'bottom',
            duration: 3000
          });
          return
        }
        let phoneData = {
          phoneNum: this.phoneNum,
          businessType: this.businessType,
        };
        console.log(phoneData);
        api.getVerCode(phoneData)
          .then(res => {
            this.buttonDisabled = false
            if (res.data.success) {
              var num = 60;
              var elementButton = this.$refs.buttonNum;
              elementButton.disabled = true;
              var timer = setInterval(function () {
                num--;
                elementButton.innerHTML = num + '秒';
                if (num === 0) {
                  elementButton.disabled = '';
                  elementButton.innerHTML = '重新获取';
                  clearInterval(timer)
                }
              }, 1000);
              this.$toast({
                message: '获取验证码成功',
                position: 'bottom',
                duration: 3000
              });
            }else{
              this.$toast({
                message: res.data.errorMessage,
                position: 'bottom',
                duration: 3000
              });
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      },
      regist(){
        let registInfo = {
          phoneNum : this.phoneNum,
          verCode : this.verCode,
          inviterId : this.inviterId,//推荐人编号
        }
        api.friendRegister(registInfo)
          .then(res => {
            if (res.data.success) {
              console.log('注册成功')
              this.$router.push({ name:'registSuccess',params: { }});
            }else{
              this.$toast({
                message: res.data.errorMessage,
                position: 'bottom',
                duration: 3000
              })
            }
          })
          .catch(function (response) {
            console.log(response)
          });
      }
    },
    components: {
      headTop,
    },
  }
</script>
<style lang="scss" scoped>
  @import '../../style/mixin';

  .bottom-div{
    background-color: #FDA73A;
    height: 100%;
  }
  .recommend {
    //overflow: hidden;
    //position: fixed;
    width: 100%;
    height: 100%;
    position: absolute;
    top: -10%;
    //background-size: 100% 100%;
    //background-size: contain;
    background: url(../../assets/img/register_BG.png) center no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
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
    .sender-box {
      //margin-top: 27rem;
      //margin-top: 72%;
      position: absolute;
      top: 47%;
      width: 100%;
      text-align: center;
      .sender-p {
        font-size: 2.1rem;
        color: #fe7641;
      }
      .sender-p-des {
        margin-top: 0.5rem;
        font-size: 1.5rem;
        color: #666666;
        letter-spacing: 0.1rem;
      }
    }
    .form-div {
      //margin-top: 6rem;
      //margin-top: 16%;
      position: absolute;
      top: 62%;
      width: 100%;
      text-align: center;
      p {
        padding-top: 1.2rem;
        .phone-input {
          border-radius: 0.5rem;
          height: 4rem;
          //width: 25rem;
          width: 70%;
          padding-left: 1.5rem;
          //font-size: 1.3rem;
        }
      }
      .code-div {
        padding-left: 1.5rem;
        margin-top: 1.2rem;
        margin-left: auto;
        margin-right: auto;
        border-radius: 0.5rem;
        height: 4rem;
        //width: 25rem;
        width: 70%;

        background-color: #ffffff;
        line-height: 4rem;
        input {
          //border-right: 1px solid #f37641;
          width: 57%;
          height: 100%;
          float: left;
        }
        .button-span {
          margin-left: 1rem;
          font-size: 1.3rem;
          color: #f37641;
          padding-left: 1rem;
          border-left: 1px solid #f37641;
          background-color: #fff;
        }
      }
      .button-p {
        margin-top: 1rem;
        button {
          height: 4rem;
          //width: 25rem;
          width: 70%;
          border-radius: 2rem;
          background-color: #FBC230;
          color: #bd4104;
          font-size: 1.5rem;
          letter-spacing: 0.2rem;
        }
      }

    }
    .agree-p {
      //margin-top: 1rem;
      color: #ffffff;
      font-size: 1.2rem;
      text-align: center;
      span {
        color: #ffffff;
      }
    }

  }
</style>
