using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Common.Attributes;
using Common.Excel;
using Common.FileUpload;
using CT.Signature;
using CT.Signature.Http;
using CT.Signature.Profile;
using Newtonsoft.Json;
using Common.Import;

namespace Common.Handlers
{
    public class ExcelHttpHandler : IHttpHandler
    {
        static string servicePath = "/excel/";

        static ExcelHttpHandler()
        {
            ExcelMethodCache.Initialization(typeof(ExcelHttpHandler));
        }

        public string GetOnlineAccountID(HttpContext context)
        {
            try
            {
                return context.Request.Cookies["AccountID"] != null ? context.Request.Cookies["AccountID"].Value : "";
            }
            catch (Exception)
            {
                return "";
            }
        }

        public void ProcessRequest(HttpContext context)
        {
            var requestUrl = context.Request.Url.AbsolutePath;
            if (requestUrl.StartsWith(servicePath))
            {
                requestUrl = requestUrl.Substring(servicePath.Length - 1, requestUrl.Length - servicePath.Length + 1);
            }
            if (context.Request.Files.Count != 1)
            {
                Response(context, RspModel.Error("只支持单文件上传"));
                return;
            }
            var file = context.Request.Files[0];
            var list = ExcelMethodCache.Execute(this, requestUrl, file);
            var strSerialize = JsonConvert.SerializeObject(list);

            context.Response.ContentType = "application/json";
            context.Response.Write(strSerialize);
        }

        private void Response(HttpContext context, RspModel rspModel)
        {
            var respContent = JsonConvert.SerializeObject(rspModel);
            context.Response.ContentType = "application/json";
            context.Response.Write(respContent);
        }

        /// <summary>
        /// 学生列表Excel导入
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        //[ExcelHandle("ImportStudent")]
        //public List<Dictionary<string, object>> Demo(HttpPostedFile file)
        //{
        //    var excelSerialize = new ExcelSerialize();
        //    excelSerialize.StartRow = 1;
        //    excelSerialize.AddColumn(0, "Name");
        //    excelSerialize.AddColumn(1, "CardNumber");
        //    excelSerialize.AddColumn(2, "Sex");
        //    excelSerialize.AddColumn(3, "Phone");
        //    excelSerialize.AddColumn(4, "Email");
        //    excelSerialize.AddColumn(5, "QQ");
        //    excelSerialize.AddColumn(6, "Phone2");
        //    excelSerialize.AddColumn(7, "NowProvince_ID");
        //    excelSerialize.AddColumn(8, "NowCity_ID");
        //    excelSerialize.AddColumn(9, "NowArea_ID");
        //    excelSerialize.AddColumn(10, "NowAddress");
        //    excelSerialize.AddColumn(11, "EducationName");
        //    excelSerialize.AddColumn(12, "Remark");
        //    return excelSerialize.Format(file.InputStream, file.FileName);
        //}
        public bool IsReusable
        {
            get { return true; }
        }
        [ExcelHandle("ImportExcel")]
        public List<Dictionary<string, object>> Demo(HttpPostedFile file)
        {
            var excelSerialize = new ExcelSerialize();

            var studentImport = new ClueImport();
            excelSerialize.StartRow = 1;

            var returnValue = excelSerialize.Format(file.InputStream, file.FileName);
            foreach (var item in returnValue)
            {
                var temp = new Dictionary<string, object>();
                var _temp = new Dictionary<string, object>();
                int k = 0;
                foreach (var entity in item)
                {
                    _temp["$$_" + k + "_" + entity.Key] = item[entity.Key];
                    k++;
                    var value = studentImport.SafeGet(entity.Key, Convert.ToString(entity.Value));
                    if (value > 0)
                    {
                        temp[entity.Key] = value;
                    }
                }
                foreach (var entity in temp)
                {

                    item[entity.Key] = entity.Value;
                }
                foreach (var entity in _temp)
                {

                    item[entity.Key] = entity.Value;
                }
            }
            return returnValue;
        }

    }
}