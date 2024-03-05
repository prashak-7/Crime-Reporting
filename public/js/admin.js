import axios from "axios";
import { showAlert } from "./alerts";

export const adminLogin = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/admin-login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Logging in");
      window.setTimeout(() => {
        location.assign("/admin-overview");
      }, 1000);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const logoutAdmin = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:8000/admin-logout",
    });

    if (res.status === "success") location.reload(true);
  } catch (err) {
    showAlert("error", "Error logging out! Try again");
  }
};
