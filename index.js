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

loaded = 0;
function increment_loaded(){
    loaded++;
    if(loaded == 1530){
        $('#gan_button').removeAttr("disabled");
        $('#gatys_button').removeAttr("disabled");
        $('#both_button').removeAttr("disabled");
    }
    
}

function preload(){
    image_list = ['bricks', 'painting', 'lava', 'pebbles', 'water', 'snake']
    for(var i in image_list){
        console.log(image_list[i])
        for(var j = 0; j < 255; j+=2){
            var img1 = new Image();
            img1.onload = increment_loaded;
            img1.src = 'textures/gatys/' + image_list[i] + '/' + j + '.jpg'
            var img2 = new Image()
            img2.onload = increment_loaded;
            img2.src = 'textures/gan/' + image_list[i] + '/' + j + '.jpg'
        }
    }
    
}

imagesLoaded( document, function( instance ) {
    console.log('all images are loaded');
  });
//-----------------------------------------------------------------------------
//  Initialise
$(document).ready(function() {
    $('#gatys_progress_container').hide();
    $('#gan_progress_container').hide();
    show_source_image();
    preload()
});

//-----------------------------------------------------------------------------
//  Loop
setInterval(function(){
    if(gatys_active){
        gatys_progress+=2;
        percent = (100/253)*gatys_progress + 1; 
        $('#gatys_progress').css('width', percent + '%');
        var source = $('#source_select').val()
        $("#gatys_image").attr("src", 'textures/gatys/' + source + '/' + gatys_progress + '.jpg');
        if(gatys_progress > 252){
            disable_gatys()
        }  
    }
    if(gan_active){
        gan_progress+=2;
        percent = (100/253)*gan_progress + 1; 
        $('#gan_progress').css('width', percent + '%');
        var source = $('#source_select').val()
        $("#gan_image").attr("src", 'textures/gan/' + source + '/' + gan_progress + '.jpg');
        if(gan_progress > 252){
            disable_gan()
        } 
    }
}, 50)