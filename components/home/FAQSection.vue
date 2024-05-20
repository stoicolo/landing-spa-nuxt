<script setup lang="ts">
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/vue/24/outline";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const faqs = [
  {
    question: "¿Cómo sé si mi empresa es circular?",
    answer:
      "La Economía Circular no es sólo un concepto, es un camino. Existen numerosas formas de implementar la economía circular, con diferente nivel de complejidad. Sin embargo hay aplicaciones sencillas,  incluso hay muchos emprendimientos que nacen de una idea circular. En éste espacio estamos para ayudarte. Completar nuestro formulario inicial es el primer paso.",
  },
  {
    question: "¿Qué servicios se brindan en la Plataforma?",
    answer:
      "Mediante el diagnóstico inicial podemos entender el estado actual de tu emprendimiento en el camino de la Economía Circular y brindarte un Ranking de la Circularidad de tu producto. Al ser parte de nuestra plataforma tendrás acceso a material gratuito online, tal como charlas on-demand, manuales y material didáctico. Además de talleres presenciales y actividades de networking con metodologías de design thinking.",
  },
  {
    question: "¿Qué es la ISO 59000?",
    answer:
      "La Organización de Estándares Internacionales ISO publicó la Serie de Normas ISO 59000 en Mayo de 2024, el cual contiene conceptos, métodos de implementación de modelos de negocio circulares y métricas para la medición de la circularidad. Todos los servicios de la Plataforma de Emprendimientos Circulares están alineados a dichos estándares.",
  },
  {
    question: "¿Qué es el Análisis de Ciclo de Vida?",
    answer:
      "Según la ISO 59040, el ACV es un método complementario para medir la circularidad. Inicia con la implementación del Pensamiento de Ciclo de Vida en procesos, productos y servicios. Mediante datos cuantitativos permite la detección de puntos críticos que permiten disminuir la huella ambiental.",
  },
  {
    question: "¿Cómo puedo participar en la Plataforma?",
    answer:
      "El Catálogo de Circularidad es de acceso libre y gratuito. Para participar como miembro, y ser publicado en el Catálogo de Circularidad, la empresa debe hacer su diagnóstico inicial de circularidad y pagar la membresía correspondiente. ¡El camino sólo empieza!",
  },
];
</script>

<template>
  <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-56 lg:px-8">
    <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
      <h2 class="text-2xl font-bold leading-10 tracking-tight text-gray-900">
        Preguntas Frecuentes
      </h2>
      <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
        <Disclosure
          as="div"
          v-for="faq in faqs"
          :key="faq.question"
          class="pt-6"
          v-slot="{ open }"
        >
          <dt>
            <DisclosureButton
              class="flex w-full items-start justify-between text-left text-gray-900"
            >
              <span class="text-base font-semibold leading-7">{{
                faq.question
              }}</span>
              <span class="ml-6 flex h-7 items-center">
                <PlusSmallIcon
                  v-if="!open"
                  class="h-6 w-6"
                  aria-hidden="true"
                />
                <MinusSmallIcon v-else class="h-6 w-6" aria-hidden="true" />
              </span>
            </DisclosureButton>
          </dt>
          <DisclosurePanel as="dd" class="mt-2 pr-12">
            <p class="text-base leading-7 text-gray-600">
              {{ faq.answer }}
            </p>
          </DisclosurePanel>
        </Disclosure>
      </dl>
    </div>
  </div>
</template>

<style scoped></style>
