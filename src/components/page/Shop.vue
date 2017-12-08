<template>
  <div>
    <h3 class="shop">{{msg}}</h3>
    <div class="slide_box">
      <el-carousel :interval="4000" type="card" height="250px">
        <el-carousel-item v-for="item in items" :key="item">
          <a :href="item.itemLink" class="a_link">
            <img :src="item.itemImg" :alt="item.itemTitle" class="img_style">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="card_box">
      <h3 class="Goods">商品卡片</h3>
      <el-row>
        <el-col :span="5" v-for="(item, index) in typeGoods"  class="margin">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.goodsImg" class="image">
            <div style="padding: 14px;">
              <span>{{item.goodsName}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ '￥'+item.price+'元'}}</time>
                <el-button type="text" class="button" @click="open(item)">查看</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default{
    data () {
      return {
        msg: 'GYX炸鸡啤酒',
        items: [
          { itemId: 1, itemImg: 'http://html5.smoothculture.com/yongxin/images/ac1.jpg', itemTitle: '周末大放送', itemLink: 'https://www.baidu.com/' },
          { itemId: 2, itemImg: 'http://html5.smoothculture.com/yongxin/images/ac2.jpg', itemTitle: '全场五折', itemLink: 'http://jspang.com/' },
          { itemId: 3, itemImg: 'http://html5.smoothculture.com/yongxin/images/ac3.jpg', itemTitle: '满200减20', itemLink: 'http://sports.sina.com.cn/nba/' },
          { itemId: 4, itemImg: 'http://html5.smoothculture.com/yongxin/images/ac4.jpg', itemTitle: '妈卖批', itemLink: 'http://sports.sina.com.cn/nba/' }
        ],
        currentDate: new Date(),
        typeGoods: []
      }
    },
    methods: {
      open (item) {
        this.$alert('好吃又便宜！<strong style="color: red">只卖￥' + item.price + '元！！！</strong>', item.goodsName, {
          dangerouslyUseHTMLString: true
        })
      }
    },
    created () {
      axios.get('http://jspang.com/DemoApi/typeGoods.php').then(response => {
        this.typeGoods = response.data[0].concat(response.data[1], response.data[2], response.data[3])
      })
      .catch(error => {
        console.log(error)
        alert('网络错误，不能访问')
      })
    }
  }
</script>
<style>
  .shop{font-size:24px;padding:20px 0 10px 0;color: orangered;}
  .Goods{font-size:22px;padding:10px 0 20px 0;color: purple;}
  .slide_box{width:100%;margin:10px auto 0;padding:0 20px;}
  .a_link{width:100%;height:100%;display:block;}
  .img_style{width:100%;height:250px;}
  .card_box{padding:10px 20px;}
  .margin{margin:0 0 20px 40px;text-align: left;}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {  font-size: 13px;  color: #999;  }

  .bottom {  margin-top: 13px;  line-height: 12px;  }

  .button {  padding: 0;  float: right;  }

  .image {  width: 100%;  display: block;  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {  clear: both  }
</style>
