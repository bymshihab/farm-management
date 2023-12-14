function  get_shed() {

    const IP = "https://localhost:7105";
    const companyId = localStorage.getItem("companyId");



    function populateShedTypeDropdown(dropdownId) {
      fetch(`${IP}/api/ActiveShedType?CompanyId=${companyId}`, {
          method: "GET",
      })
      .then((response) => {
          console.log(response, "json");
          return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
          console.log(data, "dropdown data");
          const shedTypeDropdown = document.getElementById(dropdownId);
          shedTypeDropdown.innerHTML = ""; // Clear existing options
  
          // Optionally, add a default 'Select' option
          const defaultOption = document.createElement("option");
          defaultOption.value = "";
          defaultOption.textContent = "Select a shedType";
          shedTypeDropdown.appendChild(defaultOption);
  
          // Iterate over each shed type and create a new option element
          data.forEach((c) => {
              const newOption = document.createElement("option");
              newOption.value = c.ShedTypeId; 
              newOption.textContent = c.shedTypeName; 
              shedTypeDropdown.appendChild(newOption);
          });
      })
      .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert("Error fetching shed type data: " + error.message);
      });
  }
  
  populateShedTypeDropdown("shedTypeDropdown");
  populateShedTypeDropdown("shedTypeUpdatedDropdown");
  
   
    
    const ShedForm = document.getElementById("insertShed");
    
    ShedForm.addEventListener("submit", function (event) {
      event.preventDefault();
    
      const shedName = document.getElementById("shedId").value;
      const shedDescription = document.getElementById("shedDescription").value;
      const shedTypeValue = document.getElementById("shedTypeDropdown").value;
      const shedStatus = document.getElementById("shedStatus").checked;

    
   
      // const shedStatus = document.getElementById("shedStatus").checked;
    
      const obj = {
        shedName: shedName,
        shedDescription: shedDescription,
        shedTypeId: shedTypeValue,
        status: shedStatus,
        companyId: parseInt(companyId, 10)
      };
    
      console.log(obj, "object...");
    
      fetch(`${IP}/api/Shed/CreateShed`, {
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
          ShedForm.reset();
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          alert("create Customfield failed."); // Display an error message
        });
    });


    
    loadTable();
    function loadTable() {
      fetch(`${IP}/api/Shed`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "get data..........");
          const tablebody = document.querySelector(".shedTable");
          tablebody.innerHTML = "";
    
          for (let i = 0; i < data.length; i++) {
            let newRow = document.createElement("tr");
            newRow.classList.add("text-center");
            // let cell1 = document.createElement("td");
    
            // let checkbox = document.createElement("input");
            // checkbox.type = "checkbox";
            // checkbox.name = "uomCheckbox";
            // checkbox.value = data[i].supplierId;
            // checkbox.id = "checkbox_" + data[i].supplierId; // Create a unique ID for each checkbox
    
            // // Append the checkbox to cell1
            // cell1.appendChild(checkbox);
            // cell1.setAttribute("id", data[i].supplierId);
    
            // cell1.textContent = data[i].resolutionName;
    
            let cell2 = document.createElement("td");
            cell2.textContent = data[i].shedName;
    
            let cell3 = document.createElement("td");
    
            cell3.textContent = data[i].shedDescription;
    
            let cell4 = document.createElement("td");
    
            cell4.textContent = data[i].shedTypeName;
    
            let cell5 = document.createElement("td");
    
            cell5.textContent = data[i].status;
    
    
            let cell7 = document.createElement("td");
            cell7.setAttribute("id", data[i].shedId);
    
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
            // newRow.appendChild(cell6);
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
      formUpdateId.setAttribute("data-category-id", rowData.shedId);
    
      const shedUpdateName = (document.getElementById(
        "shedUpdateName"
      ).value = `${rowData.shedName}`);
    
      const shedUpdateDescription = (document.getElementById(
        "shedUpdateDescription"
      ).value = `${rowData.shedDescription}`);

      // const shedTypeUpdatedDropdown = (document.getElementById(
      //   "shedTypeDropdown"
      // ).value = `${rowData.shedTypeName}`);


      const shedTypeUpdatedDropdown = document.getElementById(
        "shedTypeUpdatedDropdown"
      );
      setSelectedOption(shedTypeUpdatedDropdown, rowData.shedTypeName);


    
      const shedUpdateStatus = (document.getElementById(
        "shedUpdateStatus"
      ).checked = `${rowData.status}`);
      let shedId = rowData.shedId;
      
    
    }



    
    
    const updateShedBtn = document.getElementById("updateBtn");
    
    updateShedBtn.addEventListener("click", function (e) {
      e.preventDefault();
    
      let shedId = document.getElementById("updated-formID").getAttribute("data-category-id");
    
      let shedUpdateName = document.getElementById("shedUpdateName").value;
      let shedUpdateDescription = document.getElementById("shedUpdateDescription").value;
      let shedTypeUpdatedDropdown = document.getElementById("shedTypeUpdatedDropdown").value;
      let shedUpdateStatus = document.getElementById("shedUpdateStatus").checked;
      
      let obj = {
        shedId: shedId,
        shedName: shedUpdateName,
        shedDescription: shedUpdateDescription,
        shedTypeId: shedTypeUpdatedDropdown,
        status: shedUpdateStatus,
        companyId: parseInt(companyId, 10)
      };
    
      console.log("obj  update=====", obj);
    
      fetch(`${IP}/api/Shed/UpdateShed/${shedId}`, {
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
           // ShedForm.reset();
          })
          .catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
            alert("create Customfield failed."); // Display an error message
          });
    });
    
  }
    
    
    