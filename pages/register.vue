<script setup lang="ts">
const {
  public: { apiBaseUrl },
} = useRuntimeConfig();

const accessToken = useCookie("accessToken", {
  default: () => {
    null;
  },
});
const refreshToken = useCookie("refreshToken", {
  default: () => {
    null;
  },
});

const userStore = useUserStore();

const displayCreatingAccountModal = ref(false);
const email = ref("");
const confirmEmail = ref("");

const password = ref("");
const confirmPassword = ref("");

const isEmailValid = computed(() => email.value === confirmEmail.value);
const isPasswordValid = computed(
  () => password.value === confirmPassword.value,
);

const isFormValid = computed(
  () =>
    isEmailValid.value &&
    isPasswordValid.value &&
    email.value &&
    confirmEmail.value &&
    password.value &&
    confirmPassword.value,
);

const registerUser = async (event: Event) => {
  event.preventDefault();
  displayCreatingAccountModal.value = true;
  try {
    const response = await $fetch(`${apiBaseUrl}/auth/register`, {
      method: "POST",
      body: {
        name: email.value,
        email: email.value,
        password: password.value,
      },
    });

    console.log("Response: ", response);

    if (response && response.user && response.tokens) {
      // Save auth token to cookies
      accessToken.value = response.tokens.access.token;
      refreshToken.value = response.tokens.refresh.token;
      // save user data to store
      userStore.id = response.user.id;
      userStore.email = response.user.email;
      userStore.name = response.user.name;

      await navigateTo("/quiz");
    }
  } catch (error) {}

  displayCreatingAccountModal.value = false;
};
</script>

<template>
  <div
    class="flex h-screen min-h-full flex-1 flex-col items-center justify-center"
  >
    <h1>Bienvenido al quiz de circularidad</h1>
    <p>Para continuar, necesitamos conocerte mejor</p>
    <p>No te preocupes, el siguiente quiz es facil y rapido</p>

    <form class="mt-8 space-y-6 md:w-96">
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Direccion de Email</label
        >
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
        <label
          for="confirm-email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Confirmar Email</label
        >
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
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Contraseña</label
          >
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
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="confirm-password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Confirmar Contraseña</label
          >
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
        <button
          type="submit"
          class="bg-fountain-blue-500 hover:bg-fountain-blue-600 focus-visible:outline-fountain-blue-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          :disabled="!isFormValid"
          :class="{ 'opacity-50': !isFormValid }"
          @click="registerUser"
        >
          Crear Cuenta y Tomar Quiz
        </button>
      </div>
    </form>

    <SimpleModal
      :is-open="displayCreatingAccountModal"
      title="Creating Account"
      text="Creating your account...."
      :cancelable="false"
      @close-modal="displayCreatingAccountModal = false"
    />
  </div>
</template>

<style scoped></style>
