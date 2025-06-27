<script setup lang="ts">
import { onMounted, ref } from 'vue'

const starFieldRef = ref<HTMLDivElement>()

onMounted(() => {
  createStars()
})

const createStars = () => {
  if (!starFieldRef.value) return
  
  const starCount = 150
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div')
    star.className = 'star'
    
    const size = Math.random() * 3 + 1
    const left = Math.random() * 100
    const top = Math.random() * 100
    const duration = Math.random() * 3 + 2
    const delay = Math.random() * 2
    
    star.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
    `
    
    starFieldRef.value?.appendChild(star)
  }
}
</script>

<template>
  <div ref="starFieldRef" class="star-field">
  </div>
</template>

<style scoped>
.star-field {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 2s ease-in-out infinite alternate;
}

@keyframes twinkle {
  from {
    opacity: 0.3;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>