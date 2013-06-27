// Ion.ImageSlider
// version 1.2.70
// © 2013 Denis Ineshin | IonDen.com
//
// Released under MIT licence:
// http://ionden.com/a/plugins/ion.imageSlider/
// http://ionden.com/a/plugins/licence.html
// =====================================================================================================================

(function($){
    $.fn.ionImageSlider = function(options){
        var settings = $.extend({
            zoomText: "Zoom",
            startFrom: 0,
            slideShow: true,
            slideShowDelay: 7
        }, options);

        var slider = this;
        var elements = null;
        var images = null;
        var bulletContainer = null;
        var bullets = null;
        var container = null;
        var pad = null;
        var units = null;

        var info = [];
        var fullWidth = 0;
        var sliderWidth = 0;
        var num = 0;
        var current = settings.startFrom;
        var oldCurrent = 0;
        var isMoving = false;
        var isOpend = false;

        var shTimer = 0;
        var shInter = null;

        var sliderBase =  '<div class="ion-image-slider-content">';
            sliderBase += '<div class="ion-image-slider-scroll"></div>';
            sliderBase += '<div class="ion-image-slider-preloader"></div>';
            sliderBase += '<div class="ion-image-slider-shadow-left"></div>';
            sliderBase += '<div class="ion-image-slider-shadow-right"></div>';
            sliderBase += '</div>';
            sliderBase += '<div class="ion-image-slider-bullets"></div>';
        var sliderArrs =  '<div class="ion-image-slider-arr-prev"></div>';
            sliderArrs += '<div class="ion-image-slider-arr-next"></div>';
        var sliderBull =  '<span class="ion-image-slider-bullet"></span>';
        var sliderPad  =  '<div class="ion-image-slider-pad" id="ion-image-slider-pad"></div>';


        // слайдер
        var func = {
            init: function(){
                var self = this;

                // показываем прелоадер
                // загружаем часть арта
                // определяем ключевые элементы и данные
                slider.append(sliderBase);
                elements = slider.find("a");
                images = elements.children("img");
                container = slider.find("div.ion-image-slider-content");
                bulletContainer = slider.find("div.ion-image-slider-bullets");

                num = images.length;
                sliderWidth = container.outerWidth();

                // загружаем все миниатюры
                this.loadCounter = 0;
                images.each(function(i){
                    imageLoader($(this), self, i, 0);
                });
            },
            onLoadImage: function(image, imageNum){
                this.loadCounter++;

                // складываем всю информацию о миниатюрах в массив info
                info[imageNum] = {
                    width: image.width(),
                    height: image.height(),
                    caption: image.data("caption") || "",
                    url: image.parent("a").prop("href")
                };

                // распихиваем буллеты по мере загрузки
                // такая вот имитация загрузчика
                bulletContainer.append(sliderBull);

                // ждем информацию о всех миниатюрах
                // прежде чем продолжить
                if(this.loadCounter === num) this.buildSlider();
            },
            buildSlider: function(){
                // убираем прелоадер
                // показываем остальной арт
                slider.find("div.ion-image-slider-preloader").remove();
                container.append(sliderArrs);

                // получаем данные о размерах
                // а так же добавляем дополнительные элементы функционала
                // картинку Zoom и подпись
                elements.each(function(i){
                    var _w = info[i].width + 22;
                    var _h = info[i].height + 22;
                    $(this).width(_w).height(_h).addClass("ssi-" + i);

                    var dop =  '<span class="ion-image-slider-zoom"></span>';
                        dop += '<span class="ion-image-slider-zoom-text">' + settings.zoomText + '</span>';

                    if(info[i].caption) {
                        dop += '<span class="ion-image-slider-caption" style="max-width: ' + (parseInt(info[i].width) - 10) + 'px;">' + info[i].caption + '</span>';
                    }
                    $(this).append(dop);
                });
                for(var i = 0; i < num; i++){
                    fullWidth += info[i].width + 42;
                }

                // устанавливаем размеры и
                // перекладываем изображения в спец контейнер
                container.find("div.ion-image-slider-scroll").html(sliderPad);
                pad = $("#ion-image-slider-pad");
                pad.width(fullWidth * 3);
                elements.appendTo(pad);
                elements.clone().appendTo(pad);
                elements.clone().appendTo(pad);
                units = pad.find("a");

                // нумеруем буллеты по порядку
                bullets = bulletContainer.find("span.ion-image-slider-bullet");
                bullets.each(function(i){
                    $(this).prop("id", "ion-image-slider-bullet-" + i).data("num", i);
                });

                this.buildEvents();
                this.moveToPos(true);
            },
            buildEvents: function(){
                var self = this;

                // навешиваем события на элементы управления
                slider.find("div.ion-image-slider-arr-prev").on("click", function(){
                    if(!isMoving) {
                        current--;
                        self.moveToPos();
                    }
                });
                slider.find("div.ion-image-slider-arr-next").on("click", function(){
                    if(!isMoving) {
                        current++;
                        self.moveToPos();
                    }
                });
                bullets.on("click", function(){
                    if(!isMoving) {
                        current = $(this).data("num");
                        self.moveToPos();
                    }
                });

                // запускаем слайдшоу, если включено
                if(settings.slideShow) this.slideShow();

                // останавливаем слайдшоу при наведении на слайдер
                container.on("mouseenter", function(){
                    if(settings.slideShow) {
                        clearInterval(shInter);
                        shTimer = 0;
                    }
                });
                // возобновляем слайдшоу
                container.on("mouseleave", function(){
                    if(settings.slideShow && !isOpend) self.slideShow();
                });

                // открываем лайтбокс с увеличенной картинкой
                units.on("click", function(e){
                    e.preventDefault();
                    var num = parseInt($(this).prop("class").slice(4));
                    isOpend = true;
                    popup.open(num, info);
                });
            },
            slideShow: function(){
                var self = this;

                shInter = setInterval(function(){
                    shTimer = shTimer + 10;
                    if(shTimer >= settings.slideShowDelay * 100) {
                        shTimer = 0;
                        current++;
                        self.moveToPos();
                    }
                }, 100);
            },
            setActiveBullet: function(){
                // делаем текущий буллет активным
                $("#ion-image-slider-bullet-" + current).addClass("active").siblings().removeClass("active");
            },
            moveToPos: function(isFirst){
                if(!isFirst) isMoving = true;
                if(current < 0) {
                    current = num - 1;
                } else if(current > num - 1) {
                    current = 0;
                }
                this.setActiveBullet();

                // очищаем таймер слайдшоу
                if(settings.slideShow) shTimer = 0;

                // вычисляем позицию подложки
                // в т.ч. для имитации непрерывной прокрутки
                var offset = 0;
                var halfWidth = Math.round(sliderWidth / 2);
                for(var i = 0; i < current; i++){
                    offset += info[i].width + 42;
                }
                var halfC = (info[current].width + 42) / 2;
                var xReal = Math.round(halfWidth - offset - halfC + 10);
                var xVirtual = Math.round(xReal - fullWidth);

                var offsetOld = 0;
                for(var z = 0; z < oldCurrent; z++){
                    offsetOld += info[z].width + 42;
                }
                var halfCOld = (info[oldCurrent].width + 42) / 2;
                var xRealOld = Math.round(halfWidth - offsetOld - halfCOld + 10);
                var xFake = Math.round(xRealOld - fullWidth);

                if(current === num - 1 && oldCurrent === 0) {
                    xFake = (halfWidth - (info[0].width + 42) / 2) - (fullWidth * 2) + 10;
                }
                if(current === 0 && oldCurrent === num - 1){
                    xFake = halfWidth + ((info[num - 1].width + 42) / 2) - fullWidth + 10;
                }

                // добавляем активный класс текущему изображению
                this.setActive();

                // анимируем подложку
                var TIME = 300;
                pad.css("left", xFake + "px");

                if(isFirst) {
                    pad.css("left", xVirtual + "px");
                } else {
                    pad.stop().animate({
                        left: xVirtual
                    }, TIME, function(){
                        animationEnd();
                    });
                }

                // исключаем лишние нажатия по элементам управления
                // пока идет анимация, нажатия не учитываются
                function animationEnd(){
                    isMoving = false;
                }

                oldCurrent = current;
            },
            setActive: function(){
                // только для активного класса показываем зум иконку
                units.eq(num + current).addClass("active").siblings().removeClass("active");
            }
        };


        // лайтбокс
        var popup = {
            init: function(){
                var self = this;

                this.body = $(document.body);

                // загружаем элементы лайтбокса
                var html =  '<div class="ion-image-slider-overlay"></div>';
                    html += '<div class="ion-image-slider-popup">';
                    html += '<div class="ion-image-slider-popup-prev"><div></div></div>';
                    html += '<div class="ion-image-slider-popup-next"><div></div></div>';
                    html += '<div class="ion-image-slider-popup-close">&times;</div>';
                    html += '<div class="ion-image-slider-popup-caption"></div>';
                    html += '</div>';
                this.body.append(html);

                this.overlay = $("div.ion-image-slider-overlay");
                this.popup = $("div.ion-image-slider-popup");
                this.prev = $("div.ion-image-slider-popup-prev");
                this.next = $("div.ion-image-slider-popup-next");
                this.caption = $("div.ion-image-slider-popup-caption");
                this.image = null;

                this.width = 0;
                this.height = 0;

                // навешиваем события на элементы управления лайтбоксом
                this.overlay.on("click", function(){
                    self.close();
                });
                this.popup.on("click", function(){
                    self.close();
                });
                this.prev.on("click", function(e){
                    e.stopPropagation();
                    current--;
                    func.moveToPos();
                    self.change(-1);
                });
                this.next.on("click", function(e){
                    e.stopPropagation();
                    current++;
                    func.moveToPos();
                    self.change(1);
                });

                this.body.on("keydown", function(e){
                    if(e.which == 27 && isOpend) { // ESC button
                        self.close();
                    }
                    if(e.which == 37 && isOpend) { // LEFT button
                        current--;
                        func.moveToPos();
                        self.change(-1);
                    }
                    if(e.which == 39 && isOpend) { // RIGHT button
                        current++;
                        func.moveToPos();
                        self.change(1);
                    }
                });
            },
            change: function(dir){
                // переключение изображений прямо из лайтбокса
                this.close();

                var cur = this.current;
                cur = cur + dir;
                if(cur < 0) cur = this.info.length - 1;
                else if(cur > this.info.length - 1) cur = 0;

                var inf = this.info;
                this.open(cur, inf);
            },
            open: function(current, info){
                this.current = current;
                this.info = info;

                // вставляем описание изображения, если есть
                if(this.info[current].caption) {
                    this.caption.css("display","block").text(this.info[current].caption);
                } else {
                    this.caption.css("display","none");
                }

                // останавливаем слайдшоу, если оно включено
                if(settings.slideShow) {
                    clearInterval(shInter);
                    shTimer = 0;
                }

                this.overlay.css("display", "block");

                this.loadImage();
            },
            loadImage: function(){
                var self = this;

                this.body.append('<img src="' + this.info[this.current].url + '" class="ion-image-slider-big" />');
                this.image = $("img.ion-image-slider-big");

                this.image.on("load", function(){
                    self.width = $(this).width();
                    self.height = $(this).height();
                    self.placeImage();
                });
            },
            placeImage: function(){
                this.popup.addClass("opend");
                this.popup.prepend(this.image);

                // подгоняем большое изображение под размеры экрана, если нужно
                // и помещаем его в лайтбокс
                var scrW = $(window).innerWidth() - 40;
                var scrH = $(window).innerHeight() - 40;
                var ratio = this.height / this.width;

                if(this.width > scrW) {
                    this.width = scrW;
                    this.height = this.width * ratio;
                }
                if(this.height > scrH) {
                    this.height = scrH;
                    this.width = this.height / ratio;
                }

                this.popup.width(this.width + "px");
                this.popup.height(this.height + "px");
                this.popup.css("marginTop", -(this.height / 2) + "px");
                this.popup.css("marginLeft", -(this.width / 2) + "px");

                isOpend = true;
            },
            close: function(){
                this.overlay.css("display", "none");
                this.image.remove();
                this.popup.removeClass("opend");

                isOpend = false;

                // восстанавливаем слайдшоу, если включено
                if(settings.slideShow) func.slideShow();
            }
        };

        // загрузчик изображений
        // рукурсивно вызывает сам себя,
        // пока не получит ширину картинки
        function imageLoader(image, context, imageNum, tryCount){
            var w = image.width();
            if(tryCount > 50) w = 100; // если картинка не загружается дольше 5 секунд
            if(w > 30){
                // loaded
                context.onLoadImage(image, imageNum);
            } else {
                // not loaded
                setTimeout(function(){
                    imageLoader(image, context, imageNum, tryCount + 1);
                }, 100);
            }
        }


        func.init();
        popup.init();
    };
})(jQuery);