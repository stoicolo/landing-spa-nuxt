<script setup lang="ts">
import { useUserStore } from '~/stores/user';
import { useCurrentStore } from '~/stores/current';


interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  tokens: {
    access: {
      token: string;
    };
    refresh: {
      token: string;
    };
  };
}

const {
  public: { apiBaseUrl },
} = useRuntimeConfig();

const userStore = useUserStore();
const currentStore = useCurrentStore();

const email = ref("");
const password = ref("");
const isLoggingIn = ref(false);

const loginButtonText = ref("Iniciar Sesion");

function encrypt(text: string, shift: number) {
  return text.split('').map(char => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const shiftAmount = isUpperCase ? 65 : 97;
      return String.fromCharCode(((code - shiftAmount + shift) % 26) + shiftAmount);
    }
    return char;
  }).join('');
}

const loginUser = async (event: Event) => {
  event.preventDefault();
  isLoggingIn.value = true;
  loginButtonText.value = "Iniciando Sesion....";
  try {
    const response = await $fetch<LoginResponse>(`${apiBaseUrl}/auth/login`, {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (response && response.user && response.tokens) {
      // Save auth token to cookies or localStorage
      localStorage.setItem('accessToken', response.tokens.access.token);
      localStorage.setItem('refreshToken', response.tokens.refresh.token);
      const encryptedText = encrypt(response.user.role, 3);
      localStorage.setItem('getNumByTicket', encryptedText);
      
      // save user data to store
      userStore.setUser({
        id: response.user.id,
        email: response.user.email,
        name: response.user.name
      });

      currentStore.setUserRole(response.user.role);
      
      // Redirect to dashboard if all is ok
      navigateTo("/builder/0");
    }
  } catch (error) {
    console.error("error while login in: ", error);
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
          <div class="flex items-center">
            <img
              class="h-28 w-auto"
              src="/img/logo-weblox.png"
              alt="Footprint Initiative"
            />
            <span class="ml-1 text-[32px]">WEBLOX</span>
          </div>
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Inicia Sesion
          </h2>
          <!--TODO El registro solo va a funcionar cuando el proceso sea automatizado-->
          <!-- <p class="mt-2 text-sm leading-6 text-gray-500">
            Eres PyME y no te has registrado?
            {{ " " }}
            <NuxtLink
              href="register"
              class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold"
              >Registrate aqui</NuxtLink
            >
          </p> -->
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
                    v-model="email"
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    placeholder="company@email.com"
                    required
                    class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
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
                    v-model="password"
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="focus:ring-fountain-blue-600 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  class="bg-fountain-blue-500 hover:bg-fountain-blue-600 focus-visible:outline-fountain-blue-600 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  @click="loginUser"
                  :disabled="isLoggingIn"
                  :class="{ 'opacity-50': isLoggingIn }"
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
        src="/img/login-picture.jpg"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped></style>
