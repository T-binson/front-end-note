#页面重构
	网站重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。
	也就是说是在不改变UI的情况下，对网站进行优化，在扩展的同时保持一致的UI。 对于传统的网站来说重构通常是： 表格(table)布局改为DIV+CSS 使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的) 对于移动平台的优化 针对于SEO进行优化 深层次的网站重构应该考虑的方面 减少代码间的耦合 让代码保持弹性 严格按规范编写代码 设计可扩展的API 代替旧有的框架、语言(如VB) 增强用户体验 通常来说对于速度的优化也包含在重构中 压缩JS、CSS、image等前端资源(通常是由服务器来解决) 程序的性能优化(如数据读写) 采用CDN来加速资源加载 对于JS DOM的优化 HTTP服务器的文件缓存 

#优雅降级
	优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。 如：border-shadow 
#渐进增强：
	从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。 如：默认使用flash上传，但如果浏览器支持HTML5的文件上传功能，则使用HTML5实现更好的体验； 

#前端性能优化的方法
	（1）减少http请求次数：CSSSprites,JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。

	（2）前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数

	（3）用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。

	（4）当需要设置的样式很多时设置className而不是直接操作style。

	（5）少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。

	（6）避免使用CSS Expression（css表达式）又称Dynamic properties(动态属性)。

	（7）图片预加载，将样式表放在顶部，将脚本放在底部 加上时间戳。

	（8）避免在页面的主体布局中使用table，table要等其中的内容完全下载之后才会显示出来，显示比div+css布局慢
		对普通的网站有一个统一的思路，就是尽量向前端优化、减少数据库操作、减少磁盘IO。向前端优化指的是，在不影响功能和体验的情况下，能在浏览器执行的不要在服务端执行，能在缓存服务器上直接返回的不要到应用服务器，程序能直接取得的结果不要到外部取得，本机内能取得的数据不要到远程取，内存能取到的不要到磁盘取，缓存中有的不要去数据库查询。减少数据库操作指减少更新次数、缓存结果减少查询次数、将数据库执行的操作尽可能的让你的程序完成（例如join查询），减少磁盘IO指尽量不使用文件系统作为缓存、减少读写文件次数等。程序优化永远要优化慢的部分，换语言是无法“优化”的。

#页面从输入 URL 到页面加载显示完成
	注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句， 而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、 到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

	详细版:
		浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
		调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
		通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
		进行HTTP协议会话，客户端发送报头(请求报头);
		进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
		进入部署好的后端应用，如 PHP、Java、Javaｓｃｒｉｐｔ、Python 等，找到对应的请求处理;
		处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
		浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
		文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
		页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

	简洁版:
		浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
		服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
		浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
		载入解析到的资源文件，渲染页面，完成

#声明提升（考察频率：高）
	用var声明的变量和函数声明会提升到所在作用域的顶部，函数声明会提升到变量前

#js存储方式（考察频率：高）
	cookie
	sessionStorge
	localStorge
	indexDB

#什么情况需要跨域，解决方法（考察频率：高）
	了解浏览器的同源策略，协议、端口、域名相同
	方法；jsonp, nginx反向代理, nodejs中间件代理, 后端设置http header, 后端在服务器上设置cors

#Promise的执行顺序（考察频率：高）
	let promise = new Promise(function(resolve, reject) {
	  console.log('Promise');
	  resolve();
	});

	promise.then(function() {
	  console.log('resolved.');
	});

	console.log('Hi!');

	// Promise
	// Hi!
	// resolved
	上面代码中，Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

#js的事件循环机制（考察频率：高）
	关键字：单线程非阻塞、执行栈、事件队列、宏任务(setTimeout()、setInterval())、微任务(new Promise())
	宏任务、微任务、同步任务的执行顺序
	setTimeout(function () {
	    console.log(1);
	});

	new Promise(function(resolve,reject){
	    console.log(2)
	    resolve(3)
	}).then(function(val){
	    console.log(val);
	})
	console.log(4);
	// 2
	// 4
	// 3
	// 1
	先按顺序执行同步任务，Promise新建后立即执行输出2，接着输出4，异步任务等同步任务执行完后执行，且同一次事件循环中，微任务永远在宏任务之前执行。这时候执行栈空了，执行事件队列，先取出微任务，输出3，最后取出一个宏任务，输出1。

#for循环中的作用域问题（考察频率：高）
	写出以下代码输出值，尝试用es5和es6的方式进行改进输出循环中的i值。

	for (var i=1; i<=5; i++) { 
	    setTimeout(function timer() { 
	       console.log(i); 
	    }, i*1000); 
	}
	输出5个6，因为回调函数在for循环之后执行，所有函数共享一个i的引用。
	es5:(利用函数的闭包)
	for (var i=1; i<=5; i++) { 
	    (function(j) { 
	        setTimeout(function timer() { 
	            console.log(j); 
	        }, j*1000); 
	    })(i); 
	}

	es6:(es6的let语法)
	for (let i=1; i<=5; i++) { 
	    setTimeout(function timer() { 
	        console.log(i);
	    }, i*1000); 
	}

#闭包的作用（考察频率：中）

#原型和原型链（考察频率：中）

#重绘与回流（考察频率：中）
	重绘：当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
	回流：当Render Tree(DOM)中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。
	回流要比重绘消耗性能开支更大。
	回流必将引起重绘，重绘不一定会引起回流。

#实现一个对象的深度拷贝(递归思想，Object.prototype.toString区分数组和对象)（考察频率：中）

#js浮点数运算精度问题(0.1 + 0.2 !== 0.3)
	比如在 JavaScript 中计算 0.1 + 0.2时，到底发生了什么呢？

	首先，十进制的0.1和0.2都会被转换成二进制，但由于浮点数用二进制表达时是无穷的，例如。

	JavaScript 代码:
	0.1 -> 0.0001100110011001...(无限)
	0.2 -> 0.0011001100110011...(无限)
	IEEE 754 标准的 64 位双精度浮点数的小数部分最多支持 53 位二进制位，所以两者相加之后得到二进制为：

	JavaScript 代码: 0.0100110011001100110011001100110011001100110011001100
	因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了 0.30000000000000004。所以在进行算术计算时会产生误差。

#浏览器从加载到渲染的过程，比如输入一个网址到显示页面的过程。 （考察频率:高）
	加载过程：
		浏览器根据 DNS 服务器解析得到域名的 IP 地址
		向这个 IP 的机器发送 HTTP 请求
		服务器收到、处理并返回 HTTP 请求
		浏览器得到返回内容
	
	渲染过程：
		根据 HTML 结构生成 DOM 树
		根据 CSS 生成 CSSOM
		将 DOM 和 CSSOM 整合形成 RenderTree
		根据 RenderTree 开始渲染和展示
		遇到<script>时，会执行并阻塞渲染

#浏览器的缓存机制策略（考察频率：中）
	
#性能优化（考察频率：中）
	优化的方向有两个：
	减少页面体积，提升网络加载
	优化页面渲染

	减少页面体积，提升网络加载
		静态资源的压缩合并（JS 代码压缩合并、CSS 代码压缩合并、雪碧图）
		静态资源缓存（资源名称加 MD5 戳）
		使用 CDN 让资源加载更快
	
	优化页面渲染
		CSS 放前面，JS 放后面
		懒加载（图片懒加载、下拉加载更多）
		减少DOM 查询，对 DOM 查询做缓存
		减少DOM 操作，多个操作尽量合并在一起执行（DocumentFragment）
		事件节流
		尽早执行操作（DOMContentLoaded）
		使用 SSR 后端渲染，数据直接输出到 HTML 中，减少浏览器使用 JS - 模板渲染页面 HTML 的时间

#vue组件通信（考察频率：高）
	1)父——>子
		props(v-bind)
	2)子——>父
		event(v-on)
		$parent $root
	3)非父子组件
		event bus
		vuex

#双向绑定原理（考察频率：高）
	最基本的要讲清楚数据劫持Object.defineProperty(), 讲清楚依赖收集（Watcher、Dep）。

#路由导航钩子（导航守卫）（考察频率：中）
	全局钩子
	路由独享钩子
	组件内钩子

#v-if和v-show的共同点和区别（考察频率：中）
	参考官方文档
	都是用来做条件渲染，通过条件控制元素的显示与隐藏。
	v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。
	v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。
	相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
	一般来说，v-if有更高的切换开销，而v-show有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。

#html5为什么只需要写<!doctype html>?
  答：html5不是基于sgml（标准通用标记语言），不需要对dtd文件进行引用，但是需要doctype来规范浏览器的行为，
  否则浏览器将开启怪异模式，而html4.01基于sgml，需要引入dtd，才能告知浏览器文档使用的文档类型

#行内元素有哪些？块级元素有哪些？空（void）元素有哪些？

#页面导入样式时，使用link和@import有什么区别？
	两者都是外部引用CSS的方式，但是存在一定的区别：
		区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
		区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
		区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
	　区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。
	@import最优写法
    @import的写法一般有下列几种：

	    @import ‘style.css’ //Windows IE4/ NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别

	    @import “style.css” //Windows IE4/ NS4, Macintosh IE4/NS4不识别

	    @import url(style.css) //Windows NS4, Macintosh NS4不识别

	    @import url(‘style.css’) //Windows NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别

	    @import url(“style.css”) //Windows NS4, Macintosh NS4不识别

    由上分析知道，@import url(style.css) 和@import url(“style.css”)是最优的选择，兼容的浏览器最多。
    从字节优化的角度来看@import url(style.css)最值得推荐。

#html 5有哪些新特性？移除了哪些元素？如何处理HTML5新标签的浏览器兼容性问题？如何区分html和html5？
    新增的元素有绘画 canvas ，用于媒介回放的 video 和 audio 元素，本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失，而sessionStorage的数据在浏览器关闭后自动删除，此外，还新增了以下的几大类元素。

    内容元素，article、footer、header、nav、section。

    表单控件，calendar、date、time、email、url、search。

    控件元素，webworker, websocket, Geolocation。

    移出的元素有下列这些：

    显现层元素：basefont，big，center，font, s，strike，tt，u。

    性能较差元素：frame，frameset，noframes。

# 如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5？
    处理兼容问题有两种方式：

    1.IE8/IE7/IE6支持通过document.方法产生的标签，利用这一特性让这些浏览器支持HTML5新标签。

    2.使用是html5shim框架

    另外，DOCTYPE声明的方式是区分HTML和HTML5标志的一个重要因素，此外，还可以根据新增的结构、功能元素来加以区分。

