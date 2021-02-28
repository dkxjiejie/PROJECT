"use strict";

$(document).ready(function () {
  /***************渲染商品信息******************** */
  function read(data) {
    var str = '';
    var minfo = document.querySelector('#m_info');
    data.forEach(function (item) {
      str = "<div class=\"m_info common\">\n    <div class=\"left\">\n        <img src=\"".concat(item.FaceSrc, "\" alt=\"\">\n    </div>\n    <div class=\"right\">\n        <p class=\"title\">").concat(item.Name, "</p>\n        <div class=\"price_box\">\n            <p class=\"prices\">\n                <i>\uFFE5</i>\n                <span class=\"now_price\">").concat(item.Price, "</span>\n            </p>\n            <p class=\"SalesVolume\">\n                \u4EA4\u6613\u6210\u529F\uFF1A\n                <i>").concat(item.SalesVolume, "</i>\n            </p>\n        </div>\n        <div class=\"sku_box\">\n            <span>\u5C3A\u7801</span>\n            <div class=\"sku_list\">\n            <p>\u9ED8\u8BA4</p>\n            </div>\n        </div>\n        \n        <div class=\"sku_box\">\n            <span>\u6837\u5F0F</span>\n            <div class=\"sku_list\">\n                <p>\u9ED8\u8BA4</p>\n            </div>\n        </div>\n        <div class=\"sku_box\">\n            <span>\u5E93\u5B58</span>\n                <p>").concat(item.Stock, "\u4EF6</p>\n        </div>\n        <div class=\"buybtn\" >\n            <a class=\"gobuy\" shopid=").concat(item.ID, ">\u7ACB\u5373\u5241\u624B</a>\n            <a class=\"addcar\" shopid=").concat(item.ID, ">\n                \u52A0\u5165\u8D2D\u7269\u8F66\n            </a>\n        </div>\n    </div>\n</div>");
    });
    minfo.innerHTML = str;
    bybtn();
  }
  /****************点击框变颜色****************** */


  function active() {
    var p = $('.sku_list p');
    p.click(function () {
      $(this).toggleClass('active');
    });
  }
  /****************验证是从首页过来的还是商家页过来的**************** */
  // console.log(location.search.indexOf('sid'));

  /*****************首页过来的************ */


  if (location.search.indexOf('shopid') == 1) {
    /**********获取商品shopid**** */
    var shopid = location.search.slice(1).split('&')[0].split('=')[1];
    /***********获取商品的类型*********** */

    var type = location.search.slice(1).split('&')[1].split('=')[1];
    /***********根据类型请求数据********* */

    if (type == 'hots') {
      pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductListPublicForHot',
        data: 'count=8',
        type: 'get'
      }).then(function (res) {
        res = JSON.parse(res);
        var data = res.Data;
        var shop = data.filter(function (item) {
          return item.ID == shopid;
        });
        read(shop);
        active();
      });
    }
    /***********根据类型请求数据********* */


    if (type == 'girls' || type == 'boys' || type == 'hans' || type == 'other') {
      pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductListPublicForDefault',
        data: 'count=8',
        type: 'get'
      }).then(function (res) {
        res = JSON.parse(res);
        var data = res.Data;

        if (type == 'girls') {
          dataGirl = data.girl;
          var shop = dataGirl.filter(function (item) {
            return item.ID == shopid;
          });
          read(shop);
        }

        if (type == 'boys') {
          dataBoy = data.boy;

          var _shop = dataBoy.filter(function (item) {
            return item.ID == shopid;
          });

          read(_shop);
        }

        if (type == 'hans') {
          dataHan = data.hys;

          var _shop2 = dataHan.filter(function (item) {
            return item.ID == shopid;
          });

          read(_shop2);
        }

        if (type == 'other') {
          dataOt = data.other;

          var _shop3 = dataOt.filter(function (item) {
            return item.ID == shopid;
          });

          read(_shop3);
        }

        active();
      });
    }

    return;
  }
  /****************商家页过来的******************** */


  if (location.search.indexOf('sid') == 1) {
    var sid = location.search.slice(1).split('&')[0].split('=')[1];
    var merid = location.search.slice(1).split('&')[1].split('=')[1];
    pAjax({
      url: ' https://api5.hanfugou.com/Product/GetProductListPublic',
      data: "count=30&page=1&shopid=".concat(merid),
      type: 'get'
    }).then(function (res) {
      res = JSON.parse(res);
      var data = res.Data;
      var shop = data.filter(function (item) {
        return item.ID == sid;
      });
      read(shop);
      active();
    });
  }
  /***********购物车按钮和立即剁手按钮点击事件*************** */


  function bybtn() {
    $('.buybtn').on('click', '.addcar,.gobuy', function () {
      var login = getCookie('login');

      if (!login) {
        location.href = './logo.html';
        return;
      }

      var shopid = $(this).attr('shopid');
      location.href = "./car.html?shopid=".concat(shopid);
    });
  }
});