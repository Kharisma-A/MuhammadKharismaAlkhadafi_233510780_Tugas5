<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import TodoInput from './TodoInput.vue'
import TodoList from './TodoList.vue'
import TodoStats from './TodoStats.vue'
import TodoFilters from './TodoFilters.vue'

</script>

<template>
  <div class="todo-app">
    <div class="todo-container">
      <TodoInput />
      <TodoFilters />
      <TodoList />
      <TodoStats />
    </div>
  </div>
</template>

<style scoped>
.todo-app {
  width: 100%;
}

.todo-container {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 1px solid rgba(100, 181, 246, 0.2);
  padding: 2rem;
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(100, 181, 246, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.todo-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(100, 181, 246, 0.5), transparent);
}

.todo-container::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(100, 181, 246, 0.05) 0%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.1;
    transform: scale(1.1);
  }
}

@media (max-width: 768px) {
  .todo-container {
    padding: 1.5rem;
    border-radius: 15px;
    margin: 0 0.5rem;
  }
}
</style>