/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
        locales: ['pt-BR'],
        defaultLocale: 'pt-BR',
    },
    images: {
        domains: ["avatars.githubusercontent.com"]
    }
};

export default nextConfig;
