if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        // registration worked
        console.log('[ServiceWorker] Registration succeeded. Scope is ' + reg.scope);
      }).catch((error) => {
      // registration failed
      console.log('[ServiceWorker] Registration failed with ' + error);
    });
}
