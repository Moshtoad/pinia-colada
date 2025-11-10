import { ref, type Ref } from 'vue';
import { defineQuery, defineQueryOptions, useQuery } from '@pinia/colada';
import { type TodoSearchRequest } from '.';

export const TODOS_QUERY_KEYS = {
  root: ['todos', 'define-query-options'] as const,
  search: (request: TodoSearchRequest) =>
    [...TODOS_QUERY_KEYS.root, 'search', request] as const,
};

export const todosSearchQueryOptions = defineQueryOptions(
  ({
    request,
    isEnabled,
  }: {
    request: Ref<TodoSearchRequest>;
    isEnabled: Ref<boolean>;
  }) => ({
    key: TODOS_QUERY_KEYS.search(request.value),
    query: () =>
      fetch(
        `https://dummyjson.com/todos?limit=${request.value.limit}&skip=${request.value.skip}`
      ).then((res) => res.json()),
    enabled: isEnabled.value, // This isn't a reactive ref so toggling it seems to not really do anything
    staleTime: 1000 * 60, // 30 seconds
  })
);

export const useFilteredTodos_defineQueryOptions = defineQuery(() => {
  const isEnabled = ref(false);
  const searchRequest = ref<TodoSearchRequest>({
    limit: 5,
    skip: 0,
  });

  const { state, ...rest } = useQuery(todosSearchQueryOptions, {
    request: searchRequest,
    isEnabled: isEnabled,
  });

  return {
    ...rest,
    todoList: state,
    isEnabled,
    searchRequest,
  };
});

export const useFilteredTodos_defineQueryOptions2 = defineQuery(() => {
  const isEnabled = ref(true);
  const searchRequest = ref<TodoSearchRequest>({
    limit: 5,
    skip: 0,
  });

  const { state, ...rest } = useQuery(todosSearchQueryOptions, {
    request: searchRequest,
    isEnabled: isEnabled,
  });

  return {
    ...rest,
    todoList: state,
    isEnabled,
    searchRequest,
  };
});
