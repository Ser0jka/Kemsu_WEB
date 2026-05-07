var books = [
    {
        "book": "«Колобок»",
        "tags": [ "сказки", "фольклор" ]
    },
    {
        "book": "«Красная Шапочка»",
        "tags": [ "сказки", "европейские" ]
    },
    {
        "book": "«Спящая красавица»",
        "tags": [ "сказки", "европейские" ]
    },
    {
        "book": "«Репка»",
        "tags": [ "сказки", "фольклор" ]
    },
    {
        "book": "«Три поросенка»",
        "tags": [ "сказки", "английские" ]
    }
];

var test = function () {
    "use strict";

    // Буквально как на скриншоте: функция внутри main
    var organizeByTags = function (toDoObjects) {
        console.log("organizeByTags вызвана");
        console.log("Книги:", toDoObjects);
        
        // Здесь будет логика преобразования
        var organizedByTag = [];
        // ... (код логики)
        return organizedByTag;
    };

    // Вызов функции с передачей массива
    organizeByTags(books);
};

$(document).ready(test);
