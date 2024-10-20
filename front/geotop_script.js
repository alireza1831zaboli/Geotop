var main_data;
// var main_data = {
//     "people": [{ 'id': 17, 'name': 'saman', 'national_code': '1234567890', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 21, 'name': 'courses', 'national_code': '1234567891', 'BD': '1360/12/24', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Fars', 'city': 'Shiraz' },
//     { 'id': 35, 'name': 'Ali', 'national_code': '1231231231', 'BD': '1370/11/12', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Yazd', 'city': 'Yazd' },
//     { 'id': 38, 'name': 'saman', 'national_code': '1738266827', 'BD': '1372/04/12', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 39, 'name': 'sam', 'national_code': '1234567890', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 41, 'name': 'mohammad', 'national_code': '1231231231', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 42, 'name': 'zari', 'national_code': '1231231231', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 43, 'name': 'losi', 'national_code': '534567891', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'ali asadi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 45, 'name': 'courses', 'national_code': '1234567891', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'reza rahimi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 46, 'name': 'armin', 'national_code': '1234567891', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'amir kashefi', 'province': 'Tehran', 'city': 'Tehran' },
//     { 'id': 47, 'name': 'reza', 'national_code': '1234567891', 'BD': '1352/01/05', 'RD': '1403/01/05', 'MD': '1403/02/12', 'expert': 'amir kashefi', 'province': 'Tehran', 'city': 'Tehran' }], "page_count": 2
// };

$(document).ready(function () {
    $('#loading').hide();
    $('#delete-animation').hide();
});

function ajax_getter(i) {
    $.ajax({
        url: "api/" + '?page=' + i,
        type: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            main_data = res;
            data2(main_data);
            displayTable(currentPage);
        },
        async: false,
        error: function () {
            alert("error")
        }
    })
};
ajax_getter(1);

function togglePopupAdd() {
    const overlay = document.getElementById('popupOverlay');
    overlay.classList.toggle('show');
    if (!overlay.classList.contains('show')) {
        ajax_getter(currentPage);
        data2(main_data);
        displayTable(currentPage);
    }

};

function togglePopupEdit() {
    const overlay = document.getElementById('popupOverlayEdit');
    overlay.classList.remove('show');

    ajax_getter(currentPage);
    data2(main_data);
    displayTable(currentPage);
};

$(document).ready(function () {
    $('#person-form').on('submit', function (event) {
        event.preventDefault();
        var formData = {
            name: $('#name').val(),
            national_code: $('#NC').val(),
            expert: $('#supervisor-name').val(),
            birth_date: $('#BD').val(),
            province: $('#province').val(),
            city: $('#city').val(),
        };
        var csrftoken = $("[name=csrfmiddlewaretoken]").val();

        $.ajax({
            type: 'POST',
            url: "api/",
            headers: { 'X-CSRFToken': csrftoken },
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                alert('Person added successfully!');
                $('#person-form')[0].reset();
            },
            error: function (xhr, status, error) {
                alert('Error adding person: ' + error);
            }
        });
    });
});



// Delete functionality
$(document).on('click', '.delete-button', function () {
    $('#delete-animation').show();
    var personId = $(this).data('id');
    var csrftoken = $("[name=csrfmiddlewaretoken]").val();
    $.ajax({
        type: 'DELETE',
        headers: { 'X-CSRFToken': csrftoken },
        url: '/api/delete/' + personId + '/',
        data: { person_id: personId },
        success: function (response) {
            // alert('Person deleted successfully!');
            setTimeout(function () {
                $('#delete-animation').hide();
            }, 3000);
            ajax_getter(currentPage);
            data2(main_data);
            displayTable(currentPage);
        },
        error: function (xhr, status, error) {
            alert('Error deleting person: ' + error);
        }
    });
});


var currentPage;
var page_count;
var data;
function data2(main_data) {
    currentPage = 1
    page_count = main_data.page_count;
    data = main_data.people;
};
data2(main_data)

