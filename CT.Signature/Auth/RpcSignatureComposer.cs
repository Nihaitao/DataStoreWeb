/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Media;
using System.Text;
using CT.Signature.Http;
using CT.Signature.Utils;

namespace CT.Signature.Auth
{
    public class RpcSignatureComposer : ISignatureComposer
    {
        private static ISignatureComposer composer = null;
        private const String SEPARATOR = "&";

        public Dictionary<String, String> RefreshSignParameters(Dictionary<String, String> parameters,
            ISigner signer, String accessKeyId, FormatType? format)
        {
            Dictionary<String, String> immutableMap = new Dictionary<String, String>(parameters);

            DictionaryUtil.Add(immutableMap, "Timestamp", ParameterHelper.FormatIso8601Date(DateTime.Now));
            DictionaryUtil.Add(immutableMap, "SignatureMethod", signer.SignerName);
            DictionaryUtil.Add(immutableMap, "SignatureVersion", signer.SignerVersion);
            DictionaryUtil.Add(immutableMap, "SignatureNonce", Guid.NewGuid().ToString());
            DictionaryUtil.Add(immutableMap, "AccessKeyId", accessKeyId);
            DictionaryUtil.Add(immutableMap, "Format", format.ToString());

            return immutableMap;
        }


        public string ComposeStringToSign(HttpRequest httpRequest, MethodType? method, string Url, ISigner signer,
            Dictionary<string, string> queries, Dictionary<string, string> headers, Dictionary<string, string> paths)
        {

            var uri=new Uri(Url);
            var builder = new StringBuilder();
            builder.Append(method).Append("|");
            builder.Append(ToUpper(uri.AbsolutePath)).Append("|");
            builder.Append(FormatDictionary(queries)).Append("|"); ;
            if(httpRequest.Content!=null)
            builder.Append(Encoding.UTF8.GetString(httpRequest.Content)).Append("|");
            builder.Append(httpRequest.Timestamp.ToString("yyyy-MM-dd HH:mm:ss")).Append("|");
            Debug.WriteLine(builder.ToString());
            return builder.ToString();
        }

        private string ToUpper(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return null;
            }
            return input.ToUpper();
        }

        public static ISignatureComposer GetComposer()
        {
            if (null == composer)
                composer = new RpcSignatureComposer();
            return composer;
        }

        private static IDictionary<string, string> SortDictionary(Dictionary<string, string> dic)
        {
            IDictionary<string, string> sortedDictionary =
                new SortedDictionary<string, string>(dic, StringComparer.Ordinal);
            return sortedDictionary;
        }

        private static string FormatDictionary(Dictionary<string, string> dictionary)
        {
            var sortedDictionary = SortDictionary(dictionary);
            return string.Join("&",
                sortedDictionary.Select(
                    x => string.Format("{0}={1}",URLEncoder.PercentEncode(x.Key),URLEncoder.PercentEncode(x.Value))));
        }
    }
}