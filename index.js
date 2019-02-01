var gatys_active = false;
var gatys_progress = 0;
var gan_progress = 0;
var gan_active = false;

//-----------------------------------------------------------------------------
//  Start generating image using gatys method
function gatys_button(){
    console.log('poress')
    gatys_active = true;
    gatys_progress = 0;
    $('#gatys_button').hide()
    $('#gatys_progress_container').show();  
}
function disable_gatys(){
    $('#gatys_button').show()
    $('#gatys_progress_container').hide(); 
    gatys_active = false;
    gatys_progress = 0; 
}

//-----------------------------------------------------------------------------
//  Start generating image using gan method
function gan_button(){
    gan_active = true;
    gan_progress = 0;
    $('#gan_button').hide()
    $('#gan_progress_container').show();
}
function disable_gan(){
    $('#gan_button').show()
    $('#gan_progress_container').hide(); 
    gan_active = false;
    gan_progress = 0; 
}

//-----------------------------------------------------------------------------
//  Display the selected source image
function show_source_image(){
    disable_gatys()
    disable_gan()
    var source = $('#source_select').val()
    $("#source_image").attr("src", 'textures/cropped/'+ source + '.jpg');
}

//-----------------------------------------------------------------------------
//  Initialise
$(document).ready(function() {
    $('#gatys_progress_container').hide();
    $('#gan_progress_container').hide();
    show_source_image();
});

//-----------------------------------------------------------------------------
//  Loop
setInterval(function(){
    if(gatys_active){
        gatys_progress++;
        percent = (100/253)*gatys_progress + 1; 
        $('#gatys_progress').css('width', percent + '%');
        var source = $('#source_select').val()
        $("#gatys_image").attr("src", 'textures/gatys/' + source + '/' + gatys_progress + '.jpg');
        if(gatys_progress > 252){
            disable_gatys()
        }  
    }
    if(gan_active){
        gan_progress++;
        percent = (100/253)*gan_progress + 1; 
        $('#gan_progress').css('width', percent + '%');
        var source = $('#source_select').val()
        $("#gan_image").attr("src", 'textures/gan/' + source + '/' + gan_progress + '.jpg');
        if(gan_progress > 252){
            disable_gan()
        } 
    }
}, 50)