import axios from "axios";

export const sortUser = async (sortOne, sortTwo) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://127.0.0.1:8000/api/all-users?${sortOne}=${sortTwo}`,
    });
    const users = res.data.data.users;

    const tbody = document.querySelector("tbody");
    const table = document.querySelector("table");
    const tableBody = document.querySelector(".table__body");
    tbody.innerHTML = "";

    if (users.length >= 1) {
      document.querySelector(
        ".num-results"
      ).textContent = `Matches found ${users.length}`;
      table.hidden = false;
      tableBody.style.background = "#f7f7f7";
      const pMsg = document.querySelector(".complaint__msg");
      if (pMsg) {
        pMsg.remove();
      }
      users.forEach((user, i) => {
        const tr = document.createElement("tr");
        const tdIndex = document.createElement("td");
        tdIndex.textContent = i + 1;
        tr.appendChild(tdIndex);
        //
        const userPhoto = document.createElement("td");
        const photo = document.createElement("img");
        photo.src = `/img/users/${user.photo}`;
        userPhoto.appendChild(photo);
        tr.appendChild(userPhoto);
        //
        const name = document.createElement("td");
        name.textContent = `${user.firstName} ${user.lastName}`;
        tr.appendChild(name);
        //
        const email = document.createElement("td");
        email.textContent = user.email;
        tr.appendChild(email);
        //
        const address = document.createElement("td");
        address.textContent = user.address;
        tr.appendChild(address);
        //
        const action = document.createElement("td");
        const link = document.createElement("a");
        link.setAttribute("class", "del-user");
        link.setAttribute("data-user-id", `${user._id}`);
        link.setAttribute("href", "/all-users");
        link.textContent = "Delete";
        action.appendChild(link);
        tr.appendChild(action);
        //
        tbody.appendChild(tr);
      });
    } else {
      document.querySelector(".num-results").textContent = "";
      table.hidden = true;
      tableBody.style.background = "none";
      const pMsg = document.querySelector(".complaint__msg");
      if (!pMsg) {
        const p = document.createElement("p");
        p.textContent = "No users found 🔍";
        p.classList.add("complaint__msg");
        tableBody.append(p);
      }
    }
  } catch (err) {}
};
