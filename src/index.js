import Vue from 'vue'
import App from './app.vue'

import './assets/styles/gloabel.styl';
import './assets/images/checked.svg';
import './assets/images/unChecked.svg';

const root=document.createElement('div')
document.body.appendChild(root)

new Vue({
    render:(h)=>h(App)
}).$mount(root);