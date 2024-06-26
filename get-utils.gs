function getSections() {
  const sheet = spreadsheet.getSheetByName('Data')
  const values = sheet.getRange(5, 2, sheet.getRange('B5').getDataRegion().getLastRow(), 4).getValues()
  const data = []
  values.forEach((value, index) => {
    if (value[0] === '' || value[1] === '' || value[2] === '') {
      return
    } else {
      data.push({
        id: value[0].toFixed(0),
        name: value[1],
        code: value[2],
        total: value[3] ? value[3] : 0,
        row: 5 + index,
        col: 5
      })
    }
  })
  // Logger.log(data)
  return data
}

function getDesignations() {
  const sheet = spreadsheet.getSheetByName('Data')
  const values = sheet.getRange(5, 7, sheet.getRange('G5').getDataRegion().getLastRow(), 2).getValues()
  const data = []
  values.forEach(value => {
    if (value[0] === '' || value[1] === '' || value[2] === '') {
      return
    } else {
      data.push({
        id: value[0].toFixed(0),
        name: value[1]
      })
    }
  })
  // Logger.log(data)
  return data
}

//total count employee in section
function getTotalRowBySheet(name) {
  const sheet = spreadsheet.getSheetByName(name)
  const values = sheet.getRange('A1:B').getValues()
  const data = []
  const val = values.slice(1, values.length - 1)
  val.forEach(d => {
    if (d[0] === '' || d[1] == '') {
      return
    } else {
      data.push(d)
    }
  })
  return Number(data.length.toFixed(0))
}

//completely generate id
function generateId(name) {
  const sections = getSections()
  const findSection = sections.find(section => section.name == name)
  return `${findSection.code}-${getId(getTotalRowBySheet(name))}`
}


