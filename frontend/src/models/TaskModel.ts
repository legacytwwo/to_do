import { h } from 'vue';
import { ref } from 'vue'
import { api } from '@services/api';
import { Model } from '@vuex-orm/core';
import { NButton, NCheckbox, NIcon } from 'naive-ui';
import { PaginationModel } from '@models/Pagination';

export class TasksList extends Model {
  static fields () {
    return {
      category: this.attr(null),
      loading: this.boolean(true),
      response: this.hasMany(TasksModel, 'id'),
      pagination: this.attr(new PaginationModel(), (value)=>new PaginationModel({...value}))
    }
  }

  get createColumns() {
    return [
      {
        key: 'description', title: 'Описание',
        ellipsis: { tooltip: true }
      },
      {
        align: 'center',
        key: 'deadline', title: 'Сделать до',
        width: 200, ellipsis: { tooltip: true },
        render (row) { return row['deadline']?.toString().slice(4, -4) || 'Бессрочно'},
      },
      {
        align: 'center',
        key: 'finished', title: 'Завершена',
        width: 200, ellipsis: { tooltip: true },
        render (row) {
          return h(NCheckbox, {
            focusable: false,
            checked: row['finished'],
            onUpdateChecked: () => finishTask(row['id'])
          }) 
        },
      },
      {
        align: 'center',
        key: 'activity', title: 'Действия',
        width: 200, ellipsis: { tooltip: true },
        render (row) { 
          return h(NButton, {
            strong: true,
            tertiary: true,
            size: 'small',
            onClick: () => deleteTask(row['id'])
          }, { default: () => 'Удалить' })
        }
      }
    ]
  }

  async initialModel() {
    this['loading'] = true;
    const page: string = this['pagination']['page']
    let url = '/tasks?category='+this['category']+'&page='+page
    const response: any = await api.get(url);
    if (response['ok']) {
      const data = response['data'];
      this.$fill({...data}); 
      this['loading'] = false;
    }
    return response;
  } 
}

export class TasksModel extends Model {
  static fields () {
    return {
      id: this.attr(null),
      deadline: this.attr(null),
      finished: this.attr(null),
      category: this.attr(null),
      description: this.attr(null),
    }
  }

  async createTask(task) {
    let url = '/tasks';
    let body = {
      'finished': false,
      'category': task['category'],
      'deadline': task['deadline'],
      'description': task['description'],
    }
    api.post(url, body);
    window.location.reload();
  }
}

function deleteTask(id: string) {
  let url = '/tasks?id='+id;
  api.delete(url);
  window.location.reload();
}

function finishTask(id: string) {
  let url = '/tasks-flag?id='+id;
  api.put(url);
  window.location.reload();
}