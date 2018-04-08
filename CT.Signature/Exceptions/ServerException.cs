using System;

namespace CT.Signature.Exceptions
{
    public class ServerException : ClientException
    {

        public ServerException(String errorCode, String errorMessage, string requestId)
            : this(errorCode, errorMessage)
        {
            RequestId = requestId;
        }

        public ServerException(String errorCode, string errorMessage)
            : base(errorCode, errorMessage)
        {
            ErrorType = ErrorType.Server;
        }

    }
}
