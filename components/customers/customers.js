function getcustomer() {

const IP = "https://localhost:7105";
const companyId = localStorage.getItem("companyId");
const CustomersForm = document.getElementById("insertCustomers");

CustomersForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const customerName = document.getElementById("customerId").value;
  const customerPhone = document.getElementById("customerPhone").value;
  const customerEmail = document.getElementById("customerEmail").value;
  const customerAddress = document.getElementById("customerAddress").value;
  const customerStatus = document.getElementById("customerStatus").checked;

  const obj = {
    customerName: customerName,
    customerPhoneNumber: customerPhone,
    customerEmail: customerEmail,
    customerAddress: customerAddress,
    customerStatus: customerStatus,
    companyId: parseInt(companyId, 10)
  };

  console.log(obj, "object...");

  fetch(`${IP}/api/Customer/CreateCustomer`, {
    method: "POST",
    // body: objArray,
    body: JSON.stringify(obj),
    // body: obj,
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log(data, "data message!");
      loadTable();
      CustomersForm.reset();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("create Customfield failed."); // Display an error message
    });
});

loadTable();
function loadTable() {
  fetch(`${IP}/api/Customer?CompanyId=${companyId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tablebody = document.querySelector(".customerTable");
      tablebody.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        let newRow = document.createElement("tr");
        newRow.classList.add("text-center");
        // let cell1 = document.createElement("td");

        // let checkbox = document.createElement("input");
        // checkbox.type = "checkbox";
        // checkbox.name = "uomCheckbox";
        // checkbox.value = data[i].customerId;
        // checkbox.id = "checkbox_" + data[i].customerId; // Create a unique ID for each checkbox

        // // Append the checkbox to cell1
        // cell1.appendChild(checkbox);
        // cell1.setAttribute("id", data[i].customerId);

        // cell1.textContent = data[i].resolutionName;

        let cell2 = document.createElement("td");
        cell2.textContent = data[i].customerName;

        let cell3 = document.createElement("td");

        cell3.textContent = data[i].customerPhoneNumber;

        let cell4 = document.createElement("td");

        cell4.textContent = data[i].customerEmail;

        let cell5 = document.createElement("td");

        cell5.textContent = data[i].customerAddress;

        let cell6 = document.createElement("td");

        cell6.textContent = data[i].customerStatus;

        let cell7 = document.createElement("td");
        cell7.setAttribute("id", data[i].customerId);

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

        cell7.appendChild(editButton);

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

        console.log(newRow,"row data"); 

        tablebody.appendChild(newRow);
      }
    })
    .catch((error) => console.log("Error Message", error));
}

function addDataToPopup(rowData, editBtn) {
  // You can access the rowData and use it to fill in the modal fields.
  console.log("Row Data:", rowData, editBtn);

  const formUpdateId = document.getElementById('updated-formID');
  formUpdateId.setAttribute("data-category-id", rowData.customerId);

  const customerUpdateName = (document.getElementById(
    "customerUpdateName"
  ).value = `${rowData.customerName}`);

  const customerUpdatePhone = (document.getElementById(
    "customerUpdatePhone"
  ).value = `${rowData.customerPhoneNumber}`);
  const customerUpdateEmail = (document.getElementById(
    "customerUpdateEmail"
  ).value = `${rowData.customerEmail}`);
  const customerUpdateAddress = (document.getElementById(
    "customerUpdateAddress"
  ).value = `${rowData.customerAddress}`);

  const customerUpdateStatus = (document.getElementById(
    "customerUpdateStatus"
  ).checked = `${rowData.customerStatus}`);
  let customerId = rowData.customerId;

}

const updateCustomerBtn = document.getElementById("updateCustomerBtn");

updateCustomerBtn.addEventListener("click", function (e) {
  e.preventDefault();

  let customerId = document.getElementById("updated-formID").getAttribute("data-category-id");

  let customerUpdateName = document.getElementById("customerUpdateName").value;
  let customerUpdatePhone = document.getElementById("customerUpdatePhone").value;
  let customerUpdateEmail = document.getElementById("customerUpdateEmail").value;
  let customerUpdateAddress = document.getElementById("customerUpdateAddress").value;
  let customerUpdateStatus = document.getElementById("customerUpdateStatus").checked;
  
  let obj = {
    customerId: customerId,
    customerName: customerUpdateName,
    customerPhoneNumber: customerUpdatePhone,
    customerEmail: customerUpdateEmail,
    customerAddress: customerUpdateAddress,
    customerStatus: customerUpdateStatus,
    companyId: parseInt(companyId, 10)
  };

//   console.log("obj of UOM update", obj);

  fetch(`${IP}/api/Customer/UpdateCustomer${customerId}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        console.log(data, "data message!");
        loadTable();
        // unitEditName.placeholder = "";
        CustomersForm.reset();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("create Customfield failed."); // Display an error message
      });
});

}



