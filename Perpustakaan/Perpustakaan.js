document.addEventListener("DOMContentLoaded", function(event){
	var list_lib = "Perpustakaan/config_json/ListPerpusKepuharjo.json"
	var data2write = document.getElementById("id_dropdown_lokasi")
	var str2append = ""

	var http_req = new XMLHttpRequest()
	http_req.onreadystatechange = function(){
		if(http_req.readyState == 4){
			// str2append += "<option value='Semua'>Semua</option>"
			
			var json_lib_obj = JSON.parse(http_req.responseText)

			for(var p=0; p<Object.size(json_lib_obj); p++){
				var pp1 = p+1
				var vp = pp1.toString()

				str2append += "<option value='" + json_lib_obj[vp] + "'>Perpustakaan " + json_lib_obj[vp] + "</option>"
			}
			data2write.innerHTML = str2append
		}
	}
	http_req.open("GET", list_lib, true);
http_req.send();
});


document.addEventListener("DOMContentLoaded", function(event){
	var list_field = "Perpustakaan/config_json/ListField.json"
	var field2write = document.getElementById("id_field_option")
	var str_fld2append = ""

	var htpr = new XMLHttpRequest()
	htpr.onreadystatechange = function(){
		if(htpr.readyState == 4){
			// str_fld2append += "<option value='Semua'>Semua Field</option>"

			var json_field_obj = JSON.parse(htpr.responseText)
			for(var f=0; f<Object.size(json_field_obj); f++){
				var f1 = f+1
				var sf = f1.toString()

				str_fld2append += "<option value='" + json_field_obj[sf] + "'>" + json_field_obj[sf] + "</option>"
			}

			field2write.innerHTML += str_fld2append
		}
	}
	htpr.open("GET", list_field, true)
	htpr.send()
});

document.addEventListener("DOMContentLoaded", function(event){
	document.getElementById("Tabel Perpustakaan").style.display = "none"
});

function showTabel(table_name, data_file_){
	document.getElementById("Tabel Perpustakaan").innerHTML = ""

	var http_request = new XMLHttpRequest()
	http_request.onreadystatechange = function(){
		myCallback(http_request);
	};

	http_request.open("GET", data_file_, true);
http_request.send();

	document.getElementById(table_name).style.display = "block"
};

function hideTabel(table_name){
	document.getElementById(table_name).style.display = "none"
}
function myInputText(){
	var text_isi = document.getElementById("input_text_id").value
	return text_isi;
}


document.addEventListener("DOMContentLoaded", function(event){
   		document.getElementsByClassName("tablinks")[0].click()
   	});

