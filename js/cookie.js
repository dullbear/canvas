/*设置Cookie*/

function setCookie(c_name, value, expiredays, path, domain, secure) {　
	var exdate = new Date(); //获取当前时间　 　
	var pastTime = new Date(exdate.getTime() + expiredays); //过期时间（毫秒）
	document.cookie = c_name + "=" + //cookie名称
	escape(value) + //将cookie值进行编码
	((expiredays == null) ? "" : ";expires=" + pastTime) + //设置过期时间
	((path == null) ? '/' : ';path=' + path) + //设置访问路径
	((domain == null) ? '' : ';domain=' + domain) + //设置访问域
	((secure == null) ? '' : ';secure=' + secure);　 //设置是否加密
};

/*获取Cookie*/

function getCookie(c_name, index) {
	var cookies = document.cookie; //获取cookie值
	var cookieLen = cookies.length; //获取cookie长度
	if (cookieLen > 0) { //cookie不为空时

		var c_start = cookies.indexOf(c_name + '='); //查找需要cookie值在cookie中序号
		if (c_start > -1) { //cookie值存在时
			c_start += c_name.length + 1; //获取cookie值开始序列号

			var c_end = cookies.indexOf(';', c_start); //获取cookie值结束序列号
			if (c_end == -1) { //当cookie是最后一个时
				c_end = cookieLen; //设置cookie值结束序列号为cookie长度
			};

			var cookieStr = unescape(cookies.substring(c_start, c_end)); //获取解码cookie值

			var cookieObj = cookieStr.split(';'); //分割cookie值

			index = ((index == null) ? 0 : index); //判断index是否传值

			var goalObj = cookieObj[index]; //索引数组
			var goalStr = goalObj.split('=');
			var getcook = goalStr[1]; //获取需要取的cookie值
			return getcook;
		};
	} else {
		alert('页面没有cookie');
	}
};
