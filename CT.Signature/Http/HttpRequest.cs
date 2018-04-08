using System;
using System.Collections.Generic;
using CT.Signature.Utils;

namespace CT.Signature.Http
{
    public class HttpRequest
    {
        public Dictionary<string, string> Headers { get; set; }
        public String Url { get; set; }
        public MethodType? Method { get; set; }
        public FormatType FormatType { get; set; } 
        public byte[] Content { get; set; }
        public String Encoding { get; set; }
        public DateTime Timestamp { get; set; }
        public string ContentType { get; set; }

        public HttpRequest()
        {
            Encoding = "utf-8";
            Method =MethodType.GET;
            FormatType = FormatType.JSON;
            Timestamp=DateTime.Now;
        }

        public HttpRequest(String strUrl)
        {
            Encoding = "utf-8";
            Method = MethodType.GET;
            FormatType = FormatType.JSON;
            Url = strUrl;
            Headers = new Dictionary<string, string>();
            Timestamp = DateTime.Now;
        }

        public HttpRequest(String strUrl, Dictionary<string, string> tmpHeaders)
        {
            Method = MethodType.GET;
            FormatType = FormatType.JSON;
            Url = strUrl;
            Timestamp = DateTime.Now;
            if (null != tmpHeaders)
            {
                Headers = tmpHeaders;
            }
        }

     
    }
}