$(function() {
    var app = $("#app");
    function renderBookDetails(bookDetails, data) {
        bookDetails
            .empty()
            .append("ID: " + data.id + "<br />")
            .append("Autor: " + data.author + "<br />")
            .append("ISBN: " + data.isbn + "<br />")
            .append("Tytuł: " + data.title + "<br />")
            .append("Wydawca: " + data.publisher + "<br />")
            .append("Typ: " + data.type + "<br />");
    }
    function renderBooks(books) {
        app.empty();
        books.forEach(function(book) {
            var bookElement = $("<div>");
            var bookTitle = $("<div>");
            var bookDetails = $("<div>");
            bookElement.addClass("book").appendTo(app);
            bookTitle
                .addClass("book-title")
                .text(book.title)
                .appendTo(bookElement);
            bookTitle.one("click", function() {
                bookDetails.text("...");
                $.ajax({
                    method: "GET",
                    url: "http://localhost:8282/books/" + book.id
                }).done(function(data) {
                    renderBookDetails(bookDetails, data);
                });
            });
            bookDetails.addClass("book-details").appendTo(bookElement);
        });
    }
    function fetchBooks() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8282/books"
        }).done(renderBooks);
    }
    function handleForm() {
        $("#bookForm").on("submit", function(e) {
            e.preventDefault();
            var data = {};
            $(this)
                .find("input")
                .each(function() {
                    var name = $(this).attr("name");
                    data[name] = $(this).val();
                });

            $.ajax({
                method: "POST",
                url: "http://localhost:8282/books",
                contentType: "application/json",
                data: JSON.stringify(data)
            }).done(fetchBooks);
        });
    }
    fetchBooks();
    handleForm();
});