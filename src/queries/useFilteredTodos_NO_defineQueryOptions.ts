import { ref } from 'vue';
import { defineQuery, useQuery } from '@pinia/colada';
import { type TodoSearchRequest } from '.';

const TODOS_QUERY_KEYS = {
  root: ['todos', 'no-define-query-options'] as const,
  search: (request: TodoSearchRequest) =>
    [...TODOS_QUERY_KEYS.root, 'search', request] as const,
};

export const useFilteredTodos_NO_defineQueryOptions = defineQuery(() => {
  const isEnabled = ref(false);
  const searchRequest = ref<TodoSearchRequest>({
    limit: 5,
    skip: 0,
  });

  const { state, ...rest } = useQuery({
    key: TODOS_QUERY_KEYS.search(searchRequest.value),
    query: () =>
      fetch(
        `https://dummyjson.com/todos?limit=${searchRequest.value.limit}&skip=${searchRequest.value.skip}`
      ).then((res) => res.json()),
    enabled: isEnabled, // This is a reactive ref or getter
    staleTime: 1000 * 60, // 30 seconds
  });

  return {
    ...rest,
    todoList: state,
    isEnabled,
    searchRequest,
  };
});
