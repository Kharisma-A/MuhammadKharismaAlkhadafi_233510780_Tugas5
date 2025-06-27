<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import TodoItem from './TodoItem.vue'

const todoStore = useTodoStore()
</script>

<template>
  <div class="todo-list">
    <div v-if="todoStore.filteredTodos.length === 0" class="empty-state">
      <div class="empty-icon">🌌</div>
      <h3 class="empty-title">
        {{ todoStore.filter === 'completed' ? 'No completed tasks yet' :
           todoStore.filter === 'active' ? 'No active tasks' :
           'Your cosmic workspace is empty' }}
      </h3>
      <p class="empty-description">
        {{ todoStore.filter === 'completed' ? 'Complete some tasks to see them here!' :
           todoStore.filter === 'active' ? 'All tasks are completed! 🎉' :
           'Add your first task to begin your cosmic journey!' }}
      </p>
    </div>
    
    <div v-else class="todo-items">
      <TransitionGroup
        name="todo"
        tag="div"
        class="todo-items-container"
      >
        <TodoItem
          v-for="todo in todoStore.filteredTodos"
          :key="todo.id"
          :todo="todo"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.todo-list {
  margin-bottom: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(226, 232, 240, 0.7);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  animation: float 3s ease-in-out infinite;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #e2e8f0;
}

.empty-description {
  font-size: 1rem;
  opacity: 0.8;
  margin: 0;
}

.todo-items-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Transition animations */
.todo-enter-active,
.todo-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.todo-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}

.todo-leave-to {
  opacity: 0;
  transform: translateX(100px) scale(0.95);
}

.todo-move {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>