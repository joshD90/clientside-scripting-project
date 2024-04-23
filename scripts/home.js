  //script for home page mailing list
  function Join() {
	let text;
	let name = prompt("Please enter your email address:");
  
	// Regular expression for email validation
	const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
	if (name == null || name === "") {
	  text = "User cancelled the prompt.";
	} else if (!emailRegex.test(name)) {
	  text = "Invalid email address. Please enter a valid email.";
	} else {
	  text = "Thank you! We will add: " + name + " to our email distribution list";
	  document.getElementById("joinbutton").style.display = "none";
	}
  
	document.getElementById("demo").innerHTML = text;
  }
  