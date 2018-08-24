//varied modes

//单体模式
//静态属性中的实例
function Universe() {
	//判断实例是否存在
	if (typeof Universe.instance === 'Object') {
		return Universe.instance;
	}
	this.startTime = 0;
	this.bang = 'big';
	//缓存实例
	Universe.instance = this;
	//隐式返回
	return this;
}
var un1 = new Universe();
var un2 = new Universe();
un1 === un2;//true;

//闭包中的实例
function Universe() {
	//缓存实例
	var instance = this;
	this.startTime = 0;
	this.bang = 'big';
	//重写构造函数
	function Universe() {
		return instance;
	}
}
var un1 = new Universe();
var nu2 = new Universe();
un1 === un2;//true

//变体1
function Universe() {
	//缓存实例
	var instance;
	//重写构造函数
	Universe = function Universe() {
		return instance;
	}
	//保留原型属性
	Universe.prototype = this;
	//实例
	instance = new Universe();
	//重置构造函数指针
	instance.constructor = Universe;

	this.startTime = 0;
	this.bang = 'big';
	return instance;
}
Universe.prototype.nothing = true;
var un1 = new Universe();	//返回的是instance这个实例对象
/*
{
	constructor: Universe(改造后的构造函数),
	__proto__: {startTime: 0,bang: 'big',__proto__: Universe.prototype(最开始的构造函数的原型)}
}
*/
Universe.prototype.everyting = true;
var un2 = new Universe();	//返回的是instance这个已经生成的实例对象
/*
{
	constructor: Universe(改造后的构造函数),
	__proto__: {everything: treu,startTime: 0,bang: 'big',__proto__: Universe.prototype(最开始的构造函数的原型)}
}
*/
un1 === un2;	//true,两者的构造函数是同一个，其原型也是一样，所以对其原型添加成员
un1.constructor === Universe;//true;
//变体2
var Universe;
(function () {
	var instance;
	Universe = function Universe() {
		if (instance) {
			return instance;
		}
		instance = this;
		this.startTime = 0;
		this.bang = 'big';
	}
}())

//工厂模式
//示例
//父构造函数
function CarMaker() {}
CarMaker.prototype.drive = function () {
	return `Vroom, I have ${this.doors} doors`;
}
//静态工厂方法
CarMaker.factory = function (type) {
	var constr = type,
			newcar;
	//构造函数不存在则抛出错误
	if (typeof CarMaker[constr] !== 'function') {
		throw {
			name: 'Error',
			message: `${constr} doesn't exist`
		}
	}
	//原型继承父类，并只继承一次
	if (typeof CarMaker[constr].prototype.drive !== 'function') {
		CarMaker[constr].prototype = new CarMaker();
	}
	//创建新实例
	newcar = new CarMaker[constr]();
	return newcar;
}
//定义特定的制造商
CarMaker.Compact = function () {
	this.doors = 4;
}
CarMaker.Convertible = function () {
	this.doors = 2;
}
CarMaker.SUV = function () {
	this.doors =24;
}
var corolla = CarMaker.factory('Compact');
corolla.drive();

//迭代器模式
//示例
var egg = (function () {
	var index =0,
			data = [1,2,3,4,5],
			length = data.length;
	return {
		//迭代方法
		next: function () {
			var element;
			if (!this.hasNext()) {
				return null;
			}
			element = data[index];
			index += 2;
			return element;
		},
		//判断迭代是否结束
		hasNext: function () {
			return index < length;
		},
		//重置迭代器
		rewind: function () {
			index = 0;
		},
		//获取当前数据
		current: function () {
			return data[index];
		}
	};
}());
while(egg.hasNext()) {
	console.log(egg.next());	//1,3,5
}

