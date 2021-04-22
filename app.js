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

const signInForm = document.querySelector(".signin-form");

signInForm.addEventListener("keyup", () => {
  let canSubmit = true;
  signInForm.childNodes.forEach((child) => {
    if (child.nodeName == "DIV") {
      child.childNodes.forEach((childNode) => {
        if (childNode.nodeName === "INPUT") {
          if (childNode.value === "") {
            canSubmit = false;
          }
        }
        // console.log(`Div child ${childNode.nodeName}`);
      });
    }
  });
  console.log(`Button ${document.getElementsByClassName("form-submit-btn")}`);
  if (canSubmit) {
    document.getElementById("form-submit-btn").disabled = false;
  } else {
    document.getElementById("form-submit-btn").disabled = true;
  }
  console.log(`Can submit is ${canSubmit}`);
});

document
  .querySelectorAll(".signin-input-field-container input")
  .forEach((inputElement) => {
    const listener = () => {
      inputElement.parentElement.removeAttribute("data-footer");
      inputElement.parentElement.removeEventListener("transitionend", listener);
    };
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "data-footer") {
          if (inputElement.parentElement.hasAttribute("data-footer")) {
            setTimeout(() => {
              inputElement.parentElement.removeEventListener(
                "transitionend",
                listener
              );
              inputElement.parentElement.classList.add(
                "show-input-field-footer"
              );
              inputElement.parentElement.classList.add("input-field-error");
            }, 300);
          }
        }
      });
    });
    observer.observe(inputElement.parentElement, { attributes: true });
    inputElement.addEventListener(
      "input",
      debounce((event) => {
        if (event.target.value !== "") {
          inputElement.parentElement.classList.add("show-input-field-header");
          if (inputElement.getAttribute("name") == "email") {
            console.log("email attribute");
            if (!validateEmail(event.target.value)) {
              inputElement.parentElement.setAttribute(
                "data-footer",
                "Please enter a valid email address"
              );
            } else {
              console.log("hide");
              inputElement.parentElement.addEventListener(
                "transitionend",
                listener
              );
              inputElement.parentElement.classList.remove(
                "show-input-field-footer"
              );
              inputElement.parentElement.classList.remove("input-field-error");
            }
          }
        } else {
          console.log(`${inputElement.parentElement.className} is empty`);
          inputElement.parentElement.classList.remove(
            "show-input-field-header"
          );
        }
      }, 500)
    );
  });
