import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Todo {
  id: string
  text: string
  completed: boolean
  createdAt: Date
  priority: 'low' | 'medium' | 'high'
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')

  // Actions
  const addTodo = (text: string, priority: Todo['priority'] = 'medium') => {
    const newTodo: Todo = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
      priority
    }
    todos.value.unshift(newTodo)
  }

  const removeTodo = (id: string) => {
    const index = todos.value.findIndex(todo => todo.id === id)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  const toggleTodo = (id: string) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const updateTodo = (id: string, text: string) => {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.text = text.trim()
    }
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  const setFilter = (newFilter: typeof filter.value) => {
    filter.value = newFilter
  }

  // Getters
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  const activeTodosCount = computed(() => 
    todos.value.filter(todo => !todo.completed).length
  )

  const completedTodosCount = computed(() => 
    todos.value.filter(todo => todo.completed).length
  )

  const totalTodosCount = computed(() => todos.value.length)

  const hasCompletedTodos = computed(() => 
    todos.value.some(todo => todo.completed)
  )

  return {
    // State
    todos,
    filter,
    
    // Actions
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    setFilter,
    
    // Getters
    filteredTodos,
    activeTodosCount,
    completedTodosCount,
    totalTodosCount,
    hasCompletedTodos
  }
})