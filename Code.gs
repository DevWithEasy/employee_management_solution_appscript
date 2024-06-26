const spreadsheet = SpreadsheetApp.getActiveSpreadsheet()

const Router = {}
Router.path = (route, callback) => {
  Router[route] = callback
}

function doGet(e) {
  //?v=login&email=email&password
  Router.path('login', loadLogin)
  //?v=section
  Router.path('sections', loadSections)

  //?v=designations
  Router.path('designations', loadDesignations)

  //?v=section_designation
  Router.path('section_designation', loadSectionDesignation)

  //?v=new_id&section=name
  Router.path('new_id', loadNewId)

  //?v=add_employee
  Router.path('add_employee', loadAddEmployee)

  //?v=remove_employee_data
  Router.path('remove_employee_data', loadRemoveEmployeeData)

  //?v=attendence&section=name&id=id
  Router.path('attendence', loadAttendence)

  //?v=update_attendence&section=name&row=number&col=number&value=value
  Router.path('update_attendence', loadUpdateAttendence)

  //?v=update&section=section&id=id
  Router.path('update_employee', loadUpdateEmployee)

  //?v=transfer&from=section&to=section&id=id
  Router.path('transfer', loadTransferSection)

  //?v=salary_check
  Router.path('salary_check', loadSalaryCheck)

  if (Router[e.parameters.v]) {
    return Router[e.parameters.v](e.parameter)
  } else {
    return loadHome()
  }
}