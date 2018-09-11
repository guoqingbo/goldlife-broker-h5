import axios from 'axios'
import qs from 'qs'
import envConfig from  '../config/env'

//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.baseURL = envConfig.baseUrl;
// axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";

export default {
  //新房详情
  newHouseSharePage(data){
    return axios.get('house/newHouseDetail',{
      params:{
        buildingId:data
      }
    })
  },

  //好友注册
  friendRegister(data){
    return axios.post(
      'user/friendRegister',
      qs.stringify({
        phoneNum:data.phoneNum,
        verCode:data.verCode,
        inviterId:data.inviterId,//推荐人编号
      })
    )
  },

  //注册获取验证码
  getVerCode(data){
    return axios.post(
      'user/getVerCode',
      qs.stringify({
        phoneNum:data.phoneNum,
        businessType:data.businessType,
      })
    )
  },

  //下载金品
  updateAppVersionJpsh(){
    return axios.get('common/updateAppVersionJpsh',{})
  },
}
