<template>
	<div>
		<div class="share-box">
			<h1 class="nav-header">
				<span class="header-title">新房推荐</span>
			</h1>

			<div class="content">
				<!--顶部轮播图片-->
				<div class="imgDiv">
					<router-link v-if="pic.length > 0" :to="{ name:'imgIncrease',params: { imgs: pic,title:houseData.buildName}}">
					<!-- <router-link to="#"> -->
            <div v-if="pic.length>0" class="swiper-container">
              <mt-swipe :auto="0" @change="handleChange" :show-indicators="false">
                <mt-swipe-item v-for="(item,index) in pic" :key="index">
                  <img :src="item" >
                </mt-swipe-item>
              </mt-swipe>
            </div>
            <div class="showNum" v-if="pic.length>0">{{indexNum}}/{{pic.length}}</div>

						<!--<div  class="swiper-container">-->
							<!--<div class="swiper-wrapper">-->
								<!--<div v-for='i in pic' class="swiper-slide">-->
									<!--<img :src="i">-->
								<!--</div>-->
							<!--</div>-->
							<!--&lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
							<!--<div class="swiper-pagination"></div>-->
						<!--</div>-->
						<!-- <div v-else><img src="../../assets/img/bg_bigphotonormal@2x.png"></div> -->
					</router-link>
					<div v-else><img src="../../assets/img/bg_bigphotonormal@2x.png"></div>

					<div class="blockInfo">
						<h2>{{houseData.buildName}}</h2>
						<p class="addr">地址：<span>{{houseData.address}}</span></p>
						<p class="price">
							<span>{{houseData.avgPrice|priceFilter}}</span>
							<span>{{houseData.openTime|commonFilter}}</span>
						</p>
						<p class="price_name">
							<span>均价</span>
							<span>开盘时间</span>
						</p>
					</div>

				</div>

				<div class="houseInfo">
					<h3 class="houseInfo-title">
						<span>楼盘信息</span>
						<span @click="lookAll">查看全部<i class="icon iconfont look-more">&#xe6da;</i></span>
					</h3>
					<p>开发商：<span>{{houseData.company}}</span></p>
					<p>最新开盘：<span>{{houseData.openTime|commonFilter}}</span></p>
					<p>交房时间：<span>{{houseData.finishTime|commonFilter}}</span></p>
					<p>产权年限：<span>{{houseData.propertyYear|commonFilter}}</span></p>
					<p>许可证：<span>{{houseData.licence|commonFilter}}</span></p>
				</div>


				<div class="homeMap">
					<h3>楼盘地址</h3>
					<router-link :to="{ name:'mapIncrease',params: { x: center.lng,y:center.lat}}">
						<div id="allmap" class="allmap"></div>
					</router-link>
				</div>

				<!-- <div class="remark">
					<h3>备注</h3>
					<p>{{houseData.remark}}</p>

				</div> -->

				<p class="contact" @click="phoneNum">电话咨询</p>

			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import api from '../../api/axios'
  	// import headTop from '../../components/header/head'
