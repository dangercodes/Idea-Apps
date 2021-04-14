getIdea();
addIdea();

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

//This is function for clearing form
function clearForm() {
    $("#idIdea").val("");
    $("#created-date").val("");
    $("#title").val("");
    $("#body").val("");
}