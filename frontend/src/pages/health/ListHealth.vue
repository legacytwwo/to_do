<template>
  <MainLayout>
    <div class="list-products">
      <div class="toolbar">
        <n-data-table
          remote
          table-layout="fixed"
          :row-props="rowProps"
          :data="model['response']"
          :loading="model['loading']"
          :columns="model.createColumns"
          :on-update:page="onUpdatePage"
          :pagination="model['pagination']"
          :size="'small'" class="table-products"
        />
      </div>
    </div>
    <div class="create-btn">
      <n-button strong size="large" @click="showModal = true">
        {{'Добавить'}}
      </n-button>
    </div>
    <n-modal v-model:show="showModal">
      <n-card 
        style="width: 600px"
        title="Создать задачу"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true">
          <n-form ref="formRef" :model="task">
            <n-form-item path="description" label="Описание">
              <n-input @keydown.enter.prevent v-model:value="task['description']" />
            </n-form-item>
            <n-form-item label="Сделать до" path="deadline">
              <n-date-picker 
                :span="12" 
                type="datetime"
                placement="right"
                default-time="00:00:00"
                v-model:value="task['deadline']" 
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </n-form-item>
            <n-form-item path="category" label="Категория">
              <n-input
                :disabled="!false"
                @keydown.enter.prevent
                placeholder="Здоровье"
              />
            </n-form-item>
            <div class="flex justify-end">
              <n-button strong size="medium" @click="createTasks(task)">
                {{'Создать'}}
              </n-button>
            </div>
          </n-form>
      </n-card>
    </n-modal>
  </MainLayout>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { onMounted } from 'vue'
  import { TasksList, TasksModel} from '@models/TaskModel'

  const showModal = ref(false)
  const model = ref(new TasksList());
  const task = ref(new TasksModel({category: 'health'}))

  onMounted(async () => {
    model.value['category'] = 'health';
    await model.value.initialModel();
  })

  const rowProps = (row) => ({
    style: 'cursor: pointer',
  })

  const onUpdatePage = async (page) => {
    model.value['pagination']['page'] = page;
    model.value['category'] = 'health';
    await model.value.initialModel();
  }

  const createTasks = (task) => {
    task.createTask(task)
  }

</script>

<style lang="scss" scoped>
  @import "./ListHealth.scss";
</style>