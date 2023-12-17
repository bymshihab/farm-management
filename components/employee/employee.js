function get_employee() {

const IP = "https://localhost:7105";
const companyId = parseInt(localStorage.getItem("companyId"), 10);

const employeeForm = document.getElementById("insertEmployee");

employeeForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData();

  formData.append(
    "FirstName",
    document.getElementById("employeeIdFirstName").value
  );
  formData.append(
    "LastName",
    document.getElementById("employeeIdLastName").value
  );
  formData.append(
    "MiddleName",
    document.getElementById("employeeIdMiddleName").value
  );
  formData.append("Salary", document.getElementById("empSalary").value);
  formData.append("DOB", document.getElementById("empDob").value);
  formData.append("HireDate", document.getElementById("empHireDate").value);
  formData.append("PhoneNumber", document.getElementById("empNumber").value);
  formData.append("Email", document.getElementById("empEmail").value);
  formData.append("NID", document.getElementById("empNid").value);
  formData.append("Description", document.getElementById("empDescp").value);
  formData.append("JobTitle", document.getElementById("empJobTitle").value);
  formData.append("ImageFile", document.getElementById("empImg").files[0]);
  formData.append("Status", document.getElementById("empStatus").checked);
  formData.append("CompanyId", companyId);

  // Add other form fields as needed

  fetch(`${IP}/api/Employee/CreateEmployee`, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Employee created successfully");
      employeeForm.reset();
      loadTable();
      // You can add additional actions upon successful request here
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while creating the employee");
    });
});

