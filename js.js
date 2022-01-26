//saving the array in data
var data = getItems();

//change li to line-through
$("body").on("click", 'li', function (){
    $(this).toggleClass("active");
    //получить дата-ид в переменную
    var lineThroughItem = $(this).children().data('id');
    //сделать дата[переменнаявыше].активе = 1
    if (data[lineThroughItem].active == 1) {
        data[lineThroughItem].active = 0;
    } else {
        data[lineThroughItem].active = 1;
    }
    //сохранить и вывести
    saveData();
    show();
})

//delete li
$('body').on("click", "li span", function (event){
    event.stopPropagation();
    $(this).parent().remove();
    var removaAction = $(this).data('id');
    data.splice(removaAction, 1);
    saveData();
    show();
})

//add new li
$("#input-item").on('keypress', function(e) {
    var newListItem = $(this).val();

    if ($('#input-item').val().length != ''){
        if(e.which == 13) {
            if($('input[type=radio][value=red-list]').is(":checked")){
                data.push({
                    value: newListItem,
                    type: 1,
                    active: 0
                });
                saveData();
                show();
            } else if ($('input[type=radio][value=green-list]').is(":checked")){
                data.push({
                    value: newListItem,
                    type: 2,
                    active: 0
                });
                saveData();
                show();
            }
            $("#input-item").val("");
        }
    }
});

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(data));
}

function getItems() {
    var strTask = localStorage.getItem("tasks");
    if (strTask==undefined) return [];
    return JSON.parse(strTask);
}

function show() {
    data = getItems();
    $(".task").remove();
    for (var i =0; i < data.length; i++){
        var className = "";
        var isActive = "";

        if (data[i].type == 1){
            className = "color-red";
        } else {
            className = "color-green";
        }

        if (data[i].active == 1){
            isActive = " active";
        }
        $('ul').append('<li class = "task ' + className + isActive + '">' + data[i].value + '<span data-id = "' + i + '"><i class="fas fa-trash-alt"></i></span></li>');

    }
}

show();