// DEALS WITH GETTING DATA FROM USER INTERFACE AND DELEGATING THE ACTION
import { register, login, logout } from "./login";
import { updateUser } from "./updateUser";
import { complaint, updateComplaint } from "./complaint";
import { adminLogin } from "./admin";
import { logoutAdmin } from "./admin";
import { deleteComplaint } from "./complaint";
import { deleteUser } from "./deleteUser";

const registerForm = document.querySelector(".form--register");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector("#logout");
const adminLoginForm = document.querySelector(".form--adminLogin");
const logOutAdminBtn = document.querySelector("#logoutAdmin");

// ACCOUNT SETTINGS
const userPhotoForm = document.querySelector(".user-photo");
const userPasswordForm = document.querySelector(".user-data");
const userDeleteForm = document.querySelector(".delete-user");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const deleteBtnCta = document.querySelector(".delete-btn-cta");
const deleteBtn = document.querySelector(".delete-btn-form");

//  COMPLAIN
const complainForm = document.querySelector(".form--complain");
const updateComplaintForm = document.querySelector(".form--updateComplaint");

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

if (logOutAdminBtn) logOutAdminBtn.addEventListener("click", logoutAdmin);

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

// DELETE USER
if (deleteBtnCta) {
  deleteBtnCta.addEventListener("click", () => {
    modal.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

if (overlay) {
  overlay.addEventListener("click", () => {
    modal.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

if (userDeleteForm) {
  userDeleteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = document.getElementById("delAccPassword").value;
    deleteUser(password);
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

if (updateComplaintForm) {
  const updateBtn = document.querySelector("input[value='Update']");
  const deleteBtn = document.querySelector("input[value='Delete']");
  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const status = document.getElementById("status").value;
    updateComplaint(status);
  });

  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    deleteComplaint();
    window.setTimeout(() => {
      location.assign("http://127.0.0.1:8000/all-complaints");
    }, 300);
  });
}

if (adminLoginForm)
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    adminLogin(email, password);
  });
