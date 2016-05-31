function check(){
	$.ajax({
		url: '/api/find/folders',
		method: 'post',
		data: { username: username, email: email, password: password},
		dataType: 'Json',
		success: (data)=>{
			for(let x in data){
				console.log(x.original_name);
			}
		}
	});
}