# slide
创建适配移动端的滑屏插件。使用flex布局。hammer.js处理手势。

#基本用法：

引用slide.js库。html文档中引入如下代码
```html
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
        direction: 'vertical',  // 滑屏方向;默认水平
        autoplay: '3000'        // 自动播放，每页停留时间;默认不自动播放
    });
}
```

# 使用介绍

新建一个实例：
```js
var slide = new Slide(id, {params});
id 为 class="slide-wrapper" 所在元素的id。params为初始化时的参数。
具体在参数选项中介绍。
```

# 参数选项

1. directory : string  -- 滑屏方向;默认水平
    可选值为: vertical horizontal
1. autoplay : number   -- 设置自动播放，默认为手动播放
1. button: boolean  -- 设置按钮，默认false，需要在html中添加对应滑屏方向按钮
    ```html
    <!--添加翻页按钮-->
           // 作用滑屏按钮
            <div class="slide-btn--left"><</div>
            <div class="slide-btn--right">></div>
            // 上下滑屏按钮
            <div class="slide-btn--down">next</div>
    ```

# Slide 示例属性

1. currentIndex  当前滑屏页序号
2. slideNumb  滑屏页总数
