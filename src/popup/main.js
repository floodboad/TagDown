import Dexie from 'dexie';
import { createApp } from 'vue';
import App from './App.vue';
import '@/styles/tailwind.css';

const app = createApp(App);

const db = new Dexie('tagdown');
// db.version(1).stores({
//增加 tabsession 后增加版本
db.version(2).stores({
  bookmark: 'id, *tags, *groups',
  share: 'id, share',
  star: 'id, star',
  tabsession: 'id, *tabs',
});
db.open().then((database) => {
  app.provide('db', database);
  app.mount('#app');
}).catch((err) => {
  // Error occurred
  console.log(err);
});
