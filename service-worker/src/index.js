import sayHello from './hello';
import './experience';
import './styles/index.scss';
import './styles/test.scss';
import laughing from './assets/laughing.svg';
import axios from 'axios';
console.log(sayHello('lucas123123'));

const APP = {
  SW: null,
  init() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js') // 前面的 service-worker 是 folder name
        .then((registration) => {
          APP.SW =
            registration.installing ||
            registration.waiting ||
            registration.active;

          // Send a message to the service worker
          if (APP.SW) {
            APP.SW.postMessage({
              type: 'INIT',
              payload: 'Hello from the main script!',
            });
          }
          console.log('service worker registered');
        });
    } else {
      console.log('Service workers are not supported');
    }

    // 2. See if the page currently has a service worker
    if (navigator.serviceWorker.controller) {
      console.log('we have a service worker installed');
    }

    // 3. Register a handler to detect when a new or updated service worker is installed & active.

    navigator.serviceWorker.oncontrollerchange = (event) => {
      console.log('New service worker activated');
    };
  },
};

const axiosInstance = axios.create();

document.addEventListener('DOMContentLoaded', APP.init);
