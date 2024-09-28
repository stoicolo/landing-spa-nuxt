<template>
    <div v-if="isOpen" @click="closeModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[200]">
      <div @click.stop class="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <div class="relative" style="padding-top: 56.25%;">
          <iframe
            class="absolute top-0 left-0 w-full h-full"
            :src="videoUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    videoId: {
      type: String,
      required: true,
    }
  });
  
  const emit = defineEmits(['close']);
  
  const isOpen = ref(true);
  
  const videoUrl = computed(() => `https://www.youtube.com/embed/${props.videoId}`);
  
  const closeModal = () => {
    isOpen.value = false;
    emit('close');
  };
  </script>