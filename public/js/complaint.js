import axios from "axios";
import { showAlert } from "./alerts";

export const complaint = async (
  fullName,
  contactNumber,
  crimeLocation,
  crimeDate,
  crimeDescription,
  province,
  policeStation
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/register-complain",
      data: {
        fullName,
        contactNumber,
        crimeLocation,
        crimeDate,
        crimeDescription,
        province,
        policeStation,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Complain registered.");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
