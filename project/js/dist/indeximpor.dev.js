"use strict";

$(document).ready(function () {
  pAjax({
    url: 'https://api5.hanfugou.com/Product/GetProductListPublicForHot',
    data: 'count=8',
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    var str = hotshop(data);
    $('.c_hotshop .hots').html(str);
  });
  pAjax({
    url: 'https://api5.hanfugou.com/Product/GetProductListPublicForDefault',
    data: 'count=8',
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    /*********汉服女装数据**** */

    var strgirl = hotshop(data.girl);
    $('.c_hotshop .girls').html(strgirl);
    /***********汉服男装数据** */

    var strboy = hotshop(data.boy);
    $('.c_hotshop .boys').html(strboy);
    /***************汉元素数据******* */

    var strhan = hotshop(data.hys);
    $('.c_hotshop .hans').html(strhan);
    /**************周边配饰数据* */

    var strot = hotshop(data.other);
    $('.c_hotshop .other').html(strot);
  });
  pAjax({
    url: 'https://api5.hanfugou.com/Shop/GetShopListForPublic',
    data: 'ishot=true&count=18',
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    hotpp(data); // console.log(data);
  });
  /***************背景图获取****************** */

  pAjax({
    url: 'https://api5.hanfugou.com/Poster/GetPosterInfoListForCode',
    data: 'code=gou_banner&count=4',
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    bgRead(data); // console.log(data);
  });

  function hotshop(data) {
    var str = '';
    data.forEach(function (item) {
      var bp = item.BasePrice.toFixed(2);
      str += "<li>\n            <img src=\"".concat(item.FaceSrc, "\" shopid=").concat(item.ID, " alt=\"\">\n            <p>\n                <i>\uFFE5</i>\n                ").concat(bp, "\n            </p>\n            <a shopid=").concat(item.ID, ">").concat(item.Name, "</a>\n        </li>");
    });
    return str;
  }

  function hotpp(data) {
    var str = '';
    data.forEach(function (item) {
      str += "<li>\n            <a idx=".concat(item.ID, "><img src=\"").concat(item.LogoSrc, "\" idx=").concat(item.ID, " alt=\"\"></a>\n            </li>");
    });
    $('.c_hotpp .hotpp').html(str);
  }
  /*****************首页商品点击转到详情页****************** */


  var hots = document.querySelector('.c_hotshop .hots');
  var girls = document.querySelector('.c_hotshop .girls');
  shopInfo('.hots');
  shopInfo('.girls');
  shopInfo('.boys');
  shopInfo('.hans');
  shopInfo('.other'); // hots.onclick = function(){
  //     let e = window.event;
  //     let shopid = e.target.getAttribute('shopid');
  //     location.href= `./html/shopInfo.html?shopid=${shopid}`
  // }

  /*******************热门品牌点击图标跳转到商家页************ */

  var pl = document.querySelector('.c_hotpp');

  pl.onclick = function () {
    var e = window.event;
    var idx = e.target.getAttribute('idx');
    console.log(idx);
    location.href = "./html/merInfo.html?idx=".concat(idx);
  };
  /*****************首页商品点击转到详情页的封装函数****************** */


  function shopInfo(obj) {
    var objj = document.querySelector(obj);

    objj.onclick = function () {
      var e = window.event;
      var shopid = e.target.getAttribute('shopid');

      if (shopid) {
        obj = obj.slice(1);
        location.href = "./html/shopInfo.html?shopid=".concat(shopid, "&type=").concat(obj);
      }
    };
  }
  /***************背景图渲染******************** */


  function bgRead(data) {
    var bstr = '';
    data.forEach(function (item) {
      bstr += " <div class=\"swiper-slide\"><img src=\"".concat(item.ImgSrc, "\" alt=\"\"></div>");
    });
    $('.swiper-wrapper').html(bstr);
    banner();
  }

  function banner() {
    var mySwiper = new Swiper('.swiper-container', {
      effect: 'fade',
      direction: 'horizontal',
      // 垂直切换选项
      loop: true,
      // 循环模式选项
      // autoplay: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        clickableClass: 'my-pagination-clickable'
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    });
  }
});