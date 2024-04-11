 // Wait for the DOM content to be fully loaded before executing JavaScript
 document.addEventListener("DOMContentLoaded", function() {
    // Select all carousel items
    const carouselItems = document.querySelectorAll(".carousel-item");
  
    // Iterate over each carousel item
    carouselItems.forEach(item => {
      // Add a click event listener to each carousel item
      item.addEventListener("click", function(event) {
        // Check if the click target is an image
        if (event.target.tagName === "IMG") {
          // Find the carousel caption associated with the clicked item
          const caption = this.querySelector(".carousel-caption");
          // Toggle the visibility of the caption
          toggleVisibility(caption);
        }
      });
    });
  
    // Function to toggle the visibility of an element
    function toggleVisibility(element) {
      // If the element is currently hidden, make it visible
      if (element.style.visibility === "hidden") {
        element.style.visibility = "visible";
      } else {
        // Otherwise, hide the element
        element.style.visibility = "hidden";
      }
    }
  });