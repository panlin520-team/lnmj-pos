<!-- 体验卡 -->
<template>
  <div class="expcardPage">
    <div class="ordersearch">
      <label>体验卡名称：</label>
      <el-input v-model="input_experience" placeholder="请输入要查询的商品" v-on:keyup.13.native="searchexp"></el-input>
      <span @click="searchexp">
        <!-- <el-button size="medium" type="warning"> -->
        <i class="el-icon-search"></i>
        <!-- </el-button> -->
      </span>
    </div>
    <div class="expxardeCars">
      <div class="somersCar" v-for="item in somersCarshu" :key="item.id">
        <div class="discovery" @click="car_smreos(item)">
          <img :src="item.logoImage" alt />
        </div>
        <div class="dislabel">
          <label>{{item.cardName}}</label>
          <span>{{item.account}}元</span>
          <el-button size="mini" @click="cardparticulars(item)" type="warning">详情</el-button>
        </div>
      </div>

      <!-- 转页 -->
      <div class="positions">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage_one"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="totals"
        ></el-pagination>
      </div>
    </div>
    <PopOver
      custom-class="storageblockcard"
      :visible.sync="visible_card"
      @close="closePopcard"
      width="500px"
    >
      <div class="stgblcktop" slot="top">{{vardName}}</div>
      <div class="stgblcktopmain" slot="main">
        <div class="cardlist">
          <label>销量：</label>
          <span>{{salesVolume}}</span>
        </div>
        <div class="cardlist">
          <label>剩余库存：</label>
          <span>{{stockNum}}</span>
        </div>
        <div class="cardlist">
          <label>截止日期：</label>
          <span>{{purchaseDeadline}}</span>
        </div>
      </div>
      <div class="stgblckbottom" slot="bottom"></div>
    </PopOver>
    <!-- 弹出框 -->
    <PopOver
      custom-class="storageblock"
      :visible.sync="visible_examine"
      @close="closePopOver"
      width="1100px"
    >
      <div class="stgblcktop" slot="top">支付信息</div>
      <div class="stgblcktopmain" slot="main">
        <el-table :data="tableData_car" style="width: 100%">
          <el-table-column label="项目" width="300">
            <template slot-scope="scope">
              <span>{{ scope.row.productName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="次数">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">{{ scope.row.useTotalTimes }}</div>
            </template>
          </el-table-column>
          <el-table-column label="期限">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">{{ scope.row.useLimit }}</div>
            </template>
          </el-table-column>
        </el-table>
        <div class="particularsCar">
          <label>支付价格：</label>
          <el-input v-model="account" :disabled="true" placeholder="请输入支付价格"></el-input>
          <div class="originalCost">
            销售价格:(
            <span>{{account}}</span>)元
          </div>
          <el-select v-model="value_payment" placeholder="请选择支付方式">
            <el-option
              v-for="item in option_payment"
              :key="item.payTypeId"
              :label="item.payTypeName"
              :value="item.payTypeId"
            ></el-option>
          </el-select>
          <el-select v-model="value_employees" @change="clickpeople" placeholder="请选择出售员工">
            <el-option
              v-for="item in option_saleEmployees"
              :key="item.value"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
          <div class="wotercared">
            <label>水单号：</label>
            <el-input type="text" v-model="woterMemo" clearable placeholder="请输入水单号"></el-input>
          </div>
        </div>
      </div>
      <div class="stgblckbottom" slot="bottom">
        <el-button @click="tallyClick">取消</el-button>
        <el-button type="success" @click="purchase">确认购买</el-button>
      </div>
    </PopOver>
    <MemberFrame ref="moduleName"></MemberFrame>
  </div>
</template>

<script>
import MemberFrame from "@/components/MemberFrame/MemberFrame";

export default {
  components: { MemberFrame },
  data() {
    return {
      //搜索框
      input_experience: "",
      //选项卡首页
      currentPage_one: 1,
      //每页个数
      pageSize: 9,
      //总数
      totals: 0,
      //销售价格
      account: "",
      //支付方式
      value_payment: "",
      //出售员工
      value_employees: "",
      //保存payType值
      payType: "",
      //创建人
      createOperator: "",
      modifyOperator: "",
      //水单号
      woterMemo: "",
      //体验卡项目卡号
      cardNum: "",
      //支付方式
      amount: "",
      payType: "",
      qqq: "",
      //获取出售员工值
      paymentPeople: [],
      //所有卡片
      somersCarshu: [],
      //卡片详情日期
      purchaseDeadline: "",
      //剩余库存
      salesVolume: "",
      //总库存
      stockNum: "",
      //体验卡详情名字
      vardName: "",
      //查看详情
      visible_examine: false,
      visible_card: false,
      //项目列表
      tableData_car: [],
      //支付方式选择
      option_payment: [
        {
          payType: "3",
          label: "现金支付"
        },
        {
          payType: "4",
          label: "刷卡支付"
        }
      ],
      //出售员工选择
      option_saleEmployees: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    //分页
    handleSizeChange(val) {},
    handleCurrentChange(val) {
      this.expcardCars();
    },
    //点击卡片查看详情
    car_smreos(res) {
      this.woterMemo = "";
      this.value_payment = "";
      this.value_employees = "";
      this.cardNum = res.cardNum;
      this.cardName = res.cardName;
      this.account = res.account;
      this.createOperator = res.createOperator;
      this.modifyOperator = res.modifyOperator;
      this.option_payment = [];
      this.visible_examine = true;
      this.sellEmployee();
      this.projectCars();
      this.sellpartylpy();
    },
    closePopOver() {
      this.visible_examine = false;
    },
    closePopcard() {
      this.visible_card = false;
    },
    //搜索体验卡
    searchexp() {
      this.searchCars();
    },
    //取消
    tallyClick() {
      this.visible_examine = false;
    },
    //获取出售员工值
    clickpeople(val) {
      this.option_saleEmployees.forEach(value => {
        if (value.name == val) {
          this.paymentPeople[0] = {
            beauticianName: value.name,
            postId: value.postId,
            beauticianId: value.staffNumber
          };
        }
      });
    },
    //体验卡详情页
    cardparticulars(res) {
      this.vardName = res.cardName;
      this.purchaseDeadline = res.purchaseDeadline;
      this.salesVolume = res.salesVolume;
      this.stockNum = res.stockNum;
      this.visible_card = true;
    },
    //确认购买
    purchase() {
      if (this.value_payment == "") {
        this.$message.error("请选择支付方式");
      } else if (this.value_employees == "") {
        this.$message.error("请选择出售员工");
      } else if (this.woterMemo == "") {
        this.$message.error("请选择水单号");
      } else if (!localStorage.getItem("memberName")) {
        this.$confirm("确定是否为散客购买吗？", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            //请求
            this.addOrderform();
            this.visible_examine = false;
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消购买"
            });
          });
      } else {
        //请求
        this.addOrderforms();
        this.visible_examine = false;
      }
    },
    //体验卡列表
    expcardCars() {
      var url =
        this.$https.storeHost +
        "/manage/experienceCard/selectExperienceCardList";
      var params = {
        storeId: localStorage.getItem("storeId"),
        pageSize: this.pageSize,
        pageNum: this.currentPage_one
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result) {
            this.totals = res.data.result.total;
            this.somersCarshu = res.data.result.list;
          } else {
            this.somersCarshu = [];
            this.totals = 0;
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },
    //搜索体验卡
    searchCars() {
      var url =
        this.$https.storeHost +
        "/manage/experienceCard/selectExperienceCardList";
      var params = {
        storeId: localStorage.getItem("storeId"),
        keyWordCardName: this.input_experience
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result !== null) {
            this.somersCarshu = res.data.result.list;
          } else {
            this.somersCarshu = [];
            this.totals = 0;
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },
    //请求体验卡项目
    projectCars() {
      var url =
        this.$https.storeHost +
        "/manage/experienceCard/selectExpCardProductListByCarNum ";
      var params = {
        cardNum: this.cardNum
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result) {
            this.tableData_car = res.data.result.list;
          } else {
            this.tableData_car = [];
            this.visible_examine = false;

            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },
    //添加体验卡订单
    addOrderform() {
      this.paymentTylp = [
        {
          amount: this.account,
          payType: this.value_payment
        }
      ];
      var url =
        this.$https.storeHost + "/manage/experienceCard/addExpCardOrder";
      var params = {
        account: this.account,
        cardName: this.cardName,
        cardNum: this.cardNum,
        memoNum: this.woterMemo,
        createOperator: localStorage.getItem("trueName"),
        linkPhone: localStorage.getItem("memberNumber"),
        purchaserName: localStorage.getItem("memberName"),
        storeId: localStorage.getItem("storeId"),
        memberNum: localStorage.getItem("membership"),
        beauticians: JSON.stringify(this.paymentPeople),
        payTypeAndAmount: JSON.stringify(this.paymentTylp)
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.responseStatusType.message == "Success") {
            this.$message({
              message: res.data.result,
              type: "success",
              duration: 5000
            });
          } else {
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },
    //添加体验卡订单
    addOrderforms() {
      this.paymentTylp = [
        {
          amount: this.account,
          payType: this.value_payment
        }
      ];
      var url =
        this.$https.storeHost + "/manage/experienceCard/addExpCardOrder";
      var params = {
        account: this.account,
        cardName: this.cardName,
        cardNum: this.cardNum,
        memoNum: this.woterMemo,
        createOperator: localStorage.getItem("trueName"),
        linkPhone: localStorage.getItem("memberNumber"),
        purchaserName: localStorage.getItem("memberName"),
        storeId: localStorage.getItem("storeId"),
        memberNum: localStorage.getItem("membership"),
        beauticians: JSON.stringify(this.paymentPeople),
        payTypeAndAmount: JSON.stringify(this.paymentTylp)
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.responseStatusType.message == "Success") {
            this.$message({
              message: res.data.result,
              type: "success",
              duration: 5000
            });
            //刷新等级
            this.$refs.moduleName.staCardxins();
          } else {
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },
    //请求支付方式
    sellpartylpy() {
      var url = this.$https.payHost + "/manage/payment/selectPayTypeList";
      var params = {
        // storeId: localStorage.getItem("storeId")
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result) {
            res.data.result.forEach(value => {
              if (value.payTypeCategory == 1) {
                this.option_payment.push({
                  payTypeCategory: value.payTypeCategory,
                  payTypeId: value.payTypeId,
                  payTypeName: value.payTypeName
                });
              }
            });
          } else {
            this.option_payment = [];
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },
    //出售员工请求
    sellEmployee() {
      var url =
        this.$https.storeHost + "/manage/beautician/selectBeauticianListNoPage";
      var params = {
        companyId: localStorage.getItem("storeId"),
        companyType: 3
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result !== null) {
            this.option_saleEmployees = res.data.result;
          } else {
            this.option_saleEmployees = [];
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    }
  },
  created() {
    //体验卡
    this.expcardCars();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
/* 引入公共css类 */
/* @import url(); */
.expcardPage {
  width: 100%;
  height: 100%;
  padding: 15px 15px 50px 0;
  background-color: #f0f2f5;
  display: flex;
  flex-flow: column;
  .ordersearch {
    width: 700px;
    height: 44px;
    display: flex;
    position: relative;
    margin: 15px auto;
    label {
      width: 143px;
      color: #333333;
      line-height: 40px;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: bold;
    }
    .el-input {
      border: 2px solid #feb019;
      border-radius: 4px;
    }
    span {
      width: 65px;
      height: 36px;
      padding-top: 7px;
      text-align: center;
      position: absolute;
      background-color: #feb019;
      border-radius: 0 4px 4px 0;
      right: 0;
      cursor: pointer;
      i {
        color: #fff;
        font-size: 25px;
      }
    }
  }
  .expxardeCars {
    box-shadow: 0px 0px 11px 2px rgba(207, 207, 207, 1);
    width: 1182px;
    margin: 0 auto;
    padding-bottom: 55px;
    display: flex;
    border-radius: 6px;
    background-color: #fff;
    flex-wrap: wrap;
    position: relative;
    .somersCar {
      width: 250px;
      height: 184px;
      margin: 25px 25px 25px 20px;
      border: 2px solid rgba(238, 238, 238, 1);
      position: relative;
      bottom: 0;
      transition: 0.5s;
      border-radius: 6px;
      -webkit-transition: 0.5s;
      .discovery {
        width: 247px;
        height: 141px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .dislabel {
        height: 30px;
        display: flex;
        margin: 8px;
        justify-content: space-between;
      }
      p {
        padding: 8px 0 0 15px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(85, 85, 85, 1);
      }
    }
    .somersCar:hover {
      cursor: pointer;
      bottom: 10px;
      box-shadow: 0px 0px 11px 2px rgba(207, 207, 207, 1);
    }
    .positions {
      position: absolute;
      bottom: 10px;
      left: 40%;
    }
  }
}
//弹出框
.storageblock {
  .stgblcktop {
    text-align: center;
    font-size: 16px;
  }
  .stgblcktopmain {
    padding: 35px 0 0 40px;
    border-top: 0.5px solid rgba(220, 220, 220, 0.7);

    .particularsCar {
      height: 50px;
      margin-top: 20px;
      line-height: 50px;
      display: flex;
      .originalCost {
        margin-left: 15px;
        line-height: 50px;
      }
      .wotercared {
        margin-left: 10px;
      }
      label {
        line-height: 46px;
      }
      .el-input {
        width: 180px;
        height: 46px;
        border-radius: 4px;
      }
      .el-select {
        margin-left: 15px;
        border-radius: 5px;
        height: 45px;
        width: 168px;
      }
    }
  }
  .stgblckbottom {
    text-align: center;
  }
}
//详情弹出框
.storageblockcard {
  .stgblcktop {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  }
  .stgblcktopmain {
    padding: 20px 0 0 40px;
    border-top: 0.5px solid rgba(220, 220, 220, 0.7);
  }
}
</style>

