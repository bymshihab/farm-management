function get_vaccine() {

const IP = "https://localhost:7105";
const companyId = parseInt(localStorage.getItem("companyId"), 10);

// // for creating
const apiUrlanimal = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlvaccine = `${IP}/api/Vaccination/Vaccine?CompanyId=${companyId}`;

const apiUrlEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlOutsider = `${IP}/api/ActiveOutsiders?CompanyId=${companyId}`;

creatingDropdown("EmployeeDropdown", apiUrlEmployee, "EId", "EmployeeName");
creatingDropdown("animalDropdown", apiUrlanimal, "AnimalId", "AnimalName");
creatingDropdown("vaccineDropdown", apiUrlvaccine, "ProductId", "ProductName");
creatingDropdown(
  "OutsiderDropdown",
  apiUrlOutsider,
  "OutsiderId",
  "OutsiderName"
);

// // for updating
const apiUrlanimalUpdate = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlvaccineUpdate = `${IP}/api/Vaccination/Vaccine?CompanyId=${companyId}`;

const apiUrlEmployeeUpdate =`${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlOutsiderUpdate = `${IP}/api/ActiveOutsiders?CompanyId=${companyId}`;

creatingDropdown(
  "EmployeeDropdownUpdate",
  apiUrlEmployeeUpdate,
  "EId",
  "EmployeeName"
);
creatingDropdown(
  "animalDropdownUpdate",
  apiUrlanimalUpdate,
  "AnimalId",
  "AnimalName"
);
creatingDropdown(
  "vaccineDropdownUpdate",
  apiUrlvaccineUpdate,
  "ProductId",
  "ProductName"
);
creatingDropdown(
  "OutsiderDropdownUpdate",
  apiUrlOutsiderUpdate,
  "OutsiderId",
  "OutsiderName"
);
//form handle ==========

const vaccineForm = document.getElementById("insertVaccination");

vaccineForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const animalDropdown = document.getElementById("animalDropdown").value;
  const vaccineDropdown = document.getElementById("vaccineDropdown").value;
  const EmployeeDropdown = document.getElementById("EmployeeDropdown").value;

  const OutsiderDropdown = document.getElementById("OutsiderDropdown").value;

  const VaccinationDate = document.getElementById("VaccinationDate").value;
  const ExpireDateVaccine = document.getElementById("ExpireDateVaccine").value;

  const PriceVaccine = document.getElementById("PriceVaccine").value;

  const vaccineStatus = document.getElementById("vaccineStatus").checked;

  let data = {
    animalId: animalDropdown,
    vaccinationId: vaccineDropdown,
    eId: EmployeeDropdown,
    outsiderId: OutsiderDropdown,
    // OutsiderCatagoryId: OutsiderCatagoryDropdown,
    vDate: VaccinationDate,
    expDate: ExpireDateVaccine,
    price: PriceVaccine,
    status: vaccineStatus,
    companyId: companyId,
  };

  console.log("data===============> ", data);
  fetch(`https://localhost:7105/api/Vaccination/CreateVaccination`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Send data as JSON
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log(data, "data message!");
      // ... additional code ...

      loadTable();
      vaccineForm.reset();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("create Customfield failed.");
    });
});

// showing data to grid ==========

