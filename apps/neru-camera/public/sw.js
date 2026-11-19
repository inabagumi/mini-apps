self.addEventListener("install", () => {
  self.skipWaiting();
});

const unregister = async () => {
  await self.registration.unregister();
  console.log("unregistered old service worker");
};

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
  event.waitUntil(unregister());
});
