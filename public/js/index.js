import { register, login, logout } from "./login";
import { updateUser } from "./updateUser";
import { complaint, updateComplaint } from "./complaint";
import { adminLogin } from "./admin";
import { logoutAdmin } from "./admin";
import { deleteComplaint } from "./complaint";
import { deleteUser, adminDeleteUser } from "./deleteUser";
import { sortComplaint } from "./sortComplaint";
import { sortUser } from "./sortUser";

const registerForm = document.querySelector(".form--register");
const loginForm = document.querySelector(".form--login");
const logOutBtn = document.querySelector("#logout");
const adminLoginForm = document.querySelector(".form--adminLogin");
const logOutAdminBtn = document.querySelector("#logoutAdmin");

// Sort User
const sortByUser = document.querySelector("#sort-type-user");
const sortUserBasedOn = document.querySelector("#sort-user-base");
const sortFormUser = document.querySelector(".form-sortUser");

// Sort Complaint
const sortByComplaint = document.querySelector("#sort-type-complaint");
const sortComplaintBasedOn = document.querySelector("#sort-complaint-base");
const sortFormComplaint = document.querySelector(".form-sortComplaint");

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

// USER
const delUser = document.querySelectorAll(".del-user");

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

if (delUser) {
  delUser.forEach((user) => {
    user.addEventListener("click", () => {
      console.log(user.dataset.userId);
      adminDeleteUser(user.dataset.userId);
    });
  });
}

// COMPLAINT SORTING
if (sortByComplaint) {
  if (sortByComplaint.value === "all") sortComplaintBasedOn.hidden = true;

  function handleDropDownChange(e) {
    const curValue = e.target.value;
    if (curValue === "all") {
      sortComplaintBasedOn.hidden = true;
      sortComplaintBasedOn.innerHTML = "";
    } else sortComplaintBasedOn.hidden = false;
  }

  function handleDateDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "crimeDate") {
      sortComplaintBasedOn.innerHTML = "";
      const dateOption = ["Today", "Last week", "Last month", "Year ago"];
      dateOption.forEach((date) => {
        const option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        sortComplaintBasedOn.appendChild(option);
      });
    }
  }

  function handleStatusDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "status") {
      sortComplaintBasedOn.innerHTML = "";
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
        sortComplaintBasedOn.appendChild(option);
      });
    }
  }

  async function handleStationDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "policeStation") {
      sortComplaintBasedOn.innerHTML = "";
      const res = await fetch("/stations");
      const data = await res.json();
      const stations = data.data.stations.policeStations;
      stations.forEach((station) => {
        const option = document.createElement("option");
        option.value = station.name;
        option.textContent = station.name;
        sortComplaintBasedOn.appendChild(option);
      });
    }
  }

  function handleCrimeTypeDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "crimeType") {
      sortComplaintBasedOn.innerHTML = "";
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
        sortComplaintBasedOn.appendChild(option);
      });
    }
  }

  sortByComplaint.addEventListener("change", handleDropDownChange);
  sortByComplaint.addEventListener("change", handleDateDropDown);
  sortByComplaint.addEventListener("change", handleStatusDropDown);
  sortByComplaint.addEventListener("change", handleStationDropDown);
  sortByComplaint.addEventListener("change", handleCrimeTypeDropDown);
}

if (sortFormComplaint) {
  sortFormComplaint.addEventListener("submit", (e) => {
    e.preventDefault();
    const sortOne = sortByComplaint.value;
    const sortTwo = sortComplaintBasedOn.value;
    sortComplaint(sortOne, sortTwo);
  });
}

// USER SORTING
if (sortByUser) {
  if (sortByUser.value === "all") sortUserBasedOn.hidden = true;

  function handleDropDownChangeUser(e) {
    const curValue = e.target.value;
    if (curValue === "all") {
      sortUserBasedOn.hidden = true;
      sortUserBasedOn.innerHTML = "";
    } else sortUserBasedOn.hidden = false;
  }

  function handleGenderDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "gender") {
      sortUserBasedOn.innerHTML = "";
      const genderOptions = ["male", "female", "others"];
      genderOptions.forEach((gender) => {
        const option = document.createElement("option");
        option.value = gender;
        option.textContent = gender.charAt(0).toUpperCase() + gender.slice(1);
        sortUserBasedOn.appendChild(option);
      });
    }
  }

  // function handleAgeDropDown(e) {
  //   const curValue = e.target.value;
  //   if (curValue === "age") {
  //     sortUserBasedOn.innerHTML = "";
  //     const ageOptions = [
  //       "Children (5-12)",
  //       "Teen (13-18)",
  //       "Young adults (19-30)",
  //       "Adults (31-60)",
  //       "Elderly (61+)",
  //     ];
  //     ageOptions.forEach((age) => {
  //       const option = document.createElement("option");
  //       option.value = age;
  //       option.textContent = age;
  //       sortUserBasedOn.appendChild(option);
  //     });
  //   }
  // }

  function handleRegisteredDateDropDown(e) {
    const curValue = e.target.value;
    if (curValue === "registeredDate") {
      sortUserBasedOn.innerHTML = "";
      const dateOptions = ["Today", "Last week", "Last month"];
      dateOptions.forEach((date) => {
        const option = document.createElement("option");
        option.value = date;
        option.textContent = date;
        sortUserBasedOn.appendChild(option);
      });
    }
  }

  sortByUser.addEventListener("change", handleDropDownChangeUser);
  sortByUser.addEventListener("change", handleGenderDropDown);
  // sortByUser.addEventListener("change", handleAgeDropDown);
  sortByUser.addEventListener("change", handleRegisteredDateDropDown);
}

if (sortFormUser) {
  sortFormUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const sortOne = sortByUser.value;
    const sortTwo = sortUserBasedOn.value;
    sortUser(sortOne, sortTwo);
  });
}
