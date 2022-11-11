if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        // registration worked
      }).catch((error) => {
      // registration failed
      console.log('[ServiceWorker] Registration failed with ' + error);
    });
}
