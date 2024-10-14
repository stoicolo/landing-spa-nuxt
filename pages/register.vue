<script setup lang="ts">
import { ref, computed } from 'vue';

const {
  public: { apiBaseUrl },
} = useRuntimeConfig();

const userStore = useUserStore();
const currentStore = useCurrentStore();

const displayCreatingAccountModal = ref(false);
const email = ref("");
const phone = ref("");
const name = ref("");
const cupon = ref("");
const cuponError = ref("");
const confirmEmail = ref("");
const password = ref("");
const confirmPassword = ref("");
const errorMessage = ref("");
const loading = ref(false);

const isEmailValid = computed(() => email.value === confirmEmail.value);

const passwordRequirements = computed(() => [
  { text: "Al menos 8 caracteres", met: password.value.length >= 8 },
  { text: "Al menos una mayúscula", met: /[A-Z]/.test(password.value) },
  { text: "Al menos una minúscula", met: /[a-z]/.test(password.value) },
  { text: "Al menos un número", met: /\d/.test(password.value) },
  { text: "Al menos un caracter especial", met: /[!@#$%^&*(),.?":{}|<>]/.test(password.value) }
]);

const validateCupon = (value: string) => {
  if (value === "") return true;
  const regex = /^[A-Z0-9]{8,}$/;
  return regex.test(value);
};

const isCuponValid = computed(() => {
  if (cupon.value === "") return true;
  return validateCupon(cupon.value);
});

const isPasswordValid = computed(() => 
  passwordRequirements.value.every(req => req.met) && password.value === confirmPassword.value
);

const handleCuponChange = () => {
  if (cupon.value && !isCuponValid.value) {
    cuponError.value = "El cupón debe ser alfanumérico, tener al menos 8 caracteres y estar en mayúsculas.";
  } else {
    cuponError.value = "";
  }
};

const isFormValid = computed(() =>
  isEmailValid.value &&
  isPasswordValid.value &&
  email.value &&
  phone.value &&
  name.value &&
  confirmEmail.value &&
  password.value &&
  confirmPassword.value &&
  isCuponValid.value
);

const registerUser = async (event: Event) => {
  event.preventDefault();
  displayCreatingAccountModal.value = true;
  errorMessage.value = "";
  
  try {
    loading.value = true;
    const response: any = await $fetch(`${apiBaseUrl}/auth/register`, {
      method: "POST",
      body: {
        name: name.value,
        email: email.value,
        password: password.value,
        phoneNumber: phone.value,
        cupon: cupon.value ? cupon.value : "",
        role: "user",
      },
    });

    if (response && response.user && response.tokens) {
      userStore.id = response.user.id;
      userStore.email = response.user.email;
      userStore.name = response.user.name;
      currentStore.userId = response.user.id;

      await navigateTo("/email-activate-sended");
    }
  } catch (error: any) {
    loading.value = false;
    // Capturamos el mensaje de error específico del servidor
    if (error.response && error.response._data && error.response._data.message) {
      errorMessage.value = error.response._data.message;
    } else {
      errorMessage.value = "Ha ocurrido un error al registrar el usuario.";
    }
  } finally {
    displayCreatingAccountModal.value = false;
  }
};
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center py-10">
    <div>
      <div class="flex items-center mt-10 mb-4">
        <img
          class="h-28 w-auto"
          src="/img/logo-weblox.png"
          alt="Footprint Initiative"
        />
        <span class="ml-1 text-[32px]">WEBLOX</span>
      </div>
    </div>

    <h1>Bienvenido, regístrate y sé parte de weblox</h1>

    <form class="mt-8 space-y-6 md:w-96">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
          Nombre
        </label>
        <div class="mt-2">
          <input
            v-model="name"
            id="name"
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            name="name"
            type="text"
            required
            placeholder="Nombre"
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
          Dirección de Email
        </label>
        <div class="mt-2">
          <input
            v-model="email"
            id="email"
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            name="email"
            type="email"
            required
            placeholder="email@empresa.com"
          />
        </div>
      </div>
      <div>
        <label for="confirm-email" class="block text-sm font-medium leading-6 text-gray-900">
          Confirmar Email
        </label>
        <div class="mt-2">
          <input
            v-model="confirmEmail"
            id="confirm-email"
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            name="confirm-email"
            type="email"
            required
            placeholder="email@empresa.com"
          />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
          Teléfono
        </label>
        <div class="mt-2">
          <input
            v-model="phone"
            id="phone"
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            name="phone"
            type="phone"
            required
            placeholder="00000000"
          />
        </div>
      </div>
      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
        </div>
        <div class="mt-2">
          <input
            v-model="password"
            id="password"
            name="password"
            type="password"
            required
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
        <ul class="mt-2 text-sm text-gray-600">
          <li v-for="req in passwordRequirements" :key="req.text" :class="{ 'text-green-600': req.met }">
            {{ req.met ? '✓' : '○' }} {{ req.text }}
          </li>
        </ul>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="confirm-password" class="block text-sm font-medium leading-6 text-gray-900">
            Confirmar Contraseña
          </label>
        </div>
        <div class="mt-2">
          <input
            v-model="confirmPassword"
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label for="cupon" class="block text-sm font-medium leading-6 text-gray-900">
          Cupón de Descuento <small>(opcional)</small>
        </label>
        <div class="mt-2">
          <input
            v-model="cupon"
            id="cupon"
            class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
            :class="{ 'border-red-500': cuponError }"
            name="cupon"
            type="text"
            placeholder="Cupón ejemplo: WX2021"
            @input="handleCuponChange"
          />
        </div>
        <p v-if="cuponError" class="mt-2 text-sm text-red-600">{{ cuponError }}</p>
      </div>

      <div v-if="errorMessage" class="text-red-600 text-sm mt-2">
        {{ errorMessage }}
      </div>

      <div>
        <button
          type="submit"
          class="bg-fountain-blue-500 hover:bg-fountain-blue-600 focus-visible:outline-fountain-blue-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          :disabled="!isFormValid"
          :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
          @click="registerUser"
        >
          <span v-if="!loading">Crear Cuenta</span><span v-if="loading">Espera por favor...</span>
        </button>
      </div>
    </form>

    <SimpleModal
      :is-open="displayCreatingAccountModal"
      title="Creando Cuenta"
      text="Creando tu cuenta..."
      :cancelable="false"
      @close-modal="displayCreatingAccountModal = false"
    />
  </div>
</template>

<style scoped></style>