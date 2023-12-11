function get_supplier() {}

const IP = "https://localhost:7105";
const companyId = parseInt(localStorage.getItem("companyId"), 10);

// for creating
const apiUrlmilk = `${IP}/api/ActiveGETMilks`;
const apiUrlGenderType = `${IP}/api/ActiveGETGender`;
const apiUrlproductType = `${IP}/api/ActiveProducts/ActiveAnimalType?CompanyId=${companyId}`;
const apiUrlShedType = `${IP}/api/ActiveSheds?CompanyId=${companyId}`;
creatingDropdown(
  "productTypeDropdown",
  apiUrlproductType,
  "ProductId",
  "ProductName"
);

creatingDropdown("milkTypeDropdown", apiUrlmilk, "MilkId", "MilkType");

creatingDropdown(
  "genderTypeDropdown",
  apiUrlGenderType,
  "GenderId",
  "GenderType"
);

creatingDropdown("shedTypeDropdown", apiUrlShedType, "ShedId", "ShedName");

// for Updating
const apiUrlmilkUpdate = `${IP}/api/ActiveGETMilks`;
const apiUrlGenderTypeUpdate = `${IP}/api/ActiveGETGender`;
const apiUrlproductTypeUpdate = `${IP}/api/ActiveProducts/ActiveAnimalType?CompanyId=${companyId}`;
const apiUrlShedTypeUpdate = `${IP}/api/ActiveSheds?CompanyId=${companyId}`;

creatingDropdown(
  "productTypeDropdownUpdate",
  apiUrlproductTypeUpdate,
  "ProductId",
  "ProductName"
);

creatingDropdown(
  "milkTypeDropdownUpdate",
  apiUrlmilkUpdate,
  "MilkId",
  "MilkType"
);
creatingDropdown(
  "genderTypeDropdownUpdate",
  apiUrlGenderTypeUpdate,
  "GenderId",
  "GenderType"
);
creatingDropdown(
  "shedTypeDropdownUpdate",
  apiUrlShedTypeUpdate,
  "ShedId",
  "ShedName"
);

// for details table
const apiUrlmilkDetails = `${IP}/api/ActiveGETMilks`;
const apiUrlGenderTypeDetails = `${IP}/api/ActiveGETGender`;
const apiUrlproductTypeDetails = `${IP}/api/ActiveProducts/ActiveAnimalType?CompanyId=${companyId}`;
const apiUrlShedTypeDetails = `${IP}/api/ActiveSheds?CompanyId=${companyId}`;

creatingDropdown(
  "productTypeDropdownDetails",
  apiUrlproductTypeDetails,
  "ProductId",
  "ProductName"
);

creatingDropdown(
  "milkTypeDropdownDetails",
  apiUrlmilkDetails,
  "MilkId",
  "MilkType"
);
creatingDropdown(
  "genderTypeDropdownDetails",
  apiUrlGenderTypeDetails,
  "GenderId",
  "GenderType"
);
creatingDropdown(
  "shedTypeDropdownDetails",
  apiUrlShedTypeDetails,
  "ShedId",
  "ShedName"
);




//form handle ==========

const animalForm = document.getElementById("insertAnimal");

animalForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const animalName = document.getElementById("animalId").value;
  const animalDob = document.getElementById("animalDob").value;
  const animalWeight = document.getElementById("animalWeight").value;

  const animalImg = document.getElementById("animalImg").files[0];

  const milkTypeDropdown = document.getElementById("milkTypeDropdown").value;
  const genderTypeDropdown =
    document.getElementById("genderTypeDropdown").value;
  const productTypeDropdown = document.getElementById(
    "productTypeDropdown"
  ).value;
  const shedTypeDropdown = document.getElementById("shedTypeDropdown").value;

  const IsDead = document.getElementById("IsDead").checked;
  const IsSold = document.getElementById("IsSold").checked;
  const isVaccinated = document.getElementById("isVaccinated").checked;
  const animalStatus = document.getElementById("animalStatus").checked;

  // const shedStatus = document.getElementById("shedStatus").checked;

  let formData = new FormData();
  formData.append("AnimalName", animalName);
  formData.append("DOB", animalDob);
  formData.append("weight", animalWeight);
  formData.append("ImageFile", animalImg);

  formData.append("MilkId", milkTypeDropdown);
  formData.append("GenderId", genderTypeDropdown);
  formData.append("ProductId", productTypeDropdown);
  formData.append("ShedId", shedTypeDropdown);
  formData.append("IsDead", IsDead);
  formData.append("IsSold", IsSold);
  formData.append("IsVaccinated", isVaccinated);
  formData.append("Status", animalStatus);
  formData.append("CompanyId", companyId);

  console.log(Array.from(formData.entries()));

  fetch(`https://localhost:7105/api/Animal/CreateAnimal`, {
    method: "POST",
    body: formData, // Use FormData here
    // Do not set Content-Type header, browser will set it
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log(data, "data message!");
      loadTable();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("create Customfield failed.");
    });
});

// showing data to grid ==========

// loadTable();
// function loadTable() {
//   fetch(`${IP}/api/Animal/GetAllAnimalDetails?CompanyId=${companyId}`)
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);

//       const cardContainer = document.querySelector(".cardContain");
//       cardContainer.innerHTML = "";
//       for (let i = 0; i < data.length; i++) {

//       }

//       // const tablebody = document.querySelector(".productTable");
//       // tablebody.innerHTML = "";

//       // for (let i = 0; i < data.length; i++) {
//       //   let newRow = document.createElement("tr");
//       //   newRow.classList.add("text-center");
//       //   // let cell1 = document.createElement("td");

//       //   // let checkbox = document.createElement("input");
//       //   // checkbox.type = "checkbox";
//       //   // checkbox.name = "uomCheckbox";
//       //   // checkbox.value = data[i].supplierId;
//       //   // checkbox.id = "checkbox_" + data[i].supplierId; // Create a unique ID for each checkbox

//       //   // // Append the checkbox to cell1
//       //   // cell1.appendChild(checkbox);
//       //   // cell1.setAttribute("id", data[i].supplierId);

//       //   // cell1.textContent = data[i].resolutionName;

//       //   let cell2 = document.createElement("td");
//       //   cell2.textContent = data[i].productName;

//       //   let cell3 = document.createElement("td");

//       //   cell3.textContent = data[i].productDescription;

//       //   let cell4 = document.createElement("td");

//       //   cell4.textContent = data[i].categoryName;

//       //   let cell5 = document.createElement("td");

//       //   cell5.textContent = data[i].price;

//       //   let cell6 = document.createElement("td");

//       //   cell6.textContent = data[i].uomName;

//       //   let cell8 = document.createElement("td");

//       //   cell8.textContent = data[i].status;

//       //   let cell7 = document.createElement("td");
//       //   cell7.setAttribute("id", data[i].productId);

//       //   // Create and append the SVG to the button
//       //   let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//       //   svg.setAttribute("width", "16");
//       //   svg.setAttribute("height", "16");
//       //   svg.setAttribute("fill", "currentColor");
//       //   svg.classList.add("bi", "bi-pencil-square");
//       //   svg.setAttribute("viewBox", "0 0 16 16");

//       //   let path1 = document.createElementNS(
//       //     "http://www.w3.org/2000/svg",
//       //     "path"
//       //   );
//       //   path1.setAttribute(
//       //     "d",
//       //     "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
//       //   );
//       //   let path2 = document.createElementNS(
//       //     "http://www.w3.org/2000/svg",
//       //     "path"
//       //   );
//       //   path2.setAttribute("fill-rule", "evenodd");
//       //   path2.setAttribute(
//       //     "d",
//       //     "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
//       //   );

//       //   svg.appendChild(path1);
//       //   svg.appendChild(path2);

//       //   let editButton = document.createElement("button");
//       //   editButton.className = "bg-light border-0";
//       //   editButton.appendChild(svg);
//       //   editButton.setAttribute("type", "button");
//       //   editButton.setAttribute("data-bs-toggle", "modal");
//       //   editButton.setAttribute("data-bs-target", "#updateModal");

