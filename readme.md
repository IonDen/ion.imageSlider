![ion.imageSlider](_tmp/logo-ion-image-slider.png)

> English description | <a href="readme.ru.md">Описание на русском</a>

jQuery image slider with lightbox and skin support.

***

* Version: 1.2.0
* <a href="http://ionden.com/a/plugins/ion.imageSlider/en.html">Project page and demos</a>
* <a href="http://ionden.com/a/plugins/ion.imageSlider/ion.imageSlider-1.2.zip">Download ZIP</a>

## Description
* Ion.ImageSlider — nice and powerful image slider and lightbox at once.
* Lightbox supports keyboard controls with ESC, LEFT and RIGHT button.
* Crossbrowser: Google Chrome, Mozilla Firefox, Opera, Safari, IE(8.0+)
* Ion.Image Slider supports touch-devices (iPhone, iPad, etc.).
* Ion.Image Slider freely distributed under terms of <a href="http://ionden.com/a/plugins/licence.html" target="_blank">MIT licence</a>.

## Dependencies
* <a href="http://jquery.com/" target="_blank">jQuery 1.9+</a>

## Preparing Images
Thumbnails must be the same height to make slider work correctly. For example, in the attached skins, the height of each thumbnail is 264px, width has no importance. If you want to change this value, you will also need to change the height of the slider in the CSS-skin file.

## Using script

Import this libraries:
* jQuery
* ion.imageSlider.min.js

And CSS:
* normalize.min.css - desirable if you have not yet connected one
* ion.imageSlider.css
* ion.imageSlider.skinName.css

Don't forget about skin image:
* iis-skinName-skin-preloader.gif - preloader
* iis-skinName-skin-preloader.png - skin sprite
* Or use included PSD file and draw your own skin
* You can generate preloaders <a href="http://preloaders.net/" target="_blank">here</a>

Create gallery with the group of links:
```html
<div class="ion-image-slider" id="mySlider">
    <a href="link to large image 1"><img src="link to thumbnail 1" data-caption="Image name, if have one" /></a>
    <a href="link to large image 2"><img src="link to thumbnail 2" /></a>
    ...
    <a href="link to large image N"><img src="link to thumbnail N" data-caption="One more name" /></a>
</div>
```

Initialize slider:
```javascript
$("#mySlider").ionImageSlider();
```

Or initialize slider with custom settings:
```javascript
$("#mySlider").ionImageSlider({
    zoomText: "Увеличить",                  // text near zoom icon; set "", if don't need
    startFrom: 0,                           // # of start picture
    slideShow: true,                        // enable slide show
    slideShowDelay: 7                       // pause between picture change (if slide show is on)
});
```


## Settings

<table>
    <thead>
        <tr>
            <th>Property</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>zoomText</td>
            <td>"zoom"</td>
            <td>Optional property, set custom text near zoom icon or remove it</td>
        </tr>
        <tr>
            <td>startFrom</td>
            <td>0</td>
            <td>Optional property, set slider start image</td>
        </tr>
        <tr>
            <td>slideShow</td>
            <td>true</td>
            <td>Optional property, enable slide show</td>
        </tr>
        <tr>
            <td>slideShowDelay</td>
            <td>7</td>
            <td>Optional property, pause between picture change (if slide show is on) in seconds</td>
        </tr>
    </tbody>
</table>


### <a href="history.md">Update history</a>

***

#### Support Ion-series plugins development:

* Donate through Pledgie service: [![](https://pledgie.com/campaigns/25694.png?skin_name=chrome)](https://pledgie.com/campaigns/25694)

* Donate direct to my Paypal account: https://www.paypal.me/IonDen

* Donate direct to my Yandex.Money account: http://yasobe.ru/na/razrabotku
