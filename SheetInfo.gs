class SheetInfo {
  constructor() {
    this.spreadSheet = SpreadsheetApp.getActiveSpreadsheet()
    this.sheet = this.spreadSheet.getSheetByName('Section')
    this.data_sheet = this.spreadSheet.getSheetByName('Data')
    this.values = this.sheet.getRange(1, 1, 1, this.sheet.getLastColumn()).getValues();
  }

  static getDayArray() {
    return Array.from({ length: 31 }, (_, i) => i + 1)
  }

  static columnToLetter(column) {
    var temp, letter = '';
    while (column > 0) {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter
  }

  static getValues() {
    const instance = new SheetInfo()
    return instance.values[0]
  }

  static getTotalColumn() {
    const instance = new SheetInfo()
    return instance.values[0].length
  }

  static getInfoHeader() {
    const instance = new SheetInfo()
    const headerValues = []
    instance.values[0].forEach(value => {
      if (this.getDayArray().includes(value) || value === 'Overtime Hour') {
        return
      } else {
        headerValues.push(value)
      }
    })
    return headerValues
  }

  static getInfoHeaderTotal() {
    return this.getInfoHeader().length
  }

  static getHeader() {
    const instance = new SheetInfo()
    return instance.values[0].slice(0, this.getInfoHeaderTotal())
  }

  static getDays() {
    const instance = new SheetInfo()
    return instance.values[0].slice(this.getInfoHeaderTotal(), this.getTotalColumn() - 1)
  }

  static transferValues(){
    const sheet = selectSheet('Transfer')
    const values = sheet.getRange(1, 1, sheet.getLastRow(),1).getValues()
    return values.map(v=>v[0])
  }
    static transferLastRow(){
    return this.transferValues().length+1
  }
  static checkTransfer(id){
    const values = this.transferValues()
    let row = 0
    
    values.forEach((v,i)=>{
      
      if(v === id){
        row = row + i+1
      }else{
        row = row + 0
      }
    })
    return row === 0 ? null : row
  }
}

