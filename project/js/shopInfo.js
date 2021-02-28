$(document).ready(function () {
    /***************渲染商品信息******************** */
    function read(data) {
        let str = ''
        let minfo = document.querySelector('#m_info');
        data.forEach(item => {
            str = `<div class="m_info common">
    <div class="left">
        <img src="${item.FaceSrc}" alt="">
    </div>
    <div class="right">
        <p class="title">${item.Name}</p>
        <div class="price_box">
            <p class="prices">
                <i>￥</i>
                <span class="now_price">${item.Price}</span>
            </p>
            <p class="SalesVolume">
                交易成功：
                <i>${item.SalesVolume}</i>
            </p>
        </div>
        <div class="sku_box">
            <span>尺码</span>
            <div class="sku_list">
            <p>默认</p>
            </div>
        </div>
        
        <div class="sku_box">
            <span>样式</span>
            <div class="sku_list">
                <p>默认</p>
            </div>
        </div>
        <div class="sku_box">
            <span>库存</span>
                <p>${item.Stock}件</p>
        </div>
        <div class="buybtn" >
            <a class="gobuy" shopid=${item.ID}>立即剁手</a>
            <a class="addcar" shopid=${item.ID}>
                加入购物车
            </a>
        </div>
    </div>
</div>`
        })
        minfo.innerHTML = str;
        bybtn();
    }

    /****************点击框变颜色****************** */
    function active() {
        let p = $('.sku_list p');
        p.click(function () {
            $(this).toggleClass('active');
        })
    }

    /****************验证是从首页过来的还是商家页过来的**************** */
    // console.log(location.search.indexOf('sid'));

    /*****************首页过来的************ */
    if (location.search.indexOf('shopid') == 1) {
        /**********获取商品shopid**** */
        let shopid = location.search.slice(1).split('&')[0].split('=')[1];
        /***********获取商品的类型*********** */
        let type = location.search.slice(1).split('&')[1].split('=')[1];
        /***********根据类型请求数据********* */
        if (type == 'hots') {
            pAjax({
                url: 'https://api5.hanfugou.com/Product/GetProductListPublicForHot',
                data: 'count=8',
                type: 'get',
            }).then(res => {
                res = JSON.parse(res);
                let data = res.Data
                let shop = data.filter(item => {
                    return item.ID == shopid;
                })
                read(shop)
                active()
            })

        }
        /***********根据类型请求数据********* */
        if (type == 'girls' || type == 'boys' || type == 'hans' || type == 'other') {
            pAjax({
                url: 'https://api5.hanfugou.com/Product/GetProductListPublicForDefault',
                data: 'count=8',
                type: 'get',
            }).then(res => {
                res = JSON.parse(res);
                let data = res.Data
                if (type == 'girls') {
                    dataGirl = data.girl;
                    let shop = dataGirl.filter(item => {
                        return item.ID == shopid;
                    })
                    read(shop)
                }
                if (type == 'boys') {
                    dataBoy = data.boy;
                    let shop = dataBoy.filter(item => {
                        return item.ID == shopid;
                    })
                    read(shop)
                }
                if (type == 'hans') {
                    dataHan = data.hys;
                    let shop = dataHan.filter(item => {
                        return item.ID == shopid;
                    })
                    read(shop)
                }
                if (type == 'other') {
                    dataOt = data.other;
                    let shop = dataOt.filter(item => {
                        return item.ID == shopid;
                    })
                    read(shop)
                }
                active()
            })
        }
        return
    }

    /****************商家页过来的******************** */
    if (location.search.indexOf('sid') == 1) {

        let sid = location.search.slice(1).split('&')[0].split('=')[1];

        let merid = location.search.slice(1).split('&')[1].split('=')[1];
        pAjax({
            url: ' https://api5.hanfugou.com/Product/GetProductListPublic',
            data: `count=30&page=1&shopid=${merid}`,
            type: 'get',
        }).then(res => {
            res = JSON.parse(res);
            let data = res.Data;
            let shop = data.filter(item => {
                return item.ID == sid;
            })
            read(shop);
            active();
        })
    }


    /***********购物车按钮和立即剁手按钮点击事件*************** */
    function bybtn() {
        $('.buybtn').on('click','.addcar,.gobuy',function(){
            let login = getCookie('login');
            if (!login) {
                location.href='./logo.html';
                return
            }
            let shopid =$(this).attr('shopid');
            location.href=`./car.html?shopid=${shopid}`;
        })
    }

})