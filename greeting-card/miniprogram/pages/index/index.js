const app = getApp(); // 全局APP
let that = null; // 页面this指针
Page({
  data: {},
  /**
   * 页面加载
   */
  onLoad() {
    that = this; // 页面this指向指针变量
  },
  onConfirm() {
    wx.navigateTo({
      url: "/pages/select/index",
    });
  },
});
