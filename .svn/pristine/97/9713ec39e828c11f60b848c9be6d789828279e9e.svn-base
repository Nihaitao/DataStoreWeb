using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Common.Exceptions;
using CT.Signature;
using CT.Signature.Http;
using CT.Signature.Profile;

namespace Common.Handlers
{
    public class ProxyServiceHandler : IHttpHandler
    {
        static string servicePath = "/service/";

        static ProxyServiceHandler()
        {
        }

        public string GetOnlineAccountID(HttpContext context, string CookieName)
        {
            try
            {
                return context.Request.Cookies[CookieName] != null ? context.Request.Cookies[CookieName].Value : "";
            }
            catch (Exception)
            {
                return "";
            }
        }


        public void ProcessRequest(HttpContext context)
        {
            var requestUrl = context.Request.Url.PathAndQuery;
            if (requestUrl.StartsWith(servicePath))
            {
                requestUrl = requestUrl.Substring(servicePath.Length - 1, requestUrl.Length - servicePath.Length + 1);
            }
            CommonRequest commonRequest = null;
            try
            {
                commonRequest = ProfileManager.GetRequest(context.Request.Url);
            }
            catch (SiteNotAuthenticationException ex)
            {
                context.Response.Write(@"{""RequestId"":null,""Message"":""" + ex.Message +
                                       @""", ""ReturnData"":{""Data"":[],""TotalCount"":0},""SuccessResponse"":false}");
                context.Response.End();
            }


            if (context.Request.HttpMethod.ToLower() == "post")
            {
                var buffer = HttpContext.Current.Request.BinaryRead(context.Request.ContentLength);
                commonRequest.Method = MethodType.POST;
                commonRequest.Content = buffer;
                commonRequest.ContentType = context.Request.ContentType;
            }
            commonRequest.Headers["OnlineAccountID"] = GetOnlineAccountID(context, "AccountID");
            commonRequest.Headers["OnlineStuId"] =
                GetOnlineAccountID(context, "StuId"); //"006731D8DB96445CA6758E2EA10BB174"

            var client = new eduClient();
            //*****接口超时时间设置*********
            client.TimeoutInMilliSeconds = 30000;
            //*****接口超时时间设置*********
            var response = client.GetResponse(commonRequest);
            context.Response.ContentType = string.IsNullOrEmpty(response.HttpResponse.ContentType)
                ? "application/json"
                : response.HttpResponse.ContentType;
            string contentDescription;
            if (response.HttpResponse.Headers.TryGetValue("Content-Disposition", out contentDescription))
            {
                context.Response.AddHeader("Content-Disposition", contentDescription);
            }
            string setCookie;
            if (response.HttpResponse.Headers.TryGetValue("Set-Cookie", out setCookie))
            {
                context.Response.AddHeader("Cookie", setCookie);
            }
            context.Response.BinaryWrite(response.HttpResponse.Content);
        }

        public bool IsReusable
        {
            get { return true; }
        }
    }
}