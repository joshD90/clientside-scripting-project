function formChecker(){
	Event.preventDefault();
	document.getElementById("myForm").style.display = "none";//hides form after user submits
	var name=document.getElementById("formName").value;
	var email=document.getElementById("formEmail").value;
	var phone = document.getElementById('formPhone').value;
	var message = document.getElementById('formMessage').value;
	var date = document.getElementById('formDate').value;

	

	//Validation is complete send user thank you message
	alert(name+", thank you for your details. We will be in touch via "+email+" shortly.");
}