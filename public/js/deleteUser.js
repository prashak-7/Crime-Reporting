import axios from "axios";
import { showDeleteUserAlert } from "./alerts";

export const deleteUser = async (password) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/delete-me",
      data: {
        password,
      },
    });

    if (res.data.status === "success") {
      window.setTimeout(() => {
        location.assign("http://127.0.0.1:8000");
      }, 300);
    }
  } catch (err) {
    showDeleteUserAlert("error", err.response.data.message);
  }
};

export const adminDeleteUser = async (userId) => {
  try {
    const res = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/api/delete-user",
      data: {
        userId,
      },
    });
  } catch (e) {}
};
