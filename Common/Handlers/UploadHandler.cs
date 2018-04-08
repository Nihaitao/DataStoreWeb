using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Common.Exceptions;
using Common.FileUpload;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Common.Handlers
{
    public class UploadHandler : IHttpHandler
    {
        FileUploader uploader = new FileUploader();

        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count != 1)
            {
                Response(context, RspModel.Error("只支持单文件上传"));
                return;
            }
            var busType = context.Request["busType"];
            var enumBusType = EnumBusType.School;
            try
            {
                enumBusType = (EnumBusType) Enum.Parse(typeof(EnumBusType), busType);
            }
            catch
            {
                // ignored
            }
            var file = context.Request.Files[0];
            try
            {
                var url = uploader.Upload(enumBusType, file.InputStream, file.FileName);
                Response(context, RspModel.Success(url));
            }
            catch (FileUploadException ex)
            {
                Response(context, RspModel.Error(ex.Message));
            }
        }

        private void Response(HttpContext context, RspModel rspModel)
        {
            var respContent = string.Empty;
            if ("editor".Equals(context.Request.QueryString["src"]))
            {
                var rsp = new
                {
                    code = rspModel.SuccessResponse ? 0 : 1,
                    msg = rspModel.SuccessResponse ? null : rspModel.Message,
                    data = new
                    {
                        src = rspModel.SuccessResponse ? rspModel.Message : null,
                        title = "",
                    }
                };
                respContent = JsonConvert.SerializeObject(rsp);
            }
            else
            {
                respContent = JsonConvert.SerializeObject(rspModel);
            }
            context.Response.ContentType = "application/json";
            context.Response.Write(respContent);
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}