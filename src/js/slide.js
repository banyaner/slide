/**
 * Created by zhongjx on 16/8/25.
 */
(function (win) {
    /**
     * @class
     * @classdesc 滑屏类
     * @param {object} params
     *  @param {object}params.direction - 滑屏方向 vertical, horizontal
     *  @param {object}params.autoplay - 自动播放，每页停留时间
     *
     */

    win.Slide = function () {
        console.log(arguments);
        var params = arguments[1],
            isEmpty = function (obj) {  //判断对象是否为空
                for (var name in obj) {
                    return false;
                }
                return true;
            };
        //if (isEmpty(params)) {
        //    console.log('未传入参数，采用默认样式');
        //    //this.direction = 'horizontal';
        //
        //} else {
        //    console.log('传入参数');
        //}
        this.container = document.getElementById(arguments[0].slice(1));
        this.childrens = this.container.children;
        this.slideNumb = this.childrens.length;
        this.currentNumb = 0;
        this.slideDirection(params.direction);
        this.childrens[0].className += ' slide-current';
    };


    Slide.prototype.slideDirection = function (dir) {
        var that = this;// this指向  win.Slide {container: div#slide.slide-wrapper, childrens: HTMLCollection[4],
                        // slideNumb: undefined, currentNumb: 1}
        console.log(that);
        // TODO 使用flex原生的滑动效果，待修改
        this.slidePrePage = function () { //函数内this指向id='slide'的DOM节点，所以要用that替代this
            console.log(that.currentNumb)
            if (that.currentNumb >= 0) {
                that.childrens[that.currentNumb].className = 'slide-cont slide-next';
                if (that.currentNumb > 0) {
                    that.childrens[--that.currentNumb].className = 'slide-cont slide-current';
                }
            }
            console.log(that.currentNumb)
        };

        this.slideNextPage = function () {
            console.log(that.currentNumb);
            if (that.currentNumb < that.slideNumb) {
                that.childrens[that.currentNumb].className = ' slide-cont slide-pre';
                if (that.currentNumb < that.slideNumb - 1) {
                    that.childrens[++that.currentNumb].className = ' slide-cont slide-current';
                }
            }
            console.log(that.currentNumb);
        };
        var $container = new Hammer(this.container);
        $container.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        console.log(this.container);

// hammer.js的 swipe无效，原因？ 因为hammer自动添加的常规事件不包括swipe，所以需要手动添加
        switch (dir) {
            case 'vertical':
                this.container.style.flexDirection = "column";
                $container.on('swipedown',
                    this.slidePrePage, false);
                $container.on('swipeup',
                    this.slideNextPage, false);
                break;
            default:
                $container.on('swiperight',
                    this.slidePrePage, false);
                $container.on('swipeleft',
                    this.slideNextPage, false);
                break;
        }

    };

}(window));