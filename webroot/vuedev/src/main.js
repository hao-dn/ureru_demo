import Vue from 'vue'
import {createPinia, PiniaVuePlugin} from 'pinia'

import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/element-variables.scss'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

// install rules
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});

/* import the fontawesome core */
import {library} from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {faTrash, faUserSecret} from '@fortawesome/free-solid-svg-icons'
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
new Vue({
    router,
    pinia: createPinia(),
    render: (h) => h(App)
}).$mount('#app')
