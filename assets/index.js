function register(){
		var username = $('input:text').val();
		var email = $('input[name=\'email\']').val();
		var password = $('input:password').val();
		var username_length = username.length;
		var email_length = email.length;
		var password_length=password.length;
		if(username_length === 0 || email_length === 0 || password_length === 0){
			alert("You must fill all the fields in order to sign up.");
		}else{
			$.ajax({
				url: '/api/register',
				method: 'post',
				data: { username: username, email: email, password: password},
				dataType: 'Json',
				success: (data)=>{
					console.log(data[0].message);
					if(data[0].success){
						alert("Registration successful. You will be redirected to the Login page.");
						loadLogin(data);
					}else{

					$('.message').remove();
					var message = $('<div>').html('');
					message.html(data[1].message)
						   .addClass("message");
					$('.register_form').append(message);
					console.log(data[1].message);
					}
				}
			});
		}
}

function login(){
	var email = $('input[name=\'email\']').val();
	var password = $('input:password').val();
	var email_length=email.length;
	var password_length=password.length;
	if(email_length === 0 || password_length === 0){
		alert("You must fill all the fields in order to log in");
	}else{
		$.ajax({
				url: '/api/login',
				method: 'post',
				data: {email: email, password: password},
				dataType: 'Json',
				success: (data)=>{
					if(data[0].success){
						//main();
						$.ajax({
							url: '/main',
							datatype: 'Json',
							method: 'post',
							success: (data)=>{
								window.location.href = data;
							}
						});
					}else{
						$('.message').remove();
						var message = $('<div>').html('');
						message.html(data[1].message)
							.addClass("message");
						$('.register_form').append(message);
						console.log(data[1].message);
					}
				}
			});
	}
}


function loadRegister(){
	$('.message').remove();
	$('.login_form').remove();

	var header = $('<div>').addClass('header');
	var form = $('<div>').addClass('register_form');
	var img = $('<img>').attr({
					'src' : 'cloudy.jpg',
					'id' : 'img_cloud2'
					})
					.css({
						'vertical-align' : 'text-bottom',
						'margin-left' : '20px'
					});
	var span = $('<span>').css('font-size', '24pt').html('Cloudy');
	var button = $('<button>').css({
						'font-size': '13pt',
						'position' : 'absolute',
						'top' : '3%',
						'right' : '10%'
						})
						.attr({
							'class' : 'button button-small secondary',
							'type' : 'submit',
							'name' : 'Login',
							'value' : 'Login',
							'onclick' : 'loadLogin("empty")'
						})
						.html('Log In');
	$(header).append($('<br />'));
	$(header).append(img);
	$(header).append(span);
	$(header).append(button);

	var p = $('<p>');
	span = $('<span>').css('font-size', '20pt').html('Sign up. It\'s free!');
	$(p).append(span);
	$(p).append($('<br />'));
	$(form).append(p);
	var registerForm = $('<div>').addClass('registerForm');
	var input = $('<input>').attr({
							'id' : 'field',
							'type' : 'text',
							'name' : 'username',
							'placeholder' : 'Enter your full name'
							});
	$(p).append(input);
	$(p).append($('<br />'));
	$(p).append($('<br />'));
	$(registerForm).append(p);
	input = $('<input>').attr({
							'id' : 'field',
							'type' : 'email',
							'name' : 'email',
							'placeholder' : 'Enter your e-mail address'
						});
	$(p).append(input);
	$(p).append($('<br />'));
	$(p).append($('<br />'));
	$(registerForm).append(p);

	input = $('<input>').attr({
							'id' : 'field',
							'type' : 'password',
							'name' : 'password',
							'placeholder' : 'Create your password'
						});
	$(p).append(input);
	$(p).append($('<br />'));
	$(p).append($('<br />'));
	$(registerForm).append(p);
	$(registerForm).append($('<br />'));

	var button = $('<button>').css('width', '100%').attr({
								'class' : 'button button-big primary',
								'type' : 'submit',
								'name' : 'SignUp',
								'value' : 'SignUp',
								'onclick' : 'register()'
							}).html('Sign Up');
	$(registerForm).append(button);
	$(form).append(registerForm);
	$('body').append(header);
	$('body').append(form);
}

