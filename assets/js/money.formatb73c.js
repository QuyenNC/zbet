/**
 * format money (ex: 2,000)
 */
(function ($) {
	$.fn.moneyFormat = function() {
		this.each(function(index, el) {		
			var elType = null; // input or other
			var value = null;
			// get value
			if($(el).is('input') || $(el).is('textarea')){
				value = $(el).val().replace(/[^0-9]/g, '').replace(/,/g, '');
				if (parseInt(value) < 1) 
					value = 0;
				elType = 'input';
			} else {
				value = $(el).text().replace(/[^0-9]/g, '').replace(/,/g, '');
				if (parseInt(value) < 1) 
					value = 0;
				elType = 'other';
			}
			// if value changes
			$(el).on('paste keydown keyup', function(){
				value = $(el).val().replace(/[^0-9]/g, '').replace(/,/g, '');
				if (parseInt(value) < 1) 
					value = 0;
				formatElement(el, elType, value); // format element
			});

			formatElement(el, elType, value);
		});
		function formatElement(el, elType, value){
			if (value == 0) {
				$(el).val('');
				return;
			}
			var result = '';
			var valueArray = value.split('');
			var resultArray = [];
			var counter = 0;
			var temp = '';
			for (var i = valueArray.length - 1; i >= 0; i--) {
				temp += valueArray[i];
				counter++
				if(counter == 3){
					resultArray.push(temp);
					counter = 0;
					temp = '';
				}
			};
			if(counter > 0){
				resultArray.push(temp);				
			}
			for (var i = resultArray.length - 1; i >= 0; i--) {
				var resTemp = resultArray[i].split('');
				for (var j = resTemp.length - 1; j >= 0; j--) {
					result += resTemp[j];
				};
				if(i > 0){
					result += ','
				}
			};

			if(elType == 'input'){
				$(el).val(result);
			} else {
				$(el).empty().text(result);
			}
		}
	};
}(jQuery));