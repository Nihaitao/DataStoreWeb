using CT.Signature;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;

namespace Common.Import
{
    public class ClueImport
    {
        public ClueImport()
        {
            this.ReadExcel(this.GetExcelBytes());
        }
        private Dictionary<string, Dictionary<string, int>> _dictionary =
           new Dictionary<string, Dictionary<string, int>>();

        public int SafeGet(string columnName, string key)
        {
            var value = 0;
            Dictionary<string, int> outValue = null;
            return (_dictionary.TryGetValue(columnName, out outValue) && outValue.TryGetValue(key, out value))
                ? value
                : 0;
        }
        public void ReadExcel(byte[] bytes)
        {
            IWorkbook workbook = new HSSFWorkbook(new MemoryStream(bytes));
            var sheet = workbook.GetSheetAt(0);
            foreach (var cell in sheet.GetRow(0).Cells)
            {
                if (cell.CellType == CellType.String)
                {
                    var columnName = cell.StringCellValue;
                    if (!string.IsNullOrEmpty(columnName))
                    {
                        columnName = Regex.Replace(columnName, @"\(.*?\)", "");
                        var itemSheet = workbook.GetSheet("Sheet_" + columnName);
                        if (itemSheet != null)
                        {
                            ExcelSheet(columnName, itemSheet);
                        }
                    }
                }
            }
        }
        private void ExcelSheet(string columnName, ISheet sheet)
        {
            var dsDictionary = new Dictionary<string, int>();
            var maxRow = sheet.PhysicalNumberOfRows > sheet.LastRowNum ? sheet.PhysicalNumberOfRows : sheet.LastRowNum;
            for (var rowNum = 0; rowNum < maxRow; rowNum++)
            {
                var row = sheet.GetRow(rowNum);
                if (row.Cells.Count > 1)
                {
                    var nameCell = row.Cells[0];
                    var IdCell = row.Cells[1];
                    if (nameCell.CellType == CellType.String && IdCell.CellType == CellType.Numeric)
                    {
                        dsDictionary[nameCell.StringCellValue] = (int)IdCell.NumericCellValue;
                    }
                }
            }
            _dictionary[columnName] = dsDictionary;
        }
        public byte[] GetExcelBytes()
        {
            try
            {
                var url = new UriBuilder(System.Web.HttpContext.Current.Request.Url);
            
                //url.Path = "/service/edu/StudentinfoDetail/G
                url.Path = "/service/crm/Clue/GetUploadExcelTemplate";
                var request = ProfileManager.GetByteRequest(url.Uri);
                foreach (var key in HttpContext.Current.Request.QueryString.AllKeys)
                {
                    request.Headers.Add(key, HttpContext.Current.Request.QueryString[key]);
                }
                var client = new eduClient(); 
                var response = client.GetResponse(request);
                return response.Data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