//装饰者模式
//构造函数
function Sale(price) {
	this.price = price || 100;
}
//原型
Sale.prototype.getPrice = function () {
	return this.price;
}
//构造函数属性
Sale.decorators = {};
Sale.decorators.fedtax = {
	getPrice: function () {
		var price = this.uber.getPrice();
		price += price * 5 / 100;
		return price;
	}
};
Sale.decorators.quebec = {
	getPrice: function () {
		var price = this.uber.getPrice();
		price += price * 7.5 / 100;
		return price;
	}
};
Sale.decorators.money = {
	getPrice: function () {
		return '$' + this.uber.getPrice().toFixed(2);
	}
};
Sale.decorators.cdn = {
	getPrice: function () {
		return 'CDN$' + this.uber.getPrice().toFixed(2);
	}
};
Sale.prototype.decorate = function (decorator) {
	var F = function () {},
			overrides = this.constructor.decorators[decorator],	//获取构造函数静态属性的某一成员
			i,
			newobj;
	F.prototype  = this;	//这里是将Sale构造函数的原型赋值给中间F构造函数(代理)，当生成实例调用是则指向实例
	newobj = new F();	//生成中间F构造函数的实例
	newobj.uber = F.prototype;
	for(i in overrides) {
		if (overrides.hasOwnProperty(i)) {
			newobj[i] = overrides[i];	//把Sale构造函数静态属性的某一成员(对象)的成员赋值给新生成的newobj实例对象相同名称成员
		}
	}
	return newobj;	//返回newobj实例对象，该实例对象继承了Sale构造函数的原型,并且具有Sale静态属性的某一成员(对象)的成员
};
var sale = new Sale(100);
sale = sale.decorate('fedtax');
/*
sale = {
	uber: F.prototype,	//此时指向sale实例,
	getPrice: function() {
		var price = this.uber.getPrice();
		price += price * 5 / 100;
		return price;
	},
	__proto__: F.prototype
}
*/
sale = sale.decorate('quebec');
/*
sale = {
	uber: sale,	//上一个返回的sale对象
	getPrice: function() {
		var price = this.uber.getPrice();
		price += price * 7.5 / 100;
		return price;
	},
	__proto__: sale //上一个返回的sale对象
}
*/
sale = sale.decorate('cdn');
/*
sale = {
	uber: sale, //上一个返回的sale对象
	getPrice: function () {
		return 'CDN$' + this.uber.getPrice().toFixed(2);
	},
	__proto__: sale //上一个返回的sale对象
}
*/
sale.getPrice();

//变体1：使用列表实现
function Sale(price) {
	this.price = (price > 0) || 100;
	this.decoratorsList = [];
}
//构造函数属性
Sale.decorators = {};
Sale.decorators.fedtax = {
	getPrice: function (price) {
		return price + price * 5 / 100; 
	}
};
Sale.decorators.quebec = {
	getPrice: function (price) {
		return price + price * 7.5 / 100;
	}
};
Sale.decorators.money = {
	getPrice: function (price) {
		return '$' + price.toFixed(2);
	}
};
Sale.decorators.cdn = {
	getPrice: function (price) {
		return 'CDN$' + price.toFixed(2);
	}
};
Sale.prototype.decorate = function (decorator) {
	this.decoratorsList.push(decorator);
};
Sale.prototype.getPrice = function () {
	var price = this.price,
			i,
			max = this.decoratorsList.length,
			name;
	for(i = 0; i < max; i++) {
		name = this.decoratorsList[i];
		price = Sale.decorators[name].getPrice(price);
	}
	return price;
}
var sale = new Sale(100);
sale.decorate('fedtax');
sale.decorate('quebec');
sale.decorate('money');
sale.getPrice();


