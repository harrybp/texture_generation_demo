var gatys_active = false;
var gatys_progress = 0;
var gan_progress = 0;
var gan_active = false;
var dc_gan_active = false;
var dc_gan_progress = 0;

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
    $('#gatys_progress').css('width', '0%');
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
    $('#gan_progress').css('width', '0%');
    gan_active = false;
    gan_progress = 0; 
}
//-----------------------------------------------------------------------------
//  Start generating image using gan method
function dc_gan_button(){
    dc_gan_active = true;
    dc_gan_progress = 0;
    $('#dc_gan_button').hide()
    $('#dc_gan_progress_container').show();
}
function disable_dc_gan(){
    $('#dc_gan_button').show()
    $('#dc_gan_progress_container').hide(); 
    $('#dc_gan_progress').css('width', '0%');
    dc_gan_active = false;
    dc_gan_progress = 0; 
}

//-----------------------------------------------------------------------------
//  Display the selected source image
function show_source_image(){
    disable_gatys()
    disable_gan()
    var source = $('#source_select').val()
    $("#source_image").attr("src", 'textures/'+ source + '/cropped.jpg');
}

loaded = 0;
total_images = 1970
function increment_loaded(){
    loaded++;
    percent = ((100/total_images)*loaded)
    $('#loading_progress').css('width', percent + '%')
    if(loaded == total_images){
        $('.initial').each(function(i, obj){
            $(obj).show()
        });
        $('#loading_progress_container').hide();
        console.log('loaded')
    }
}

function preload(){
    image_list = ['bricks', 'painting', 'pebbles', 'water', 'snake']
    for(var i in image_list){
        console.log(image_list[i])
        for(var j = 0; j < 330; j+=1){
            if(j < 64){
                var img1 = new Image();
                img1.onload = increment_loaded;
                img1.src = 'textures/' + image_list[i] + '/gatys/' + j + '.jpg'
            }
            if(j % 2 == 0){
                var img2 = new Image()
                img2.onload = increment_loaded;
                img2.src = 'textures/' + image_list[i] + '/gan/' + j + '.jpg'
            }
            if(j % 2 == 0){
                var img3 = new Image()
                img3.onload = increment_loaded;
                img3.src = 'textures/' + image_list[i] + '/dc_gan/' + j + '.jpg'
            }
            
        }
    }
    
}



//-----------------------------------------------------------------------------
//  Initialise
$(document).ready(function() {
    $('.initial').each(function(i, obj){
        $(obj).hide()
    });
    $('#gatys_progress_container').hide();
    $('#gan_progress_container').hide();
    $('#dc_gan_progress_container').hide();
    show_source_image();
    preload()
});

//-----------------------------------------------------------------------------
//  Loop
setInterval(function(){
    
    if(gan_active){
        gan_progress+=2;
        percent = (100/320)*gan_progress + 1; 
        $('#gan_progress').css('width', percent + '%');

        if(gan_progress < 200)
            iterations = (gan_progress+1) * 50;
        else if(gan_progress < 265)
            iterations = 10000 + (gan_progress - 199)*150
        else 
            iterations = 20000 + (gan_progress - 264)*300
        $('#gan_progress').text(iterations);

        var source = $('#source_select').val()
        $("#gan_image").attr("src", 'textures/' + source + '/gan/' + gan_progress + '.jpg');
        if(gan_progress > 330){
            disable_gan()
        } 
    }
    if(dc_gan_active){
        dc_gan_progress+=2;
        percent = (100/320)*dc_gan_progress + 1; 
        $('#dc_gan_progress').css('width', percent + '%');

        if(dc_gan_progress < 200)
            iterations = (dc_gan_progress+1) * 50;
        else if(dc_gan_progress < 265)
            iterations = 10000 + (dc_gan_progress - 199)*150
        else 
            iterations = 20000 + (dc_gan_progress - 264)*300
        $('#dc_gan_progress').text(iterations);

        var source = $('#source_select').val()
        $("#dc_gan_image").attr("src", 'textures/' + source + '/dc_gan/' + dc_gan_progress + '.jpg');
        if(dc_gan_progress > 330){
            disable_dc_gan()
        } 
    }
}, 50)

setInterval(function(){
    if(gatys_active){
        gatys_progress+=1;
        percent = (100/64)*gatys_progress + 1; 
        $('#gatys_progress').css('width', percent + '%');
        
        if(gatys_progress < 50)
            iterations = gatys_progress + 1;
        else if(gatys_progress < 60)
            iterations = 50 + (gatys_progress - 49)*5
        else 
            iterations = 100 + (gatys_progress - 59)*10
        $('#gatys_progress').text(iterations);

        var source = $('#source_select').val()
        $("#gatys_image").attr("src", 'textures/' + source + '/gatys/' + gatys_progress + '.jpg');
        if(gatys_progress >= 64){
            disable_gatys()
        }  
    }
}, 130)