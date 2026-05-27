/*global $: false */

var fallbackBooks = [
    {
        "title": "Зулейха открывает глаза",
        "author": "Гузель Яхина",
        "year": 2015,
        "category": "Современная проза",
        "status": "В наличии",
        "isNew": false,
        "color": "cover-red",
        "cover": "https://covers.openlibrary.org/b/isbn/9785170904365-M.jpg",
        "description": "Роман о судьбе женщины в переломное время и о том, как человек заново собирает свою жизнь."
    },
    {
        "title": "Дом, в котором...",
        "author": "Мариам Петросян",
        "year": 2009,
        "category": "Фэнтези",
        "status": "В наличии",
        "isNew": false,
        "color": "cover-blue",
        "cover": "https://covers.openlibrary.org/b/isbn/9785171132019-M.jpg",
        "description": "Большой роман о закрытом доме, дружбе, тайнах и взрослении."
    },
    {
        "title": "Пиши, сокращай",
        "author": "Максим Ильяхов, Людмила Сарычева",
        "year": 2023,
        "category": "Саморазвитие",
        "status": "Новое поступление",
        "isNew": true,
        "color": "cover-gold",
        "cover": "https://covers.openlibrary.org/b/isbn/9785961472765-M.jpg",
        "description": "Практическая книга о ясном тексте, редактуре и уважении к читателю."
    }
];

