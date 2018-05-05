最关键的函数就是`common\sort.js` 中的`getPosition` 函数
传入当前的`box`的`width/height`后，使用`getCurrentPointer`函数获取到当前`box`的`left/top`值。

`getCurrentPointer`函数究竟是什么作用呢
1. `curQuery`保存了`containerWidth/gridWidth`个值，每个值都是0
>一个`box`占据了多少个`gridWidth`，就在`curQuery`中有多少个值，这几个值都是该`box`的高度

2.第一个`box`的传入进去后，开始循环，第一个因为`left, top`都是0，所以返回也是0，然后`getPosition`会使用`update`函数更新`curQuery`中第一个`box`的`height`值，作为第二排的`top`值
3.第二个`box`传入后，开始循环，因为`curQuery`中已经有了第一个`box`的值，所以能检测到第二个`box`的起始值，因为这时候的`curQuery`中还是0，所以最后返回`curQuery`中的第一个为0的`index`的值，从这个`index`开始，就是第二个`box`开始值，返回`left, top`值，以上的流程重复。
4. 当缩小窗口的时候，进行重排
    - 因为`containerWidth/gridWidth`是个固定的值，这时候从第一行到第二行的`box`，开始会继续使用`curQuery`的值，第`2.1`个`box`这时候的`top` 就是第`1.1`个`box`的`height`的值，然后更新`curQuery`中的值，就是在`1.1`的`index`上的`height`加上`2.1`的`height`作为第三排的`box`的`top`。这时候的`index`还是返回0，也就是第二排开始的`left`还是0