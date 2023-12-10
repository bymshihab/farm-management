function getgrainFeed() {
  const IP = "https://localhost:7105";
  const companyId = localStorage.getItem("companyId");

  loadTable();
  function loadTable() {
    fetch(`${IP}/api/GrainFeedMaster/GetFeedingData?CompanyId=${companyId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "comming...");
        const tablebody = document.querySelector(".grainFeedTable");
        tablebody.innerHTML = "";

        for (let i = 0; i < data.length; i++) {
          let newRow = document.createElement("tr");
          newRow.classList.add("text-center");

          let cell1 = document.createElement("td");
          cell1.textContent = data[i].grainCode;

          let cell2 = document.createElement("td");
          cell2.textContent = data[i].makingDate;

          let cell3 = document.createElement("td");

          cell3.textContent = data[i].productName;

          let cell4 = document.createElement("td");

          cell4.textContent = data[i].animalName;

          let cell5 = document.createElement("td");

          cell5.textContent = data[i].totalQty;

          let cell6 = document.createElement("td");

          cell6.textContent = data[i].totalPrice;

          let cell7 = document.createElement("td");
          cell7.setAttribute("id", data[i].grainMasterId);

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
          // editButton.setAttribute("data-bs-toggle", "modal");
          // editButton.setAttribute("data-bs-target", "#updateModal");

          // detail button

          let detailButton = document.createElement("button");
          detailButton.className = "bg-light border-0";
          detailButton.setAttribute("type", "button");

          let detailSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          detailSvg.setAttribute("width", "16");
          detailSvg.setAttribute("height", "16");
          detailSvg.setAttribute("fill", "green");
          detailSvg.classList.add("bi", "bi-info-circle-fill", "m-1");
          detailSvg.setAttribute("viewBox", "0 0 16 16");

          let detailPath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          detailPath.setAttribute(
            "d",
            "M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"
          );

          detailSvg.appendChild(detailPath);
          detailButton.appendChild(detailSvg);

          // delete button

          let deleteButton = document.createElement("button");
          deleteButton.className = "bg-light border-0";
          deleteButton.setAttribute("type", "button");

          let deleteSvg = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "svg"
          );
          deleteSvg.setAttribute("width", "16");
          deleteSvg.setAttribute("height", "16");
          deleteSvg.setAttribute("fill", "red");
          deleteSvg.classList.add("bi", "bi-trash-fill");
          deleteSvg.setAttribute("viewBox", "0 0 16 16");

          let deletePath = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "path"
          );
          deletePath.setAttribute(
            "d",
            "M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
          );

          deleteSvg.appendChild(deletePath);
          deleteButton.appendChild(deleteSvg);

          cell7.appendChild(editButton);
          cell7.appendChild(detailButton);
          cell7.appendChild(deleteButton);

          editButton.addEventListener("click", function () {
            const grainIdEdit = data[i].grainMasterId;
            localStorage.setItem("grainIdEdit", grainIdEdit);
            // window.location.href = `/components/grainFeed/grainFeedEdit.html?grainIdEdit=${grainIdEdit}`;
            grainFeedEdit(grainIdEdit);
          });

          detailButton.addEventListener("click", function () {
            const grainIdDetail = data[i].grainMasterId;
            localStorage.setItem("grainIdDetail", grainIdDetail);
            // window.location.href = `/components/grainFeed/grainFeedDetail.html?grainIdDetail=${grainIdDetail}`;

            grainFeedDetail(grainIdDetail);


          });
          deleteButton.addEventListener("click", function () {
            const grainIdDelete = data[i].grainMasterId;
            console.log(grainIdDelete, "delete");

            // Send a DELETE request to your API to delete the purchase
            fetch(`https://localhost:7105/api/GrainFeedMaster/${grainIdDelete}`, {
              method: "DELETE",
            })
              .then((response) => {
                if (response.ok) {
                  // The purchase was successfully deleted, you can update the UI as needed
                  alert("grain feed deleted successfully");
                  // You might want to remove the row from the table as well
                  // For example: this.closest("tr").remove();
                  loadTable();
                } else {
                  // Handle the case where the delete request failed
                  alert("Failed to delete purchase");
                }
              })
              .catch((error) => {
                // Handle any network or other errors
                console.error("Error deleting purchase:", error);
                alert("Error deleting purchase");
              });
          });

          newRow.appendChild(cell1);
          newRow.appendChild(cell2);
          newRow.appendChild(cell3);
          newRow.appendChild(cell4);
          newRow.appendChild(cell5);
          newRow.appendChild(cell6);
          newRow.appendChild(cell7);

          console.log(newRow, "row data");

          tablebody.appendChild(newRow);
        }
      })
      .catch((error) => console.log("Error Message", error));
  }

}