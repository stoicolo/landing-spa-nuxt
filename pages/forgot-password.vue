<script setup lang="ts">
import { ref } from 'vue';
import PageTemplateService from '@/services/page_template';

const email = ref("");
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);

const submitButtonText = ref("Recuperar Contraseña");

const submitForm = async (event: Event) => {
  event.preventDefault();
  isSubmitting.value = true;
  submitButtonText.value = "Enviando...";

  try {
    // Aquí deberías hacer la llamada real a tu API
    await PageTemplateService.forgotPassword(email.value);
    showSuccessMessage.value = true;
  } catch (error) {
    console.error("Error al enviar la solicitud de recuperación:", error);
    submitButtonText.value = "Error, intenta nuevamente";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="flex h-screen min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <div class="flex items-center">
            <img class="h-28 w-auto" src="/img/logo-weblox.png" alt="Footprint Initiative" />
            <span class="ml-1 text-[32px]">WEBLOX</span>
          </div>
          <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Recuperar Contraseña <i class="fa fa-key" aria-hidden="true"></i>
          </h2>
        </div>

        <div class="mt-10">
          <form @submit="submitForm" class="space-y-6" v-if="!showSuccessMessage">
            <div>
              <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
                Dirección Email
              </label>
              <div class="mt-2">
                <input v-model="email" id="email" name="email" type="email" autocomplete="email"
                  placeholder="tu@email.com" required
                  class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
              </div>
            </div>

            <div>
              <button type="submit"
                class="bg-fountain-blue-500 hover:bg-fountain-blue-600 focus-visible:outline-fountain-blue-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                :disabled="isSubmitting" :class="{ 'opacity-50': isSubmitting }">
                {{ submitButtonText }}
              </button>
            </div>
          </form>

          <div v-if="showSuccessMessage" class="text-center">
            <i class="fa fa-key" aria-hidden="true"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">¡Correo enviado!</h3>
            <p class="text-sm text-gray-600">
              Hemos enviado un email a <strong>{{ email }}</strong> con instrucciones para restablecer tu contraseña.
              Por favor, revisa tu bandeja de entrada (y la carpeta de spam, por si acaso).
            </p>
            <NuxtLink to="/login" class="mt-4 inline-block text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
              Volver al inicio de sesión
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="/img/login-picture.jpg" alt="" />
    </div>
  </div>
</template>