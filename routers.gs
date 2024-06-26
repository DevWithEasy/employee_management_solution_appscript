function loadLogin(params) {
  const {email,password} = params
  const sheet = selectSheet('Users')
  const sheetValues = sheet.getDataRange().getValues()
  const values = sheetValues.slice(1)
  const emails = values.map(value => value[0])
  if (emails.includes(email)) {
    let findUser = {}
    values.forEach(value => {
      if (value[0] === email) {
        findUser = {
          email: value[0],
          password: value[1],
          name: value[2]
        }
      } else {
        return
      }
    })
    if (findUser.password === password) {
      return render({
        success: true,
        message: 'User found',
        user: findUser
      })
    } else {
      // Logger.log('Password wrong')
      return render({
        success: false,
        message: 'Password wrong',
        user: {}
      })
    }

  } else {
    // Logger.log('User not found')
    return render({
      success: false,
      message: 'User not found',
      user: {}
    })
  }
}

//home screen
function loadHome() {
  const data = {
    message: 'welcome'
  }
  return render(data)
}

//get sections list
function loadSections(params) {
  return render(getSections())
}

//get designations list
function loadDesignations(params) {
  return render(getDesignations())
}

//get sections and designation list
function loadSectionDesignation(params) {
  return render({
    sections: getSections(),
    designations: getDesignations()
  })
}

//generate new id
function loadNewId(params) {
  const data = {
    id: generateId(params.section)
  }
  return render(data)
}

//add new employee add
function loadAddEmployee(params) {
  try {
    const sheet = spreadsheet.getSheetByName(params.section)
    const sheet_values = sheet.getRange('A2:B').getValues()
    let row = 2
    sheet_values.forEach((value) => {
      if (value[0] === '' || value[1] === '') {
        return
      } else {
        return row += 1
      }
    })

    sheet.getRange(row, 1).setValue(params.id)
    sheet.getRange(row, 2).setValue(params.name)
    sheet.getRange(row, 3).setValue(params.joining_date)
    sheet.getRange(row, 4).setValue(params.designation)
    sheet.getRange(row, 5).setValue(params.mobile)
    sheet.getRange(row, 6).setValue(params.nid)
    sheet.getRange(row, 7).setValue('Yes')
    sheet.getRange(row, 8).setValue(Number(params.salary))
    sheet.getRange(row, 9).setValue(params.quarter)
    sheet.getRange(row, 10).setValue(params.meal)

    const section_row = Number(params.section_row)
    const section_col = Number(params.section_col)

    const data_sheet = spreadsheet.getSheetByName('Data')
    const section_value = data_sheet.getRange(section_row, section_col).getValue()
    data_sheet.getRange(section_row, section_col).setValue(Number(section_value ? section_value : 0) + 1)

    return render({
      success: true,
      message: 'Succesfully Employee Added.'
    })
  } catch (error) {
    Logger.log(error)
    return render({
      success: false,
      message: 'Failed Employee Added.'
    })
  }
}


//employee details will attendence
function loadAttendence(params) {
  const { section, id } = params
  try {
    const employee = new Employee(section, id)

    if (employee.checkEmployee()) {
      const data = employee.getEmployeeData()
      return render({ success: true, data })
    } else {
      const findSection = employee.getSection()
      if (findSection) {
        const findEmployee = new Employee(findSection, id)
        const data = findEmployee.getEmployeeData()
        return render({ success: true, data })
      } else {
        return render({ success: false, data: {} })
      }
    }
  } catch {
    return render({ success: false, data: {} })
  }
}

//update attendence
function loadUpdateAttendence(params) {
  const { section, row, col, value } = params
  try {
    const sheet = spreadsheet.getSheetByName(section)

    sheet.getRange(row, col).setValue(value)

    const new_value = sheet.getRange(row, col).getValue()

    return render({
      success: true,
      data: {
        row,
        col,
        value: new_value
      },
      message: 'Succesfully Updated.'
    })
  } catch (err) {
    return render({
      success: false,
      message: 'Failed Update Attendence.'
    })
  }
}

function loadUpdateEmployee(params) {
  const { section, id } = params
  try {
    const employee = new Employee(section, id)
    const sheet = selectSheet(section)
    const row = employee.getEmployeeRow()

    sheet.getRange(row, 2).setValue(params.name)
    sheet.getRange(row, 3).setValue(params.joining_date)
    sheet.getRange(row, 4).setValue(params.designation)
    sheet.getRange(row, 5).setValue(params.mobile)
    sheet.getRange(row, 6).setValue(params.nid)
    sheet.getRange(row, 7).setValue(params.status)
    sheet.getRange(row, 8).setValue(Number(params.salary))
    sheet.getRange(row, 9).setValue(params.quarter)
    sheet.getRange(row, 10).setValue(params.meal)

    return render({ success: true,section,id })
  } catch (err) {
    Logger.log(err)
    return render({ success: false,section,id })
  }
}

function loadTransferSection(params) {
  const { from, to, id } = params
  try {
    const employee = new Employee(from,id)
    employee.employeeTransfer(to)
    return render({success : true})
  } catch {
    return render({success : false})
  }
}

function loadSalaryCheck(params) {
  const { section, id } = params
  try {
    const employee = new Employee(section, id)

    if (employee.checkEmployee()) {
      const data = employee.getEmployeeInfoUpdateAndSalary()
      return render(data)
    } else {
      const findSection = employee.getSection()
      if (findSection) {
        const findEmployee = new Employee(findSection, id)
        const data = findEmployee.getEmployeeInfoUpdateAndSalary()
        return render(data)
      } else {
        return render({})
      }
    }
  } catch {
    return render({})
  }
}

//remove all sheet employee attence data
function loadRemoveEmployeeData() {
  try {
    const sections = getSections()
    // Logger.log(sections)
    if (sections.length > 0) {
      sections.forEach((section, i) => {
        const sheet = spreadsheet.getSheetByName(section.name)
        const sheet_values = sheet.getRange('A2:B').getValues()

        const values = []
        sheet_values.forEach((value, index) => {
          if (value[0] === '' || value[1] === '') {
            return
          } else {
            return values.push({
              row: index + 2,
              id: value[0],
              name: value[1]
            })
          }
        })

        if (values.length > 0) {
          values.forEach(value => {
            // const sheet = spreadsheet.getSheetByName(section)
            const employee_value = sheet.getRange(value.row, 1, 1, sheet.getLastColumn()).getValues()
            const employee_days = employee_value[0].slice(26, 57)
            employee_days.forEach((day, i) => {
              const rangeValue = sheet.getRange(value.row, i + 27).setValue('')
            })
          })
        } else {
          return
        }

      })
      return render({
        success: true,
        message: 'Succesfully Employee Data Remove.'
      })
    } else {
      return render({
        success: true,
        message: 'No Section Found.'
      })
    }
  } catch (error) {
    return render({
      success: false,
      message: 'Failed Employee Data Remove.'
    })
  }
}
