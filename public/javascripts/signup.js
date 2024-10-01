import { register } from "./register.js";

const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");

signupBtn.onclick = (()=>{
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
  document.querySelector("#loginEmail").value = "";
  document.querySelector("#loginPassword").value = "";
});

loginBtn.onclick = (()=>{
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
});

signupLink.onclick = (()=>{
  signupBtn.click();
  return false;
});

export function closeSuccess() {
  document.getElementById("success").classList.remove("open-success");
}

function Signup(e) {
  e.preventDefault();
  const signupEmail = document.getElementById("SignEmail").value;
  const signupPass = document.getElementById('SignPassword').value;
  const signupName = document.getElementById('SignName').value;
  const signNumber = document.getElementById('SignNumber').value;
  console.log("signup data", signNumber, signupEmail, signupName, signupPass);
  register(signupEmail, signupPass, signupName, signNumber);
}