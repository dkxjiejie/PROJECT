$(document).ready(function () {


    /****************注册*************/
    $('.btn_zc').click(function () {

        $('.login_form').eq(1).css({
            display: 'none'
        })
    })

    $('.ubtn').click(function () {
        let tel = $('.tel').val();
        let pwd = $('.zc_pwd').val();
        if (tel == '' || pwd == '') {
            alert('请输入手机号或密码');
            return
        }
        telVer(tel, pwd);

    })
    /***************登陆**************** */
    $('.btn_login').click(function () {
        let name = $('.username').val()
        let pwd = $('.pwd').val()
        if (!name) {
            $('.dialog').css({
                display: 'block'
            })
            $('.tishi').css({
                display: 'block'
            })
            return
        }
        //发送登陆请求
        $.ajax({
            url: '../api/login.php',
            method: 'get',
            data: {
                n: name,
                p: pwd
            },
            dataType: 'json',
            success: function (res) {
                if (res.code) {
                    /*************登陆成功执行 */
                    setCookie('login', name);
                    let url = localStorage.getItem('url')
                    if (url) {
                        location.href = url;
                        localStorage.removeItem('url');
                    }
                } else {
                    $('.dialog').css({
                        display: 'block'
                    })
                    $('.tishi_loginpd').css({
                        display: 'block'
                    })
                }
            }
        })

    })
    /****************提醒窗口的代码************* */
    $('.tishi button').click(function () {
        $('.dialog').css({
            display: 'none'
        })
        $('.tishi').css({
            display: 'none'
        })
    })
    $('.tishi_zc button').click(function () {
        $('.dialog').css({
            display: 'none'
        })
        $('.tishi_zc').css({
            display: 'none'
        })
        location.href = '../html/logo.html'
    })
    $('.tishi_cf button').click(function () {
        $('.dialog').css({
            display: 'none'

        })
        $('.tishi_cf').css({
            display: 'none'
        })

    })
    $('.tishi_pd button').click(function () {
        $('.dialog').css({
            display: 'none'

        })
        $('.tishi_pd').css({
            display: 'none'
        })

    })
    $('.tishi_loginpd button').click(function () {
        $('.dialog').css({
            display: 'none'

        })
        $('.tishi_loginpd').css({
            display: 'none'
        })

    })
    /***********设置注册页面注册按钮是否勾选用户协议且能否点击**********/
    $('.form_item_c .check').click(function () {
        if (this.checked) {
            $('.user_zc .ubtn').removeAttr('disabled').css({
                background: '#f69'
            })
        } else {
            $('.user_zc .ubtn').attr('disabled', 'true').css({
                background: '#cccccc'
            })
        }
        console.log(this.checked);
    })
})

/*********手机号验证的封装函数************ */
function telVer(tel, pwd) {
    let reg = /^1[345789]\d{9}$/
    if (reg.test(tel)) {
        $.ajax({
            url: '../api/zc.php',
            method: 'get',
            data: {
                t: tel,
                p: pwd
            },
            dataType: 'json',
            success: function (res) {
                if (res.code) {
                    $('.dialog').css({
                        display: 'block'
                    })
                    $('.tishi_zc').css({
                        display: 'block'
                    })
                } else {
                    $('.dialog').css({
                        display: 'block'
                    })
                    $('.tishi_cf').css({
                        display: 'block'
                    })
                }
            }
        })
    } else {
        $('.dialog').css({
            display: 'block'
        })
        $('.tishi_pd').css({
            display: 'block'
        })
    }
}