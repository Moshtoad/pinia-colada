<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import {
  useFilteredTodos_defineQueryOptions,
  useFilteredTodos_defineQueryOptions2,
  
} from '../queries/useFilteredTodos_defineQueryOptions';
import { useFilteredTodos_NO_defineQueryOptions } from '../queries/useFilteredTodos_NO_defineQueryOptions';
import { useFilteredTodos_defineQueryOptionsNoRef } from '../queries/useFilteredTodos_defineQueryOptions_NoRef';

async function getUser() {
  await fetch('https://dummyjson.com/users/1')
    .then((res) => res.json())
    .then(console.log);
}

//const { isEnabled, searchRequest, todoList, refresh } = useFilteredTodos();

const filteredTodos_defineQueryOptions = useFilteredTodos_defineQueryOptions();
const filteredTodos_NO_defineQueryOptions =
  useFilteredTodos_NO_defineQueryOptions();
const filteredTodos_defineQueryOptions2 =
  useFilteredTodos_defineQueryOptions2();
const filteredTodos_defineQueryOptionsNoRef = useFilteredTodos_defineQueryOptionsNoRef();
const { searchRequest: searchRequestNoRef, isEnabled: isEnabledNoRef, todoList: todoListNoRef } = useFilteredTodos_defineQueryOptionsNoRef();

onMounted(async () => {
  await getUser();
  filteredTodos_defineQueryOptions.isEnabled.value = true;
  // filteredTodos_defineQueryOptions never loads unless I explicitly call refresh
  //await filteredTodos_defineQueryOptions.refresh();
  // however, now it's not reactive if the searchRequest (key dependency) changes
  // I've tried passing in the request as a ref
  //await nextTick();
  filteredTodos_defineQueryOptions.searchRequest.value.skip = 2;

  // In contrast, without using defineQueryOptions, it works more like we expect
  filteredTodos_NO_defineQueryOptions.isEnabled.value = true;
  // Notice in the network traffic a request is sent as soon as it's enambled
  //await nextTick();
  // Also see another request when the searchRequest (key dependency) changes
  filteredTodos_NO_defineQueryOptions.searchRequest.value.skip = 3;
  //debugger;

  // this will enable it for all usages of useFilteredTodos_defineQueryOptionsNoRef
  filteredTodos_defineQueryOptionsNoRef.isEnabled.value = true;
  // dont' need to enable it again since the line above already did
  //isEnabledNoRef.value = true;
});
</script>

<template>
  <h2>DF1</h2>
  <h3>defineQueryOptions</h3>
  <input
    v-if="filteredTodos_defineQueryOptions.searchRequest"
    v-model.number="filteredTodos_defineQueryOptions.searchRequest.value.skip"
    type="number"
  />
  <pre style="height: 200px; overflow: auto">{{
    filteredTodos_defineQueryOptions.todoList
  }}</pre>
  <h3>NO defineQueryOptions</h3>
  <input
    v-model="filteredTodos_NO_defineQueryOptions.searchRequest.value.skip"
    type="number"
  />
  <pre style="height: 200px; overflow: auto">{{
    filteredTodos_NO_defineQueryOptions.todoList
  }}</pre>

  <h3>defineQueryOptions2</h3>
  <input
    v-if="filteredTodos_defineQueryOptions2.searchRequest"
    v-model.number="filteredTodos_defineQueryOptions2.searchRequest.value.skip"
    type="number"
  />
  <pre style="height: 200px; overflow: auto">{{
    filteredTodos_defineQueryOptions2.todoList
  }}</pre>

  <h3>defineQueryOptionsNoRef</h3>
  <div v-if="filteredTodos_defineQueryOptionsNoRef.todoList.value.status === 'pending'">
    Loading...
  </div>
  <input
    v-if="filteredTodos_defineQueryOptionsNoRef.searchRequest"
    v-model.number="filteredTodos_defineQueryOptionsNoRef.searchRequest.value.skip"
    type="number"
  />
  <pre style="height: 200px; overflow: auto">{{
    filteredTodos_defineQueryOptionsNoRef.todoList.value.data
  }}</pre>
  <h3>defineQueryOptionsNoRefDestructured</h3>
  <div v-if="todoListNoRef.status === 'pending'">
    Loading...
  </div>
  <input
    v-if="searchRequestNoRef"
    v-model.number="searchRequestNoRef.skip"
    type="number"
  />
  <pre style="height: 200px; overflow: auto">{{
    todoListNoRef.data
  }}</pre>
</template>
