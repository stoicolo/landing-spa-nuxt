<script setup lang="ts">
import { useAuth } from "@/services/useAuth";

const {  signIn } = useAuth();

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

const email = ref("");
const password = ref("");
const isLoggingIn = ref(false);

const loginButtonText = ref("Iniciar Sesion");

const loginUser = async (event: Event) => {
  event.preventDefault();
  isLoggingIn.value = true;
  loginButtonText.value = "Iniciando Sesion....";
  try {
    const response = await signIn({
      email: email.value,
      password: password.value,
    });
    if (response && response.token && response.user) {
      // Save auth token to cookies
      accessToken.value = response.token;
      // save user data to store
      userStore.id = response.user.personalId;
      userStore.email = response.user.email;
      userStore.name = `${response.user.firstName} ${response.user.lastName}`;
      // Redirect to dashboard if all is ok
      navigateTo("/dashboard");
    }
  } catch (error) {
    console.error("error while logging in: ", error);
    isLoggingIn.value = false;
    loginButtonText.value = "Ocurrio un error, intentalo otra vez";
  }
};
</script>

<template>
  <div class="flex h-screen min-h-full flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-28 w-auto"
            src="/img/footprint_initiative.png"
            alt="logo image"
          >
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Inicia Sesion
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Eres PyME y no te has registrado?
            {{ " " }}
            <NuxtLink
              href="register"
              class="font-semibold text-fountain-blue-600 hover:text-fountain-blue-500"
              >Registrate aqui</NuxtLink
            >
          </p>
        </div>

        <div class="mt-10">
          <div>
            <form class="space-y-6">
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Direccion Email</label
                >
                <div class="mt-2">
                  <input
                    id="email"
                    v-model="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="company@email.com"
                    required
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  >
                </div>
              </div>

              <div>
                <label
                  for="password"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Contraseña</label
                >
                <div class="mt-2">
                  <input
                    id="password"
                    v-model="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  >
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  class="flex w-full justify-center rounded-md bg-fountain-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-fountain-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fountain-blue-600"
                  :class="{ 'opacity-50': isLoggingIn }"
                  :disabled="isLoggingIn"
                  @click.prevent="loginUser"
                >
                  {{ loginButtonText }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt="imagen de fondo de login"
      >
    </div>
  </div>
</template>

<style scoped></style>
