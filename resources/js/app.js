// import Vue from 'vue';
// import axios from 'axios';
// import AppGreet from './components/AppGreet.vue';
// import App from './App.vue'
// import router from './router'
//
// window.axios = axios;
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// window.Vue = Vue;
// Vue.component('app-greet', AppGreet);
// Vue.component('app', App);
// const app = new Vue({
//     el: '#app',
//     router,
// });


import Vue from 'vue'
import {createPinia, PiniaVuePlugin} from 'pinia'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/element-variables.scss'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import {extend, ValidationObserver, ValidationProvider} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import AppGreet from './components/AppGreet.vue';
/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faTrash, faUserSecret} from '@fortawesome/free-solid-svg-icons'

// install rules
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

// configure language
locale.use(lang)
/* add icons to the library */
library.add(faUserSecret, faTrash)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.use(ElementUI);
Vue.use(PiniaVuePlugin);
Vue.component('app-greet', AppGreet);

new Vue({
    router,
    pinia: createPinia(),
    render: (h) => h(App)
}).$mount('#app')
