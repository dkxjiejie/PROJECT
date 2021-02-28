$(document).ready(function () {
    // let name1 =  location.search.slice(1).split('=')[1];
    // console.log(name1);

    /************判断是否登陆************** */
    let login = getCookie('login');
    if (!login) {
        localStorage.setItem('url', location.href);
        return
    } else {
        let a = $('<a></a>').html(`欢迎您！${login}`);
        $('.logo_cz').html(a);
    }

})