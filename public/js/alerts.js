export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document
    .querySelector(".form__container")
    .insertAdjacentHTML("afterend", markup);
  window.setTimeout(hideAlert, 3000);
};

export const showImageAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.querySelector(".profile").insertAdjacentHTML("afterend", markup);
  window.setTimeout(hideAlert, 3000);
};

export const showDeleteUserAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}" id="alertDeleteUser">${msg}</div>`;
  document.querySelector(".modal").insertAdjacentHTML("afterend", markup);
  document;
  document.getElementById("alertDeleteUser").style.cssText =
    "position: relative; background: #eb4d4b; color: #fff; width: fit-content";
  window.setTimeout(hideAlert, 1500);
};
