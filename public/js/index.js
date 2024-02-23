// DEALS WITH GETTING DATA FROM USER INTERFACE AND DELEGATING THE ACTION
import { register, login, logout } from "./login";
import { updateUser } from "./updateUser";
import { complaint } from "./complaint";
import { adminLogin } from "./admin";

const registerForm = document.querySelector(".form--register");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector("#logout");
const adminLoginForm = document.querySelector(".form--adminLogin");

// ACCOUNT SETTINGS
const userPhotoForm = document.querySelector(".user-photo");
const userPasswordForm = document.querySelector(".user-data");

// REGISTER COMPLAIN
const complainForm = document.querySelector(".form--complain");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login(email, password);
  });

if (registerForm)
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const age = document.getElementById("age").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const gender = document.getElementById("gender").value;
    register(
      firstName,
      lastName,
      age,
      address,
      email,
      gender,
      password,
      confirmPassword
    );
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);

if (userPhotoForm) {
  userPhotoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("photo", document.getElementById("photo").files[0]);
    updateUser(form, "photo");
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const currentPassword = document.getElementById("currentPassword").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    await updateUser(
      { currentPassword, password, confirmPassword },
      "password"
    );

    document.getElementById("currentPassword").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
  });
}

if (complainForm) {
  complainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = document.getElementById("name").value;
    const contactNumber = document.getElementById("contact-num").value;
    const crimeLocation = document.getElementById("location").value;
    const crimeDate = document.getElementById("crime-date").value;
    const province = document.getElementById("province").value;
    const policeStation = document.getElementById("police-station").value;
    const crimeDescription = document.getElementById("crime-description").value;

    complaint(
      fullName,
      contactNumber,
      crimeLocation,
      crimeDate,
      crimeDescription,
      province,
      policeStation
    );
  });
}

if (adminLoginForm)
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    adminLogin(email, password);
  });
