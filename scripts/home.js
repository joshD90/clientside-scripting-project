  //script for home page mailing list
  function Join() {
	let text;
	let name = prompt("Please enter your email address:");
	if (name == null || name == "") {
	  text = "User cancelled the prompt.";
	} else {
	  text = "Thank you! We will add: " + name + " to our email distribution list";
	  document.getElementById("joinbutton").style.display="none";
	}
	document.getElementById("demo").innerHTML = text;
  }