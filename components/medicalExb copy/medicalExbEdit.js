const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
// const urlParams = new URLSearchParams(window.location.search);
const medicalIdEdit = localStorage.getItem("medicalIdEdit");

console.log(medicalIdEdit, "id...");

const apiUrlEmployeeMed = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlAnimalTypeMed = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlOutsiderMed = `${IP}/api/ActiveOutsiders?CompanyId=${companyId}`;

const apiUrlShedMed = `${IP}/api/ActiveSheds?CompanyId=${companyId}`;

const apiUrlUnitMed = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;

const apiUrlMedicine = `${IP}/api/ActiveProducts/GetActiveMedicines?CompanyId=${companyId}`;

creatingDropdown(
  "employeeDropdownMedUpdate",
  apiUrlEmployeeMed,
  "EId",
  "EmployeeName"
);
creatingDropdown(
  "animalDropdownMedUpdate",
  apiUrlAnimalTypeMed,
  "AnimalId",
  "AnimalName"
);
creatingDropdown(
  "outsiderDropdownMedUpdate",
  apiUrlOutsiderMed,
  "OutsiderId",
  "OutsiderName"
);


// // console.log(grainIdEdit, "hsdfsfd");


loadTable();
function loadTable() {
  fetch(`${IP}/api/MedicalExhibition/${medicalIdEdit}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "data.........");
      // Populate form fields
      document.getElementById('exbDateUpdate').value = data.exhibitionDate.split('T')[0];

      setSelectedOption(
        document.getElementById("employeeDropdownMedUpdate"),
        data.employeeName
      );
      setSelectedOption(
        document.getElementById("animalDropdownMedUpdate"),
        data.animalName
      );
      setSelectedOption(
        document.getElementById("outsiderDropdownMedUpdate"),
        data.outsiderName
      );

      document.getElementById("IsNewMedUpdate").checked = data.isNew;
      document.getElementById("IsSickMedUpdate").checked = data.isSick;
      document.getElementById("exbCodeUpdate").value = data.medicalCode;

      // Populate table rows with input fields
      const medicineTableBody = document.querySelector("#medicineEntryTableUpdate tbody");
      medicineTableBody.innerHTML = "";
      data.medicineDetailsById.forEach((detail, index) => {
        let row = medicineTableBody.insertRow();

        const cellDataMedicine = [
          {
            type: "dropdown",
            class: "medicineDropdown" + index,
            apiUrl: apiUrlMedicine,
            valueProp: "ProductId",
            textProp: "ProductName",
          },
          {
            type: "dropdown",
            class: "unitDropdown" + index,
            apiUrl: apiUrlUnitMed,
            valueProp: "UomId",
            textProp: "UomName",
          },

          { value: detail.day, type: "decimal", class: "medicalDay" },
          { value: detail.time, type: "string", class: "medicalTime" },
          { value: detail.qty, type: "decimal", class: "medicalQty" },
        ];

        cellDataMedicine.forEach((cd) => {
          let cell = row.insertCell();
          if (cd.type === "dropdown") {
            let dropdown = document.createElement("select");
            dropdown.className = `form-control ${cd.class}`;

            cell.appendChild(dropdown);

            console.log("cd.valueProp:", cd.valueProp);
            console.log("cd.textProp:", cd.textProp);

            creatingDropdownClass(
              dropdown,
              cd.apiUrl,
              cd.valueProp,
              cd.textProp
            );
            //console.log(detail.productId,"fshhsfdkjh");
            // Assuming you have your 'dropdown' and 'detail' object defined

            setTimeout(function () {
              setSelectedOption(dropdown, detail.productName);
            }, 10);

            console.log(detail.productName, "product Name: ");

            setTimeout(function () {
              setSelectedOption(dropdown, detail.uomName);
            }, 1000);

            // console.log(detail[cd.valueProp]);
          } else {
            let input = document.createElement("input");
            input.type = cd.type;
            input.value = cd.value;
            input.className = `form-control ${cd.class}`;

            cell.appendChild(input);
          }
        });
      });

      const quarantineTableBody = document.querySelector("#quarentainEntryTableUpdate tbody");
      quarantineTableBody.innerHTML = "";
      data.quarantaineDetailsById.forEach((detail, index) => {
        let row = quarantineTableBody.insertRow();

        const cellDataQuarentain = [
          {
            type: "dropdown",
            class: "shedDropdown" + index,
            apiUrl: apiUrlShedMed,
            valueProp: "ShedId",
            textProp: "ShedName",
          },
         
          { value: detail.startDate.split('T')[0], type: "date", class: "medicalStartDay" },
          { value: detail.endDate.split('T')[0], type: "date", class: "medicalEndDay" },
         
        ];

        cellDataQuarentain.forEach((cd) => {
          let cell = row.insertCell();
          if (cd.type === "dropdown") {
            let dropdown = document.createElement("select");
            dropdown.className = `form-control ${cd.class}`;

            cell.appendChild(dropdown);

            console.log("cd.valueProp:", cd.valueProp);
            console.log("cd.textProp:", cd.textProp);

            creatingDropdownClass(
              dropdown,
              cd.apiUrl,
              cd.valueProp,
              cd.textProp
            );
            //console.log(detail.productId,"fshhsfdkjh");
            // Assuming you have your 'dropdown' and 'detail' object defined

            setTimeout(function () {
              setSelectedOption(dropdown, detail.shedName);
            }, 1000);

         console.log(detail.shedName, "detail.shedName");

            // console.log(detail[cd.valueProp]);
          } else {
            let input = document.createElement("input");
            input.type = cd.type;
            input.value = cd.value;
            input.className = `form-control ${cd.class}`;

            cell.appendChild(input);
          }
        });
      });


    })
    .catch((error) => console.log("Error Message", error));
}


// let updateBtn = document.getElementById("updateBtn");


// updateBtn.addEventListener("click", function (event) {
//   event.preventDefault();

//   console.log("clicked...");
//   const exbDate = document.getElementById("exbDateUpdate").value;
//   const employeeId = parseInt(
//     document.getElementById("employeeDropdownMedUpdate").value,
//     10
//   );
//   const animalId = parseInt(
//     document.getElementById("animalDropdownMedUpdate").value,
//     10
//   );
//   const outsiderId = parseInt(
//     document.getElementById("outsiderDropdownMedUpdate").value,
//     10
//   );
//   const isNew = document.getElementById("IsNewMedUpdate").checked;
//   const isSick = document.getElementById("IsSickMedUpdate").checked;

//   // Collecting data from the 'Medicine' table rows
//   const medicineRows = document.querySelectorAll(
//     "#medicineEntryTable tbody tr"
//   );
//   const medicineDetails = Array.from(medicineRows).map((row) => {
//     return {
//       productId: row.querySelector(`.medicineDropdown${index}`).value,
//       uomId: row.querySelector(`.unitDropdown${index}`).value,
//       day: row.querySelector(".medicalDay").value,
//       time: row.querySelector(".medicalTime").value,
//       qty: row.querySelector(".medicalQty").value,
//     };
//   });

//   // Collecting data from the 'Quarantaine' table rows
//   const quarantaineRows = document.querySelectorAll(
//     "#quarentainEntryTable tbody tr"
//   );
//   const quarantaineDetails = Array.from(quarantaineRows).map((row) => {
//     return {
//       shedId: row.querySelector(`.shedDropdown${index}`).value,
//       startDate: row.querySelector(".medicalStartDay").value,
//       endDate: row.querySelector(".medicalEndDay").value,
//     };
//   });

//   const formData = new FormData();
//   formData.append("CompanyId", companyId);
//   formData.append("ExhibitionDate", exbDate);
//   formData.append("EId", employeeId);
//   formData.append("AnimalId", animalId);
//   formData.append("OutsiderId", outsiderId);
//   formData.append("IsNew", isNew);
//   formData.append("IsSick", isSick);

//   const combinedDetails = {
//     medicines: medicineDetails,
//     quarantaines: quarantaineDetails,
//   };
//   formData.append("data", JSON.stringify(combinedDetails));


//   // Log the data for debugging
//   formData.forEach((value, key) => {
//     console.log(key, value);
//   });


//   fetch(`${IP}/api/MedicalExhibition/UpdateMilkCollection?MedicalId=${medicalIdEdit}`, {
//     method: "PUT",
  
//     body: formData,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Success:", data);
//       // Reload or redirect here, based on success response
//       alert("Successfully updated!");
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// });

let updateBtn = document.getElementById("updateBtn");

updateBtn.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("clicked...");

  const exbDate = document.getElementById("exbDateUpdate").value;
  const employeeId = parseInt(document.getElementById("employeeDropdownMedUpdate").value, 10);
  const animalId = parseInt(document.getElementById("animalDropdownMedUpdate").value, 10);
  const outsiderId = parseInt(document.getElementById("outsiderDropdownMedUpdate").value, 10);
  const isNew = document.getElementById("IsNewMedUpdate").checked;
  const isSick = document.getElementById("IsSickMedUpdate").checked;

  // Collecting data from the 'Medicine' table rows
  const medicineRows = document.querySelectorAll("#medicineEntryTableUpdate tbody tr");
  const medicineDetails = Array.from(medicineRows).map((row, index) => {
    return {
      productId: row.querySelector(`.medicineDropdown${index}`).value, 
      uomId: row.querySelector(`.unitDropdown${index}`).value,
      day: row.querySelector(".medicalDay").value,
      time: row.querySelector(".medicalTime").value,
      qty: row.querySelector(".medicalQty").value,
    };
  });

  // Collecting data from the 'Quarantaine' table rows
  const quarantaineRows = document.querySelectorAll("#quarentainEntryTableUpdate tbody tr");
  const quarantaineDetails = Array.from(quarantaineRows).map((row, index) => {
    return {
      shedId: row.querySelector(`.shedDropdown${index}`).value,
      startDate: row.querySelector(".medicalStartDay").value,
      endDate: row.querySelector(".medicalEndDay").value,
    };
  });

  const formData = new FormData();
  formData.append("CompanyId", companyId); // Ensure companyId is defined
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

  fetch(`${IP}/api/MedicalExhibition/UpdateMilkCollection?MedicalId=${medicalIdEdit}`, {
    method: "PUT",
    body: formData,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log("Success:", data);
    alert("Successfully updated!");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
});


