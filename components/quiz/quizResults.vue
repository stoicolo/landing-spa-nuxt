<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { CheckIcon } from "@heroicons/vue/20/solid";

const data = {
  labels: ["Entradas", "Otras estrategias de circularidad", "Salidas"],
  datasets: [
    {
      backgroundColor: ["#23b0ba", "#aeafb2", "#efb403"],
      data: [33.33, 33.33, 33.33],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

ChartJS.register(ArcElement, Tooltip, Legend);

const includedFeatures = [
  "Publica tus productos gratis",
  "Acceso a cursos gratis y VIP",
  "Tus productos aparecen certificados",
  "Rating Circular Oficial",
];

const freeFeatures = ["Publica tus productos gratis", "Acceso a cursos gratis"];
</script>

<template>
  <div class="w-full bg-white py-8">
    <div class="mx-auto px-6 lg:px-8">
      <div class="mx-auto sm:text-center">
        <h2
          class="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Resultados
        </h2>

        <div class="w-full" style="height: 600px">
          <Doughnut id="grafica-circular" :data="data" :options="options" />
        </div>
      </div>

      <div
        v-show="false"
        class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
      >
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-gray-900">
            Registro VIP
          </h3>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
            amet indis perferendis blanditiis repellendus etur quidem assumenda.
          </p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4
              class="flex-none text-sm font-semibold leading-6 text-fountain-blue-600"
            >
              What’s included
            </h4>
            <div class="h-px flex-auto bg-gray-100" />
          </div>
          <ul
            role="list"
            class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
          >
            <li
              v-for="feature in includedFeatures"
              :key="feature"
              class="flex gap-x-3"
            >
              <CheckIcon
                class="h-6 w-5 flex-none text-fountain-blue-600"
                aria-hidden="true"
              />
              {{ feature }}
            </li>
          </ul>
        </div>
        <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div
            class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
          >
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-gray-600">
                Pay once, own it forever
              </p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-gray-900"
                  >$10</span
                >
                <span
                  class="text-sm font-semibold leading-6 tracking-wide text-gray-600"
                  >USD</span
                >
              </p>
              <a
                href="#"
                class="mt-10 block w-full rounded-md bg-fountain-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-fountain-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fountain-blue-600"
                >Get access</a
              >
              <p class="mt-6 text-xs leading-5 text-gray-600">
                Invoices and receipts available for easy company reimbursement
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-show="false"
        class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
      >
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-gray-900">
            Registro Simple
          </h3>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque
            amet indis perferendis blanditiis repellendus etur quidem assumenda.
          </p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4
              class="flex-none text-sm font-semibold leading-6 text-fountain-blue-600"
            >
              What’s included
            </h4>
            <div class="h-px flex-auto bg-gray-100" />
          </div>
          <ul
            role="list"
            class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
          >
            <li
              v-for="feature in freeFeatures"
              :key="feature"
              class="flex gap-x-3"
            >
              <CheckIcon
                class="h-6 w-5 flex-none text-fountain-blue-600"
                aria-hidden="true"
              />
              {{ feature }}
            </li>
          </ul>
        </div>

        <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div
            class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
          >
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-gray-600">Gratis</p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-gray-900"
                  >$0</span
                >
                <span
                  class="text-sm font-semibold leading-6 tracking-wide text-gray-600"
                  >USD</span
                >
              </p>
              <a
                href="#"
                class="mt-10 block w-full rounded-md bg-fountain-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-fountain-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fountain-blue-600"
                >Get access</a
              >
              <p class="mt-6 text-xs leading-5 text-gray-600">
                Finaliza tu registro gratis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
