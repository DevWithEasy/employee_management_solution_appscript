function selectSheet(name) {
  return spreadsheet.getSheetByName(name)
}

function render(data) {
  const json = JSON.stringify(data)
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON)
}

//employee id make
function getId(n) {
  if (n === 0) {
    return '001'
  } else if (n > 0 && n < 10) {
    return `00${n + 1}`
  } else if (n > 9 && n < 100) {
    return `0${n + 1}`
  } else {
    return `${n + 1}`
  }
}


const add_employee_params = '&section=section&section_row=6&section_col=5&id=B-002&name=Rubel Islam&joining_date=05/06/2024&designation=Officer&mobile=01717642515&nid=19969419473000162&salary=2500&quarter=Yes&meal=No'