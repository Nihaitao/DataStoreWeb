using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CT.Signature.Auth;
using CT.Signature.Http;
using CT.Signature.Profile;
using CT.Signature.Utils;

namespace CT.Signature
{
    public abstract class RpcEduRequest<T> : eduRequest<T>
    {
        private Dictionary<string, string> pathParameters = new Dictionary<string, string>();
        internal IClientProfile Profile { get; private set; }

        protected RpcEduRequest()
        {
            Initialize();
        }


//        protected RpcEduRequest(string url)
//        {
//            var baseUri = new Uri(profile.ServiceUrl);
//            var resUri = new Uri(baseUri, url);
//            base.Url = resUri.ToString();
//            if (!string.IsNullOrEmpty(resUri.Query))
//            {
//                base.Query = resUri.Query.StartsWith("?")
//                    ? resUri.Query.Substring(1, resUri.Query.Length - 1)
//                    : resUri.Query;
//
//                base.Url = base.Url.Substring(0, base.Url.IndexOf("?"));
//            }
//            Initialize();
//        }
        protected RpcEduRequest(string url,IClientProfile profile)
        {
            Profile = profile;
            var baseUri = new Uri(profile.ServiceUrl);
            var resUri = new Uri(baseUri, url);
            base.Url = resUri.ToString();
            if (!string.IsNullOrEmpty(resUri.Query))
            {
                base.Query = resUri.Query.StartsWith("?")
                    ? resUri.Query.Substring(1, resUri.Query.Length - 1)
                    : resUri.Query;

                base.Url = base.Url.Substring(0, base.Url.IndexOf("?"));
            }
            Initialize();
        }

        private void Initialize()
        {
            this.AcceptFormat = FormatType.RAW;
            this.Composer = RpcSignatureComposer.GetComposer();
        }

        public override string ComposeUrl(string _url, Dictionary<string, string> queries)
        {
            Dictionary<string, string> mapQueries = queries ?? QueryParameters;
            StringBuilder urlBuilder = new StringBuilder("");
            urlBuilder.Append(_url);
            if (-1 == urlBuilder.ToString().IndexOf('?'))
            {
                urlBuilder.Append("?");
            }
            else if (!urlBuilder.ToString().EndsWith("?"))
            {
                urlBuilder.Append("&");
            }
            string query = ConcatQueryString(mapQueries);
            string url = urlBuilder.Append(query).ToString();
            if (url.EndsWith("?") || url.EndsWith("&"))
            {
                url = url.Substring(0, url.Length - 1);
            }
            return url;
        }


        public override HttpRequest SignRequest(ISigner signer, Credential credential, FormatType? format)
        {
            if (null != signer && null != credential)
            {
                string accessKeyId = credential.AccessKeyId;
                string accessSecret = credential.AccessSecret;
                string strToSign = this.Composer.ComposeStringToSign(this, Method, this.Url, signer, QueryParameters,
                    this.Headers, pathParameters);
                string signature = signer.SignString(strToSign, accessSecret);
                DictionaryUtil.Add(this.Headers, "signature",
                    string.Format("{0}|{1}|{2}", accessKeyId, signature, Timestamp.ToString("yyyy-MM-dd HH:mm:ss")));
            }
              //  Url = this.ComposeUrl(base.Url, QueryParameters);
            
            return this;
        }

        public Dictionary<string, string> PathParameters
        {
            get { return pathParameters; }
            set { pathParameters = value; }
        }

        public override string ToString()
        {

            StringBuilder urlBuilder = new StringBuilder("");
            urlBuilder.Append(base.Url);
            if (-1 == urlBuilder.ToString().IndexOf('?'))
            {
                urlBuilder.Append("?");
            }
            else if (!urlBuilder.ToString().EndsWith("?"))
            {
                urlBuilder.Append("&");
            }
            string query = ConcatQueryString(QueryParameters);
            string url = urlBuilder.Append(query).ToString();
            if (url.EndsWith("?") || url.EndsWith("&"))
            {
                url = url.Substring(0, url.Length - 1);
            }
            return url;
        }
    }
}