function milkCollection_create(){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");

const apiUrlEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;

const apiUrlanimal = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;
const apiUrlMilkType = `${IP}/api/ActiveGETMilks`;



creatingDropdown("employeeDropdown", apiUrlEmployee, "EId", "EmployeeName");

// Function to add a new row to the table
function addNewRow() {
  var newRow = document.createElement("tr");
  newRow.innerHTML = `
       
            <td><select class="form-control animalDropdown" ><option value="">--Select--</option></select></td>
            <td><select class="form-control milkDropdown" ><option value="">--Select--</option></select></td>
          
            <td><input type="decimal" class="form-control quantity"></td>
           
            <td><button type="button" class="btn btn-danger removeRowBtn">Remove</button></td>
          `;

  creatingDropdownClass(
    newRow.getElementsByClassName("animalDropdown")[0],
    apiUrlanimal,
    "AnimalId",
    "AnimalName"
  );

  creatingDropdownClass(
    newRow.getElementsByClassName("milkDropdown")[0],
    apiUrlMilkType,
    "MilkId",
    "MilkType"
  );


  document
    .getElementById("milkCollectionEntryTable")
    .querySelector("tbody")
    .appendChild(newRow);
}

// Event delegation to handle row removal
document
  .getElementById("milkCollectionEntryTable")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("removeRowBtn")) {
      e.target.closest("tr").remove();
    }
  });

// Add row on "Add" button click
document.getElementById("addRowBtn").addEventListener("click", function () {
  addNewRow();
});

// document
//   .getElementById("milkCollectionEntryTable")
//   .addEventListener("input", function (e) {
//     let target = e.target;
//     let row = target.closest("tr");

//     // Calculate Gross Total
//     if (
//       target.classList.contains("unitPrice") ||
//       target.classList.contains("quantity")
//     ) {
//       let unitPrice = parseFloat(row.querySelector(".unitPrice").value) || 0;
//       let quantity = parseFloat(row.querySelector(".quantity").value) || 0;
//       let grossTotal = unitPrice * quantity;
//       row.querySelector(".grossTotal").value = grossTotal.toFixed(2);
//     }

//     // Calculate Discount Percentage
//     if (target.classList.contains("discountAmount")) {
//       let discountAmount = parseFloat(target.value) || 0;
//       let grossTotal = parseFloat(row.querySelector(".grossTotal").value) || 0;
//       let discountPct =
//         grossTotal !== 0 ? (discountAmount / grossTotal) * 100 : 0;
//       row.querySelector(".discountAmountPct").value = discountPct.toFixed(2);
//     }

//     // Calculate VAT Percentage
//     if (target.classList.contains("vatAmount")) {
//       let vatAmount = parseFloat(target.value) || 0;
//       let grossTotal = parseFloat(row.querySelector(".grossTotal").value) || 0;
//       let vatPct = grossTotal !== 0 ? (vatAmount / grossTotal) * 100 : 0;
//       row.querySelector(".vatAmountPct").value = vatPct.toFixed(2);
//     }

//     // Calculate Net Total
//     let grossTotal = parseFloat(row.querySelector(".grossTotal").value) || 0;
//     let discountAmount =
//       parseFloat(row.querySelector(".discountAmount").value) || 0;
//     let vatAmount = parseFloat(row.querySelector(".vatAmount").value) || 0;
//     let netTotal = grossTotal - discountAmount + vatAmount;
//     row.querySelector(".netTotal").value = netTotal.toFixed(2);

//     updateTotalPurchase();
//   });

// function updateTotalPurchase() {
//   let rows = document
//     .getElementById("milkCollectionEntryTable")
//     .querySelectorAll("tbody tr");
//   let totalSale = 0;

//   rows.forEach((row) => {
//     let netTotal = parseFloat(row.querySelector(".netTotal").value) || 0;
//     totalSale += netTotal;
//   });

//   document.getElementById("totalSale").value = totalSale.toFixed(2);
// }


//  form handel

const milkColForm = document.getElementById("milkCollectionForm");
milkColForm.addEventListener("submit", function (e) {
  e.preventDefault();

  console.log("click....");

  // Collecting form data
  const mcDate = document.getElementById("mcDate").value;
  const employeeId = document.getElementById("employeeDropdown").value;

  const mcDes = document.getElementById("mcDes").value;


  // Collecting data from table rows
  const tableRows = document.querySelectorAll("#milkCollectionEntryTable tbody tr");
  const milkCollectionDetails = Array.from(tableRows).map((row) => {
    return {
      animalId: row.querySelector(".animalDropdown").value,
      milkId: row.querySelector(".milkDropdown").value,
      qty: row.querySelector(".quantity").value,
    };
  });

  // Combine all data into one object
  const formData = new FormData();

  formData.append("milkCollectionDate", mcDate);
  formData.append("eId", employeeId);
  formData.append("milkCollectionDesc", mcDes);
 
  formData.append("CompanyId", companyId);

  // Since purchaseDetails is an array of objects, stringify it
  formData.append("data", JSON.stringify(milkCollectionDetails));

  // Now, formData is ready to be sent in a fetch request or similar

  for (let entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }

  // Make the POST request
  fetch("https://localhost:7105/api/MilkCollection", {
    method: "POST",

    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      // purchaseForm.reset();
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

}