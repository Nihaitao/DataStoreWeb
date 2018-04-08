using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using CT.Signature.Auth;
using CT.Signature.Http;
using CT.Signature.Transform;
using CT.Signature.Utils;
using HttpRequest = CT.Signature.Http.HttpRequest;

namespace CT.Signature
{
    public abstract class eduRequest<T> : HttpRequest
    {
        private ProtocolType protocol = ProtocolType.HTTP;
        private FormatType acceptFormat;
        private Dictionary<string, string> queryParameters = new Dictionary<string, string>();

        public ISignatureComposer Composer { get; set; }

        public virtual FormatType AcceptFormat
        {
            get { return acceptFormat; }
            set
            {
                acceptFormat = value;
                DictionaryUtil.Add(Headers, "Accept", value.ToString());
            }
        }


        internal ProtocolType Protocol
        {
            get { return protocol; }
            set { protocol = value; }
        }

        public Dictionary<string, string> QueryParameters
        {
            get { return queryParameters; }
            set { queryParameters = value; }
        }

        public string Query
        {
            get { return string.Join("&", queryParameters.Select(x => string.Format("{0}={1}",x.Key,HttpUtility.UrlEncode(x.Value)))); }
            set
            {
                queryParameters.Clear();
                var collection = new HttpValueCollection(value, true, true, System.Text.Encoding.UTF8);
                foreach (var key in collection.AllKeys)
                {
                    if (queryParameters.ContainsKey(key))
                    {
                        queryParameters[key] = collection[key];
                    }
                    else
                    {
                        queryParameters.Add(key, collection[key]);
                    }
                }
                ;
            }
        }


        protected eduRequest()
            : base(null)
        {
            DictionaryUtil.Add(Headers, "x-sdk-client", "Net/2.0.0");
        }


        public static String ConcatQueryString(Dictionary<String, String> parameters)
        {
            if (null == parameters)
            {
                return null;
            }
            StringBuilder sb = new StringBuilder();

            foreach (var entry in parameters)
            {
                String key = entry.Key;
                String val = entry.Value;

                sb.Append(URLEncoder.Encode(key));
                if (val != null)
                {
                    sb.Append("=").Append(URLEncoder.Encode(val));
                }
                sb.Append("&");
            }

            int strIndex = sb.Length;
            if (parameters.Count > 0)
                sb.Remove(strIndex - 1, 1);

            return sb.ToString();
        }

        public abstract HttpRequest SignRequest(ISigner signer, Credential credential,
            FormatType? format);

        public abstract String ComposeUrl(String url, Dictionary<String, String> queries);

        public abstract T GetResponse(UnmarshallerContext unmarshallerContext);

        public virtual bool CheckShowJsonItemName()
        {
            return true;
        }
    }
}