//       //   cell7.appendChild(editButton);

//       //   editButton.addEventListener("click", function () {
//       //     addDataToPopup(data[i], this);
//       //   });
//       //   // cell5.addEventListener("click", function(){
//       //   //     addDataToPopup(this, this.id);
//       //   // });

//       //   // newRow.appendChild(cell1);
//       //   newRow.appendChild(cell2);
//       //   newRow.appendChild(cell3);
//       //   newRow.appendChild(cell4);
//       //   newRow.appendChild(cell5);
//       //   newRow.appendChild(cell6);
//       //   newRow.appendChild(cell8);
//       //   newRow.appendChild(cell7);

//       //   console.log(newRow, "row data");

//       //   tablebody.appendChild(newRow);
//       // }
//     })
//     .catch((error) => console.log("Error Message", error));
// }

loadTable();
function loadTable() {
  fetch(`https://localhost:7105/api/Animal/GetAllAnimalDetails?CompanyId=${1}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const cardContainer = document.querySelector(".cardContain");
      cardContainer.innerHTML = ""; // Clear existing content

      data.forEach((animal) => {
        // Create card element
        const card = document.createElement("div");
        card.className = "card m-3";
        card.style.width = "18rem";

        // Card HTML content
        card.innerHTML = `
          <img class="h-75" src="${IP}/Images/Uploads/${animal.animalImage}" alt="Image of ${animal.animalName}">
          <div class="card-body">
            <h5 class="card-title"> Animal Name : <span>${animal.animalName}</span></h5>
            <p class="card-text">Tag No: <span>${animal.animalTagNo}</span></p>
            <p class="card-text">Product: <span>${animal.productName}</span></p>
            <p class="card-text">Shed Name: <span>${animal.shedName}</span></p>
            <p class="card-text">Weight: <span>${animal.weight}</span></p>
            <p class="card-text">Gender Type: <span>${animal.genderType}</span></p>
            <div class="d-flex flex-column "></div>
          </div>
        `;

        // Create Edit button
        let editButton = document.createElement("a");
        editButton.className = "btn btn-primary mb-1";
        editButton.textContent = "Edit";
        editButton.href = "#";
        editButton.setAttribute("data-bs-toggle", "modal");
        editButton.setAttribute("data-bs-target", "#updateModal");

        editButton.addEventListener("click", () => {
          addDataToPopup(animal, editButton);
        });

        // Create Details button
        let detailsButton = document.createElement("a");
        detailsButton.className = "btn btn-secondary mb-1";
        detailsButton.textContent = "Details";
        detailsButton.href = "#";
        detailsButton.setAttribute("data-bs-toggle", "modal");
        detailsButton.setAttribute("data-bs-target", "#detailsModal");


        
        detailsButton.addEventListener("click", () => {
          addDataToPopupDetails(animal, detailsButton);
        });

        // Create Delete button
        let deleteButton = document.createElement("a");
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Delete";
        deleteButton.href = "#";
        // deleteButton.setAttribute("data-bs-toggle", "modal");
        // deleteButton.setAttribute("data-bs-target", "#deleteModal");


        deleteButton.addEventListener("click", () => {
          const animalId = animal.animalId; // make sure 'animal' is the correct object with the animalId
          console.log("Deleting animal with ID:", animalId);
      
          if(confirm("Are you sure you want to delete this animal?")) {
              fetch(`https://localhost:7105/api/Animal/DeleteAnimal/${animalId}`, {
                  method: 'DELETE'
              })
              .then(response => {
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
              })
              .then(data => {
                  console.log(data.message);
                  alert("Animal deleted successfully!");
                  // Refresh the list or redirect as necessary
                   loadTable(); 
              })
              .catch(error => {
                  console.error('Error during delete operation:', error);
                  alert("Failed to delete the animal.");
              });
          }
      });
      

        // Append buttons to card
        const buttonContainer = card.querySelector(".d-flex");
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(detailsButton);
        buttonContainer.appendChild(deleteButton);

        // Append the complete card to the container
        cardContainer.appendChild(card);
      });
    })
    .catch((error) => console.log("Error Message", error));
}

