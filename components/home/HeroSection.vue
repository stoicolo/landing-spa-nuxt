<script setup lang="ts"></script>

<template>
  <div
    class="relative isolate overflow-hidden bg-gray-900 pb-16 pt-14 sm:pb-20"
  >
    <img
      src="/img/landing_bg_banner.jpg"
      alt="The footprint initiative background"
      class="absolute inset-0 -z-10 h-full w-full object-cover"
    />
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="aspect-[1155/678] relative left-[calc(50%-11rem)] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto py-16 sm:py-48 lg:py-20">
        <div v-show="false" class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-400 ring-1 ring-white/10 hover:ring-white/20"
          >
            Announcing our next round of funding.
            <a href="#" class="font-semibold text-white"
              ><span class="absolute inset-0" aria-hidden="true" />Read more
              <span aria-hidden="true">&rarr;</span></a
            >
          </div>
        </div>
        <div class="text-center w-full flex flex-col">
          <div class="flex flex-col-reverse items-center md:items-start justify-center lg:justify-evenly lg:flex-row w-full">
            <h1
              class="md:mt-16 text-4xl font-bold tracking-tight text-white sm:text-6xl"
            >
              Plataforma de Emprendimientos Circulares
            </h1>

            <NuxtImg
              src="/img/circularidad.png"
              class="self-center"
              width="500"
              height="500"
              alt="circularidad"
            />
          </div>
          <div class="md:mt-10 mt-8 mb-32 flex items-center justify-center gap-x-6">
            <NuxtLink
              to="/register"
              class="rounded-md bg-fountain-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-fountain-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fountain-blue-400"
              >Inscríbete Aquí</NuxtLink
            >
            <NuxtLink
              to="/login"
              class="text-sm font-semibold leading-6 text-white"
              >Inicio <span aria-hidden="true">→</span></NuxtLink
            >
          </div>
        </div>
      </div>

      <!-- Logo cloud -->
      <div
        v-show="false"
        class="mx-auto grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5"
      >
        <img
          class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/transistor-logo-white.svg"
          alt="Transistor"
          width="158"
          height="48"
        />
        <img
          class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/reform-logo-white.svg"
          alt="Reform"
          width="158"
          height="48"
        />
        <img
          class="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/tuple-logo-white.svg"
          alt="Tuple"
          width="158"
          height="48"
        />
        <img
          class="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/savvycal-logo-white.svg"
          alt="SavvyCal"
          width="158"
          height="48"
        />
        <img
          class="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          src="https://tailwindui.com/img/logos/158x48/statamic-logo-white.svg"
          alt="Statamic"
          width="158"
          height="48"
        />
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="aspect-[1155/678] relative left-[calc(50%+3rem)] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      />
    </div>
  </div>
</template>

<style scoped></style>
