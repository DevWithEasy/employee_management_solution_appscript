function login(user) {
  const sheet = selectSheet('Users')
  const sheetValues = sheet.getDataRange().getValues()
  const values = sheetValues.slice(1)
  const emails = values.map(value => value[0])
  if (emails.includes(user.email)) {
    let findUser = {}
    values.forEach(value => {
      if (value[0] === user.email) {
        findUser = {
          email: value[0],
          password: value[1],
          name: value[2]
        }
      } else {
        return
      }
    })
    if (findUser.password === user.password) {
      // Logger.log('Logged')
      return {
        success: true,
        message: 'User found',
        user: findUser
      }
    } else {
      // Logger.log('Password wrong')
      return {
        success: false,
        message: 'Password wrong',
        user: {}
      }
    }

  } else {
    // Logger.log('User not found')
    return {
      success: false,
      message: 'User not found',
      user: {}
    }
  }
}


function createSectionSheet() {
  const sections = getSections().map(section => section.name)
  sections.forEach(section => {
    const sheet = spreadsheet.getSheetByName(section)
    if (sheet) {
      Logger.log('Already Exist' + section)
    } else {
      const newSheet = spreadsheet.insertSheet(section)
      if (newSheet) {
        Logger.log('Created Successfully')
      } else {
        const newSheet = spreadsheet.insertSheet(section)
        Logger.log('Created Successfully failed')
      }
    }
  })

}

function createSectionToCopySheet() {

  const sheet = spreadsheet.getSheetByName('Section')

  const sections = getSections().map(section => section.name)

  sections.forEach(section => {
    const findSheet = selectSheet(section)
    if (findSheet) {
      Logger.log('Already Exist')
    } else {
      const copySheet = sheet.copyTo(spreadsheet)

      copySheet.setName(section)
    }
  })

}

function deleteSectionSheet() {

  const sections = getSections().map(section => section.name)

  sections.forEach(section => {
    const sheet = spreadsheet.getSheetByName(section)
    if (sheet) {
      spreadsheet.deleteSheet(sheet)
      Logger.log('Sheet deleted.')
    } else {
      Logger.log('Sheet not exists.')
    }
  })

}
