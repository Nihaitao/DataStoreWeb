using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using CT.Signature.Profile;
using CT.Signature.Transform;

namespace CT.Signature
{
    public class JsonRequest<TResponse> : RpcEduRequest<JsonResponse<TResponse>>
    {
        private readonly JavaScriptSerializer serializer;

        public JsonRequest(string url, IClientProfile profile) : base(url, profile)
        {
            serializer = new JavaScriptSerializer();
            base.ContentType = "application/json";
        }

        private object _content = null;

        public new object Content
        {
            set
            {
                var strSerialize = serializer.Serialize(value);
                base.Content = System.Text.Encoding.GetEncoding(Encoding).GetBytes(strSerialize);
                _content = value;
            }
            get { return _content; }
        }

        public string StrContent
        {
            get { return System.Text.Encoding.GetEncoding(Encoding).GetString(base.Content); }
            set { base.Content = System.Text.Encoding.GetEncoding(Encoding).GetBytes(value); }
        }

        public byte[] BufferContent
        {
            get { return base.Content; }
            set { base.Content = BufferContent; }
        }

        public override JsonResponse<TResponse> GetResponse(UnmarshallerContext unmarshallerContext)
        {
            var jsonResponse = new JsonResponse<TResponse>();
            jsonResponse.HttpResponse = unmarshallerContext.HttpResponse;
            var strDeserialize = System.Text.Encoding.GetEncoding(Encoding)
                .GetString(jsonResponse.HttpResponse.Content);
            jsonResponse.Data =
                serializer.Deserialize<TResponse>(strDeserialize);
            return jsonResponse;
        }
    }
}