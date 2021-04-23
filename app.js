function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      callback.apply(this, args);
    }, wait);
  };
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const signUpForm = document.querySelector(".signup-form");
const submitButton = document.getElementById("form-submit-btn");
const passwordInput = document.getElementById("pass");
const passwordInputIcon = document.getElementById("pass-clicable-icon");

const validateForm = () => {
  let canSubmit = true;
  signUpForm.childNodes.forEach((child) => {
    if (child.nodeName == "DIV") {
      child.childNodes.forEach((inputNode) => {
        if (inputNode.nodeName === "INPUT") {
          const listener = () => {
            inputNode.removeAttribute("data-footer");
            inputNode.removeEventListener("transitionend", listener);
          };

          const removeWarning = () => {
            child.addEventListener("transitionend", listener);
            child.classList.remove("show-input-field-footer");
            child.classList.remove("input-field-error");
          };

          const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
              if (mutation.attributeName === "data-footer") {
                if (child.hasAttribute("data-footer")) {
                  setTimeout(() => {
                    child.removeEventListener("transitionend", listener);
                    child.classList.add("show-input-field-footer");
                    child.classList.add("input-field-error");
                  }, 50);
                }
              }
            });
          });
          observer.observe(child, { attributes: true });
          if (inputNode.value !== "") {
            child.classList.add("show-input-field-header");
            if (inputNode.getAttribute("name") == "email") {
              if (!validateEmail(inputNode.value)) {
                child.setAttribute(
                  "data-footer",
                  "Please enter a valid email address"
                );
                canSubmit = false;
              } else {
                removeWarning();
              }
            } else if (inputNode.getAttribute("name") === "password") {
              if (inputNode.value.length < 8) {
                child.setAttribute(
                  "data-footer",
                  "Please enter at least 8 characters"
                );
                canSubmit = false;
              } else {
                removeWarning();
              }
            }
          } else {
            canSubmit = false;
            child.classList.remove("show-input-field-header");
          }
        }
        if (inputNode.nodeName === "SELECT" && inputNode.selectedIndex <= 0) {
          canSubmit = false;
        }
      });
    }
  });
  if (canSubmit) {
    document.getElementById("form-submit-btn").disabled = false;
  } else {
    document.getElementById("form-submit-btn").disabled = true;
  }
  return canSubmit;
};

window.onload = validateForm;

signUpForm.addEventListener(
  "keyup",
  debounce(() => {
    validateForm();
  }, 350)
);

signUpForm.addEventListener(
  "click",
  debounce(() => {
    validateForm();
  }, 200)
);

passwordInputIcon.addEventListener("click", () => {
  passwordInputIcon.children[0].classList.toggle("bi-eye-slash-fill");
  passwordInputIcon.children[0].classList.toggle("bi-eye-fill");
  const passInputType = passwordInput.getAttribute("type");
  passInputType === "password"
    ? passwordInput.setAttribute("type", "text")
    : passwordInput.setAttribute("type", "password");
});

submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (validateForm()) {
    // space for going to the next step, or sending some requests
    /*




    */
  }
});
