$(document).ready(function () {

    pAjax({
        url: 'https://api5.hanfugou.com/Shop/GetShopListForPublic',
        data: `page=1&count=15&ishot=true`,
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data;
        infoRead(data);
        meronclick();
    })

    function infoRead(data) {
        let str = '';
        data.forEach(function (item) {
            str += `<div class="info common">
            <ul class="first_three">
                <li>
                    <div class="sjtx">
                        <a>
                            <img src="${item.LogoSrc}" idx=${item.ID} alt="">
                        </a>
                        <a class="f" idx=${item.ID}>${item.Name}</a>
                        <span>商品：
                            <i>${item.ProductCount}</i>
                        </span>
                    </div>
                    <div class="shop_list" cid=${item.ID}>
                        
                    </div>
                </li>
            </ul>
        </div>`
            $('#comtent').html(str);
        })
        proRead(data);
    }
    /*************商家右边数据渲染**************** */
    function proRead(data) {
        let shopList = document.querySelectorAll('.shop_list');
        shopList.forEach(item => {
            let cid = item.getAttribute('cid');
            let res = data.filter(it => {
                return it.ID == cid;
            })
            res = res[0].Products;
            res.forEach(i => {
                let span = document.createElement('span');
                span.innerHTML = `<a>
                                <img src="${i.FaceSrc}"  merid=${i.Shop.ID} sid=${i.ID} alt="">
                             </a>
                             <p class="buy">￥${i.BasePrice}</p>
                             <p class="pname"><a  merid=${i.Shop.ID} sid=${i.ID}>
                                 ${i.Name}
                             </a></p>`
                item.append(span);
            })
        })
    }
    /**************商家图标点击跳转到商家页******************** */
    function meronclick() {
        let meron = document.querySelector('#comtent');
        meron.onclick = function () {
            let e = event.target
            let idx = e.getAttribute('idx');
            if (idx) {
                location.href = `../html/merInfo.html?idx=${idx}`;
            }


            let sid = e.getAttribute('sid');
            let merid = e.getAttribute('merid');
            if (sid) {
                location.href = `./shopInfo.html?sid=${sid}&merid=${merid}`;
            }
        }
    }

})