//  	import BMap from 'BMap'
//  	import Swiper from 'swiper'
//  import 'swiper/dist/css/swiper.min.css';
  import MP from '../../components/common/map'
  	import { MessageBox } from 'mint-ui';
	export default {
		name:'newHouseSharePage',
		data(){
			return{
				houseData:{},
				pic:'',//轮播图
				maplng: '',//坐标x
        maplat: '',//坐标y
        center: {lng: 120.12, lat: 30.16},
        address: '',//地图标注地址
        indexNum:'1',
			}

		},
		created(){
			this.getNewHouseInfo();
			// document.title = "新房详情";
		},
		mounted(){
      this.$nextTick(()=>{
        this.getBaiduMap();
      })
		},
		methods:{
      handleChange(index){
        this.indexNum = index+1;
      },
			getNewHouseInfo(){
				//从地址栏中获取楼盘ID
				// let buildingId = this.$route.query.buildingId;
				// let buildingId = '65ec8977-6b9f-4466-9340-a29fb0b737c1'; //暂时写死，调数据
				let linkURL = window.location.href;
				let buildingId = linkURL.split('buildingId=')[1];

				api.newHouseSharePage(buildingId).then(res=>{
				    // console.log(res)
					if(res.data.success){
						// console.log(res.data.result);
						this.houseData = res.data.result;
						this.pic = res.data.result.showPic;

						this.maplng = res.data.result.mapLongitude;
		                this.maplat = res.data.result.mapLatitude;
		                this.center.lng = res.data.result.mapLongitude;
		                this.center.lat = res.data.result.mapLatitude;
		                this.address = res.data.result.area + ',' + res.data.result.address;

		                //初始化轮播
		              this.$nextTick(()=> {
                    //重置地图
                    this.resetMap();
//                    if(this.pic.length>0){
//                      var mySwiper = new Swiper('.swiper-container', {
//                        loop: true,
//                        autoplay: 3000,//3秒切换一次
//                         如果需要分页器
//                        pagination: '.swiper-pagination',
//
//                        pagination: {
//                          el: '.swiper-pagination',
//                          type: 'fraction',
//                        },
//                      });
//                    }
		              });

					}else{
						this.$toast({
			              message: res.data.errorMessage,
			              position: 'middle',
			              duration: 3000
			            })
					}
				}).catch(err=>{
					console.log(err);
				})

			},
			getBaiduMap() {
			     MP().then(BMap=>{
             var map = new BMap.Map('allmap');
             window.map = map;
             var point = new BMap.Point(this.maplng, this.maplat);
             var marker = new BMap.Marker(point);
             map.addOverlay(marker);
             map.disableDragging();
             map.centerAndZoom(point, 16);
           })
		      },
		    resetMap(){
			    MP().then(BMap=>{
              var point = new BMap.Point(this.maplng, this.maplat);
              var marker = new BMap.Marker(point);
              map.addOverlay(marker);
              map.disableDragging();
              map.centerAndZoom(point, 16);
              map.panTo(point);
              let lableInfor = new BMap.Label(this.address, {
                position: point,
                offset: new BMap.Size(-26, 0)
              });
              lableInfor.setStyle({backgroundColor: '#fff', padding: '0.5rem', border: '', fontSize: '.1rem',});
              map.addOverlay(lableInfor);
            })
		      },
		      phoneNum() {
		      	MessageBox({
				  title: '呼叫',
				  message: !!this.houseData.contactPhone?this.houseData.contactPhone:'暂无电话',
				  showCancelButton: true
				}).then(action => {
					if(action == "confirm"){
						window.location.href = 'tel://'+this.reservationInfo.phone
					}
		        });

		      },
		      lookAll(){
		      	this.$router.push({path:'/newHouseAllDetail',query:{data:this.houseData}});
		      }
		},
		filters:{
			priceFilter(price){
				if(price || price==0){
					return price + '元/㎡';
				}else{
					return '暂无信息';
				}
			},
			commonFilter(val){
				if(val){
					return val;
				}else{
					return '暂无信息';
				}
			},
		}
	}
