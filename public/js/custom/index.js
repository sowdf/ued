jQuery(document).ready(function(){
								
	///// TRANSFORM CHECKBOX /////							
	jQuery('input:checkbox').uniform();
	
	///// LOGIN FORM SUBMIT /////
	jQuery('#login').submit(function(ev){
		var username = jQuery('#username').val();
		var password = jQuery('#password').val();
		if(username == '' && password == '') {
			jQuery('.nousername').fadeIn();
			jQuery('.nopassword').hide();
			return false;	
		}

        jQuery.post('/admin/login',{username:username,password:password},function(data){
			if(data.code == 100){
                setTimeout(function(){
                    location.href = '/admin';
                },1000)
			}else{
                jQuery('.nopassword').fadeIn().find('.userlogged h4, .userlogged a span').text(jQuery('#username').val());
                jQuery('.nousername,.username').hide();
			}
		});
        ev.preventDefault();
        ev.stopPropagation();
	});
	
	///// ADD PLACEHOLDER /////
	jQuery('#username').attr('placeholder','Username');
	jQuery('#password').attr('placeholder','Password');
});