function loadLogin(data){
	var message = $('<div>').addClass('message');
	var login_form = $('<div>').addClass('login_form');
	if(data != 'empty'){
		$('.message').html('');
		$('.message').html(data[1].message);
	}
	$('.header').remove('');
	$('.register_form').remove('');

	var intro = $('<div>').attr('align','center').addClass('intro');
	var cloudy = $('<div>').addClass('cloudy');
	var sequence = $('<div>').addClass('sequence');

	$(login_form).append(intro);
	$(intro).append(cloudy);
	$(intro).append(sequence);
	$(intro).append($('<br />'));

	var img = $('<img>').attr({
					'src' : 'cloudy.jpg',
					'id' : 'img_cloud1'
					})
					.css('vertical-align','text-bottom');
	var span = $('<span>').css('font-size', '36pt').html('Cloudy');
	$(cloudy).append(img);
	$(cloudy).append(span);

	span = $('<span>').css('font-size', '20pt').html('with a chance of big data');
	$(sequence).append(span);

	var form = $('<div>').attr('name','loginForm');
	$(login_form).append(form);

	var p = $('<p>');
	var input = $('<input>').attr({
							'id' : 'field',
							'type' : 'email',
							'name' : 'email',
							'placeholder' : 'Enter your e-mail address'
						});
	$(p).append(input);
	$(p).append($('<br />'));
	$(p).append($('<br />'));
	input = $('<input>').attr({
							'id' : 'field',
							'type' : 'password',
							'name' : 'password',
							'placeholder' : 'Enter your password'
						});
	$(p).append(input);
	$(form).append(p);
	$(form).append($('<br />'));

	var button = $('<button>').css('width', '100%').attr({
								'class' : 'button button-big primary',
								'type' : 'submit',
								'name' : 'Login',
								'value' : 'Login',
								'onclick' : 'login()'
							}).html('Log In');
	$(form).append(button);
	$(login_form).append(form);
	$(login_form).append($('<br />'));
	p = $('<p>').attr('align','center');
	span = $('<span>').css('font-size', '14pt').html('Not a member?');
	$(p).append(span);
	$(login_form).append(p);
	button = $('<button>').css('width', '100%').attr({
								'class' : 'button button-big secondary',
								'type' : 'submit',
								'name' : 'SignUp',
								'value' : 'SignUp',
								'onclick' : 'loadRegister()'
							}).html('Sign Up');
	$(login_form).append(button);
	$('body').append(message);
	$('body').append(login_form);
}

function main(){
	$('.login_form').remove();
	$('.message').remove();
	var header = $('<div>').addClass('header');
	var img = $('<img>').attr({
					'src' : 'cloudy.jpg',
					'id' : 'img_cloud2'
					})
					.css({
						'vertical-align' : 'text-bottom',
						'margin-left' : '20px'
					});
	var span = $('<span>').css('font-size', '24pt').html('Cloudy');
	var button = $('<button>').css({
						'font-size': '13pt',
						'position' : 'absolute',
						'top' : '3%',
						'right' : '10%'
						})
						.attr({
							'class' : 'button button-small primary',
							'type' : 'submit',
							'name' : 'Logout',
							'value' : 'Logout',
							'onclick' : 'loadLogin("empty")'
						})
						.html('Log Out');
	$(header).append($('<br />'));
	$(header).append(img);
	$(header).append(span);
	$(header).append(button);

	$('body').append(header);
	$(document).ready(()=>{data()});
}

function data(){
	console.log("data");
	$.ajax({
		url: '/api/find/folders',
		method: 'post',
		dataType: 'Json',
		success: (data)=>{
			console.log(data);
			for(let x of data){
				var files = $('<div>');
				files.html(x._id);
				$('body').append(files);
			}
		}
	});
}
