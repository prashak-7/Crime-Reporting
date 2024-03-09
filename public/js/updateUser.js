import axios from "axios";
import { showImageAlert } from "./alerts";

// type is either photo or password
export const updateUser = async (data, type) => {
  const url =
    type === "password"
      ? "http://127.0.0.1:8000/api/update-password"
      : "http://127.0.0.1:8000/api/update-me";
  try {
    const res = await axios({
      method: "PATCH",
      url,
      data,
    });

    if (res.data.status === "success") {
      showImageAlert("success", "Updated successfully");
    }
  } catch (err) {
    showImageAlert("error", err.response.data.message);
  }
};
