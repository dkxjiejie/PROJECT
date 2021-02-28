"use strict";

$(document).ready(function () {
  pAjax({
    url: 'https://api5.hanfugou.com/Shop/GetShopListForPublic',
    data: "page=1&count=15&ishot=true",
    type: 'get'
  }).then(function (res) {
    res = JSON.parse(res);
    var data = res.Data;
    infoRead(data);
    meronclick();
  });

  function infoRead(data) {
    var str = '';
    data.forEach(function (item) {
      str += "<div class=\"info common\">\n            <ul class=\"first_three\">\n                <li>\n                    <div class=\"sjtx\">\n                        <a>\n                            <img src=\"".concat(item.LogoSrc, "\" idx=").concat(item.ID, " alt=\"\">\n                        </a>\n                        <a class=\"f\" idx=").concat(item.ID, ">").concat(item.Name, "</a>\n                        <span>\u5546\u54C1\uFF1A\n                            <i>").concat(item.ProductCount, "</i>\n                        </span>\n                    </div>\n                    <div class=\"shop_list\" cid=").concat(item.ID, ">\n                        \n                    </div>\n                </li>\n            </ul>\n        </div>");
      $('#comtent').html(str);
    });
    proRead(data);
  }
  /*************商家右边数据渲染**************** */


  function proRead(data) {
    var shopList = document.querySelectorAll('.shop_list');
    shopList.forEach(function (item) {
      var cid = item.getAttribute('cid');
      var res = data.filter(function (it) {
        return it.ID == cid;
      });
      res = res[0].Products;
      res.forEach(function (i) {
        var span = document.createElement('span');
        span.innerHTML = "<a>\n                                <img src=\"".concat(i.FaceSrc, "\"  merid=").concat(i.Shop.ID, " sid=").concat(i.ID, " alt=\"\">\n                             </a>\n                             <p class=\"buy\">\uFFE5").concat(i.BasePrice, "</p>\n                             <p class=\"pname\"><a  merid=").concat(i.Shop.ID, " sid=").concat(i.ID, ">\n                                 ").concat(i.Name, "\n                             </a></p>");
        item.append(span);
      });
    });
  }
  /**************商家图标点击跳转到商家页******************** */


  function meronclick() {
    var meron = document.querySelector('#comtent');

    meron.onclick = function () {
      var e = event.target;
      var idx = e.getAttribute('idx');

      if (idx) {
        location.href = "../html/merInfo.html?idx=".concat(idx);
      }

      var sid = e.getAttribute('sid');
      var merid = e.getAttribute('merid');

      if (sid) {
        location.href = "./shopInfo.html?sid=".concat(sid, "&merid=").concat(merid);
      }
    };
  }
});