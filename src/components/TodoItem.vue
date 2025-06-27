<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoStore, type Todo } from '../stores/todo'

const props = defineProps<{
  todo: Todo
}>()

const todoStore = useTodoStore()
const isEditing = ref(false)
const editText = ref(props.todo.text)

const priorityConfig = {
  low: { color: '#10b981', icon: '🌟', label: 'Low' },
  medium: { color: '#f59e0b', icon: '⭐', label: 'Medium' },
  high: { color: '#ef4444', icon: '🌠', label: 'High' }
}

const priorityStyle = computed(() => ({
  color: priorityConfig[props.todo.priority].color,
  borderColor: priorityConfig[props.todo.priority].color + '40'
}))

const toggleComplete = () => {
  todoStore.toggleTodo(props.todo.id)
}

const startEdit = () => {
  isEditing.value = true
  editText.value = props.todo.text
}

const saveEdit = () => {
  if (editText.value.trim()) {
    todoStore.updateTodo(props.todo.id, editText.value)
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editText.value = props.todo.text
}

const removeTodo = () => {
  todoStore.removeTodo(props.todo.id)
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    saveEdit()
  } else if (event.key === 'Escape') {
    cancelEdit()
  }
}
</script>

<template>
  <div 
    :class="['todo-item', { completed: todo.completed, editing: isEditing }]"
  >
    <div class="todo-content">
      <button
        @click="toggleComplete"
        :class="['checkbox', { checked: todo.completed }]"
      >
        <div class="checkbox-inner">
          <span v-if="todo.completed" class="checkmark">✓</span>
        </div>
      </button>
      
      <div class="todo-text-section">
        <div v-if="!isEditing" class="todo-display">
          <span :class="['todo-text', { completed: todo.completed }]">
            {{ todo.text }}
          </span>
          <div class="todo-meta">
            <span 
              :class="['priority-badge', todo.priority]"
              :style="priorityStyle"
            >
              {{ priorityConfig[todo.priority].icon }} {{ priorityConfig[todo.priority].label }}
            </span>
            <span class="todo-date">
              {{ new Date(todo.createdAt).toLocaleDateString() }}
            </span>
          </div>
        </div>
        
        <input
          v-else
          ref="editInput"
          v-model="editText"
          @blur="saveEdit"
          @keydown="handleKeyPress"
          class="todo-edit-input"
          maxlength="200"
        />
      </div>
    </div>
    
    <div class="todo-actions">
      <button
        v-if="!isEditing && !todo.completed"
        @click="startEdit"
        class="action-button edit-button"
        title="Edit task"
      >
        ✏️
      </button>
      
      <button
        @click="removeTodo"
        class="action-button delete-button"
        title="Delete task"
      >
        🗑️
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(100, 181, 246, 0.2);
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.todo-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(100, 181, 246, 0.5), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.todo-item:hover {
  transform: translateY(-2px);
  border-color: rgba(100, 181, 246, 0.4);
  box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.3);
}

.todo-item:hover::before {
  opacity: 1;
}

.todo-item.completed {
  opacity: 0.7;
  background: rgba(20, 30, 40, 0.4);
}

.todo-content {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(100, 181, 246, 0.5);
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 0.1rem;
}

.checkbox:hover {
  border-color: #64b5f6;
  box-shadow: 0 0 10px rgba(100, 181, 246, 0.3);
}

.checkbox.checked {
  background: linear-gradient(135deg, #10b981, #34d399);
  border-color: #10b981;
  animation: checkPulse 0.3s ease;
}

.checkbox-inner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.checkmark {
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.todo-text-section {
  flex: 1;
  min-width: 0;
}

.todo-display {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-text {
  color: #e2e8f0;
  font-size: 1rem;
  line-height: 1.5;
  word-wrap: break-word;
  transition: all 0.3s ease;
}

.todo-text.completed {
  text-decoration: line-through;
  color: rgba(226, 232, 240, 0.5);
}

.todo-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.priority-badge {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.todo-date {
  font-size: 0.8rem;
  color: rgba(226, 232, 240, 0.5);
}

.todo-edit-input {
  width: 100%;
  padding: 0.5rem;
  background: rgba(15, 23, 42, 0.8);
  border: 2px solid rgba(100, 181, 246, 0.5);
  border-radius: 6px;
  color: #e2e8f0;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.todo-edit-input:focus {
  outline: none;
  border-color: #64b5f6;
  box-shadow: 0 0 10px rgba(100, 181, 246, 0.3);
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.action-button {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.edit-button {
  background: rgba(59, 130, 246, 0.1);
  color: #64b5f6;
}

.edit-button:hover {
  background: rgba(59, 130, 246, 0.2);
  transform: scale(1.1);
}

.delete-button {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.delete-button:hover {
  background: rgba(239, 68, 68, 0.2);
  transform: scale(1.1);
}

@keyframes checkPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 768px) {
  .todo-item {
    padding: 0.75rem;
  }
  
  .todo-content {
    gap: 0.75rem;
  }
  
  .todo-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .todo-actions {
    margin-left: 0;
    margin-top: 0.5rem;
  }
}
</style>