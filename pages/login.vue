<script setup lang="ts">
import { useUserStore } from '~/stores/user'


interface LoginResponse {
  user: {
    id: string;
    email: string;
    name: string;
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

const userStore = useUserStore()

const email = ref("");
const password = ref("");
const isLoggingIn = ref(false);

const loginButtonText = ref("Iniciar Sesion");

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
      
      // save user data to store
      userStore.setUser({
        id: response.user.id,
        email: response.user.email,
        name: response.user.name
      });
      
      // Redirect to dashboard if all is ok
      navigateTo("/builder/0");
    }
  } catch (error) {
    console.error("error while login in: ", error);
    isLoggingIn.value = false;
    loginButtonText.value = "Ocurrio un error, intentalo otra vez";
  }
};
// const loginUser = async (event: Event) => {
//   event.preventDefault();
//   isLoggingIn.value = true;
//   loginButtonText.value = "Iniciando Sesion....";
//   try {
//     const response = await $fetch(`${apiBaseUrl}/auth/login`, {
//       method: "POST",
//       body: {
//         email: email.value,
//         password: password.value,
//       },
//     });

//     if (response && response.user && response.tokens) {
//       debugger;
//       // Save auth token to cookies
//       accessToken.value = response.tokens.access.token;
//       refreshToken.value = response.tokens.refresh.token;
//       // save user data to store
//       userStore.id = response.user.id;
//       userStore.email = response.user.email;
//       userStore.name = response.user.name;
//       // Redirect to dashboard if all is ok
//       navigateTo("/builder/0");
//     }
//   } catch (error) {
//     console.error("error while login in: ", error);
//     isLoggingIn.value = false;
//     loginButtonText.value = "Ocurrio un error, intentalo otra vez";
//   }
// };
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
            alt="Footprint Initiative"
          />
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
              class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold"
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

              <!--              <div class="flex items-center justify-between">-->
              <!--                <div class="flex items-center">-->
              <!--                  <input-->
              <!--                    id="remember-me"-->
              <!--                    name="remember-me"-->
              <!--                    type="checkbox"-->
              <!--                    class="h-4 w-4 rounded border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"-->
              <!--                  />-->
              <!--                  <label-->
              <!--                    for="remember-me"-->
              <!--                    class="ml-3 block text-sm leading-6 text-gray-700"-->
              <!--                    >Recordarme</label-->
              <!--                  >-->
              <!--                </div>-->

              <!--                <div class="text-sm leading-6">-->
              <!--                  <a-->
              <!--                    href="#"-->
              <!--                    class="font-semibold text-fountain-blue-600 hover:text-fountain-blue-500"-->
              <!--                    >¿Olvidaste tu contraseña?</a-->
              <!--                  >-->
              <!--                </div>-->
              <!--              </div>-->

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
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped></style>
