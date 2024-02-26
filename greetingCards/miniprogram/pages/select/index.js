const app = getApp(); // 全局APP
let that = null; // 页面this指针
const { baseURL } = require("../../envList");
Page({
  data: {
    current: 0,
    indicatorDots: true,
    imageUrls: [
      `${baseURL}/images/card-1.png`,
      `${baseURL}/images/card-2.png`,
      `${baseURL}/images/card-3.png`,
      `${baseURL}/images/card-4.png`,
    ],
  },
  /**
   * 页面加载
   */
  onLoad() {
    that = this; // 页面this指向指针变量
  },
  onChange(event) {
    this.setData({
      current: event.detail.current,
    });
  },
  onConfirm() {
    console.log(this.data.current);
    wx.navigateTo({
      url: `/pages/text/index?url=${this.data.imageUrls[this.data.current]}`,
    });
  },
});
