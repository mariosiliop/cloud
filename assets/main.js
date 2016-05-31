function check(data){
	$.ajax({
		url: '/api/find/folders',
		method: 'post',
		data: {fid: data},
		dataType: 'Json',
		success: (data)=>{

			$('#message').remove();
			if (data[0].message) {
				var message = $('<span>').html(data[0].message).attr('id', 'message');

				message.css({
					'border': '1px solid black',
					'font-size': '20px',
					'position': 'absolute',
					'left': '48%'
				});

				$('body').append(message);
			} else {
			$('#menu').remove();
			$('#content').remove();
			var parent = $('<div>').css({
				'width': '70%',
				'position': 'absolute',
				'left': '15%'
			})
		  .attr('id', 'content');

			var options = $('<div>').attr('id','menu');

			var new_folder = $('<button>').attr({
														'class' : 'button button-small secondary',
														'type' : 'submit',
														'fid' : data[0].parent,
														'value' : 'Login'
													}).css({
														'font-size': '13pt',
														'position' : 'absolute',
														'top' : '20%',
														'left': '5%',
														'width': '120px'
													})
													.html('New Folder');

			var new_file = $('<button>').attr({
														'class' : 'button button-small secondary',
														'type' : 'submit',
														'name' : 'Login',
														'value' : 'Login'
													}).css({
														'font-size': '13pt',
														'position' : 'absolute',
														'top' : '30%',
														'left': '5%',
														'width': '120px'
													})
													.html('Upload');

			var back = $('<button>').attr({
														'class' : 'button button-small secondary',
														'type' : 'submit',
														'name' : 'Login',
														'value' : 'Login'
													}).css({
														'font-size': '13pt',
														'position' : 'absolute',
														'top' : '50%',
														'left': '5%',
														'width': '120px'
													})
													.html('Back')
													.click(() => {
														console.log('BACK');
														$.ajax({
															url: '/api/back/folders',
															method: 'post',
															data: {fid:data[0].parent},
															dataType: 'json',
															success: (data) => {
																console.log(data);
																check(data[0].parent);
															}
														});
													});

			$(options).append(new_folder);
			$(options).append(new_file);
			$(options).append(back);
			$('body').append(options);

			for(let x of data){

				if (x.folder_name) {
					var div = $('<div>').addClass('primary-main')
											  .attr('id', 'content');

					var file = $('<img>').attr({
												 'src': 'folder.png'
											 })
											 .css({
												 'width': '110px',
												 'height': '110px',
												 'cursor': 'pointer'
											 })
											 .html('geia sou!')
											 .click(() => {
												 check(x.fid);
											 });

					 var span = $('<span>').html(x.folder_name);

					$(div).append(file);
					$(div).append(span);
					$(parent).append(div);
					$('body').append(parent);

				} else {

					var div = $('<div>').addClass('primary-main');

					var img = $('<img>').attr({
						'src': 'storage' + x.port + '/' + x.file
					}).css({
						'width': '110px',
						'height': '110px',
						'cursor': 'pointer'
					});


					var span1= $('<span>').html(x.original_name);

					$(div).append(img);
					$(div).append(span1);
					$(parent).append(div);
					$('body').append(parent);

				}

			}
		}
		}
	});
}
