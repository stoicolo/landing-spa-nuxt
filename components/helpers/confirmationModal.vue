<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">{{ title }}</h2>
        <p class="mb-4">{{ description }}</p>
        <div class="flex justify-end space-x-4">
          <button @click="cancel" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Cancelar
          </button>
          <button @click="confirm" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    title: String,
    description: String
  });
  
  const emit = defineEmits(['confirm', 'cancel']);
  
  const confirm = () => {
    emit('confirm');
  };
  
  const cancel = () => {
    emit('cancel');
  };
  </script>
  
  <style>
  /* Consider adding CSS here if needed */
  </style>
  