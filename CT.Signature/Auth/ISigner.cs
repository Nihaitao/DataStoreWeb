
using System;

namespace CT.Signature.Auth
{
    public abstract class ISigner
    {
        public abstract string SignerName { get; }
        public abstract string SignerVersion { get; }
        public abstract String SignString(String source, String accessSecret);
    }
}
