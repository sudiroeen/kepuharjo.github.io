/* ***************  CALLBACK BUTTON PLACE *************** */
function cb_place(obj, id_cb){
	var lokasi = obj.name;
	var file_json = "PetaWisata/config_json/" + lokasi + ".json"

	var img_ = document.getElementById("id_callback_img");
	img_.src = "PetaWisata/GambarWisata/" + lokasi + ".png"

	var elemCb = document.getElementById("id_tabel_konten");
	var str_elem = ""

	elemCb.innerHTML = ""
	var htprq = new XMLHttpRequest();
	htprq.onreadystatechange = function(){
		if(htprq.readyState == 4){
			var json_object = JSON.parse(htprq.responseText);
			var k;
			for(k in json_object){
				str_elem += "<tr>"
				str_elem += "<td><strong>" + k +"</strong></td>"
				if(k == "Nama"){
					str_elem += "<td><strong><em>" + json_object[k] +"</em></strong></td>"
				}else{
					str_elem += "<td>" + json_object[k] + "</td>"	
				}
				str_elem += "</tr>"
			}
			elemCb.innerHTML += str_elem
		}
	}

	htprq.open("GET", file_json, true);
	htprq.send();
}
/* ########### END OF CALLBACK BUTTON PLACE ############# */

/* TOOLS */
Object.size = function(obj){
	var size = 0, key;
	for(key in obj){
		if(obj.hasOwnProperty(key)){
			size++;
		}
	}
	return size;
}
/* END OF TOOLS */

document.addEventListener("DOMContentLoaded", function(event){
	document.getElementsByClassName("place_kulon_progo")[0].click();
})
