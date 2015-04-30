初探phantomjs
===================

PhantomJS是什么？
-------------------

PhantomJS是一个基于webkit的JavaScript API。
它使用QtWebKit作为它核心浏览器的功能，使用webkit来编译解释执行JavaScript代码。
任何你可以在基于webkit浏览器做的事情，它都能做到。
它不仅是个隐形的浏览器，提供了诸如CSS选择器、支持Web标准、DOM操作、JSON、HTML5、Canvas、SVG等，
同时也提供了处理文件I/O的操作，从而使你可以向操作系统读写文件等。

PhantomJS的用处？
-------------------

Web产品监测、网页截屏、自动化web测试、页面访问自动化等。当然他所能发挥的价值远不止如此。


如何使用？
------------------

访问官网，既可以下载安装包，也可以查看api文档。[http://phantomjs.org/](http://phantomjs.org/)
另外如果你使用github，怎么能不star一下[https://github.com/ariya/phantomjs](https://github.com/ariya/phantomjs)

下载好后，解压，双击 phantomjs.exe 。很简单是吧，但如果每次命令都要到这个解压目录来执行也不方便，所以加入环境变量：

    打开我的电脑->右键属性->高级系统设置->高级标签->环境变量，在系统变量里找到Path,将你的phantomjs添加到环境变量里。

    比如：;D:\phantomjs-1.9.7-windows

如何给网站截图？
--------------------

```js
var page = require('webpage').create();
page.open('http://www.baidu.com', function () {
    page.render('example.png');
    phantom.exit();//如果你不加这行，执行完也不会退出的。
});
```

将上面代码另存为test1.js, 运行试试： >phantomjs test1.js
怎么样, 是否为他的便捷而惊呼?

如果看网页加载的速度？
-------------------------

直接上代码，如果这个问题，我都还敢BB，估计会被大家拍死。

```js
var t = Date.now();
var address = 'http://www.baidu.com';
var page = require('webpage').create();

page.open(address, function (status) {
    if (status !== 'success') {
        console.log('FAIL to load the address');
    } else {
        t = Date.now() - t;
        page.render('baidu.png');
        console.log('Loading time ' + t + ' msec');
    }
    phantom.exit();
});
```


如何对网页进行JavaScript操作？
----------------------------

使用 evaluate() 方法， 代码是在“沙箱”中运行的，它没有办法读取在其所属页面上下文之外的任何JavaScript对象和变量。
evaluate() 会返回一个对象，然而它仅限制于简单的对象并且不能包含方法或闭包。

```js
var page = require('webpage').create();
var address = 'http://nodeapi.ucdok.com/#/api/';
page.open(address, function (status) {
    var title = page.evaluate(function () {
        return document.title;
    });
    console.log('Page title is ' + title);
    phantom.exit();
});
```

需要说明的有两个点：

1 输出中文出现了乱码?

解决方法，代码中设置下输出编码。

```js
phantom.outputEncoding="gbk";
phantom.scriptEncoding="gbk";
```

2 evaluate 中的console.log无法执行？

任何来自于网页并且包括来自 evaluate() 内部代码的控制台信息，默认不会显示的。
要重写这个行为，使用 onConsoleMessage 回调函数，前一个示例可以被改写成：

```js

var page = require('webpage').create();
var address = 'http://nodeapi.ucdok.com/#/api/';

phantom.outputEncoding="gbk";
phantom.scriptEncoding="gbk";

page.onConsoleMessage = function (msg) {
    console.log('Page title is ' + msg);
};

page.open(address, function (status) {
    page.evaluate(function () {
        console.log(document.title);
    });
    phantom.exit();
});
```

如何自定义userAgent？
-------------------------

```js
var page = require('webpage').create();

phantom.outputEncoding="gbk";
phantom.scriptEncoding="gbk";

console.log('The default user agent is ' + page.settings.userAgent);

//自定义 user agent 的方法
page.settings.userAgent = 'SpecialAgent';
page.open('http://nodeapi.ucdok.com/#/api/', function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
        var ua = page.evaluate(function () {
            return document.getElementById('op-translate').textContent;
        });
        console.log(ua);
    }
    phantom.exit();
});
```

如何追踪网页发出的网络请求及响应？
-----------------------

将一个页面从一台远程服务器请求一个资源的时候，请求和响应均可以通过 onResourceRequested  和  onResourceReceived  回调方法追踪到。

```js
var page = require('webpage').create();

phantom.outputEncoding="gbk";
phantom.scriptEncoding="gbk";

page.onResourceRequested = function (request) {
    console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function (response) {
    console.log('Receive ' + JSON.stringify(response, undefined, 4));
};

page.open('http://nodeapi.ucdok.com/#/api/', function(status) {
    if('success' === status){
        page.includeJs("http://apps.bdimg.com/libs/jquery/2.1.1/jquery.js", function() {
            var val = page.evaluate(function() {
                return $("#op-translate").html();
            });

            console.log(val);
        });
    }else{
        console.log(status);
    }

    page.close();
    page.release();
    phantom.exit();
});
```

咦，JSON.stringify原来可以用三个参数。[JSON.stringify用法](https://github.com/hechangmin/hechangmin.github.com/blob/master/JSON.stringify.md)

如何为网页内嵌自定义的脚本，并操作DOM?
-------------------------------------

```js
//var url = 'https://www.baidu.com/'; 
var url = 'http://www.baidu.com/';
var ajaxUrl = 'http://cdn.staticfile.org/jquery/2.0.3/jquery.min.js';
var page = require('webpage').create();

page.settings.userAgent = 'Mozilla/5.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727)';

page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Unable to access the website');
    } else {
        // 加载jQuery
        page.includeJs(ajaxUrl, function(){
            var val = page.evaluate(function(){
                // 页面内执行js。注意，这个和phantomjs的变量是分离的，外部变量无法直接使用
                return $('.mnav')[0].href;
            });

            console.log('The register address: ' + val);
            phantom.exit();
        });
    };
});
```

**【注意】**

如果目标网站协议https，你内置js资源的协议是http ，会报如下错误信息：

>TypeError: 'null' is not an object (evaluating 'document.body.appendChild')