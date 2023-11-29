// for creatingDropdown

function creatingDropdown(dropdownId, apiUrl, valueProp, textProp) {
  fetch(apiUrl, {
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
        newOption.value = c[valueProp]; // Use dynamic property for value
        newOption.textContent = c[textProp]; // Use dynamic property for text
        shedTypeDropdown.appendChild(newOption);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      alert("Error fetching shed type data: " + error.message);
    });
}

// in dropdown selected option is selected
function setSelectedOption(dropdownElement, valueToMatch) {
  for (let i = 0; i < dropdownElement.options.length; i++) {
    if (dropdownElement.options[i].text === valueToMatch) {
      dropdownElement.selectedIndex = i;
      return; // when match is found exit
    }
  }
}

console.log("okay");
