if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then((reg) => {
        // registration worked
      }).catch((error) => {
      // registration failed
      console.log('[ServiceWorker] Registration failed with ' + error);
    });
}

// Correct sizing for mobile vh, https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
