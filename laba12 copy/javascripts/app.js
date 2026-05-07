/*jslint browser: true, devel: true, for: true */
/*global $: false */

var main = function (booksObjects) {
    "use strict";

    var books = booksObjects.map(function (item) {
        return item.book;
    });

    var organizeByTags = function (booksObjects) {
        "use strict";

        // --- Первая часть: создание массива уникальных тегов ---
        var tags = [];
        booksObjects.forEach(function (book) {
            book.tags.forEach(function (tag) {
                if (tags.indexOf(tag) === -1) {
                    tags.push(tag);
                }
            });
        });

        // --- Второй этап: использование map для связи тегов с объектами ---
        var tagObjects = tags.map(function (tag) {
            // Здесь мы находим все книги, содержащие этот тег
            var booksWithTag = [];
            booksObjects.forEach(function (book) {
                // Проверка, что результат indexOf не равен -1
                if (book.tags.indexOf(tag) !== -1) {
                    booksWithTag.push(book.book);
                }
            });

            // Мы связываем каждый тег с объектом, который 
            // содержит название тега и массив книг
            return { "name": tag, "books": booksWithTag };
        });

        // Вывод итогового объекта в консоль
        console.log(tagObjects);

        // Дописываем возвращаемое значение (чтобы вкладка заработала)
        return tagObjects;
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

        if (tabNumber === 1 || tabNumber === 2) {
            // Если 1 вкладка — реверсим, если 2 — оставляем как есть
            var displayBooks = (tabNumber === 1) ? books.slice().reverse() : books;
            
            displayBooks.forEach(function (title) {
                $ul.append($("<li>").text(title));
            });
            $content.append($ul);
        }   else if (tabNumber === 3) { 
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
            // Создаем поля ввода и подписи к ним
            var $titleLabel = $("<p>").text("Название: "),
                $titleInput = $("<input>").addClass("book-input"),
                $tagsLabel = $("<p>").text("Теги (через запятую): "),
                $tagsInput = $("<input>").addClass("tags-input"),
                $button = $("<button>").text("+").addClass("plusButton");

            $button.on("click", function () {
                var newTitle = $titleInput.val(),
                    // Разделяем строку тегов по запятой в массив
                    newTags = $tagsInput.val().split(",");

                if (newTitle !== "") {
                    // Добавляем новый объект в основной массив
                    booksObjects.push({
                        "book": newTitle,
                        "tags": newTags
                    });

                    // Обновляем вспомогательный массив строк для вкладок 1 и 2
                    books = booksObjects.map(function (item) {
                        return item.book;
                    });

                    // Очищаем поля
                    $titleInput.val("");
                    $tagsInput.val("");
                }
            });

            // Добавляем всё в контент
            $content.append($titleLabel).append($titleInput);
            $content.append($tagsLabel).append($tagsInput);
            $content.append($button);

            
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
