function getcategory() {
  const IP = "https://localhost:7105";
  const companyId = localStorage.getItem("companyId");
  const CategoryForm = document.getElementById("insertCategory");

  CategoryForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const categoryName = document.getElementById("categoryId").value;
    const categoryDescription = document.getElementById(
      "categoryDescription"
    ).value;
    const categoryStatus = document.getElementById("categoryStatus").checked;

    const obj = {
      categoryName: categoryName,
      categoryDescription: categoryDescription,
      categoryStatus: categoryStatus,
      companyId: parseInt(companyId, 10),
    };

    console.log(obj, "object...");

    fetch(`${IP}/api/Category/CreateCategory`, {
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
        CategoryForm.reset();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("create Customfield failed."); // Display an error message
      });
  });

  loadTable();
  addSearchFunctionality(); // Call the function to add search functionality


  // added search functionality...........



function addSearchFunctionality() {
    const searchInput = document.getElementById("searchInputCategory");
    searchInput.addEventListener("input", function() {
        loadTable(this.value);
    });
}

function loadTable(searchQuery = "") {
  fetch(`${IP}/api/Category`)
      .then((response) => response.json())
      .then((data) => {
              const tablebody = document.querySelector(".categoryTable");
              tablebody.innerHTML = "";
          // Filter data based on search query
          let filteredData = searchQuery
              ? data.filter(item => item.categoryName.toLowerCase().includes(searchQuery.toLowerCase()))
              : data;

              for (let i = 0; i < filteredData.length; i++) {
                let newRow = document.createElement("tr");
                newRow.classList.add("text-center");
                // let cell1 = document.createElement("td");
      
                // let checkbox = document.createElement("input");
                // checkbox.type = "checkbox";
                // checkbox.name = "uomCheckbox";
                // checkbox.value = data[i].uomId;
                // checkbox.id = "checkbox_" + data[i].categoryId; // Create a unique ID for each checkbox
      
                // // Append the checkbox to cell1
                // cell1.appendChild(checkbox);
                // cell1.setAttribute("id", data[i].categoryId);
      
                // cell1.textContent = data[i].resolutionName;
      
                let cell2 = document.createElement("td");
                cell2.textContent = filteredData[i].categoryName;
      
                let cell3 = document.createElement("td");
      
                cell3.textContent = filteredData[i].categoryDescription;
      
                let cell4 = document.createElement("td");
      
                cell4.textContent = filteredData[i].categoryStatus;
      
                // let cell5 = document.createElement("td");
                // cell5.setAttribute("id", filteredData[i].categoryId);
      
                // // Create and append the SVG to the button
                // let svg = document.createElementNS(
                //   "http://www.w3.org/2000/svg",
                //   "svg"
                // );
                // svg.setAttribute("width", "16");
                // svg.setAttribute("height", "16");
                // svg.setAttribute("fill", "currentColor");
                // svg.classList.add("bi", "bi-pencil-square");
                // svg.setAttribute("viewBox", "0 0 16 16");
      
                // let path1 = document.createElementNS(
                //   "http://www.w3.org/2000/svg",
                //   "path"
                // );
                // path1.setAttribute(
                //   "d",
                //   "M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                // );
                // let path2 = document.createElementNS(
                //   "http://www.w3.org/2000/svg",
                //   "path"
                // );
                // path2.setAttribute("fill-rule", "evenodd");
                // path2.setAttribute(
                //   "d",
                //   "M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                // );
      
                // svg.appendChild(path1);
                // svg.appendChild(path2);
      
                // let editButton = document.createElement("button");
                // editButton.className = "bg-light border-0";
                // editButton.appendChild(svg);
                // editButton.setAttribute("type", "button");
                // editButton.setAttribute("data-bs-toggle", "modal");
                // editButton.setAttribute("data-bs-target", "#updateModal");
      
                // cell5.appendChild(editButton);
      
                // editButton.addEventListener("click", function () {
                //   addDataToPopup(data[i], this);
                // });
             
      
                // newRow.appendChild(cell1);
                newRow.appendChild(cell2);
                newRow.appendChild(cell3);
                newRow.appendChild(cell4);
                // newRow.appendChild(cell5);
      
                tablebody.appendChild(newRow);
              }
      })
      .catch((error) => console.log("Error Message", error));
}

  function addDataToPopup(rowData, editBtn) {
    // You can access the rowData and use it to fill in the modal fields.
    console.log("Row Data:", rowData, editBtn);

    const formUpdateId = document.getElementById("updated-formID");
    formUpdateId.setAttribute("data-category-id", rowData.categoryId);

    const categoryUpdateUnit = (document.getElementById(
      "categoryUpdateUnit"
    ).value = `${rowData.categoryName}`);
    const CategoryDescription = (document.getElementById(
      "CategoryDescription"
    ).value = `${rowData.categoryDescription}`);

    const categoryEditStatusId = (document.getElementById(
      "categoryEditStatusId"
    ).checked = `${rowData.categoryStatus}`);
    let categoryId = rowData.categoryId;
  }

  const updateCategoryBtn = document.getElementById("updateCategoryBtn");

  updateCategoryBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let categoryId = document
      .getElementById("updated-formID")
      .getAttribute("data-category-id");

    let categoryUpdateUnitName =
      document.getElementById("categoryUpdateUnit").value;
    let CategoryDescription = document.getElementById(
      "CategoryDescription"
    ).value;
    let categoryEditStatusId = document.getElementById(
      "categoryEditStatusId"
    ).checked;
    // let uomUpdateId = rowData.uomId;

    let obj = {
      categoryId: categoryId,
      categoryName: categoryUpdateUnitName,
      categoryDescription: CategoryDescription,
      categoryStatus: categoryEditStatusId,
      companyId: parseInt(companyId, 10),
    };

    console.log("obj of UOM update", obj);

    fetch(`${IP}/api/Category/UpdateCategory/${categoryId}`, {
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
        CategoryForm.reset();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("create Customfield failed."); // Display an error message
      });
  });



}

