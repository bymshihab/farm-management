function get_breading() {

const IP = "https://localhost:7105";
const companyId = parseInt(localStorage.getItem("companyId"), 10);

// for creating
const apiUrlemployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;

const apiUrlSemen = `${IP}/api/Breeding/Semen?CompanyId=${companyId}`;

const apiUrlAnimal = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;
const apiUrlOutsider = `${IP}/api/ActiveOutsiders?CompanyId=${companyId}`;


creatingDropdown("EmployeeDropdown", apiUrlemployee, "EId", "EmployeeName");

creatingDropdown("SemenDropdown", apiUrlSemen, "ProductId", "ProductName");

creatingDropdown("AnimalDropdown", apiUrlAnimal, "AnimalId", "AnimalName");

creatingDropdown(
  "OutsiderDropdown",
  apiUrlOutsider,
  "OutsiderId",
  "OutsiderName"
);


// // for updating
const apiUrlUpdateEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;

const apiUrlSemenUpdate = `${IP}/api/Breeding/Semen?CompanyId=${companyId}`;

const apiUrlAnimalUpdate = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;
const apiUrlOutsiderUpdate = `${IP}/api/ActiveOutsiders?CompanyId=${companyId}`;

creatingDropdown("EmployeeUpdatedDropdown", apiUrlUpdateEmployee, "EId", "EmployeeName");
creatingDropdown("SemenUpdatedDropdown", apiUrlSemenUpdate, "ProductId", "ProductName");

creatingDropdown("AnimalUpdatedDropdown", apiUrlAnimalUpdate, "AnimalId", "AnimalName");

creatingDropdown(
  "OutsiderUpdatedDropdown",
  apiUrlOutsiderUpdate,
  "OutsiderId",
  "OutsiderName"
);

//form handle ==========

const breadingForm = document.getElementById("insertBreading");

breadingForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const EmployeeDropdown = document.getElementById("EmployeeDropdown").value;
  const SemenDropdown = document.getElementById("SemenDropdown").value;
  const AnimalDropdown = document.getElementById("AnimalDropdown").value;

  const OutsiderDropdown = document.getElementById("OutsiderDropdown").value;
  // const OutsiderCatagoryDropdown = document.getElementById(
  //   "OutsiderCatagoryDropdown"
  // ).value;

  const SemenDateBreading = document.getElementById("SemenDateBreading").value;
  const DeliveryDateBreading = document.getElementById(
    "DeliveryDateBreading"
  ).value;

  const PriceBreading = document.getElementById("PriceBreading").value;
  const semenPctBreading = document.getElementById("semenPctBreading").value;

  const breadingStatus = document.getElementById("breadingStatus").checked;

  let data = {
    EId: EmployeeDropdown,
    ProductId: SemenDropdown,
    AnimalId: AnimalDropdown,
    OutsiderId: OutsiderDropdown,
    // OutsiderCatagoryId: OutsiderCatagoryDropdown,
    SemenDate: SemenDateBreading,
    DeliveryDate: DeliveryDateBreading,
    Price: PriceBreading,
    SemenPer: semenPctBreading,
    Status: breadingStatus,
    CompanyId: companyId,
  };



  fetch(`https://localhost:7105/api/Breeding/CreateBreeding`, {
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
      breadingForm.reset();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("create Customfield failed.");
    });
});

// showing data to grid ==========

