<!-- 定制-->
<template>
  <div class="customization-page_root">
    <el-row>
      <!-- 左边 -->
      <div class="elleft">
        <p class="title">收银产品</p>
        <!-- 选择日期弹出框 -->
        <PopOver
          custom-class="storageblocks"
          :visible.sync="visible_times"
          @close="closeTime"
          width="450px"
        >
          <div class="stgblcktop" slot="top">产品截止日期</div>
          <div class="stgblcktopmain" slot="main">
            <div class="optionDate">
              <label>产品截止日期：</label>
              <el-date-picker
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="value_invenT"
                type="date"
                class="herderDatePicker"
                placeholder="选择日期"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </div>
          </div>
          <div class="stgblckbottom" slot="bottom">
            <el-button @click="confirm_true" size="small" type="success">确定</el-button>
            <el-button @click="confirm_false" size="small" type="info">取消</el-button>
          </div>
        </PopOver>
        <!-- </div> -->

        <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            class="cashierTitle"
            v-for="(item) in editableTabs"
            :key="item.commodityTypeID"
            :label="item.commodityTypeName"
            :name="item.commodityTypeID"
          >
            <el-tabs
              type="border-card"
              v-if="visible_merchande == true"
              v-model="activeName_common"
              @tab-click="commonleClick"
            >
              <el-tab-pane
                v-for="(item) in productbleTabs"
                :key="item.subclassID2"
                :label="item.subclassName"
                :name="item.subclassID2"
              >
                <el-row :gutter="20" class="el_carconnent">
                  <div class="carBox">
                    <div
                      class="grid-content"
                      v-for="item in productmodel"
                      :key="item.index"
                      @click="car_smreos(item)"
                    >
                      <div class="pd-content">
                        <span>{{item.productName}}</span>
                      </div>
                      <div class="bottom-content">
                        <span class="left-list">
                          <span class="figure-title">￥：</span>
                          <span class="figure">{{item.retailPrice}}</span>
                          元
                        </span>
                        <span class="right-list">
                          <span class="figure-title">库存：</span>
                          <span class="figure">{{item.stockNum}}</span>个
                        </span>
                      </div>
                    </div>
                  </div>
                </el-row>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>-->

        <!-- 大类 -->
        <div class="tab">
          <div
            class="tabItem btn-pointer"
            v-for="item in menu"
            v-if="item.isShowInPos == 1"
            :class="item.commodityTypeID == currentMenuId ? 'active' : ''"
            @click="fetchMenuItem(item.commodityTypeID)"
          >{{item.commodityTypeName}}</div>
        </div>

        <!-- 小类 -->
        <div class="submenu">
          <div
            class="submenuItem btn-pointer"
            v-for="item in menuItem"
            :key="item.subclassID"
            :class="item.subclassID == currentMenuItemId ? 'active' : ''"
            @click="fetchCommodity(item.subclassID)"
          >{{item.subclassName}}</div>
          <!-- 产品 currentMenuId == 2 -->
          <!-- <div
              class="submenuItem btn-pointer"
              v-for="item in productMenu"
              v-if="currentMenuId == 2"
              :key="item.productKindId"
              :class="item.productKindId == currentProductMenuId ? 'active' : ''"
              @click="fetchProductItemsById(item.productKindId)"
          >{{item.productTypeName}}</div>-->
        </div>

        <!-- 商品 -->
        <div class="box scrollY">
          <div
            class="boxItem btn-pointer"
            v-for="(item,index) in commodityItem"
            @click="car_smreos(item)"
          >
            <div class="name">{{item.productName}}</div>
            <div class="info">
              <div class="price">
                ¥:
                <span>{{item.retailPrice}}</span>元
              </div>
              <div class="stockNum">
                库存:
                <span>{{item.stockNum}}</span>个
              </div>
            </div>
          </div>
          <!-- <div
              class="boxItem btn-pointer"
              v-for="item in productItems"
              @click="fetchProductParams(item)"
              v-if="currentMenuId == 2"
            >
              <div class="name">{{item.productName}}</div>
              <div class="info">
                <div class="price">
                  ¥:
                  <span>{{item.retailPrice}}</span>元
                </div>
                <div class="stockNum">
                  库存:
                  <span>{{item.stockNum}}</span>
                </div>
              </div>
          </div>-->
        </div>

        <!-- <div class="grid-content" v-for="(item,index) in commodityItem" @click="car_smreos(item)">
          <div class="pd-content">
            <span>{{item.productName}}</span>
          </div>
          <div class="bottom-content">
            <span class="left-list">
              <span class="figure-title">￥：</span>
              <span class="figure">{{item.retailPrice}}</span>
              元
            </span>
            <span class="right-list">
              <span class="figure-title">库存：</span>
              <span class="figure">{{item.stockNum}}</span>个
            </span>
          </div>
        </div>-->

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="pageSize"
          background
          layout="total, prev, pager, next"
          :total="pageTotal"
        ></el-pagination>
      </div>
      <!-- 右边内容 -->
      <div class="elright">
        <div class="list-content-right">
          <div class="project-header">
            <p class="project-title">项目定制订单</p>
            <div class="project-name">
              <img src="../../assets/images/member.png" alt />
              <span class="name" v-if="this.$store.state.member == null"></span>
              <span class="name" v-if="this.$store.state.member !== null">
                姓名：
                <span class="name-message">{{this.$store.state.member.userName}}</span>
              </span>
            </div>
          </div>
          <!-- 列表 -->
          <div class="list-content">
            <el-table :data="tableDataList" class="table-box">
              <el-table-column label="项目名称" min-width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.productName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="数量" min-width="80">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <input
                      @change="changeNumer(scope.row)"
                      type="number"
                      v-model="scope.row.amount"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="单价" min-width="80">
                <template slot-scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <input
                      type="number"
                      @change="changeRefer(scope.row)"
                      v-model="scope.row.discountPrice"
                    />
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="原价" min-width="80">
                <template slot-scope="scope">
                  <!-- <div slot="reference" class="name-wrapper">{{retailPricess}}</div> -->
                  <el-input v-model="scope.row.retailPricess" :disabled="true"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="总价" min-width="80">
                <template slot-scope="scope">
                  <!-- <div
                    slot="reference"
                    class="name-wrapper"
                  >{{ scope.row.amount * scope.row.retailPrice }}</div>-->
                  <input
                    @change="changeNumes(scope.row)"
                    type="number"
                    v-model="scope.row.originalPrice"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="compile" label="编辑">
                <template slot-scope="scope">
                  <el-button @click="removeBtn(scope.row,scope.$index)" type="danger" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- 底部信息 -->
          <div class="bottom-box">
            <div class="demo-input-suffix">
              水单号：
              <el-input v-model="input_woreter" placeholder="请输入水单号"></el-input>
            </div>
            <div class="demo-input-suffix2">
              备注：
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </div>
            <div class="display-box">
              <div class="price-display">
                <p>
                  原价：
                  <span class="price">{{retailPrespoe}}</span>
                  <span class="price-unit">元</span>
                </p>
                <p>
                  总价：
                  <span class="price">{{totalPrice}}</span>
                  <span class="price-unit">元</span>
                </p>
              </div>
              <div class="button-srue">
                <el-button @click="placeOrder" type="warning">确认定制</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-row>

    <!-- 支付弹出框 -->
    <PopOver
      custom-class="storageblock"
      :visible.sync="visible_examine"
      @close="closePopOver"
      width="450px"
    >
      <div class="stgblcktop" slot="top">支付信息</div>
      <div class="stgblcktopmain" slot="main">
        <div class="paymentprice">
          <div class="stgeprice">
            <label>原价：</label>
            <span>{{retailPrespoe}}元</span>
          </div>
          <div class="stgeprice">
            <label>总价：</label>
            <span>{{totalPrice}}元</span>
          </div>
        </div>
        <div>
          <div class="catalysis">
            <div>
              <label>支付方式：</label>
              <el-select v-model="input_cataly" @change="changeOpen" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.payTypeId"
                  :label="item.payTypeName"
                  :value="item.payTypeId"
                ></el-option>
              </el-select>
            </div>
            <div>
              <label>支付金额：</label>
              <el-input v-model="input_present" :disabled="true" placeholder="请输入支付金额"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="stgblckbottom" slot="bottom">
        <el-button @click="confirm_storage" type="success">确认购买</el-button>
      </div>
    </PopOver>
    <MemberFrame ref="moduleName"></MemberFrame>
  </div>
