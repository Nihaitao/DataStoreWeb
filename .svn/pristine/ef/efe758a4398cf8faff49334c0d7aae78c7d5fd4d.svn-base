using System;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using Nancy;
using Newtonsoft.Json;

namespace Common.Module
{
    public class PolyvBreakpointModule : BaseModule
    {
        public const string Token = "Y07Q4yopIVXN83n-MPoIlirBKmrMPJu0";
        public const string serviceUrl = "http://upload.polyv.net:1080/files/";
        public const string writeToken = "cb1ffbac-ae05-4b4e-b310-3f92c344a2a2";
        public const string secretkey = "UfmKG8jJ82";

        public PolyvBreakpointModule()
        {
            Get["/polyv/hash"] = _ => Hash();
        }

        public dynamic Hash()
        {
            var ts = GenerateTimeStamp().ToString();
            var hash = EncryptToMD5(ts + writeToken).ToLower();
            var resp = new
            {
                ts,
                hash
            };
            return Response.AsJson(resp);
        }

        private long GenerateTimeStamp()
        {
            var startTime = TimeZone.CurrentTimeZone.ToLocalTime(new System.DateTime(1970, 1, 1, 0, 0, 0, 0));
            var t = (DateTime.Now.Ticks - startTime.Ticks) / 10000; //除10000调整为13位        
            return t;
        }

        private string EncryptToSHA1(string str)
        {
            using (var sha1 = new SHA1CryptoServiceProvider())
            {
                byte[] dataToHash = Encoding.UTF8.GetBytes(str);
                byte[] dataHashed = sha1.ComputeHash(dataToHash);
                return BitConverter.ToString(dataHashed).Replace("-", "");
            }
            ;
        }

        private string EncryptToMD5(string str)
        {
            using (var md5 = MD5.Create())
            {
                byte[] dataToHash = Encoding.UTF8.GetBytes(str);
                byte[] dataHashed = md5.ComputeHash(dataToHash);
                return BitConverter.ToString(dataHashed).Replace("-", "");
            }
        }
    }
}