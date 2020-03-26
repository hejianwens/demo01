import Vue from 'vue'

const files = require.context('../components', true, /index.js$/);
let components = [];
files.keys().forEach((key) => {
    components = components.concat(files(key).default);
});

let install = (Vue) => {
    components.map(component => {
        let componentName = component.name
        Vue.component(componentName, component);
    })
}

install(Vue);