function  feeding_Edit(feedIdEdit){

const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
// const urlParams = new URLSearchParams(window.location.search);
const feedIdEdits = localStorage.getItem("feedIdEdit");

console.log(feedIdEdit, "id...");

const apiUrlEmployee = `${IP}/api/ActiveEmployees/GetActiveEmployees?CompanyId=${companyId}`;
const apiUrlAnimalType = `${IP}/api/ActiveAnimals?CompanyId=${companyId}`;

const apiUrlIngredient = `${IP}/api/ActiveProducts/ActiveFeed?CompanyId=${companyId}`;

const apiUrlUnit = `${IP}/api/ActiveUoms?CompanyId=${companyId}`;
// const apiUrlProduct = `${IP}/api/ActiveProducts?CompanyId=${companyId}`;
creatingDropdown("employeeDropdownUpdte", apiUrlEmployee, "EId", "EmployeeName");
creatingDropdown("aTypeDropdown", apiUrlAnimalType, "AnimalId", "AnimalName");

// console.log(grainIdEdit, "hsdfsfd");

loadTable();
function loadTable() {
  fetch(`https://localhost:7105/api/Feeding/${feedIdEdits}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data, "data.........");
      // Populate form fields
      document.getElementById("FeedingDate").value =
        data.feedIngDate.split("T")[0];
      setSelectedOption(
        document.getElementById("employeeDropdownUpdte"),
        data.employeeName
      );
      setSelectedOption(
        document.getElementById("aTypeDropdown"),
        data.animalName
      );

      document.getElementById("feedGrandtotalQty").value = data.totalQTY;
      document.getElementById("feedGrandtotalPrice").value = data.totalCost;
      document.getElementById("feedCode").value = data.feedingCode;

      // Populate table rows with input fields
      const tableBody = document.querySelector("#feedEntryTable tbody");
      tableBody.innerHTML = "";
      data.feedingDetails.forEach((detail, index) => {
        let row = tableBody.insertRow();

        const cellData = [
          {
            type: "dropdown",
            class: "ingredientDropdown" + index,
            apiUrl: apiUrlIngredient,
            valueProp: "ProductId",
            textProp: "ProductName",
          },

          { value: detail.price, type: "decimal", class: "feedUnitPrice" },
          { value: detail.qty, type: "decimal", class: "feedQuantity" },
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
            class: "feedtotalPriceRow",
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
            }, 100);

            setTimeout(function () {
              setSelectedOption(dropdown, detail.uomName);
            }, 100);

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



// calculate price and Qty

document.getElementById('feedEntryTable').addEventListener('input', function(e) {
    let target = e.target;
    let row = target.closest('tr');
  
    if (target.classList.contains('feedUnitPrice') || target.classList.contains('feedQuantity')) {
      calculateTotalPrice(row);
    }
  });
  
  
  function calculateTotalPrice(row) {
    let unitPrice = row.querySelector(".feedUnitPrice").value;
    let quantity = row.querySelector(".feedQuantity").value;
    let totalPriceField = row.querySelector(".feedtotalPriceRow");
  
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
    let rows = document.querySelectorAll("#feedEntryTable tbody tr");
    let totalQuantity = 0;
    let totalPrice = 0;
  
    rows.forEach((row) => {
      let quantity = parseFloat(row.querySelector(".feedQuantity").value) || 0;
      let rowTotalPrice = parseFloat(row.querySelector(".feedtotalPriceRow").value) || 0;
  
      totalQuantity += quantity;
      totalPrice += rowTotalPrice;
    });
  
    document.getElementById("feedGrandtotalQty").value = totalQuantity.toFixed(2);
    document.getElementById("feedGrandtotalPrice").value = totalPrice.toFixed(2);
  }






let updateBtn = document.getElementById("updateBtn");


updateBtn.addEventListener("click", function (event) {
  event.preventDefault();

  const FeedingDate = document.getElementById("FeedingDate").value;
  const feedCode = document.getElementById("feedCode").value
  const employeeID = document.getElementById("employeeDropdownUpdte").value;
  const animalID = document.getElementById("aTypeDropdown").value;
  const feedGrandtotalQty = document.getElementById("feedGrandtotalQty").value;
  const feedGrandtotalPrice = document.getElementById("feedGrandtotalPrice").value;
 

  const tableRows = document.querySelectorAll("#feedEntryTable tbody tr");
  const feedDetails = Array.from(tableRows).map((row, index) => {
    return {
      productId: row.querySelector(`.ingredientDropdown${index}`).value,
    
      price: row.querySelector(`.feedUnitPrice`).value,
      qty: row.querySelector(`.feedQuantity`).value,
      uomId: row.querySelector(`.unitDropdown${index}`).value,

      totalPrice: row.querySelector(`.feedtotalPriceRow`).value,
     
    };
  });

  const formData = new FormData();
  formData.append("FeedId", feedIdEdits);
  formData.append("FeedingCode", feedCode);
  formData.append("FeedIngDate", FeedingDate);
  formData.append("EId", employeeID);


  formData.append("AnimalId", animalID);
  formData.append("TotalQTY", feedGrandtotalQty);
  formData.append("TotalCost", feedGrandtotalPrice);

  formData.append("data", JSON.stringify(feedDetails));



  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  // Set additional headers
  const headers = new Headers();
  // Add any additional headers if needed
  // headers.append("Authorization", "Bearer YOUR_ACCESS_TOKEN");


  fetch(`${IP}/api/Feeding/UpdateFeeding`, {
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