// showing data to edit modal =============

function addDataToPopup(rowData, editBtn) {
  // You can access the rowData and use it to fill in the modal fields.
  console.log("Row Data:", rowData, editBtn);

  const formUpdateId = document.getElementById("updated-formID");
  formUpdateId.setAttribute("data-category-id", rowData.animalId);

  const animalUpdateName = (document.getElementById(
    "animalIdUpdate"
  ).value = `${rowData.animalName}`);

  const productTypeUpdatedDropdown = document.getElementById(
    "productTypeDropdownUpdate"
  );
  setSelectedOption(productTypeUpdatedDropdown, rowData.productName);

  const milkTypeDropdownUpdate = document.getElementById(
    "milkTypeDropdownUpdate"
  );

  setSelectedOption(milkTypeDropdownUpdate, rowData.milkType);

  const genderTypeDropdownUpdate = document.getElementById(
    "genderTypeDropdownUpdate"
  );

  setSelectedOption(genderTypeDropdownUpdate, rowData.genderType);

  const shedTypeDropdownUpdate = document.getElementById(
    "shedTypeDropdownUpdate"
  );

  setSelectedOption(shedTypeDropdownUpdate, rowData.shedName);

  const animalWeightUpdate = (document.getElementById(
    "animalWeightUpdate"
  ).value = `${rowData.weight}`);


  // const animalImgUpdate = (document.getElementById(
  //   "animalImgUpdate"
  // ).value = `${rowData.animalImage}`);

 
const animalImgUpdate = document.getElementById("animalImgUpdate");
const currentAnimalImage = document.getElementById("currentAnimalImage");
const existingAnimalImageInput = document.getElementById("existingAnimalImage");


 // Display and set existing image
 if (rowData.animalImage) {
  currentAnimalImage.src = `${IP}/Images/Uploads/${rowData.animalImage}`;
  currentAnimalImage.style.display = 'block';
  existingAnimalImageInput.value = rowData.animalImage;
} else {
  currentAnimalImage.style.display = 'none';
  existingAnimalImageInput.value = '';
}




  if (rowData.dob) {
    const animalDobUpdate = document.getElementById("animalDobUpdate");
    animalDobUpdate.value = rowData.dob.split("T")[0];
  } else {
    // Handle the case where dob is null or undefined
    const animalDobUpdate = document.getElementById("animalDobUpdate");
    animalDobUpdate.value = ''; // Clear the field or set to a default value
  }
  

  // const animalImgUpdate = (document.getElementById(
  //   "animalImgUpdate"
  // ).value = `${rowData.animalImage}`);

const IsDeadUpdated = document.getElementById("IsDeadUpdated").checked = rowData.isDead; 
// Sets the checkbox based on the isDead value

const IsSoldUpdated = document.getElementById("IsSoldUpdated").checked = rowData.isSold; // Sets the checkbox based on the isSold value

const isVaccinatedUpdated = document.getElementById("isVaccinatedUpdated").checked = rowData.isVaccinated;
 // Sets the checkbox based on the isVaccinated value

const animalStatusUpdated = document.getElementById("animalStatusUpdated").checked = rowData.status;

}



const updateAnimalBtn = document.getElementById("updateAnimal");

updateAnimalBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let animalId = document.getElementById("updated-formID").getAttribute("data-category-id");
  let formData = new FormData();

  // Append data to formData
  formData.append("AnimalId", animalId);
  formData.append("AnimalName", document.getElementById("animalIdUpdate").value);
  formData.append("ProductId", document.getElementById("productTypeDropdownUpdate").value);
  formData.append("milkId", document.getElementById("milkTypeDropdownUpdate").value);
  formData.append("genderId", document.getElementById("genderTypeDropdownUpdate").value);
  formData.append("shedId", document.getElementById("shedTypeDropdownUpdate").value);
  formData.append("dob", document.getElementById("animalDobUpdate").value);
  formData.append("weight", document.getElementById("animalWeightUpdate").value);


  // ... append other fields in a similar way

  const fileInput = document.getElementById("animalImgUpdate");
  const existingAnimalImageInput = document.getElementById("existingAnimalImage");

  if (fileInput.files.length > 0) {
    formData.append("ImageFile", fileInput.files[0]);
    existingAnimalImageInput.value = ''; // Clear if new file is uploaded
  }

  // Always append existing image filename; server decides what to do with it
  formData.append("ExistingImageFilename", existingAnimalImageInput.value);

  // Append checkboxes
  formData.append("IsDead", document.getElementById("IsDeadUpdated").checked);
  formData.append("IsSold", document.getElementById("IsSoldUpdated").checked);
  formData.append("IsVaccinated", document.getElementById("isVaccinatedUpdated").checked);
  formData.append("Status", document.getElementById("animalStatusUpdated").checked);

  // Send the request
  fetch(`https://localhost:7105/api/Animal/UpdateAnimal`, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Handle success
    alert("successfully updated");
    loadTable();
  })
  .catch(error => {
    console.error('Error:', error);
    // Handle error
  });
});

function  addDataToPopupDetails(rowData, detailsButton) {
  // You can access the rowData and use it to fill in the modal fields.
  console.log("Row Data:", rowData, detailsButton);

  const formUpdateId = document.getElementById("updated-formID");
  formUpdateId.setAttribute("data-category-id", rowData.animalId);

  const animalIdDetails = (document.getElementById(
    "animalIdDetails"
  ).value = `${rowData.animalName}`);

  const productTypeDropdownDetails = document.getElementById(
    "productTypeDropdownDetails"
  );
  setSelectedOption(productTypeDropdownDetails, rowData.productName);

  const milkTypeDropdownDetails = document.getElementById(
    "milkTypeDropdownDetails"
  );

  setSelectedOption(milkTypeDropdownDetails, rowData.milkType);

  const genderTypeDropdownUpdate = document.getElementById(
    "genderTypeDropdownUpdate"
  );

  setSelectedOption(genderTypeDropdownDetails, rowData.genderType);

  const shedTypeDropdownDetails = document.getElementById(
    "shedTypeDropdownDetails"
  );

  setSelectedOption(shedTypeDropdownDetails, rowData.shedName);

  const animalWeightDetails = (document.getElementById(
    "animalWeightDetails"
  ).value = `${rowData.weight}`);


  // const animalImgUpdate = (document.getElementById(
  //   "animalImgUpdate"
  // ).value = `${rowData.animalImage}`);

 
const animalImgUpdate = document.getElementById("animalImgDetails");
const currentAnimalImageDetails = document.getElementById("currentAnimalImageDetails");
const existingAnimalImageInput = document.getElementById("existingAnimalImage");


 // Display and set existing image
 if (rowData.animalImage) {
  currentAnimalImageDetails.src = `${IP}/Images/Uploads/${rowData.animalImage}`;
  currentAnimalImageDetails.style.display = 'block';
 
} else {
  currentAnimalImage.style.display = 'none';
 
}

// const qrCodeDetails =  document.getElementById("qrCodeDetails").value = rowData.qrCodeImageBase64;

if (rowData.dob) {
  const animalDobDetails = document.getElementById("animalDobDetails");
  animalDobDetails.value = rowData.dob.split("T")[0];
} else {
  // Handle the case where dob is null or undefined
  const animalDobDetails = document.getElementById("animalDobDetails");
  animalDobDetails.value = ''; // Clear the field or set to a default value
}


const IsDeadDetails = document.getElementById("IsDeadDetails").checked = rowData.isDead; 
// Sets the checkbox based on the isDead value

const IsSoldDetails = document.getElementById("IsSoldDetails").checked = rowData.isSold; // Sets the checkbox based on the isSold value

const isVaccinatedDetails = document.getElementById("isVaccinatedDetails").checked = rowData.isVaccinated;
 // Sets the checkbox based on the isVaccinated value

const animalStatusDetails = document.getElementById("animalStatusDetails").checked = rowData.status;

}

