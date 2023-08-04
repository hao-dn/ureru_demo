import axios from "axios";

axios.defaults.baseURL = '/api';
axios.defaults.headers.common["Accept-Language"] = JSON.parse(localStorage.getItem("locale")) || "en";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
// axios.interceptors.request.use(
//     config => {
//         // Do something before request is sent
//         // If request is different than any of the URLS in urlsExcludedForBearerHeader
//         // then send Authorization header with token from localstorage
//         const urlsExcludedForBearerHeader = ["/login", "/forgot", "/register", "/reset", `${window.location.origin}/version.json`];
//         if (urlsExcludedForBearerHeader.indexOf(config.url) === -1) {
//             config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//         }
//         config.headers["Accept-Language"] = JSON.parse(localStorage.getItem("locale")) || "en";
//
//         return config;
//     },
//     error => {
//         // Do something with request error
//         return Promise.reject(error);
//     }
// );
//
// // Add a response interceptor
// axios.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         const useProviderStore = providerStore();
//         const userStore = useUserStore();
//         const errorStatus = parseInt(_.get(error, "response.status"));
//         if (errorStatus === 401) {
//             (async () => {
//                 await userStore.setIsLogged(false);
//                 await userStore.setCurrentUser(null);
//             })();
//         }
//         if (errorStatus === 500) {
//             (async () => {
//                 await useProviderStore.showErrorAlert(_.get(error, "response.data.message"));
//             })();
//         }
//         // Do something with response error
//         return Promise.reject(error);
//     }
// );
export default axios;
