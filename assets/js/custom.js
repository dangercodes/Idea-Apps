getIdea();

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