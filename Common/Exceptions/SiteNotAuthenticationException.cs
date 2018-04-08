using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Exceptions
{
   public class SiteNotAuthenticationException:Exception
   {
       public string Host { get;private set; }

       public SiteNotAuthenticationException(string host, string message) : base(message)
       {
           Host = host;
       }
    }
}
