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
        var _params = arguments[1];
        this.container = document.getElementById(arguments[0].slice(1));
        this.childrens = this.container.children;
        this.slideNumb = this.childrens.length;
        this.currentIndex = 0;
        // hammer.js的 swipe无效，原因？ 因为hammer自动添加的常规事件不包括swipe，所以需要手动添加.但是添加后，flex自带滑屏效果消失,所用使用css3 动画来代替
        this.$container = new Hammer(this.container);
        this.$container.get('swipe').set({direction: Hammer.DIRECTION_ALL});
        this.slideDirection(_params.direction, _params.autoplay);
        _params.button && this.addBtn(_params.direction);
    };
    /**
     * @func 翻页函数
     * @param {string} dir -参数有两种取值 vertical horizonal默认为horizontal
     */
    Slide.prototype.slidePrePage = function (dir) { //函数内this指向id='slide'的DOM节点，所以要用that替代this
        var nextClass = {
            horizontal: {current: 'slide-cont slide-current--ph', pre: 'slide-cont slide-pre--ph'},
            vertical: {current: 'slide-cont slide-current--pv', pre: 'slide-cont slide-pre--pv'}
        };
        if (that.currentIndex > 0) {
            that.childrens[that.currentIndex].className = nextClass[dir].pre;
            that.childrens[--that.currentIndex].className = nextClass[dir].current;
        }
    };
    Slide.prototype.slideNextPage = function (dir) {

        var nextClass = {
            horizontal: {current: 'slide-cont slide-current--nh', pre: 'slide-cont slide-pre--nh'},
            vertical: {current: 'slide-cont slide-current--nv', pre: 'slide-cont slide-pre--nv'}
        };
        if (this.currentIndex < this.slideNumb - 1) {
            this.childrens[this.currentIndex].className = nextClass[dir].pre;
            this.childrens[++this.currentIndex].className = nextClass[dir].current;
            return true;
        } else if (this.currentIndex === this.slideNumb - 1) {
            this.childrens[this.currentIndex].className = nextClass[dir].current;
            return false;
        }

    };

    // 滑动页面监听

    Slide.prototype.slideDirection = function (dir, autoPlayTime) {
        //var that = this;// this指向  win.Slide {container: div#slide.slide-wrapper, childrens: HTMLCollection[4],
        // slideNumb: undefined, currentIndex: 1}
        /**
         * @func 翻页函数
         * @param {string} dir -参数有两种取值 vertical horizonal默认为horizontal
         */
        this.slidePrePage = function (dir) {
            var nextClass = {
                horizontal: {current: 'slide-cont slide-current--ph', pre: 'slide-cont slide-pre--ph'},
                vertical: {current: 'slide-cont slide-current--pv', pre: 'slide-cont slide-pre--pv'}
            };
            if (this.currentIndex > 0) {
                this.childrens[this.currentIndex].className = nextClass[dir].pre;
                this.childrens[--this.currentIndex].className = nextClass[dir].current;
            }
        };

        this.slideNextPage = function (dir) {

            var nextClass = {
                horizontal: {current: 'slide-cont slide-current--nh', pre: 'slide-cont slide-pre--nh'},
                vertical: {current: 'slide-cont slide-current--nv', pre: 'slide-cont slide-pre--nv'}
            };
            if (this.currentIndex < this.slideNumb - 1) {
                this.childrens[this.currentIndex].className = nextClass[dir].pre;
                this.childrens[++this.currentIndex].className = nextClass[dir].current;
                return true;
            } else if (this.currentIndex === this.slideNumb - 1) {
                this.childrens[this.currentIndex].className = nextClass[dir].current;
                return false;
            }

        };
        //翻页方式
        that = this;//函数内this指向id='slide'的DOM节点，所以要用that替代this
        switch (dir) {
            case 'vertical':
                //this.container.style.flexDirection = "column";
                this.$container.on('swipedown',
                    function () {
                        that.slidePrePage('vertical');
                    }, false);
                this.$container.on('swipeup',
                    function () {
                        that.slideNextPage('vertical');
                    }, false);

                break;
            default:
                this.$container.on('swiperight',
                    function () {
                        that.slidePrePage('horizontal');
                    }, false);
                this.$container.on('swipeleft',
                    function () {
                        that.slideNextPage('horizontal');
                    }, false);
                break;
        }
        //是否自动播放
        if (autoPlayTime) {
            var auto = setInterval(function () {
                if (!that.slideNextPage(dir)) {
                    clearInterval(auto);
                }
            }, autoPlayTime);
        }

    };

    // 前进后退按钮事件监听
    // TODO 只针对使用一个slide的页面，若html中使用多个slide，需修改选择器 docuement.querySlectorAll
    Slide.prototype.addBtn = function (dir) {
        var that = this;
        switch (dir) {
            case 'vertical':
                document.querySelector('.slide-btn--right').addEventListener('click', function () {
                    that.slideNextPage('vertical');
                }, false);
                break;
            default:
                document.querySelector('.slide-btn--right').addEventListener('click', function () {
                    that.slideNextPage('horizontal');
                }, false);
                document.querySelector('.slide-btn--left').addEventListener('click', function () {
                    that.slidePrePage('horizontal');
                }, false);
        }
    };

}(window));