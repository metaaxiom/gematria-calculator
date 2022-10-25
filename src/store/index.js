import Vuex from 'vuex';
import Vue from 'vue';
import submissions from './modules/submissions';

// Load Vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
    modules: {
        submissions
    }
});