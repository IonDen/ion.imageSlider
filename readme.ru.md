![ion.imageSlider](_tmp/logo-ion-image-slider.png)

> <a href="readme.md">English description</a> | Описание на русском

jQuery слайдер изображений и лайтбокс с поддержкой скинов.

***

* Версия: 1.2.0
* <a href="http://ionden.com/a/plugins/ion.imageSlider/">Страница проекта и демо</a>
* <a href="http://ionden.com/a/plugins/ion.imageSlider/ion.imageSlider-1.2.zip">Скачать ZIP-архив</a>

[![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

## Описание
* Ion.ImageSlider — отличный и удобный слайдер картинок и лайтбокс в одном.
* Лайтбокс поддерживает управление с клавиатуры с помощью клавиш ESC, LEFT и RIGHT.
* Кроссбраузерная поддержка: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)
* Плагин поддерживает устройства с touch-экраном (iPhone, iPad, etc.).
* Плагин свободно распространяется на условиях <a href="http://ionden.com/a/plugins/licence.html" target="_blank">лицензии MIT</a>.

## Зависимости
* <a href="http://jquery.com/" target="_blank">jQuery 1.9+</a>


## Подключение

Подключаем библиотеки:
* jQuery
* ion.imageSlider.min.js

И CSS:
* normalize.min.css - желательно, если он у вас еще не подключен
* ion.imageSlider.css
* ion.imageSlider.skinName.css

Не забываем про картинки скина:
* iis-skinName-skin-preloader.gif - прелоадер
* iis-skinName-skin-preloader.png - спрайт
* Либо воспользуйтесь вложенным в архив PSD файлом, и нарисуйте собственный скин
* Прелоадеры можно сгенерировать <a href="http://preloaders.net/" target="_blank">здесь</a>

Создаем галерею в виде группы ссылок:
```html
<div class="ion-image-slider" id="mySlider">
    <a href="ссылка на большую картинку 1"><img src="ссылка на миниатюру 1" data-caption="Название, если нужно" /></a>
    <a href="ссылка на большую картинку 2"><img src="ссылка на миниатюру 2" /></a>
    ...
    <a href="ссылка на большую картинку N"><img src="ссылка на миниатюру N" data-caption="Еще название" /></a>
</div>
```

Инициализируем слайдер:
```javascript
$("#mySlider").ionImageSlider();
```

Или инициализируем слайдер с параметрами:
```javascript
$("#mySlider").ionImageSlider({
    zoomText: "Увеличить",                  // текст возле иконки увеличения; поставьте "", если не нужен
    startFrom: 0,                           // № картинки, с которой стартовать слайдер
    slideShow: true,                        // включаем автопрокрутку
    slideShowDelay: 7                       // пауза между сменой картинок (если слайдшоу включено)
});
```

## Настройка

<table>
    <thead>
        <tr>
            <th>Атрибут</th>
            <th>По умолчанию</th>
            <th>Описание</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>zoomText</td>
            <td>"zoom"</td>
            <td>Не обязательный параметр, позволяет написать свой текст возле иконки увеличения</td>
        </tr>
        <tr>
            <td>startFrom</td>
            <td>0</td>
            <td>Не обязательный параметр, позволяет задать стартовую картинку для слайдера</td>
        </tr>
        <tr>
            <td>slideShow</td>
            <td>true</td>
            <td>Не обязательный параметр, позволет отключать автопрокрутку</td>
        </tr>
        <tr>
            <td>slideShowDelay</td>
            <td>7</td>
            <td>Не обязательный параметр, пауза между сменой кадров в автопрокрутке (в секундах)</td>
        </tr>
    </tbody>
</table>


### <a href="history.md">История обновлений</a>

***

Поддержите плагин:

[![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)
