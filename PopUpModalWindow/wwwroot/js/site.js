// Write your JavaScript code.
function submitForm(fromInformation) {
    var formId = "#" + fromInformation[0].getAttribute('id');
    var formActionUrl = fromInformation[0].getAttribute('action');
    var method = fromInformation[0].getAttribute('method');

    var isValid = $(formId).valid()
    if (isValid) {
        var formData = $(formId).serialize();
        var model = JSON.parse('{"' + formData.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) { return key === "" ? value : decodeURIComponent(value) })

        $.ajax({
            url: formActionUrl,
            type: method,
            data: { model },
            async: false,
            beforeSend: function () {
                Spiner.show();
            },
            success: function (result) {
                Spiner.hide();
                bootbox.confirm(result.message, function (yesNo) {
                    if (yesNo) {
                        loadLink(result.redirectTo);
                    }
                })              
            },
            error: function (status) {
                bootbox.alert(status);
                Spiner.hide();
            }
        })
    }
}
function modalWindow(url) {
    $.ajax({
        url: url,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        beforeSend: function () {
            Spiner.show();
        }
    }).done(function (data) {
        $('#modelContent').html(data);
        $('#myModal').modal('show');
        Spiner.hide();
    }).fail(function (data) {
        bootbox.alert('Error in creating records');
        Spiner.hide();
    });
}
function closeModal() {
    $('#myModal').modal('hide');
}
function deleteModal(url, redirectToUrl) {
    bootbox.confirm("Are you sure want to delete this record?", function (result) {
        if (result) {
            $.ajax({
                url: url,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                success: function (data) {
                    bootbox.alert({
                        message: "Record Deleted successfully!!!"
                    });
                    loadLink(redirectToUrl);
                },
                error: function (data) {
                    bootbox.alert('Error in getting result');
                }
            });
        }
    });
}

var Spiner = (function () {
    "use strict";
    var opts = {
        lines: 15,
        length: 0,
        width: 21,
        radius: 43,
        scale: 0.75,
        corners: 1,
        color: '#FF0000',
        opacity: 0.15,
        rotate: 0,
        direction: 1,
        speed: 0.7,
        trail: 80,
        fps: 20,
        zIndex: 2e9,
        className: 'spinner',
        top: '50%',
        left: '50%',
        shadow: false,
        hwaccel: false,
        position: 'absolute'
    };
    var result = {};
    var spin = new Spinner(opts);
    result.show = function () {
        $('#splash-page').show();
        $('#splash-page').after(spin.spin().el);
    }
    result.hide = function () {
        spin.stop();
        $('#splash-page').hide();
    }
    return result;
}());

function loadLink(urlLink) {
    location.href = urlLink;
}

function loadPartialView(urlLink, positionId) {
    if (typeof (positionId) === 'undefined') {
        positionId= 'mainContent';
    }
    $('#' + positionId).html('');
    Spiner.show();
    setTimeout(function () {
        $.ajax({
            url: urlLink,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            async: false,
            dataType: 'html',
            beforeSend: function () {
                Spiner.show();
            },
            success: function (result) {
                $('#' + positionId).show();
                $('#' + positionId).html(result);
                Spiner.hide();
            },
            error: function (status) {
                bootbox.alert(status);
                Spiner.hide();
            }
        });
    }, 10);
}