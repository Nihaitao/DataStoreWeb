using System;

namespace CT.Signature.Exceptions
{
    public class ClientException : Exception
    {
        public String ErrorCode { get; set; }

        public String ErrorMessage { get; set; }

        public string RequestId { get; set; }

        public ErrorType ErrorType { get; set; }

        public ClientException(String errCode, String errMsg, string requestId)
            : this(errCode, errMsg)
        {

        }

        public ClientException(String errCode, String errMsg)
            : base(errCode + " : " + errMsg)
        {
            ErrorCode = errCode;
            ErrorMessage = errMsg;
            ErrorType = ErrorType.Client;
        }

        public ClientException(String message)
            : base(message)
        {

        }
    }
}
