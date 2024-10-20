
// function togglePopup() { 
//   const overlay = document.getElementById('popupOverlay'); 
//   overlay.classList.toggle('show'); 
// } 


// const main_data = {"people":[{"id":2,"name":"hagh","national_code":"738","expert":"expert_1"},
//                               {"id":4,"name":"کیا","national_code":"1535155489","expert":"Reza"},
//                               {"id":5,"name":"Kia","national_code":"1234567890","expert":"EXPERT1"},
//                               {"id":6,"name":"Ali","national_code":"987654321","expert":"EXPERT1"},
//                               {"id":7,"name":"mmd","national_code":"1234567811","expert":"EXPERT1"},
//                               {"id":8,"name":"1","national_code":"1234565432","expert":"EXPERT3"},
//                               {"id":9,"name":"1234","national_code":"1919191912","expert":"EXPERT2"},
//                               {"id":10,"name":"102312312313","national_code":"1231312423","expert":"EXPERT2"},
//                               {"id":11,"name":"kianosh","national_code":"1142314241","expert":"EXPERT1"},
//                               {"id":12,"name":"sosan","national_code":"1234567891","expert":"EXPERT3"}]
//                   ,"page_count":2};

// const rowsPerPage = 10;
// let currentPage = 1;
// const page_count = main_data.page_count;
// const data = main_data.people;
// console.log(data)
// function displayTable(page) {
//   const table = document.getElementById("myTable");
//   const startIndex = page * rowsPerPage - 10;
//   const endIndex = page * rowsPerPage;
//   const slicedData = data.slice(startIndex, endIndex);

//   table.innerHTML = `
//       <tr>
//           <th>Index</th>
//           <th>Name</th>
//           <th>N.C</th>
//           <th>Expert</th>
//           <th>Action</th>
//       </tr>
//   `;

//   slicedData.forEach(item => {
//       const row = table.insertRow();
//       const indexCell = row.insertCell(0);
//       const nameCell = row.insertCell(1);
//       const emailCell = row.insertCell(2);
//       const cityCell = row.insertCell(3);
//       const deleteCell = row.insertCell(4);

//       const person = data.findIndex(person => person.name === item.name);
//       indexCell.innerHTML = person + 1;
//       nameCell.innerHTML = item.name;
//       emailCell.innerHTML = item.national_code;
//       cityCell.innerHTML = item.expert;
//       const button = document.createElement("button");
//       button.innerHTML = "delete";
//       button.classList.add("delete-button");
//       button.dataset.id = item.id;
//       deleteCell.appendChild(button);
//   });

//   updatePagination(page);
// }

// function updatePagination(currentPage) {
//   const pageCount = Math.ceil(data.length / rowsPerPage);
//   const paginationContainer = document.getElementById("pagination");
//   paginationContainer.innerHTML = "";

//   for (let i = 1; i <= pageCount; i++) {
//       const pageLink = document.createElement("a");
//       pageLink.href = "#";
//       pageLink.innerText = i;
//       pageLink.onclick = function () {
//           displayTable(i);
//       };
//       if (i === currentPage) {
//           pageLink.style.fontWeight = "bold";
//           pageLink.style.color = "#fc0000ff";
//       }
//       paginationContainer.appendChild(pageLink);
//       paginationContainer.appendChild(document.createTextNode(" "));
//   }
// }

// displayTable(currentPage);

// document.getElementById("myTable").addEventListener("click", function (event) {
//   if (event.target.classList.contains("delete-button")) {
//       const id = event.target.dataset.id;
//       alert(`Deleting item with ID: ${id}`);
//   }
// });


























function togglePopup() { 
  const overlay = document.getElementById('popupOverlay'); 
  overlay.classList.toggle('show'); 
} 


const main_data = {"people":[{"id":2,"name":"hagh","national_code":"738","expert":"expert_1"},
                              {"id":4,"name":"کیا","national_code":"1535155489","expert":"Reza"},
                              {"id":5,"name":"Kia","national_code":"1234567890","expert":"EXPERT1"},
                              {"id":6,"name":"Ali","national_code":"987654321","expert":"EXPERT1"},
                              {"id":7,"name":"mmd","national_code":"1234567811","expert":"EXPERT1"},
                              {"id":8,"name":"1","national_code":"1234565432","expert":"EXPERT3"},
                              {"id":9,"name":"1234","national_code":"1919191912","expert":"EXPERT2"},
                              {"id":10,"name":"102312312313","national_code":"1231312423","expert":"EXPERT2"},
                              {"id":11,"name":"kianosh","national_code":"1142314241","expert":"EXPERT1"},
                              {"id":12,"name":"sosan","national_code":"1234567891","expert":"EXPERT3"}]
                  ,"page_count":2};

let currentPage = 1;
const page_count = main_data.page_count;
const data = main_data.people;
console.log(data)
function displayTable(page) {
  const table = document.getElementById("myTable");
  const slicedData = data
  // Clear existing table rows
  table.innerHTML = `
      <tr>
          <th>Index</th>
          <th>Name</th>
          <th>N.C</th>
          <th>Expert</th>
          <th>Action1</th>
          <th>Action2<th>
      </tr>
  `;

  // Add new rows to the table
  slicedData.forEach(item => {
      const row = table.insertRow();
      const indexCell = row.insertCell(0);
      const nameCell = row.insertCell(1);
      const emailCell = row.insertCell(2);
      const cityCell = row.insertCell(3);
      const deleteCell = row.insertCell(4);
      const editCell = row.insertCell(5);

      const person = data.findIndex(person => person.name === item.name);
      indexCell.innerHTML = person + 1;
      nameCell.innerHTML = item.name;
      emailCell.innerHTML = item.national_code;
      cityCell.innerHTML = item.expert;
      const button = document.createElement("button");
      button.innerHTML = "delete";
      button.classList.add("delete-button");
      button.dataset.id = item.id;
      deleteCell.appendChild(button);
      const editbutton = document.createElement("button");
      editbutton.innerHTML = "edit";
      editbutton.classList.add("edit-button");
      editbutton.dataset.id = item.id;
      editCell.appendChild(editbutton);
  });

  // Update pagination
  updatePagination(page);
}

function updatePagination(currentPage) {
  const pageCount = page_count;
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= pageCount; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = "/?page=" + i;
      pageLink.innerText = i;
      pageLink.onclick = function () {
          displayTable(i);
      };
      if (i === currentPage) {
          pageLink.style.fontWeight = "bold";
          pageLink.style.color = "#fc0000ff";
      }
      paginationContainer.appendChild(pageLink);
      paginationContainer.appendChild(document.createTextNode(" "));
  }
}

// Initial display
displayTable(currentPage);

// Delegate click event to the table
document.getElementById("myTable").addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
      const id = event.target.dataset.id;
      alert(`Deleting item with ID: ${id}`);
      window.location.href = id;
  }
});