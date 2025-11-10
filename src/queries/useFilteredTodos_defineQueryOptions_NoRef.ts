import { ref, type Ref } from 'vue';
import { defineQuery, defineQueryOptions, useQuery } from '@pinia/colada';
import { type TodoSearchRequest } from '.';

export const TODOS_QUERY_KEYS_NO_REF = {
  root: ['todos', 'define-query-options-no-ref'] as const,
  search: (request: TodoSearchRequest) =>
    [...TODOS_QUERY_KEYS_NO_REF.root, 'search', request] as const,
};

export const todosSearchQueryOptionsNoRef = defineQueryOptions(
  ( request:  TodoSearchRequest) => ({
    key: TODOS_QUERY_KEYS_NO_REF.search(request),
    query: () =>
      fetch(
        `https://dummyjson.com/todos?limit=${request.limit}&skip=${request.skip}`
      ).then((res) => res.json()),
    staleTime: 1000 * 60, // 30 seconds
  })
);

export const useFilteredTodos_defineQueryOptionsNoRef = defineQuery(() => {
  const isEnabled = ref(false);
  const searchRequest = ref<TodoSearchRequest>({
    limit: 5,
    skip: 10,
  });

  debugger;
  const { state, ...rest } = useQuery(() => ({
    ...todosSearchQueryOptionsNoRef(searchRequest.value),
    enabled: isEnabled.value,
  }));

  return {
    ...rest,
    todoList: state,
    isEnabled,
    searchRequest,
  };
});
