import { register, login, logout } from "./login";
import { updateUser } from "./updateUser";
import { complaint, updateComplaint } from "./complaint";
import { adminLogin } from "./admin";
import { logoutAdmin } from "./admin";
import { deleteComplaint } from "./complaint";
import { deleteUser } from "./deleteUser";
import { sortComplaint } from "./sortComplaint";

const registerForm = document.querySelector(".form--register");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector("#logout");
const adminLoginForm = document.querySelector(".form--adminLogin");
const logOutAdminBtn = document.querySelector("#logoutAdmin");

// Sort
const sortBy = document.querySelector("#sort-type-one");
const sortBasedOn = document.querySelector("#sort-type-two");
const sortForm = document.querySelector(".form-sort");

// ACCOUNT SETTINGS
const userPhotoForm = document.querySelector(".user-photo");
const userPasswordForm = document.querySelector(".user-data");
const userDeleteForm = document.querySelector(".delete-user");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const deleteBtnCta = document.querySelector(".delete-btn-cta");

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
    if (updateUser(form, "photo")) {
      setTimeout(() => {
        location.reload();
      }, 1000);
    }
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
    const crimeType = document.getElementById("crime-type").value;

    complaint(
      fullName,
      contactNumber,
      crimeLocation,
      crimeDate,
      crimeDescription,
      province,
      policeStation,
      crimeType
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

if (sortBy) {
  if (sortBy.value === "all") sortBasedOn.hidden = true;

  function handleDropDownChange(e) {
    const curValue = e.target.value;
    if (curValue === "all") {
      sortBasedOn.hidden = true;
      sortBasedOn.innerHTML = "";
    } else sortBasedOn.hidden = false;
  }

  function handleDateDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "crimeDate") {
      sortBasedOn.innerHTML = "";
      const dateOption = [
        "Today",
        "One week ago",
        "One month ago",
        "One year ago",
      ];
      dateOption.forEach((date) => {
        const option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        sortBasedOn.appendChild(option);
      });
    }
  }

  function handleStatusDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "status") {
      sortBasedOn.innerHTML = "";
      const statusOption = [
        "Pending",
        "Under Investigation",
        "Resolved",
        "Closed",
      ];
      statusOption.forEach((status) => {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        sortBasedOn.appendChild(option);
      });
    }
  }

  async function handleStationDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "policeStation") {
      sortBasedOn.innerHTML = "";
      const res = await fetch("/stations");
      const data = await res.json();
      const stations = data.data.stations.policeStations;
      stations.forEach((station) => {
        const option = document.createElement("option");
        option.value = station.name;
        option.textContent = station.name;
        sortBasedOn.appendChild(option);
      });
    }
  }

  function handleCrimeTypeDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "crimeType") {
      sortBasedOn.innerHTML = "";
      const crimeTypes = [
        "Violent crimes",
        "Property crimes",
        "Domestic violence",
        "Drug-related crimes",
        "Hate crimes",
        "Environmental crimes",
        "Others",
      ];
      crimeTypes.forEach((crime) => {
        const option = document.createElement("option");
        option.value = crime;
        option.textContent = crime;
        sortBasedOn.appendChild(option);
      });
    }
  }

  sortBy.addEventListener("change", handleDropDownChange);
  sortBy.addEventListener("change", handleDateDropDown);
  sortBy.addEventListener("change", handleStatusDropDown);
  sortBy.addEventListener("change", handleStationDropDown);
  sortBy.addEventListener("change", handleCrimeTypeDropDown);
}

if (sortForm) {
  sortForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const sortOne = sortBy.value;
    const sortTwo = sortBasedOn.value;
    sortComplaint(sortOne, sortTwo);
  });
}
