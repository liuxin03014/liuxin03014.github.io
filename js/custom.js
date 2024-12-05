// 获取ip
function getIpInfo(){
    var fetchUrl = "https://api.nsmao.net/api/ipip/query?key=H923jRzpOHBD0caM5Dzgr0SgUi" //https://api.nsmao.net获取key
    fetch(fetchUrl)
      .then(res => res.json())
      .then(json =>{
        var country = json.data.country || "未能获取到信息";
        var ip = json.data.ip || "未能获取到信息";
        var province = json.data.province || "未能获取到信息";
        var city = json.data.city || "未能获取到信息";
        var isp = json.data.isp || "未能获取到信息";
  
        document.getElementById("userAgentIp").innerHTML = ip;
        document.getElementById("userAgentCountry").innerHTML = country;
        document.getElementById("userAgentProv").innerHTML = province;
        document.getElementById("userAgentCity").innerHTML = city;
        document.getElementById("userAgentISP").innerHTML = isp;
  
        // 使用ua-parser-js解析User-Agent
        var parser = new UAParser();
        var result = parser.getResult();
        document.getElementById("userAgentOS").innerHTML = result.os.name + " " + result.os.version;
        document.getElementById("userAgentBrowser").innerHTML = result.browser.name + " " + result.browser.version;
      })
  }
  
  getIpInfo()


// 切换热评
function switchCommentBarrage () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.display = flag === 'false' ? 'block' : 'none'
    // 本地缓存一天，刷新或切换页面时仍 隐藏或显示 热评。
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
  }


// 如果当前页有评论就执行函数
if (document.getElementById('post-comment')) owoBig();
// 表情放大
function owoBig() {
    let flag = 1, // 设置节流阀
        owo_time = '', // 设置计时器
        m = 3; // 设置放大倍数
    // 创建盒子
    let div = document.createElement('div'),
        body = document.querySelector('body');
    // 设置ID
    div.id = 'owo-big';
    // 插入盒子
    body.appendChild(div)

    // 构造observer
    let observer = new MutationObserver(mutations => {

        for (let i = 0; i < mutations.length; i++) {
            let dom = mutations[i].addedNodes,
                owo_body = '';
            if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
            // 如果需要在评论内容中启用此功能请解除下面的注释
            // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
            else continue;

            // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
            if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
            // 鼠标移入
            owo_body.onmouseover = (e) => {
                    if (flag && e.target.tagName == 'IMG') {
                        flag = 0;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let height = e.path[0].clientHeight * m, // 盒子高
                                width = e.path[0].clientWidth * m, // 盒子宽
                                left = (e.x - e.offsetX) - (width - e.path[0].clientWidth) / 2, // 盒子与屏幕左边距离
                                top = e.y - e.offsetY; // 盒子与屏幕顶部距离

                            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                            // 设置盒子样式
                            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                            // 在盒子中插入图片
                            div.innerHTML = `<img src="${e.target.src}">`
                        }, 300);
                    }
                };
            // 鼠标移出隐藏盒子
            owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
        }

    })
    observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
}