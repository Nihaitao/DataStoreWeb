using System;
using System.Collections.Generic;
using CT.Signature.Http;

namespace CT.Signature.Auth
{
    public interface ISignatureComposer
    {
        Dictionary<String, String> RefreshSignParameters(Dictionary<String, String> parameters,
       ISigner signer, String accessKeyId, FormatType? format);

        String ComposeStringToSign(HttpRequest httpRequest, MethodType? method,
               String Url, ISigner signer,
               Dictionary<String, String> queries,
               Dictionary<String, String> headers,
               Dictionary<String, String> paths);
    }
}
