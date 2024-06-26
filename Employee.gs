class Employee {
  constructor(name, id) {
    this.name = name
    this.id = id
    this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
    this.employee_sheet = this.spreadSheet.getSheetByName(this.name)
  }

  selectSheet(name) {
    return this.spreadSheet.getSheetByName(name)
  }

  getLastRowNo(name) {
    const sheet = selectSheet(name)
    const values = sheet.getRange(1, 1, this.employee_sheet.getLastRow(), 1).getValues()
    let no = 1
    values.forEach(v => {
      if (v[0] === '') {
        return
      } else {
        no = no + 1
      }
    })
    return no
  }

  getIdValues() {
    return this.employee_sheet.getRange(1, 1, this.employee_sheet.getLastRow(), 1).getValues()
  }

  checkEmployee() {
    const value = this.getIdValues().find(value => value[0] === this.id)
    if (value) {
      return true
    } else {
      return false
    }
  }

  findEmployee() {
    const value = this.getIdValues().find(value => value[0] === this.id)
    if (value) {
      return value
    } else {
      return value
    }
  }

  getSection() {
    const transfer_sheet = this.spreadSheet.getSheetByName('Transfer')
    const transfer_sheet_values = transfer_sheet.getRange(1, 1, transfer_sheet.getLastRow(), 3).getValues()
    const findEmployee = transfer_sheet_values.find(value => value[0] === this.id)
    if (findEmployee) {
      return findEmployee[2]
    } else {
      return null
    }
  }

  getEmployeeRow() {
    const ids = this.getIdValues()
    let row = -1
    for (var i = 0; i < ids.length; i++) {
      if (ids[i][0] === this.id) {
        row = i + 1
      }
    }
    return row
  }

  getEmployeeValues() {
    const value = this.employee_sheet.getRange(this.getEmployeeRow(), 1, 1, this.employee_sheet.getLastColumn()).getValues()
    return value[0]
  }

  getEmployeeInfoValues() {
    return [...this.getEmployeeValues().slice(0, SheetInfo.getInfoHeaderTotal()), this.getEmployeeValues()[SheetInfo.getTotalColumn() - 1]]
  }

  getEmployeeDayValus() {
    return this.getEmployeeValues().slice(SheetInfo.getInfoHeaderTotal(), SheetInfo.getTotalColumn() - 1)
  }

  getEmployeeInfo() {
    const headers = [...SheetInfo.getInfoHeader(), SheetInfo.getValues()[SheetInfo.getTotalColumn() - 1]]
    const infos = this.getEmployeeInfoValues()

    const employee = {}

    headers.forEach((key, index) => {
      employee[key.split(' ').join('_').toLowerCase()] = infos[index] ? infos[index] : 0
    })
    return employee
  }

  getEmployeeDays() {
    const headers = SheetInfo.getDays()
    const days = this.getEmployeeDayValus()
    const data = []
    headers.forEach((val, i) => {
      data.push({
        column: SheetInfo.getInfoHeaderTotal() + i + 1,
        value: days[i] ? days[i] : ''
      })
    })
    return data
  }

  getEmployeeData() {
    return {
      row: this.getEmployeeRow(),
      section: this.name,
      info: this.getEmployeeInfo(),
      days: this.getEmployeeDays()
    }
  }

  getEmployeeInfoUpdateAndSalary() {
    return {
      row: this.getEmployeeRow(),
      section: this.name,
      info: this.getEmployeeInfo()
    }
  }

  getEmployeeInfoWithColumn() {
    const valus = this.getEmployeeInfoValues()
    Logger.log(valus)
  }

  employeeTransfer(name) {
    const sheet = this.selectSheet(name)
    const row = this.getLastRowNo(name)

    this.getEmployeeInfoValues().slice(0, 10).forEach((v, i) => {
      sheet.getRange(row, i + 1).setValue(v)
    })

    this.getEmployeeDayValus().forEach((v, i) => {
      sheet.getRange(row, SheetInfo.getInfoHeaderTotal() + i + 1).setValue(v)
    })

    this.employee_sheet.deleteRow(this.getEmployeeRow())

    const transferSheet = this.selectSheet('Transfer')
    if (SheetInfo.checkTransfer(this.id)) {
      transferSheet.getRange(SheetInfo.checkTransfer(this.id), 1).setValue(this.id)
      transferSheet.getRange(SheetInfo.checkTransfer(this.id), 2).setValue(this.name)
      transferSheet.getRange(SheetInfo.checkTransfer(this.id), 3).setValue(name)
    } else {
      const transferSheetLastRow = this.getLastRowNo('Transfer')
      transferSheet.getRange(transferSheetLastRow, 1).setValue(this.id)
      transferSheet.getRange(transferSheetLastRow, 2).setValue(this.name)
      transferSheet.getRange(transferSheetLastRow, 3).setValue(name)
    }
  }

}

function check() {
  // const instance = new Employee('Biscuit', 'B-002')
  // instance.getSection()
  // Logger.log(instance.employeeTransfer())
  Logger.log(SheetInfo.checkTransfer('B-002'))
}
