
const addBtn = document.getElementById('add-btn');
const popupContainer = document.getElementById('popup-container');
const popupContent = document.getElementById('popup-content');
const addForm = document.getElementById('add-form');
const saveBtn = document.getElementById('save-btn');
const recordTableBody = document.getElementById('record-table-body');

// Add event listener to the add button to open the popup
addBtn.addEventListener('click', () => {
  popupContainer.style.display = 'block';
});

// Add event listener to the save button to record the information
saveBtn.addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const nationalCode = document.getElementById('national-code').value;
  const expertName = document.getElementById('expert-name').value;

  // Create a new table row element
  const newRow = document.createElement('tr');

  // Create table data elements for each column
  const nameTd = document.createElement('td');
  nameTd.textContent = name;
  newRow.appendChild(nameTd);

  const nationalCodeTd = document.createElement('td');
  nationalCodeTd.textContent = nationalCode;
  newRow.appendChild(nationalCodeTd);

  const expertNameTd = document.createElement('td');
  expertNameTd.textContent = expertName;
  newRow.appendChild(expertNameTd);

  // Add the new row to the table body
  recordTableBody.appendChild(newRow);

  // Close the popup
  popupContainer.style.display = 'none';
});