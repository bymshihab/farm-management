// Function to handle logout
function handleLogout() {
    localStorage.clear();
    window.location.href = '/components/login/login.html'; 
}

const logoutButton = document.getElementById('logoutBtn'); 
if (logoutButton) {
    logoutButton.addEventListener('click', handleLogout);
}

// for toggle sidebar

    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const topbar = document.querySelector('.topbar'); 
    const toggleButton = document.getElementById('sidebarToggle');
  
    toggleButton.addEventListener('click', function () {
      sidebar.classList.toggle('sidebar-closed');
      content.classList.toggle('content-shift');
      topbar.classList.toggle('topbar-closed');
      toggleButton.classList.toggle('angle-flipped'); 
    });



// sidebar active
document.querySelectorAll('.sidebar-item').forEach(item => {
  item.addEventListener('click', function(event) {
    // Stop event from bubbling up to parent elements
    event.stopPropagation();

    // Remove 'active' class from all sidebar items
    document.querySelectorAll('.sidebar-item').forEach(innerItem => {
      innerItem.classList.remove('active');
    });

    // Add 'active' class to the clicked item
    this.classList.add('active');

    // Update the headerContent with the text of the clicked item
    const headerContent = document.getElementById('headerContent');
    if (headerContent) {
      // Check if the clicked item is a dropdown item
      if (this.closest('.dropdown-menu')) {
        headerContent.textContent = this.textContent.trim();
      } else {
        headerContent.textContent = this.firstChild.textContent.trim();
      }
    }
  });
});



// sidebar-dropdown

document.querySelectorAll('.sidebar-item.dropdown').forEach(dropdown => {
  dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.toggle('show');
  });
});

// Close the dropdown when clicking outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropdown')) {
    var dropdowns = document.getElementsByClassName("dropdown-menu");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};








