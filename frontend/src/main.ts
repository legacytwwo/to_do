import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './style.scss';

const app = createApp(App);

const hooks = import.meta.globEager('./hooks/**/*.vue')
Object.entries(hooks).forEach(([path, definition]) => {
  const name = path.split('/').pop().replace(/\.\w+$/,'');
  app.component(name, definition.default);
})

const pages = import.meta.globEager('./pages/**/*.vue')
Object.entries(pages).forEach(([path, definition]) => {
  const name = path.split('/').pop().replace(/\.\w+$/,'');
  app.component(name, definition.default);
})

const layouts = import.meta.globEager('./layouts/**/*.vue')
Object.entries(layouts).forEach(([path, definition]) => {
  const name = path.split('/').pop().replace(/\.\w+$/, '')
  app.component(name, definition.default)
})


////////////////////////////////////////////
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
const head = document.head;
head.appendChild(meta);
////////////////////////////////////////////

app.use(router).mount('#app')