</script>
<style lang="scss" scoped>
	/*@import "../../../static/css/swiper.min.css";*/
	.share-box{
		width: 100%;
		height: 100%;
		padding-top: 4.4rem;
		padding-bottom: 5rem;//在手机上备注会被遮住
		.nav-header{
			width: 100%;
		    position: fixed;
		    top: 0;
		    z-index: 999;
		    background-color: #fff;
		    font-size: 1.6rem;
		    color: #424242;
		    height: 4.4rem;
		    line-height: 4.4rem;
		    border-bottom: solid .6rem #f8f8f8;

		    .header-title{
		   //    height: 4.4rem;
			  // position: fixed;
			  // background: #ffffff;
		      display: inline-block;
		      width:100% ;
		      font-weight: bold;
		      text-align: center;
		    }
	  }
	}


  .content{
  	background: #F8F8F8;

  	//地图
  .homeMap {
    margin-top: 2rem;
    #allmap {
      width: 100%;
      height: 22rem;
    }
  }

	.imgDiv {
		margin-bottom: 1rem;
	    .swiper-container {
	      width: 100%;
	      height: 20rem;
	    }
    .showNum{
      font-size: 1.6rem;
      height: 4rem;
      width: 4rem;
      border-radius: 2rem;
      position: absolute;
      top: 20rem;
      right: 1rem;
      z-index: 1;
      color: #f0f0f0;
      background-color: #303133;
      opacity: 0.7;
      text-align: center;
      line-height: 4rem;
    }
	    /*.swiper-pagination {*/
	      /*height: 4rem;*/
	      /*width: 4rem;*/
	      /*border-radius: 2rem;*/
	      /*background-color: #303133;*/
	      /*opacity: 0.7;*/
	      /*text-align: center;*/
	      /*line-height: 4rem;*/
	      /*left: 85%;*/
	      /*color: #f0f0f0;*/
	    /*}*/
	    img {
	      width: 100%;
	      height: 20rem;
	    }

    	.blockInfo{
    		width: 100%;
    		padding:1.5rem 2rem;
    		font-family: PingFang-SC-Regular;
    		background: #ffffff;
    		h2{
    			font-size: 2.4rem;
    			font-family: PingFang-SC-Bold;
				font-weight: bold;
    		}
    		.addr{
				font-size: 1.5rem;
				color: #333333;

				span{
					color: #754501;
				}
    		}
    		.price{
				font-size: 2.1rem;
				display: flex;
				justify-content: space-between;
				margin-top: 2.5rem;
				span{
					color: #9c9a9d;
				}
				span:first-child{
					color: #e10000;
				}
    		}
    		.price_name{
    			font-size: 1.5rem;
				display: flex;
				justify-content: space-between;
				padding:1.5rem 2rem 0;
				span{
					color: #424242;
				}
    		}
    	}

 	 }

 	 .houseInfo{
 	 	width: 100%;
		padding:1.5rem 2rem 1rem;
		margin-bottom: 1rem;
		background: #ffffff;
		.houseInfo-title{
			display: flex;
			justify-content: space-between;
			margin-bottom: 2.5rem;
			.look-more{
				font-size: 1.8rem;
			}
			span{
				font-family: PingFang-SC-Bold;
				font-weight: bold;
				font-size: 1.6rem;
			}
			span:last-child{
				font-family: PingFang-SC-Regular;
				font-size: 1.5rem;
				font-family: normal;
				color:#182F6D;
			}
		}
		p{
			color: #888888;
			font-size: 1.5rem;
			margin-bottom: 1.5rem;
			span{
				color: #424242;
			}
		}
 	 }

 	 .homeMap{
 	 	background: #ffffff;
 	 	margin-bottom: 5rem;
 	 	h3{
 	 		font-size: 1.6rem;
 	 		font-weight: bold;
 	 		color: #424242;
 	 		padding:1.5rem 2rem 2.5rem;
 	 	}
 	 }

 	 /* .remark{
 	 	background: #ffffff;
 	 	margin-bottom: 5.5rem;
 	 	padding:1.5rem 2rem;
 	 	h3{
 	 		font-size: 1.6rem;
 	 		font-weight: bold;
 	 		color: #424242;
 	 		margin-bottom: 2.5rem;
 	 	}
 	 	p{
 	 		font-size: 1.5rem;
 	 		color: #424242;
 	 	}
 	 } */

	.contact{
		font-size: 1.6rem;
			width: 100%;
			height: 5rem;
			line-height: 5rem;
			text-align: center;
			color: #ffffff;
			background: #162E6C;
			position: fixed;
			bottom: 0;
			z-index: 66;
		}

  }

</style>
