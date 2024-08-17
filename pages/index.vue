<script setup>
import ClientRender from '~/components/home/ClientRender.vue';

useHead({
  title: "Weblox - Crea páginas web sin saber programar",
  meta: [
    {
      name: "Weblox - Crea páginas web sin saber programar",
      content:
        "Weblox es una aplicación que te permite crear páginas web de forma fácil, económica y rápida, sin necesidad de saber programar.",
    },
  ],
});

useSeoMeta({
  title: "Weblox - Crea páginas web sin saber programar",
  ogTitle: "Weblox - Crea páginas web sin saber programar",
  description:
    "Weblox es una aplicación que te permite crear páginas web de forma fácil, económica y rápida, sin necesidad de saber programar.",
  ogDescription:
    "Weblox es una aplicación que te permite crear páginas web de forma fácil, económica y rápida, sin necesidad de saber programar.",
  ogImage: "/img/weblox_logo.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="bg-white">
    <main>
      <div>
        <ClientRender />
    </div>
    </main>
  </div>
</template>
