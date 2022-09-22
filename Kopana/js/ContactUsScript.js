const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
  preferredCountries: ["in"],
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

const info = document.querySelector(".alert-info");
const error = document.querySelector(".alert-error");

function process(event) {
  event.preventDefault();

  const phoneNumber = phoneInput.getNumber();

  info.style.display = "none";
  error.style.display = "none";

  if (phoneInput.isValidNumber()) {
    info.style.display = "";
    info.innerHTML = `Valid Phone Number: <strong>${phoneNumber}</strong>`;
  } else {
    error.style.display = "";
    error.innerHTML = `Invalid Phone Number.`;
  }
}

const form = document.getElementById("contact");
form.addEventListener("submit", process);
