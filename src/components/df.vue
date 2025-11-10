<script setup lang="ts">
import {
  useQueryCache,
  UseQueryEntry,
  useQueryState,
  defineQueryOptions,
} from '@pinia/colada';
import df1 from './df1.vue';
import df2 from './df2.vue';
import {
  todosSearchQueryOptions,
  TODOS_QUERY_KEYS,
} from '../queries/useFilteredTodos_defineQueryOptions';

const queryCache = useQueryCache();
const docList = queryCache.get(
  TODOS_QUERY_KEYS.search({
    limit: 5,
    skip: 0,
  })
);
const qs = useQueryState(
  TODOS_QUERY_KEYS.search({
    limit: 5,
    skip: 0,
  })
);

debugger;
</script>

<template>
  <df1 />
  <df2 />
  <h1>idk</h1>
  <pre>{{ docList }}</pre>
  <pre> {{ qs }}</pre>
</template>
