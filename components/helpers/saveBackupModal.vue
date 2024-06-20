<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
      <div class="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 class="text-lg font-bold mb-2">Guardar un respaldo de esta página</h2>
        <p class="mb-4">Con este respaldo puedes devolver todos los cambios realizados hasta este punto.</p>
        <label>Nombre del respaldo</label>
        <input v-model="backupName" class="border p-2 rounded ml-2" />
        <div class="flex justify-end space-x-4 mt-5">
          <button @click="cancel" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Cancelar
          </button>
          <button 
          :disabled="!backupName" 
          :class="{ 'hover:bg-blue-700': backupName, 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300': !backupName }" 
          @click="confirm" 
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const emit = defineEmits(['confirm', 'cancel']);
  const backupName = ref('');
  
  const confirm = () => {
    emit('confirm', backupName.value);
  };
  
  const cancel = () => {
    emit('cancel');
  };
  </script>
  
  <style>
  /* Consider adding CSS here if needed */
  </style>
  