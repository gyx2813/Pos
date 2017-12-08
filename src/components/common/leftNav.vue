<template>
  <div class="left-nav">
    <ul>
      <router-link to="/page/Pos" class="tab-item">
        <li>
          <i class="icon iconfont icon-kefuyouxian"></i>
          <div>收银</div>
        </li>
      </router-link>
      <router-link to="/page/Shop" class="tab-item">
        <li>
          <i class="icon iconfont icon-chongzhi"></i>
          <div>店铺</div>
        </li>
      </router-link>
      <router-link to="/page/Member" class="tab-item">
        <li>
          <i class="icon iconfont icon-tianmaopaidui"></i>
          <div>会员</div>
        </li>
      </router-link>
      <router-link to="/page/Count" class="tab-item">
        <li>
          <i class="icon iconfont icon-chaozhijifen"></i>
          <div>统计</div>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    data () {
      return {
      }
    }
  }
</script>
<style>
  .left-nav{
    color:#fff;
    font-size:10px;
    height:100%;
    background-color: #1D8ce0;
    float:left;
    width:5%;
  }
  .iconfont{
    font-size:24px;
  }
  .left-nav ul{
    padding:0;
    margin: 0;
  }
  .left-nav li{
    list-style: none;
    text-align: center;
    border-bottom:1px solid #20a0ff;
    padding:10px;
  }
  .left-nav .router-link-active{
    color:orangered;
    background: orangered;
  }
</style>
