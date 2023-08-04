/** @type {import('next').NextConfig} */
// Fix Nextjs Auth0 Discovery Timeout Error: https://community.auth0.com/t/nextjs-auth0-discovery-timeout-error/96667
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["s.gravatar.com"],
  },
  i18n: {
    locales: ["en", "es", "it"],
    defaultLocale: "en",
  },
};
