<script setup lang="ts">
import { ref } from 'vue';

const userStore = useUserStore();
const email = ref(userStore.email);
</script>

<template>
  <div class="flex h-screen min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex items-center">
            <img class="h-28 w-auto" src="/img/logo-weblox.png" alt="Weblox Logo" />
            <span class="ml-1 text-[32px]">WEBLOX</span>
          </div>
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Activación de Usuario
          </h2>
        </div>

        <div class="mt-10">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-semibold mb-4 text-fountain-blue-600">
              ¡Gracias por unirte a Weblox!
            </h3>
            <p class="mb-4 text-gray-700">
              Hemos enviado un correo electrónico de activación a:
              <span class="font-medium text-fountain-blue-500">{{ email }}</span>
            </p>
            <p class="mb-4 text-gray-700">
              Por favor, revisa tu bandeja de entrada y sigue el enlace de activación para completar el proceso de registro.
            </p>
            <p class="text-sm text-gray-500">
              Si no encuentras el correo, revisa tu carpeta de spam o correo no deseado.
            </p>
          </div>
          <div class="mt-6 text-center">
            <a href="/" class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
              Volver a la página de inicio
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="/img/login-picture.jpg"
        alt="Fondo de activación"
      />
    </div>
  </div>
</template>

<style scoped>
.bg-fountain-blue-500 {
  background-color: #3498db;
}
.bg-fountain-blue-600 {
  background-color: #2980b9;
}
.text-fountain-blue-500 {
  color: #3498db;
}
.text-fountain-blue-600 {
  color: #2980b9;
}
.hover\:text-fountain-blue-500:hover {
  color: #3498db;
}
</style>