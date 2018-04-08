using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Nancy;

namespace Common.Module
{
   public class BaseModule:NancyModule
   {
       public const string LoginServiceUrl = "/Station/Login";
       public const string StudentLoginServiceUrl1 = "/Student/BindStudentLoginByCardNumber";
       public const string StudentLoginServiceUrl2 = "/Student/BindStudentLoginByPhone";

       public BaseModule() : base("api")
       {
           
       }
    }
}