function displayTable(page) {
    const table = document.getElementById("myTable");
    const slicedData = data;
    // Clear existing table rows
    table.innerHTML = `
      <tr>
          <th>Index</th>
          <th>Name</th>
          <th>N.C</th>
          <th>BD</th>
          <th>RD</th>
          <th>MD</th>
          <th>Expert</th>
          <th>Province</th>
          <th>City</th>
          <th>Action1</th>
          <th>Action2<th>
      </tr>
  `;
    var k = 0;
    slicedData.forEach(item => {
        const row = table.insertRow();
        const indexCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const NCCell = row.insertCell(2);
        const BDCell = row.insertCell(3);
        const RDCell = row.insertCell(4);
        const MDCell = row.insertCell(5);
        const expertCell = row.insertCell(6);
        const ProvinceCell = row.insertCell(7);
        const CityCell = row.insertCell(8);
        const deleteCell = row.insertCell(9);
        const editCell = row.insertCell(10);


        const person = data.findIndex(person => person.name === item.name);
        k += 1;
        indexCell.innerHTML = k;
        nameCell.innerHTML = item.name;
        NCCell.innerHTML = item.national_code;
        BDCell.innerHTML = item.birth_date;
        RDCell.innerHTML = item.created_at;
        MDCell.innerHTML = item.updated_at;
        expertCell.innerHTML = item.expert;
        ProvinceCell.innerHTML = item.province;
        CityCell.innerHTML = item.city;
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
        // Add edit functionality
        editbutton.addEventListener("click", function () {
            const id = editbutton.dataset.id;
            const person = data.find(person => person.id === parseInt(id));
            if (person) {
                // Open the edit popup
                openEditPopup(person);
            }
        });
    });
    // Add new rows to the table

    // Update pagination
    updatePagination(page);
}

function updatePagination(currentPage) {
    const pageCount = page_count;
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= pageCount; i++) {
        const pageLink = document.createElement("button");
        pageLink.classList = "page-button";
        pageLink.innerText = i;
        pageLink.onclick = function () {
            ajax_getter(i);
            data2(main_data);
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
// Function to open the edit popup
function openEditPopup(person) {
    const popupOverlayEdit = document.getElementById('popupOverlayEdit');
    popupOverlayEdit.classList.add('show');

    popupOverlayEdit.innerHTML = `
      <div class="popup-box">
        <h2>Edit Form</h2>
        <form id="edit-person-form" class="form-container">
          <label class="form-label" for="name">Username:</label>
          <input class="form-input" type="text" value="${person.name}" id="edit-name" name="name" required>

          <label class="form-label" for="BirthDate">BirthDate:</label>
          <input class="form-input" type="text" value="${person.birth_date}" placeholder="Enter BirthDate" id="editBD" name="BD">
          
          <label class="form-label" for="national-code">Nationality code:</label>
          <input class="form-input" type="tel" value="${person.national_code}" id="edit-NC" name="NC" required pattern="[0-9]{10}">

          <label class="form-label" for="Expert">Expert</label>
          <select id="edit-supervisor-name" name="supervisor-name" required>
            <option value="ali asadi" ${person.expert === 'ali asadi' ? 'selected' : ''}>ali asadi</option>
            <option value="reza rahimi" ${person.expert === 'reza rahimi' ? 'selected' : ''}>reza rahimi</option>
            <option value="amir kashefi" ${person.expert === 'amir kashefi' ? 'selected' : ''}>amir kashefi</option>
          </select>

          <label class="form-label" for="province">Province:</label>
          <select id="edit-province" name="province" required>
              <option value="">Select</option>
          </select>

          <label class="form-label" for="city">City:</label>
          <select id="edit-city" name="city" required>
              <option value="">Select</option>
          </select>

          <button class="btn-submit" type="submit"> Update <button/>
          <button class="btn-close-popup" onclick="togglePopupEdit()"> Close </button>
        </form>
      </div>
    `;
    let optionedit = {
        twodigit: false,
        closeAfterSelect: true,
        nextButtonIcon: "timeir_next.png",
        previousButtonIcon: "timeir_prev.png",
        buttonsColor: "red",
        forceFarsiDigits: true,
        markTodday: true,
        markHolidays: true,
        highlightSelectedDay: true,
    }
    kamaDatepicker("editBD", optionedit);
    // Populate the provinces dropdown
    const citydata = {
        "Tehran": ["Tehran", "Shahriar", "Eslamshahr", "Robat Karim"],
        "Isfahan": ["Isfahan", "Kashan", "Khomeini Shahr", "Najafabad"],
        "Khorasan Razavi": ["Mashhad", "Neyshabur", "Sabzevar", "Torbat Heydarieh"],
        "Fars": ["Shiraz", "Marvdasht", "Kazeroon", "Lar"],
        "Mazandaran": ["Sari", "Amol", "Babol", "Qaem Shahr"],
        "East Azerbaijan": ["Tabriz", "Maragheh", "Marand", "Ahar"],
        "West Azerbaijan": ["Urmia", "Khoy", "Mahabad", "Miandoab"],
        "Kerman": ["Kerman", "Rafsanjan", "Sirjan", "Bam"],
        "Hormozgan": ["Bandar Abbas", "Minab", "Bandar Lengeh", "Qeshm"],
        "Kermanshah": ["Kermanshah", "Eslamabad Gharb", "Javanrud", "Paveh"],
        "Lorestan": ["Khorramabad", "Borujerd", "Aligudarz", "Dorud"],
        "Yazd": ["Yazd", "Ardakan", "Meybod", "Taft"]
    };

    const provinceSelect = $('#edit-province');
    const citySelect = $('#edit-city');

    $.each(citydata, function (province, cities) {
        provinceSelect.append(new Option(province, province));
    });

    // Set the current values
    provinceSelect.val(person.province);
    updateCities(citydata, person.province, citySelect);
    citySelect.val(person.city);

    // Update cities when province changes
    provinceSelect.change(function () {
        const selectedProvince = $(this).val();
        updateCities(citydata, selectedProvince, citySelect);
    });

    // Edit functionality
    $('#edit-person-form').on('submit', function (event) {
        event.preventDefault();
        var formData = {
            name: $('#edit-name').val(),
            national_code: $('#edit-NC').val(),
            birth_date: $('#editBD').val(),
            expert: $('#edit-supervisor-name').val(),
            province: $('#edit-province').val(),
            city: $('#edit-city').val()
        };

        var csrftoken = $("[name=csrfmiddlewaretoken]").val();
        var personId = person.id;

        $.ajax({
            type: 'PUT',
            url: '/api/edit/' + personId + '/',
            headers: { 'X-CSRFToken': csrftoken },
            data: JSON.stringify(formData),
            contentType: 'application/json',
            success: function (response) {
                alert('Person edited successfully!');
                $('#edit-person-form')[0].reset();
                togglePopupEdit();
                ajax_getter(currentPage);
            },
            error: function (xhr, status, error) {
                alert('Error editing person: ' + error);
            }
        });
    });
}

function updateCities(citydata, selectedProvince, citySelect) {
    citySelect.empty().append(new Option('Select', ''));
    if (selectedProvince) {
        $.each(citydata[selectedProvince], function (index, city) {
            citySelect.append(new Option(city, city));
        });
    }
}


$(document).ready(function () {
    $("#Search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $.ajax({
            url: "api/?search=" + value,
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                main_data = res;
                data2(main_data);
                displayTable(currentPage);
            },
            error: function () {
                alert("error");
            },
        });
    });
});





