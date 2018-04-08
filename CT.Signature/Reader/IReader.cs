using System.Collections.Generic;

namespace CT.Signature.Reader
{
    public interface IReader
    {
        Dictionary<string, string> Read(string response, string endpoint);

        Dictionary<string, string> ReadForHideArrayItem(string response, string endpoint);
    }
}