//策略模式
//创建策略对象
var validator = {
	//验证策略集合
	types: {
		//验证是否为空，非空返回true
		isNonEmpty: {
			validate: function (value) {
				return  value !== '';
			},
			instructions: 'the value cannot be empty'
		},
		//验证是否是数字，数字返回true
		isNumber: {
			validate: function (value) {
				return !isNaN(value);
			},
			instructions: 'the value can only be a valid number,e.g. 1, 3.14 of 2018'
		},
		//验证是否只包含数字和字母，符合条件返回true
		isAlphaNum: {
			validate: function (value) {
				return !/[^a-z0-9]/i.test(value);
			},
			instructions: 'the value can only contain characters and numbers, no special symbols'
		}
	},

	//纪录错误信息
	messages: {},

	//合并配置方法，方便调用
	config: {
		firstName: 'isNonEmpty',
		age: 'isNumber',
		username: 'isAlphaNum'
	},

	//验证数据方法
	validate: function (data) {
		var i, msg, type, checker, result_ok;
		//重新配置错误信息对象为数组
		this.messages = [];
		//遍历传入的数据对象
		for(i in data) {
			if (data.hasOwnProperty(i)) {
				//获取验证某一类型的方法
				type = this.config[i];
				checker = this.types[type];
				//判断该方法是否存在
				if (!type) {
					continue;	//方法不存在，跳出该循环，继续执行下一个循环，
				}
				//判断该方法是否可用，不可用抛出错误信息
				if (!checker) {
					throw {
						name: 'ValidationError',
						message: 'No handler to validate type' + type
					};
				}
				//验证数据对象中数据的有效性，结果为布尔值
				result_ok = checker.validate(data[i]);
				//如果结果为false,向messages对象添加错误信息
				if (!result_ok) {
					msg = 'Invalid value for *' + i + '*, ' + checker.instructions;
					this.messages.push(msg);
				}

			}
		}
		//如果存在错误信息，则返回true，否则返回false
		return this.hasErrors();
	},

	hasErrors: function () {
		return this.messages.length !== 0;
	}
};

/*validator.config = {
	firstName: 'isNonEmpty',
	age: 'isNumber',
	username: 'isAlphaNum'
};*/

/*validator.types.isNonEmpty = {
	validate: function (value) {
		return  value !== '';
	},
	instructions: 'the value cannot be empty'
};*/

/*validator.types.isNumber = {
	validate: function (value) {
		return !isNaN(value);
	},
	instructions: 'the value can only be a valid number,e.g. 1, 3.14 of 2018'
};*/

/*validator.types.isAlphaNum = {
	validate: function (value) {
		return !/[^a-z0-9/i.test(value);
	}
	instructions: 'the value can only contain characters and numbers, no special symbols'
};*/

var data = {
	firstName: 'Super',
	lastName: 'Man',
	age: 'unknown',
	username: 'o_0'
};

validator.validate(data);	//返回一个布尔值，表示数据是否符合(true: 不符合/false: 符合)
//打印错误信息
if (validator.hasErrors()) {
	console.log(validator.messages.join('\n'));
}

// 外观模式(处理浏览器脚本，便于扩展)
var myevent = {
	//...
	stop: function (e) {
		if (typeof e.preventDefault === 'function') {
			e.preventDefault();
		}
		if (typeof e.stopPropagation === 'function') {
			e.stopPropagation();
		}
		//for IE
		if (typeof e.returnValue === 'boolean') {
			e.returnValue = false;
		}
		if (typeof e.cancelBubble == 'boolean') {
			e.cancelBubble = true;
		}
	}
	//...
}

//代理模式(处理开销大的操作，如网络请求，合并多个网络请求)


//中介者模式(例子)
//创建玩家
function Player(name) {
	this.points = 0;
	this.name = name;
}
//为玩家添加方法
Player.prototype.play = function () {
	this.points += 1;
	mediator.played();
};
//记分板
var scoreboard = {
	//获取页面上记分板dom
	element: document.getElementById('results'),
	//更新记分板输
	update: function (score) {
		var i, msg = '';
		for(i in score) {
			if (score.hasOwnProperty(i)) {
				msg += `<p><strong>${i}</strong>: ${score[i]}</p>`;
			}
		}
		this.element.innerHTML = msg;
	}
};
//创建中介者对象
var mediator = {
	//设置玩家集合
	players: {},
	//初始化玩家
	setup: function () {
		var players = this.players;
		players.home = new Player('Home');
		players.guest = new Player('Guest');
	},
	//获取玩家分数并更新到记分板上
	played: function () {
		var players = this.players,
				score = {
					Home: players.home.points,
					Guest: players.guest.points
				};
		scoreboard.update(score);
	},
	//处理玩家的键盘事件
	keypress: function (e) {
		e = e || window.event;
		if (e.which === 49) {
			mediator.players.home.play();
			return;
		}
		if (e.which === 48) {
			mediator.players.play();
			return;
		}
	}

};
//开始游戏，初始化玩家
mediator.setup();
//监听键盘事件
window.onkeypress = mediator.keypress;
//设置游戏时间
setTimeout(function () {
	window.onkeypress = null;
	alert('Game over!');
}, 30000);

