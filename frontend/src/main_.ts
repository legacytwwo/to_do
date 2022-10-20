import { create } from 'naive-ui'

import { OpenOutline as OpenOutline } from '@vicons/ionicons5'

import { CloseCircleOutline } from '@vicons/ionicons5'
import { CloudOfflineOutline } from '@vicons/ionicons5'
import { SearchOutline, AlbumsOutline } from '@vicons/ionicons5'
import { CheckboxOutline, SquareOutline } from '@vicons/ionicons5'

import { NPopover, NModal, NCard, NIcon } from 'naive-ui'
import { NTabPane, NTabs, NCheckbox } from 'naive-ui'
import { NCarousel, NCarouselItem } from 'naive-ui'
import { NScrollbar, NDataTable } from 'naive-ui'
import { NLayout, NLayoutSider } from 'naive-ui'
import { NMenu, NSpace, NSpin } from 'naive-ui'
import { NButton, NInput } from 'naive-ui'
import { NConfigProvider } from 'naive-ui'
import { NGrid, NGi } from 'naive-ui'
import { NFormItem } from 'naive-ui'
import { NSwitch } from 'naive-ui'
import { NTable } from 'naive-ui'


import { NUpload, NUploadDragger } from 'naive-ui'
import { NCheckboxGroup } from 'naive-ui'
import { NTooltip } from 'naive-ui'
import { NTag } from 'naive-ui'

import { NTimePicker } from 'naive-ui'
import { NDatePicker } from 'naive-ui'
import { NAutoComplete } from 'naive-ui'
import { NSelect, NEllipsis } from 'naive-ui'
import { NH1, NH2, NH3, NH4, NH5, NH6 } from 'naive-ui'

import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import './style.scss';

const settings = {
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
}

const app = createApp(App);

const icons = []
icons.push(OpenOutline);
icons.push(CloseCircleOutline);
icons.push(CloudOfflineOutline);
icons.push(SearchOutline, AlbumsOutline);
icons.push(CheckboxOutline, SquareOutline);

icons.forEach(item => app.component(item['name'], item));


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

const naive = create({
  components: [
    NTag,
    NTooltip,
    NCheckboxGroup,
    NUpload, NUploadDragger,

    NTable,
    NSwitch,
    NFormItem,
    NTimePicker,
    NDatePicker,
    NAutoComplete,
    NSelect, NEllipsis,
    NH1, NH2, NH3, NH4, NH5, NH6,

    NGrid, NGi,
    NButton, NInput,
    NConfigProvider,
    NMenu, NSpace, NSpin,
    NLayout, NLayoutSider,
    NScrollbar, NDataTable,
    NCarousel, NCarouselItem,
    NTabPane, NTabs, NCheckbox,
    NPopover, NModal, NCard, NIcon
  ]
})

////////////////////////////////////////////
const meta = document.createElement('meta');
meta.name = 'naive-ui-style';
const head = document.head;
head.appendChild(meta);
////////////////////////////////////////////

app.use(router).use(naive).mount('#app')
