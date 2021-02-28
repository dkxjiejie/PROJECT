"use strict";

$(document).ready(function () {
  // let name1 =  location.search.slice(1).split('=')[1];
  // console.log(name1);

  /************判断是否登陆************** */
  var login = getCookie('login');

  if (!login) {
    localStorage.setItem('url', location.href);
    return;
  } else {
    var a = $('<a></a>').html("\u6B22\u8FCE\u60A8\uFF01".concat(login));
    $('.logo_cz').html(a);
  }
});