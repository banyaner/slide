# slide
创建适配移动端的滑屏插件

#基本用法：
引用slide.js库。html文档中引入如下代码
```html
// html
    <div class="slide-container">
        <div class="slide-wrapper"  id="slide">
            <div class="slide-cont">
                <h1>slide1</h1>
                <p>more details</p>
            </div>
            <div class="slide-cont">
                <h1>slide2</h1>
            </div>
            <div class="slide-cont">
                <h1>slide3</h1>
            </div>
            <div class="slide-cont">
                <h1>slide4</h1>
            </div>
        </div>
    </div>
```
在js中创建一个slide实例
```js

window.onload = function () {
    var slide = new Slide('#slide', {
        direction: 'vertical'
    });
}
```
