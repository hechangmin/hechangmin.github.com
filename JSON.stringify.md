JSON.stringify 参数解释
=======================

笔者使用JSON.stringify的次数不算少，今天才发现，原来他支持的参数不只一个的。

比如：

    console.log('Request ' + JSON.stringify(request, undefined, 4));

于是看了下文档,

JSON.stringify(value [, replacer] [, space]) 

参数解释
---------
1.value

    丢进去一个对象进行字符串序列化返回，这个笔者就不BB了。

2.replacer

    这个是可选的。它又分为2种方式，一种是数组，第二种是方法。 

    replacer为数组时，通过后面的实验可以知道，它是和第一个参数value有关系的。一般来说，系列化后的结果是通过键值对来进行表示的。 所以，如果此时第二个参数的值在第一个存在，那么就以第二个参数的值做key，第一个参数的值为value进行表示，如果不存在，就忽略。(过滤,见文尾)

    replacer为方法时，那很简单，就是说把系列化后的每一个对象（记住是每一个）传进方法里面进行处理。 

3.space
    
    就是用什么来做分隔符的。

    如果省略的话，那么显示出来的值就没有分隔符，直接输出来 。
    如果是一个数字的话，那么它就定义缩进几个字符，当然如果大于10 ，则默认为10，因为最大值为10。
    如果是一些转义字符，比如“\t”，表示回车，那么它每行一个回车。 
    如果仅仅是字符串，就在每行输出值的时候把这些字符串附加上去。当然，最大长度也是10个字符。 

eg:

    var stuObj = {
        id: "20122014001",
        name: "Tomy",
        age: 25
    };

    var stuArr = ["id", "age", "addr"];

    var json = JSON.stringify(stuObj, stuArr);
    console.log(json); //{"id":"20122014001","age":25} 