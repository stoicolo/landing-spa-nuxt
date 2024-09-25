<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTemplateService from '@/services/page_template';

const route = useRoute();
const router = useRouter();

const newPassword = ref("");
const confirmPassword = ref("");
const token = ref("");
const isSubmitting = ref(false);
const showSuccessMessage = ref(false);
const errorMessage = ref("");
const passwordMismatch = ref(false);

const submitButtonText = ref("Restablecer Contraseña");

// Nuevas variables para validación de contraseña
const hasUpperCase = computed(() => /[A-Z]/.test(newPassword.value));
const hasLowerCase = computed(() => /[a-z]/.test(newPassword.value));
const hasNumber = computed(() => /\d/.test(newPassword.value));
const hasSpecialChar = computed(() => /[!@#$%^&*(),.?":{}|<>]/.test(newPassword.value));
const isLengthValid = computed(() => newPassword.value.length >= 8);

const isPasswordValid = computed(() => 
  hasUpperCase.value && 
  hasLowerCase.value && 
  hasNumber.value && 
  hasSpecialChar.value && 
  isLengthValid.value
);

const passwordErrors = computed(() => {
  const errors = [];
  if (!isLengthValid.value) errors.push("al menos 8 caracteres");
  if (!hasUpperCase.value) errors.push("una letra mayúscula");
  if (!hasLowerCase.value) errors.push("una letra minúscula");
  if (!hasNumber.value) errors.push("un número");
  if (!hasSpecialChar.value) errors.push("un carácter especial");
  return errors;
});

onMounted(() => {
  token.value = route.query.token as string;
  if (!token.value) {
    errorMessage.value = "Token no válido o faltante. Por favor, solicite un nuevo enlace de restablecimiento.";
  }
});

watch(confirmPassword, (newValue) => {
  passwordMismatch.value = newValue !== newPassword.value;
});

const validateForm = () => {
  if (!isPasswordValid.value) {
    errorMessage.value = "La contraseña no cumple con los requisitos de seguridad.";
    return false;
  }
  if (newPassword.value !== confirmPassword.value) {
    errorMessage.value = "Las contraseñas no coinciden.";
    return false;
  }
  return true;
};

const submitForm = async (event: Event) => {
  event.preventDefault();
  if (!validateForm()) return;

  isSubmitting.value = true;
  submitButtonText.value = "Enviando...";
  errorMessage.value = "";

  try {
    await PageTemplateService.resetPassword(token.value, newPassword.value);
    showSuccessMessage.value = true;
  } catch (error) {
    console.error("Error al restablecer la contraseña:", error);
    errorMessage.value = "Error al restablecer la contraseña. Por favor, intente nuevamente.";
  } finally {
    isSubmitting.value = false;
    submitButtonText.value = "Restablecer Contraseña";
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
            Restablecer Contraseña <i class="fa fa-key" aria-hidden="true"></i>
          </h2>
        </div>

        <div class="mt-10">
          <form @submit="submitForm" class="space-y-6" v-if="!showSuccessMessage && !errorMessage">
            <div>
              <label for="newPassword" class="block text-sm font-medium leading-6 text-gray-900">
                Nueva Contraseña
              </label>
              <div class="mt-2">
                <input v-model="newPassword" id="newPassword" name="newPassword" type="password"
                  autocomplete="new-password" required
                  class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
              </div>
              <ul v-if="!isPasswordValid" class="mt-2 text-sm text-red-600">
                <li v-for="error in passwordErrors" :key="error">
                  La contraseña debe tener {{ error }}.
                </li>
              </ul>
            </div>

            <div>
              <label for="confirmPassword" class="block text-sm font-medium leading-6 text-gray-900">
                Confirmar Nueva Contraseña
              </label>
              <div class="mt-2">
                <input v-model="confirmPassword" id="confirmPassword" name="confirmPassword" type="password"
                  autocomplete="new-password" required
                  class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
              </div>
              <p v-if="passwordMismatch" class="mt-2 text-sm text-red-600">
                Las contraseñas no coinciden.
              </p>
            </div>

            <div>
              <button type="submit"
                class="bg-fountain-blue-500 hover:bg-fountain-blue-600 focus-visible:outline-fountain-blue-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                :disabled="isSubmitting || passwordMismatch || !isPasswordValid" 
                :class="{ 'opacity-50': isSubmitting || passwordMismatch || !isPasswordValid }">
                {{ submitButtonText }}
              </button>
            </div>
          </form>

          <div v-if="showSuccessMessage" class="text-center">
            <i class="fa fa-check-circle text-green-500 text-4xl mb-4" aria-hidden="true"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">¡Contraseña restablecida con éxito!</h3>
            <p class="text-sm text-gray-600 mb-4">
              Tu contraseña ha sido actualizada. Ahora puedes iniciar sesión con tu nueva contraseña.
            </p>
            <router-link to="/login" class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
              Ir al inicio de sesión
            </router-link>
          </div>

          <div v-if="errorMessage" class="text-center">
            <i class="fa fa-exclamation-circle text-red-500 text-4xl mb-4" aria-hidden="true"></i>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Error</h3>
            <p class="text-sm text-red-600 mb-4">
              {{ errorMessage }}
            </p>
            <router-link to="/forgot-password" class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
              Solicitar nuevo enlace de restablecimiento
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="/img/login-picture.jpg" alt="" />
    </div>
  </div>
</template>