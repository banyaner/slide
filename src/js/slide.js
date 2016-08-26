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
        var params = arguments[1];
        //  var  isEmpty = function (obj) {  //判断对象是否为空
        //        for (var name in obj) {
        //            return false;
        //        }
        //        return true;
        //    };
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
    };


    Slide.prototype.slideDirection = function (dir) {
        var that = this;// this指向  win.Slide {container: div#slide.slide-wrapper, childrens: HTMLCollection[4],
                        // slideNumb: undefined, currentNumb: 1}
        // TODO 使用flex原生的滑动效果，待修改
        /**
         * @func
         * @param {string} dir -参数有两种取值 vertical horizonal默认为horizontal
         */
        this.slidePrePage = function (dir) { //函数内this指向id='slide'的DOM节点，所以要用that替代this
            var nextClass = {
                horizontal: {current: 'slide-cont slide-current--ph', pre: 'slide-cont slide-pre--ph'},
                vertical: {current: 'slide-cont slide-current--pv', pre: 'slide-cont slide-pre--pv'}
            };
            if (that.currentNumb > 0) {
                that.childrens[that.currentNumb].className = nextClass[dir].pre;
                that.childrens[--that.currentNumb].className = nextClass[dir].current;
            }

            console.log(that.currentNumb)
        };

        this.slideNextPage = function (dir) {

            var nextClass = {
                horizontal: {current: 'slide-cont slide-current--nh', pre: 'slide-cont slide-pre--nh'},
                vertical: {current: 'slide-cont slide-current--nv', pre: 'slide-cont slide-pre--nv'}
            };
            if (that.currentNumb < that.slideNumb - 1) {
                that.childrens[that.currentNumb].className = nextClass[dir].pre;
                that.childrens[++that.currentNumb].className = nextClass[dir].current;
            } else if (that.currentNumb === that.slideNumb - 1) {
                that.childrens[that.currentNumb].className = nextClass[dir].current;
            }

            console.log(that.currentNumb);
        };
        var $container = new Hammer(this.container);
        $container.get('swipe').set({direction: Hammer.DIRECTION_ALL});
// hammer.js的 swipe无效，原因？ 因为hammer自动添加的常规事件不包括swipe，所以需要手动添加.但是添加后，flex自带滑屏效果消失,所用使用css3 动画来代替
        switch (dir) {
            case 'vertical':
                this.container.style.flexDirection = "column";
                $container.on('swipedown',
                    function () {
                        that.slidePrePage('vertical');
                    }, false);
                $container.on('swipeup',
                    function () {
                        that.slideNextPage('vertical');
                    }, false);

                break;
            default:
                $container.on('swiperight',
                    function () {
                        that.slidePrePage('horizontal');
                    }, false);
                $container.on('swipeleft',
                    function () {
                        that.slideNextPage('horizontal');
                    }, false);
                break;
        }

    };

}(window));