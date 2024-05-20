<script setup lang="ts">
import HomeHeader from "~/components/home/HomeHeader.vue";
import HeroSection from "~/components/home/HeroSection.vue";
import FeatureSection from "~/components/home/FeatureSection.vue";
import TestimonialSection from "~/components/home/TestimonialSection.vue";
import PricingSection from "~/components/home/PricingSection.vue";
import FAQSection from "~/components/home/FAQSection.vue";
import HomeFooter from "~/components/home/HomeFooter.vue";

useHead({
  title: "Plataforma de Emprendimientos Circulares",
  meta: [
    {
      name: "Plataforma de Emprendimientos Circulares",
      content:
        "Éste es un espacio pensado para dignificar los esfuerzos y brindar acompañamiento en el camino de la Economía Circular a pequeñas, medianas y grandes empresas.",
    },
  ],
});

useSeoMeta({
  title: "Plataforma de Emprendimientos Circulares",
  ogTitle: "Plataforma de Emprendimientos Circulares",
  description:
    "Éste es un espacio pensado para dignificar los esfuerzos y brindar acompañamiento en el camino de la Economía Circular a pequeñas, medianas y grandes empresas.",
  ogDescription:
    "Éste es un espacio pensado para dignificar los esfuerzos y brindar acompañamiento en el camino de la Economía Circular a pequeñas, medianas y grandes empresas.",
  ogImage: "/img/footprint_initiative.png",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="bg-white">
    <!-- Header -->
    <HomeHeader />

    <main>
      <!-- Hero section -->
      <HeroSection />

      <!-- Feature section -->
      <FeatureSection />

      <!-- Testimonial section -->
      <TestimonialSection />

      <!-- Pricing section -->
      <PricingSection />

      <!-- FAQ section -->
      <FAQSection />
    </main>

    <!-- Footer -->
    <HomeFooter />
  </div>
</template>