#iframe有哪些优缺点？
    优点：
	    1.用来实现长连接，在websocket不可用的时候作为一种替代，最开始由google发明。Comet：基于 HTTP 长连接的”服务器推”技术

	    2.跨域通信。JavaScript跨域总结与解决办法，类似的还有浏览器多页面通信，比如音乐播放器，用户如果打开了多个tab页，应该只有一个在播放。

	    3.历史记录管理，解决ajax化网站响应浏览器前进后退按钮的方案，在html5的history api不可用时作为一种替代。

	    4.纯前端的utf8和gbk编码互转。比如在utf8页面需要生成一个gbk的encodeURIComponent字符串，可以通过页面加载一个gbk的iframe，然后主页面与子页面通信的方式实现转换，这样就不用在页面上插入一个非常巨大的编码映射表文件了

    缺点：
	    1、在网页中使用框架结构最大的弊病是搜索引擎的”蜘蛛”程序无法解读这种页面。当”蜘蛛”程序遇到由数个框架组成的网页时，它们只  看到框架而无法找到链接，因此它们会以为该网站是个死站点，并且很快转身离去。对一个网站来说这无异于一场灾难。如果你想销售产品，你需要客户;如想得到客户，你首先要让人们访问你的网站，而要做到这一点，你就非求助于搜索引擎不可。你花费了大量的时间、 精力和金钱开设了一家网上商店，却又故意不让搜索引擎检索你，这就好象开家零售商店，却将窗户全部漆成黑色，而且还不挂任何招牌一样。

			2、框架结构有时会让人感到迷惑，特别是在几个框架中都出现上下、左右滚动条的时候。这些滚动条除了会挤占已经非常有限的页面空间外，还会分散访问者的注意力。访问者遇到这种网站往往会立刻转身离开。他们会想，既然你的主页如此混乱，那么网站的其他部分也许更不值得浏览。

		  3、链接导航问题。使用框架结构时,你必须保证正确设置所有的导航链接,如不然,会给访问者带来很大的麻烦。比如被链接的页面出现在导航框架内，这种情况下访问者便被陷住了，因为此时他没有其他地方可去。

#label的作用是什么？是怎么使用的？
    Label 中有两个属性是非常有用的,一个是FOR、另外一个就是ACCESSKEY了。

    FOR属性
     功能：表示Label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。
     用法：<Label FOR=”InputBox”>姓名</Label><input ID=”InputBox” type=”text”>

    ACCESSKEY属性：
     功能：表示访问Label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。
     用法：<Label FOR=”InputBox” ACCESSKEY＝”N”>姓名</Label><input ID=”InputBox” type=”text”>

    局限性：accessKey属性所设置的快捷键不能与浏览器的快捷键冲突，否则将优先激活浏览器的快捷键。

8、实现不使用border，画出1px高的线，在不同浏览器下的Quirksmode和CSSCompat模式下都能保持一致的效果？
	<div style=”height:1px;overflow:hidden;background:red”></div>

9、网页验证码是干嘛的？是为了解决什么安全问题？
	网页验证码介绍：”验证码”的英文表示为CAPTCHA（Completely Automated Public Turing test to tell Computers and Humans Apart），翻译过来就是”全自动区分计算机和人类的图灵测试”，顾名思义，它是用来区分计算机和人类的。在CAPTCHA测试中，作为服务器的计算机会自动生成一个问题由用户来解答。这个问题可以由计算机生成并评判，但是必须只有人类才能解答。由于计算机无法解答CAPTCHA的问题，所以回答出问题的用户就可以被认为是人类。CAPTCHA是由计算机来考人类，而不是标准图灵测试中那样由人类来考计算机，因此人们有时称CAPTCHA是一种反向图灵测试。

	验证码的原理：服务器端随机生成验证码字符串，保存在内存中，并写入图片，发送给浏览器端显示，浏览器端输入验证码图片上字符，然后提交服务器端，提交的字符和服务器端保存的该字符比较是否一致，一致就继续，否则返回提示。攻击者编写的robot程序，很难识别验证码字符，顺利的完成自动注册，登录；而用户可以识别填写，所以这就实现了阻挡攻击的作用。而图片的字符识别，就是看图片上的干扰强度了。就实际的效果来说，验证码只是增加攻击者的难度，而不可能完全的防止。

10、介绍一下标准的css的盒子模型？与低版本IE的盒子模型有什么不同？
    盒子模型有两种，分别是ie盒子模型和标准w3c盒子模型
    W3C盒子模型的范围包括margin、border、padding、content，并且content部分不包含其他部分

    IE盒子模型的范围也包括margin、border、padding、content，和标准W3C盒子模型不同的是：IE盒子模型的content部分包含了border和pading

11、如何居中div，如何居中一个浮动元素？如何让绝对定位的div居中？
    a.margin:xpx auto;
    b.确定容器的宽高，这里宽度是必须的，高度可以不设，设置外层的上外边距和左外边距分别是宽高的一半。
     实现居中关键在于margin设置与position:relative.
    .div {
	    width:500px ;
	    height:300px;
	    margin: -150px 0 0 -250px;
	    position:relative;
	    left:50%;
	    top:50%;
		}

		c.position:absolute;
      top: 50%;
      left: 50%; 只能把div定位在以红色圈为起点的位置，加上margin:-100px 0px 0px -100

12、display有哪些值？说明他们的作用？
    block:块对象的默认值。用该值为对象之后添加新行
    none:隐藏对象。与visibility属性的hidden值不同，其不为被隐藏的对象保留其物理空间
    inline:内联对象的默认值。用该值将从对象中删除行
    compact:分配对象为块对象或基于内容之上的内联对象
    marker:指定内容在容器对象之前或之后。要使用此参数，对象必须和:after及:before伪元素一起使用
    inline-table:将表格显示为无前后换行的内联对象或内联容器
    list-item :将块对象指定为列表项目。并可以添加可选项目标志
    run-in :分配对象为块对象或基于内容之上的内联对象
    table :将对象作为块元素级的表格显示

13、position的值relative和absolute的定位原点是什么？
		Absolute，CSS中的写法是：position:absolute;他的意思是绝对定位，他是参照浏览器的左上角，配合TOP、RIGHT、BOTTOM、LEFT(下面简称TRBL)进行定位，在没有设定TRBL，默认依据父级的做标原始点为原始点。如果设定TRBL并且父级没有设定position属性，那么当前的absolute则以浏览器左上角为原始点进行定位，位置将由TRBL决定。

		Relative，CSS中的写法是：position:relative; 他的意思是相对定位，他是参照自身的原始点为原始点。

14、display设置为inline-block时，li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
  行框的排列会受到中间空白（回车空格等等）的影响，这些空白也会被应用样式，占据空间，所以会有间隔

  解决：设置ul的font-size为0，缺陷是必须重新在li中去设置字体大小

15、请解释下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？
    a.添加新的元素 、应用clear：both;

    b.父级定义overflow: auto（注意：是父级div也就是这里的 div.outer） 一个对seo比较友好，另个hidden对seo不是太友好

    在IE6中还需要触发hasLayout ，例如zoom：1；

    c.据说是最高大上的方法 :after
        方法：（注意：作用于浮动元素的父亲）IE6-7不支持:after，
        使用 zoom:1触发hasLayout
        {zoom:1;} /*==for IE6/7 Maxthon2==*/
        :after {clear:both;content:’.’;display:block;width: 0;height: 0;visibility:hidden;}

    d.使用br标签和其自身的html属性,<br clear=”all” /> clear=”all | left | right | none”属性

    e.父元素也设置浮动

    f.父元素设置display:table盒模型属性已经改变，由此造成的一系列问题，得不偿失，不推荐使用

16、在网页中的应该使用奇数还是偶数的字体？为什么呢？
  偶数字号相对更容易和web设计的其他部分构成比例关系
  使用奇数号字体不好的地方是，文本段落无法对齐

17、margin和padding分别适合什么场景使用？
    何时应当使用margin：
    (1)需要在border外侧添加空白时，
    (2)空白处不需要有背景（色）时，
	  (3)上下相连的两个盒子之间的空白需要相互抵消时，比如15px+20px的margin，将得到20px的空白（注意地方见第三点）。

    何时应当使用padding
    (1)需要在border内侧添加空白时（往往是文字与边框距离的设置），
    (2)空白处需要背景（色）时，
	  (3)上下相连的两个盒子之间的空白希望等于两者之和时，比如15px+20px的padding，将得到35px的空白。

    margin使用时应该注意的地方
    margin在垂直方向上相邻的值相同时会发生叠加，水平方向上相邻的值会相加。margin取负值时，在垂直方向上，两个元素的边界仍然会重叠。但是，此时一个为正值，一个为负值，并不是取其中较大的值，而是用正边界减去负边界的绝对值，也就是说，把正的边界值和负的边界值相加。

18、元素竖向的百分比设定是相对于容器的高度吗？
  答：相对于父容器的宽度

19、什么是响应式设计？响应式设计的基本原理是什么？如何兼容较低版本的IE？
  答：一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。
    优点：
	    面对不同分辨率设备灵活性强
	    能够快捷解决多设备显示适应问题

    缺点：
	    兼容各种设备工作量大，效率低下
	    代码累赘，会出现隐藏无用的元素，加载时间加长
	    其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
	    一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

    respond.js和css3-mediaqueries-js

20、设置元素浮动后，该元素的display值是多少？
    display:block;

21、怎么让chrome支持小于12px的文字？
  chrome私有属性：-webkit-text-size-adjust:none;
  -webkit-transform:scale(0.8);
  行内元素设置:-webkit-transform:scale(0.8);display:inline-block

22、display:inline-block什么时候会显示间隙？
  1.给父元素 写font-size:0

  2.把标签写到一行，不要在编辑器里敲回车换行，但是这种写法对于标签很多的情况可读性太差，适用与例如<a></a><a></a>这样简单的结构

23、有一个高度自适应的div。里面有2个div，一个高度100px，希望另一个填满剩下的高度？
  外层box-sizing: border-box; 同时设置padding: 100px 0 0；
  内层100像素高的元素向上移动100像素，或使用absolute定位防止占据空间；
  另一个元素直接height: 100%;
  外层position: relative；
  百分百自适应元素直接position: absolute; top: 100px; bottom: 0; left: 0

24、什么是window对象？什么是document对象？
  window它是一个顶层对象,而不是另一个对象的属性即浏览器的窗口。
  document对象是window对象的一个对象属性

25、null和undefined的区别？
  null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。
  null表示”没有对象”，即该处不应该有值
  (1)作为函数的参数，表示该函数的参数不是对象。
  (2)作为对象原型链的终点。

	undefined表示”缺少值”，就是此处应该有一个值，但是还没有定义
  (1)变量被声明了，但没有赋值时，就等于undefined。
  (2)调用函数时，应该提供的参数没有提供，该参数等于undefined。
  (3)对象没有赋值的属性，该属性的值为undefined。
  (4)函数没有返回值时，默认返回undefined。

26、什么是闭包（closure）？为什么要用它？
  闭包就是能够读取其他函数内部变量的函数
  由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成”定义在一个函数内部的函数”。
  所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。
  
  闭包的用途：
    闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中
    重用变量又不能造成全局污染

27、js代码中”use strict”是什么意思？使用它区别是什么？
  进入”严格模式”的标志，老版本的浏览器会把它当作一行普通字符串，加以忽略
  将”use strict”放在脚本文件的第一行，则整个脚本都将以”严格模式”运行。如果这行语句不在第一行，则无效，整个脚本以”正常模式”运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意。
  (严格地说,只要前面不是产生实际运行结果的语句,"use strict"可以不在第一行,比如直接跟在一个空的分号后面。)
  将”use strict”放在函数体的第一行，则整个函数以”严格模式”运行
  因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中

  – 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
  – 消除代码运行的一些不安全之处，保证代码运行的安全；
  – 提高编译器效率，增加运行速度；
  – 为未来新版本的Javascript做好铺垫。