//观察者模式(广泛应用于客户端JavaScript编程中，所有的浏览器事件都是该模式的例子。另一个名字也称为自定义事件，别名叫订阅/发布模式)
//该模式是为了促进形成松散耦合，通常是一个对象(订阅者/观察者)订阅另一个对象(发布者/主题)的特定活动并在(发布者)状态改变后获得通知，发生重要事件时，发布者通知(调用)所有订阅者并经常以事件对象的形式传递消息。
//示例1
//创建发布者
var publisher = {
	//事件类型：订阅者列表
	subscribers: {
		any: []
	},
	//订阅者类型
	subscribe: function (fn, type) {
		type = type || 'any';
		if(typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn);
	},
	//cancel subcribe	unsubscribe: function(fn, type) {
		this.visitSubscribers('unsubscribe', fn, type);
	},

	publish: function (publication, type) {
		this.visitSubscribers('publish', publication, type);
	},

	visitSubscribers: function (action, arg, type) {
		var pubtype = type || 'any',
				subscribers = this.subscribers[pubtype],
				i,
				max = subscribers.length;
		for(i = 0; i < max; i++) {
			if (action === 'publish') {} {
				subscribers[i](arg);
			}else {
				if (subscribers[i] === arg) {
					subscribers.splice(i,1);
				}
			}
		}
	}

};

function makePublisher(o) {
	var i;
	for(i in publisher) {
		if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
			o[i] = publisher[i];
		}
	}
	o.subscribers = {any: []};
}

var paper = {
	daily: function () {
		this.publish('big news today');
	},
	monthly: function () {
		this.publish('interesting analysis', 'monthly');
	}
};

makePublisher(paper);
/*paper = {
		subscribers: {any: []},
		subscribe: function (fn, type) {
			type = type || 'any';
			if(typeof this.subscribers[type] === 'undefined') {
				this.subscribers[type] = [];
			}
			this.subscribers[type].push(fn);
		},
		//
		unsubscribe: function(fn, type) {
			this.visitSubscribers('unsubscribe', fn, type);
		},

		publish: function (publication, type) {
			this.visitSubscribers('publish', publication, type);
		},

		visitSubscribers: function (action, arg, type) {
			var pubtype = type || 'any',
					subscribers = this.subscribers[pubtype],
					i,
					max = subscribers.length;
			for(i = 0; i < max; i++) {
				if (action === 'publish') {} {
					subscribers[i](arg);
				}else {
					if (subscribers[i] === arg) {
						subscribers.splice(i,1);
					}
				}
			}
		},
		daily: function () {
			this.publish('big news today');
		},
		monthly: function () {
			this.publish('interesting analysis', 'monthly');
		}
	 }
*/

var joe = {
	drinkCoffee: function (paper) {
		console.log('Just read ' + paper);
	},
	sundayPreNap: function (monthly) {
		console.log('About to fall asleep reading this ' + monthly);
	}
};

paper.subscribe(joe.drinkCoffee);
/*function (joe.drinkCoffee) {
		type = type || 'any';	//'any'
		if(typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn); //paper.subscribers = {any: [joe.drinkCoffee]}
	}
*/
paper.subscribe(joe.sundayPreNap,'monthly');
/*function (joe.drinkCoffee,'monthly') {
		type = type || 'any'; //'monthly'
		if(typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push(fn); //paper.subscribers = {any: [joe.drinkCoffee],monthly: [joe.sundayPreNap]}
	}
*/

