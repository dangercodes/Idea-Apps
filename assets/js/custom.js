getIdea();
openFormAdd();
addIdea();
setTimeout(editIdea, 2000);
updateIdea();
setTimeout(deleteIdea, 2000);
cancel();

// This is function for get data
function getIdea() {
    var $boxIdeas = $('#boxIdeas');
    var $base_url = "https://607599690baf7c0017fa68ac.mockapi.io/api/telkomsel/ideas/";

    $.ajax({
        type: 'GET',
        url: $base_url,
        success: function(ideas) {
            $.each(ideas, function(i, idea){
                $boxIdeas.append(
                    "<div class='list-idea'><h1 class='title'>" + idea.title + 
                    "</h1><p class='body'>" + idea.body + 
                    "<ul class='action-button'><li class='btn-edit' data-id='" + idea.id + "' data-created-date='" + idea.created_date + "'><i class='far fa-edit'></i></li><li class='btn-delete' data-id='" + idea.id + "'><i class='far fa-trash-alt'></i></li></ul></p><div>");
            });
        },
        error: function() {
            alert('error loading ideas');
        }
    });
}

// This is function for open form add data
function openFormAdd() {
    $('#openFormAdd').click(function(){
        $('.box-form').css('top', '0');
        $('.box-main .box-inner').css('overflow', 'hidden');
        $('.box-form #title').focus();
    });
}


// This is function for add data
function addIdea() {
    var $boxIdeas = $('#boxIdeas');
    var $title = $('#title');
    var $body = $('#body');
    var $boxForm = $('.box-form');
    var $boxInner = $('.box-main .box-inner');
    var $base_url = "https://607599690baf7c0017fa68ac.mockapi.io/api/telkomsel/ideas/";

    var $newDate = new Date();
    var $month = $newDate.getMonth()+1;
    var $day = $newDate.getDate();

    var $date = $day + "/" + $month + "/" + $newDate.getFullYear();

    $('#addIdea').click(function(){
        var ideas = {
            created_date: $date,
            title: $title.val(),
            body: $body.val()
        }

        $.ajax({
            type: 'POST',
            url: $base_url,
            data: ideas,
            success: function(newIdea) {
                clearForm();
                $boxIdeas.append(
                    "<div class='list-idea'><h1 class='title'>" + newIdea.title + 
                    "</h1><p class='body'>" + newIdea.body + 
                    "<ul class='action-button'><li class='btn-edit' data-id='" + newIdea.id + "' data-created-date='" + newIdea.created_date + "'><i class='far fa-edit'></i></li><li class='btn-delete' data-id='" + newIdea.id + "'><i class='far fa-trash-alt'></i></li></ul></p><div>");
                $boxForm.css("top", "-100%");  
                $boxInner.css("overflow-y", "auto");  
                setTimeout(editIdea, 2000);
                setTimeout(deleteIdea, 2000);
            },
            error: function() {
                alert('error saving idea');
            }
        });
    });
}

// This is function for edit data
function editIdea() {
    var $id = $('#idIdea');
    var $created_date = $('#created-date');
    var $title = $('#title');
    var $body = $('#body');
    var $boxInner = $('.box-main .box-inner');
    var $boxForm = $('.box-inner .box-form');

    $('.btn-edit').click(function(){
        var getId = $(this).attr("data-id");
        var getCreatedDate = $(this).attr("data-created-date");
        var getTitle = $(this).parent().parent().find('.title').text();
        var getBody = $(this).parent().parent().find('.body').text();
        $boxInner.animate({ scrollTop: 0 }, "fast");
        $boxForm.css('top', '0');
        $boxInner.css('overflow', 'hidden');
        $id.parent().removeClass('hidden');
        $created_date.parent().removeClass('hidden');
        $id.val(getId);
        $created_date.val(getCreatedDate);
        $title.val(getTitle);
        $body.val(getBody);
        $('#addIdea').addClass('hidden');
        $('#updateIdea').removeClass('hidden');
    });
}

// This is function for update data
function updateIdea() {
    var $boxIdeas = $('#boxIdeas');
    var $id = $('#idIdea');
    var $created_date = $('#created-date');
    var $title = $('#title');
    var $body = $('#body');
    var $boxForm = $('.box-form');
    var $boxInner = $('.box-main .box-inner');
    var $base_url = "https://607599690baf7c0017fa68ac.mockapi.io/api/telkomsel/ideas/";
    $('#updateIdea').click(function(){
        var ideas = {
            created_date: $created_date.val(),
            title: $title.val(),
            body: $body.val()
        }

        $.ajax({
            type: 'PUT',
            url: $base_url + $id.val(),
            data: ideas,
            success: function(data) {
                alert('succes update idea');
                clearForm();
                $boxIdeas.empty();
                getIdea();
                $id.addClass('hidden');
                $created_date.addClass('hidden');
                $('#addIdea').removeClass('hidden');
                $('#updateIdea').addClass('hidden');
                $boxForm.css("top", "-100%");  
                $boxInner.css("overflow-y", "auto");  
                setTimeout(deleteIdea, 2000);
            },
            error: function() {
                alert('error update idea');
            }
        });
    });
}

// This is function for delete data
function deleteIdea() {
    var $boxIdeas = $('#boxIdeas');
    var $base_url = "https://607599690baf7c0017fa68ac.mockapi.io/api/telkomsel/ideas/";
    $('.btn-delete').click(function(){
        var $id = $(this).attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: $base_url + $id,
            success: function(data) {
                alert('succes delete idea');
                $boxIdeas.empty();
                getIdea();
            },
            error: function() {
                alert('error update idea');
            }
        });
    });
}

//This is function for clearing form
function clearForm() {
    $("#idIdea").val("");
    $("#created-date").val("");
    $("#title").val("");
    $("#body").val("");
}

// This function cancel
function cancel() {
    $('#btnCancel').click(function(){
        var $boxForm = $('.box-form');
        var $boxInner = $('.box-main .box-inner');
        $boxForm.css("top", "-100%");  
        $boxInner.css("overflow-y", "auto");  
    })
}

// This is function for counter char
function countChar(val) {
    var len = val.value.length;
    if (len >= 10000) {
        val.value = val.value.substring(50, 10000);
    } else {
        $('#charNum').text(140 - len);
    }
};