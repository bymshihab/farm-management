function grainFeed_Edit(grainIdEdit){
const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
// const urlParams = new URLSearchParams(window.location.search);
const gf = localStorage.getItem("grainIdEdit");

console.log(grainIdEdit,  "id...");


const apiUrlAnimal = `${IP}/api/ActiveProducts/ActiveAnimalType?CompanyId=${companyId}`;
const apiUrlAnimalType = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlIngredient = `${IP}/api/ActiveProducts/ActiveFeed?CompanyId=${companyId}`;

const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
// const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;
creatingDropdown("animalDropdown", apiUrlAnimal, "ProductId", "ProductName");
creatingDropdown("aTypeDropdown", apiUrlAnimalType, "AnimalId", "AnimalName");

// console.log(gf, "hsdfsfd");

loadTable();
function loadTable() {
  fetch(`https://localhost:7105/api/GrainFeedMaster/${gf}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "data.........");
      // Populate form fields
      document.getElementById("grainFeedDate").value =
        data.makingDate.split("T")[0];
      setSelectedOption(
        document.getElementById("animalDropdown"),
        data.productName
      );
      setSelectedOption(
        document.getElementById("aTypeDropdown"),
        data.animalName
      );

      document.getElementById("grainFeedtotalQty").value = data.totalQty;
      document.getElementById("grainFeedtotalPrice").value = data.totalPrice;
      document.getElementById("grainFeedCode").value = data.grainCode;

      // Populate table rows with input fields
      const tableBody = document.querySelector("#grainFeedEntryTable tbody");
      tableBody.innerHTML = "";
      data.grainDetails.forEach((detail, index) => {
        let row = tableBody.insertRow();

        const cellData = [
          {
            type: "dropdown",
            class: "ingredientDropdown" + index,
            apiUrl: apiUrlIngredient,
            valueProp: "ProductId",
            textProp: "ProductName",
          },

          { value: detail.price, type: "decimal", class: "grainFeedunitPrice" },
          { value: detail.qty, type: "decimal", class: "grainFeedquantity" },
          {
            type: "dropdown",
            class: "unitDropdown" + index,
            apiUrl: apiUrlUnit,
            valueProp: "UomId",
            textProp: "UomName",
          },
          {
            value: detail.totalPrice,
            type: "decimal",
            class: "grainFeedtotalPriceRow",
          },
        ];

        cellData.forEach((cd) => {
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

            setTimeout(function () {
              setSelectedOption(dropdown, detail.uomName);
            }, 10);

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


// // for adding new row

// function addNewRow() {
//   var newRow = document.createElement("tr");
//   newRow.innerHTML = `
       
//             <td><select class="form-control ingredientDropdown" ><option value="">--Select--</option></select></td>
         
//             <td><input type="decimal" class="form-control grainFeedunitPrice"></td>
//             <td><input type="decimal" class="form-control grainFeedquantity"></td>

//             <td><select class="form-control unitDropdown " ><option value="">--Select Unit--</option></select></td>
//             <td><input type="decimal" class="form-control grainFeedtotalPrice" disabled></td>
            
//             <td><button type="button" class="btn btn-danger removeRowBtn">Remove</button></td>
//           `;

//   creatingDropdownClass(
//     newRow.getElementsByClassName("ingredientDropdown")[0],
//     apiUrlIngredient,
//     "ProductId",
//     "ProductName"
//   );

//   creatingDropdownClass(
//     newRow.getElementsByClassName("unitDropdown")[0],
//     apiUrlUnit,
//     "UomId",
//     "UomName"
//   );

//   // Attach event listeners
//   let unitPriceInput = newRow.querySelector(".grainFeedunitPrice");
//   let quantityInput = newRow.querySelector(".grainFeedquantity");

//   unitPriceInput.addEventListener("change", function () {
//     calculateTotalPrice(newRow);
//   });

//   quantityInput.addEventListener("change", function () {
//     calculateTotalPrice(newRow);
//   });

//   document
//     .getElementById("grainFeedEntryTable")
//     .querySelector("tbody")
//     .appendChild(newRow);
// }



// document.getElementById("addRowBtn").addEventListener("click", function () {
//   addNewRow();
// });





// calculate price and Qty

document.getElementById('grainFeedEntryTable').addEventListener('input', function(e) {
  let target = e.target;
  let row = target.closest('tr');

  if (target.classList.contains('grainFeedunitPrice') || target.classList.contains('grainFeedquantity')) {
    calculateTotalPrice(row);
  }
});


function calculateTotalPrice(row) {
  let unitPrice = row.querySelector(".grainFeedunitPrice").value;
  let quantity = row.querySelector(".grainFeedquantity").value;
  let totalPriceField = row.querySelector(".grainFeedtotalPriceRow");

  if (unitPrice && quantity) {
    let totalPrice = parseFloat(unitPrice) * parseFloat(quantity);
    totalPriceField.value = totalPrice.toFixed(2);
  } else {
    totalPriceField.value = "";
  }

  // Call the function to update master totals
  updateMasterTotals();
}


function updateMasterTotals() {
  let rows = document.querySelectorAll("#grainFeedEntryTable tbody tr");
  let totalQuantity = 0;
  let totalPrice = 0;

  rows.forEach((row) => {
    let quantity = parseFloat(row.querySelector(".grainFeedquantity").value) || 0;
    let rowTotalPrice = parseFloat(row.querySelector(".grainFeedtotalPriceRow").value) || 0;

    totalQuantity += quantity;
    totalPrice += rowTotalPrice;
  });

  document.getElementById("grainFeedtotalQty").value = totalQuantity.toFixed(2);
  document.getElementById("grainFeedtotalPrice").value = totalPrice.toFixed(2);
}



let updateBtn = document.getElementById("updateBtn");


updateBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const grainFeedDate = document.getElementById("grainFeedDate").value;
  const grainCodeFeed = document.getElementById("grainFeedCode").value
  const productID = document.getElementById("animalDropdown").value;
  const animalID = document.getElementById("aTypeDropdown").value;
  const grainFeedtotalQty = document.getElementById("grainFeedtotalQty").value;
  const grainFeedtotalPrice = document.getElementById("grainFeedtotalPrice").value;
 

  const tableRows = document.querySelectorAll("#grainFeedEntryTable tbody tr");
  const grainFeedDetails = Array.from(tableRows).map((row, index) => {
    return {
      productId: row.querySelector(`.ingredientDropdown${index}`).value,
    
      price: row.querySelector(`.grainFeedunitPrice`).value,
      qty: row.querySelector(`.grainFeedquantity`).value,
      uomId: row.querySelector(`.unitDropdown${index}`).value,

      totalPrice: row.querySelector(`.grainFeedtotalPriceRow`).value,
     
    };
  });

  const formData = new FormData();
  formData.append("grainMasterId", grainIdEdit);
  formData.append("grainCode", grainCodeFeed);
  formData.append("MakingDate", grainFeedDate);
  formData.append("ProductId", productID);


  formData.append("AnimalId", animalID);
  formData.append("TotalQty", grainFeedtotalQty);
  formData.append("TotalPrice", grainFeedtotalPrice);

  formData.append("data", JSON.stringify(grainFeedDetails));



  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Set additional headers
  const headers = new Headers();
  // Add any additional headers if needed
  // headers.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");


  fetch(`https://localhost:7105/api/GrainFeedMaster/UpdateGrain?GrainMasterId=${grainIdEdit}`, {
    method: "PUT",
    headers: headers,
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
      // Reload or redirect here, based on success response
      alert("Successfully updated!");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

}

