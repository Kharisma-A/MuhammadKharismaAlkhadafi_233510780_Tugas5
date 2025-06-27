<script setup lang="ts">
import { onMounted } from 'vue'
import TodoApp from './components/TodoApp.vue'
import StarField from './components/StarField.vue'

onMounted(() => {
  document.title = "Cosmic Tasks - Astronomy Todo List"
})
</script>

<template>
  <div class="cosmic-app">
    <StarField />
    <div class="app-container">
      <header class="app-header">
        <h1 class="cosmic-title">
          <span class="title-icon">🌌</span>
          Cosmic Tasks
          <span class="title-subtitle">Organize your universe</span>
        </h1>
      </header>
      <TodoApp />
    </div>
  </div>
</template>

<style scoped>
.cosmic-app {
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533a7b 100%);
  position: relative;
  overflow-x: hidden;
}

.app-container {
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.app-header {
  text-align: center;
  margin-bottom: 3rem;
}

.cosmic-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  background: linear-gradient(135deg, #64b5f6 0%, #42a5f5 25%, #29b6f6 50%, #26c6da 75%, #4dd0e1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 0 30px rgba(100, 181, 246, 0.3);
  animation: glow 3s ease-in-out infinite alternate;
}

.title-icon {
  font-size: 0.8em;
  animation: rotate 10s linear infinite;
}

.title-subtitle {
  font-size: 0.4em;
  font-weight: 300;
  opacity: 0.8;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

@keyframes glow {
  from {
    text-shadow: 0 0 30px rgba(100, 181, 246, 0.3);
  }
  to {
    text-shadow: 0 0 50px rgba(100, 181, 246, 0.6), 0 0 60px rgba(77, 208, 225, 0.4);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 1rem 0.5rem;
  }
  
  .app-header {
    margin-bottom: 2rem;
  }
}
</style>