$(document).ready(function () {
    const citydata = {
        "Tehran": ["Tehran", "Shahriar", "Eslamshahr", "Robat Karim"],
        "Isfahan": ["Isfahan", "Kashan", "Khomeini Shahr", "Najafabad"],
        "Khorasan Razavi": ["Mashhad", "Neyshabur", "Sabzevar", "Torbat Heydarieh"],
        "Fars": ["Shiraz", "Marvdasht", "Kazeroon", "Lar"],
        "Mazandaran": ["Sari", "Amol", "Babol", "Qaem Shahr"],
        "East Azerbaijan": ["Tabriz", "Maragheh", "Marand", "Ahar"],
        "West Azerbaijan": ["Urmia", "Khoy", "Mahabad", "Miandoab"],
        "Kerman": ["Kerman", "Rafsanjan", "Sirjan", "Bam"],
        "Hormozgan": ["Bandar Abbas", "Minab", "Bandar Lengeh", "Qeshm"],
        "Kermanshah": ["Kermanshah", "Eslamabad Gharb", "Javanrud", "Paveh"],
        "Lorestan": ["Khorramabad", "Borujerd", "Aligudarz", "Dorud"],
        "Yazd": ["Yazd", "Ardakan", "Meybod", "Taft"]
    };

    const provinceSelect = $('#province');
    const citySelect = $('#city');

    $.each(citydata, function (province, cities) {
        provinceSelect.append(new Option(province, province));
    });

    provinceSelect.change(function () {
        const selectedProvince = $(this).val();
        citySelect.empty().append(new Option('Select', ''));

        if (selectedProvince) {
            $.each(citydata[selectedProvince], function (index, city) {
                citySelect.append(new Option(city, city));
            });
        }
    });
});




let option = {
    twodigit: false,
    closeAfterSelect: true,
    nextButtonIcon: "timeir_next.png",
    previousButtonIcon: "timeir_prev.png",
    buttonsColor: "red",
    forceFarsiDigits: true,
    markTodday: true,
    markHolidays: true,
    highlightSelectedDay: true,
}
kamaDatepicker("BD", option);



$(document).ready(function () {
    $('#Download-Excel').on('click', function () {
        $('#loading').show();

        $.ajax({
            url: "api/export/",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                const jsonData = res;
                setTimeout(function () {
                    const workbook = XLSX.utils.book_new();
                    const worksheet = XLSX.utils.json_to_sheet(jsonData);
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'کاربران');
                    XLSX.writeFile(workbook, 'user_data.xlsx');
                    $('#loading').hide();
                }, 2000);
            },
            error: function (xhr, status, error) {
                alert('Error Export: ' + error);
                $('#loading').hide();
            }
        });
    });
});







