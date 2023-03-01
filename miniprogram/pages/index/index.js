// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

var counter = 0;
var updateTime = "";

Page({
  onLoad:function () {
    let localCounter = wx.getStorageSync('counter') || 0;
    let localUpdateTime = wx.getStorageSync('updateTime') || "";

    counter = localCounter;
    updateTime = localUpdateTime;

    console.log("current counter:%d", counter);
    this.updateData();
  },

  data: {
    counterDisplay:counter
  },

  increaseCounter:function() {
    counter++;
    updateTime = this.getCurrentTimeStr();
    this.updateData();
    this.saveData();

    wx.vibrateShort({
    });
  },

  decreaseCounter:function() {
    counter--;
    if(counter < 0) {
      counter = 0;
    }

    updateTime = this.getCurrentTimeStr();
    this.updateData();
    this.saveData();

    wx.vibrateShort({
    });
  },

  clearCounter:function() {
    counter = 0;
    updateTime = this.getCurrentTimeStr();
    this.updateData();
    this.saveData();
  },

  saveData:function() {
    wx.setStorageSync('counter', counter)
    wx.setStorageSync('updateTime', updateTime)
    console.log("save counter xxx");
    console.log(this.getCurrentTimeStr());
  },

  updateData:function() {
    this.setData({
      counterDisplay:counter,
      updateTimeDisplay:updateTime,
    });
  },

  getCurrentTimeStr:function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    if (month < 10) {
      month = "0" + month;
    }

    if (day < 10) {
      day = "0" + day;
    }

    if (hour < 10) {
      hour = "0" + hour;
    }

    if (minute < 10) {
      minute = "0" + minute;
    }

    if (second < 10) {
      second = "0" + second;
    }

    var timeStr = `更新时间:${year}年${month}月${day}日 ${hour}:${minute}:${second}`;

    sayHello();
    console.log(timeStr);

    return timeStr;
  }
});

function sayHello() {
  console.log("hello google");
}
