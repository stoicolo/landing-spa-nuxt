<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTemplateService from '@/services/page_template';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const token = ref("");
const isActivating = ref(false);
const activationSuccess = ref(false);
const errorMessage = ref("");
const termsAccepted = ref(false);
const showTerms = ref(true);
const termsRead = ref(false);
const currentDate = (new Date().toISOString()).split('T')[0];
const userIp = ref("");
const userDevice = ref("");
const userBrowser = ref("");
const legalAgreement = ref("");
const isLoadingAgreement = ref(true);
const userId = ref(0);
const termsId = ref(0);

onMounted(async () => {
    token.value = route.query.token as string;
    const tokenDecoded = decodeJWT(token.value);
    userId.value = tokenDecoded.sub;

    if (!token.value) {
        errorMessage.value = "Token no válido o faltante. Por favor, solicite un nuevo enlace de activación.";
        return;
    }

    // Obtener la IP del usuario
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        userIp.value = data.ip;
    } catch (error) {
        console.error("Error al obtener la IP del usuario:", error);
        userIp.value = "No disponible";
    }

    // Obtener información del dispositivo y navegador
    userDevice.value = navigator.platform || "No disponible";
    userBrowser.value = navigator.userAgent || "No disponible";

    // Obtener el acuerdo legal
    try {
        isLoadingAgreement.value = true;
        const response = await PageTemplateService.getLastTermsAndConditions();
        legalAgreement.value = decodeHTMLEntities(response.data.description);
        termsId.value = response.data.id;
    } catch (error) {
        console.error("Error al obtener el acuerdo legal:", error);
        errorMessage.value = "Error al obtener los Términos y Condiciones. Por favor, intente nuevamente refrescando o solicite un nuevo enlace de activación.";
    } finally {
        isLoadingAgreement.value = false;
    }
});

const decodeHTMLEntities = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

const activateUser = async () => {
    isActivating.value = true;
    errorMessage.value = "";
    const today = new Date().toISOString();

    try {
        await PageTemplateService.activateUser(token.value);
        await PageTemplateService.sendAceptedTermsAndConditions(termsId.value, userId.value, true, today);
        await PageTemplateService.sendSubdomainRequest(`editor${userId.value}00trial.weblox.io`, 'https://tilo.co/link/TWpFMU9RPT18MQ==', `${userStore.name}`, `${userStore.email}`, userId.value);
        activationSuccess.value = true;
        window.location.href = 'https://tilo.co/link/TWpFMU9RPT18MQ==';
    } catch (error) {
        console.error("Error al activar la cuenta:", error);
        errorMessage.value = "Error al activar la cuenta. Por favor, intente nuevamente refrescando o solicite un nuevo enlace de activación.";
    } finally {
        isActivating.value = false;
    }
};

const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.scrollHeight - target.scrollTop < (target.clientHeight + 200)) {
        termsRead.value = true;
    }
};
</script>

<template>
    <div class="flex h-screen min-h-full flex-1">
        <div class="flex flex-1 flex-col px-8 py-4 sm:px-6 lg:flex-none lg:w-[70%] lg:px-8 xl:px-8">
            <div class="mx-auto w-full">
                <div>
                    <div class="flex items-center justify-center">
                        <img class="h-10 w-auto" src="/img/logo-weblox.png" alt="Footprint Initiative" />
                        <span class="ml-1 text-[24px]">WEBLOX</span>
                    </div>
                    <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Activación de Cuenta <i class="fa fa-user-plus" aria-hidden="true"></i>
                    </h2>
                </div>

                <div class="mt-5">
                    <small>Nota: Cuando actives tu cuenta recibirás un enlace por email para crear tu página web en Weblox, como por ejemplo: editor000trial.weblox.io/login. Desde esa dirección podrás acceder a la plataforma y comenzar a diseñar tu sitio web. Tendrás un periodo gratuito de 3 días para explorar todas las funcionalidades. Pasado este tiempo, deberás adquirir Weblox para continuar utilizando el servicio.

Si deseas vincular un nombre real a tu sitio, como www.tusitioweb.com, deberás seguir las instrucciones de configuración por parte de soporte técnico.</small>
                </div>

                <div class="mt-5 px-16 py-4">
                    <div v-if="showTerms" class="text-center">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Términos y Condiciones de Uso de Weblox</h3>
                        <div v-if="isLoadingAgreement" class="text-center">
                            <p>Cargando Términos y Condiciones...</p>
                        </div>
                        <div v-else-if="legalAgreement" class="h-60 overflow-y-scroll border p-4 mb-4 text-left" @scroll="handleScroll">
                            <div v-html="legalAgreement"></div>
                         </div>
                        <div v-else class="text-center text-red-600">
                            <p>No se pudieron cargar los Términos y Condiciones. Por favor, intente nuevamente. Refresque el navegador.</p>
                        </div>
                        <div class="flex items-center justify-center mb-4">
                            <input type="checkbox" id="acceptTerms" v-model="termsAccepted" :disabled="!termsRead"
                                class="mr-2">
                            <label for="acceptTerms">He leído y acepto los Términos y Condiciones</label>
                        </div>
                        <p v-if="!termsRead" class="mb-4"><small class="text-[#ff0048]">Debes leer todos los Términos y Condiciones para poder aceptarlos, lleva el scroll hasta abajo.</small></p>
                        <button @click="activateUser" :disabled="!termsAccepted"
                            class="w-[200px] bg-fountain-blue-600 text-white py-2 px-4 rounded hover:bg-fountain-blue-500 disabled:opacity-50">
                            Activar Cuenta
                        </button>
                    </div>



                    <div v-if="isActivating" class="text-center">
                        <i class="fa fa-spinner fa-spin text-fountain-blue-500 text-4xl mb-4" aria-hidden="true"></i>
                        <p class="text-lg text-gray-600">Activando tu cuenta...</p>
                    </div>

                    <div v-else-if="activationSuccess" class="text-center">
                        <i class="fa fa-check-circle text-green-500 text-4xl mb-4" aria-hidden="true"></i>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">...Estamos redirigiéndote, por favor espera un momento. Revisa tu correo, te hemos enviado un email con tu subdominio.</h3>
                    </div>

                    <div v-else-if="errorMessage" class="text-center mt-4">
                        <i class="fa fa-exclamation-circle text-red-500 text-4xl mb-4" aria-hidden="true"></i>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Error de Activación</h3>
                        <p class="text-sm text-red-600 mb-4">
                            {{ errorMessage }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 h-full w-full object-cover" src="/img/login-picture.jpg" alt="" />
        </div>
    </div>
</template>