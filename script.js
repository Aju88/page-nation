"use strict";

/*---------------------fetching data from json file----------------------- */
let myRequest = new Request("./data_class.json");
let tablearray = [];
const clientData = fetch(myRequest)
  .then((response) => response.json())
  .then((users) => {
    tablearray = users;
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
  } else {
    document.getElementById("tboy").style.display = "none";
    alert("No data available...!");
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

  var trimmedData = tablearray.slice(rowStart, rowEnd);
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

function sortTable(n) {
  var rows, switching, i, x, y, shouldSwitch;
  var table = document.getElementById("tboy");
  switching = true;

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 0; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
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

function searchTable() {
  var input,
    filter,
    // rows,
    table,
    pageCount,
    fname,
    lname,
    fullname,
    finalArr = [],
    tabledata = tablearray;
  input = document.getElementById("user-id");
  table = document.getElementById("tboy");
  pageCount = document.getElementById("page-list");
  filter = input.value.toUpperCase();
  for (let i = 0; i < tabledata.length; i++) {
    fname = tabledata[i].first_name;
    lname = tabledata[i].last_name;
    if (filter != null) {
      fullname = fname + " " + lname;

      if (fname.toUpperCase() === filter) {
        finalArr.push(tabledata[i]);
        status = true;
      } else if (lname.toUpperCase() === filter) {
        finalArr.push(tabledata[i]);
        status = true;
      } else if (fullname.toUpperCase().indexOf(filter) > -1) {
        finalArr.push(tabledata[i]);
        status = true;
      } else {
        continue;
      }
    } else {
      alert("Enter valid info");
      break;
    }
  }
  buildTable(finalArr);
  pageCount.style.display = "none";
}
