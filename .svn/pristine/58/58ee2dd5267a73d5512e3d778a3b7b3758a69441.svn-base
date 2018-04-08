using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Common.Attributes;
using Common.Handlers;

namespace Common.Excel
{
    public class ExcelMethodCache
    {
        static Dictionary<string, MethodInfo> dictionaryMethod = new Dictionary<string, MethodInfo>();

        public static void Initialization(Type type)
        {
            var methodList = type.GetMethods(BindingFlags.Public | BindingFlags.Instance)
                .Where(x => x.GetCustomAttribute<ExcelHandleAttribute>() != null)
                .Where(x => x.ReturnType ==
                            typeof(List<Dictionary<string, object>>))
                .Where(x => x.GetParameters().Length == 1 &&
                            x.GetParameters()[0].ParameterType == typeof(HttpPostedFile));
            foreach (var method in methodList)
            {
                var attribute = method.GetCustomAttribute<ExcelHandleAttribute>();
                dictionaryMethod.Add("/"+attribute.Path.ToLower(), method);
            }
        }

        public static List<Dictionary<string, object>> Execute(ExcelHttpHandler excelHttpHandler, string requestUrl,
            HttpPostedFile file)
        {
            MethodInfo method=null;
            if (dictionaryMethod.TryGetValue(requestUrl.ToLower(), out method))
            {
                var value = method.Invoke(excelHttpHandler, new[] {file});
                return value as List<Dictionary<string, object>>;
            }
            return null;
        }
    }
}