"use strict";

$(document).ready(function () {
  /**************列表请求数据渲染****************** */
  pAjax({
    url: 'https://api5.hanfugou.com/Product/GetProductTypeList',
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    shopStyle(data);
  });
  pAjax({
    url: 'https://api5.hanfugou.com/Product/GetProductListPublic',
    type: 'get',
    data: 'count=40&page=1'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    sread(data);
    ssOnclick();
    listOn();
  });
  /**************列表渲染****************** */

  function shopStyle(data) {
    var style = data.filter(function (item) {
      return item.ParentID == 0;
    }); // console.log(style);

    var hstr = '';
    style.forEach(function (item) {
      hstr += "<div class=\"one\">\n        <a sp=".concat(item.ID, ">").concat(item.Name, "\uFF1A</a>\n        <div class=\"one_child\" style=").concat(item.ID, ">\n        </div>\n        </div>\n        ");
    });
    $('.product_typelist').html(hstr);
    var one = document.querySelectorAll('.one_child');
    one.forEach(function (item) {
      var id = item.getAttribute('style');
      var res = data.filter(function (ite) {
        return ite.ParentID == id;
      });
      res.forEach(function (it) {
        var a = document.createElement('a');
        a.innerHTML = "".concat(it.Name);
        a.setAttribute('sp', "".concat(it.ID));
        item.append(a);
      });
    });
  }
  /************商品渲染*******************/


  function sread(data) {
    var str = '';
    var pr;
    data.forEach(function (item) {
      pr = item.Price.toFixed(2);
      str += "<li>\n        <a >\n            <img src=\"".concat(item.FaceSrc, "\" sid=").concat(item.ID, " merid=").concat(item.Shop.ID, " alt=\"\">\n        </a>\n        <p class=\"price\">\n           <span class=\"buy\">\uFFE5").concat(pr, "</span>\n        </p>\n        <p class=\"name\">\n            <a sid=").concat(item.ID, " merid=").concat(item.Shop.ID, ">").concat(item.Name, "</a>\n        </p>\n        <p class=\"other\">\n            <a idx=").concat(item.Shop.ID, ">").concat(item.Shop.Name, "</a>\n        </p>\n    </li>");
    });
    $('.shopShow ul').html(str);
  }
  /*********商品点击和商家点击跳转********************** */


  function ssOnclick() {
    var ul = document.querySelector('.shopShow ul');

    ul.onclick = function () {
      var e = event.target;
      var idx = e.getAttribute('idx');

      if (idx) {
        location.href = "./merInfo.html?idx=".concat(idx);
      }

      var sid = e.getAttribute('sid');
      var merid = e.getAttribute('merid');

      if (sid) {
        location.href = "./shopInfo.html?sid=".concat(sid, "&merid=").concat(merid);
      }
    };
  }
  /**********列表点击分类事件******************** */


  function listOn() {
    var listo = document.querySelector('.product_typelist');

    listo.onclick = function () {
      var e = event.target;
      var sp = e.getAttribute('sp');

      if (sp) {
        pAjax({
          url: 'https://api5.hanfugou.com/Product/GetProductListPublic',
          type: 'get',
          data: "count=40&page=1&typeid=".concat(sp)
        }).then(function (res) {
          res = JSON.parse(res);
          var data = res.Data;
          sread(data);
          ssOnclick();
          listOn();
        });
      }
    };

    $('.one a').click(function () {
      $(this).addClass('act').siblings().removeClass('act').parent().siblings().removeClass('act').parent().siblings().children().removeClass('act').children().removeClass('act');
      $(this).parent().children().children().removeClass('act');
      $(this).parent().siblings().children().removeClass('act').children().removeClass('act');
    });
  }
});