paper.daily();	//'Just read big news today'
/*
daily: function () {
	this.publish('big news today');
	-->publish: function (publication, type) {	//publication = 'big news today'
			this.visitSubscribers('publish', publication, type);
			-->visitSubscribers: function (action, arg, type) {	//arg = 'big news today'
					var pubtype = type || 'any',	//'any'
							subscribers = this.subscribers[pubtype],	//[joe.drinkCoffee]
							i,
							max = subscribers.length;
					for(i = 0; i < max; i++) {
						if (action === 'publish') {} {
							subscribers[i](arg);	
							//joe.drinkCoffee(arg);
							//'Just read big news today'
						}else {
							if (subscribers[i] === arg) {
								subscribers.splice(i,1);
							}
						}
					}
				}
		}
}
*/
paper.monthly();	//'About to fall asleep reading this interesting analysis'
/*
monthly: function () {
	this.publish('interesting analysis', 'monthly');
	-->publish: function (publication, type) {	//publication = 'interesting analysis',type = 'monthly'
			this.visitSubscribers('publish', publication, type);
			-->visitSubscribers: function (action, arg, type) {	//arg = 'interesting analysis'
					var pubtype = type || 'any',	//'monthly'
							subscribers = this.subscribers[pubtype],	//[joe.sundayPreNap]
							i,
							max = subscribers.length;
					for(i = 0; i < max; i++) {
						if (action === 'publish') {} {
							subscribers[i](arg);	
							//joe.sundayPreNap(arg);
							//'About to fall asleep reading this interesting analysis'
						}else {
							if (subscribers[i] === arg) {
								subscribers.splice(i,1);
							}
						}
					}
				}
		}
}
*/

makePublisher(joe);
/*joe = {
		subscribers: {any: []},
		subscribe: function (fn, type) {
			type = type || 'any';
			if(typeof this.subscribers[type] === 'undefined') {
				this.subscribers[type] = [];
			}
			this.subscribers[type].push(fn);
		},
		//
		unsubscribe: function(fn, type) {
			this.visitSubscribers('unsubscribe', fn, type);
		},

		publish: function (publication, type) {
			this.visitSubscribers('publish', publication, type);
		},

		visitSubscribers: function (action, arg, type) {
			var pubtype = type || 'any',
					subscribers = this.subscribers[pubtype],
					i,
					max = subscribers.length;
			for(i = 0; i < max; i++) {
				if (action === 'publish') {} {
					subscribers[i](arg);
				}else {
					if (subscribers[i] === arg) {
						subscribers.splice(i,1);
					}
				}
			}
		},
		drinkCoffee: function (paper) {
			console.log('Just read ' + paper);
		},
		sundayPreNap: function (monthly) {
			console.log('About to fall asleep reading this ' + monthly);
		},
		tweet: function (msg) {
			this.publish(msg);
		}
	 }
*/

joe.tweet = function (msg) {
	this.publish(msg);
};

paper.readTweets = function (tweet) {
	alert('Call big meeting! Someone ' + tweet);
};
/*paper = {
		subscribers: {any: []},
		subscribe: function (fn, type) {
			type = type || 'any';
			if(typeof this.subscribers[type] === 'undefined') {
				this.subscribers[type] = [];
			}
			this.subscribers[type].push(fn);
		},
		//
		unsubscribe: function(fn, type) {
			this.visitSubscribers('unsubscribe', fn, type);
		},

		publish: function (publication, type) {
			this.visitSubscribers('publish', publication, type);
		},

		visitSubscribers: function (action, arg, type) {
			var pubtype = type || 'any',
					subscribers = this.subscribers[pubtype],
					i,
					max = subscribers.length;
			for(i = 0; i < max; i++) {
				if (action === 'publish') {} {
					subscribers[i](arg);
				}else {
					if (subscribers[i] === arg) {
						subscribers.splice(i,1);
					}
				}
			}
		},
		daily: function () {
			this.publish('big news today');
		},
		monthly: function () {
			this.publish('interesting analysis', 'monthly');
		},
		readTweets: function (tweet) {
			alert('Call big meeting! Someone ' + tweet);
		}
	 }
*/

joe.subscribe(paper.readTweets);

joe.tweet('hated the paper today');	//'Call big meeting! Someone hated the paper today'

