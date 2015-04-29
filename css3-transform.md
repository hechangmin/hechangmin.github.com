#常用CSS3用法-Transform#

在CSS3中transform主要包括以下几种：旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix。

transform在不同浏览器内核下的书写规则:

```css
//Mozilla内核浏览器：firefox3.5+
-moz-transform: rotate | scale | skew | translate ;
//Webkit内核浏览器：Safari and Chrome
-webkit-transform: rotate | scale | skew | translate ;
//Opera
-o-transform: rotate | scale | skew | translate ;
//IE9
-ms-transform: rotate | scale | skew | translate ;
//W3C标准
transform: rotate | scale | skew | translate ;
```

语法：

```css
transform ： none | <transform-function> [ <transform-function> ]* 
transform: rotate | scale | skew | translate |matrix;
```

none:表示不进么变换；
<transform-function> 表示一个或多个变换函数，以空格分开；

换句话说就是我们同时对一个元素进行transform的多种属性操作，例如rotate、scale、translate三种，但这里需要提醒大家的，以往我们叠加效果都是用逗号（“，”）隔开，但transform中使用多个属性时却需要有空格隔开。


###1. 旋转rotate###

    rotate( angle ),其中angle是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。如：transform:rotate(30deg):

###2. 移动translate###

    移动translate分为三种情况：translate(x,y)水平方向和垂直方向同时移动（也就是X轴和Y轴同时移动）；
    translateX(x)仅水平方向移动（X轴移动）正数向右，负数向左。
    translateY(Y)仅垂直方向移动（Y轴移动）正数向下，负数向上。

###3. 缩放scale###

    缩放scale和移动translate是极其相似，他也具有三种情况：
    scale(x,y)使元素水平方向和垂直方向同时缩放，基中X表示水平方向缩放的倍数，Y表示垂直方向的缩放倍数，而Y是一个可选参数，如果没有设置Y值，则表示X，Y两个方向的缩放倍数是一样的。
    scaleX(x)元素仅水平方向缩放（X轴缩放）；
    scaleY(y)元素仅垂直方向缩放（Y轴缩放），但它们具有相同的缩放中心点和基数，其中心点就是元素的中心位置，缩放基数为1，如果其值大于1元素就放大，反之其值小于1，元素缩小。

###4. 扭曲skew###

    扭曲skew和translate、scale一样同样具有三种情况：
    skew(x,y)使元素在水平和垂直方向同时扭曲（X轴和Y轴同时按一定的角度值进行扭曲变形）；
    skewX(x)仅使元素在水平方向扭曲变形（X轴扭曲变形）；
    skewY(y)仅使元素在垂直方向扭曲变形（Y轴扭曲变形）

###5. 矩阵matrix###

     以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素,此属性值使用涉及到数学中的矩阵。

###补充 ###

    如何改变元素基点transform-origin？ 刚才我们的讲的默认都是基于元素中心。
    可以使用transform-origin来对元素进行基点位置改变，使元素基点不在是中心位置，以达到你需要的基点位置。


ransform-origin 跟其他的css3属性一样，我们需要在不同的浏览内核中加上相应的前缀，下面列出各种浏览器内核下的语法规则：

```css
//Mozilla内核浏览器：firefox3.5+
-moz-transform-origin: x y;
//Webkit内核浏览器：Safari and Chrome
-webkit-transform-origin: x y;
//Opera
-o-transform-origin: x y ;
//IE9
-ms-transform-origin: x y;
//W3C标准
transform-origin: x y ;
```

##example##
```html
<!DOCTYPE HTML>
<html>
<head>
<meta charset="UTF-8" />
<title>CSS3 transform</title>
<style type="text/css" media="screen">
    body,h1,h2,h3,h4,p,ul,li,ol,dl,dt,dd,input,textarea,figure,form{margin:0;padding:0}
    body,input,textarea{font-size:12px;font-family:microsoft yahei}
    body{text-align:center;color:#33383D;background:#eee}
    ul,ol{list-style:none}
    img{border:0}
    button,input {line-height:normal;*overflow:visible}
    input,textarea{outline:none}
    a{color:#61B3E6;text-decoration:none}
    a:hover{color:#1FAEFF}

    .demo-header{position:relative;height:32px;background-color:#444;line-height:32px;text-align: left;}
    .demo-name{background-color: #61B3E6;color: #fff;display: inline-block;padding: 0 20px;}
    .demo-name:hover{color: #fff;}
    .demo-title{height:0;overflow:hidden}
    .demo-container{clear: both;padding:30px 20px;text-align:left;margin:0 auto;line-height: 18px;}
    .demo h2{font-size: 15px;padding-bottom: 6px;margin-bottom: 20px;border-bottom: solid 1px #ddd;}
    
    .demo{
        width: 300px;
    }
    .transform{
        margin:30px 0 80px 0;
        width:200px;
        height:50px;
        font-size:18px;
        font-weight:bold;
        background:#DEE4EE;
        color:#305999;
        text-align:center;
        line-height:50px;
    }

    .transform1{
        -webkit-transform:rotate(10deg);
        -moz-transform:rotate(10deg);
        -o-transform:rotate(10deg);
        -ms-transform:rotate(10deg);
        transform :rotate(10deg);
    }

    .transform2{
        -webkit-transform:skew(20deg);
        -moz-transform:skew(20deg)
    }

    .transform3{
        -webkit-transform:scale(1.5);
        -moz-transform:scale(1.5)
    }
    
    .transform4{-webkit-transform:translate(120px,0);-moz-transform:translate(120px,0)}

    .transform5{-webkit-transition:all 1s ease-in-out;-moz-transition:all 1s ease-in-out}

    .transform5:hover{
        -webkit-transform:rotate(360deg) skew(-20deg) scale(3.0) translate(100px,0);
        -moz-transform:rotate(360deg) skew(-20deg) scale(3.0) translate(100px,0)
    }
</style>
</head>
<body>
<h1 class="demo-title">CSS3 transform</h1>
<div class="demo-header">
    <a class="demo-name" href="#">&laquo; CSS3 transform</a>
</div>

<div class="demo-container demo"><style type="text/css">

</style>
<div class="transform transform1">transform</div>
<div class="transform transform2">transform</div>
<div class="transform transform3">transform</div>
<div class="transform transform4">transform</div>
<div class="transform transform5">transform</div>
</div>
</body>
</html>
```