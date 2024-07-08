<script setup lang="ts">
import HeaderSteps from "~/components/headerSteps.vue";
import CompanyInformation from "~/components/quiz/CompanyInformation.vue";
import QuizResults from "~/components/quiz/quizResults.vue";

/////////////////// Input questions ///////////////////
// Question 1
const q1Answer = ref("");
const MAX_Q1_ANSWER_LENGTH = 1500;

// Question 2
const questionTwoCheckboxes = ref([
  { id: "1", name: "Rechazar aquello que no necesitamos", selected: false },
  { id: "2", name: "Reducir nuestro consumo", selected: false },
  {
    id: "3",
    name: "Reutilizar o reusar productos en buen estado desechados por otro consumidor",
    selected: false,
  },
  {
    id: "4",
    name: "Reparar para alargar la vida de un producto",
    selected: false,
  },
  {
    id: "5",
    name: "Restaurar un producto antiguo para modernizarlo",
    selected: false,
  },
  {
    id: "6",
    name: "Remanufacturar o reconstruir manualmente o con medios mecánicos aquello que necesitamos",
    selected: false,
  },
  {
    id: "7",
    name: "Rediseñar con criterios de sostenibilidad y diseño ecológico",
    selected: false,
  },
  {
    id: "8",
    name: "Reciclar la materia prima para crear nuevos productos",
    selected: false,
  },
  {
    id: "9",
    name: "Recuperar materiales con la incineración para generar energía",
    selected: false,
  },
]);
const selectedQ2Checkboxes = computed(() =>
  questionTwoCheckboxes.value.map((question) => question.selected),
);

// Question 3
const q3Picked = ref("");
const q3Answer = ref("");

// Question 4
const q4Picked = ref("");
const recycledPercentage = ref(0);

// Question 5
const q5Picked = ref("");
const q5Answer = ref("");
const reusedPercentage = ref(0);

// Question 6
const q6Picked = ref("");
const renewableVirginMaterialPercentage = ref(0);

// Question 7
const q7Picked = ref("");
const notRenewableVirginMaterialPercentage = ref(0);

/////////////////// Input questions ///////////////////

// Question 8
const q8Picked = ref("");
const productRecycledPercentage = ref(0);

// Question 9
const q9Picked = ref("");
const q9Answer = ref("");
const productReusedPercentage = ref(0);

// Question 10
const q10Picked = ref("");
const q10Answer = ref("");
const recycledBioCyclePercentage = ref(0);

// Question 11
const q11Picked = ref("");
const noRecycledBioCyclePercentage = ref(0);

const step = ref(1);

const goToNextStep = async () => {
  scrollTo({ top: 0, behavior: "smooth" });
  step.value = step.value + 1;
  if (step.value > 3) {
    await navigateTo("/builder/0");
  }
};

const goToPreviousStep = () => {
  step.value = step.value - 1;
};
</script>