loadTable();
function loadTable() {
  fetch(`${IP}/api/Employee/GetActiveEmployees?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      const cardContainer = document.querySelector(".cardContain");
      cardContainer.innerHTML = ""; // Clear existing content

      data.forEach((employee) => {
        // Create card element
        const card = document.createElement("div");
        card.className = "card m-3";
        card.style.width = "18rem";

        // Full name construction
        const fullName = `${employee.FirstName} ${employee.MiddleName} ${employee.LastName}`;

        // Card HTML content
        card.innerHTML = `
    <img class="card-img-top" src="${IP}/Images/EmployeeImage/${
          employee.EmployeeImage
        }" alt="Image of ${fullName.trim()}">
    <div class="card-body">
      <h5 class="card-title">Name: <span>${fullName.trim()}</span></h5>
      <p class="card-text"><span class="fw-bolder">Employee Code: </span> <span>${
        employee.EmployeeCode
      }</span></p>
      <p class="card-text mb-2"><span class="fw-bolder">Job Title: </span></p>
      <p class="card-text"><span>${employee.JobTitle}</span></p>
      
      
 
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
          addDataToPopup(employee, editButton);
        });

        // Create Details button
        let detailsButton = document.createElement("a");
        detailsButton.className = "btn btn-secondary mb-1";
        detailsButton.textContent = "Details";
        detailsButton.href = "#";
        detailsButton.setAttribute("data-bs-toggle", "modal");
        detailsButton.setAttribute("data-bs-target", "#detailsModal");

        detailsButton.addEventListener("click", () => {
          addDataToPopupDetails(employee, detailsButton);
        });

        // Create Delete button
        let deleteButton = document.createElement("a");
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Delete";
        deleteButton.href = "#";
        // deleteButton.setAttribute("data-bs-toggle", "modal");
        // deleteButton.setAttribute("data-bs-target", "#deleteModal");

          deleteButton.addEventListener("click", () => {
            const employeeId = employee.EId; // make sure 'animal' is the correct object with the animalId
            console.log("Deleting animal with ID:", employeeId);

            if(confirm("Are you sure you want to delete this Employee?")) {
                fetch(`${IP}/api/Employee/DeleteEmployee/${employeeId}`, {
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
                    alert("Employee deleted successfully!");
                    // Refresh the list or redirect as necessary
                     loadTable();
                })
                .catch(error => {
                    console.error('Error during delete operation:', error);
                    alert("Failed to delete the employee.");
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
  console.log("Row Data:", rowData, editBtn);

  // Set the employee ID as a data attribute
  const formUpdateId = document.getElementById("updated-formID");
  formUpdateId.setAttribute("data-employee-id", rowData.EId);

  // Update the form fields with the employee data
  document.getElementById("employeeIdFirstNameUpdate").value =
    rowData.FirstName;
  document.getElementById("employeeIdMiddleNameUpdate").value =
    rowData.MiddleName;
  document.getElementById("employeeIdLastNameUpdate").value = rowData.LastName;
  document.getElementById("empEmailUpdate").value = rowData.Email;

  document.getElementById("empDobUpdate").value = rowData.DOB.split("T")[0];
  document.getElementById("empHireDateUpdate").value = rowData.HireDate.split("T")[0];

  document.getElementById("empNidUpdate").value = rowData.NID;
  document.getElementById("empDescpUpdate").value = rowData.Description;

  document.getElementById("empNumberUpdate").value = rowData.PhoneNumber;
  document.getElementById("empSalaryUpdate").value = rowData.Salary;
  document.getElementById("empJobTitleUpdate").value = rowData.JobTitle;

  // Update the image
  const employeeImgUpdate = document.getElementById("empImgUpdate");

  const currentEmployeeImage = document.getElementById("currentEmployeeImage");
  const existingEmployeeImageInput = document.getElementById(
    "existingEmployeeImageInput"
  );

  if (rowData.EmployeeImage) {
    currentEmployeeImage.src = `${IP}/Images/EmployeeImage/${rowData.EmployeeImage}`;
    currentEmployeeImage.style.display = "block";
    
  } else {
    currentEmployeeImage.style.display = "none";
   
  }

  const empStatusUpdate = (document.getElementById("empStatusUpdate").checked =
    rowData.Status);

}

const updateEmployeeBtn = document.getElementById("updateEmployee");

updateEmployeeBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let employeeId = document.getElementById("updated-formID").getAttribute("data-employee-id");
  let formData = new FormData();

  // Append employee data to formData
  formData.append("EId", employeeId);
  formData.append("FirstName", document.getElementById("employeeIdFirstNameUpdate").value);
  formData.append("MiddleName", document.getElementById("employeeIdMiddleNameUpdate").value);
  formData.append("LastName", document.getElementById("employeeIdLastNameUpdate").value);
  formData.append("Email", document.getElementById("empEmailUpdate").value);
  formData.append("DOB", document.getElementById("empDobUpdate").value);
  formData.append("HireDate", document.getElementById("empHireDateUpdate").value);
  formData.append("NID", document.getElementById("empNidUpdate").value);
  formData.append("Description", document.getElementById("empDescpUpdate").value);
  formData.append("PhoneNumber", document.getElementById("empNumberUpdate").value);
  formData.append("Salary", document.getElementById("empSalaryUpdate").value);
  formData.append("JobTitle", document.getElementById("empJobTitleUpdate").value);
  formData.append("Status", document.getElementById("empStatusUpdate").checked);

  // Handle the image file
  const fileInput = document.getElementById("empImgUpdate");
  if (fileInput.files.length > 0) {
    formData.append("ImageFile", fileInput.files[0]);
  }



  // Send the request
  fetch(`${IP}/api/Employee/UpdateEmployee`, {
    method: 'PUT',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    alert("Employee successfully updated");
    loadTable();
  })
  .catch(error => {
    console.error('Error:', error);
    alert("Failed to update the employee.");
  });
});





function addDataToPopupDetails(rowData, detailsButton) {
  console.log("Row Data:", rowData, detailsButton);

  // Set the employee ID as a data attribute
  const formUpdateId = document.getElementById("updated-formID");
  formUpdateId.setAttribute("data-employee-id", rowData.EId);

  // Update the form fields with the employee data
  document.getElementById("employeeIdFirstNameDetails").value = rowData.FirstName;
  document.getElementById("employeeIdMiddleNameDetails").value = rowData.MiddleName;
  document.getElementById("employeeIdLastNameDetails").value = rowData.LastName;
  document.getElementById("empEmailDetails").value = rowData.Email;
  document.getElementById("empDobDetails").value = rowData.DOB.split("T")[0];
  document.getElementById("empHireDateDetails").value = rowData.HireDate.split("T")[0];
  document.getElementById("empNidDetails").value = rowData.NID;
  document.getElementById("empDescpDetails").value = rowData.Description;
  document.getElementById("empNumberDetails").value = rowData.PhoneNumber;
  document.getElementById("empSalaryDetails").value = rowData.Salary;
  document.getElementById("empJobTitleDetails").value = rowData.JobTitle;
  document.getElementById("empStatusDetails").checked = rowData.Status;


}

}
