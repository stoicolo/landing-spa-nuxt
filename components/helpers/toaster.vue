<template>
    <transition name="fade">
      <div v-if="visible" :class="positionClass" class="fixed rounded-lg bg-black bg-opacity-50 flex z-[2000]">
        <div :class="typeClass" class="p-2 rounded-lg shadow-lg m-2 transition-opacity duration-300">
          <h2 class="text-lg font-bold flex items-center gap-1"><span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          </span>{{ title }}</h2>
          <p>{{ description }}</p>
        </div>
      </div>
    </transition>
  </template>
  
  
  <script setup>
  import { ref, onMounted, nextTick } from 'vue';
  import { defineProps, computed, defineExpose } from 'vue';
  
  const props = defineProps({
    title: String,
    description: String,
    delay: Number,
    position: String,
    type: String,
  });
  
  const visible = ref(false);

  function show() {
    nextTick(() => {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.delay * 1000 || 3000);
    });
  }

  defineExpose({
    show
  });
  
  const positionClass = computed(() => {
    switch (props.position) {
      case 'top-right':
        return 'top-4 right-4 justify-end items-start';
      case 'bottom-right':
        return 'bottom-4 right-4 justify-start items-end';
      default:
        return 'top-4 left-[50%] justify-center items-center'; // Centrado por defecto
    }
  });

  const typeClass = computed(() => {
    switch (props.type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'warning':
        return 'bg-yellow-500 text-white';
      default:
        return 'bg-blue-500 text-white';
    }
  });
  
  onMounted(() => {
    nextTick(() => {
      visible.value = true;
      setTimeout(() => {
        visible.value = false;
      }, props.delay * 300 || 300);
    });
  });
  </script>
  
  
  
  <style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  .fade-enter-to, .fade-leave-from {
    opacity: 1;
  }
  </style>
  