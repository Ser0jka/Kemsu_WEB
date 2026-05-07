/*jslint browser: true, devel: true, for: true */
/*global $: false */

var main = function (booksObjects) {
    "use strict";

    var books = booksObjects.map(function (item) {
        return item.book;
    });

    var organizeByTags = function (booksObjects) {
        "use strict";

        var organizedByTag = [];

        // Перебираем каждую книгу в исходном списке
        booksObjects.forEach(function (book) {
            
            // Перебираем каждый тег у этой книги
            book.tags.forEach(function (tag) {
                var tagIndex = -1;

                // Проверяем, создавали ли мы уже этот тег в итоговом массиве
                for (var i = 0; i < organizedByTag.length; i++) {
                    if (organizedByTag[i].name === tag) {
                        tagIndex = i;
                        break;
                    }
                }

                if (tagIndex === -1) {
                    // Если тега еще нет, создаем новую группу для этого тега
                    organizedByTag.push({
                        "name": tag,
                        "books": [book.book] // Добавляем название первой книги в список
                    });
                } else {
                    // Если тег уже есть, просто добавляем название текущей книги в список
                    organizedByTag[tagIndex].books.push(book.book);
                }
            });
        });

        return organizedByTag;
    };


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
            // ЭТО КОД ДЛЯ ВКЛАДКИ ТЕГИ 
            console.log("Щелчок на вкладке Теги");
            
            var organizedByTag = organizeByTags(booksObjects);

            // ВЫВОД В КОНСОЛЬ
            console.log("Перевернутый массив объектов по тегам:");
            console.log(organizedByTag);

            organizedByTag.forEach(function (tag) {
                var $tagName = $("<h3>").text(tag.name), 
                    $list = $("<ul>"); 
                
                // Исправлено: используем .books (как в функции organizeByTags)
                tag.books.forEach(function (title) { 
                    $list.append($("<li>").text(title)); 
                }); 
                
                $content.append($tagName); 
                $content.append($list); 
            }); 
        }
        
        else if (tabNumber === 4) {
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
    for (i = 1; i <= 4; i += 1) {
        (function (n) {
            $(".tabs a:nth-child(" + n + ")").on("click", function () {
                makeTabActive(n);
                return false;
            });
        }(i));
    }

    makeTabActive(1);
};

$(document).ready(function () {
    $.getJSON("javascripts/books.json", function (booksObjects) {
        main(booksObjects);
    });
});