</template>

<script>
import MemberFrame from "@/components/MemberFrame/MemberFrame";
import { lemonchiffon } from "color-name";

export default {
  name: "Navnu",
  components: { MemberFrame },
  data() {
    return {
      activeName: "",
      //当前页
      currentPage3: 1,
      input: "",
      pageSize: 9,
      //会员名
      // userName: "",
      //总页
      pageTotal: 0,
      //单选
      radio: "1",
      //赠送支付
      input_present: "",
      //ID
      commodityTypeID: "",
      //kind
      productKindId: "1",
      payTypeCategory: "",
      accountType: "",
      //密码
      secret: "",
      prodtCdList: [],
      //计算原价
      retailPrespoe: "0",
      //计算总价
      totalPrice: "0",
      //水单号
      input_woreter: "",
      payTypeName: "",
      //NAME
      commodityTypeName: "",
      //ID
      subclassID: "",
      //NAME
      subclassName: "",
      activeName_common: "",
      //储蓄支付
      input_cataly: "",
      retailPricess: "",
      //弹出框
      visible_examine: false,
      visible_merchande: false,
      visible_times: false,
      //新数组
      newtableDatas: [],
      //默认数量
      amount: "1",
      kind: "",
      options: [],
      //库存数量
      stockNum: "",
      discounts: "",
      //商品ID
      serviceProductId: "",
      tableDataLists: [
        {
          productCode: "wayesdgda",
          productName: "产品2",
          amount: "122"
        },
        {
          productCode: "wawervne",
          productName: "产品3",
          amount: "122"
        }
      ],
      tableDataList: [],
      //收银产品项目
      editableTabs: [],
      // 门店开单菜单
      menu: [],
      currentMenuId: "",
      menuItem: [],
      currentMenuItemId: "",
      commodityItem: [],
      productbleTabs: [],
      //项目单个数据
      productmodel: [],
      //商品项目
      typep: "",
      //产品截止日期
      value_invenT: "",
      resList: {},
      //产品有效期验证
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now(); //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },
      virtualHeight: window.innerHeight
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 门店大类
    fetchMenus() {
      var url = this.$https.dataHost + "/commodityType/selectCommodityTypeList";
      var params = {
        isDingzhi: 1,
        commodityTypeIndustryID: localStorage.getItem("industryID")
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result) {
            this.menu = res.data.result.list;
            this.currentMenuId = res.data.result.list[0].commodityTypeID;
            this.fetchMenuItem(res.data.result.list[0].commodityTypeID);
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

    // 门店小类
    fetchMenuItems(id) {
      this.currentMenuId = id;
      this.menuItem = [];
      this.commodityItem = [];
      var url =
        this.$https.dataHost + "/commodityType/selectSubclassByCondition";
      var params = {
        commodityTypeID: id,
        storeId: localStorage.getItem("storeId")
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result) {
            this.menuItem = res.data.result.list;
            this.currentMenuItemId = res.data.result.list[0].subclassID;
            this.fetchCommodity(res.data.result.list[0].subclassID);
          } else {
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.menuItem = [];
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },

    // 门店小类商品
    fetchCommoditys(id) {
      this.currentMenuItemId = id;
      var url = this.$https.productHost + "/manage/product/selectProductList";
      var params = {
        companyId: localStorage.getItem("storeId"),
        subClassId: id,
        isHoutai: 0,
        companyType: 3,
        productStatus: 1,
        pageNum: this.currentPage3,
        pageSize: this.pageSize
      };
      this.$https.fetchPost(url, params).then(
        res => {
          if (res.data.result) {
            this.commodityItem = res.data.result.list;
            this.pageTotal = res.data.result.total;
          } else {
            this.productmodel = [];
            this.pageTotal = 0;
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        },
        error => {
          this.commodityItem = [];
          this.$message({
            type: "error",
            message: error
          });
        }
      );
    },

    //选择时间后添加
    confirm_trues() {
      let res = this.resList;
      var object = {
        useLimit: this.value_invenT
      };
      res = Object.assign(this.resList, object);
      if (this.value_invenT !== "") {
        this.visible_times = false;
        this.tableDataList.push(res);
        this.calcTotalPrice();
        this.value_invenT = "";
      } else {
        this.$message({
          message: "请选择产品截止日期",
          type: "warning"
        });
      }
    },
    //取消选择时间
    confirm_false() {
      this.visible_times = false;
      this.value_invenT = "";
    },
    clickitem(res) {
      // this.resList = res;
      // this.visible_times = true;
      var ress = this.tableDataList.find(item => {
        return item.productCode == res.productCode;
      });
      if (ress == undefined) {
      } else {
        this.visible_times = false;
        this.$message({
          message: "该商品已存在，可直接修改数量",
          type: "warning"
        });
      }
    },
    closeTime() {
      this.visible_times = false;
      this.value_invenT = "";
    },
    calcTotalPrice: function() {
      this.totalPrice = 0; //总金额进行清零
      this.retailPrespoe = 0; //原价清零
      this.tableDataList.forEach((item, index) => {
        if (item) {
          this.totalPrice += item.amount * item.discountPrice; //累加的
          this.retailPrespoe += item.amount * item.retailPricess;
        }
      });
    },
    //点击添加订单value_invenT
    car_smreos(res) {
      this.retailPricess = res.retailPrice;
      this.serviceProductId = res.serviceProductId;
      this.stockNum = res.stockNum;
      // this.retailPrespoe = res.retailPrice * this.amount;
      var object = {
        amount: this.amount,
        productCode: res.productCode,
        subclassId: res.subClassID,
        productType: res.productType,
        productNum: this.amount,
        productName: res.productName,
        retailPricess: this.retailPricess,
        retailPrice: res.retailPrice,
        originalPrice: res.retailPrice * this.amount,
        discount: res.retailPrice / this.retailPricess,
        discountPrice: res.retailPrice,
        serviceProductId: res.serviceProductId
      };
      res = Object.assign({}, object);
      if (this.stockNum !== 0) {
        this.visible_times = true;
        this.resList = res;
        // this.tableDataList.push(res);
        var ress = this.tableDataList.find(item => {
          return item.productCode == res.productCode;
        });
        if (ress == undefined) {
          // this.tableDataList.push(res);
        } else {
          this.visible_times = false;

          this.$message({
            message: "该商品已存在，可直接修改数量",
            type: "warning"
          });
        }
      } else {
        this.$message({
          message: "该商品没有库存",
          type: "warning"
        });
      }
      //计算
      // this.calcTotalPrice();
    },
    handleClick(tab) {
      this.commodityTypeID = tab.name;
      this.visible_merchande = true;
      this.projectsubclass();
    },

    //项目里面点击切换
    commonleClick(tab) {
      this.subclassID = tab.name;
      this.projectsubsmall();
    },

    //下拉选择
    changeOpen(res) {
      this.options.forEach(value => {
        if (this.input_cataly == value.payTypeId) {
          this.payTypeCategory = value.payTypeCategory;
          this.accountType = value.accountType;
          this.payTypeName = value.payTypeName;
          this.discount = value.discount;
        }
        if (this.discount == 0) {
          this.input_present = this.retailPrespoe;
        } else {
          this.input_present = this.totalPrice;
        }
      });
    },

    //分页
    handleSizeChange(val) {
      this.projectsubsmall();
    },
    handleCurrentChange(val) {
      this.projectsubsmall();
    },
    //改变数量
    changeNumer(res) {
      res.productNum = res.amount;
      res.originalPrice = res.amount * res.discountPrice;
      if (res.amount < 1) {
        res.amount = 1;
      }
      //计算
      this.calcTotalPrice();
    },
    //改变总价
    changeNumes(res) {
      res.discountPrice = res.originalPrice / res.amount;
      this.calcTotalPrice();
    },
    //改变单价
    changeRefer(res) {
      res.discountPrice = parseInt(res.discountPrice);
      if (res.discountPrice < 1) {
        res.discountPrice = 1;
      }
      // res.amount = res.originalPrice / res.retailPrice;
      res.originalPrice = res.amount * res.discountPrice;
      // res.discountPrice = res.retailPrice;
      //计算
      this.calcTotalPrice();
    },
    //点击删除订单
    removeBtn(res, index) {
      this.amount = 1;
      this.retailPrespoe = this.retailPrespoe - res.amount * res.retailPrice;
      this.stockNum = parseInt(this.stockNum) + parseInt(this.amount);
      this.tableDataList.splice(index, 1);

      //计算
      this.calcTotalPrice();
    },

    closePopOver() {
      this.visible_examine = false;
    },
    //确认购买
    confirm_storage() {
      if (this.input_present == "") {
        this.$message({
          message: "请输入支付金额...",
          type: "warning"
        });
      } else if (this.input_cataly == "") {
        this.$message({
          message: "请选择支付方式...",
          type: "warning"
        });
      } else {
        this.endOrder();
        this.options = [];
        setTimeout(() => {
          // this.projectsubsmall();
          this.$refs.moduleName.memberbalance();
        }, 600);
        this.input_woreter = "";
        this.tableDataList = [];
        this.totalPrice = "0";
        this.input_cataly = "";
        this.visible_examine = false;
        this.retailPrespoe = "0";
      }
    },
    //确认定制
    placeOrder() {
      this.options = [];
      this.input_present = "";
      if (this.totalPrice <= 0) {
        this.$message({
          message: "警告哦，请选择商品...",
          type: "warning"
        });
      } else if (this.input_woreter == "") {
        this.$message({
          message: "警告哦，请输入水单号..",
          type: "warning"
        });
      } else if (this.$store.state.member == null) {
        this.$message({
          message: "请先选择下方会员..",
          type: "warning"
        });
      } else {
        this.$confirm("是否确认下单...", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.visible_examine = true;
            this.morepayment();
            this.affirmplOrder();
          })
          .catch(() => {
            this.options = [];
            this.$message({
              type: "info",
              message: "取消下单！"
            });
          });
      }
    },
    //支付方式
    morepayment() {
      var url = this.$https.payHost + "/manage/payment/selectPayTypeList";
      var params = {
        memberNum: localStorage.getItem("membership"),
        industryId: localStorage.getItem("industryID"),
        subClassId: ""
      };
      this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.result) {
            res.data.result.forEach(value => {
              if (value.payTypeCategory == 2) {
                this.options.push({
                  payTypeId: value.payTypeId,
                  payTypeCategory: value.payTypeCategory,
                  payTypeName: value.payTypeName,
                  accountType: value.accountType,
                  discount: value.discount
                });
              }
            });
          }
        })
        .catch(err => {});
    },
    //获取定制项目列表
    PlacementPrivate() {
      var url = this.$https.dataHost + "/commodityType/selectCommodityTypeList";
      var params = {
        isDingzhi: 1,
        commodityTypeIndustryID: localStorage.getItem("industryID")
      };
      this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.result.list) {
            res.data.result.list.forEach(value => {
              if (value.isShowInPos == 1) {
                this.editableTabs.push({
                  commodityTypeID: value.commodityTypeID + "",
                  commodityTypeIndustryID: value.commodityTypeIndustryID,
                  commodityTypeName: value.commodityTypeName,
                  createOperator: value.createOperator,
                  status: value.status
                });
              }
              this.currentMenuId = res.data.result.list[0].commodityTypeID;
            });
          } else {
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        })
        .catch(err => {});
    },
    //项目小类
    projectsubclass() {
      var url =
        this.$https.dataHost + "/commodityType/selectSubclassByCondition";
      var params = {
        commodityTypeID: this.commodityTypeID,
        storeId: localStorage.getItem("storeId")
      };
      this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.result) {
            let arr = res.data.result.list;
            for (let i = 0; i < arr.length; i++) {
              arr[i].subclassID2 = arr[i].subclassID + "";
              arr[i].subclassID3 = arr[i].subclassID + "";
            }
            this.productbleTabs = res.data.result.list;
          } else {
            this.productbleTabs = [];
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        })
        .catch(err => {});
    },
    //项目小类中小项目
    projectsubsmall() {
      var url = this.$https.productHost + "/manage/product/selectProductList";
      var params = {
        // subClassId: this.subclassID,
        companyId: localStorage.getItem("storeId"),
        subClassId: this.subclassID,
        isHoutai: 0,
        companyType: 3,
        productStatus: 1,
        pageNum: this.currentPage3,
        pageSize: this.pageSize
      };
      this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.result.total !== 0) {
            this.productmodel = res.data.result.list;
            this.pageTotal = res.data.result.total;
          } else {
            this.productmodel = [];
            this.pageTotal = 0;
            this.$message({
              message: "未找到商品",
              type: "warning"
            });
          }
        })
        .catch(err => {});
    },

    //确认下单
    affirmplOrder() {
      var url = this.$https.orderHost + "/order/createServiceOrder";
      var params = {
        orderType: 4,
        channel: 2,
        memoNum: this.input_woreter,
        storeId: localStorage.getItem("storeId"),
        cardNum: localStorage.getItem("membership"),
        orderLink: localStorage.getItem("memberName"),
        mobile: localStorage.getItem("memberNumber"),
        totalPrice: this.totalPrice,
        industryID: 1,

        productIds: JSON.stringify(this.tableDataList)
      };
      this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.result) {
            this.secret = res.data.result;
            this.$message({
              message: "下单成功",
              type: "success"
            });
          } else {
            this.visible_examine = false;

            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        })
        .catch(err => {});
    },
    //最后支付
    endOrder() {
      var arr = {
        payType: this.input_cataly,
        amount: this.input_present,
        payTypeName: this.payTypeName,
        accountType: this.accountType,
        payTypeCategory: this.payTypeCategory
      };
      var url = this.$https.orderHost + "/order/payOrder";
      var params = {
        payTypeAndAmount: JSON.stringify([arr]),
        productIds: JSON.stringify(this.tableDataList),
        payPrice: this.input_present,
        orderNumber: this.secret,
        industryId: this.input_cataly,
        createOperator: localStorage.getItem("trueName")
      };
      this.$https
        .fetchPost(url, params)
        .then(res => {
          if (res.data.result) {
            this.projectsubsmall();
            this.$message({
              message: res.data.result.order,
              type: "success"
            });
          } else {
            this.$message({
              message: res.data.responseStatusType.error.errorMsg,
              type: "warning"
            });
          }
        })
        .catch(err => {});
    }
  },
  created() {
    //体验卡列表
    // this.PlacementPrivate();
    this.fetchMenu();
  },
  mounted() {}
};
</script>