//示例2
//创建发布者
var publisher = {
	subscribers: {
		any: []
	},

	on: function (type, fn, context) {
		type = type || 'any';
		fn = typeof fn === 'function'? fn:context[fn];
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push({fn:fn, context: context || this});
	},

	remove: function (type, fn, context) {
		this.visitSubscribers('unsubscribe', type, fn, context);
	},

	fire: function (type, publication) {
		this.visitSubscribers('publish', type, publication);
	},

	visitSubscribers: function (action, type, arg, context) {
		var pubtype = type || 'any',
				subscribers = this.subscribers[pubtype],
				i,
				max = subscribers? subscribers.length : 0;
		for(i = 0; i < max; i++) {
			if (action === 'publish') {
				subscribers[i].fn.call(subscribers[i].context, arg);
			}else {
				if (subscribers[i].fn === arg && subscribers[i].context === context) {
					subscribers.splice(i,1)
				}
			}
		}
	}

};
//扩展对象成员的方法
function makePublisher(o) {
	var i;
	for(i in publisher) {
		if (publisher.hasOwnProperty(i) && typeof publisher[i] === 'function') {
			o[i] = publisher[i];
		}
	}
	o.subscribers = {any: []};
}
//Player构造函数
function Player(name, key) {
	this.points = 0;
	this.name = name;
	this.key = key;
	this.fire('newplayer', this);
}
//在构造函数的原型上添加方法
Player.prototype.play = function () {
	this.points +=1;
	this.fire('play', this);
};

