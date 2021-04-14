getIdea();
addIdea();
setTimeout(editIdea, 2000);
updateIdea();

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

// This is function for add data
function addIdea() {
    var $boxIdeas = $('#boxIdeas');
    var $title = $('#title');
    var $body = $('#body');
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

    $('.btn-edit').click(function(){
        var getId = $(this).attr("data-id");
        var getCreatedDate = $(this).attr("data-created-date");
        var getTitle = $(this).parent().parent().find('.title').text();
        var getBody = $(this).parent().parent().find('.body').text();
        $id.removeClass('hidden');
        $created_date.removeClass('hidden');
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