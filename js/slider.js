;(function(){
	var mysetting = { //插件的默认配置
		auto : true,
		speed : 2000,
		txt : true,
		startIndex : 0
	}
	function Slider( dom, userSetting={}){
		this.setting = {};
		for( var p in mysetting){
			if( userSetting.hasOwnProperty(p)){
				this.setting[p] = userSetting[p]
			}else{
				this.setting[p] =  mysetting[p];
			}
		}
		var that = this;
		this.contains  = dom;
		this.currentIndex = 0;//当前显示的是下标为0 的li
		this.lis = dom.querySelectorAll('.slider_content li');
		
		//创建左按钮
		this.leftBtn = document.createElement('span');
		this.leftBtn.className = 'btn btn_left';
		dom.appendChild(this.leftBtn);
		
		//创建右按钮
		this.rightBtn = document.createElement("span");
		this.rightBtn.className="btn btn_right";
		dom.appendChild(this.rightBtn);
		
		//给左按钮添加点击事件
		this.leftBtn.addEventListener('click',function(e){
			that.prev();
		});
		
		//给右按钮添加点击事件
		this.rightBtn.addEventListener('click',function(e){
			that.next();
		});
		
		//创建角标
		var indirector = document.createElement('ol');
		indirector.className = 'indirector';
		this.indirectors  = [];
		
		//添加ol 里的 li
		for( var i = 0;i < this.lis.length; i++){
			var li = document.createElement('li');
			this.indirectors.push(li);
			//当鼠标移上角标时,显示对应的图片
			this.indirectors[i].idx = i;
			this.indirectors[i].addEventListener('mouseenter',function(){
				that.goto(this.idx);
			})
			indirector.appendChild(li);
		}
		dom.appendChild(indirector);
		if( this.setting.txt === true ){
			//创建文字区域
			var des = document.createElement('div');
			des.className = 'txt';
			dom.appendChild(des);
			that.goto(0);
		}
		if( this.setting.auto === true){
			//添加自动播放,鼠标移上停止.离开继续
			dom.addEventListener('mouseleave',function(){
				that.auto();
			});
			dom.addEventListener('mouseenter',function(){
				that.stop();
			});
			this.auto();
		}
		this.goto(this.setting.startIndex);
	}
	Slider.prototype.stop = function(){
		clearInterval(this.timer);
	}
	Slider.prototype.auto = function(){
		var that = this;
		this.timer = setInterval(function(){
			that.next();
		},this.setting.speed)
	}
	Slider.prototype.goto = function( yourIndex ){
		this.currentIndex = yourIndex;
		//让其他的li(图片和角标)没有cur类
		for( var i = 0; i < this.lis.length; i++){
			this.lis[i].className = '';
			this.indirectors[i].className = '';
		}
		//给当前的li(图片和角标)添加cur类
		this.lis[yourIndex].className = 'cur';
		this.indirectors[yourIndex].className = 'cur';
		if( this.setting.txt === true ){
			//给图片添加对应的描述
			var t = this.lis[yourIndex].querySelector('img').alt;
			this.contains.querySelector('.txt').innerHTML = t;		
		}
	}
	Slider.prototype.prev = function(){
		var t = this.currentIndex - 1;
		t = t < 0 ? this.lis.length-1 : t ;
		this.goto( t );
	}
	Slider.prototype.next = function(){
		var t = this.currentIndex + 1;
		t = t > this.lis.length-1 ? 0 : t;
		this.goto( t );
	}
	window.Slider = Slider;
	window.onload = function(){
		var sliderObject = [];
		var sliders = document.querySelectorAll('.slider');
		for( var i = 0; i<sliders.length; i++){
			var setting = {};
			sliders[i].dataset.auto && ( setting.auto = sliders[i].dataset.auto =="true");
			sliders[i].dataset.speed && ( setting.speed = (+sliders[i].dataset.speed));
			sliders[i].dataset.txt && ( setting.txt = sliders[i].dataset.txt =="true");
			sliders[i].dataset.startIndex && ( setting.startIndex = (+sliders[i].dataset.startIndex));
			var t = new Slider(sliders[i],setting)
			sliderObject.push(t);
		}
		window.sliderObject = sliderObject;
	}
})()