//记分板
var scoreboard = {
	//获取页面上记分板dom
	element: document.getElementById('results'),
	//更新记分板输
	update: function (score) {
		var i, msg = '';
		for(i in score) {
			if (score.hasOwnProperty(i)) {
				msg += `<p><strong>${i}</strong>: ${score[i]}</p>`;
			}
		}
		this.element.innerHTML = msg;
	}
};
//游戏对象
var game = {
	keys: {},
	addPlayer: function (player) {
		var key = player.key.toString().charCodeAt(0);
		this.keys[key] = player;
	},

	handleKeypress: function (e) {
		e = e || window.event;
		if(game.keys[e.which]) {
			game.keys[e.which].play();
		}
	},

	handlePlay: function (player) {
		var i,players = this.keys,score = {};
		for(i in players) {
			if (players.hasOwnProperty(i)) {
				score[players[i].name] = players[i].points;
			}
		}
		this.fire('scorechange', score);
	}
};
//扩展构造函数原型的成员(把发布者的方法复制到构造函数原型上)
makePublisher(Player.prototype);
/*
Player.prototype = {
	play: function () {
		this.points +=1;
		this.fire('play', this);
	},
	subscribers: {any: []},
	on: function (type, fn, context) {
		type = type || 'any';
		fn = typeof fn === 'function'? fn:context[fn];
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push({fn:fn, context: context || this});
	},

	remove: function (type, fn, context) {
		this.visitSubscribers('unsubscribe', type, fn, context);
	},

	fire: function (type, publication) {
		this.visitSubscribers('publish', type, publication);
	},

	visitSubscribers: function (action, type, arg, context) {
		var pubtype = type || 'any',
				subscribers = this.subscribers[pubtype],
				i,
				max = subscribers? subscribers.length : 0;
		for(i = 0; i < max; i++) {
			if (action === 'publish') {
				subscribers[i].fn.call(subscribers[i].context, arg);
			}else {
				if (subscribers[i].fn === arg && subscribers[i].context === context) {
					subscribers.splice(i,1)
				}
			}
		}
	}

}
*/
//扩展游戏对象的成员(把发布者的方法复制到该对象上)
makePublisher(game);
/*
game = {
	subscribers: {
		any: []
	},

	on: function (type, fn, context) {
		type = type || 'any';
		fn = typeof fn === 'function'? fn:context[fn];
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];
		}
		this.subscribers[type].push({fn:fn, context: context || this});
	},

	remove: function (type, fn, context) {
		this.visitSubscribers('unsubscribe', type, fn, context);
	},

	fire: function (type, publication) {
		this.visitSubscribers('publish', type, publication);
	},

	visitSubscribers: function (action, type, arg, context) {
		var pubtype = type || 'any',
				subscribers = this.subscribers[pubtype],
				i,
				max = subscribers? subscribers.length : 0;
		for(i = 0; i < max; i++) {
			if (action === 'publish') {
				subscribers[i].fn.call(subscribers[i].context, arg);
			}else {
				if (subscribers[i].fn === arg && subscribers[i].context === context) {
					subscribers.splice(i,1)
				}
			}
		}
	}
	
	keys: {},

	addPlayer: function (player) {
		var key = player.key.toString().charCodeAt(0);
		this.keys[key] = player;
	},

	handleKeypress: function (e) {
		e = e || window.event;
		if(game.keys[e.which]) {
			game.keys[e.which].play();
		}
	},

	handlePlay: function (player) {
		var i,players = this.keys,score = {};
		for(i in players) {
			if (players.hasOwnProperty(i)) {
				score[players[i].name] = players[i].points;
			}
		}
		this.fire('scorechange', score);
	}

}
*/
//调用构造函数原型上的on方法增加订阅者
Player.prototype.on('newplayer', 'addPlayer', game);
/*
function on(type, fn, context) {	//type = 'newplayer', fn = 'addPlayer', context = game
	type = type || 'any';	//'newplayer'
		fn = typeof fn === 'function'? fn:context[fn];	//game['addPlayer']
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];	//this.subscribers = {any: [], newplayer: []}
		}
		this.subscribers[type].push({fn:fn, context: context || this});	
		//this.subscribers = {any: [], newplayer: [{fn: game['addPlayer'], context: game}]}
}
*/
//调用构造函数原型上的on方法增加订阅者
Player.prototype.on('play', 'handlePlay', game);
/*
function on(type, fn, context) {	//type = 'play', fn = 'handlePlay', context = game
	type = type || 'any';	//'play'
		fn = typeof fn === 'function'? fn:context[fn];	//game['handlePlayer']
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];	//this.subscribers = {any: [], play: []}
		}
		this.subscribers[type].push({fn:fn, context: context || this});	
		//this.subscribers = {any: [], play: [{fn: game['handlePlayer'], context: game}]}
}
*/
//调用game对象上的on方法增加订阅者(实际上是监听分数变化)
game.on('scorechange', scoreboard.update, scoreboard);
/*
function on(type, fn, context) {	//type = 'scorechange', fn = scoreboard.update, context = scoreboard
	type = type || 'any';	//'scorechange'
		fn = typeof fn === 'function'? fn:context[fn];	//scoreboard.update
		if (typeof this.subscribers[type] === 'undefined') {
			this.subscribers[type] = [];	//this.subscribers = {any: [], scorechange: []}
		}
		this.subscribers[type].push({fn:fn, context: context || this});	
		//this.subscribers = {any: [], scorechange: [{fn: scoreboard.update, context: scoreboard}]}
}
*/
//监听键盘事件
window.onkeypress = game.handleKeypress;
/*
window.onkeypress = function (e) {
		e = e || window.event;
		if(game.keys[e.which]) {
			game.keys[e.which].play();
		}
}
*/
//输入玩家信息
var playername, key;
while(1) {
	playername = prompt('Add player (name)');
	if (!playername) {
		break;
	}
	while(1) {
		key = prompt('Key for ' + playername + '?');
		if (key) {
			break;
		}
	}
	//创建新玩家
	new Player(playername, key);
	/*
	function Player(name, key) {
		this.points = 0;
		this.name = name;
		this.key = key;
		this.fire('newplayer', this);	//Player.prototype.fire
			   fire: function (type, publication) {
								this.visitSubscribers('publish', type, publication); //type = 'newplayer', publication = this
										 visitSubscribers: function (action, type, arg, context) {
																				var pubtype = type || 'any',
																						subscribers = this.subscribers[pubtype],	//[{fn: game['addPlayer'], context: game }]
																						i,
																						max = subscribers? subscribers.length : 0;
																				for(i = 0; i < max; i++) {
																					if (action === 'publish') {
																						subscribers[i].fn.call(subscribers[i].context, arg);
																						//game['addPlayer'].call(game, this);
																					}else {
																						if (subscribers[i].fn === arg && subscribers[i].context === context) {
																							subscribers.splice(i,1)
																						}
																					}
																				}
																			}	 
							}
	}
	*/
}

