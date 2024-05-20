<script setup lang="ts">
import {
  ClipboardDocumentCheckIcon,
  CursorArrowRippleIcon,
  FolderArrowDownIcon,
  MagnifyingGlassCircleIcon,
  SquaresPlusIcon,
  UserGroupIcon,
} from "@heroicons/vue/24/outline";

const features = [
  {
    name: "Diagnóstico Inicial de Circularidad:",
    description:
      "Determinación del estado actual de circularidad alineado a las Normas ISO 59000.",
    icon: ClipboardDocumentCheckIcon,
  },
  {
    name: "Pensamiento de Ciclo de Vida:",
    description:
      "Análisis del Ciclo de Vida de tu producto y determinación de puntos críticos para mejorar la huella ambiental de tu producto.",
    icon: MagnifyingGlassCircleIcon,
  },
  {
    name: "Hub de Emprendimientos Circulares:",
    description:
      "Espacios online y presenciales para compartir experiencias y generar sinergias entre emprendimientos circulares.",
    icon: UserGroupIcon,
  },
  {
    name: "Catálogo de Circularidad:",
    description:
      "Espacio para exhibir las empresas circulares, sus características, su Ranking de Circularidad y todas aquellas cosas que las diferencian del mercado.",
    icon: SquaresPlusIcon,
  },
  {
    name: "Ranking de Circularidad:",
    description:
      "Visualización del estado de circularidad de las empresas y el camino que les falta por recorrer.",
    icon: CursorArrowRippleIcon,
  },
  {
    name: "Recursos presenciales y virtuales:",
    description:
      "Materiales y actividades en línea y presenciales para potenciar tu camino hacia la circularidad y espacios de Networking.",
    icon: FolderArrowDownIcon,
  },
];
</script>

<template>
  <div class="mt-32 sm:mt-56">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
        <h2
          v-show="false"
          class="text-base font-semibold leading-7 text-fountain-blue-600"
        >
          Everything you need
        </h2>
        <p
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Inicia tu camino hacia la Economía Circular
        </p>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Éste es un espacio pensado para dignificar los esfuerzos y brindar
          acompañamiento en el camino de la Economía Circular a pequeñas,
          medianas y grandes empresas.
        </p>
      </div>
    </div>
    <div v-show="false" class="relative overflow-hidden pt-16">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <img
          src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
          alt="App screenshot"
          class="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
          width="2432"
          height="1442"
        />
        <div class="relative" aria-hidden="true">
          <div
            class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]"
          />
        </div>
      </div>
    </div>
    <div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
      <dl
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
      >
        <div
          v-for="feature in features"
          :key="feature.name"
          class="relative pl-9"
        >
          <dt class="inline font-semibold text-gray-900">
            <component
              :is="feature.icon"
              class="absolute left-1 top-1 h-5 w-5 text-fountain-blue-500"
              aria-hidden="true"
            />
            {{ feature.name }}
          </dt>
          {{ " " }}
          <dd class="inline">{{ feature.description }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped></style>
