using System;

namespace Common.Exceptions
{
    public class FileUploadException : Exception
    {
        public FileUploadException(string msg) : base(msg)
        {
            
        }
    }
}