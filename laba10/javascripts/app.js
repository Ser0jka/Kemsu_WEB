/*jslint browser: true, devel: true, for: true */
/*global $: false */

var main = function () {
    "use strict";

    var books = [
        "«Преступление и наказание» — Федор Достоевский",
        "«О дивный новый мир» — Олдос Хаксли",
        "«Цветы для Элджернона» — Дэниел Киз",
        "«451 градус по Фаренгейту» — Рэй Брэдбери",
        "«Мастер и Маргарита» — Михаил Булгаков",
        "«1984» — Джордж Оруэлл"
    ];

    var makeTabActive = function (tabNumber) {
        // Переменные объявлены в начале функции (требование JSLint)
        var $content = $("main .content");
        var $clickedTab = $(".tabs a:nth-child(" + tabNumber + ") span");
        var $ul = $("<ul>");
        var $input;
        var $button;
        var $form;

        $(".tabs span").removeClass("active");
        $clickedTab.addClass("active");
        $content.empty();

        if (tabNumber === 1) {
            console.log("Нажата первая вкладка");
            books.slice().reverse().forEach(function (book) {
                $ul.append($("<li>").text(book));
            });
            $content.append($ul);
        } else if (tabNumber === 2) {
            console.log("Нажата вторая вкладка");
            books.forEach(function (book) {
                $ul.append($("<li>").text(book));
            });
            $content.append($ul);
        } else if (tabNumber === 3) {
            // Создаем элементы через $
            $input = $("<input>").addClass("book-input");
            $button = $("<button>").text("+").addClass("plusButton");

            $button.on("click", function () {
                var newBook = $input.val();
                if (newBook !== "") {
                    books.push(newBook);
                    $input.val("");
                    console.log("Книга добавлена!", books);
                }
            });

            $form = $("<div>").addClass("form-container");
            $form.append($input);
            $form.append($button);
            $content.append($form);
        }
    };

    var i;
    for (i = 1; i <= 3; i += 1) {
        (function (n) {
            $(".tabs a:nth-child(" + n + ")").on("click", function () {
                makeTabActive(n);
                return false;
            });
        }(i));
    }

    makeTabActive(1);
};

$(document).ready(main);
