<script setup lang="ts">
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

const filters = [
  { key: 'all', label: 'All Tasks', icon: '🌌' },
  { key: 'active', label: 'Active', icon: '⚡' },
  { key: 'completed', label: 'Completed', icon: '✨' }
] as const
</script>

<template>
  <div class="todo-filters">
    <div class="filter-buttons">
      <button
        v-for="filter in filters"
        :key="filter.key"
        @click="todoStore.setFilter(filter.key)"
        :class="['filter-button', { active: todoStore.filter === filter.key }]"
      >
        <span class="filter-icon">{{ filter.icon }}</span>
        <span class="filter-label">{{ filter.label }}</span>
      </button>
    </div>
    
    <button
      v-if="todoStore.hasCompletedTodos"
      @click="todoStore.clearCompleted"
      class="clear-button"
    >
      <span class="clear-icon">🗑️</span>
      Clear Completed
    </button>
  </div>
</template>

<style scoped>
.todo-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  gap: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.6);
  padding: 0.25rem;
  border-radius: 12px;
  border: 1px solid rgba(100, 181, 246, 0.2);
}

.filter-button {
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 8px;
  color: rgba(226, 232, 240, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.filter-button:hover {
  background: rgba(100, 181, 246, 0.1);
  color: #e2e8f0;
  transform: translateY(-1px);
}

.filter-button.active {
  background: linear-gradient(135deg, #1e40af, #3b82f6);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.filter-icon {
  font-size: 1.1em;
}

.clear-button {
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  color: #ef4444;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
}

.clear-button:hover {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
  transform: translateY(-1px);
}

.clear-icon {
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .todo-filters {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .filter-button {
    flex: 1;
    justify-content: center;
  }
  
  .filter-label {
    display: none;
  }
}
</style>