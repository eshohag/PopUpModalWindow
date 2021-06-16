// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function submitPostForm(fromId, url) {
    $(fromId).on('submit', function (e) {
        e.preventDefault();

        var isValid = $(fromId).valid()
        if (isValid) {
            var formData = $(this).serialize();
            $.post(url, formData, function (response) {
                //Do something with response
                debugger;
                alert(response.FullName);
            });
        }
    });
}