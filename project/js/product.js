$(document).ready(function () {
  /**************列表请求数据渲染****************** */
    pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductTypeList',
        type: 'get',
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data;
        shopStyle(data);
    })

    pAjax({
        url: 'https://api5.hanfugou.com/Product/GetProductListPublic',
        type: 'get',
        data:'count=40&page=1'
    }).then(res => {
        res = JSON.parse(res);
        let data = res.Data;
        sread(data);
        ssOnclick();
        listOn();
    })






    /**************列表渲染****************** */
    function shopStyle(data) {
        let style = data.filter(item => {
            return item.ParentID == 0;
        })
        // console.log(style);
        let hstr = ''
        style.forEach(item => {
            hstr += `<div class="one">
        <a sp=${item.ID}>${item.Name}：</a>
        <div class="one_child" style=${item.ID}>
        </div>
        </div>
        `
        })
        $('.product_typelist').html(hstr);
        let one = document.querySelectorAll('.one_child');
        one.forEach(item => {
            let id = item.getAttribute('style');
            let res = data.filter(ite => {
                return ite.ParentID == id;
            })
            res.forEach(it=>{
                let a = document.createElement('a');
                a.innerHTML=`${it.Name}`
                a.setAttribute('sp', `${it.ID}`);
                item.append(a)
            })
        })
    }

/************商品渲染*******************/
function sread(data){
    let str=''
    let pr;
    data.forEach(item=>{
        pr=item.Price.toFixed(2);
        str+=`<li>
        <a >
            <img src="${item.FaceSrc}" sid=${item.ID} merid=${item.Shop.ID} alt="">
        </a>
        <p class="price">
           <span class="buy">￥${pr}</span>
        </p>
        <p class="name">
            <a sid=${item.ID} merid=${item.Shop.ID}>${item.Name}</a>
        </p>
        <p class="other">
            <a idx=${item.Shop.ID}>${item.Shop.Name}</a>
        </p>
    </li>`
    })
    $('.shopShow ul').html(str)
}
/*********商品点击和商家点击跳转********************** */

function ssOnclick(){
    let ul = document.querySelector('.shopShow ul');
    ul.onclick =function(){
        let e = event.target
        let idx = e.getAttribute('idx');
        if(idx){
            location.href = `./merInfo.html?idx=${idx}`;
        }
        let sid = e.getAttribute('sid');
        let merid = e.getAttribute('merid');
        if(sid){
            location.href = `./shopInfo.html?sid=${sid}&merid=${merid}`;
        }
    }
}

/**********列表点击分类事件******************** */

function listOn(){
    let listo = document.querySelector('.product_typelist');
    listo.onclick = function(){
        let e = event.target
        let sp = e.getAttribute('sp');
        if(sp){
            pAjax({
                url: 'https://api5.hanfugou.com/Product/GetProductListPublic',
                type: 'get',
                data:`count=40&page=1&typeid=${sp}`,
            }).then(res => {
                res = JSON.parse(res);
                let data = res.Data;
                sread(data);
                ssOnclick();
                listOn();
            })
        }
        
    }

    $('.one a').click(function(){
         $(this).addClass('act').siblings().removeClass('act').parent().siblings().removeClass('act').parent().siblings().children().removeClass('act').children().removeClass('act');
         
         $(this).parent().children().children().removeClass('act')
         $(this).parent().siblings().children().removeClass('act').children().removeClass('act')
    })

}
})