using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CT.Signature
{
    public class JsonResponse<TResponse> : eduResponse
    {
        public TResponse Data { get; set; }

        public string Content
        {
            get { return Encoding.GetEncoding(base.HttpResponse.Encoding).GetString(base.HttpResponse.Content); }
        }
    }
}