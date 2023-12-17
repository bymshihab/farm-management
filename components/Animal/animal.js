function get_animal() {
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
        animalForm.reset();
        loadTable();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("create Customfield failed.");
      });
  });

  

  loadTable();
  function loadTable() {
    fetch(
      `${IP}/api/Animal/GetAllAnimalDetails?CompanyId=${companyId}`
    )
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
            <p class="card-text"> <span class="fw-bolder"> Tag No:</span> <span>${animal.animalTagNo}</span></p>
            <p class="card-text">  <span class="fw-bolder">Product: </span> <span>${animal.productName}</span></p>
           
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

            if (confirm("Are you sure you want to delete this animal?")) {
              fetch(
                `https://localhost:7105/api/Animal/DeleteAnimal/${animalId}`,
                {
                  method: "DELETE",
                }
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  return response.json();
                })
                .then((data) => {
                  console.log(data.message);
                  alert("Animal deleted successfully!");
                  // Refresh the list or redirect as necessary
                  loadTable();
                })
                .catch((error) => {
                  console.error("Error during delete operation:", error);
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
    const existingAnimalImageInput = document.getElementById(
      "existingAnimalImage"
    );

    // Display and set existing image
    if (rowData.animalImage) {
      currentAnimalImage.src = `${IP}/Images/Uploads/${rowData.animalImage}`;
      currentAnimalImage.style.display = "block";
      existingAnimalImageInput.value = rowData.animalImage;
    } else {
      currentAnimalImage.style.display = "none";
      existingAnimalImageInput.value = "";
    }

    if (rowData.dob) {
      const animalDobUpdate = document.getElementById("animalDobUpdate");
      animalDobUpdate.value = rowData.dob.split("T")[0];
    } else {
      // Handle the case where dob is null or undefined
      const animalDobUpdate = document.getElementById("animalDobUpdate");
      animalDobUpdate.value = ""; // Clear the field or set to a default value
    }

    // const animalImgUpdate = (document.getElementById(
    //   "animalImgUpdate"
    // ).value = `${rowData.animalImage}`);

    const IsDeadUpdated = (document.getElementById("IsDeadUpdated").checked =
      rowData.isDead);
    // Sets the checkbox based on the isDead value

    const IsSoldUpdated = (document.getElementById("IsSoldUpdated").checked =
      rowData.isSold); // Sets the checkbox based on the isSold value

    const isVaccinatedUpdated = (document.getElementById(
      "isVaccinatedUpdated"
    ).checked = rowData.isVaccinated);
    // Sets the checkbox based on the isVaccinated value

    const animalStatusUpdated = (document.getElementById(
      "animalStatusUpdated"
    ).checked = rowData.status);
  }

  const updateAnimalBtn = document.getElementById("updateAnimal");

  updateAnimalBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let animalId = document
      .getElementById("updated-formID")
      .getAttribute("data-category-id");
    let formData = new FormData();

    // Append data to formData
    formData.append("AnimalId", animalId);
    formData.append(
      "AnimalName",
      document.getElementById("animalIdUpdate").value
    );
    formData.append(
      "ProductId",
      document.getElementById("productTypeDropdownUpdate").value
    );
    formData.append(
      "milkId",
      document.getElementById("milkTypeDropdownUpdate").value
    );
    formData.append(
      "genderId",
      document.getElementById("genderTypeDropdownUpdate").value
    );
    formData.append(
      "shedId",
      document.getElementById("shedTypeDropdownUpdate").value
    );
    formData.append("dob", document.getElementById("animalDobUpdate").value);
    formData.append(
      "weight",
      document.getElementById("animalWeightUpdate").value
    );

    // ... append other fields in a similar way

    const fileInput = document.getElementById("animalImgUpdate");
    const existingAnimalImageInput = document.getElementById(
      "existingAnimalImage"
    );

    if (fileInput.files.length > 0) {
      formData.append("ImageFile", fileInput.files[0]);
      existingAnimalImageInput.value = ""; // Clear if new file is uploaded
    }

    // Always append existing image filename; server decides what to do with it
    formData.append("ExistingImageFilename", existingAnimalImageInput.value);

    // Append checkboxes
    formData.append("IsDead", document.getElementById("IsDeadUpdated").checked);
    formData.append("IsSold", document.getElementById("IsSoldUpdated").checked);
    formData.append(
      "IsVaccinated",
      document.getElementById("isVaccinatedUpdated").checked
    );
    formData.append(
      "Status",
      document.getElementById("animalStatusUpdated").checked
    );

    // Send the request
    fetch(`https://localhost:7105/api/Animal/UpdateAnimal`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Handle success
        loadTable();
        alert("successfully updated");
       
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle error
      });
  });

  function addDataToPopupDetails(rowData, detailsButton) {
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
    const currentAnimalImageDetails = document.getElementById(
      "currentAnimalImageDetails"
    );
    const existingAnimalImageInput = document.getElementById(
      "existingAnimalImage"
    );

    // Display and set existing image
    if (rowData.animalImage) {
      currentAnimalImageDetails.src = `${IP}/Images/Uploads/${rowData.animalImage}`;
      currentAnimalImageDetails.style.display = "block";
    } else {
      currentAnimalImage.style.display = "none";
    }

    const qrCodeDetails = document.getElementById("qrCodeDetails");
    qrCodeDetails.src = "data:image/png;base64," + rowData.qrCodeImageBase64;
    qrCodeDetails.style.display = "block";

    if (rowData.dob) {
      const animalDobDetails = document.getElementById("animalDobDetails");
      animalDobDetails.value = rowData.dob.split("T")[0];
    } else {
      // Handle the case where dob is null or undefined
      const animalDobDetails = document.getElementById("animalDobDetails");
      animalDobDetails.value = ""; // Clear the field or set to a default value
    }

    const IsDeadDetails = (document.getElementById("IsDeadDetails").checked =
      rowData.isDead);
    // Sets the checkbox based on the isDead value

    const IsSoldDetails = (document.getElementById("IsSoldDetails").checked =
      rowData.isSold); // Sets the checkbox based on the isSold value

    const isVaccinatedDetails = (document.getElementById(
      "isVaccinatedDetails"
    ).checked = rowData.isVaccinated);
    // Sets the checkbox based on the isVaccinated value

    const animalStatusDetails = (document.getElementById(
      "animalStatusDetails"
    ).checked = rowData.status);
  }
}