// To getting UOM
 function getUOM(){
    const Container = document.getElementById("mainContent");

    fetch("/components/UOM/uom.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        getUom();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


  //To geting Category
  function getCategory(){
    const Container = document.getElementById("mainContent");

    fetch("/components/category/category.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        getcategory();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


    //To geting Customer

  function getCustomer(){
    const Container = document.getElementById("mainContent");

    fetch("/components/customers/customers.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        getcustomer();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }
  

    //To geting Suppliers

  function getSuppliers(){
    const Container = document.getElementById("mainContent");

    fetch("/components/suppliers/suppliers.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        get_supplier();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }
    //To geting Suppliers

  function getSuppliers(){
    const Container = document.getElementById("mainContent");

    fetch("/components/suppliers/suppliers.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        get_supplier();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }
    //To geting Outsiders

  function getOutsiders(){
    const Container = document.getElementById("mainContent");

    fetch("/components/outsiders/outsiders.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        get_outsider();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


    //To geting shedType

  function shedType(){
    const Container = document.getElementById("mainContent");

    fetch("/components/shedType/shedType.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        shed_Type();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }

    //To geting shed

  function shed(){
    const Container = document.getElementById("mainContent");

    fetch("/components/shed/shed.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        get_shed();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }

    //To geting product

  function product(){
    const Container = document.getElementById("mainContent");

    fetch("/components/product/product.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        get_product();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }

  //   //To geting animal

  // function product(){
  //   const Container = document.getElementById("mainContent");

  //   fetch("/components/product/product.html")
  //     .then((response) => response.text())
  //     .then((data) => {
  //       Container.innerHTML = data;
  //       console.log("html fetch ");
  //       get_product();
  //     })
  //     .catch((error) => {
  //       console.error("Error loading the navbar:", error);
  //     });
  // }



      //To geting vaccination

      function vaccine(){
        const Container = document.getElementById("mainContent");
    
        fetch("/components/vaccination/vaccination.html")
          .then((response) => response.text())
          .then((data) => {
            Container.innerHTML = data;
            console.log("html fetch ");
            get_vaccine();
          })
          .catch((error) => {
            console.error("Error loading the navbar:", error);
          });
      }

      //To geting breading

      function breading(){
        const Container = document.getElementById("mainContent");
    
        fetch("/components/breading/breading.html")
          .then((response) => response.text())
          .then((data) => {
            Container.innerHTML = data;
            console.log("html fetch ");
            get_breading();
          })
          .catch((error) => {
            console.error("Error loading the navbar:", error);
          });
      }

      //To geting employee

      function employee(){
        const Container = document.getElementById("mainContent");
    
        fetch("/components/employee/employee.html")
          .then((response) => response.text())
          .then((data) => {
            Container.innerHTML = data;
            console.log("html fetch ");
            get_employee();
          })
          .catch((error) => {
            console.error("Error loading the navbar:", error);
          });
      }

      //To geting Animal

      function animal(){
        const Container = document.getElementById("mainContent");
    
        fetch("/components/Animal/animal.html")
          .then((response) => response.text())
          .then((data) => {
            Container.innerHTML = data;
            console.log("html fetch ");
            get_animal();
          })
          .catch((error) => {
            console.error("Error loading the navbar:", error);
          });
      }

      //To geting Stock

      function stock(){
        const Container = document.getElementById("mainContent");
    
        fetch("/components/stock/stock.html")
          .then((response) => response.text())
          .then((data) => {
            Container.innerHTML = data;
            console.log("html fetch ");
            get_stock();
          })
          .catch((error) => {
            console.error("Error loading the navbar:", error);
          });
      }







// Purchase........

    //To geting purchase
  function purchase(){
    const Container = document.getElementById("mainContent");

    fetch("/components/purchase/purchase.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        getPurchase();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


    //To geting purchase create page
  function purchaseCreate(){
    const Container = document.getElementById("mainContent");

    fetch("/components/purchase/purchaseCreate.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        purchase_create();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }
  
    //To geting purchase detail page
  function purchaseDetail(){
    const Container = document.getElementById("mainContent");

    fetch("/components/purchase/purchaseDetail.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        purchase_detail();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }
  
    //To geting purchase Edit page
  function purchaseEdit(){
    const Container = document.getElementById("mainContent");

    fetch("/components/purchase/purchaseEdit.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        purchase_Edit();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


  // Sale......

// To geting Sale
function sale(){
  const Container = document.getElementById("mainContent");

  fetch("/components/sale/sale.html")
    .then((response) => response.text())
    .then((data) => {
      Container.innerHTML = data;
      console.log("html fetch ");
      getSale();
    })
    .catch((error) => {
      console.error("Error loading the navbar:", error);
    });
}

// To geting Sale create

function saleCreate(){
  const Container = document.getElementById("mainContent");

  fetch("/components/sale/saleCreate.html")
    .then((response) => response.text())
    .then((data) => {
      Container.innerHTML = data;
      console.log("html fetch ");
      sale_create();
    })
    .catch((error) => {
      console.error("Error loading the navbar:", error);
    });
}

   //To geting purchase detail page
   function saleDetail(){
    const Container = document.getElementById("mainContent");

    fetch("/components/sale/saleDetail.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        sale_detail();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }



    //To geting sale Edit page
    function saleEdit(){
      const Container = document.getElementById("mainContent");
  
      fetch("/components/sale/saleEdit.html")
        .then((response) => response.text())
        .then((data) => {
          Container.innerHTML = data;
          console.log("html fetch ");
          sale_Edit();
        })
        .catch((error) => {
          console.error("Error loading the navbar:", error);
        });
    }



// Grain feed..........

// To geting grainFeed.......
function grainFeed(){
  const Container = document.getElementById("mainContent");

  fetch("/components/grainFeed/grainFeed.html")
    .then((response) => response.text())
    .then((data) => {
      Container.innerHTML = data;
      console.log("html fetch ");
      getgrainFeed();
    })
    .catch((error) => {
      console.error("Error loading the navbar:", error);
    });
}

// To geting grain create

function grainCreate(){
  const Container = document.getElementById("mainContent");

  fetch("/components/grainFeed/grainFeedCreate.html")
    .then((response) => response.text())
    .then((data) => {
      Container.innerHTML = data;
      console.log("html fetch ");
      grainFeed_create();
    })
    .catch((error) => {
      console.error("Error loading the navbar:", error);
    });
}


   //To geting grain feed detail page
   function grainFeedDetail(){
    const Container = document.getElementById("mainContent");

    fetch("/components/grainFeed/grainFeedDetail.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        grainFeed_detail();
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }

   //To geting grain feed detail page
   function grainFeedEdit(grainIdEdit){
    const Container = document.getElementById("mainContent");

    fetch("/components/grainFeed/grainFeedEdit.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        grainFeed_Edit(grainIdEdit);
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


// Milk Collection............

// To geting MilkCollection.........
function milkCollection(){
  const Container = document.getElementById("mainContent");

  fetch("/components/milkCollection/milkCollection.html")
    .then((response) => response.text())
    .then((data) => {
      Container.innerHTML = data;
      console.log("html fetch ");
      getMilkCollection();
    })
    .catch((error) => {
      console.error("Error loading the navbar:", error);
    });
}


// To creating feeding create

function milkCollectionCreate(){
  const Container = document.getElementById("mainContent");

  fetch("/components/milkCollection/milkCollectionCreate.html")
    .then((response) => response.text())
    .then((data) => {
      Container.innerHTML = data;
      console.log("html fetch ");
      milkCollection_create();
    })
    .catch((error) => {
      console.error("Error loading the navbar:", error);
    });
}



   //To geting milkCollectionDetail page
   function milkCollectionDetail(mcIdDetail){
    const Container = document.getElementById("mainContent");

    fetch("/components/milkCollection/milkCollectionDetail.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        milkCollection_detail(mcIdDetail);
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }

   //To geting grain feed detail page
   function milkCollectionEdit(mcIdEdit){
    const Container = document.getElementById("mainContent");

    fetch("/components/milkCollection/milkCollectionEdit.html")
      .then((response) => response.text())
      .then((data) => {
        Container.innerHTML = data;
        console.log("html fetch ");
        milkCollection_Edit(mcIdEdit);
      })
      .catch((error) => {
        console.error("Error loading the navbar:", error);
      });
  }


  


  