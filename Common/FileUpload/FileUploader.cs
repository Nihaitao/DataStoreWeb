using System;
using System.Drawing;
using System.IO;
using System.Net;
using Aliyun.OSS;
using Aliyun.OSS.Util;
using Common.Exceptions;

namespace Common.FileUpload
{
    public class FileUploader
    {
        private const string _endPoint = "oss-cn-hangzhou.aliyuncs.com";
        private const string _accessKeyId = "PnXQjuLDBFl7a20G";
        private const string _accessKeySecret = "C2rjvsUSJ2rtaQfIE1zk86pa9DHZUI";
        private const string _bucketName = "ctfive";
        private const string _host = "http://ctfive.oss-cn-hangzhou.aliyuncs.com/";
        private readonly OssClient _ossClient;

        public int MaxFileSize { get; set; }

        public FileUploader()
        {
            _ossClient = new OssClient(_endPoint, _accessKeyId, _accessKeySecret);
        }

        private void CheckFile(Stream stream)
        {
            try
            {
                if (MaxFileSize != 0 && stream.Length > MaxFileSize)
                {
                    throw new FileUploadException("上传的文件太大了");
                }
            }
            catch (FileUploadException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new FileUploadException(ex.Message);
            }
        }

        private static object objLock = new object();
        private static int _serial = 0;

        private static string Serial
        {
            get
            {
                lock (objLock)
                {
                    _serial++;
                    return Guid.NewGuid().ToString("N") + _serial.ToString().PadLeft(4, '0');
                }
            }
        }

        public string Upload(EnumBusType enumBusType, Stream stream, string fileName)
        {
            CheckFile(stream);
            if (!Path.HasExtension(fileName))
            {
                throw new FileUploadException("无效的文件名");
            }
            stream.Position = 0;
            var extension = Path.GetExtension(fileName);
            var time = DateTime.Now;
            var key = string.Concat(enumBusType.ToString(), "/", time.Year, "/", time.Month.ToString().PadLeft(2, '0'),
                "/", time.Day.ToString().PadLeft(2, '0'), "/", Serial,
                extension);
 
            var objectResult = _ossClient.PutObject(_bucketName, key, stream);
            if (objectResult.HttpStatusCode != HttpStatusCode.OK)
            {
                throw new FileUploadException("文件上传失败");
            }
            return _host + key;
        }
    }
}