function openTab(evt, tabName) {
  var i, konten_tab, tablinks;

  // Get all elements with class="konten_tab" and hide them
  konten_tab = document.getElementsByClassName("konten_tab");
  for (i = 0; i < konten_tab.length; i++) {
	konten_tab[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}


Object.size = function(obj){
	var size = 0, key;
	for(key in obj){
		if(obj.hasOwnProperty(key)){
			size++;
		}
	}
	return size;
};


var lks = "Desa Kepuharjo";
var data_file = "Perpustakaan/Buku/" + lks + ".json";

function dropDownLocCb(){
	lks = document.getElementById("id_dropdown_lokasi").value
	data_file = "Perpustakaan/Buku/" + lks + ".json";

	document.getElementsByClassName("show_all")[0].click()
return data_file;
}

function dropDownFieldCb(){
	var res_field = document.getElementById("id_field_option").value
	return res_field;
}

function searchCb(retDDLoc, retDDField){
	var retInputText = document.getElementById("input_text_id").value
	
	var f_htpr = new XMLHttpRequest()

	f_htpr.onreadystatechange = function(){
		innerCbSearch(f_htpr, retDDLoc, retDDField, retInputText);
	}  		

	f_htpr.open("GET", retDDLoc, true);
	f_htpr.send();
}

function innerCbSearch(f_htpr, retDDLoc, retDDField, retInputText){
	var canvas_tabel = document.getElementById("Tabel Perpustakaan")
	canvas_tabel.innerHTML = ""

	if(f_htpr.readyState == 4){
		// alert("lokasi: " + retDDLoc + " field: " + retDDField + " input_text: " + retInputText)
		var jsonObj = JSON.parse(f_htpr.responseText)
		var count = 0

		var str_html = ""
	str_html += "<center>"
	str_html += "<table class='tabel_buku' style='font-family: arial, sans-serif; font-size:15px; border-collapse: collapse;width: 60%;'>"
	str_html += "<tr style='background-color:#dddddd;'>"
		str_html += "<th style='background-color:#dddddd;'> No. </th>"
		str_html += "<th style='background-color:#dddddd;'> Buku </th>"
		str_html += "<th style='background-color:#dddddd;'> Jumlah </th>"
	str_html += "</tr>"

		for(var t=0; t<Object.size(jsonObj); t++){
			var t1 = t+1;
			var st = t1.toString()

			var str = jsonObj[st][retDDField]
			var index = str.search(new RegExp(retInputText, "i"))

			if(index > -1){
				count ++;

				if(count%2 == 0){
				str_html += "<tr style='background-color:#ffffff;'>"
			}else{
				str_html += "<tr style='background-color:#dddddd;'>"
			}
				str_html += "<td style='border: 1px solid #dddddd; text-align: left; padding: 8px; line-height: 15px;'><strong>" + count.toString() + "</strong>" + "</td>"
				str_html += "<td style='border: 1px solid #dddddd; text-align: left; padding: 8px; line-height: 15px;'>"
					str_html += "<a href='https://www.w3schools.com/html/' style='font-size:14px'>" + jsonObj[st]["Judul"] + "</a>"
					str_html += "<p style='font-size:12px;'>" + jsonObj[st]["Kode"] + "</p>" 
					str_html += "<p style='font-size:12px;'><em><strong>" + jsonObj[st]["Penulis"] +"</strong></em></p>"
					str_html += "<p style='font-size:12px;'>" + jsonObj[st]["Penerbit"] + "</p>"
				str_html += "</td>"
				str_html += "<td style='border: 1px solid #dddddd; text-align: left; padding: 8px; line-height: 15px;'>" + jsonObj[st]["Jml"] + "</td>"
			str_html += "</tr>"
			}
	}

	str_html += "</table>"
	str_html += "</center>"
	canvas_tabel.innerHTML += str_html
}
}

function myCallback(http_request){
	var data_tabel = document.getElementById("Tabel Perpustakaan")

if(http_request.readyState == 4){
	var str_html = ""
	str_html += "<center>"
	str_html += "<table class='tabel_buku' style='font-family: arial, sans-serif; font-size:15px; border-collapse: collapse;width: 60%;'>"
	str_html += "<tr style='background-color:#dddddd;'>"
		str_html += "<th style='background-color:#dddddd;'> No. </th>"
		str_html += "<th style='background-color:#dddddd;'> Buku </th>"
		str_html += "<th style='background-color:#dddddd;'> Jumlah </th>"
	str_html += "</tr>"
	
	var jsonObj = JSON.parse(http_request.responseText)
	for(var j=0; j<Object.size(jsonObj); j++){
		var l = j+1
		var k = l.toString()
		
		if(j%2 == 0){
			str_html += "<tr style='background-color:#ffffff;'>"
		}else{
			str_html += "<tr style='background-color:#dddddd;'>"
		}
			str_html += "<td style='border: 1px solid #dddddd; text-align: left; padding: 8px; line-height: 15px;'><strong>" + k.toString() + "</strong>" + "</td>"
			str_html += "<td style='border: 1px solid #dddddd; text-align: left; padding: 8px; line-height: 15px;'>"
				str_html += "<a href='https://www.w3schools.com/html/' style='font-size:14px'>" + jsonObj[k]["Judul"] + "</a>"
				str_html += "<p style='font-size:12px;'>" + jsonObj[k]["Kode"] + "</p>" 
				str_html += "<p style='font-size:12px;'><em><strong>" + jsonObj[k]["Penulis"] +"</strong></em></p>"
				str_html += "<p style='font-size:12px;'>" + jsonObj[k]["Penerbit"] + "</p>"
			str_html += "</td>"
			str_html += "<td style='border: 1px solid #dddddd; text-align: left; padding: 8px; line-height: 15px;'>" + jsonObj[k]["Jml"] + "</td>"
		str_html += "</tr>"
	}

	str_html += "</table>"
	str_html += "</center>"
	data_tabel.innerHTML += str_html
}
}

document.addEventListener("DOMContentLoaded", function(event){
	var http_request = new XMLHttpRequest()
	http_request.onreadystatechange = function(){
		myCallback(http_request);
	};

	http_request.open("GET", data_file, true);
http_request.send();
});