loadTable();
function loadTable() {
  fetch(`${IP}/api/Breeding/GetBreeding?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data,"commimg...");
      const tablebody = document.querySelector(".breadingTable");
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
        cell2.textContent = data[i].employeeName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].animalName;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].semenPer;

        let cell5 = document.createElement("td");

        cell5.textContent = data[i].price;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].semenDate.split('T')[0];

        let cell7 = document.createElement("td");

        cell7.textContent = data[i].deliveryDate.split('T')[0];

        let cell8 = document.createElement("td");

        cell8.textContent = data[i].outsider;

        let cell9= document.createElement("td");

        cell9.textContent = data[i].status;

        // let cell10= document.createElement("td");

        // cell10.textContent = data[i].outsider;

        let cell11 = document.createElement("td");
        cell11.setAttribute("id", data[i].breadingId);

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
  formUpdateId.setAttribute("data-category-id", rowData.breadingId);

  const EmployeeUpdatedDropdown = document.getElementById(
    "EmployeeUpdatedDropdown"
  );

  setSelectedOption(EmployeeUpdatedDropdown, rowData.employeeName);


  const SemenUpdatedDropdown = document.getElementById(
    "SemenUpdatedDropdown"
  );

  setSelectedOption(SemenUpdatedDropdown, rowData.productName);

  const AnimalUpdatedDropdown = document.getElementById(
    "AnimalUpdatedDropdown"
  );

  setSelectedOption(AnimalUpdatedDropdown, rowData.animalName);

  const OutsiderUpdatedDropdown = document.getElementById(
    "OutsiderUpdatedDropdown"
  );

  setSelectedOption(OutsiderUpdatedDropdown, rowData.outsider);
  


  const SemenDateUpdatedBreading = (document.getElementById(
    "SemenDateUpdatedBreading"
  ).value = `${rowData.semenDate.split('T')[0]}`) ;

  const DeliveryDateUpdatedBreading = (document.getElementById(
    "DeliveryDateUpdatedBreading"
  ).value = `${rowData.deliveryDate.split('T')[0]}`) ;


  // console.log(DeliveryDateUpdatedBreading,"shdagghadg date ");
  
  const PriceUpdateBreading = (document.getElementById(
    "PriceUpdateBreading"
  ).value = `${rowData.price}`);

  const semenPctUpdateBreading = (document.getElementById(
    "semenPctUpdateBreading"
  ).value = `${rowData.semenPer}`);

  const breadingUpdateStatus = (document.getElementById(
    "breadingUpdateStatus"
  ).checked = `${rowData.status}`);

  setSelectedOption(EmployeeUpdatedDropdown, rowData.employeeName
    );

}

// handle update button ============

const updateShedBtn = document.getElementById("updateBtn");

updateShedBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let breadingId = parseInt(document.getElementById("updated-formID").getAttribute("data-category-id"), 10);
  let EmployeeUpdatedDropdown = parseInt(document.getElementById("EmployeeUpdatedDropdown").value, 10);
  let SemenUpdatedDropdown = parseInt(document.getElementById("SemenUpdatedDropdown").value, 10);
  let AnimalUpdatedDropdown = parseInt(document.getElementById("AnimalUpdatedDropdown").value, 10);
  let OutsiderUpdatedDropdown = parseInt(document.getElementById("OutsiderUpdatedDropdown").value, 10);

  let SemenDateUpdatedBreading = document.getElementById("SemenDateUpdatedBreading").value;
  let DeliveryDateUpdatedBreading = document.getElementById("DeliveryDateUpdatedBreading").value;
  let PriceUpdateBreading = parseFloat(document.getElementById("PriceUpdateBreading").value);
  let semenPctUpdateBreading = parseFloat(document.getElementById("semenPctUpdateBreading").value);

  let breadingUpdateStatus = document.getElementById("breadingUpdateStatus").checked;

  let formData = new FormData();
  formData.append('BreadingId', breadingId);
  formData.append('EId', EmployeeUpdatedDropdown);
  formData.append('ProductId', SemenUpdatedDropdown);
  formData.append('Price', PriceUpdateBreading);
  formData.append('SemenPer', semenPctUpdateBreading);
  formData.append('SemenDate', SemenDateUpdatedBreading);
  formData.append('DeliveryDate', DeliveryDateUpdatedBreading);
  formData.append('AnimalID', AnimalUpdatedDropdown);
  formData.append('OutsiderId', OutsiderUpdatedDropdown);
  formData.append('CompanyId', companyId); // Make sure 'companyId' is defined somewhere in your script
  formData.append('Status', breadingUpdateStatus);

  console.log("formData", formData);

  fetch(`${IP}/api/Breeding/UpdateBreeding`, {
    method: "PUT",
    body: formData,
    // headers: { 'Content-Type': 'multipart/form-data' } // This line should be omitted, as the browser will set the correct content type for FormData
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    alert(data.message);
    console.log(data, "data message!");
    loadTable(); // Make sure this function is defined and does what you need
    // unitEditName.placeholder = ""; // Uncomment if needed
    breadingForm.reset(); // Make sure 'breadingForm' is defined and points to the correct form element
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
    alert("Update failed."); // Display an error message
  });
});

}
