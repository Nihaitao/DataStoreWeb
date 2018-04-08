
var JsonToExcel = function (arrData, title) {
    var ShowLabel = "";
    if (arrData != undefined) {
        ShowLabel = "<table>";
        if (arrData.length > 0) {
            //ShowLabel += "<tr>";
            //$.each(arrData[0], function (i) {
            //    ShowLabel += "<td>" + i + "</td>";
            //});
            //ShowLabel += "</tr>";

            $.each(arrData, function (i) {
                ShowLabel += " <tr role='row' >";
                $.each(arrData[i], function (j) {
                    var msg = arrData[i][j];
                    if (msg != null) {
                        var ma = "^([+-]?)\\d*\\.?\\d+$";
                        if (new RegExp(ma).test($.trim(arrData[i][j] + "")) && arrData[i][j].length >= 5)
                            ShowLabel += "<td>'" + (arrData[i][j] + "") + "</td>";
                        else
                            ShowLabel += "<td>" + (arrData[i][j] + "") + "</td>";
                    } else {
                        ShowLabel += "<td></td>";
                    }
                });
                ShowLabel += "</tr>";
            });
        }
        ShowLabel += "</table>";

        JSONToExcelConvertor(ShowLabel, title)
    }
}



function JSONToExcelConvertor(excel, FileName) {

    var excelFile = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:x='urn:schemas-microsoft-com:office:excel' xmlns='http://www.w3.org/TR/REC-html40'>";
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
    excelFile += '<meta http-equiv="content-type" content="application/vnd.ms-excel';
    excelFile += '; charset=UTF-8">';
    excelFile += "<head>";
    excelFile += "<!--[if gte mso 9]>";
    excelFile += "<xml>";
    excelFile += "<x:ExcelWorkbook>";
    excelFile += "<x:ExcelWorksheets>";
    excelFile += "<x:ExcelWorksheet>";
    excelFile += "<x:Name>";
    excelFile += "{worksheet}";
    excelFile += "</x:Name>";
    excelFile += "<x:WorksheetOptions>";
    excelFile += "<x:DisplayGridlines/>";
    excelFile += "</x:WorksheetOptions>";
    excelFile += "</x:ExcelWorksheet>";
    excelFile += "</x:ExcelWorksheets>"; http://localhost:32747/../../System
        excelFile += "</x:ExcelWorkbook>";
    excelFile += "</xml>";
    excelFile += "<![endif]-->";
    excelFile += "</head>";
    excelFile += "<body>";
    excelFile += excel;
    excelFile += "</body>";
    excelFile += "</html>";


    var uri = 'data:application/vnd.ms-excel;charset=utf-8,' + encodeURIComponent(excelFile);

    var link = document.createElement("a");
    link.href = uri;

    link.style = "visibility:hidden";
    link.download = FileName + ".xls";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}