<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')
const priority = ref<'low' | 'medium' | 'high'>('medium')

const addTodo = () => {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value, priority.value)
    newTodo.value = ''
    priority.value = 'medium'
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addTodo()
  }
}
</script>

<template>
  <div class="todo-input-section">
    <div class="input-group">
      <div class="input-wrapper">
        <input
          v-model="newTodo"
          @keypress="handleKeyPress"
          type="text"
          placeholder="Add a new cosmic task..."
          class="todo-input"
          maxlength="200"
        />
        <div class="input-glow"></div>
      </div>
      
      <select v-model="priority" class="priority-select">
        <option value="low">🌟 Low</option>
        <option value="medium">⭐ Medium</option>
        <option value="high">🌠 High</option>
      </select>
      
      <button 
        @click="addTodo" 
        :disabled="!newTodo.trim()"
        class="add-button"
      >
        <span class="button-icon">🚀</span>
        Launch
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-input-section {
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  gap: 1rem;
  align-items: stretch;
}

.input-wrapper {
  flex: 1;
  position: relative;
}

.todo-input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(30, 41, 59, 0.8);
  border: 2px solid rgba(100, 181, 246, 0.3);
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.todo-input:focus {
  outline: none;
  border-color: #64b5f6;
  box-shadow: 
    0 0 20px rgba(100, 181, 246, 0.3),
    0 0 40px rgba(100, 181, 246, 0.1);
  transform: translateY(-2px);
}

.todo-input::placeholder {
  color: rgba(226, 232, 240, 0.5);
}

.input-glow {
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(45deg, #64b5f6, #26c6da, #4dd0e1, #64b5f6);
  border-radius: 14px;
  opacity: 0;
  z-index: -1;
  animation: borderGlow 3s linear infinite;
  transition: opacity 0.3s ease;
}

.todo-input:focus + .input-glow {
  opacity: 0.6;
}

.priority-select {
  padding: 1rem;
  background: rgba(30, 41, 59, 0.8);
  border: 2px solid rgba(100, 181, 246, 0.3);
  border-radius: 12px;
  color: #e2e8f0;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 120px;
}

.priority-select:focus {
  outline: none;
  border-color: #64b5f6;
  box-shadow: 0 0 20px rgba(100, 181, 246, 0.3);
}

.add-button {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa);
  border: none;
  border-radius: 12px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
  position: relative;
  overflow: hidden;
}

.add-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.add-button:active {
  transform: translateY(0);
}

.add-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.button-icon {
  font-size: 1.1em;
  animation: rocket 2s ease-in-out infinite;
}

@keyframes borderGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes rocket {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-2px); }
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .priority-select {
    order: -1;
  }
}
</style>