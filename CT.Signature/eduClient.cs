using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CT.Signature.Profile;
using CT.Signature.Auth;
using CT.Signature.Exceptions;
using CT.Signature.Http;
using CT.Signature.Reader;
using CT.Signature.Transform;

namespace CT.Signature
{
    public class eduClient
    {
        private int maxRetryNumber = 3;
        private bool autoRetry = true;
        private int timeoutInMilliSeconds = 100000; // Default 100 Seconds

//        public eduClient()
//        {
//            this.clientProfile = DefaultProfile.GetProfile();
//            this.maxRetryNumber = 3;
//            this.autoRetry = true;
//            this.timeoutInMilliSeconds = 10000;
//        }

        public eduClient()
        {
            this.maxRetryNumber = 3;
            this.autoRetry = true;
            this.timeoutInMilliSeconds = 10000;
        }


        public T GetResponse<T>(RpcEduRequest<T> request) where T : eduResponse
        {
            HttpResponse httpResponse = this.DoAction(request);
            return ParseAcsResponse(request, httpResponse);
        }

        public T GetResponse<T>(RpcEduRequest<T> request, bool autoRetry, int maxRetryNumber) where T : eduResponse
        {
            HttpResponse httpResponse = this.DoAction(request, autoRetry, maxRetryNumber);
            return ParseAcsResponse(request, httpResponse);
        }

        public T GetResponse<T>(RpcEduRequest<T> request, IClientProfile profile) where T : eduResponse
        {
            HttpResponse httpResponse = this.DoAction(request, profile);
            return ParseAcsResponse(request, httpResponse);
        }

        public T GetResponse<T>(RpcEduRequest<T> request, Credential credential)
            where T : eduResponse
        {
            HttpResponse httpResponse = this.DoAction(request, credential);
            return ParseAcsResponse(request, httpResponse);
        }

        public CommonResponse DoCommonAction(CommonRequest request)
        {
            HttpResponse httpResponse = this.DoAction(request);
            String data = System.Text.Encoding.UTF8.GetString(httpResponse.Content);

            CommonResponse response = new CommonResponse();
            response.Data = data;
            response.HttpResponse = httpResponse;

            return response;
        }

        private T ParseAcsResponse<T>(RpcEduRequest<T> request, HttpResponse httpResponse) where T : eduResponse
        {
            FormatType format = httpResponse.FormatType;

            if (httpResponse.isSuccess())
            {
                return ReadResponse<T>(request, httpResponse, format);
            }
            else
            {
                var content = Encoding.UTF8.GetString(httpResponse.Content);
                if (500 <= httpResponse.Status)
                {
                    throw new ServerException("", content, "");
                }
                else
                {
                    throw new ClientException("", content, "");
                }
            }
        }

        public HttpResponse DoAction<T>(RpcEduRequest<T> request) where T : eduResponse
        {
            return DoAction(request, autoRetry, maxRetryNumber, request.Profile);
        }

        public HttpResponse DoAction<T>(RpcEduRequest<T> request, bool autoRetry, int maxRetryNumber)
            where T : eduResponse
        {
            return DoAction(request, autoRetry, maxRetryNumber, request.Profile);
        }

        public HttpResponse DoAction<T>(RpcEduRequest<T> request, IClientProfile profile) where T : eduResponse
        {
            return DoAction(request, this.autoRetry, this.maxRetryNumber, profile);
        }

        public HttpResponse DoAction<T>(RpcEduRequest<T> request, Credential credential)
            where T : eduResponse
        {
            ISigner signer = null;
            FormatType format = FormatType.JSON;

            return DoAction(request, autoRetry, this.maxRetryNumber, credential, signer, format);
        }

        public HttpResponse DoAction<T>(RpcEduRequest<T> request, bool autoRetry = true,
            int maxRetryNumber = 3, IClientProfile profile = null) where T : eduResponse
        {
            if (null == profile)
            {
                throw new ClientException("SDK.InvalidProfile", "No active profile found.");
            }

            Credential credential = profile.Credential;
            ISigner signer = profile.Signer;
            FormatType? format = profile.FormatType;

            return DoAction(request, autoRetry, maxRetryNumber, credential, signer, format);
        }

        public HttpResponse DoAction<T>(RpcEduRequest<T> request, bool autoRetry, int maxRetryNumber,
            Credential credential, ISigner signer, FormatType? format) where T : eduResponse
        {
            FormatType? requestFormatType = request.AcceptFormat;
            if (null != requestFormatType)
            {
                format = requestFormatType;
            }
            HttpRequest httpRequest = request.SignRequest(signer, credential, format);
            int retryTimes = 1;
            HttpResponse response = HttpResponse.GetResponse(httpRequest, timeoutInMilliSeconds);
            while (500 <= response.Status && autoRetry && retryTimes < maxRetryNumber)
            {
                httpRequest = request.SignRequest(signer, credential, format);
                response = HttpResponse.GetResponse(httpRequest, timeoutInMilliSeconds);
                retryTimes++;
            }
            return response;
        }

        private T ReadResponse<T>(RpcEduRequest<T> request, HttpResponse httpResponse, FormatType? format)
            where T : eduResponse
        {
            IReader reader = ReaderFactory.CreateInstance(format);
            UnmarshallerContext context = new UnmarshallerContext();
            string body = System.Text.Encoding.UTF8.GetString(httpResponse.Content);
            context.ResponseDictionary = reader.Read(body, request.Url);
            context.HttpResponse = httpResponse;
            return request.GetResponse(context);
        }


        public int MaxRetryNumber { get; set; } 

        public bool AutoRetry { get; set; } 

        public int TimeoutInMilliSeconds { get; set; }
    }
}