$(document).ready(function () {

    let idx = location.search.slice(1).split('=')[1];
    console.log(idx);
    pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductTypeList',
        data: `shopid=${idx}`,
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data
        shopFenlei(data)
        $('.left_fl .list li').click(function () {
            event.stopPropagation();
            /***************菜单栏点击颜色样式****************** */
            $(this).addClass('act').siblings().removeClass('act').parent().siblings().children().removeClass('act')
            let tp = $(this).attr('tp');
            typeGo(tp);
        })
    })


    pAjax({
        url: ' https://api5.hanfugou.com/Product/GetProductListPublic',
        data: `count=30&page=1&shopid=${idx}`,
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data;
        shopgo(data);
    })

    /***************左边分类页面数据获取*************** */
    function shopFenlei(data) {
        // let data = res.Data
        // 筛选出 标题数据
        let data1 = data.filter(item => {
            return item.ParentID == 0;
        })
        //渲染标题数据
        let str = ''
        data1.forEach(item => {
            str += `<ul class="list" indx="${item.ID}">
            <li class="listHead" tp=${item.ID}>${item.Name}</li>
            </ul>
            `
        })
        $('.left_fl').html(str)

        //拿到每一个标题数据的父元素的indx值
        let list = document.querySelectorAll('.left_fl .list');
        list.forEach(item => {
            let index = item.getAttribute('indx');
            // console.log(item);
            // console.log(index);
            //筛选出 和标题数据的父元素的indx值一样的子元素的ParentID值，
            let ar = data.filter(ite => {
                return ite.ParentID == index;
            })

            //然后添加到符合的标题数据的父元素的indx值里面渲染
            ar.forEach(it => {
                // console.log(it);
                let lis = document.createElement('li');
                lis.innerHTML = `${it.Name}`;
                lis.setAttribute('tp', `${it.ID}`);
                item.append(lis);
            })
        })
    }
/**************数据渲染****************** */
    function shopgo(data) {
        let str = ''
        let strmer = ''
        data.forEach(item => {
            let bp = item.Price.toFixed(2);
            str += `<li >
        <div class="shopid">
            <img src="${item.FaceSrc}" idxx=${item.ID} alt="">
            <span>${bp}</span>
            <p idxx=${item.ID}>${item.Name}</p>
        </div>
    </li>`
        })

        $('.product_list').html(str);
        let da = data[0].Shop;
        strmer += `<div class="shop_head_info">
        <div class="shop_head_info_name">
            <img src="${da.LogoSrc}" alt="">
            <div>
            <p>${da.Name}</p>
            </div>
        </div>
        <div class="data">
            <div class="dt">
                <p>${da.ProductCount}</p>
                <span>商品</span>
            </div>
            <div class="dt">
                <p>26743</p>
                <span>粉丝</span>
            </div>
        </div>
    </div>`
        $('.bg .common').html(strmer)

    }

    function typeGo(data) {
        pAjax({
            url: ' https://api5.hanfugou.com/Product/GetProductListPublic',
            data: `count=30&page=1&shopid=${idx}&typeid=${data}`,
            type: 'get',
        }).then(res => {
            res = JSON.parse(res);
            let data = res.Data;
            shopgo(data);
        })
    }
    /**************点击商品转到详情页*************** */
    let pl = document.querySelector('.product_list');
    pl.onclick = function () {
        let e = window.event;
        let idxx = e.target.getAttribute('idxx');
        console.log(idxx);
        if(idxx){
            location.href = `./shopInfo.html?sid=${idxx}&merid=${idx}`;
        }
        
    }

})