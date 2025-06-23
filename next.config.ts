import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';


// Cabeçalhos de segurança CSP
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self';
  font-src 'self';
  connect-src 'self';
  object-src 'none';
  base-uri 'none';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`.replace(/\n/g, '').trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ];
  }
};
 
const withNextIntl = createNextIntlPlugin();




export default withNextIntl(nextConfig);
