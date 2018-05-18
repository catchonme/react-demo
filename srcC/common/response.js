const React = require('react');
const ExecutionEnvironment = require('exenv');
const GridSort = require('./sort')

const noop = function() {};

class AutoResponsive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    // GridSort是干嘛的
    this.sortManager = new GridSort({
      containerWidth: this.props.containerWidth,
      gridWidth: this.props.gridWidth
    });

    // 初始化动画
    this.animationManager = new AnimationManager();
  }

  componentWillReceiveProps(nextProps) {
    // 也就是window.resize后，就需要动态改变box的位置了
    if (this.props.containerWidth !== nextProps.containerWidth) {
      this.sortManager.changeProps({
        containerWidth: nextProps.containerWidth
      });
    }
  }

  setPrivateProps() {
    // 父级元素属性设置为relative
    this.containerStyle = {
      position: 'relative',
      height: this.containerHeight || 0
    };

    if (typeof this.props.containerHeight === 'number') {
      this.fixedContainerHeight = true;
      this.containerStyle.height = this.props.containerHeight;
    } else {
      this.fixedContainerHeight = false;
    }
  }

  componentWillUpdate() {
    this.sortManager.init();
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child, childIndex) => {
      // 检测是否是可排序元素
      if (child.props.className &&
        this.props.itemClassName &&
        !~child.props.className.indexOf(this.props.itemClassName)) {
        return;
      }

      let childWidth = parseInt(child.props.style.width, 10) + this.props.itemMargin;
      let childHeight = parseInt(child.props.style.height, 10) + this.props.itemMargin;

      // 获取每个元素距离最左边和最上边的距离
      let calculatedPosition = this.sortManager.getPosition(childWidth, childHeight);
      // console.log(calculatedPosition);
      //如果新增加的box超过了原来的container的高度，就把原来的container的高度加上新增的box的高度
      if (!this.fixedContainerHeight && this.props.containerWidth) {
        if (calculatedPosition[1] + childHeight > this.containerStyle.height) {
          this.containerStyle.height = calculatedPosition[1] + childHeight;
        }
      }

      const options = Object.assign({}, this.props, {
        position: calculatedPosition,
        size: {
          width: childWidth,
          height: childHeight
        },
        containerHeight: this.containerStyle.height
      });

      // 所有的box的位置需要传递给动画
      let calculatedStyle = this.animationManager.generate(options);
      // 给box加上样式
      this.mixItemInlineStyle(calculatedStyle);

      this.props.onItemDidLayout.call(this, child);

      if (childIndex + 1 === this.props.children.length) {
        this.props.onContainerDidLayout.call(this);
      }
      // 克隆原先的元素，然后给上新增的样式，动画重排后即可
      return React.cloneElement(child, {
        style: Object.assign({}, child.props.style, calculatedStyle)
      });
    });
  }

  mixItemInlineStyle(s) {
    let itemMargin = this.props.itemMargin;
    let style = {
      display: 'block',
      float: 'left',
      margin: `0 ${itemMargin}px ${itemMargin}px 0`
    };

    if (this.props.containerWidth) {
      style = {
        position: 'absolute'
      };
    }
    Object.assign(s, style);
  }

  getContainerStyle() {
    return this.containerStyle;
  }

  render() {
    this.setPrivateProps();

    return (
      <div ref="container" className={`${this.props.prefixClassName}-container`} style={this.getContainerStyle()}>
        {this.renderChildren()}
      </div>
    );
  }
}

/* start animation */
function transitionEnd() {
  let transitionEndEventNames = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };
  if (!ExecutionEnvironment.canUseDOM) {
    return transitionEndEventNames;
  }
  let el = document.createElement('pin');

  for (let name in transitionEndEventNames) {
    if (el.style[name] !== undefined) {
      return transitionEndEventNames[name];
    }
  }
  return false;
}

let ifHasTransitionEnd = transitionEnd();

const prefixes = ['Webkit', 'Moz', 'ms', 'O', ''];

class AnimationManager {
  constructor() {
    this.animationHandle = `css${ifHasTransitionEnd ? 3 : 2}Animation`;
    // this.animationHandle = `css2Animation`;
  }

  generate(options) {
    Object.assign(this, options);
    return this[this.animationHandle]();
  }

  css2Animation() {
    var style = {};
    style[this.horizontalDirection] = `${this.position[0]}px`;
    /*style[this.verticalDirection] = `${this.position[1]}px`;*/

    /*if (this.horizontalDirection === 'right') {
      style[this.horizontalDirection] = `${this.position[0] + this.itemMargin}px`
    } else {
      style[this.horizontalDirection] = `${this.position[0]}px` ;
    }*/

    if (this.verticalDirection === 'bottom') {
      style[this.verticalDirection] = `${this.position[1] + this.itemMargin}px`
    } else {
      style[this.verticalDirection] = `${this.position[1]}px` ;
    }
    this.mixAnimation(style);
    return style;
  }

  css3Animation() {
    var style = {};

    prefixes.map(prefix => {
      let x, y;

      if (this.horizontalDirection === 'right') {
        x = this.containerWidth - this.size.width - this.position[0] + this.itemMargin;
      } else {
        x = this.position[0];
      }

      if (this.verticalDirection === 'bottom') {
        y = this.containerHeight - this.size.height - this.position[1];
      } else {
        y = this.position[1];
      }

      style[`${prefix}Transform`] = `translate3d(${x}px, ${y}px, 0)`;
    });

    this.mixAnimation(style);
    return style;
  }

  mixAnimation(style) {
    if (!this.closeAnimation) {
      prefixes.map(prefix => {
        style[`${prefix}TransitionDuration`] = `${this.transitionDuration}s`;
        style[`${prefix}TransitionTimingFunction`] = this.transitionTimingFunction;
      });
    }
  }
}

AutoResponsive.defaultProps = {
  containerWidth: null,
  containerHeight: null,
  gridWidth: 10,
  prefixClassName: 'rc-autoresponsive',
  itemClassName: 'item',
  itemMargin: 0,
  horizontalDirection: 'left',
  transitionDuration: 1,
  transitionTimingFunction: 'linear',
  verticalDirection: 'top',
  closeAnimation: false,
  onItemDidLayout: noop,
  onContainerDidLayout: noop
};
/* end animation */
module.exports = AutoResponsive;
