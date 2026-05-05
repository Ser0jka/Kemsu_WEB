// var main = function () { 
// "use strict"; 
// $.getJSON("cards/aceOfSpades.json", function (card) {
// console.log(card); 
// });
// };
// $(document).ready(main);


// var main = function () { 
// "use strict"; 
// console.log("Hello, World!"); 
// $.getJSON("cards/aceOfSpades.json", function (card) { 
// var $cardParagraph = $("<p>"); 
// $cardParagraph.text(card.rank + " " + card.suit);  
// $("main").append($cardParagraph); 
// });
// }
// $(document).ready(main);


$.getJSON("cards/cart.json", function (cart) {
    var $list = $("<ul>");
    // hand - массив, поэтому мы можем применить к нему итерационный процесс
    // с помощью цикла forEach
    cart.forEach(function (vegetable) {
        // создаем элемент списка для хранения карты
        // и присоединяем его к списку
        var $vegetable = $("<li>");
        $vegetable.text(vegetable.name + " of " + vegetable.color);
        $list.append($vegetable);
    });
    // присоединяем список к элементу main
    $("main").append($list);
});
$(document).ready(main);


