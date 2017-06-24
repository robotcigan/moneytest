$(document).ready(function () {
	var point = 0;

	$('.question label').on('click', function(){
		
		if ($("input:checked").length >= 11) {
			$(".third-container .btn").removeClass("not-active");
		}

		var count = $('input:checked').length;
		$('span.num').html(count);
		
	});
	
	$('.third-container .btn').on('click', function(){
	
	$(this).hide();
	$('.third-container .text-center').empty();
	$('.third-container .text-center').append('<p><b>Идёт подсчет баллов</b></p>');
    $('.third-container .placeload').append('<img class="imageload" src="load.gif">');
		
			var countQ = $('input:checked').length;
					
			for ( var i = 0; i < countQ; i++ ) {
				point = point + parseInt($('input:checked').eq(i).val());
			}	
			
			window.setTimeout(function ()
			{
				$('.final-box').show();
				  $(this).hide();
				  $('.third-container .text-center').empty();
				  $('.third-container .text-center').append('<p>Даны ответы на все вопросы</p>');
				  $('.third-container .placeload').empty();
				  $('html, body').animate({
					scrollTop: $('.final-box').offset().top
				  }, 1000);
			}, 2500);

			  return false;

			  if ($(window).outerWidth() < 710)
				$('html, body').animate({
				  scrollTop: (-1) * h
				});

			  return false;
			  

	});
	
	function validation() {
		var mail = $('.final-box').find('input[name="mail"]').val();
		if(!mail) { alert('Заполните поле email') }
		else { return mail }
	}
	
	function validationname() {
		var name = $('.final-box').find('input[name="name"]').val();
		if(!name) { alert('Заполните поле имя') }
		else { return name }
	}
	
	function sendData(score, email, username) {
		var data = new Array();
		
		data.push({name: 'point', value: score});
		data.push({name: 'email', value: email});
		data.push({name: 'name', value: username});
		
		$.ajax({
			url: 'sendmail.php',
			data: data,
			type: 'POST',
			dataType: 'html',
			success: function (datas) {
				console.log(datas);
			}
		});
	}

	
	$('.final-box .btn').on('click', function(){
		if(validation()) {
			var email = validation(),
			name = validationname(),
			score = point;
			if ( score <= 4 ) {
				sendData(score, email, name);
				$('#exampleModal5_active').arcticmodal();
				//document.location.href = "pointsmall.html";
			} else if ( score >= 4 && score <= 8 ) {
				$('#exampleModal5_active').arcticmodal();
				sendData(score, email, name);
				//document.location.href = "pointmedium.html";
			} else if ( score >= 9 ) {
				$('#exampleModal5_active').arcticmodal();
				sendData(score, email, name);
				//document.location.href = "pointbig.html";
			}
		}
	});
	
	
});