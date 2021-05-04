# 防抖（debounce）与节流（throttle）
## 防抖
持续触发事件时，在wait时间内只执行一次函数，如果在wait时间内又再此触发，重新计算时间。  
```js
/**
 * @desc 防抖函数
 * @param {*} fn 执行函数
 * @param {*} wait 延迟时间毫秒数
 * @param {*} immediate true 为操作后立即执行，false 操作后延迟执行
 */
function debounce(fn,wait,immediate=true){
  var timeout = null;
  var debounced = function(){
    var context = this;
    var args = arguments;
    if(timeout){
      clearTimeout(timeout);
    }
    if(immediate){//立即执行
      if(!timeout){
        fn.apply(context.args);
        timeout=setTimeout(()=>{
          timeout=null;
        },wait);
      }
    }else{//延迟执行
      timeout=setTimeout(()=>{
        fn.apply(context,args);
      },wait);
    }
  }
  return debounced;
}
```
应用场景:
+ 表单验证
+ 搜索框输入查询
+ 按钮提交事件

## 节流
持续触发事件时，在一定时间内只执行一次函数。  
```js
/**
 * @desc 节流函数
 * @param {*} fn 执行函数
 * @param {*} wait 延迟时间毫秒数
 * @param {*} leading true 为时间段开始时执行，false 时间段结束时执行
 */
function throttle(fn,wait,leading=true){
  if(leading){
    var previous = 0;
  }else{
    var timeout = null;
  }
  var throttled = function(){
    var context = this;
    var args = arguments;
    if(leading){
      var now = Date.now();
      if(now - previous > wait){
        fn.apply(context,args);
        previous = now;
      }
    }else{
      if(!timeout){
        timeout = setTimeout(()=>{
          timeout = null;
          fn.apply(context,args);
        },wait);
      }
    }
  }
  return throttled;
}
```
应用场景:
+ 按钮点击事件
+ 鼠标移动事件
+ 拖拽事件
+ 滚动事件

<!-- 2019.08.17 创建 -->