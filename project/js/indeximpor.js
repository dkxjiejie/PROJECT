$(document).ready(function () {

    pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductListPublicForHot',
        data: 'count=8',
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data
        let str = hotshop(data);
        $('.c_hotshop .hots').html(str)
    })

    pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductListPublicForDefault',
        data: 'count=8',
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data
        /*********汉服女装数据**** */
        let strgirl = hotshop(data.girl);
        $('.c_hotshop .girls').html(strgirl)
        /***********汉服男装数据** */
        let strboy = hotshop(data.boy);
        $('.c_hotshop .boys').html(strboy)
        /***************汉元素数据******* */
        let strhan = hotshop(data.hys);
        $('.c_hotshop .hans').html(strhan)
        /**************周边配饰数据* */
        let strot = hotshop(data.other);
        $('.c_hotshop .other').html(strot)
    })

    pAjax({
        url: 'https://api5.hanfugou.com/Shop/GetShopListForPublic',
        data: 'ishot=true&count=18',
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data
        hotpp(data);
        // console.log(data);
    })

    /***************背景图获取****************** */
    pAjax({
        url: 'https://api5.hanfugou.com/Poster/GetPosterInfoListForCode',
        data: 'code=gou_banner&count=4',
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data
        bgRead(data);
        // console.log(data);
    })



    function hotshop(data) {
        let str = '';
        data.forEach(item => {
            let bp = item.BasePrice.toFixed(2);
            str += `<li>
            <img src="${item.FaceSrc}" shopid=${item.ID} alt="">
            <p>
                <i>￥</i>
                ${bp}
            </p>
            <a shopid=${item.ID}>${item.Name}</a>
        </li>`
        })
        return str;
    }

    function hotpp(data) {
        let str = '';
        data.forEach(item => {
            str += `<li>
            <a idx=${item.ID}><img src="${item.LogoSrc}" idx=${item.ID} alt=""></a>
            </li>`
        })
        $('.c_hotpp .hotpp').html(str);

    }

    /*****************首页商品点击转到详情页****************** */
    let hots = document.querySelector('.c_hotshop .hots');
    let girls = document.querySelector('.c_hotshop .girls');
    shopInfo('.hots');
    shopInfo('.girls');
    shopInfo('.boys');
    shopInfo('.hans');
    shopInfo('.other');
    // hots.onclick = function(){
    //     let e = window.event;
    //     let shopid = e.target.getAttribute('shopid');
    //     location.href= `./html/shopInfo.html?shopid=${shopid}`
    // }


    /*******************热门品牌点击图标跳转到商家页************ */

    let pl = document.querySelector('.c_hotpp');
    pl.onclick = function () {
        let e = window.event;
        let idx = e.target.getAttribute('idx');
        console.log(idx);
        location.href = `./html/merInfo.html?idx=${idx}`
    }

    /*****************首页商品点击转到详情页的封装函数****************** */
function shopInfo(obj) {
    let objj = document.querySelector(obj);
    objj.onclick = function () {
        let e = window.event;
        let shopid = e.target.getAttribute('shopid');
        if (shopid) {
            obj = obj.slice(1);
            location.href = `./html/shopInfo.html?shopid=${shopid}&type=${obj}`
        }

    }
}

/***************背景图渲染******************** */
function bgRead(data){
    let bstr='';
    data.forEach(item=>{
        bstr+=` <div class="swiper-slide"><img src="${item.ImgSrc}" alt=""></div>`
    })
    $('.swiper-wrapper').html(bstr);
    banner();
    
}
function banner(){
    var mySwiper = new Swiper('.swiper-container', {
        effect : 'fade',
        direction: 'horizontal', // 垂直切换选项
        loop: true, // 循环模式选项
        // autoplay: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },

        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            clickableClass: 'my-pagination-clickable',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

    });
}
})

