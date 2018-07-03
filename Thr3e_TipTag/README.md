# Thr3e's TipTag : User Guide

---

---

#### 0.说明

该插件是本人封装的一款完全由JavaScript编写的弹出框插件

---

#### 1.使用

* 导入整个plugin文件夹，否则可能会造成提示框内容不全
* 引入`THRTiptag.js`/`THRTiptag.css`文件
* 调用语法：`new THRTiptag({ options… })`
	
---

#### 2.参数说明
<table>
  <tr>
    <th width=20%, bgcolor=#e7eff3>键</th>
    <th width=70%, bgcolor=#e7eff3>值</th>
  </tr>
  <tr>
    <td> type </td>
    <td> 弹出框类型，默认为“default”，支持 'default' , 'alert' , 'confirm' , 'prompt'</td>
  </tr>
  <tr>
    <td> title </td>
    <td> 标题，支持传入字符串</td>
  </tr>
  <tr>
    <td> message </td>
    <td> 内容，支持传入文本字符串以及HTML标签字符串</td>
  </tr>
  <tr>
    <td> placeholder </td>
    <td> 输入框占位符，针对于prompt类型时使用 </td>
  </tr>
  <tr>
    <td> cancelTitle </td>
    <td> 取消按钮标题，默认为“取消”</td>
  </tr>
  <tr>
    <td> confTitle </td>
    <td> 确定按钮标题，默认为“确定”</td>
  </tr>
  <tr>
    <td> cancelCallBack </td>
    <td> 点击取消按钮时的回调函数</td>
  </tr>
  <tr>
    <td> confCallBack </td>
    <td> 点击确定按钮时的回调函数 </td>
  </tr>
  <tr>
    <td> autoClose </td>
    <td> 指定弹出框自动关闭时间，默认不自动关闭，如果需要自动关闭，则设值为毫秒时间即可。如弹出框出现1秒钟后自动关闭弹出框，则直接设置其值为1000 </td>
  </tr>
  <tr>
    <td> alertType </td>
    <td> 弹出框内容的类型，可以为提示框中的图标设置相应样式，同时也为内容(`message`)中类名为 <font color=#00BFFF>"THR-highlight"</font> 的标签文本和确认键设置相应的颜色，默认为“correct”，支持类型'correct' , 'message' , 'doubt' , 'warning' , 'error'。用户也可自定义主题类型和图标内容，如果需要自定义，则忽略本项值，单独对'iconURL'和'highlightColor'进行设置</td>
  </tr>
  <tr>
    <td> iconURL </td>
    <td> 提示框中图片链接，若用户需要自定义提示框内图片，请为传入该图片地址。若已对该项进行设置，则'alertType'项失效 </td>
  </tr>
  <tr>
    <td> highlightColor </td>
    <td> 提示框内容主题色，设置该项可自定义内容(`message`)中类名为 <font color=#00BFFF>"THR-highlight"</font> 的标签文本和确认键设置相应的颜色，支持传入 rgba 格式和 十六进制颜色值</td>
  </tr>
</table>

---

#### 3.代码示例

* 默认弹出框(自动消失)

		new THRTipTag({
            type: "default",
            autoClose: 3000,
            title:"我是标题",
            alertType:"doubt",
            message: "我是一段很长的提示信息<span class='THR-highlight'>我是一段特别的提示信息</span>我是一段很长的提示信息我是一段很长的提示信息"
        });
* 通知框

		new THRTipTag({
            type: "alert",
            title:"提示",
            alertType:"correct",
            message: "商品已加入购物车",
            confTitle:"知道了"
        });
* 确认框

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

* 输入框

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
        
---


#### 4.特别的

提示内容('message')支持传入HTML字符串，可对文字中需要强调的内容加上类名为 <font color=#00BFFF>"THR-highlight"</font> 的标签，以此可以达到文字高亮的效果，如：
`message: "内容<span class='THR-highlight'>特别的提示信息</span>内容"`


---

#### 5.在线示例

[Thr3e's  Tiptag](https://thr3e.github.io/Thr3e_TipTag/)

---