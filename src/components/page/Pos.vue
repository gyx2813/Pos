<template>
  <div class="pos">
    <div>
      <el-row >
        <el-col :span='7' class="pos-order" id="order-list">
          <el-tabs>
            <el-tab-pane label="点餐">
              <el-table :data="tableData" style="width: 100%">

                <el-table-column prop="goodsName" label="商品"  ></el-table-column>
                <el-table-column prop="count" label="数量" width="70"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column  label="操作" width="100" fixed="right">
                  <template scope="scope">
                    <el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
                    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="sum-box">数量：{{totalCount}} &nbsp;&nbsp;&nbsp;&nbsp; 金额：{{totalMoney}}元</div>
              <div class="btn-box">
                <el-button type="warning" >挂单</el-button>
                <el-button type="danger" @click="delAllGoods">删除</el-button>
                <el-button type="success" @click="checkout">结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!--商品展示-->
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="goods in oftenGoods" @click="addOrderList(goods)">
                  <span>{{ goods.goodsName }}</span>
                  <span class="o-price">￥{{ goods.price }}元</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-type">

            <el-tabs>
              <el-tab-pane label="汉堡">
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </el-tab-pane>

            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'Pos',
    data () {
      return {
        totalCount: 0,
        totalMoney: 0,
        tableData: [],
        oftenGoods: [],
        type0Goods: [],
        type1Goods: [],
        type2Goods: [],
        type3Goods: []
      }
    },
    created () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(response => {
          console.log(response)
          this.oftenGoods = response.data
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response => {
          console.log(response)
          this.type0Goods = response.data[0]
          this.type1Goods = response.data[1]
          this.type2Goods = response.data[2]
          this.type3Goods = response.data[3]
        })
        .catch(error => {
          console.log(error)
          alert('网络错误，不能访问')
        })
    },
    mounted: function () {
      let orderHeight = document.body.clientHeight
      console.log(orderHeight)
      document.getElementById('order-list').style.height = orderHeight + 'px'
    },
    methods: {
      addOrderList (goods) {
        let isHave = false
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId === goods.goodsId) {
            isHave = true
          }
        }
        if (isHave) {
          let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
          console.log(arr)
          arr[0].count++
        } else {
          let newGoods = {goodsId: goods.goodsId, goodsName: goods.goodsName, price: goods.price, count: 1}
          this.tableData.push(newGoods)
        }
        this.getAllMoney()
      },
      delSingleGoods (goods) {
        this.tableData = this.tableData.filter(o => o.goodsId !== goods.goodsId)
        this.getAllMoney()
      },
      getAllMoney () {
        this.totalCount = 0
        this.totalMoney = 0
        if (this.tableData) {
          this.tableData.forEach((element) => {
            this.totalCount += element.count
            this.totalMoney = this.totalMoney + (element.price * element.count)
          })
        }
      },
      delAllGoods () {
        this.tableData = []
        this.totalCount = 0
        this.totalMoney = 0
      },
      checkout () {
        if (this.totalCount !== 0) {
          this.$alert('收款' + this.totalMoney + '元', '结账成功', {
            confirmButtonText: '确定',
            callback: this.delAllGoods()
          })
        } else {
          this.$message.error('不能空结。老板了解你急切的心情！')
        }
      }
    }
  }
</script>
<style>
.tab{padding:0 0 0 10px;}
.pos-order{
  background: #f9fafc;
  border:1px solid #c0ccda;
}
.btn-box{margin: 10px auto 0;}
.title{
  border-bottom:1px solid #D3DCE6;
  background-color: #F9FAFC;
  padding:10px;
  text-align: left;
}
.often-goods-list ul li{
  list-style: none;
  float:left;
  border:1px solid #E5E9F2;
  padding:10px;
  margin:5px;
  background-color:#fff;
  cursor: pointer;
}
.o-price{
  color:#58B7FF;
}
.cookList li{
  list-style: none;
  width:23%;
  border:1px solid #E5E9F2;
  height: auto;
  overflow: hidden;
  background-color:#fff;
  padding: 2px;
  float:left;
  margin: 2px;
  cursor: pointer;
}
.cookList li span{

  display: block;
  float:left;
}
.foodImg{
  width: 40%;
}
.foodName{
  font-size: 16px;
  padding-left: 10px;
  color:brown;

}
.foodPrice{
  font-size: 16px;
  padding-left: 10px;
  padding-top:10px;
}
.goods-type{clear: both;}
  .sum-box{
    background:#fff;padding: 10px 0;border-bottom:1px solid #d3dce6;
  }
</style>
