/*
 * Скрипт: Управление списком комментариев
 * Описание: Позволяет пользователю вводить текст в поле, 
 *           добавлять его в общий список по клику на кнопку 
 *           или нажатию клавиши Enter с эффектом плавного появления.
 * Используемые технологии: jQuery, JavaScript.
 */

"use strict";

$(document).ready(function() {
    // Основная функция для добавления комментария на страницу
    function addComment() {
        var text = $(".comment-input input").val();
        
        if (text !== "") {
            var $newComment = $("<p>").text(text).hide();
            $(".comments").append($newComment);
            $newComment.fadeIn(300);
            $(".comment-input input").val("");
        }
    }
    
    // Обработка клика по кнопке "Добавить"
    $(".comment-input button").click(addComment);
    
    // Обработка нажатия Enter в поле ввода
    $(".comment-input input").keypress(function(event) {
        if (event.which === 13) {
            addComment();
        }
    });
});
