"use strict";

/*---------------------fetching data from json file----------------------- */
let myRequest = new Request("./data_class.json");
let array = [];
const clientData = fetch(myRequest)
  .then((response) => response.json())
  .then((users) => {
    array = users;
    pageCalc(users);
  });

const ulTag = document.querySelector("ul");

/*----------------building table using the fetched data--------------- */
function buildTable(data) {
  if (data.length > 0) {
    var temp = "";
    data.forEach((u) => {
      temp += "<tr>";
      temp += "<td>" + u.rank + "</td>";
      temp += "<td>" + u.first_name + "</td>";
      temp += "<td>" + u.last_name + "</td></tr>";
    });
    document.getElementById("tboy").innerHTML = temp;
  }
}

/* -----------------function to calculate the total number of pages based on the tabledata--------------*/

function pageCalc(queryset) {
  var state = {
    page: 1,
    rows: 5,
    window: 5,
  };
  var totalPages = Math.round(queryset.length / state.rows);
  console.log();
  pagination(totalPages, state.page, queryset, state);
}

function trimTable() {}

//----------------function for pagination------------------------------//

function pagination(pages, page) {
  let totalPages = pages;
  let rows = 5;
  let liTag = "";
  let activeLi;
  let beforePages = page - 1;
  let afterPages = page + 1;
  var rowStart = (page - 1) * rows;
  var rowEnd = rowStart + rows;
  var trimmedData = array.slice(rowStart, rowEnd);
  buildTable(trimmedData);
  //-------------------adding previous button------------------------//
  if (page > 1) {
    liTag += `<li class = "button prev" onclick="pagination(${totalPages},${
      page - 1
    })"<span><i class = "fas fa-angle-left"></i> Prev </span></li>`;
  }
  //-------------------adding  first page and first dots buttons--------------------------//
  if (page > 2) {
    liTag += `<li class="numb" onclick="pagination(${totalPages},1)"><span>1</span><li>`;
    if (page > 3) {
      liTag += `<li class="dots"><span>...</span><li>`;
    }
  }
  //---------------------configuring last button-------------------------//
  if (page == totalPages) {
    beforePages = beforePages - 2;
  } else if (page == totalPages - 1) {
    beforePages = beforePages - 1;
  }

  //---------------------configuring first button-------------------------//

  if (page == 1) {
    afterPages = afterPages + 2;
  } else if (page == 2) {
    afterPages = afterPages + 1;
  }

  //---------------------------------adding page middle page number buttons-----------------------------//

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > totalPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    } //---------------------------------setting current page number active-----------------------------//
    if (page == pageLength) {
      activeLi = "active";
    } else {
      activeLi = "";
    }
    liTag += `<li class ="numb ${activeLi}" onclick="pagination(${totalPages},${pageLength})"><span>${pageLength}</span></li>`;
  }

  //-----------------------------------adding last dots and final page buttons----------------------------------//

  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span><li>`;
    }
    liTag += `<li class="numb" onclick="pagination(${totalPages},20)"><span>${totalPages}</span><li>`;
  }
  if (page < totalPages) {
    liTag += `<li class = "button next" onclick="pagination(${totalPages},${
      page + 1
    })"><span>Next <i class"fas fa-angle-right"></span></li>`;
  }
  ulTag.innerHTML = liTag;
}

//------------------------------function for sorting table-----------------------------------------//

function sortTable() {
  var rows, switching, i, x, y, shouldSwitch;
  var table = document.getElementById("tboy");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      if (x.innerHTML > y.innerHTML) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}

/*-------------------funtion for searching through the table-------------------- */
/* 
function searchTable() {
  var input, filter,table;
  input = document.getElementById("user-id");
  filter = input.value.toUpperCase();
  table = array;
  console.log(table);
} */

function searchTable() {
  var input,
    filter,
    table,
    rows,
    fname,
    lname,
    i,
    txtValue1,
    txtValue2,
    status,
    txtValue3;
  input = document.getElementById("user-id");
  filter = input.value.toUpperCase();
  table = document.getElementById("tboy");
  rows = table.getElementsByTagName("tr");
  status = false;

  for (i = 0; i < rows.length; i++) {
    fname = rows[i].getElementsByTagName("td")[1];
    lname = rows[i].getElementsByTagName("td")[2];

    if (filter) {
      txtValue1 = fname.textContent || fname.innerText;
      txtValue2 = lname.textContent || lname.innerText;
      txtValue3 = txtValue1 + " " + txtValue2;

      if (txtValue1.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
        status = true;
      } else if (txtValue2.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
        status = true;
      } else if (txtValue3.toUpperCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
        status = true;
      } else {
        rows[i].style.display = "none";
      }
    } else {
      alert("Enter valid info");
      break;
    }
  }
  //-----------if no data is found ---------------//
  console.log(status);
  if (!status) alert("No data available");
}