28、js中有一个函数，执行对象查找时，永远不会去查找原型，这个函数是什么？
  hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。如果有，返回true，否则返回false。该方法属于Object对象，由于所有的对象都”继承”了Object的对象实例，因此几乎所有的实例对象都可以使用该方法。

29、js延迟加载的方式有哪些？
	js的延迟加载有助与提高页面的加载速度，以下是延迟加载的几种方法：
		1.使用setTimeout延迟方法的加载时间
		延迟加载js代码，给网页加载留出更多时间
			<script type=”text/javascript” >
			function A(){
				$.post(“/lord/login”,{name:username,pwd:password},function(){
				alert(“Hello”);
				});
			}

			$(function (){
				setTimeout(‘A()’, 1000); //延迟1秒
			})
			</script>

		2.让js最后加载
		例如引入外部js脚本文件时，如果放入html的head中,则页面加载前该js脚本就会被加载入页面，而放入body中，则会按照页面从上倒下的加载顺序来运行JavaScript的代码~~~ 所以我们可以把js外部引入的文件放到页面底部，来让js最后引入，从而加快页面加载速度

		3.上述方法2也会偶尔让你收到Google页面速度测试工具的”延迟加载javascript”警告。所以这里的解决方案将是来自Google帮助页面的推荐方案。
			//这些代码应被放置在</body>标签前(接近HTML文件底部)
			<script type=”text/javascript”>
			function downloadJSAtOnload() {
				var element = document.createElement(“script”);
				element.src = “defer.js”;
				document.body.appendChild(element);
			}
			if (window.addEventListener)
				window.addEventListener(“load”, downloadJSAtOnload, false);
			else if (window.attachEvent)
				window.attachEvent(“onload”, downloadJSAtOnload);
			else window.onload = downloadJSAtOnload;
			</script>

			这段代码意思是等到整个文档加载完后，再加载外部文件”defer.js”。
			使用此段代码的步骤：
			1）.复制上面代码
			2）.粘贴代码到HTML的标签前 (靠近HTML文件底部)
			3）.修改”defer.js”为你的外部JS文件名
			4）.确保你文件路径是正确的。例如：如果你仅输入”defer.js”，那么”defer.js”文件一定与HTML文件在同一文件夹下。
			注意：这段代码直到文档加载完才会加载指定的外部js文件。因此，不应该把那些页面正常加载需要依赖的javascript代码放在这里。而应该将JavaScript代码分成两组。一组是因页面需要而立即加载的javascript代码，另外一组是在页面加载后进行操作的javascript代码(例如添加click事件或其他东西)。这些需等到页面加载后再执行的JavaScript代码，应放在一个外部文件，然后再引进来。

30、同步和异步的区别？
	同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；
	异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率。
  举个浏览器例子：普通B/S模式（同步）AJAX技术（异步）
		同步：提交请求->等待服务器处理->处理完毕返回 这个期间客户端浏览器不能干任何事
		异步: 请求通过事件触发->服务器处理（这是浏览器仍然可以作其他事情）->处理完毕
	再举个生活的例子：大家联系的时候如果使用手机通话，那么只能跟一个人联系，过程中做不了其他任何操作，如果使用短信或者聊天的方式，就可以同时跟很多人聊天，别人收到信息后会回复，在回复之前还可以跟另外的人进行聊天。

31、document.write和innerHTML的区别？
  1.document.write是直接写入到页面的内容流，如果在写之前没有调用document.open, 浏览器会自动调用open。每次写完关闭之后重新调用该函数，会导致页面被重写。

  2.innerHTML则是DOM页面元素的一个属性，代表该元素的html内容。你可以精确到某一个具体的元素来进行更改。如果想修改document的内容，则需要修改document.documentElement.innerElement。

  3.两者都可动态包含外部资源如JavaScript文件
  通过document.write插入<script></script>元素会自动执行其中的脚本；
  大多数浏览器中，通过innerHTML插入<script></script>元素并不会执行其中的脚本
  innerHTML很多情况下都优于document.write，其原因在于其允许更精确的控制要刷新页面的那一个部分。

32、.call()和.apply()的含义和区别？
  1、call，apply都属于Function.prototype的一个方法，它是JavaScript引擎内在实现的，因为属于Function.prototype，所以每个Function对象实例(就是每个方法)都有call,apply属性。既然作为方法的属性，那它们的使用就当然是针对方法的了，这两个方法是容易混淆的，因为它们的作用一样，只是使用方式不同。

  2、语法：foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3);

  3、相同点：两个方法产生的作用是完全一样的。

  4、不同点：方法传递的参数不同，单个单数传入，另一个可以以数组方式传入

33、JQ和JQUI有啥区别？
	jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库（或JavaScript框架）。jQuery设计的宗旨是”write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。

	jQuery UI是建立在jQuery JavaScript库上的一组用户界面交互、特效、小部件及主题。

