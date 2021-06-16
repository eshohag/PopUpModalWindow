﻿// Write your JavaScript code.

function submitPostForm(fromId, url) {
    $(fromId).on('submit', function (e) {
        var eee = e;
        e.preventDefault();
        debugger;
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
function closeModal() {
    $('#myModal').modal('hide');
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
function deleteModal(url, redirectTo) {
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
                    loadLink(redirectTo);
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
        color: '#004A89',
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

function loadLink(url, id) {
    if (typeof (id) === 'undefined') {
        loadPartialView(url, 'mainContent');
    } else {
        loadPartialView(url, id);
    }
}

function loadPartialView(link, position) {
    $('#' + position).html('');
    Spiner.show();
    setTimeout(function () {
        var resp = $.ajax({
            url: link,
            contentType: 'application/html; charset=utf-8',
            type: 'GET',
            async: false,
            dataType: 'html',
            beforeSend: function () {
                Spiner.show();
            },
            success: function (result) {
                $('#' + position).show();
                $('#' + position).html(result);
                Spiner.hide();
            },
            error: function (status) {
                bootbox.alert(status);
                Spiner.hide();
            }
        }).responseText;
    }, 10);
}