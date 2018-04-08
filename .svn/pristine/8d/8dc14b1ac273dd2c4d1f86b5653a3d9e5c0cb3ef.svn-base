using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CT.Signature.Http;
using CT.Signature.Profile;
using CT.Signature.Transform;

namespace CT.Signature
{
  public  class ByteRequest:RpcEduRequest<ByteResponse>
    {
        public ByteRequest(string serviceUrl, IClientProfile profile)
            : base(serviceUrl, profile)
        {
            this.AcceptFormat = FormatType.JSON;
        }
        public override ByteResponse GetResponse(UnmarshallerContext unmarshallerContext)
        {
            var byteResponse = new ByteResponse();
            byteResponse.HttpResponse = unmarshallerContext.HttpResponse;
            return byteResponse;
        }
    }
}
