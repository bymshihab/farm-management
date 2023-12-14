function getUom() {
    const IP = "https://localhost:7105";
    const uomForm = document.getElementById("insertUnite");
  
    const companyId = localStorage.getItem("companyId");
  
    uomForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const unitName = document.getElementById("unitId").value;
      const unitDes = document.getElementById("unitDescription").value;
      const unitStatus = document.getElementById("unitStatusId").checked;
  
      const obj = {
        uomName: unitName,
        uomDescription: unitDes,
        status: unitStatus,
        companyId: parseInt(companyId, 10)
      };
  
      console.log(obj, "object...");
  
      fetch(`${IP}/api/Employee/CreateEmployee`, {
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
          uomForm.reset();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert("create Customfield failed."); // Display an error message
        });
    });
  
    loadTable();
    function loadTable() {
      fetch(`${IP}/api/Employee/GetActiveEmployees?CompanyId=${companyId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const tablebody = document.querySelector(".employeeTable");
          tablebody.innerHTML = "";
  
          for (let i = 0; i < data.length; i++) {
            let newRow = document.createElement("tr");
            newRow.classList.add("text-center");
            let cell1 = document.createElement("td");
  
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.name = "uomCheckbox";
            checkbox.value = data[i].uomId;
            checkbox.id = "checkbox_" + data[i].uomId; // Create a unique ID for each checkbox
  
            // Append the checkbox to cell1
            cell1.appendChild(checkbox);
            cell1.setAttribute("id", data[i].uomId);
  
            // cell1.textContent = data[i].resolutionName;
  
            let cell2 = document.createElement("td");
            cell2.textContent = data[i].uomName;
  
            let cell3 = document.createElement("td");
  
            cell3.textContent = data[i].uomDescription;
  
            let cell4 = document.createElement("td");
  
            cell4.textContent = data[i].status;
  
            let cell5 = document.createElement("td");
            cell5.setAttribute("id", data[i].uomId);
  
            // Create and append the SVG to the button
            let svg = document.createElementNS(
              "http://www.w3.org/2000/svg",
              "svg"
            );
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
  
            cell5.appendChild(editButton);
  
            editButton.addEventListener("click", function () {
              addDataToPopup(data[i], this);
            });
            // cell5.addEventListener("click", function(){
            //     addDataToPopup(this, this.id);
            // });
  
            newRow.appendChild(cell1);
            newRow.appendChild(cell2);
            newRow.appendChild(cell3);
            newRow.appendChild(cell4);
            newRow.appendChild(cell5);
  
            // newRow.setAttribute("ondblclick", "addDataToForm(this)");
            // newRow.addEventListener("dblclick", function () {
            //   addDataToForm(this);
            // });
  
            // newRow.setAttribute('ondblclick', addDataToForm(this));
  
            tablebody.appendChild(newRow);
          }
        })
        .catch((error) => console.log("Error Message", error));
    }
  
    function addDataToPopup(rowData, editBtn) {
      // You can access the rowData and use it to fill in the modal fields.
      console.log("Row Data:", rowData, editBtn);
  
      const formUpdateId = document.getElementById("updated-formID");
      formUpdateId.setAttribute("data-uom-id", rowData.uomId);
  
      const unitEditName = (document.getElementById(
        "uniteditId"
      ).value = `${rowData.uomName}`);
      const unitEditDes = (document.getElementById(
        "unitEditDescription"
      ).value = `${rowData.uomDescription}`);
  
      const unitEditStatus = (document.getElementById(
        "unitEditStatusId"
      ).checked = `${rowData.status}`);
      let uomUpdateId = rowData.uomId;
    }
  
    const updateUomBtn = document.getElementById("updateUomBtn");
  
    updateUomBtn.addEventListener("click", function (e) {
      e.preventDefault();
  
      let uomId = document
        .getElementById("updated-formID")
        .getAttribute("data-uom-id");
  
      let unitEditName = document.getElementById("uniteditId").value;
      let unitEditDes = document.getElementById("unitEditDescription").value;
      let unitEditStatus = document.getElementById("unitEditStatusId").checked;
      // let uomUpdateId = rowData.uomId;
  
      let obj = {
        uomId: uomId,
        uomName: unitEditName,
        uomDescription: unitEditDes,
        status: unitEditStatus,
        companyId: parseInt(companyId, 10)
      };
  
      console.log("obj of UOM update", obj);
  
      fetch(`https://localhost:7105/api/Employee/UpdateEmployee${eId}`, {
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
          uomForm.reset();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert("create Customfield failed."); // Display an error message
        });
    });
  
  }