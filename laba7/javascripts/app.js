

"use strict";


var $newUL = $("<ul>"); // создание нового элемента списка
var $newParagraphElement = $("<p>"); // создание нового абзаца

$newParagraphElement.text("Это абзац");
$("footer").append($newParagraphElement);


var $listItemOne = $("<li>").text("Это первый элемент списка");
var $listItemTwo = $("<li>").text("Второй элемент списка");
var $listItemThree = $("<li>").text("Третий элемент списка");
$newUL.append($listItemOne);
$newUL.append($listItemTwo);
$newUL.append($listItemThree);
$("main").append($newUL);
var $footerFirstChild = $("<p>").text("Я первый дочерний элемент подвала!");
$("footer").prepend($footerFirstChild);


// удаляем первый пункт из списка,
// который мы создали ранее
$("ul li:first-child").remove();

// удаляем все элементы
// предварительно созданного списка
$newUL.empty();

// это удалит абзац в подвале из DOM
// $("footer p").fadeOut();

$("footer p").fadeOut(400, function() {
    $(this).remove();
});

$(".button").on("dblclick", function () {
  alert("Эй! Ты дважды щелкнул кнопкой мыши!");
});

console.log("это выводится первым");
$(".button").on("click", function () {
  console.log("это выводится, когда кто-то щелкает кнопкой мыши");
});
console.log("это выводится вторым");



// Это событие jQuery, выполняющее обратный вызов,
// как только DOM готова. В этом примере мы используем
// анонимную функцию вместо отправки функции main аргумента
$(document).ready(function () {
  console.log("Это будет выведено, как только документ будет готов");
});

// А это функция, встроенная в JavaScript, которая
// выполняется по прошествии определенного количества миллисекунд
setTimeout(function () {
  console.log("Это будет выведено через 3 секунды");
}, 3000);

// это будет выведено перед чем-либо еще, даже если
// появится последним
console.log("Это будет выведено первым");




var main = function () {
  "use strict";
  // создаем и тут же скрываем комментарий в элементе div
  var $content = $("<div>Hello, World!</div>").hide();
  var $moreContent = $("<div>Goodbye, World!</div>").hide();
  // отправляем содержимое в элемент body
  $("body").append($content);
  // заставляем содержимое постепенно раскрываться вниз за 2 секунды,
  // а затем выполняем обратный вызов, в котором
  // находится другое содержимое
  $content.slideDown(2000, function () {
    // отправляем новое содержимое в body
    $("body").append($moreContent);
    // заставляем новое содержимое постепенно отобразиться
    $moreContent.fadeIn();
  });
};
$(document).ready(main);


