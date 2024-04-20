import axios from "axios";
import { showAlert } from "./alerts";

export const complaint = async (
  fullName,
  contactNumber,
  crimeLocation,
  crimeDate,
  crimeDescription,
  province,
  policeStation,
  crimeType
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:8000/api/register-complaint",
      data: {
        fullName,
        contactNumber,
        crimeLocation,
        crimeDate,
        crimeDescription,
        province,
        policeStation,
        crimeType,
      },
    });

    if (res.data.status === "success") {
      showAlert("success", "Complain registered.");
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

export const updateComplaint = async (status) => {
  try {
    const complaintId = window.location.pathname.split("/")[2];
    const res = await axios({
      method: "PATCH",
      url: `http://127.0.0.1:8000/api/update-complaint/`,
      data: {
        complaintId,
        status,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComplaint = async () => {
  const complaintId = window.location.pathname.split("/")[2];
  try {
    const res = await axios({
      method: "DELETE",
      url: `http://127.0.0.1:8000/api/delete-complaint/${complaintId}/`,
    });
  } catch (err) {
    console.log(err);
  }
};
