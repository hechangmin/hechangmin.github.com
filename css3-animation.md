#常用CSS3用法-Animation#

目前为止支技animation动画的只有webkit内核的浏览器，所以我需要在上面的基础上加上-webkit前缀，据说Firefox5可以支持css3的 animation动画属性。

CSS3中的Animation与HTML5中的Canvas绘制动画又不同，Animation只应用在页面上已存在的DOM元素上。
运用Animation能创建自己想要的一些动画效果，但是有点粗糙，如果想要制作比较好的动画，建议还是使用flash或js等。
在开始介绍Animation之前我们有必要先来了解一个特殊的东西，那就是"Keyframes",我们把他叫做“关键帧”。

其中"0%"不能像别的属性取值一样把百分比符号省略，我们在这里必须加上百分符号（“%”），因为keyframes的单位只接受百分比值。

Keyframes可以指定任何顺序排列来决定Animation动画变化的关键位置。其具体语法规则如下：

```css
keyframes-rule: '@keyframes' IDENT '{' keyframes-blocks '}';
keyframes-blocks: [ keyframe-selectors block ]* ;
keyframe-selectors: [ 'from' | 'to' | PERCENTAGE ] [ ',' [ 'from' | 'to' | PERCENTAGE ] ]*;
```

"from"就相当于"0%"而"to"相当于"100%"

```css
@keyframes IDENT {
 from {
   Properties:Properties value;
 }
 Percentage {
   Properties:Properties value;
 }
 to {
   Properties:Properties value;
 }
}
/*或者全部写成百分比的形式：*/
@keyframes IDENT {
  0% {
     Properties:Properties value;
  }
  Percentage {
     Properties:Properties value;
  }
  100% {
     Properties:Properties value;
  }
}
```

##1、animation-name##

语法：
```css
animation-name: none | IDENT[,none | IDENT]*;
```

取值说明：

animation-name:是用来定义一个动画的名称。

其主要有两个值：IDENT是由Keyframes创建的动画名，换句话说此处的IDENT要和Keyframes中的IDENT一致，如果不一致,将不能实现任何动画效果；
none为默认值，当值为none时，将没有任何动画效果。
另外我们这个属性跟前面所讲的transition一样，我们可以同时附几个animation给一个元素，我们只需要用逗号“，”隔开。

##2、animation-duration##

语法：
```css
animation-duration: <time>[,<time>]*
```
 
取值说明：

animation-duration是用来指定元素播放动画所持续的时间长.
取值:<time>为数值，单位为s （秒.）其默认值为“0”。
这个属性跟transition中的transition-duration使用方法是一样的。

##3、animation-timing-function##

语法：
```css
animation-timing-function:ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>) [, ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)]* 
``` 

取值说明：

animation-timing-function:是指元素根据时间的推进来改变属性值的变换速率，说得简单点就是动画的播放方式。
他和transition中的transition-timing-function一样，
具有以下六种变换方式：ease;ease-in;ease-in-out;linear;cubic-bezier。

##4、animation-delay##

语法：
```css
animation-delay: <time>[,<time>]*
```

取值说明：

animation-delay:是用来指定元素动画开始时间。取值为<time>为数值，单位为s(秒)，其默认值也是0。这个属性和transition-delayy使用方法是一样的。

##5、animation-iteration-count##

语法：
```css
animation-iteration-count:infinite | <number> [, infinite | <number>]* 
```
 
取值说明：

animation-iteration-count是用来指定元素播放动画的循环次数，其可以取值<number>为数字，其默认值为“1”；infinite为无限次数循环。

##6、animation-direction##

语法：
```css
animation-direction: normal | alternate [, normal | alternate]* 
```
取值说明：

animation-direction是用来指定元素动画播放的方向。
其只有两个值，默认值为normal，如果设置为normal时，动画的每次循环都是向前播放；
另一个值是alternate，他的作用是，动画播放在第偶数次向前播放，第奇数次向反方向播放。

##7、animation-play-state##

语法：
```css
animation-play-state:running | paused [, running | paused]* 
```

取值说明：

animation-play-state主要是用来控制元素动画的播放状态。
其主要有两个值，running和paused其中running为默认值。
他们的作用就类似于我们的音乐播放器一样，可以通过paused将正在播放的动画停下了，也可以通过running将暂停的动画重新播放，我们这里的重新播放不一定是从元素动画的开始播放，而是从你暂停的那个位置开始播放。另外如果暂时了动画的播放，元素的样式将回到最原始设置状态。这个属性目前很少内核支持，所以只是稍微提一下。

上面我们分别介绍了animation中的各个属性的语法和取值，那么我们综合上面的内容可以给animation属性一个速记法：

```css
animation:[<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>] [, [<animation-name> || <animation-duration> || <animation-timing-function> || <animation-delay> || <animation-iteration-count> || <animation-direction>] ]*
```

###example###
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
    body{
        background-color: black;
    }
    @keyframes rippleAni {
        from { opacity: 0.5; transform:scale(0.6,0.6); } 
        to { opacity: 0; transform:scale(1,1); }
    }
    @-webkit-keyframes rippleAni {
        from { opacity: 0.5; -webkit-transform:scale(0.6,0.6); }
        to { opacity: 0; -webkit-transform:scale(1,1); }
    }
    @-moz-keyframes rippleAni {
        from { opacity: 0.5; -moz-transform:scale(0.6,0.6); }
        to { opacity: 0; -moz-transform:scale(1,1); }
    }
    #test {
        -webkit-animation: rippleAni 5s ease 0s infinite normal none;
    }
    .ripple {
        display: block;
        opacity: 0;
        width: 500px;
        height: 500px;
        border: 5px solid rgba(255, 255, 255, 0.9);
        border-radius: 100%;
        /*height: 100%;*/
        position: absolute;
        top: 0;
        left: 0;
    }
    </style>
</head>
<body>
    <div id="test" class="ripple">hello world</div>
</body>
</html>
```
