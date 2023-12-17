const IP = "https://localhost:7105";
const companyId = parseInt(localStorage.getItem("companyId"), 10);

const apiUrlEmployeeMed = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlAnimalTypeMed = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlOutsiderMed = `${IP}/api/ActiveOutsiders?CompanyId=${companyId}`;

const apiUrlShedMed = `${IP}/api/ActiveSheds?CompanyId=${companyId}`;

const apiUrlUnitMed = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;

const apiUrlMedicine = `${IP}/api/ActiveProducts/GetActiveMedicines?CompanyId=${companyId}`;

// const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;
creatingDropdown(
  "employeeDropdownMed",
  apiUrlEmployeeMed,
  "EId",
  "EmployeeName"
);
creatingDropdown(
  "animalDropdownMed",
  apiUrlAnimalTypeMed,
  "AnimalId",
  "AnimalName"
);
creatingDropdown(
  "outsiderDropdownMed",
  apiUrlOutsiderMed,
  "OutsiderId",
  "OutsiderName"
);

// for medicine add button functionality

// Function to add a new row to the table
function addNewRowMedicine() {
  console.log("clicked");
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
       
            <td><select class="form-control medicineDropdown" ><option value="">--Select--</option></select></td>

            <td><select class="form-control medicineUnitDropdown" ><option value="">--Select--</option></select></td>
         
            <td><input type="decimal" class="form-control dayMed"></td>
            <td><input type="decimal" class="form-control timeMed"></td>

            <td><input type="decimal" class="form-control qtyMed"></td>
            
            
            <td><button type="button" class="btn btn-danger removeRowMedBtn">Remove</button></td>
          `;

  creatingDropdownClass(
    newRow.getElementsByClassName("medicineDropdown")[0],
    apiUrlMedicine,
    "ProductId",
    "ProductName"
  );

  creatingDropdownClass(
    newRow.getElementsByClassName("medicineUnitDropdown")[0],
    apiUrlUnitMed,
    "UomId",
    "UomName"
  );

  document
    .getElementById("medicineEntryTable")
    .querySelector("tbody")
    .appendChild(newRow);
}

// Event delegation to handle row removal
document
  .getElementById("medicineEntryTable")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeRowMedBtn")) {
      e.target.closest("tr").remove();
    }
  });

// Add row on "Add" button click

let addBtn = document.getElementById("addRowBtnMedicine");
console.log(addBtn);
addBtn.addEventListener("click", function () {
  addNewRowMedicine();
});

// for quarentain add button functionality

// Function to add a new row to the table
function addNewRowQuarentain() {
  console.log("clicked");
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
       
            <td><select class="form-control shedDropdown" ><option value="">--Select--</option></select></td>
         
          
            <td><input type="date" class="form-control startDateQua"></td>

            <td><input type="date" class="form-control endDateQua"></td>
            
            
            <td><button type="button" class="btn btn-danger removeRowQuarentaineBtn">Remove</button></td>
          `;

  creatingDropdownClass(
    newRow.getElementsByClassName("shedDropdown")[0],
    apiUrlShedMed,
    "ShedId",
    "ShedName"
  );

  document
    .getElementById("quarentainEntryTable")
    .querySelector("tbody")
    .appendChild(newRow);
}

// Event delegation to handle row removal
document
  .getElementById("quarentainEntryTable")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeRowQuarentaineBtn")) {
      e.target.closest("tr").remove();
    }
  });

// Add row on "Add" button click

let addBtnQuarentain = document.getElementById("addRowBtnQuarentaine");
console.log(addBtn);
addBtnQuarentain.addEventListener("click", function () {
  addNewRowQuarentain();
});


const medExbForm = document.getElementById("medExbEntryForm");

medExbForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("Form submission initiated...");

  // Collecting basic form data
  const exbDate = document.getElementById("exbDate").value;
  const employeeId = parseInt(
    document.getElementById("employeeDropdownMed").value,
    10
  );
  const animalId = parseInt(
    document.getElementById("animalDropdownMed").value,
    10
  );
  const outsiderId = parseInt(
    document.getElementById("outsiderDropdownMed").value,
    10
  );
  const isNew = document.getElementById("IsNewMed").checked;
  const isSick = document.getElementById("IsSickMed").checked;

  // Collecting data from the 'Medicine' table rows
  const medicineRows = document.querySelectorAll(
    "#medicineEntryTable tbody tr"
  );
  const medicineDetails = Array.from(medicineRows).map((row) => {
    return {
      productId: row.querySelector(".medicineDropdown").value,
      uomId: row.querySelector(".medicineUnitDropdown").value,
      day: row.querySelector(".dayMed").value,
      time: row.querySelector(".timeMed").value,
      qty: row.querySelector(".qtyMed").value,
    };
  });

  // Collecting data from the 'Quarantaine' table rows
  const quarantaineRows = document.querySelectorAll(
    "#quarentainEntryTable tbody tr"
  );
  const quarantaineDetails = Array.from(quarantaineRows).map((row) => {
    return {
      shedId: row.querySelector(".shedDropdown").value,
      startDate: row.querySelector(".startDateQua").value,
      endDate: row.querySelector(".endDateQua").value,
    };
  });

  const formData = new FormData();
  formData.append("CompanyId", companyId);
  formData.append("ExhibitionDate", exbDate);
  formData.append("EId", employeeId);
  formData.append("AnimalId", animalId);
  formData.append("OutsiderId", outsiderId);
  formData.append("IsNew", isNew);
  formData.append("IsSick", isSick);

  const combinedDetails = {
    medicines: medicineDetails,
    quarantaines: quarantaineDetails,
  };
  formData.append("data", JSON.stringify(combinedDetails));


  // Log the data for debugging
  formData.forEach((value, key) => {
    console.log(key, value);
  });



  // Make the POST request
  fetch(`${IP}/api/MedicalExhibition`, {
    method: "POST",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // Optional: Reset form, navigate away, or show success message
      alert("Successfully added");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
