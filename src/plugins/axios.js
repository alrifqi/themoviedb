

import Vue from 'vue';
import axios from 'axios';

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const configs = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const axiosService = axios.create(configs);

axiosService.interceptors.request.use(
  error => Promise.reject(error),

);

// Add a response interceptor
axiosService.interceptors.response.use(
  response => response,
  error => Promise.reject(error),

);

Plugin.install = (VueInit) => {
  const VueService = VueInit;
  VueService.axios = axiosService;
  window.axios = axiosService;
  Object.defineProperties(VueService.prototype, {
    axios: {
      get() {
        return axiosService;
      },
    },
    $axios: {
      get() {
        return axiosService;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