34、需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器的前进，后退时正确响应。给出你的技术实现方案？
  用cookie或者localStorage来记录应用的状态即可，刷新页面时读取一下这个状态，然后发送相应ajax请求来改变页面即可

  HTML5里引用了新的API，就是history.pushState和history.replaceState，就是通过这个接口做到无刷新改变页面URL的

  虽然ajax可以无刷新改变页面内容，但无法改变页面URL
  其次为了更好的可访问性，内容发生改变后，改变URL的hash。但是hash的方式不能很好的处理浏览器的前进、后退等问题
  有的浏览器引入了onhashchange的接口，不支持的浏览器只能定时去判断hash是否改变
  再有，ajax的使用对搜索引擎很不友好，往往蜘蛛爬到的区域是空的
  为了解决传统ajax带来的问题，HTML5里引入了新的API，即：history.pushState, history.replaceState
  可以通过pushState和replaceState接口操作浏览器历史，并且改变当前页面的URL。
    pushState是将指定的URL添加到浏览器历史里，replaceState是将指定的URL替换当前的URL。
  如何调用
    var state = {    title: title,    url: options.url,    otherkey: othervalue};window.history.pushState(state, document.title, url);
    state对象除了要title和url之外，也可以添加其他的数据，比如：还想将一些发送ajax的配置给保存起来。
    replaceState和pushState是相似的，不需要多做解释。

  如何响应浏览器的前进、后退操作
    window对象上提供了onpopstate事件，上面传递的state对象会成为event的子对象，这样就可以拿到存储的title和URL了。
    window.addEventListener(‘popstate’, function(e){ if (history.state){    var state = e.state; //do something(state.url, state.title); }}, false);
    这样就可以结合ajax和pushState完美的进行无刷新浏览了。

35、js的数据类型都有哪些？
 字符串string、数字number、布尔boolean、数组array、对象object、Null、Undefined

36、已知ID的input输入框，希望获取这个输入框的输入值，怎么做？(不使用第三方框架)
  document.getElementById(id).value;

37、希望获取到页面中所有的checkbox怎么做？(不使用第三方框架)
  document.getElementsByTagName(‘input’);
  遍历循环(dom.getAttribute('type') === 'checkbox')

38、设置一个已知ID的div和html内容为xxx，字体颜色设置为黑色？(不使用第三方框架)
  var div = document.getElementById(id);
  div.innerHTML = ”;
  div.style.color = ”;

39、当一个dom节点被点击时，我们需要能够执行一个函数，应该怎么做？
  直接在DOM里绑定事件：”<div onclick=”test()”>xx</div>” …
  在JS里通过onclick绑定：xxx.onclick = test
  通过事件添加进行绑定：addEventListener(xxx, ‘click’, test)
　那么问题来了，Javascript的事件流模型都有什么？
	  “事件冒泡”：事件开始由最具体的元素接受，然后逐级向上传播
	  “事件捕捉”：事件由最不具体的节点先接收，然后逐级向下，一直到最具体的
	  “DOM事件流”：三个阶段：事件捕捉，目标阶段，事件冒泡

40、什么是Ajax和JSON，他们的优缺点？
	Ajax是异步JavaScript和XML,用于在Web页面中实现异步数据交互。
　		优点：
	    可以使得页面不重载全部内容的情况下加载局部内容，降低数据传输量
	    避免用户不断刷新或者跳转页面，提高用户体验

    缺点：
      对搜索引擎不友好
      要实现ajax下的前后退功能成本较大
      可能造成请求数的增加
      跨域问题限制

  JSON是一种轻量级的数据交换格式，ECMA的一个子集
	　优点：轻量级、易于人的阅读和编写，便于机器（JavaScript）解析，支持复合数据类型（数组、对象、字符串、数字）

41、请看下列代码输出什么？解释原因？
    var a;
    alert(typeof a); //undefined
    alert(b); //报错

    解释：Undefined是一个只有一个值的数据类型，这个值就是”undefined”，
    在使用var声明变量但并未对其赋值进行初始化时，这个变量的值就是undefined。而b由于未声明将报错。
    注意未申明的变量和声明了未赋值的是不一样的。

    var a = null;
    alert(typeof a); //object

		解释：null是一个只有一个值的数据类型，这个值就是null。表示一个空指针对象，所以用typeof检测会返回”object”

42、js的typeof返回哪些数据类型？
  有如下6种返回值：
		1）number；
		2）string；
		3）boolean；
		4）object
		5）function
		6）undefined;

43、split() join()的区别？
  join() 方法用于把数组中的所有元素放入一个字符串。
  元素是通过指定的分隔符进行分隔的。

  指定分隔符方法join(“#”);其中#可以是任意
  与之相反的是split()方法：用于把一个字符串分割成字符串数组.

44、数组方法pop() push() unshift() shift()?
  push和pop方法，这两个方法只会对数组从尾部进行压入或弹出，而且是在原数组进行操作，任何的改动都是会影响到操作的数组。push(args)可以每次压入多个元素，并返回更新后的数组长度。pop()函数每次只会弹出最后一个结尾的元素，并返回弹出的元素，如果是对空组数调用pop()则返回undefined。 如果参数是数组则是将整个数组当做一个元素压入到原来的数组当中。并不会产生类似concat合并数组时产生的”拆分现象”

  unshift和shift这两个方法都是通过对数组的头部进行的操作，其他基本跟push和pop类似

  shift:从集合中把第一个元素删除，并返回这个元素的值。
  unshift: 在集合开头添加一个或更多元素，并返回新的长度
  push:在集合中添加元素，并返回新的长度
  pop:从集合中把最后一个元素删除，并返回这个元素的值 

45、ajax请求时，如何解释json数据？
  1.$.JSON(url,params,fun);
  2.$.ajax({}); dataType:’json’
  都可以使用$each();进行遍历
  $.each(object,function(index,item){

  });

46、js的本地对象，内置对象和宿主对象？
  本地对象：
    Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError官方定义好了的对象

  内置对象： Global 和 Math，内置对象是本地对象的一种
  宿主对象：所有的BOM和DOM对象都是宿主对象，是那些官方未定义，你自己构建的对象加上DOM和BOM对象组成的

47、列举所了解的前端框架并简述？
	以下是常用的前端基础框架：


	以下是常见的前端构建框架：


	以下是场检的JS/CSS模块化开发的框架：

48、对web标准以及w3c的理解与认识？
  (1)web标准规范要求，书写标签必须闭合、标签小写、不乱嵌套，可提高搜索机器人对网页内容的搜索几率。— SEO

  (2)建议使用外链css和js脚本，从而达到结构与行为、结构与表现的分离，提高页面的渲染速度，能更快地显示页面的内容。

  (3)样式与标签的分离，更合理的语义化标签，使内容能被更多的用户所访问、内容能被更广泛的设备所访问、更少的代码和组件， 从而降低维护成本、改版更方便

  (4)不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性

  遵循w3c制定的web标准，能够使用户浏览者更方便的阅读，使网页开发者之间更好的交流。

49、xhtml和html有什么区别？
  XHTML是HTML 4.01和XML1.0的杂交，XHTML1.0是基于HTML4.01的HTML是一种基于标准通用标记语言（SGML）的应用，而XHTML则基于可扩展标记语言（XML），HTML和XHTML其实是平行发展的两个标准。本质上说，XHTML是一个过渡技术，结合了部分XML的强大功能及大多数HTML的简单特性。建立XHTML的目的就是实现HTML向XML的过渡
    1、XHTML要求正确嵌套

    2、XHTML所有元素必须关闭

    3、XHTML区分大小写

    4、XHTML属性值要加引号

    5、XHTML用id属性代替name属性

    6、属性值不能简写

50、行内元素有哪些？块级元素有哪些？css和盒子模型？
  盒子模型：内容、填充（padding）、边框（border）、外边界（margin）

  box-sizing:border-box; box-sizing:content-box;

51、css选择器有哪些？哪些属性可以继承？优先级算法如何计算？内联和import哪个级别更高？
  可继承的：font-size font-family color

  不可继承的：border padding margin background-color width height

  优先级：!important > [ id > class > tag ] important比内联优先级高

52、前端页面有哪三层构成，分别是什么？作用是什么？
  结构层、表示层、行为层

	结构层（structural layer）
	由 HTML 或 XHTML之类的标记语言负责创建。标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出了描述，但这些标签不包含任何关于如何显示有关内容的信息。例如，P标签表达了这样一种语义：”这是一个文本段。”

	表示层（presentation layer）
	由 CSS 负责创建。 CSS对”如何显示有关内容”的问题做出了回答。

	行为层（behaviorlayer）
	负责回答”内容应该如何对事件做出反应”这一问题。这是 Javascript 语言和 DOM主宰的领域

53、你如何对网站的文件和资源进行优化？期待的解决方法包括？
  A、文件合并，减少http请求，合并JavaScript和CSS文件、CSS Sprites、图像映射 （Image Map）和使用Data URI来编码图片

	B、文件最小化/文件压缩，减少文件下载的体积；常用的工具是YUI Compressor

	C、使用 CDN 托管，尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定

	D、缓存的使用（多个域名来提供缓存）

	E、GZIP 压缩你的 JS 和 CSS 文件

54、看下列代码？输出什么？解释原因？
  var a = null;
  alert(typeof a);
	答案：输出为object,JS类型值是存在32 BIT单元里,32位有1-3位表示TYPE TAG,其它位表示真实值而表示object的标记位正好是低三位都是0
	000: object. The data is a reference to an object.
	而js里的Null是机器码NULL空指针, (0x00 is most platforms).所以空指针引用 加上 对象标记还是0,最终体现的类型还是object..
	这也就是为什么Number(null)===0吧…
	The history of “typeof null”
	2. 曾经有提案 typeof null === ‘null’.但提案被拒绝
		harmony:typeof_null

55、看代码给答案？并进行解释？
  var a = new Object();
  a.value=1;
  b = a;
  b.value=2;
  alert(a.value);//2

56、var numberArray = [3,6,2,4,1,5];
	1) 实现对该数组的倒排，输出[5,1,4,2,6,3]
	2) 实现对该数组的降序排列，输出[6,5,4,3,2,1]
   var numberArray = [3,6,2,4,1,5];
   numberArray.reverse(); // 5,1,4,2,6,3
   numberArray.sort(function(a,b){ //6,5,4,3,2,1
	   return b-a;
   })

57、你能描述一下渐进增强和优雅降级之间的不同吗?
  如果提到了特性检测，可以加分。
  检测浏览器，渐进增强就是让牛b的浏览器的效果更好，优雅降级就是让2b的浏览器在功能ok的情况下效果一般。

58、线程与进程的区别？
  一个程序至少有一个进程,一个进程至少有一个线程.
  线程的划分尺度小于进程，使得多线程程序的并发性高。
  另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。
  线程在执行过程中与进程还是有区别的。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。

  从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。

59、请解释一下什么是”语义化的 HTML”？
 语义化的好处：
	1：去掉或样式丢失的时候能让页面呈现清晰的结构：
	  html本身是没有表现的，我们看到例如<h1>是粗体，字体大小2em，加粗；<strong>是加粗的，不要认为这是html的表现，这些其实html默认的css样式在起作用，所以去掉或样式丢失的时候能让页面呈现清晰的结构,不是的HTML结构的优点，但是浏览器都有有默认样式，默认样式的目的也是为了更好的表达html的语义，可以说浏览器的默认样式和语义化的HTML结构是不可分割的。

	2.屏幕阅读器（如果访客有视障）会完全根据你的标记来”读”你的网页.

  3.PDA、手机等设备可能无法像普通电脑的浏览器一样来渲染网页（通常是因为这些设备对CSS的支持较弱）.

  4.搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重.

  5.你的页面是否对爬虫容易理解非常重要,因为爬虫很大程度上会忽略用于表现的标记,    而只注重语义标记.

  6.便于团队开发和维护
  	语义化的HTML就是：标题用h1-h6，文字段落用p，列表用ul li，大致如此

60、为什么利用多个域名来提供网站资源会更有效？
  浏览器同一时间可以从一个域名下载多少资源？你的浏览器能同时保持对一个域名的多少连接？
    三个最主流的原因:
     1. CDN缓存更方便
     2. 突破浏览器并发限制 (你随便挑一个 G家的 url: https://lh4.googleusercontent.com/- si4dh2myPWk/T81YkSi__AI/AAAAAAAAQ5o/LlwbBRpp58Q/w497-h373/IMG_20120603_163233.jpg, 把前面的 lh4换成 lh3,lh6 啥的，都照样能够访问，像地图之类的需要大量并发下载图片的站点，这个非常重要。)
     3. Cookieless, 节省带宽，尤其是上行带宽 一般比下行要慢。。。
    还有另外两个非常规原因:
     4.对于UGC的内容和主站隔离，防止不必要的安全问题(上传js窃取主站cookie之类的) 。
     正是这个原因要求用户内容的域名必须不是自己主站的子域名，而是一个完全独立的第三方域名。
    5. 数据做了划分，甚至切到了不同的物理集群，通过子域名来分流比较省事. ^_^ 这个可能被用的不多。
    PS: 关于Cookie的问题，带宽是次要的，安全隔离才是主要的。
     关于多域名，也不是越多越好，虽然服务器端可以做泛解释，浏览器做dns解释也是耗时间的，而且太多域名，如果要走 https的话，还有要多买证书和部署的问题，^_^。

61、请说出三种减少页面加载时间的方法。（加载时间指感知的时间或者实际加载时间）
  1.优化图片

  2.图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方）

  3.优化CSS（压缩合并css，如margin-top,margin-left…)

  4.网址后加斜杠（如www.campr.com/目录，会判断这个”目录是什么文件类型，或者是目录。）

  5.标明高度和宽度（如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影响浏览体验。

  当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了。）

  6.减少http请求（合并文件，合并图片）。

62、如果你参与到一个项目中，发现他们使用Tab来缩进代码，但是你喜欢空格，你会怎么做？
  1.建议这个项目使用像EditorConfig (http://editorconfig.org/) 之类的规范

  2.为了保持一致性，接受项目原有的风格

  3.直接使用 VIM 的 retab 命令

63、请写一个简单的幻灯效果页面
  如果不使用JS来完成，可以加分。（如：纯CSS实现的幻灯片效果）
	可以采用CSS3的单选按钮radio来实现图片的切换

64、你都使用哪些工具来测试代码的性能？
  Profiler, JSPerf（http://jsperf.com/nexttick-vs-setzerotimeout-vs-settimeout）, Dromaeo

65、如果今年你打算熟练掌握一项新技术，那会是什么？
  nodejs，html5，css3，less

66、请谈一下你对网页标准和标准制定机构重要性的理解？
  (google)w3c存在的意义就是让浏览器兼容性问题尽量小，首先是他们对浏览器开发者的约束，然后是对开发者的约束。

67、什么是 FOUC（无样式内容闪烁）？你如何来避免 FOUC？
  FOUC – Flash Of Unstyled Content 文档样式闪烁
    <style type=”text/css” media=”all”>@import “../fouc.css”;</style>
  而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。

  解决方法简单的出奇，只要在<head>之间加入一个<link>或者<script></script>元素就可以了。

68、doctype（文档类型）的作用是什么？你知道多少种文档类型？
 	此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范。
 	该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。
		HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。
		XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。
		Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks
	(包容)模式(也就是松散呈现模式或者兼容模式)用于呈现为传统浏览器而设计的网页。

69、浏览器标准模式和怪异模式之间的区别是什么？
  W3C标准推出以后，浏览器都开始采纳新标准，但存在一个问题就是如何保证旧的网页还能继续浏览，在标准出来以前，很多页面都是根据旧的渲染方法编写的，如果用的标准来渲染，将导致页面显示异常。为保持浏览器渲染的兼容性，使以前的页面能够正常浏览，浏览器都保留了旧的渲染方法（如：微软的IE）。这样浏览器渲染上就产生了Quircks mode和Standars mode，两种渲染方法共存在一个浏览器上。

 	IE盒子模型和标准W3C盒子模型：ie的width包括：padding\border。 标准的width不包括：padding\border

  在js中如何判断当前浏览器正在以何种方式解析？
    document对象有个属性compatMode ,它有两个值：
    BackCompat 对应quirks mode
    CSS1Compat 对应strict mode

70、使用 XHTML 的局限有哪些？
  xhtml要求严格，必须有head、body每个dom必须要闭合。
  如果页面使用’application/xhtml+xml’会有什么问题吗？
  一些老的浏览器并不兼容。
  如果网页内容需要支持多语言，你会怎么做？
  编码UTF-8，空间域名需要支持多浏览地址。
  在设计和开发多语言网站时，有哪些问题你必须要考虑？
   1、应用字符集的选择 2、语言书写习惯&导航结构 3、数据库驱动型网站

71、data-属性的作用是什么？
  data-为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过getAttribute方法获取
  <div data-author=”david” data-time=”2011-06-20″ data-comment-num=”10″>…</div>
  div.dataset.commentNum; // 10
  需要注意的是，data-之后的以连字符分割的多个单词组成的属性，获取的时候使用驼峰风格。
  并不是所有的浏览器都支持.dataset属性，测试的浏览器中只有Chrome和Opera支持。

72、如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些？
  <nav>, <header>,<section>, <footer>

73、请描述一下 cookies，sessionStorage 和 localStorage 的区别？
  sessionStorage 和 localStorage 是HTML5 Web Storage API 提供的，可以方便的在web请求之间保存数据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。
  sessionStorage、localStorage、cookie都是在浏览器端存储的数据，其中sessionStorage的概念很特别，引入了一个”浏览器窗口”的概念。sessionStorage是在同源的同窗口（或tab）中，始终存在的数据。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁。同时”独立”打开的不同窗口，即使是同一页面，sessionStorage对象也是不同的
  cookies会发送到服务器端。其余两个不会。
 	Microsoft指出InternetExplorer8增加cookie限制为每个域名50个，但IE7似乎也允许每个域名50个cookie。
　Firefox每个域名cookie限制为50个。
　Opera每个域名cookie限制为30个。
  Firefox和Safari允许cookie多达4097个字节，包括名（name）、值（value）和等号。
  Opera允许cookie多达4096个字节，包括：名（name）、值（value）和等号。
  InternetExplorer允许cookie多达4095个字节，包括：名（name）、值（value）和等号。

74、描述下 “reset” CSS 文件的作用和使用它的好处。
  因为浏览器的品种很多，每个浏览器的默认样式也是不同的，所以定义一个css reset可以使各浏览器的默认样式统一。

75、解释下浮动和它的工作原理？
  浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留

76、列举不同的清除浮动的技巧，并指出它们各自适用的使用场景？
  1.使用空标签清除浮动。
    这种方法是在所有浮动标签后面添加一个空标签 定义css clear:both. 弊端就是增加了无意义标签。

  2.使用overflow。
    给包含浮动元素的父标签添加css属性 overflow:auto; zoom:1; zoom:1用于兼容IE6。

  3.使用after伪对象清除浮动。
    该方法只适用于非IE浏览器。具体写法可参照以下示例。使用中需注意以下几点。一、该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；二、content属性是必须的，但其值可以为空，蓝色理想讨论该方法的时候content属性的值设为”.”，但我发现为空亦是可以的。
    *{margin:0;padding:0;}
     body{font:36px bold; color:#F00; text-align:center;}
     #layout{background:#FF9;}
     #layout:after{display:block;clear:both;content:””;visibility:hidden;height:0;}
     #left{float:left;width:20%;height:200px;background:#DDD;line-height:200px;}
     #right{float:right;width:30%;height:80px;background:#DDD;line-height:80px;}

    <div id=”layout”>
     <div id=”left”>Left</div>
     <div id=”right”>Right</div>
    </div>

77、解释下 CSS sprites，以及你要如何在页面或网站中使用它？
  CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的”background-image”，”background- repeat”，”background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。

78、你最喜欢的图片替换方法是什么，你如何选择使用？
  <h2> <span 图片丢这里></span>Hello World </h2> 把span背景设成文字内容，这样又可以保证seo，也有图片的效果在上面。
  一般都是：alt，title，onerror

79、讨论CSS hacks，条件引用或者其他？
  background-color:blue; 各个浏览器都认识，这里给firefox用;
	background-color:red\9; \9所有的ie浏览器可识别;
	background-color:yellow\0; \0是留给ie8的
	+background-color:pink; + ie7定了;
	_background-color:orange; _专门留给神奇的ie6;
	:root #test { background-color:purple\9; }; :root是给ie9的,
  @media all and (min-width:0px){ #test {background-color:black\0;} } 这个是老是跟ie抢着认\0的神奇的opera，必须加个\0,不然firefox，chrome，safari也都认识...
  @media screen and (-webkit-min-device-pixel-ratio:0){ #test {background-color:gray;} } 最后这个是浏览器chrome和safari的.

80、如何为有功能限制的浏览器提供网页？你会使用哪些技术和处理方法？
    百度 谷歌 SO SOGOU Bing

81、如何视觉隐藏网页内容，只让它们在屏幕阅读器中可用？
  1.display:none;的缺陷
  搜索引擎可能认为被隐藏的文字属于垃圾信息而被忽略
  屏幕阅读器（是为视觉上有障碍的人设计的读取屏幕内容的程序）会忽略被隐藏的文字。

  2. visibility: hidden ;的缺陷
  这个大家应该比较熟悉就是隐藏的内容会占据他所应该占据物理空间

  3.overflow:hidden;一个比较合理的方法
  .texthidden { display:block;/*统一转化为块级元素*/ overflow: hidden; width: 0; height: 0; }
  就像上面的一段CSS所展示的方法，将宽度和高度设定为0，然后超过部分隐藏，就会弥补上述一、二方法中的缺陷，也达到了隐藏内容的目的。

82、你用过栅格系统吗？如果使用过，你最喜欢哪种？
  比如：Bootstrap，流式栅格系统

83、你用过媒体查询，或针对移动端的布局/CSS 吗？
  @media screen and (min-width: 400px) and (max-width: 700px) { … }
  @media handheld and (min-width: 20em), screen and (min-width: 20em) {….}
  媒体查询，就是响应式布局。

84、你熟悉 SVG 样式的书写吗？
  <svg xmlns=”http://www.w3.org/2000/svg” xmlns:xlink=”http://www.w3.org/1999/xlink”>
	  <circle cx=”40″ cy=”40″ r=”24″ style=”stroke:#006600; fill:#00cc00″/>
	  <text x=”250″ y=”150″ font-family=”Verdana” font-size=”10px” fill=”blue”>Hello, out there</text>
	  <defs><style type=”text/css”> <![CDATA[.sample{stroke:blue;fill:#0080FF;opacity:1;}]]></style></defs>
	  <use xlink:href=”#sample1″ class=”sample”/>
  </svg>

85、如何优化网页的打印样式？
  <link rel=”stylesheet” type=”text/css” media=”screen” href=”xxx.css” />
  其中media指定的属性就是设备，显示器上就是screen，打印机则是print，电视是tv，投影仪是projection。
  <link rel=”stylesheet” type=”text/css” media=”print” href=”yyy.css” />
  但打印样式表也应有些注意事项：
    1、打印样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景。如要显示图片，请使用html插入到页面中。

    2、最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用pt和cm。

    3、隐藏掉不必要的内容。（@print div{display:none;}）

    4、打印样式表中最好少用浮动属性，因为它们会消失。

    如果想要知道打印样式表的效果如何，直接在浏览器上选择打印预览就可以了。

86、在书写高效 CSS 时会有哪些问题需要考虑？
  1.样式是：从右向左的解析一个选择器

  2.ID最快，Universal最慢 有四种类型的key selector，解析速度由快到慢依次是：ID、class、tag和universal

  3.不要tag-qualify （永远不要这样做 ul#main-navigation { } ID已经是唯一的，不需要Tag来标识，这样做会让选择器变慢。）

  4.后代选择器最糟糕（换句话说，下面这个选择器是很低效的： html body ul li a { }）

  5.想清楚你为什么这样写

  6.CSS3的效率问题（CSS3选择器（比如 :nth-child）能够漂亮的定位我们想要的元素，又能保证我们的CSS整洁易读。但是这些神奇的选择器会浪费很多的浏览器资源。）

  7.我们知道#ID速度是最快的，那么我们都用ID，是不是很快。但是我们不应该为了效率而牺牲可读性和可维护性

87、使用 CSS 预处理器的优缺点有哪些？
  (SASS，Compass，Stylus，LESS)
  描述下你曾经使用过的 CSS 预处理的优缺点

88、如果设计中使用了非标准的字体，你该如何去实现？
  Webfonts (字体服务例如：Google Webfonts，Typekit 等等。)

89、解释下浏览器是如何判断元素是否匹配某个CSS选择器？
	浏览器先产生一个元素集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到真个选择器都匹配完，还在集合中的元素就匹配这个选择器了。
	举个例子，有选择器：
	body.ready #wrapper > .lol233
	先把所有class中有lol233的元素拿出来组成一个集合，然后上一层，对每一个集合中的元素，如果元素的parent id不为#wrapper则把元素从集合中删去。 再向上，从这个元素的父元素开始向上找，没有找到一个tagName为body且class 中有ready的元素，就把原来的元素从集合中删去。
	至此这个选择器匹配结束，所有还在集合中的元素满足。
	大体就是这样，不过浏览器还会有一些奇怪的优化。

	为什么从后往前匹配,因为效率和文档流的解析方向。效率不必说，找元素的父亲和之前的兄弟比遍历所有儿子快而且方便。关于文档流的解析方向，是因为现在的CSS，一个元素只要确定了这个元素在文档流之前出现过的所有元素，就能确定他的匹配情况。应用在即使html没有载入完成，浏览器也能根据已经载入的这一部分信息完全确定出现过的元素的属性。

	为什么是用集合主要也还是效率。基于CSS Rule数量远远小于元素数量的假设和索引的运用，遍历每一条CSS Rule通过集合筛选，比遍历每一个元素再遍历每一条 Rule 匹配要快得多。

90、解释一下你对盒模型的理解，以及如何在CSS中告诉浏览器使用不同的盒模型来渲染你的布局。
	所有HTML元素可以看作盒子,在CSS中,“box model”这一术语是用来设计和布局时使用。
	CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。
	盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。
	下面的图片说明了盒子模型(Box Model)：

	不同部分的说明：
	Margin(外边距) – 清除边框外的区域，外边距是透明的。
	Border(边框) – 围绕在内边距和内容外的边框。
	Padding(内边距) – 清除内容周围的区域，内边距是透明的。
	Content(内容) – 盒子的内容，显示文本和图像。

91、解释下事件代理？
  JavaScript事件代理则是一种简单的技巧，通过它你可以把事件处理器添加到一个父级元素上，这样就避免了把事件处理器添加到多个子级元素上。
  当我们需要对很多元素添加事件的时候，可以通过将事件添加到它们的父节点而将事件委托给父节点来触发处理函数。这主要得益于浏览器的事件冒泡机制。
  事件代理用到了两个在JavaSciprt事件中常被忽略的特性：事件冒泡以及目标元素。
    function getEventTarget(e) {
      e = e || window.event;
      return e.target || e.srcElement;
    }

92、解释下 JavaScript 中 this 是如何工作的？
  this 永远指向函数运行时所在的对象，而不是函数被创建时所在的对象。匿名函数或不处于任何对象中的函数指向window
  1.如果是call，apply,with，指定的this是谁，就是谁

  2.普通的函数调用，函数被谁调用，this就是谁

93、解释下原型继承的原理？
  function getProperty(obj, prop) {
    if (obj.hasOwnProperty(prop)) {
      return obj[prop];
    }else if (obj.__proto__ !== null) {
      return getProperty(obj.__proto__, prop);
    }else{
      return undefined;
    }
  }

94、生成时间戳的两种方法？
	JavaScript 获取当前时间戳：
	第一种方法：
	var timestamp = Date.parse(new Date());
	结果：1280977330000
	第二种方法：
	var timestamp = (new Date()).valueOf();
	结果：1280977330748
	第三种方法：
	var timestamp=new Date().getTime()；
	结果：1280977330748
	第一种：获取的时间戳是把毫秒改成000显示，
	第二种和第三种是获取了当前毫秒的时间戳。

95、用原型链的方式给Array对象添加一个数组去重的方法？
	Array.prototype.delRepeat=function() {
		//tempRepeat保存重复数组项
		var tempRepeat = [];
		var obj = {}; //保存数组中每项，及其出现的次数
		//遍历数组
		for (var i = 0; i < this.length; i++) {
		//判断对象的属性是否存在
			if (obj[this[i]]) {
			//判断该属性值是否为1
				if(obj[this[i]] === 1) {
					tempRepeat.push(this[i]);
					obj[this[i]]++;
					//删除重复元素，但该数组仍保留该项，值为undefined
					delete(this[i]);
				}
			}
			else {
				obj[this[i]] = 1;
			}
		//过滤数组中值为undefined的值
		this.filter(function(){ return true;});
		//返回重复的元素
		return tempRepeat;
	}
	var a=[1,3,”eirkgm”,4,6,”eirkgm”,3,3,”eirkgm”,3,3,3,”eirkgm”,4];
	alert(a.delRepeat());

96、定义一个方法，对所有传入的数字参数的第三位小数进行四舍五入，使得返回值保留两位小数，不够的补0
	思路：判断所传入数字参数是整型还是小数，如果是整型，直接添加小数点和2个0，如果是小数则判断小数部分分别是1位，2位，3位及以上的情况，分别进行处理，1位添加1个0，2位不变，3位进行四舍五入处理

97、定义一个方法，实现阶乘
	function factorial(num) {
		if(num <= 1) {
		return 1;
		} else {
		return num * arguments.callee(num – 1);
		}
	}

98、定义一段代码，页面载入完成1分钟后非缓存模式刷新当前页面
	window.onload=function()
	{
	setTimeout(function(){
	location.reload();//要执行刷新的代码
	},60000);
	}

99、document.getElementById(“HEAD”).onclick=function(oEvent){
	  var A = oEvent.type.B = oEvent.target
  }
  A和B的值是什么？

100、阻止事件默认行为和事件冒泡的方法是什么
  默认行为：event.preventDefault();

  冒泡：event.stopPropregation();
			 event.cancelBubble();

101、把Object的实例化对象A、B、C合并 赋值给对象C
	Object.assign();
102、设置一个已知ID的DIV的html内容为xxx，字体颜色设置为黑色（不使用第三方框架）
	document.getElementById('DIV').innerHTML = 'xxx';
	document.getElementById('DIV').style.color = '#000';
103、当一个DOM节点被点击的时候，我们希望能够执行一个函数，应该怎么做？
	直接在DOM里绑定事件：
	在JS里通过onclick绑定：xxx.onclick = test
	通过事件添加进行绑定：addEventListener(xxx, ‘click’, test)

104、什么是Ajax和JSON，他们的优缺点？
	Ajax是一种异步提交数据的方法。
		通常在html中，要想重新获取页面的数据。更新某一个地方的数据时。就必须得刷新整个页面，才能重新刷新数据。那么问题来了，当我们仅仅只需要更新某一个小地方的数据时。我们也来刷新整个页面的话，就显得有点麻烦了，于是Ajax就帮我们完成了这个功能，让我们单独开辟一条道路来进行获取数据，然后页面不需要刷新，用JS把AJAX请求的数据显示到该显示的地方。AJAX叫 无刷新获取技术

	json 是一种数据的载体，可以把他想象成数组一样的东西，只不过，它有点牛，就是很多格式都可以自动支持。就差不多这样了。

105、看下列代码，输出什么？
    1.var undefined;
    2.undefined == null; //true
    3.3==true; // false
    4.2==true; //false
    5.0==false; //true
    6.0==''; //true
    7.NaN == NaN; //false
    8.[]==false; //true
    9.[] == ![]; //true

106、输出今天的日期，以YYYY-MM-DD的方式，比如今天是2016年4月12日，则输出2016-04-12
	var d = new Date();
	// 获取年，getFullYear()返回4位的数字 //今年：2016
	var year = d.getFullYear();
	// 获取月，月份比较特殊，0是1月，11是12月
	var month = d.getMonth() + 1;
	// 变成两位
	month = month < 10 ? ‘0’ + month : month;
	// 获取日
	var day = d.getDate();
	day = day < 10 ? ‘0’ + day : day;
	alert(year + ‘-‘ + month + ‘-‘ + day);

107、将字符串"<tr><td>{$id}</td><td>${name}</td></tr>"中的${id}替换成10，{$name}替换成Tony(使用正则表达式)
	答案："<tr><td>{$id}</td><td>{$name}</td></tr>".replace(/{\$id}/g, '10').replace(/{\$name}/g, 'Tony');

108、为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，请写出1个函数escapeHtml，将'< , > & "'进行转义
	String.prototype.escapeHTML = function() {
		return this.replace(/&/g, '&amp;').replace(/>/g ,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
	};

109、foo = foo || bar ,这行代码是什么意思？为什么要这样写？
	foo和bar应该都是bool型变量，||是表示 或 的意思，只要foo或者bar有一个为真，那么这个表达式的值就为真，并把它赋给foo

110、看下列代码，将会输出什么?
  var foo = 1;
  (function(){
      console.log(foo);
      var foo = 2;
      console.log(foo);
  }());
	结果：undifined，2
	var foo=1; 它的作用域是window；但是函数体内有同名局部变量，在执行函数时，第一句会寻找体内变量。
	如果想调用该定义，需明确指定作用域，不指定则默认函数体本身。
	console.log(window.foo); //1

111、用js实现随机选取10~100之间的10个数字，存入一个数组，并且排序
	function sortNumber(a,b){
    return a-b;//升序
    //return b-a;//降序
	}
	//js实现随机选取10–100之间的10个数字，存入一个数组，并排序
	var iArray =[];
	function getRandom(iStart,iEnd){
    var iChoice = iStart-iEnd+1;
    return Math.abs(Math.floor(Math.random()*iChoice))+iStart;
	}

	for(var i=0;i<10;i++){
	  iArray.push(getRandom(10,100))
	}
	iArray.sort(sortNumber);
	alert(iArray);

112、写一个function 清除字符串前后的空格（兼容所有浏览器）
	第一种：循环替换
	//供使用者调用
	function trim(s){
		return trimRight(trimLeft(s));
	}
	//去掉左边的空白
	function trimLeft(s){
		if(s == null) {
		return “”;
		}
		var whitespace = new String(” \t\n\r”);
		var str = new String(s);
		if (whitespace.indexOf(str.charAt(0)) != -1) {
			var j=0, i = str.length;
			while (j < i && whitespace.indexOf(str.charAt(j)) != -1){
				j++;
			}
		str = str.substring(j, i);
		}
		return str;
		}
	//去掉右边的空白 www.2cto.com
	function trimRight(s){
		if(s == null) return “”;
		var whitespace = new String(” \t\n\r”);
		var str = new String(s);
		if (whitespace.indexOf(str.charAt(str.length-1)) != -1){
			var i = str.length – 1;
			while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){
				i–;
			}
		str = str.substring(0, i+1);
		}
		return str;
	}

	第二种：正则替换
	<SCRIPT LANGUAGE=”JavaScript”>
		String.prototype.Trim = function()
		{
			return this.replace(/(^\s*)|(\s*$)/g, "");
		}
		String.prototype.LTrim = function()
		{
			return this.replace(/(^\s*)/g, “”);
		}
		String.prototype.RTrim = function()
		{
			return this.replace(/(\s*$)/g, “”);
		}
	</SCRIPT>

	//去左空格;
	function ltrim(s){
		return s.replace(/(^\s*)/g, “”);
	}
	//去右空格;
	function rtrim(s){
		return s.replace(/(\s*$)/g, “”);
	}
	//去左右空格;
	function trim(s){
		return s.replace(/(^\s*)|(\s*$)/g, “”);
	}

	第三种：使用jquery
	$().trim();
	jquery的内部实现为：
	function trim(str){
		return str.replace(/^(\s|\u00A0)+/,”).replace(/(\s|\u00A0)+$/,”);
	}

	第四种：使用motools
	function trim(str){
		return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, ”);
	}

	第五种：剪裁字符串方式
	function trim(str){
		str = str.replace(/^(\s|\u00A0)+/,”);
		for(var i=str.length-1; i>=0; i–){
			if(/\S/.test(str.charAt(i))){
				str = str.substring(0, i+1);
				break;
			}
		}
		return str;
	}

// 去掉字符串前后的空格

// 返回值：

// 去除空格后的字符串

//———————————————————-

	function trim(param) {
		if ((vRet = param) == ”) { return vRet; }
		while (true) {
			if (vRet.indexOf (‘ ‘) == 0) {
				vRet = vRet.substring(1, parseInt(vRet.length));
			} else if ((parseInt(vRet.length) != 0) && (vRet.lastIndexOf (‘ ‘) == parseInt(vRet.length) – 1)) {
				vRet = vRet.substring(0, parseInt(vRet.length) – 1);
			} else {
				return vRet;
			}
		}
	}

#Javascript的typeof返回值有哪些
		两大数据类型：
			基础类型： Number String Boolean Null Undefined Symbol
			引用类型：	Object
		7种返回值： 'number' 'string' 'boolean' 'object' 'function' 'undefined' 'symbol'
		exmples:
			typeof null	//object
			typeof undefined	//undefined
			typeof NaN	//number
			NaN == undefined	//false
			NaN == NaN	//false
			var str = "123abc";
			typeof str++	//number
			str 	//NaN

#3种强制类型转换和2种隐式类型转换
	强制类型转换： Number String Boolean parseInt parseFloat
	隐式类型转换: + - == !

#javascript时间流模型
	3个阶段： 捕获 目标 冒泡

#BOM对象有哪些
	window	js最顶层对象
	location	浏览器当前URL信息
	navigator	浏览器本身信息
	screen	客户端屏幕信息
	history 浏览器访问历史信息

#AJAX基本步骤(五步)
	1创建Ajax对象
	2设置访问地址和方法，准备数据
	3发送请求
	4根据状态进行判断
	5接收响应数据

#HTTP状态码
	200：请求已成功，请求所希望的响应头或数据体将随此响应返回。
	302：请求的资源临时从不同的URI响应请求。由于这样的重定向是临时的，客户端应当继续向原有地址发送以后的请求.只有在Cache-Control或Expires中进行了指定的情况下,这个响应才是可缓存的。
	304：如果客户端发送了一个带条件的GET请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。
	403：服务器已经理解请求，但是拒绝执行它。
	404：请求失败，请求所希望得到的资源未被在服务器上发现。
	500：服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在服务器端的源代码出现错误时出现。

#同步异步区别

#GET和POST区别
	GET：一般用于查询数据，使用URL传递参数，由于浏览器对地址栏长度有限制，所以对使用get方式所发送信息的数量有限制，同时浏览器会记录（历史记录，缓存）中会保留请求地址的信息，包括地址后面的数据。get只能发送普通格式（URL 编码格式）的数据。

	POST：一般用于向服务器发送数据，对所发送的数据的大小理论上是没有限制，浏览器会缓存记录地址，但是不会记录post提交的数据。post可以发送纯文本、URL编码格式、二进制格式的字符串，形式多样。数据限制取决于服务器的设定

	在以下情况中，请使用 POST 请求：
		以提交为目的的请求(类似语义化，get表示请求，post表示提交);
		发送私密类数据（用户名、密码）（因为浏览器缓存记录特性）；
		向服务器发送大量数据（数据大小限制区别）；
		上传文件图片时（数据类型区别）；

#AJAX的局限性
	AJAX 不支持浏览器 back 按钮。
	安全问题 AJAX 暴露了与服务器交互的细节。
	对搜索引擎的支持比较弱。不会执行你的 JS 脚本，只会操作你的网页源代码；
	跨域请求有一定限制。解决方式：jsonp；

#new操作符具体做了什么
	创建一个新对象；
	把函数中上下文（作用域）对象this指向该对象；
	执行代码，通过this给新对象添加属性或方法；
	返回对象

#null和undefined的区别
	null： null表示空值，转为数值时为0；

	undefined：undefined表示"缺少值"，就是此处应该有一个值，但是还没有定义
		变量被声明了，但没有赋值时，就等于undefined。
		对象没有赋值的属性，该属性的值为undefined。
		函数没有返回值时，默认返回undefined

#javascript原型，原型链，特点
	JavaScript 原型： 每创建一个函数，函数上都有一个属性为 prototype，它的值是一个对象。 这个对象的作用在于当使用函数创建实例的时候，那么这些实例都会共享原型上的属性和方法。

	原型链： 在 JavaScript 中，每个对象都有一个指向它的原型（prototype）对象的内部链接（proto）。这个原型对象又有自己的原型，直到某个对象的原型为 null 为止（也就是不再有原型指向）。这种一级一级的链结构就称为原型链（prototype chain）。 当查找一个对象的属性时，JavaScript 会向上遍历原型链，直到找到给定名称的属性为止;到查找到达原型链的顶部（Object.prototype），仍然没有找到指定的属性，就会返回 undefined。

基础知识：
	原型 原型链
	作用域 闭包
	异步 单线程

js api:
	dom操作
	ajax
	事件绑定

开发环境
	版本管理
	模块化
	打包工具

运行环境
	页面渲染
	性能优化

关于面试
	基层工程师： 基础知识
	高级工程师： 项目经验
	架构师： 解决方案
typeof 类型

=== 和 == 的区别 隐式类型转换
js内置函数(包装类)有Object Array Boolean Number String Function Date RegExp Error
js变量按存储方式区分哪些类型，并描述期特点
如何理解json
	json只不过是一个js对象而已
window.onload（页面资源全部加载完成） 和domcontentloaded（dom渲染完成） 的区别 浏览器渲染过程
简述如何实现一个模块加载器，实现类似require.js的基本功能 js模块化
数组的乱序 js算法

考点 不变应万变 	题目->知识->题目

判断一个变量会被当做true还是false: 使用两个非运算符
	var a = 100;
	!!a

如何准确判断一个变量是数组类型
写一个原型链继承的例子（圣杯模式）
描述new一个对象的过程
zepto（或其他框架）源码中如何使用原型链
原型规则
使用instanceof判断一个函数是否是一个变量的构造函数

同步和异步的区别，分别举一个例子：同步会阻塞代码执行，异步不会，如alert是同步,setTimeout异步
setTimeout()的理解
前端使用异步的场景有定时任务、网络请求、事件绑定

获取某种格式的日期
获取随机数，要求长度一致的字符串
写一个能遍历对象和数组的forEach函数

什么是跨域
三个跨域标签： img src=打点统计，兼容性号/link herf=/script src= 使用cdn
jsonp
后端header

请描述一下cookie, sessionStorage, localStorage的区别
cookie
	用于客户端和服务端通讯，因为有本地存储功能，所以被借用
	document.cookie获取和设置
	sessionStorage
	localStorage

上线流程要点
	将测试完成的代码提交到git版本库的master分支
	将当前服务器的代码全部打包并记录版本号，备份
	将master分支的代码提交覆盖到线上服务器，生成新版本号
回滚流程要点
	将当前服务器的代码打包并记录版本号，备份
	将备份的上一个版本号解压，覆盖到线上服务器，并生成新的版本号

页面加载
	从输入url到得到html的过程
		加载资源的形式
			输入url得到html页面
			加载页面中的静态资源
		加载一个资源的过程
			根据dns服务器得到IP地址
			向IP发送请求
			服务器接收处理并返回
			浏览器得到内容
		浏览器渲染页面的过程
			根据html结构生成dom tree
			根据css生成cssom
			将dom和cssom整合成render tree
			根据render tree开始渲染和展示
			遇到script时会执行并阻塞渲染
性能优化
	原则
		多使用内存、缓存或其他方法
		减少cpu计算、减少网络请求
	着手点
		加载资源优化
			静态资源的压缩合并
			静态资源缓存
			使用cdn让资源加载更快
			使用ssr后端渲染，数据直接输入到html中
		渲染优化
			css放前面，js放后面
			懒加载（图片懒加载、下拉加载更多）
			减少dom查询、对dom查询做缓存
			减少dom操作，多个操作尽量和并在一起执行
			事件节流
			今早执行操作
安全性
	xss跨站脚本攻击
		前端关键字替换，设置白名单
	xsrf跨站请求伪造
		增加验证流程

技巧
	简历简洁明了，重点突出项目经历和解决方案
	把个人播客放简历中，并定期维护更新播客
	把个人的开源项目放简历中，并维护开源项目
	简历不能造假，保持能力和经历上的真实性、一致性

	如何看待加班？加班就像借钱，救急不救穷
	千万不可挑战面试官，不要反考面试官
	学会给面试官惊喜，但不要太多
	遇到不会答的，说出来就可以
	谈谈你的缺点，说说最近在学的东西

三个阶段： 技术面试-负责人面试-hr面试

面试流程：
	一面： 基础知识
	二面/三面： 技术能力
	三面/四面： 业务能力
	终面： 沟通能力、发展潜力
面试准备：
	职位描述分析
		考察知识点的了解和掌握
	业务分析或实战模拟
		去面试的公司的相关网站查看应用了哪些技术
	技术栈准备
		技术框架或者类库(jquery(核心架构|事件委托|插件机制|兼容性)/vue/react/bootstrap...)，辅助开发工具(如webpack, less, npm,脚手架)
	自我介绍
		简历
			基本信息： 姓名-年龄-手机-邮箱-籍贯
			学历： 由大到小（最高学历首位）
			开源项目： github和说明
		自我陈述
			把握面试的沟通方向
				当你进行自我陈述时，面试官已经在根据你口述的信息形成要问你的问题，所以在陈述时尽量往自己擅长的方面说
			豁达、自信的适度发挥
				有气场，有底气，显示个人有一定的技术能力
			实例
				自如谈兴趣，巧妙示实例，适时讨疑问
				节奏要适宜，切忌小聪明
			实战
				方向要对，过程要细
				胆子要大，心态要和

一面
	技巧
		准备要充分
		知识要系统
		沟通要简洁
		内心要诚实
		态度要谦虚
		回答要灵活
	类别
	页面布局
		题目：假设高度已知，请写出三栏布局，其中左右栏宽度各位300px，中间自适应（5种方案）
			扩展一：这5种方案的优缺点，兼容性，最优选择是哪个
			扩展二： 去掉高度已知这个条件，还有几个方案满足上述要求（flex和table布局）
		总结：
			语义化掌握到位
			页面布局理解深刻
			css基础扎实
			思维灵活且积极上进
			代码书写规范
		页面布局的变通
			三栏布局
				左右宽度固定，中间自适应
				上下高度固定，中间自适应
			两栏布局
				左宽度固定，右自适应
				右宽度固定，左自适应
				上高度固定，下自适应
				下高度固定，上自适应

	css盒模型
		题目：谈谈你对css盒模型的认识
		基本概念：标准模型 + IE模型(margin/border/padding/content) 
						 ——>这两者的区别：
						 	计算宽度和高度的不同，标准盒模型宽高只包括content，ie则包括padding和margin
						 ——>css如何设置这两种模型：
						 	标准：box-sizing: content-box; ie：box-sizing: border-box;
						 ——>js如何获取和设置盒模型对应的宽高
						 	dom.style.width/height 只能获取行内样式的宽高
						 	dom.currentStyle.width/height 仅限ie
						 	window.getComputedStyle(dom).width/height 通用性
						 	dom.getBoundingClientRect().width/height 通常用来获取元素在页面中的位置
						 ——>实例题：根据盒模型解释边距重叠问题
						 ——>BFC（边距重叠解决方案）
						 	基本概念: 块级格式化上下文
						 	原理
						 	创建BFC
						 		float不为none
						 		position不为static/relative
						 		overflow: hidden/auto
						 		display:inline-block/table-cell,与table相关的
						 	BFC使用场景

	dom事件
		基本概念：DOM事件的级别：
			DOM0 ele.onclick = function() {}
			DOM2 ele.addEventListener('type', function() {}, false)
			DOM3 ele.addEventListener('keyup', function() {}, false) 增加事件类型

		DOM事件模型
			捕获和冒泡

		DOM事件流
			捕获——>目标阶段——>冒泡

		描述DOM事件捕获的具体流程
			window->document->html->body->...->target
			获取html标签: document.documentElement

		Event对象的常见应用
			event.preventDefault() 阻止默认事件
			event.stopPropagation() 阻止冒泡事件
			event.stopImmediatePropagation() 用于设置当同一元素绑定多个相同事件类型时，可以在该事件中设置该行为阻止该元素的其他相同事件被触发，也是就处理事件触发的优先级
			event.currentTarget 当前绑定事件的目标元素，也就是事件代理绑定事件的元素
			event.target 目标元素

		自定义事件
			自定义事件名称
			var event = new Event('custome')
			注册自定义事件
			ele.addEventListener('custome', function() {
				console.log('custome')	
			})
			触发自定义事件
			ele.dispatchEvent(event)

			类似的还有CustomEvent,区别在于可以传递参数，但参数要为对象类型
				自定义事件名称
				var event = new CustomEvent('custome', {detail: 要传递的参数})
				注册自定义事件
				ele.addEventListener('custome', function() {
					console.log('custome')	
				})
				触发自定义事件
				ele.dispatchEvent(event)

	http协议
		http协议的主要特点
			简单快速
			灵活
			无连接
			无状态

			请求报文
				请求行（请求方法，请求地址，http协议和版本） 请求头（发送的数据：key:value键值对） 空行（分隔请求头和请求体） 请求体（）
			响应报文
				状态行（http协议和版本，状态码） 响应头（key:value键值对） 空行 响应体

		http方法
			GET 获取资源
			POST 传输资源
			PUT 更新资源
			DELETE 删除资源
			HEAD 获取报文首部
		post和get的区别
			1.GET在浏览器回退时是无害的，而POST会再次提交请求
			3.GET请求会被浏览器主动缓存，而POST不会，除非手动设置
			5.GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
			6.GET请求在URL中传送的参数是有长度限制的，而POST没有限制
			9.GET参数通过URL传递，POST放在Request body中
			2.GET产生的URL地址可以被收藏，而POST不可以
			4.GET请求只能进行url编码，而POST支持多种编码方式
			7.对参数的数据类型，GET只接受ASCII字符，而POST没有限制
			8.GET比POST更不安全，因为参数直接暴露在URL上，所以不能用用来传递敏感信息

		http状态码
			1xx：提示信息-表示请求已接收，继续处理
			2xx：成功-表示请求已被成功接收
			3xx：重定向-要完成请求必须进行更进一步的操作
			4xx：客户端错误-请求有语法错误或请求无法实现
			5xx：服务器错误-服务器未能实现合法的请求
			具体状态码
				200 OK：客户端请求成功
				206 Partial Content：客户端发送了一个带有Range头的GET请求，服务器完成了它，通常在请求音视频时出现
				301 Moved Permanently： 所请求的页面已经永久转移至新的url
				302 Found：所请求的页面已经临时转移至新的url
				304 Not Modified：客户端有缓存的文档并发出了一个条件性的请求，服务器告诉客户原来缓存的文档还可以继续使用
				400 Bad Request：客户端请求有语法错误，不能被服务器所理解
				401 Unauthorized：请求未经授权，这个状态码必须和WWW-Authenticate报头域一起使用
				403 Forbidden：对被请求页面的访问被禁止
				404 Not Found：请求资源不存在
				500 Internal Server Error：服务器发生不可预期的错误，原来缓存的文档还可以继续使用
				503 Server Unavailable：请求未完成，服务器临时过载或宕机，一段时间后可能恢复正常

		持久连接（http1.1才能建立持久连接）
			HTTP协议采用“请求-应答”模式，当使用普通模式，即非Keep-Alive模式时，每个请求/应答，客户端和服务器都要重新建立一个连接，完成后立即断开连接（HTTP协议为无连接的协议）

			当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服务端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或重新建立连接

		管线化
			在使用持久连接的情况下，某个连接上消息的传递类似于
			请求1->响应1->请求2->响应2->请求3->响应3

			某个连接上的消息变成类似这样（管线化）打包请求打包响应
			请求1->请求2->请求3->响应1->响应2->响应3
			1.管线化机制通过持久连接完成，仅HTTP/1.1支持此技术
			2.只有GET和HEAD请求可以进行管线化，而POST则有所限制
			3.初次创建链接时不应启动管线机制，因为对方（服务器）不一定支持HTTP/1.1版本的协议
			4.管线化不会影响响应到来的顺序，也就是响应返回的顺序并未改变
			5.HTTP/1.1要求服务器端支持管线化，但并不要求服务器端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可
			6.由于上面提到的服务器端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不友好，因此现代浏览器如chrome、Firefox默认并未开启管线化支持

	原型链
		创建对象有几种方法
			对象字面量|new Object() 构造函数 Object.create()

		原型、构造函数、实例、原型链

		instanceof 的原理
			实例对象——>构造函数——>原型
		new运算符

	面向对象
		类与实例
			类的声明
				function F(name) {this.name=name;}
				class F {constructor(name) {this.name=name;}}
			生成实例:都是通过new运算符
				new F('obj')

		类与继承
			如何实现继承

			继承的几种方式

	通信：跨域/前后端通信
		什么是同源策略及限制
			同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键安全机制
				Cookie、localStorage、indexDB无法读取
				DOM无法获得
				Ajax请求不能发送

		前后端如何通信
			Ajax－同源通信
			WebSocket－不受同源策略影响
			CORS－支持同源和不同源通信
		如何创建Ajax（五个步骤）
			XMLHttpRequest对象的工作流程
			兼容性处理
			事件的触发条件
			事件的触发顺序

		跨域通信的几种方式
			JSONP利用script的src属性
			Hash：场景是当前a页面通过iframe或frame嵌入了跨域的b页面，然后在a页面进行如下操作，向b页面发送信息
				let b = document.getElementsByTagName('iframe')[0];
				发送信息
				b.src = b.src + '#' + 'data';
				监听hash的变化
				window.onhashchange = function() {
					let data = window.location.hash
				};

			postMessage(two-way communication) ???
				窗口A（http://a.com）向跨域的窗口B（http://b.com）发送信息
				在窗口A中
					可以在A窗口中打开一个新窗口
						let pop = window.open();
						pop.postMessage('this is wrong target origin', 'https://b.com') //当指定的源没有改变时，此行不生效
						pop.postMessage('this id the target origin', 'http://b.com');
					或者直接使用以下语句
						window.postMessage('data', 'http://b.com');
					window.addEventListener('message', (e) => {
						//验证发送方的源
						if (e.origin !== 'http://b.com') {return;}
					}, false)

				在窗口B中监听message事件，以获取相关信息
				window.addEventListener('message', function(event) {
					//验证发送方的源
					if (event.origin !== 'http://a.com') {return;}
					console.log(event.origin);//http://a.com
					console.log(event.source);//bwindow
					console.log(event.data);//data
					//向发送方传递信息
					event.source.postMessage('data', event.origin);
				}, false)

			WebSocket
				要通信的地址，ws不加密，wss加密
				let url = 'wss://echo.websocket.org'
				let ws = new WebSocket(url);
				开启websocket，发送数据
				ws.onopen = function(evt) {
					console.log('Connection open...');
					ws.send('hello websocket');
				};
				监听返回信息，关闭通信
				ws.onmessage = function(evt) {
					console.log('Received Message:' + evt.data);
					ws.close();
				}
				监听通信是否关闭
				ws.onclose = function(evt) {
					console.log('Connection closed');
				}
			CORS
				let url = 'http://xxx.com';
				let option = {method: 'get'};
				fetch(url, option).then((response) => {
					console.log(response);
				}).catch((err) => {
					console.log(err)	//获取错误信息
				})

	安全：
		xss
			跨站脚本攻击
		csrf
			基本概念和缩写：跨站请求伪造
			攻击原理
			防御措施
				Token验证
				Referer验证
				隐藏令牌

	算法
		排序（必备）：快速排序、选择排序、希尔排序
		堆栈、队列、链表
		递归（必备）
		波兰式和逆波兰式

二面/三面
	面试技巧
		知识面要广
		理解要深刻
		内心要诚实
		态度要谦虚
		回答要灵活
		要学会赞美

	渲染机制
		什么是DOCTYPE及作用
			用来声明文档类型和DTD规范，验证文件的合法性，也是就浏览器能否正确解析该文档
		浏览器渲染过程

		重排Reflow
			DOM结构中的各个元素都有自己的盒子（模型），这些都需要浏览器根据各种样式来计算并根据计算结果把元素放到它该出现的位置，这个过程就是重排
			触发重排的情况
				增删改DOM节点时会导致重排和重绘
				移动DOM的位置，搞某个动画时
				修改某些css样式，如宽高
				缩放（resize）窗口，滚动窗口
				修改网页默认字体
		重绘Repaint
			当各种元素盒子的位置、大小及其他属性，如颜色、字体大小等都确定后，浏览器便把元素按照各自的特性绘制一遍，从而产生页面内容，这个过程叫重绘
			触发重绘的情况
				DOM改动
				Css修改
		布局Layout

	js运行机制
		如何理解单线程
		什么是任务队列
		什么是Event Loop
		异步任务
			setTimeout/setInterval
			DOM事件
			ES6中的Promise

	页面性能
		题目：提升页面性能的方法有哪些
			1.资源压缩合并，减少HTTP请求
			2.非核心代码异步加载——>异步加载的方式（动态脚本加载/defer/async）——>异步加载的区别(defer是在HTML解析完之后才会执行，如果多个，则按加载顺序执行/async是在加载完后立即执行，但不保证执行顺序的先后)
			3.利用浏览器缓存
			——>缓存的分类
				强缓存
					Expires
					Cache-Control
				协商缓存
					Last-Modified If-Modified-Since
					Etag If-None-Match
			——>缓存的原理
			4.使用cdn
			5.预解析dns
				<meta http-equiv='x-dns-prefetch-control' content='on'>
				<link rel='dns-prefetch' href='//host_name_to_prefetch.com'>

	错误监控
		错误的分类
			即时运行错误/代码错误
			资源加载错误

		错误的捕获方式
			1.即时运行错误捕获方式
				try...catch
				window.onerror
			2.资源加载错误捕获方式
				object.onerror
				performance.getEntries()
				Error事件的捕获
			延伸：跨域的js运行错误可以捕获吗，错误提示是什么，怎样处理
				可以，提示为Script error，处理:
					1.客户端在script标签增加crossorigin属性
					2.服务端设置js资源响应头Access-Control-Allow-Origin: *

		上报错误的基本原理
			1.采用Ajax通信的方式上报
			2.利用Image对象上报（主要方式）

三面/四面
	面试技巧
		准备要充分
		描述要演练
		引导找时机
		优势要发挥
		回答要灵活
	业务能力
	团队写作能力
	事务推动能力
	带人能力
	其他能力

终面
	乐观积极
	主动沟通
	逻辑顺畅
	上进有责任心
	有主张，做事果断

	内容分布
		职业竞争力
			业务能力
			思考能力
			学习能力
			无上限的付出
		职业规划

惰性函数: 当一个函数被多次调用，并且每次调用都要做兼容性处理或者相同的动作时，可以将其返回值赋值给一个变量，以减少函数的调用次数
函数柯里化:
级联函数: return this

数据推送技术
	Comet: 基于HTTP长连接的服务器推送技术
		1.利用Ajax封装成一个函数，然后在成功回调函数里自调用该函数
		2.利用SetInterval定时器设定间隔时间进行轮询，缺点是耗费网络
		3.后端设置
	WebSocket: 基于WebSocket的推送方案
	SSE(SERVER-SEND EVENT): 服务器推送数据的新方式(前端利用EventSource)
		function init(arg) {
			let url = 'xxx';
			let source = new EventSource(url);
			source.onopen = function () {
				console.log('链接已建立'， this.readyState);
			}
			source.onmessage = function(e) {
				console.log('从服务器获取的数据', e.data);
			}
			source.onerror = function() {
				//监听错误信息
			}
		}

单例模式
	作用：
		模块间通信
		系统中某个类的对象只能存在一个
		保护自己的属性和方法
	注意：
		this的使用
		闭包容易造成内存泄漏，不需要赶紧干掉
		new的成本
工厂模式
	作用：
		对象的构建十分复杂
		需要依赖具体的环境创建不同实例
		处理大量具有相同属性的小对象
	注意：
		不能滥用工厂