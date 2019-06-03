#!/usr/bin/python
# -*- coding: utf8 -*-
#Created by zhiwei.liu

import xlrd

from xlrd import XL_CELL_NUMBER 

_excelName = "text.xlsx"
_exportFileFolder = "./"



#对应构造文本进行修改
def writeToFile(_className ,_dataArray, _dataType, _rowNum , _colNum , _isLastSheet):
    print("write data .........")
    exportFileName = "{0}{1}.json".format(_exportFileFolder , _className)
    print("exportFileName~~~~",exportFileName )
    writeSteam = open(exportFileName , 'w')

    writeStr = ""

    #the first row is the name of every col
    writeStr += "{\n"
    # colKey = _dataArray[0][0]
    for iCol in range(_colNum):
        if iCol < 1 or _dataArray[0][iCol] != "zh-Hans":
            continue

        # writeStr += "\t\t{\n"
        for iRow in range(_rowNum):
            if iRow < 1:
                continue
            key = int(_dataArray[iRow][0]) 
            # print("~~~~~~~~~~ key is {0} ".format(key) )
            # print("~~~~~~~~~~~ value is {0} ".format(_dataArray[iRow][iCol]))
            value = "{0}".format(_dataArray[iRow][iCol])
            writeStr += "\t\"{0}\":\"{1}\"".format(key, value)

            if iCol != _colNum - 1 and iRow != _rowNum - 1:
            	writeStr += ",\n"

        
    writeStr += "\n}"
    writeSteam.write(writeStr)
    pass

def parseExcel():
    print("start parse excel.......")
    book = xlrd.open_workbook(_excelName)

    sheetNum = book.nsheets
    currentSheetIdx = 0
    for s in book.sheets():
        print("sheet ", s.name)

        dataArray = []
        dataType = []
        for row in range(s.nrows):
            values = []
            types = []
            for col in range(s.ncols):
                # print(s.cell(row,col).value)
                values.append(s.cell(row,col).value)
                types.append(s.cell(row,col).ctype)
            dataArray.append(values)
            dataType.append(types)

        isLastSheet = False
        if currentSheetIdx == sheetNum-1:
            isLastSheet = True
            pass
        writeToFile(s.name, dataArray , dataType , s.nrows , s.ncols , isLastSheet)

        currentSheetIdx = currentSheetIdx + 1

    pass

def main():
    parseExcel()
    pass

if __name__ == '__main__':
    main()
