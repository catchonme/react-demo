
var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var LinkedList = require('./linkedlist');

var GridSort = (function () {
  function GridSort(options) {
    _classCallCheck(this, GridSort);

    this.containerWidth = options.containerWidth;
    this.gridWidth = options.gridWidth;
    this.init();
  }

  _createClass(GridSort, [{
    key: 'init',
    value: function init() {
      var curQuery = new LinkedList({});
      // this.containerWidth = 1440, this.gridWidth = 10
      // 1100 340
      var span = Math.ceil(this.containerWidth / this.gridWidth);

      for (var i = 0; i < span; i++) {
        curQuery.add(0);
      }

      this.curQuery = curQuery;
      // console.log(this.curQuery);
    }
  }, {
    key: 'changeProps',
    value: function changeProps(props) {
      Object.assign(this, props);
    }
  }, {
    key: 'getPosition',
    value: function getPosition(width, height) {
      // width = 110 height = 110, gridWidth = 10
      // 猜想是多少个 gridWidth 才够一个 width ，这样好填充
      var num = Math.ceil(width / this.gridWidth);
      var cur = this.getCurrentPointer(num);
      // return;
      for (var i = cur[0], len = num + cur[0], newH = cur[1] + height; i < len; i++) {
        this.curQuery.update(i, newH);
      }
      return [cur[0] * this.gridWidth, cur[1]];
    }
  }, {
    key: 'getCurrentPointer',
    value: function getCurrentPointer(num) { // num = 144
      var min = Infinity;
      var idx = 0;
      var len = this.curQuery.size();
      // console.log(this.curQuery);
      // console.log('------------');
      // console.log(num); // 11 Math.ceil(width / this.gridWidth);
      // console.log(len); // 144

      //总共返回10个
      // len 是containerWidth占多少个itemMargin
      // num 是box占多少个itemMargin
      for (var i = 0; i <= (len < num ? 0 : len - num); i++) { // i < 144 - 11 = 133
        var max = -Infinity;
        var curValue = undefined;

        for (var j = 0; j < num; j++) { // 1 ~ 11
          // console.log(i+j);
          // curQuery前109(包含109)个都是110，也就是box的width
          curValue = this.curQuery.get(i + j);
          // console.log(curValue)
          if (curValue >= min) {
            i += j + 1; // 2 ~ 134

            if (i > len - num) { // 133
              max = min;
              break;
            }
            j = -1;
            max = -Infinity;
            continue;
          }
          // curValue即使是0也是大于-infinity的
          // if (i > len - num) 的时候，才不会进入当前的if条件内
          if (curValue > max) {
            max = curValue;
            // console.log('nide')
          }
        }

        if (min > max) {
          min = max;
          idx = i;
        }
      }
      return [idx, min];
    }
  }]);

  return GridSort;
})();

module.exports = GridSort;