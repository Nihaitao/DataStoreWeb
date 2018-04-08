using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;

namespace Common.Excel
{
    public class ExcelSerialize
    {
        private List<ExcelColumn> Columns = new List<ExcelColumn>();

        public int StartRow { get; set; }

        public ExcelSerialize()
        {
        }

        /// <summary>
        /// 添加列
        /// </summary>
        /// <param name="columnIndex">列名</param>
        /// <param name="columnName">列名</param>
        /// <param name="dataType">数据类型</param>
        /// <para name="fuc">验证参数</para>
        public void AddColumn(int columnIndex, string columnName, Func<string, object> func = null)
        {
            if (func == null)
            {
                func = (x) => x;
            }
            Columns.Add(new ExcelColumn()
            {
                ColumnIndex = columnIndex,
                ColumnName = columnName,
                Func = func
            });
        }

        public List<Dictionary<string, object>> Format(Stream stream, string fileName)
        {
            stream.Position = 0;
            IWorkbook workbook = null;
            ISheet sheet = null;
            if (fileName.EndsWith(".xlsx")) // 2007版本
                workbook = new XSSFWorkbook(stream);
            else if (fileName.EndsWith(".xls")) // 2003版本
                workbook = new HSSFWorkbook(stream);
            else
            {
                throw new Exception("未知的版本");
            }
            sheet = workbook.GetSheetAt(0);
            return Format(sheet);
        }

        private List<Dictionary<string, object>> Format(ISheet sheet)
        {
            var list = new List<Dictionary<string, object>>();
            for (var rowIndex = StartRow; rowIndex <= sheet.LastRowNum; rowIndex++)
            {
                var row = sheet.GetRow(rowIndex);
                if (row == null) {
                    continue;
                };
                var dictionary = new Dictionary<string, object>();
                var nullValueNumber = 0;
                foreach (var column in Columns)
                {
                    var cell = sheet.GetRow(rowIndex).GetCell(column.ColumnIndex);
                    if (cell != null && cell.CellType != CellType.Blank)
                    {
                        switch (cell.CellType)
                        {
                            case CellType.Numeric:
                                {
                                    dictionary.Add(column.ColumnName, cell.NumericCellValue);
                                }
                                break;
                            case CellType.Boolean:
                                {
                                    dictionary.Add(column.ColumnName, cell.BooleanCellValue);
                                }
                                break;
                            case CellType.Blank:
                                {
                                    dictionary.Add(column.ColumnName, null);
                                }
                                break;
                            case CellType.String:
                                {
                                    dictionary.Add(column.ColumnName, column.Func(cell.StringCellValue));
                                }
                                break;
                            default:
                                {
                                    dictionary.Add(column.ColumnName, null);
                                }
                                break;
                        }
                    }
                    else
                    {
                        nullValueNumber++;
                    }
                }
                if (nullValueNumber >= Columns.Count)
                {
                    rowIndex = sheet.LastRowNum;
                }
                else
                {
                    list.Add(dictionary);
                }
            }
            return list;
        }
    }
}