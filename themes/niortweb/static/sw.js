importScripts('/js/workbox-sw.js');


const OFFLINE_PAGE = '/offline.html';

workbox.precaching.precacheAndRoute([
  OFFLINE_PAGE
]);

workbox.routing.setDefaultHandler(
  new workbox.strategies.NetworkFirst()
);

workbox.routing.setCatchHandler(({url, event, params}) => {
  return caches.match(OFFLINE_PAGE);
});
