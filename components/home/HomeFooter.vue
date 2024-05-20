<script setup lang="ts">
const footerNavigation = {
  fundation: [
    { name: "Acerca de nosotros", href: "https://footprintinitiative.org/about-us" },
    { name: "Blog", href: "https://footprintinitiative.org/" },
    { name: "Trabaja con nosotros", href: "#" },
    { name: "Noticias", href: "https://footprintinitiative.org/" },
    { name: "Aliados", href: "#" },
  ],
  legal: [
    { name: "Confidencialidad", href: "#" },
    { name: "Terminos y Condiciones", href: "#" },
  ],
};
</script>

<template>
  <footer class="mt-32 bg-gray-950 sm:mt-56" aria-labelledby="footer-heading">
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <img
          class="h-36"
          src="/img/footprint_initiative_white.png"
          alt="The Footprint Initiative"
        />
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">
                Fundacion
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in footerNavigation.fundation" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in footerNavigation.legal" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex w-full items-center justify-center py-6">
      <p class="text-gray-300 hover:text-white">
        &copy; {{ new Date().getFullYear() }} The Footprint Initiative
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
