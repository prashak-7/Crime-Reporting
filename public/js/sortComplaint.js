import axios from "axios";

export const sortComplaint = async (sortOne, sortTwo) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/all-complaints?${sortOne}=${sortTwo}`,
    });
    const complaints = res.data.data.complaints;

    const tbody = document.querySelector("tbody");
    const table = document.querySelector("table");
    const tableBody = document.querySelector(".table__body");
    tbody.innerHTML = "";

    if (complaints.length >= 1) {
      table.hidden = false;
      tableBody.style.background = "#f7f7f7";
      const pMsg = document.querySelector(".complaint__msg");
      if (pMsg) {
        pMsg.remove();
      }
      console.log("next");
      complaints.forEach((complaint, i) => {
        const tr = document.createElement("tr");
        const tdIndex = document.createElement("td");
        tdIndex.textContent = i + 1;
        tr.appendChild(tdIndex);
        //
        const tdUser = document.createElement("td");
        if (complaint.complainer !== null) {
          const userLink = document.createElement("a");
          userLink.href = `/user/${complaint.complainer._id}`;
          userLink.classList.add("user");
          userLink.textContent = complaint.fullName;
          tdUser.appendChild(userLink);
        } else {
          const userName = document.createElement("td");
          userName.textContent = complaint.fullName;
          tdUser.appendChild(userName);
        }
        tr.appendChild(tdUser);
        //
        const tdComplainedDate = document.createElement("td");
        tdComplainedDate.textContent = new Date(
          complaint.complainedDate
        ).toLocaleDateString("en-us");
        tr.appendChild(tdComplainedDate);
        //
        const tdCrimeDate = document.createElement("td");
        tdCrimeDate.textContent = new Date(
          complaint.crimeDate
        ).toLocaleDateString("en-us");
        tr.appendChild(tdCrimeDate);
        //
        const tdPoliceStation = document.createElement("td");
        tdPoliceStation.textContent = complaint.policeStation;
        tr.appendChild(tdPoliceStation);
        //
        const tdStatus = document.createElement("td");
        tdStatus.textContent = complaint.status;
        tr.appendChild(tdStatus);
        //
        const tdView = document.createElement("td");
        const viewLink = document.createElement("a");
        viewLink.href = `/all-complaints/${complaint._id}`;
        viewLink.textContent = "View";
        viewLink.classList.add("cta");
        tdView.appendChild(viewLink);
        tr.appendChild(tdView);
        //
        tbody.appendChild(tr);
      });
    } else {
      table.hidden = true;
      tableBody.style.background = "none";
      const pMsg = document.querySelector(".complaint__msg");
      if (!pMsg) {
        const p = document.createElement("p");
        p.textContent = "No complaint found 🔍";
        p.classList.add("complaint__msg");
        tableBody.append(p);
      }
    }
  } catch (err) {}
};
