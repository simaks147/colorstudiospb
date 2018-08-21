$(document).ready(function() {
	
	$(".submit-btn").click(function() {

		var $this = $(this),
			form = $this.closest('form'),
			name = form.find('input[name = "name"]').val(),
			tel = form.find('input[name = "tel"]').val(),
			type = form.find('input[name = "type"]').val(),
			to = form.find('input[name = "to"]').val(),
			txt = form.find('textarea[name = "txt"]').val();
			if (!name) {
				name = "";
			}
			if (!txt) {
				txt = "";
			}
		
		$this.attr('disabled',true);

		if (tel !="") {
				
			$.ajax({
				type: "POST",
				data: "name="+name+"&tel="+tel+"&type="+type+"&to="+to+"&txt="+txt,
				url: window.location.origin+'/assets/message/',
				success: function(data) {
					if (data) {
						// Materialize.toast('Спасибо, ваша заявка принята!', 4000);
						$('#modal-submit').modal('close');
						location.assign(window.location.origin+'/zayavka-otpravlena');
					} else {
						Materialize.toast('Ошибка отправки!', 4000);
						$this.attr('disabled',false);
					}
				},
				error: function() {
					Materialize.toast('Ошибка отправки!', 4000);
					$this.attr('disabled',false);
				}
			});

		} else {
			Materialize.toast('Введите телефон!', 4000);
			$this.attr('disabled',false);
		}

	});
	
});
