//create variable to save dynamic API url
// create variable to save value from input
/* create on click function for submit button that dynamically creates a new button and
appends it to */
/*create ajax function that retrieves ten gifs info and creates img tags for each gif 
and gives them appropriate sources/class/data-types then appends said images to the gif
 div after first emptying the div*/
/*create on click function for dynamic buttons that runs ajax function with the value
of said button as the search parameter */

$('#submit-button').on('click', function(){
    if($('#userInput').val()=== ""){
        return false
    }
    var newButton = $('<button>')
    newButton.html($('#userInput').val().trim())
    newButton.addClass('animalButton')
    
    $('#button-container').append(newButton)
})



function runGiphy(){
    var buttonValue = $(this).html();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+buttonValue+"&api_key=s0uzBvZxQEQz029VVqfXFvHFYuMKWBiT&limit=10"
   
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){
        console.log(response)
        $('#gif-container').empty()
        var results = response.data
        for(i = 0;i<results.length;i++) {
            console.log(results[i])
            var newP = $('<p>')
            newP.html('Rating: '+results[i].rating)
            $('#gif-container').append(newP)
            
            var newGif = $('<img>')
            newGif.attr('src', results[i].images.fixed_height_still.url)
            newGif.attr('data-still', results[i].images.fixed_height_still.url)
            newGif.attr('data-animate', results[i].images.fixed_height.url)
            newGif.attr('data-state', 'still')
            
           $("#gif-container").append(newGif)
           

            
        }

    })
}
function changeImgState(){
    var dataState = $(this).attr('data-state')
    if (dataState === 'still'){
        $(this).attr('data-state', 'animate')
        $(this).attr('src', $(this).attr('data-animate'))
    }else{
        $(this).attr('data-state', 'still')
        $(this).attr('src', $(this).attr('data-still'))
    }
}
$(document).on('click', '.animalButton', runGiphy)
$(document).on('click', 'img', changeImgState)
