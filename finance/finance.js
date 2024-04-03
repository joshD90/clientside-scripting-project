var depositSlider = document.getElementById("depositSlider");
var depositValue = document.getElementById("depositValue");
depositValue.innerHTML = depositSlider.value;

depositSlider.oninput = function () {
  var value = parseFloat(this.value);
  if (value <= 0) {
    depositValue.innerHTML = 0;
  } else {
    depositValue.innerHTML = value;
  }
  calculateFinance(); // Recalculate finance when the deposit slider changes
};

var carValueSlider = document.getElementById("carValueSlider");
var carValue = document.getElementById("carValue");
carValue.innerHTML = carValueSlider.value;

carValueSlider.oninput = function () {
  carValue.innerHTML = this.value;
  calculateFinance(); // Recalculate finance when the car value slider changes
};

var monthsSlider = document.getElementById("monthsSlider");
var months = document.getElementById("months");
months.innerHTML = monthsSlider.value;

monthsSlider.oninput = function () {
  months.innerHTML = this.value;
  calculateFinance(); // Recalculate finance when the months slider changes
};

document
  .getElementById("financeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    calculateFinance(); // Calculate finance
  });

function calculateFinance() {
  var deposit = parseFloat(depositSlider.value);
  if (deposit <= 0) {
    deposit = 0; // Set deposit to zero if negative or zero
  }
  var carValue = parseFloat(carValueSlider.value);
  var months = parseInt(monthsSlider.value);
  var rate;

  if (deposit < 20000) {
    rate = 0.09;
  } else if (deposit >= 20000 && deposit <= 49000) {
    rate = 0.075;
  } else {
    rate = 0.06;
  }

  var interest = carValue * rate;
  var totalAmount = carValue + interest - deposit;
  var monthlyRepayment = totalAmount / months;

  // Ensure negative values are set to zero
  totalAmount = Math.max(totalAmount, 0);
  monthlyRepayment = Math.max(monthlyRepayment, 0);

  // Display the results with each piece of information on a new line
  var financeResult = "Car Value: €" + carValue.toFixed(2) + "<br>";
  financeResult += "Interest: €" + interest.toFixed(2) + "<br>";
  financeResult += "Deposit: €" + deposit.toFixed(2) + "<br>";
  financeResult +=
    "Rate based on Deposit %: " + (rate * 100).toFixed(2) + "%<br>";
  financeResult += "Total Amount owed: €" + totalAmount.toFixed(2) + "<br>";
  financeResult += "Monthly Repayment: €" + monthlyRepayment.toFixed(2);

  document.getElementById("financeResult").innerHTML = financeResult;
  document.getElementById("financeForm").style.display = "none";
}
