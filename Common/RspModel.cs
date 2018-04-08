using System;

namespace Common
{
    public class RspModel
    {
        public string RequestId { get; set; }
        public String Message { get; set; }
        public ReturnData ReturnData { get; set; }

        public bool SuccessResponse { set; get; }

        public dynamic ModelValidation { set; get; }

        public void SetMessage(string Message, object Data = null, bool flg = false)
        {
            this.Message = Message;
            ReturnData.Data = Data;
            SuccessResponse = flg;
        }

        public static RspModel Error(string message)
        {
            return new RspModel()
            {
                SuccessResponse = false,
                Message = message
            };
        }
        public static RspModel Success(string message)
        {
            return new RspModel()
            {
                SuccessResponse = true,
                Message = message
            };
        }
    }

    public class ReturnData
    {
        public dynamic Data { set; get; }
        public int TotalCount { set; get; }
    }
}