var main = function (bookObjects) {
    "use strict";

    var books = bookObjects.slice();
    var currentTab = 1;
    var colors = ["", "cover-red", "cover-blue", "cover-gold"];

    var getCategories = function () {
        var categories = [];

        books.forEach(function (book) {
            if (categories.indexOf(book.category) === -1) {
                categories.push(book.category);
            }
        });

        return categories.sort();
    };

    var fillCategoryFilter = function () {
        var selectedCategory = $("#categoryFilter").val() || "all";
        var $select = $("#categoryFilter");

        $select.empty();
        $select.append($("<option>").val("all").text("Все категории"));

        getCategories().forEach(function (category) {
            $select.append($("<option>").val(category).text(category));
        });

        $select.val(selectedCategory);
        if ($select.val() === null) {
            $select.val("all");
        }
    };

    var sortBooks = function (bookList) {
        var sortType = $("#sortSelect").val();
        var sortedBooks = bookList.slice();

        if (sortType === "old") {
            sortedBooks.sort(function (first, second) {
                return first.year - second.year;
            });
        } else if (sortType === "title") {
            sortedBooks.sort(function (first, second) {
                return first.title.localeCompare(second.title);
            });
        } else {
            sortedBooks.sort(function (first, second) {
                return second.year - first.year;
            });
        }

        return sortedBooks;
    };

    var getFilteredBooks = function () {
        var searchText = $("#searchInput").val().toLowerCase();
        var category = $("#categoryFilter").val();

        return books.filter(function (book) {
            var text = (book.title + " " + book.author).toLowerCase();
            var foundBySearch = text.indexOf(searchText) !== -1;
            var foundByCategory = category === "all" || book.category === category;

            return foundBySearch && foundByCategory;
        });
    };

    var makeBookCard = function (book) {
        var $card = $("<article>").addClass("book-card");
        var $cover = $("<div>").addClass("book-cover " + book.color).text(book.category);
        var $image;
        var $info = $("<div>");
        var $meta = $("<div>").addClass("book-meta");

        if (book.cover) {
            $image = $("<img>").attr({
                "src": book.cover,
                "alt": "Обложка книги " + book.title
            });

            $image.on("error", function () {
                $(this).remove();
                $cover.text(book.category);
            });

            $cover.empty().append($image);
        }

        $info.append($("<h3>").text(book.title));
        $info.append($("<p>").text(book.author + ", " + book.year));
        $info.append($("<p>").text(book.description));

        $meta.append($("<span>").addClass("tag").text(book.category));
        if (book.isNew) {
            $meta.append($("<span>").addClass("tag").text("Новинка"));
        }

        $info.append($meta);
        $info.append($("<p>").addClass("book-status").text(book.status));

        $card.append($cover);
        $card.append($info);

        return $card;
    };

    var renderBookList = function (title, bookList) {
        var $content = $(".content");
        var sortedBooks = sortBooks(bookList);
        var $heading = $("<div>").addClass("catalog-heading");
        var $grid = $("<div>").addClass("book-grid");

        $content.empty();
        $heading.append($("<h2>").text(title));
        $heading.append($("<p>").text("Найдено книг: " + sortedBooks.length));
        $content.append($heading);

        if (sortedBooks.length === 0) {
            $content.append($("<div>").addClass("empty-state").text("По выбранным параметрам книг не найдено."));
            return;
        }

        sortedBooks.forEach(function (book) {
            $grid.append(makeBookCard(book));
        });

        $content.append($grid);
    };

    var organizeByCategory = function (bookList) {
        var organizedBooks = [];

        bookList.forEach(function (book) {
            var categoryIndex = -1;
            var i;

            for (i = 0; i < organizedBooks.length; i += 1) {
                if (organizedBooks[i].name === book.category) {
                    categoryIndex = i;
                    break;
                }
            }

            if (categoryIndex === -1) {
                organizedBooks.push({
                    "name": book.category,
                    "books": [book]
                });
            } else {
                organizedBooks[categoryIndex].books.push(book);
            }
        });

        return organizedBooks;
    };

    var renderGroupedBooks = function () {
        var $content = $(".content");
        var bookList = sortBooks(getFilteredBooks());
        var organizedBooks = organizeByCategory(bookList);
        var $heading = $("<div>").addClass("catalog-heading");
        var $groups = $("<div>").addClass("group-list");

        $content.empty();
        $heading.append($("<h2>").text("Книги по категориям"));
        $heading.append($("<p>").text("Категорий: " + organizedBooks.length));
        $content.append($heading);

        if (organizedBooks.length === 0) {
            $content.append($("<div>").addClass("empty-state").text("Нет книг для группировки."));
            return;
        }

        organizedBooks.forEach(function (group) {
            var $section = $("<section>").addClass("category-group");
            var $list = $("<ul>");

            $section.append($("<h2>").text(group.name));

            group.books.forEach(function (book) {
                $list.append($("<li>").text(book.title + " - " + book.author));
            });

            $section.append($list);
            $groups.append($section);
        });

        $content.append($groups);
    };

    var renderAddForm = function () {
        var $content = $(".content");
        var $form = $("<form>").addClass("add-form");
        var $categorySelect = $("<select>").attr("id", "newCategory");

        $content.empty();
        $content.append($("<div>").addClass("catalog-heading").append($("<h2>").text("Добавить книгу")));

        getCategories().forEach(function (category) {
            $categorySelect.append($("<option>").val(category).text(category));
        });

        $form.append($("<label>").text("Название").append($("<input>").attr({
            "id": "newTitle",
            "type": "text",
            "required": true
        })));
        $form.append($("<label>").text("Автор").append($("<input>").attr({
            "id": "newAuthor",
            "type": "text",
            "required": true
        })));
        $form.append($("<label>").text("Год").append($("<input>").attr({
            "id": "newYear",
            "type": "number",
            "min": 1800,
            "max": 2026,
            "value": 2026
        })));
        $form.append($("<label>").text("Категория").append($categorySelect));
        $form.append($("<label>").addClass("wide").text("Описание").append($("<textarea>").attr("id", "newDescription")));
        $form.append($("<button>").addClass("form-button").attr("type", "submit").text("Добавить в каталог"));
        $form.append($("<p>").addClass("form-message wide"));

        $form.on("submit", function (event) {
            var newBook;

            event.preventDefault();

            newBook = {
                "title": $("#newTitle").val(),
                "author": $("#newAuthor").val(),
                "year": Number($("#newYear").val()) || 2026,
                "category": $("#newCategory").val(),
                "status": "В наличии",
                "isNew": true,
                "color": colors[books.length % colors.length],
                "cover": "",
                "description": $("#newDescription").val() || "Новое поступление библиотечного фонда."
            };

            books.push(newBook);
            fillCategoryFilter();
            $(".form-message").text("Книга добавлена: " + newBook.title);
            this.reset();
            $("#newYear").val(2026);
        });

        $content.append($form);
    };

    var makeTabActive = function (tabNumber) {
        var filteredBooks = getFilteredBooks();
        var newBooks;

        currentTab = tabNumber;
        $(".tabs span").removeClass("active");
        $(".tabs a:nth-child(" + tabNumber + ") span").addClass("active");

        if (tabNumber === 1) {
            renderBookList("Все книги", filteredBooks);
        } else if (tabNumber === 2) {
            newBooks = filteredBooks.filter(function (book) {
                return book.isNew || book.year >= 2023;
            });
            renderBookList("Новые поступления", newBooks);
        } else if (tabNumber === 3) {
            renderGroupedBooks();
        } else {
            renderAddForm();
        }
    };

    var i;

    fillCategoryFilter();

    for (i = 1; i <= 4; i += 1) {
        (function (tabNumber) {
            $(".tabs a:nth-child(" + tabNumber + ")").on("click", function () {
                makeTabActive(tabNumber);
                return false;
            });
        }(i));
    }

    $("#searchInput, #categoryFilter, #sortSelect").on("keyup change", function () {
        if (currentTab !== 4) {
            makeTabActive(currentTab);
        }
    });

    makeTabActive(1);
};

$(document).ready(function () {
    "use strict";

    $.getJSON("javascripts/books.json", function (books) {
        main(books);
    }).fail(function () {
        main(fallbackBooks);
    });
});