<style lang='scss' scoped>
.customization-page_root {
  position: relative;
  .title {
    font-size: 24px;
    color: #101010;
    margin-bottom: 25px;
    font-weight: bold;
  }
  .el-tabs__nav-scroll {
    font-size: 18px;
  }
  .el-tabs__item {
    color: #222222 !important;
    font-size: 18px;
    font-weight: 550;
  }
  .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    color: #23a547 !important;
    background-color: #f8f8f8 !important;
    border-right-color: #f8f8f8 !important;
    border-left-color: #f8f8f8 !important;
  }
  .el-tabs--border-card {
    border: 1px solid #ffffff !important;
  }
  // 内容盒子部分
  .el-row {
    display: flex;
    justify-content: space-around;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .elleft {
    border-radius: 4px;
    width: 45%;
    padding: 15px 0 0 15px;
  }
  .elright {
    border-radius: 4px;
    width: 42%;
    padding: 15px 0 0 15px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-tabs--border-card > .el-tabs__content {
    padding: 35px 0 40px 0 !important;
  }

  // 移入效果
  .content-box:hover {
    bottom: 10px;
    color: #23a547;
    box-shadow: 0px 0px 11px 2px rgba(207, 207, 207, 1);
  }

  .el_carconnent {
    display: flex;
    .carBox {
      width: 100%;
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      .grid-content {
        width: 208px;
        height: 170px;
        border-radius: 5px;
        margin-left: 50px;
        border-radius: 4px;
        min-height: 36px;
        margin-bottom: 30px;
        background: #f8f8f8;
        position: relative;
        box-shadow: 0 2px 2px 1px #dddddd;
        bottom: 0;
        transition: 0.5s;
        .pd-content {
          padding-top: 50px;
          text-align: center;

          width: 200px;
          height: 130px;
          span {
            width: 100%;
            height: 25px;
            margin-top: 50px;
            text-align: center;
          }
        }
      }
      .grid-content:hover {
        cursor: pointer;
        bottom: 10px;
        box-shadow: 0px 0px 11px 2px rgba(207, 207, 207, 1);
      }
    }
  }

  // 价格显示
  .bottom-content {
    height: 40px;
    width: 100%;
    padding-top: 10px;
    background: #f4f4f4;
    display: flex;
    border-radius: 5px;
    justify-content: space-between;
    .left-list {
      height: 40px;
    }
    .right-list {
      height: 40px;
    }
  }
  .figure-title {
    font-size: 14px;
    color: #555;
  }
  .figure {
    color: #feb019;
    font-weight: 700;
  }
  // 页码
  .el-pagination {
    text-align: center;
  }
  // 右边部分
  .list-content-right {
    min-width: 580px;
    margin-left: 30px;
    margin-right: 20px;
    border: 1px solid #eee;
    .list-content {
      width: 95%;
      margin: 0 auto;
      height: 470px;
      overflow: auto;
      .table-box {
        min-width: 95%;
        margin: 20px auto 0 auto;
        box-shadow: 0px 0px 13px 3px rgba(221, 248, 229, 1);
        border-radius: 4px;
        position: relative;
        input {
          border: 1px solid rgb(189, 184, 184);
          border-radius: 3px;
          width: 60px;
          height: 25px;
        }
      }
    }
    .project-header {
      background: #218e47;
      padding: 17px 17px 24px 29px;
      border-radius: 4px 0px 0px 0px;
      margin-bottom: 30px;
      .project-name {
        margin-top: 20px;
        display: inline-flex;
        padding-left: 34px;
        color: #fff;
        img {
          width: 21px;
          height: 21px;
        }
        .name {
          // color: #fff;
          display: inline-block;
          font-size: 16px;
          margin: 0 0 0 20px;
        }
        .name-message {
          // color: #fff;
          font-size: 14px;
        }
      }
      .project-title {
        color: #fff;
        font-size: 18px;
      }
    }
    .el-table thead {
      background: #eeeeee !important;
      color: #333 !important;
    }
    .is-leaf {
      background: #eee !important;
    }
    .el-table th {
      font-size: 16px !important;
      padding: 8px 0 !important;
    }
    .el-table .cell {
      color: #555 !important;
    }
    .el-table--enable-row-hover .el-table__body tr:hover > td {
      background-color: #e6fbe8 !important;
    }
    // 底部盒子
    .bottom-box {
      width: 90%;
      margin: 0 auto;
      border-top: 1px solid #eee;
      padding: 20px 30px 14px 50px;
      .remark {
        display: inline-block;
      }
      .el-input {
        width: 80%;
      }
      .el-input__inner {
        border: 1px solid #eee !important;
      }
      .el-input__inner:focus {
        outline: none;
        border-color: #23a547 !important;
      }
      .display-box {
        margin-top: 25px;
        float: right;
        margin-right: 30px;
      }
      .demo-input-suffix {
        margin-top: 10px;
      }
      .demo-input-suffix2 {
        margin-top: 10px;
        .el-input {
          width: 80%;
          margin-left: 13px;
        }
      }
      .button-srue {
        display: inline-block;
        padding-top: 6px;
      }
      .price-display {
        display: inline-block;
        width: 150px;
        p {
          color: #000;
          font-size: 18px;
        }
        .price {
          color: #d3971e;
          font-size: 16px;
          font-weight: 700;
        }
        .price-unit {
          font-size: 12px;
        }
      }
    }
    .del-icon {
      position: absolute;
      width: 100px;
      height: 100px;
    }
  }
}
.storageblock {
  .stgblcktop {
    text-align: center;
    font-size: 20px;
    font-weight: 550;
  }
  .stgblcktopmain {
    height: 300px;
    border-top: 0.5px solid rgba(220, 220, 220, 0.7);
    .paymentprice {
      width: 100%;
      display: flex;
      height: 45px;
      justify-content: space-around;
      border-bottom: 1px solid rgba(220, 220, 220, 0.7);
      .stgeprice {
        width: 110px;
        height: 16px;
        font-size: 16px;
        padding: 10px 0;
        span {
          font-size: 18px;
          color: #ecab1e;
        }
      }
    }
    .el-select {
      width: 215px;
    }
    .catalysis {
      width: 400px;
      margin: 50px 0 0 40px;
      .ratio {
        width: 150px;
      }
      label {
        width: 80px;
        margin-top: 12px;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .el-input {
        margin-top: 10px;
        width: 217px;
        border-radius: 5px;
      }
      .el-radio {
        margin-left: 20px;
      }
    }
    .catalysiss {
      width: 400px;
      height: 60px;
      margin: 30px 0 0 40px;
      display: flex;
      label {
        width: 80px;
        margin-top: 12px;
        font-size: 15px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .el-input {
        width: 180px;
        height: 45px;
        border-radius: 5px;
        border: 1px solid rgba(177, 173, 173, 0.7);
      }
      .el-radio {
        margin-left: 20px;
      }
    }
  }
  .stgblckbottom {
    text-align: center;
  }
}
//选择日期弹出框
.storageblocks {
  .stgblcktop {
    text-align: center;
    font-size: 22px;
    font-weight: 550;
  }
  .stgblcktopmain {
    height: 200px;
    border-top: 0.5px solid rgba(220, 220, 220, 0.7);
    .optionDate {
      padding: 50px 0 0 30px;
      label {
        font-weight: 550;
        font-size: 19px;
      }
    }
  }
  .stgblckbottom {
    text-align: center;
  }
}

.tab {
  position: relative;
  background-color: #ffffff;
  border-bottom: 1px solid #f8f8f8;

  .tabItem {
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;

    &.active {
      font-size: 18px;
      font-weight: 700;
    }
  }
}

.submenu {
  position: relative;
  background-color: #f8f8f8;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  overflow: hidden;
  z-index: 10;
  margin: 0 15px 15px;
  font-size: 15px;

  .submenuItem {
    display: inline-block;
    padding: 0 18px;

    &.active {
      color: #23a547;
      font-weight: 700;
    }
  }
}

.box {
  position: relative;
  background-color: #ffffff;
  overflow-x: hidden;
  padding: 5px 15px 15px;
  clear: both;
  .boxItem {
    position: relative;
    float: left;
    width: 200px;
    height: 150px;
    background-color: #f8f8f8;
    border-radius: 6px;
    text-align: center;
    transition: 0.5s;
    bottom: 0;
    margin: 15px 15px 20px 0;
    box-shadow: 0 2px 2px 1px #dddddd;
    .name {
      height: 100px;
      font-size: 15px;
      color: #28282d;
      line-height: 20px;
      padding: 45px 5px 0 5px;
      overflow: hidden;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }

    .info {
      display: flex;
      height: 50px;
      line-height: 50px;
      background: #f4f4f4;
      font-size: 14px;
      padding: 0 5px;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;

      .price {
        flex: 1;
        text-align: left;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span {
          font-size: 16px;
          color: #feb019;
        }
      }
      .stockNum {
        flex: 1;
        text-align: right;
        width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        span {
          font-size: 15px;
          color: #feb019;
        }
      }
    }
  }
  .boxItem:hover {
    cursor: pointer;
    bottom: 10px;
    box-shadow: 0px 0px 11px 2px #cfcfcf;
  }
}
</style>
