/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */
const path = require('path');
const fs = require('fs');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
let voltoPath = './node_modules/@plone/volto';

let configFile;
if (fs.existsSync(`${this.projectRootPath}/tsconfig.json`))
  configFile = `${this.projectRootPath}/tsconfig.json`;
else if (fs.existsSync(`${this.projectRootPath}/jsconfig.json`))
  configFile = `${this.projectRootPath}/jsconfig.json`;

if (configFile) {
  const jsConfig = require(configFile).compilerOptions;
  const pathsConfig = jsConfig.paths;
  if (pathsConfig['@plone/volto'])
    voltoPath = `./${jsConfig.baseUrl}/${pathsConfig['@plone/volto'][0]}`;
}

const defaultVoltoRazzleConfig = require(`${voltoPath}/razzle.config`);
const { modifyWebpackConfig } = defaultVoltoRazzleConfig;

const customModifyWebpackConfig = ({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options,
}) => {
  const config = modifyWebpackConfig({
    env: { target, dev },
    webpackConfig,
    webpackObject,
    options,
  });

  // Only add Workbox to client builds
  if (target === 'web' && process.env.NODE_ENV === 'production') {
    config.plugins.push(
      new GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
        maximumFileSizeToCacheInBytes: 5000000,
        swDest: 'service-worker.js', // Output to root of build directory
        importScripts: ['./sw-scripts.js'],
        runtimeCaching: [
          {
            urlPattern: ({ request, url }) =>
              (request.destination === 'style' ||
                request.destination === 'script' ||
                request.destination === 'image') &&
              !url.pathname.includes('/maps/tiles'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'clms-static-assets',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
          {
            urlPattern: ({ url }) =>
              url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'clms-google-fonts-stylesheets',
            },
          },
          {
            urlPattern: ({ request, url }) => {
              const pagePaths = [
                '/en/products',
                '/en/news',
                '/en/events',
                '/en/dataset-catalog',
                '/en/about',
                '/en/use-cases',
              ];

              return (
                request.mode === 'navigate' &&
                pagePaths.some(
                  (path) =>
                    url.pathname === path ||
                    url.pathname.startsWith(path + '/') ||
                    url.pathname === '/en',
                )
              );
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'clms-pages-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
          {
            // Combined rule for pages and their API data
            urlPattern: ({ request, url }) => {
              if (request.method !== 'GET') {
                return false;
              }
              const pagePaths = [
                '/en/products',
                '/en/news',
                '/en/events',
                '/en/dataset-catalog',
                '/en/about',
                '/en/use-cases',
              ];
              // Define other API resources to cache.
              const apiPaths = [
                'banner',
                'cookieconsent-infos',
                'search',
                'vocabularies',
              ];

              // Define paths to explicitly exclude from caching.
              const excludedPaths = [
                'edit',
                'mapviewer',
                'map-viewer',
                'technical-library',
                '@@download',
                '@types',
              ];

              if (excludedPaths.some((path) => url.pathname.includes(path))) {
                return false;
              }

              const isApiCall = [...pagePaths, ...apiPaths].some(
                (path) =>
                  url.pathname.includes(path) ||
                  url.pathname.includes('/en?') ||
                  url.pathname === '/++api++/en',
              );

              return isApiCall;
            },
            handler: 'NetworkFirst',
            options: {
              cacheName: 'clms-api-data-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
        ],
      }),
      new WebpackPwaManifest({
        name: 'CLMS - Copernicus Land Monitoring Service',
        short_name: 'CLMS',
        filename: 'site.webmanifest',
        start_url: '../en',
        theme_color: '#a0b128',
        background_color: '#ffffff',
        inject: false,
        fingerprints: false,
        icons: [
          {
            src: path.resolve('public/android-chrome-192x192.png'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
    );
  }

  return config;
};

module.exports = {
  ...defaultVoltoRazzleConfig,
  modifyWebpackConfig: customModifyWebpackConfig,
};
