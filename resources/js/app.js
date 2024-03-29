/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require("./bootstrap");
import Vue from "vue";
window.Vue = Vue;

import { BootstrapVue } from "bootstrap-vue";
import vClickOutside from "v-click-outside";
import VueMask from "v-mask";
import Vuelidate from "vuelidate";
import VueApexCharts from "vue-apexcharts";
import * as VueGoogleMaps from "vue2-google-maps";
import VueSweetalert2 from "vue-sweetalert2";

Vue.prototype.$isDev = process.env.MIX_APP_ENV !== "production";
Vue.config.devtools = Vue.prototype.$isDev;
Vue.config.debug = Vue.prototype.$isDev;
Vue.config.silent = !Vue.prototype.$isDev;

Vue.use(BootstrapVue);
Vue.use(vClickOutside);
Vue.use(VueMask);
Vue.use(Vuelidate);
Vue.use(require("vue-chartist"));
Vue.use(VueSweetalert2);
Vue.use(VueGoogleMaps, {
    load: {
        key: "AIzaSyAbvyBxmMbFhrzP9Z8moyYr6dCr-pzjhBE",
        libraries: "places",
    },
    installComponents: true,
});
Vue.component("apexchart", VueApexCharts);
Vue.component(
    "dynamic-component",
    require("./components/dynamic-component").default
);
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

import "./views";
const app = new Vue({
    el: "#app",
    data() {
        return {
            layoutType: "vertical"
        };
    },
    created() {
        const layout = localStorage.getItem("layout-type");
        if (layout) {
            this.layoutType = layout;
        }
    },
    methods: {
        changeMode(mode) {
            let cssUrl = document.getElementById("layout-css").href;
            cssUrl = cssUrl.split("/");
            cssUrl.pop();
            document.cookie="layout="+(mode || "default");
            switch (mode) {
                case "dark":
                    cssUrl.push("app-dark.css");
                    break;
                case "rtl":
                    cssUrl.push("app-rtl.css");
                    break;
                default:
                    cssUrl.push("app.css");
                    break;
            }
            document.getElementById("layout-css").href = cssUrl.join("/");
        },
        changeLayout(layout) {
            this.layoutType = layout;
            localStorage.setItem("layout-type",  layout);
        }
    },
});
