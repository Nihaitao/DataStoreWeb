using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CT.Signature.Auth;
using CT.Signature.Http;
using CT.Signature.Utils;

namespace CT.Signature.Profile
{
    public class DefaultProfile : IClientProfile
    {
        private static DefaultProfile _profile = null;
        private static ConcurrentDictionary<string, IClientProfile> concurrentDictionary = new ConcurrentDictionary<string, IClientProfile>();

        public Credential Credential { get; private set; }
        public ISigner Signer { get; set; }

        public FormatType FormatType { get; set; }
        public string ServiceUrl { get; set; }

        private DefaultProfile(Credential creden, string serviceUrl)
        {
            Signer = new ShaHmac1();
            Credential = creden;
            this.ServiceUrl = serviceUrl;
        }
        


        public static IClientProfile GetProfile(string accessKeyId, string secret, string serviceUrl)
        {
            IClientProfile clientProfile = null;
            if (!concurrentDictionary.TryGetValue(accessKeyId + secret + serviceUrl, out clientProfile))
            {
                Credential creden = new Credential(accessKeyId, secret);
                clientProfile = new DefaultProfile(creden, serviceUrl);
                concurrentDictionary.TryAdd(accessKeyId + secret + serviceUrl, clientProfile);
            }
            return clientProfile;
        }
    }
}