using System;
using CT.Signature.Http;
using CT.Signature.Profile;
using CT.Signature.Utils;

namespace CT.Signature
{
    public class CommonRequest : RpcEduRequest<CommonResponse>
    {
//        public CommonRequest(string serviceUrl)
//            : base(serviceUrl)
//        {
//            this.AcceptFormat = FormatType.JSON;
//        }


        public CommonRequest(string serviceUrl, IClientProfile profile)
            : base(serviceUrl, profile)
        {
            this.AcceptFormat = FormatType.JSON;
        }

        public void Add(string key, object value)
        {
            DictionaryUtil.Add(QueryParameters, key, value);
        }

        public override CommonResponse GetResponse(Transform.UnmarshallerContext unmarshallerContext)
        {
            var commonResponse = new CommonResponse();
            commonResponse.HttpResponse = unmarshallerContext.HttpResponse;
            commonResponse.Data = System.Text.Encoding.UTF8.GetString(unmarshallerContext.HttpResponse.Content);
            return commonResponse;
        }
    }
}