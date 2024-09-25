<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTemplateService from '@/services/page_template';

const route = useRoute();
const router = useRouter();

const token = ref("");
const isActivating = ref(false);
const activationSuccess = ref(false);
const errorMessage = ref("");

onMounted(async () => {
  token.value = route.query.token as string;
  if (!token.value) {
    errorMessage.value = "Token no válido o faltante. Por favor, solicite un nuevo enlace de activación.";
    return;
  }

  await activateUser();
});

const activateUser = async () => {
  isActivating.value = true;
  errorMessage.value = "";

  try {
    await PageTemplateService.activateUser(token.value);
    activationSuccess.value = true;
  } catch (error) {
    console.error("Error al activar la cuenta:", error);
    errorMessage.value = "Error al activar la cuenta. Por favor, intente nuevamente refrescando o solicite un nuevo enlace de activación.";
  } finally {
    isActivating.value = false;
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
            Activación de Cuenta <i class="fa fa-user-plus" aria-hidden="true"></i>
          </h2>
        </div>

        <div class="mt-10">
          <div v-if="isActivating" class="text-center">
            <i class="fa fa-spinner fa-spin text-fountain-blue-500 text-4xl mb-4" aria-hidden="true"></i>
            <p class="text-lg text-gray-600">Activando tu cuenta...</p>
          </div>

          <div v-else-if="activationSuccess" class="text-center">
            <i class="fa fa-check-circle text-green-500 text-4xl mb-4" aria-hidden="true"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">¡Bienvenido a WEBLOX!</h3>
            <p class="text-sm text-gray-600 mb-4">
              Tu cuenta ha sido activada con éxito. Ahora puedes iniciar sesión y comenzar a usar nuestros servicios.
            </p>
            <router-link to="/login" class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
              Ir al inicio de sesión
            </router-link>
          </div>

          <div v-else-if="errorMessage" class="text-center">
            <i class="fa fa-exclamation-circle text-red-500 text-4xl mb-4" aria-hidden="true"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Error de Activación</h3>
            <p class="text-sm text-red-600 mb-4">
              {{ errorMessage }}
            </p>
            <!-- <router-link to="/request-activation" class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
              Solicitar nuevo enlace de activación
            </router-link> -->
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="/img/login-picture.jpg" alt="" />
    </div>
  </div>
</template>