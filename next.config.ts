/** @type {import('next').NextConfig} */
function getS3ImageHostname(): string | null {
  const publicBase = process.env.S3_PUBLIC_BASE_URL?.trim();
  if (publicBase) {
    try {
      return new URL(publicBase).hostname;
    } catch {
      return null;
    }
  }
  const bucket = process.env.S3_BUCKET?.trim();
  const region = process.env.AWS_REGION?.trim();
  if (bucket && region) {
    return `${bucket}.s3.${region}.amazonaws.com`;
  }
  return null;
}

const s3Hostname = getS3ImageHostname();

const awsS3VirtualHostedPattern = {
  protocol: "https" as const,
  hostname: "*.s3.*.amazonaws.com",
  port: "",
  pathname: "/**",
};

const awsS3PathStylePattern = {
  protocol: "https" as const,
  hostname: "s3.*.amazonaws.com",
  port: "",
  pathname: "/**",
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/**",
      },
      awsS3VirtualHostedPattern,
      awsS3PathStylePattern,
      ...(s3Hostname
        ? [
            {
              protocol: "https" as const,
              hostname: s3Hostname,
              port: "",
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
