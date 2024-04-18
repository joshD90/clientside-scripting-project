//JavaScript for contact page form to disable form submissions if there are invalid fields
(function formChecker() {
	'use strict'
  
	// Fetch all the forms we want to apply custom Bootstrap validation styles to
	var forms = document.querySelectorAll('.needs-validation')
	var name=document.getElementById("formName").value;
	// Loop over them and prevent submission
	Array.prototype.slice.call(forms)
	  .forEach(function (form) {
		form.addEventListener('submit', function (event) {
		  if (!form.checkValidity()) {
			event.preventDefault()
			event.stopPropagation()
		  } else {
			  // Form is valid, show success message
			  alert("Thank you "+formName.value+", we will be in touch as soon as possible!");
		  }
  
		  form.classList.add('was-validated')
		}, false)
	  })
  })()

  //script for home page mailing list
function Join() {
	let text;
	let email = prompt("Please enter your email address:");
	if (email == null || email == "") {
	  text = "User cancelled the prompt.";
	} else {
	  text = "Thank you we will add" + email + "to our email distribution list";
	}
	document.getElementById("demo").innerHTML = text;
  }