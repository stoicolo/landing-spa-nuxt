<script setup lang="ts">
import { UserCircleIcon } from "@heroicons/vue/24/solid";
const {
  public: { apiBaseUrl },
} = useRuntimeConfig();

const emit = defineEmits(["informationSaved"]);

const accessToken = useCookie("accessToken");
const userStore = useUserStore();
const companyStore = useCompanyStore();

const countries = [
  {
    name: "Costa Rica",
    value: "CR",
  },
  {
    name: "Estados Unidos",
    value: "US",
  },
];

const companyName = ref("");
const companyAddress = ref("");
const country = ref("CR");
const city = ref("");
const state = ref("");
const zipCode = ref("");

const contactFirstName = ref("");
const contactLastName = ref("");
const contactEmail = ref("");
const contactPhone = ref("");

const saveCompanyInformation = async () => {
  try {
    const response = await $fetch<any>(`${apiBaseUrl}/companies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken.value}`,
      },
      method: "POST",
      body: JSON.stringify({
        email: userStore.email,
        name: companyName.value,
        address: companyAddress.value,
        country: country.value,
        city: city.value,
        state: state.value,
        zip: zipCode.value,
        contactName: contactFirstName.value,
        contactLastName: contactLastName.value,
        contactEmail: contactEmail.value,
        contactPhone: contactPhone.value,
      }),
    });

    if (response) {
      companyStore.saveCompanyInformation(response);
      emit("informationSaved");
    }
  } catch (error) {
    console.error("Error while saving company information: ", error);
  }
};
</script>

<template>
  <form class="mt-8">
    <h1 class="text-center">Primero lo primero</h1>

    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-center text-base font-semibold leading-7 text-gray-900">
          Cuentanos sobre tu Empresa
        </h2>
        <p class="mt-1 text-center text-sm leading-6 text-gray-600">
          Para continuar con el quiz
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div v-show="false" class="col-span-full">
            <label
              for="photo"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Logo</label
            >
            <div class="mt-2 flex items-center gap-x-3">
              <UserCircleIcon
                class="h-12 w-12 text-gray-300"
                aria-hidden="true"
              />
              <button
                type="button"
                class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cambiar
              </button>
            </div>
          </div>

          <div class="sm:col-span-full">
            <label
              for="username"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Nombre de la Empresa</label
            >
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="companyName"
                  type="text"
                  placeholder="PyME"
                  name="company-name"
                  id="company-name"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="street-address"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Direccion Fisica de la Empresa</label
            >
            <div class="mt-2">
              <input
                v-model="companyAddress"
                type="text"
                name="street-address"
                id="street-address"
                autocomplete="street-address"
                placeholder="Calle, Numero y Vecindario"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="country"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Pais</label
            >
            <div class="mt-2">
              <select
                v-model="country"
                id="country"
                name="country"
                autocomplete="country-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option
                  v-for="country in countries"
                  :key="country.name"
                  :value="country.value"
                >
                  {{ country.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="sm:col-span-2 sm:col-start-1">
            <label
              for="city"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Ciudad</label
            >
            <div class="mt-2">
              <input
                v-model="city"
                type="text"
                name="city"
                id="city"
                autocomplete="address-level2"
                placeholder="Ciudad"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="region"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Estado / Provincia</label
            >
            <div class="mt-2">
              <input
                v-model="state"
                type="text"
                name="region"
                id="region"
                autocomplete="address-level1"
                placeholder="Estado"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="postal-code"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Codigo Postal</label
            >
            <div class="mt-2">
              <input
                v-model="zipCode"
                type="text"
                name="postal-code"
                id="postal-code"
                autocomplete="postal-code"
                placeholder="00000"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="pb-8">
        <h2 class="text-base font-semibold leading-7 text-gray-900">
          Información de Contacto
        </h2>

        <p class="mt-1 text-sm leading-6 text-gray-600">
          Use el nombre del contacto de la empresa.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label
              for="first-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Nombres</label
            >
            <div class="mt-2">
              <input
                v-model="contactFirstName"
                type="text"
                name="first-name"
                id="first-name"
                autocomplete="given-name"
                placeholder="Nombre"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="last-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Apellidos</label
            >
            <div class="mt-2">
              <input
                v-model="contactLastName"
                type="text"
                name="last-name"
                id="last-name"
                autocomplete="family-name"
                placeholder="Apellidos"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Direccion Email</label
            >
            <div class="mt-2">
              <input
                v-model="contactEmail"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                placeholder="email@empresa.com"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Telefono</label
            >
            <div class="mt-2">
              <input
                v-model="contactPhone"
                id="email"
                name="phone"
                type="tel"
                autocomplete="phone"
                maxlength="10"
                placeholder="1234567890"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-8 flex items-center justify-end gap-x-6">
      <button
        type="submit"
        @click.prevent="saveCompanyInformation"
        class="rounded-md bg-fountain-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fountain-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fountain-blue-600"
      >
        Guardar información y Continuar
      </button>
    </div>
  </form>
</template>

<style scoped></style>
