import ListWork from '@src/pages/work/ListWork.vue';
import ListStudy from '@src/pages/study/ListStudy.vue';
import ListOther from '@src/pages/other/ListOther.vue';
import ListHealth from '@src/pages/health/ListHealth.vue';
import ListUniversity from '@src/pages/university/ListUniversity.vue';

import { h } from 'vue'
import { RouterLink } from 'vue-router'
import { createWebHistory, createRouter } from 'vue-router';

import { Earth as OtherIcon } from '@vicons/ionicons5'
import { School as SchoolIcon } from '@vicons/ionicons5'
import { CashOutline as WorkIcon } from '@vicons/ionicons5'
import { BookOutline as StudyIcon } from '@vicons/ionicons5'
import { HeartOutline as HealthIcon } from '@vicons/ionicons5'
  

export const routes = [
  {
    path: '/', 
    props: true,
    component: ListWork,
    label: 'Работа', icon: WorkIcon,
  },
  {
    path: '/study', 
    props: true,
    component: ListStudy,
    label: 'Обучение', icon: StudyIcon,
  },
  {
    path: '/health', 
    props: true,
    component: ListHealth,
    label: 'Здоровье', icon: HealthIcon,
  },
  {
    path: '/other', 
    props: true,
    component: ListOther,
    label: 'Остальное', icon: OtherIcon,
  },
  {
    path: '/university', 
    props: true,
    component: ListUniversity,
    label: 'Университет', icon: SchoolIcon,
  }
];

const router = createRouter({
  history: createWebHistory(), routes
});

import { NIcon } from 'naive-ui'

const renderIcon = (icon) => {
  return () => h(NIcon, null, { default: () => h(icon) })
}

export const getMenu = () => {
  const result = []
  routes.forEach(item => {
    if(!item['hide']){
      result.push({
        key: item['path'],
        label: () => h(
          RouterLink,
          { 
            tabIndex: '-1',
            to: item['path'], 
          },
          { default: () => item['label'] }
        ),
        icon: renderIcon(item['icon']),
      })
    }
  });

  return result;
}

export default router;