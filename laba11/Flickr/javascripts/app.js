var main = function () {
    "use strict";
    var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
          "tags=cats&format=json&jsoncallback=?";
    // $.getJSON(url, function (flickrResponse) {
    //     console.log(flickrResponse);
    // });

    // $.getJSON(url, function (flickrResponse) {
    //     flickrResponse.items.forEach(function (photo) {
    //         console.log(photo.media.m);
    //     });
    // });

    $.getJSON(url, function (flickrResponse) {
        flickrResponse.items.forEach(function (photo) {
            // создаем новый элемент jQuery для помещения в него изображения
            var $img = $("<img>");
            // помещаем в атрибут URL,
            // хранящийся в ответе Flickr
            $img.attr("src", photo.media.m);
            // прикрепляем тег img к элементу
            // main .photos
            $("main .photos").append($img);
        });
    });

    $.getJSON(url, function (flickrResponse) {
        flickrResponse.items.forEach(function (photo) {
            // создаем новый элемент jQuery для хранения изображений
            // но пока скрываем его
            var $img = $("<img>").hide();
            // устанавливаем атрибут для URL,
            // находящегося в ответе
            $img.attr("src", photo.media.m);
            // прикрепляем тег к функции main
            // элемента photos, а затем отображаем его
            $("main .photos").append($img);
            $img.fadeIn();
        });
    });


};
$(document).ready(main);