loadTable();
function loadTable() {
  fetch(`${IP}/api/Vaccination/GetVaccination?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "commimg...");
      const tablebody = document.querySelector(".vaccineTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
        // let cell1 = document.createElement("td");

        // let checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.name = "uomCheckbox";
        // checkbox.value = data[i].supplierId;
        // checkbox.id = "checkbox_" + data[i].supplierId; // Create a unique ID for each checkbox

        // // Append the checkbox to cell1
        // cell1.appendChild(checkbox);
        // cell1.setAttribute("id", data[i].supplierId);

        // cell1.textContent = data[i].resolutionName;

        let cell2 = document.createElement("td");
        cell2.textContent = data[i].animalName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].employeeName;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].productName;

        let cell5 = document.createElement("td");

        cell5.textContent = data[i].price;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].vDate.split("T")[0];

        let cell7 = document.createElement("td");

        cell7.textContent = data[i].expDate.split("T")[0];

        let cell8 = document.createElement("td");

        cell8.textContent = data[i].outsider;

        let cell9 = document.createElement("td");

        cell9.textContent = data[i].status;

        // let cell10= document.createElement("td");

        // cell10.textContent = data[i].outsider;

        let cell11 = document.createElement("td");
        cell11.setAttribute("id", data[i].vaccinationId);

        // Create and append the SVG to the button
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.classList.add("bi", "bi-pencil-square");
        svg.setAttribute("viewBox", "0 0 16 16");

        let path1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path1.setAttribute(
          "d",
          "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
        );
        let path2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "path"
        );
        path2.setAttribute("fill-rule", "evenodd");
        path2.setAttribute(
          "d",
          "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
        );

        svg.appendChild(path1);
        svg.appendChild(path2);

        let editButton = document.createElement("button");
        editButton.className = "bg-light border-0";
        editButton.appendChild(svg);
        editButton.setAttribute("type", "button");
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#updateModal");

        cell11.appendChild(editButton);

        editButton.addEventListener("click", function () {
          addDataToPopup(data[i], this);
        });
        // cell5.addEventListener("click", function(){
        //     addDataToPopup(this, this.id);
        // });

        // newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);
        newRow.appendChild(cell5);
        newRow.appendChild(cell6);
        newRow.appendChild(cell7);
        newRow.appendChild(cell8);
        newRow.appendChild(cell9);
        // newRow.appendChild(cell10);
        newRow.appendChild(cell11);
        console.log(newRow, "row data");
        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}

// showing data to edit modal =============

function addDataToPopup(rowData, editBtn) {
  // You can access the rowData and use it to fill in the modal fields.
  console.log("Row Data:", rowData, editBtn);

  const formUpdateId = document.getElementById("updated-formID");
  formUpdateId.setAttribute("data-category-id", rowData.vaccinationId);

  const animalDropdownUpdate = document.getElementById("animalDropdownUpdate");

  setSelectedOption(animalDropdownUpdate, rowData.animalName);

  const vaccineDropdownUpdate = document.getElementById(
    "vaccineDropdownUpdate"
  );

  setSelectedOption(vaccineDropdownUpdate, rowData.productName);

  const EmployeeDropdownUpdate = document.getElementById(
    "EmployeeDropdownUpdate"
  );

  setSelectedOption(EmployeeDropdownUpdate, rowData.employeeName);

  const OutsiderDropdownUpdate = document.getElementById(
    "OutsiderDropdownUpdate"
  );

  setSelectedOption(OutsiderDropdownUpdate, rowData.outsider);

  const VaccinationDateUpdate = (document.getElementById(
    "VaccinationDateUpdate"
  ).value = `${rowData.vDate.split("T")[0]}`);

  const ExpireDateVaccineUpdate = (document.getElementById(
    "ExpireDateVaccineUpdate"
  ).value = `${rowData.expDate.split("T")[0]}`);

  // console.log(DeliveryDateUpdatedBreading,"shdagghadg date ");

  const PriceVaccineUpdate = (document.getElementById(
    "PriceVaccineUpdate"
  ).value = `${rowData.price}`);

  const vaccineStatusUpdate = (document.getElementById(
    "vaccineStatusUpdate"
  ).checked = `${rowData.status}`);

  // setSelectedOption(EmployeeUpdatedDropdown, rowData.employeeName
  //   );
}

// handle update button ============

const updateShedBtn = document.getElementById("updateBtn");

updateShedBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let vaccineId = parseInt(
    document.getElementById("updated-formID").getAttribute("data-category-id"),
    10
  );
  let animalDropdownUpdate = parseInt(
    document.getElementById("animalDropdownUpdate").value,
    10
  );
  let vaccineDropdownUpdate = parseInt(
    document.getElementById("vaccineDropdownUpdate").value,
    10
  );
  let EmployeeDropdownUpdate = parseInt(
    document.getElementById("EmployeeDropdownUpdate").value,
    10
  );
  let OutsiderDropdownUpdate = parseInt(
    document.getElementById("OutsiderDropdownUpdate").value,
    10
  );

  let VaccinationDateUpdate = document.getElementById(
    "VaccinationDateUpdate"
  ).value;
  let ExpireDateVaccineUpdate = document.getElementById(
    "ExpireDateVaccineUpdate"
  ).value;
  let PriceVaccineUpdate = parseFloat(
    document.getElementById("PriceVaccineUpdate").value
  );

  let vaccineStatusUpdate = document.getElementById(
    "vaccineStatusUpdate"
  ).checked;

  let formData = new FormData();
  formData.append("VaccinationId", vaccineId);
  formData.append("AnimalId", animalDropdownUpdate);
  formData.append("ProductId", vaccineDropdownUpdate);
  formData.append("EId", EmployeeDropdownUpdate);
  formData.append("OutsiderId", OutsiderDropdownUpdate);

  formData.append("VDate", VaccinationDateUpdate);
  formData.append("ExpDate", ExpireDateVaccineUpdate);

  formData.append("Price", PriceVaccineUpdate);

  formData.append("CompanyId", companyId);
  formData.append("Status", vaccineStatusUpdate);

  console.log("formData", formData);

  fetch(`${IP}/api/Vaccination/UpdateVaccination`, {
    method: "PUT",
    body: formData,
    // headers: { 'Content-Type': 'multipart/form-data' } // This line should be omitted, as the browser will set the correct content type for FormData
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);
      console.log(data, "data message!");
      loadTable(); // Make sure this function is defined and does what you need
      // unitEditName.placeholder = ""; // Uncomment if needed
      vaccineForm.reset(); // Make sure 'breadingForm' is defined and points to the correct form element
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Update failed."); // Display an error message
    });
});

}
