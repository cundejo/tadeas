import { notification, Button } from 'antd';
import React from 'react';

export const showAlertOnNewVersion = (registration: ServiceWorkerRegistration) => {
  const serviceWorkerWaiting = registration.waiting;
  if (serviceWorkerWaiting) {
    openNotification(serviceWorkerWaiting);
  }
};

const reloadPage = (serviceWorkerWaiting: ServiceWorker) => {
  serviceWorkerWaiting.postMessage({ type: 'SKIP_WAITING' });
  serviceWorkerWaiting.addEventListener('statechange', (e) => {
    // @ts-ignore
    if (e.target.state === 'activated') {
      window.location.reload();
    }
  });
};

const openNotification = (serviceWorkerWaiting: ServiceWorker): void => {
  const btn = (
    <Button type="primary" size="small" onClick={() => reloadPage(serviceWorkerWaiting)}>
      Reload App
    </Button>
  );
  notification.open({
    key: `open${Date.now()}`,
    duration: 60,
    message: 'New version of Tadea',
    description: 'Reload the app to get all the changes.',
    btn,
  });
};
