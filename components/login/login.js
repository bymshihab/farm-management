console.log("login");
const IP = "https://localhost:7105";
// const IP = "http://172.16.5.18:8788";

toCreateCompanyName();
// function to create options for company 
// function toCreateCompanyName(){
//     fetch(`${IP}/api/ActiveCompany`, {
//         method: "GET",
//       })
//         .then((response) => {
//           console.log(response, "json");
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data, "dsfjhfd");
//            let companyIds = data;
//           const comapnyDropdown = document.getElementById("comapnyDropdown");
//           comapnyDropdown.innerHTML = "";
//           const defaultOption = document.createElement("option");
//           defaultOption.value = "0";
//           defaultOption.textContent = "Nothing is Selected";
//           defaultOption.classList.add("d-none");
//           comapnyDropdown.appendChild(defaultOption);
  
//           companyIds.forEach((option) => {
//             const newOption = document.createElement("option");
//             newOption.value = option.companyId;
//             newOption.textContent = option.companyName;
//             comapnyDropdown.appendChild(newOption);
//           });
//         })
//         .catch((error) => {
//           console.error("There was a problem with the fetch operation:", error);
//           alert("create User failed: " + error.message);
//         });
// }
function toCreateCompanyName(){
    fetch(`${IP}/api/ActiveCompany`, {
        method: "GET",
    })
    .then((response) => {
        console.log(response, "json");
        return response.json(); // Parse the JSON from the response
    })
    .then((data) => {
        console.log(data, "dsfjhfd");
        const comapnyDropdown = document.getElementById("comapnyDropdown");
        comapnyDropdown.innerHTML = ""; // Clear existing options

        // Optionally, add a default 'Select' option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select a Company";
        comapnyDropdown.appendChild(defaultOption);

        // Iterate over each company and create a new option element
        data.forEach((company) => {
            const newOption = document.createElement("option");
            newOption.value = company.CompanyId; // Use the CompanyId for the value
            newOption.textContent = company.CompanyName; // Use the CompanyName for the display text
            comapnyDropdown.appendChild(newOption);
        });
    })
    .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Error fetching company data: " + error.message);
    });
}









const form = document.getElementById("loginForm")

form.addEventListener("submit", function (e) {
  e.preventDefault();
 
  const formData = new FormData(form);


  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  fetch(`https://localhost:7105/api/UserInfo/login`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log(response);
      // window.location.href = "/Components/home/home.html";
      if (!response.ok) {
        // If the login was not successful, throw an error with the status

        throw new Error(
          `Login was not successful: Status code ${response.status}`
        );
      }
      return response.json(); // Parse JSON response
    })
    .then((data) => {
      console.log(data, "data message!");

      localStorage.setItem("companyId", data.companyId)

      // Check the structure of 'data' to match your actual API response
      if (data.a) {
        window.location.href = "/components/home/home.html";
      } else if (data && data.error) {
        // 'error' is just an example, replace with your API's actual property name
        // alert("Login failed: " + data.error);
      } else {
        //  alert("Login failed: Unknown error occurred.");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      //alert("Login failed: " + error.message); // Display an error message
    });
});
