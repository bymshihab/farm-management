function  get_outsider(){

    const IP = "https://localhost:7105";
    const companyId = localStorage.getItem("companyId");
    const outsidersForm = document.getElementById("insertOutsiders");
    
    outsidersForm.addEventListener("submit", function (event) {
      event.preventDefault();
    
      const outsiderName = document.getElementById("outsiderId").value;
      const outsiderCategory = document.getElementById("outsiderCategory").value;
    
      const outsiderPhn = document.getElementById("outsiderPhn").value;
      const outsiderAddress = document.getElementById("outsiderAddress").value;
      const outsiderStatus = document.getElementById("outsiderStatus").checked;
    
      const obj = {
        OutsiderName: outsiderName,
        OutsiderCatagory: outsiderCategory,
        OutsiderAddress: outsiderAddress,
        PhoneNumber: outsiderPhn,
        Status: outsiderStatus,
        companyId: parseInt(companyId, 10)
      };
    
      console.log(obj, "object...");
    
      fetch(`${IP}/api/Outsider/CreateOutsider`, {
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
          outsidersForm.reset();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert("create Customfield failed."); // Display an error message
        });
    });
    
    loadTable();
    function loadTable() {
      fetch(`${IP}/api/Outsider?CompanyId=${companyId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "comming...");
          const tablebody = document.querySelector(".outsiderTable");
          tablebody.innerHTML = "";
    
          for (let i = 0; i < data.length; i++) {
            let newRow = document.createElement("tr");
            newRow.classList.add("text-center");
            // let cell1 = document.createElement("td");
    
            // let checkbox = document.createElement("input");
            // checkbox.type = "checkbox";
            // checkbox.name = "outsiderCheckbox";
            // checkbox.value = data[i].OutsiderId;
            // checkbox.id = "checkbox_" + data[i].OutsiderId; // Create a unique ID for each checkbox
    
            // // Append the checkbox to cell1
            // cell1.appendChild(checkbox);
            // cell1.setAttribute("id", data[i].outsiderId);
    
            // cell1.textContent = data[i].resolutionName;
    
            let cell2 = document.createElement("td");
            cell2.textContent = data[i].outsiderName;
    
            let cell3 = document.createElement("td");
    
            cell3.textContent = data[i].outsiderCatagory;
    
            let cell4 = document.createElement("td");
    
            cell4.textContent = data[i].outsiderAddress;
    
            let cell5 = document.createElement("td");
    
            cell5.textContent = data[i].phoneNumber;
    
            let cell6 = document.createElement("td");
    
            cell6.textContent = data[i].status;
    
            let cell7 = document.createElement("td");
            cell7.setAttribute("id", data[i].outsiderId);
    
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
      formUpdateId.setAttribute("data-category-id", rowData.outsiderId);
    
      const outsiderNameUpdate = (document.getElementById(
        "outsiderNameUpdate"
      ).value = `${rowData.outsiderName}`);
    
      const outsiderCategoryUpdate = (document.getElementById(
        "outsiderCategoryUpdate"
      ).value = `${rowData.outsiderCatagory}`);
      const outsiderPhnUpdate = (document.getElementById(
        "outsiderPhnUpdate"
      ).value = `${rowData.phoneNumber}`);
   
      const outsiderAddressUpdate = (document.getElementById(
        "outsiderAddressUpdate"
      ).value = `${rowData.outsiderAddress}`);
   
    
      const outsiderStatusUpdate = (document.getElementById(
        "outsiderStatusUpdate"
      ).checked = `${rowData.status}`);
      let outsiderId = rowData.outsiderId;
    
    }
    
    const updateSupplierBtn = document.getElementById("updateBtn");
    
    updateSupplierBtn.addEventListener("click", function (e) {
      e.preventDefault();
    
      let outsiderId = document.getElementById("updated-formID").getAttribute("data-category-id");


      console.log(outsiderId, "out id");
    
      let outsiderNameUpdate = document.getElementById("outsiderNameUpdate").value;
      let outsiderCategoryUpdate = document.getElementById("outsiderCategoryUpdate").value;
      let outsiderPhnUpdate = document.getElementById("outsiderPhnUpdate").value;
      let outsiderAddressUpdate = document.getElementById("outsiderAddressUpdate").value;
      let outsiderStatusUpdate = document.getElementById("outsiderStatusUpdate").checked;
      
      let obj = {
        outsiderId: outsiderId,
        outsiderName: outsiderNameUpdate,
        outsiderCatagory: outsiderCategoryUpdate,
        phoneNumber: outsiderPhnUpdate,
        outsiderAddress: outsiderAddressUpdate,
        status: outsiderStatusUpdate,
        companyId: parseInt(companyId, 10)
      };
    
    //   console.log("obj of UOM update", obj);
    
      fetch(`${IP}/api/Outsider/UpdateOutsider/${outsiderId}`, {
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
            outsidersForm.reset();
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
            alert("create Customfield failed."); // Display an error message
          });
    });
    
}

    
    