<script setup lang="ts">
import { computed } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()

const completionPercentage = computed(() => {
  if (todoStore.totalTodosCount === 0) return 0
  return Math.round((todoStore.completedTodosCount / todoStore.totalTodosCount) * 100)
})

const progressStyle = computed(() => ({
  width: `${completionPercentage.value}%`
}))
</script>

<template>
  <div v-if="todoStore.totalTodosCount > 0" class="todo-stats">
    <div class="stats-header">
      <h3 class="stats-title">Mission Progress</h3>
      <div class="completion-badge">
        {{ completionPercentage }}% Complete
      </div>
    </div>
    
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="progressStyle"
      ></div>
      <div class="progress-glow" :style="progressStyle"></div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-icon">📋</div>
        <div class="stat-content">
          <div class="stat-number">{{ todoStore.totalTodosCount }}</div>
          <div class="stat-label">Total Tasks</div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon">⚡</div>
        <div class="stat-content">
          <div class="stat-number">{{ todoStore.activeTodosCount }}</div>
          <div class="stat-label">Active</div>
        </div>
      </div>
      
      <div class="stat-item">
        <div class="stat-icon">✨</div>
        <div class="stat-content">
          <div class="stat-number">{{ todoStore.completedTodosCount }}</div>
          <div class="stat-label">Completed</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-stats {
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(100, 181, 246, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.stats-title {
  color: #e2e8f0;
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
}

.completion-badge {
  background: linear-gradient(135deg, #10b981, #34d399);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.progress-bar {
  background: rgba(30, 41, 59, 0.8);
  border-radius: 8px;
  height: 8px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.progress-fill {
  background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
  height: 100%;
  border-radius: 8px;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-glow {
  position: absolute;
  top: -2px;
  bottom: -2px;
  background: linear-gradient(90deg, #10b981, #34d399, #6ee7b7);
  border-radius: 8px;
  filter: blur(4px);
  opacity: 0.6;
  transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(30, 41, 59, 0.4);
  border-radius: 8px;
  border: 1px solid rgba(100, 181, 246, 0.1);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(100, 181, 246, 0.3);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 1.5rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(100, 181, 246, 0.1);
  border-radius: 8px;
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #64b5f6;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(226, 232, 240, 0.7);
  margin-top: 0.25rem;
}

@media (max-width: 768px) {
  .stats-header {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .stat-item {
    padding: 0.75rem;
  }
}
</style>