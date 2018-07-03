(function() {
    var btn1 = document.getElementsByClassName('test-btn')[0],
        btn2 = document.getElementsByClassName('test-btn')[1],
        btn3 = document.getElementsByClassName('test-btn')[2],
        btn4 = document.getElementsByClassName('test-btn')[3];

        
    //默认弹出框
    btn1.onclick = function () {
        new THRTipTag({
            type: "default",
            autoClose: 3000,
            title:"我是标题",
            alertType:"doubt",
            message: "我是一段很长的提示信息<span class='THR-highlight'>我是一段特别的提示信息</span>我是一段很长的提示信息我是一段很长的提示信息",
        });
    };
    //警告框
    btn2.onclick = function () {
        new THRTipTag({
            type: "alert",
            title:"提示",
            alertType:"correct",
            message: "商品已加入购物车",
            confTitle:"知道了"
        });
    };
    //确认框
    btn3.onclick = function () {
        new THRTipTag({
            type: "confirm",
            title: "注册提示",
            alertType:"warning",
            message: "您确定要退出登录吗？",
            confCallBack: function () {
                console.log("用户点击了确定按钮！");
            },
            cancelCallBack: function () {
                console.log("用户点击了取消按钮！");
            }
        });
    };
    //输入框
    btn4.onclick = function () {
        new THRTipTag({
            type: "prompt",
            title: "验证提示",
            highlightColor:"#52d681",
            iconURL:"/plugin/imgs/message.svg",
            placeholder: "请输入您的身份证号！",
            confCallBack: function (text) {
                console.log(text);
            },
            cancelCallBack: function () {
                console.log("用户点击了取消按钮！");
            }
        });
    };
})();