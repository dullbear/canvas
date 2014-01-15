//设置cookie

if (getCookie('canvas', 0) === undefined) {
    setCookie('canvas', 'len=0', 1000 * 60 * 60 * 24);
}
var len = getCookie('canvas', 0);
document.getElementById('num-show').innerHTML = 3-len;

var canvasCard = {
    init: function(width, height, residue, radius, color) {

        //建立画布上下文
        this.canvas = document.querySelector('#myCanvas');

        //获取相对上左距离
        this.boxOffLeft = this.canvas.offsetLeft;
        this.boxOffTop = this.canvas.offsetTop;

        //默认参数        
        this.width = width || 160;
        this.height = height || 120;
        this.residue = residue || 0.1;
        this.radius = radius || 10;
        this.color = color || '#ddd';

        //判断浏览器是否支持cancas
        if (this.canvas.getContext) {
            this.evt();
        } else {
            alert('你的浏览器不支持canvas');
        };
    },
    num: function() {
        /* 获取年月日*/
        var myDate = new Date();
        year = myDate.getFullYear();
        month = myDate.getMonth() + 1;
        date = myDate.getDate();

        /* 转换成毫秒 */
        currentDate = year + '/' + month + '/' + date + ' ' + '00:00:00';
        currentTime = (new Date(currentDate)).getTime();

        /* 获取当前毫秒值 */
        nowTime = myDate.getTime();

        /* 获取离明天凌晨毫秒值作为cookie过期时间 */
        tomTime = 1000 * 60 * 60 * 24 - (nowTime - currentTime);

        /* 获取抽奖次数 */
        var len = getCookie('canvas', 0);
        len++;
        setCookie('canvas', 'len=' + len, tomTime);
    },
    evt: function() {
        var _self = this,
            flag = false,
            flag01 = true;

        function layer() {
            _self.cxt.fillStyle = _self.color;
            _self.cxt.fillRect(0, 0, _self.width, _self.height);
        };

        function eventDown(e) {
            //阻止默认事件
            e.preventDefault();
            /* 获取抽奖次数 */
            var len = getCookie('canvas', 0);
            console.log(len);
            if (len < 3) {

                flag = true;
            } else {
                flag = false;
                alert('您今天的幸运值已用完，明天再来！');
            }

        };

        function eventUp(e) {
            //阻止默认事件
            e.preventDefault();

            flag = false;
            //拷贝了画布指定矩形的像素数据
            var data = _self.cxt.getImageData(0, 0, _self.width, _self.height).data;
            //返回的 ImageData 对象中第一个像素的 color/alpha 信息
            for (var i = 0, j = 0; i < data.length; i += 4) {
                if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
                    j++;
                }
            }
            if (j <= _self.width * _self.height * _self.residue) {
                layer();
                alert('谢谢参与，再接再厉');
                _self.num();

                history.go(0);
            }
        };

        function eventMove(e) {
            e.preventDefault();

            //阻止默认事件
            if (flag) {

                if (e.changedTouches) {
                    e = e.changedTouches[e.changedTouches.length - 1];
                }
                //获取x/y轴位置
                var x = (e.clientX + document.body.scrollLeft || e.pageX) - _self.boxOffLeft || 0,
                    y = (e.clientY + document.body.scrollTop || e.pageY) - _self.boxOffTop || 0;
                //开始绘制
                _self.cxt.beginPath();
                //绘制圆形大小
                _self.cxt.arc(x, y, _self.radius, 0, Math.PI * 2);
                //填充圆形
                _self.cxt.fill();

            }
        };


        this.cxt = this.canvas.getContext('2d');
        this.cxt.fillRect(0, 0, _self.width, _self.height);
        layer();

        this.cxt.globalCompositeOperation = 'destination-out';

        //移动端
        this.canvas.addEventListener('touchstart', eventDown);
        this.canvas.addEventListener('touchend', eventUp);
        this.canvas.addEventListener('touchmove', eventMove);

        //pc端
        this.canvas.addEventListener('mousedown', eventDown);
        window.addEventListener('mouseup', eventUp);
        this.canvas.addEventListener('mousemove', eventMove);


    }
};
canvasCard.init('110', '28', '0.1', '5', '#353535');