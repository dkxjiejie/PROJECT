"use strict";

$(document).ready(function () {
  var idx = location.search.slice(1).split('=')[1];
  console.log(idx);
  pAjax({
    url: 'https://api5.hanfugou.com/Product/GetProductTypeList',
    data: "shopid=".concat(idx),
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    shopFenlei(data);
    $('.left_fl .list li').click(function () {
      event.stopPropagation();
      /***************菜单栏点击颜色样式****************** */

      $(this).addClass('act').siblings().removeClass('act').parent().siblings().children().removeClass('act');
      var tp = $(this).attr('tp');
      typeGo(tp);
    });
  });
  pAjax({
    url: ' https://api5.hanfugou.com/Product/GetProductListPublic',
    data: "count=30&page=1&shopid=".concat(idx),
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    shopgo(data);
  });
  /***************左边分类页面数据获取*************** */

  function shopFenlei(data) {
    // let data = res.Data
    // 筛选出 标题数据
    var data1 = data.filter(function (item) {
      return item.ParentID == 0;
    }); //渲染标题数据

    var str = '';
    data1.forEach(function (item) {
      str += "<ul class=\"list\" indx=\"".concat(item.ID, "\">\n            <li class=\"listHead\" tp=").concat(item.ID, ">").concat(item.Name, "</li>\n            </ul>\n            ");
    });
    $('.left_fl').html(str); //拿到每一个标题数据的父元素的indx值

    var list = document.querySelectorAll('.left_fl .list');
    list.forEach(function (item) {
      var index = item.getAttribute('indx'); // console.log(item);
      // console.log(index);
      //筛选出 和标题数据的父元素的indx值一样的子元素的ParentID值，

      var ar = data.filter(function (ite) {
        return ite.ParentID == index;
      }); //然后添加到符合的标题数据的父元素的indx值里面渲染

      ar.forEach(function (it) {
        // console.log(it);
        var lis = document.createElement('li');
        lis.innerHTML = "".concat(it.Name);
        lis.setAttribute('tp', "".concat(it.ID));
        item.append(lis);
      });
    });
  }
  /**************数据渲染****************** */


  function shopgo(data) {
    var str = '';
    var strmer = '';
    data.forEach(function (item) {
      var bp = item.Price.toFixed(2);
      str += "<li >\n        <div class=\"shopid\">\n            <img src=\"".concat(item.FaceSrc, "\" idxx=").concat(item.ID, " alt=\"\">\n            <span>").concat(bp, "</span>\n            <p idxx=").concat(item.ID, ">").concat(item.Name, "</p>\n        </div>\n    </li>");
    });
    $('.product_list').html(str);
    var da = data[0].Shop;
    strmer += "<div class=\"shop_head_info\">\n        <div class=\"shop_head_info_name\">\n            <img src=\"".concat(da.LogoSrc, "\" alt=\"\">\n            <div>\n            <p>").concat(da.Name, "</p>\n            </div>\n        </div>\n        <div class=\"data\">\n            <div class=\"dt\">\n                <p>").concat(da.ProductCount, "</p>\n                <span>\u5546\u54C1</span>\n            </div>\n            <div class=\"dt\">\n                <p>26743</p>\n                <span>\u7C89\u4E1D</span>\n            </div>\n        </div>\n    </div>");
    $('.bg .common').html(strmer);
  }

  function typeGo(data) {
    pAjax({
      url: ' https://api5.hanfugou.com/Product/GetProductListPublic',
      data: "count=30&page=1&shopid=".concat(idx, "&typeid=").concat(data),
      type: 'get'
    }).then(function (res) {
      res = JSON.parse(res);
      var data = res.Data;
      shopgo(data);
    });
  }
  /**************点击商品转到详情页*************** */


  var pl = document.querySelector('.product_list');

  pl.onclick = function () {
    var e = window.event;
    var idxx = e.target.getAttribute('idxx');
    console.log(idxx);

    if (idxx) {
      location.href = "./shopInfo.html?sid=".concat(idxx, "&merid=").concat(idx);
    }
  };
});