<template>
  <div class="flex flex-col items-center">
    <HeaderSteps />

    <CompanyInformation v-if="step === 1" @information-saved="goToNextStep" />

    <form v-if="step === 2" action="#">
      <div
        class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 divide-y divide-gray-100 sm:grid-cols-6"
      >
        <!--Question 1-->
        <div class="col-span-full mt-4">
          <label
            for="circular-characteristics"
            class="text-lg font-semibold leading-6 text-gray-900"
            >1. ¿Qué caraterísticas hacen a tu producto circular?</label
          >
          <div class="mt-2">
            <textarea
              v-model="q1Answer"
              id="circular-characteristics"
              name="circular-characteristics"
              rows="3"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
            />
          </div>
          <p class="mt-3 text-sm leading-6 text-gray-600">
            {{ q1Answer.length }}/{{ MAX_Q1_ANSWER_LENGTH }}
          </p>
        </div>

        <!--Question 2-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              2. ¿Tu producto refuerza alguna de las 9 Estrategias de
              Circularidad (9 Rs)?
            </legend>
            <div class="mt-6 space-y-6">
              <div
                v-for="nineR in questionTwoCheckboxes"
                :key="nineR.id"
                class="relative flex gap-x-3"
              >
                <div class="flex h-6 items-center">
                  <input
                    v-model="nineR.selected"
                    :id="nineR.id"
                    :name="nineR.name"
                    :value="nineR.selected"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                  />
                </div>
                <div class="text-sm leading-6">
                  <label :for="nineR.name" class="font-medium text-gray-900">{{
                    nineR.name
                  }}</label>
                  <!--<p class="text-gray-500">-->
                  <!--  Get notified when someones posts a comment on a posting.-->
                  <!--</p>-->
                </div>
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 3-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              3. ¿Haz calculado la circularidad de tu producto previamente?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q3Picked"
                  id="q3-no"
                  name="q3-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q3-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q3Picked"
                  id="q3-yes"
                  name="q3-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q3-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 3 === yes, display-->
          <fieldset v-show="q3Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Especifica el indicador de circularidad que haz usado
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="q3Answer"
                  type="text"
                  placeholder="Indicador usado"
                  name="q3-answer"
                  id="q3-answer"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 4-->
        <div class="col-span-full pt-10">
          <!-- New section -->
          <h2 class="col-span-full my-10 text-2xl font-bold">
            Indicadores de Circularidad según ISO 59020 (2024): Recursos a la
            entrada
          </h2>

          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              4. ¿Tu producto contiene material reciclado?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q4Picked"
                  id="q4-no"
                  name="q4-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q4-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q4Picked"
                  id="q4-yes"
                  name="q4-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="push-email"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 4 === yes, display-->
          <fieldset v-show="q4Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de material reciclado que contiene tu
              producto
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="recycledPercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="recycled-percentage"
                  id="recycled-percentage"
                  max="100"
                  min="0"
                />
                <label for="recycled-percentage"
                  >{{ recycledPercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 5-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              5. ¿Tu producto contiene material reutilizado?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q5Picked"
                  id="q5-no"
                  name="q5-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q5-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q5Picked"
                  id="q5-yes"
                  name="q5-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q5-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 5 === yes, display-->
          <fieldset v-if="q5Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Especifica qué tipo de material reutilizado contiene tu producto
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="q5Answer"
                  type="text"
                  placeholder="Indicador usado"
                  name="q5-answer"
                  id="q5-answer"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </fieldset>
          <!--For Question 5 === yes, also display-->
          <fieldset v-if="q5Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de material reciclado que contiene tu
              producto
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="reusedPercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="reused-percentage"
                  id="reused-percentage"
                  max="100"
                  min="0"
                />
                <label for="reused-percentage"
                  >{{ reusedPercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 6-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              6. ¿Tu producto contiene material virgen, renovable?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q6Picked"
                  id="q6-no"
                  name="q6-no"
                  type="radio"
                  value="bo"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q6-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q6Picked"
                  id="q6-yes"
                  name="q6-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q6-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 6 === yes, display-->
          <fieldset v-if="q6Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de material virgen, renovable que contiene tu
              producto
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="renewableVirginMaterialPercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="renewable-virgin-material-percentage"
                  id="renewable-virgin-material-percentage"
                  max="100"
                  min="0"
                />
                <label for="renewable-virgin-material-percentage"
                  >{{ renewableVirginMaterialPercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 7-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              7. ¿Tu producto contiene material virgen, no renovable?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q7Picked"
                  id="q7-no"
                  name="q7-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q7-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q7Picked"
                  id="q7-yes"
                  name="q7-yes"
                  value="yes"
                  type="radio"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q7-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 7 === yes, display-->
          <fieldset v-show="q7Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de material virgen, NO renovable que contiene
              tu producto
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="notRenewableVirginMaterialPercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="not-renewable-virgin-material-percentage"
                  id="not-renewable-virgin-material-percentage"
                  max="100"
                  min="0"
                />
                <label for="not-renewable-virgin-material-percentage"
                  >{{ notRenewableVirginMaterialPercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 8-->
        <div class="col-span-full pt-10">
          <h2 class="col-span-full my-10 text-2xl font-bold">
            Indicadores de Circularidad según ISO 59020(2024): Recursos a la
            Salida
          </h2>

          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              8. ¿Tu producto final tiene contenido reciclable?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q8Picked"
                  id="q8-no"
                  name="q8-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q8-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q8Picked"
                  id="q8-yes"
                  name="q8-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q8-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 8 === yes, display-->
          <fieldset v-show="q8Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de producto final reciclable
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="productRecycledPercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="product-recycled-percentage"
                  id="product-recycled-percentage"
                  max="100"
                  min="0"
                />
                <label for="product-recycled-percentage"
                  >{{ productRecycledPercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 9-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              9. ¿Tu producto final tiene contenido reutilizable?
            </legend>
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q9Picked"
                  id="q9-no"
                  name="q9-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q9-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q9Picked"
                  id="q9-yes"
                  name="q9-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q9-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 9 === yes, display-->
          <fieldset v-show="q9Picked === 'yes'" class="col-span-full mt-4">
            <label
              for="q9-answer"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Describe el contenido reutilizable de tu producto final</label
            >
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="q9Answer"
                  type="text"
                  placeholder="Describe el contenido"
                  name="q9-answer"
                  id="q9-answer"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </fieldset>
          <!--For Question 9 === yes, also display-->
          <fieldset v-show="q9Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de producto final reutilizable
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="productReusedPercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="product-reused-percentage"
                  id="product-reused-percentage"
                  max="100"
                  min="0"
                />
                <label for="product-reused-percentage"
                  >{{ productReusedPercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 10-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              10. ¿Tu producto final tiene contenido recirculable en el ciclo
              biológico?
            </legend>

            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q10Picked"
                  id="q10-no"
                  name="q10-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q10-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q10Picked"
                  id="q10-yes"
                  name="q10-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q10-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 10 === yes, display-->
          <fieldset v-show="q10Picked === 'yes'" class="col-span-full mt-4">
            <label
              for="q10-answer"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Describe el contenido recirculable en el ciclo biológico de tu
              producto final</label
            >
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="q10Answer"
                  type="text"
                  placeholder="Describe el contenido"
                  name="q10-answer"
                  id="q10-answer"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </fieldset>
          <!--For Question 10 === yes, also display-->
          <fieldset v-show="q10Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de producto final reutilizable
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="recycledBioCyclePercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="recycled-bio-cycle-percentage"
                  id="recycled-bio-cycle-percentage"
                  max="100"
                  min="0"
                />
                <label for="recycled-bio-cycle-percentage"
                  >{{ recycledBioCyclePercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>

        <!--Question 11-->
        <div class="col-span-full pt-10">
          <fieldset>
            <legend class="text-lg font-semibold leading-6 text-gray-900">
              11. ¿Tu producto final tiene contenido no circular?
            </legend>
            <!--<p class="mt-1 text-sm leading-6 text-gray-600">-->
            <!--  These are delivered via SMS to your mobile phone.-->
            <!--</p>-->
            <div class="mt-6 space-y-6">
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q11Picked"
                  id="q11-no"
                  name="q11-no"
                  type="radio"
                  value="no"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q11-no"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >No</label
                >
              </div>
              <div class="flex items-center gap-x-3">
                <input
                  v-model="q11Picked"
                  id="q11-yes"
                  name="q11-yes"
                  type="radio"
                  value="yes"
                  class="h-4 w-4 border-gray-300 text-fountain-blue-600 focus:ring-fountain-blue-600"
                />
                <label
                  for="q11-yes"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Si</label
                >
              </div>
            </div>
          </fieldset>

          <!--If question Question 11 === yes, display-->
          <fieldset v-show="q11Picked === 'yes'" class="col-span-full mt-4">
            <legend class="block text-sm font-medium leading-6 text-gray-900">
              Indica el porcentaje de producto final no circular
            </legend>
            <div class="mt-2">
              <div class="mt-2">
                <input
                  v-model="noRecycledBioCyclePercentage"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fountain-blue-600 sm:text-sm sm:leading-6"
                  type="range"
                  placeholder="0-100%"
                  name="no-recycled-bio-cycle-percentage"
                  id="no-recycled-bio-cycle-percentage"
                  max="100"
                  min="0"
                />
                <label for="no-recycled-bio-cycle-percentage"
                  >{{ noRecycledBioCyclePercentage }}&percnt;</label
                >
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </form>

    <QuizResults v-if="step === 3" />

    <div v-if="step > 1" class="my-8 flex items-center justify-end gap-x-6">
      <button
        v-if="step > 1"
        type="button"
        @click="goToPreviousStep"
        class="text-sm font-semibold leading-6 text-gray-900"
      >
        Atras
      </button>

      <button
        type="submit"
        @click="goToNextStep"
        class="rounded-md bg-fountain-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-fountain-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fountain-blue-600"
      >
        {{ step === 3 ? "Ir al dashboard" : "Continuar" }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
