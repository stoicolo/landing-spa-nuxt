<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTemplateService from '@/services/page_template';

interface TokenPayload {
  data: {
    isEmailVerified: boolean;
    id: number;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    role: string;
    updatedAt: string;
    createdAt: string;
  };
  iat: number;
  exp: number;
  type: string;
}

const route = useRoute();

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
const userName = ref('');
const userEmail = ref('');
const termsId = ref(0);

const showActivationPopup = ref(false);
const showScrollWarningPopup = ref(false);
const trialUrl = ref("");

onMounted(async () => {
    token.value = route.query.token as string;
    const decoded = decodeJWT(token.value);
    if (!decoded || !decoded.data) {
        errorMessage.value = "Token inválido. Por favor, solicite un nuevo enlace de activación.";
        return;
    }
    userId.value = decoded.data.id;
    userName.value = decoded.data.name;
    userEmail.value = decoded.data.email;

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

const closePopup = (type: 'activation' | 'warning') => {
    if (type === 'activation') {
        showActivationPopup.value = false;
    } else {
        showScrollWarningPopup.value = false;
    }
};

const handleNavigation = (type: 'buy' | 'trial') => {
    if (type === 'buy') {
        window.location.href = 'https://tilo.co/link/TWpFMU9RPT18MQ==';
    } else {
        window.location.href = `https://${trialUrl.value}/login`;
    }
};

const activateUser = async () => {
    isActivating.value = true;
    errorMessage.value = "";
    const today = new Date().toISOString();

    try {
        await PageTemplateService.activateUser(token.value);
        await PageTemplateService.sendAceptedTermsAndConditions(termsId.value, userId.value, true, today);
        await PageTemplateService.sendSubdomainRequest(`editor${userId.value}00trial.weblox.io`, 'https://tilo.co/link/TWpFMU9RPT18MQ==', `${userName.value}`, `${userEmail.value}`, userId.value);
        activationSuccess.value = true;
        trialUrl.value = `editor${userId.value}00trial.weblox.io`;
        showActivationPopup.value = true;
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

const handleTermsAcceptance = () => {
    if (!termsRead.value) {
        termsAccepted.value = false;
        showScrollWarningPopup.value = true;
        return;
    }
    termsAccepted.value = !termsAccepted.value;
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
                            <input 
                                type="checkbox" 
                                id="acceptTerms" 
                                :checked="termsAccepted"
                                @change="handleTermsAcceptance"
                                class="mr-2"
                            >
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
        <!-- Popup de Advertencia de Scroll -->
        <div v-if="showScrollWarningPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md">
                <div class="text-center">
                    <i class="fa fa-exclamation-circle text-yellow-500 text-4xl mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        Lectura Incompleta
                    </h3>
                    <p class="text-gray-600 mb-6">
                        Debes leer los términos y condiciones completamente antes de poder aceptarlos. 
                        Por favor, desliza hasta el final del documento.
                    </p>
                    <button 
                        @click="closePopup('warning')"
                        class="bg-fountain-blue-600 text-white py-2 px-6 rounded hover:bg-fountain-blue-500"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        </div>

        <!-- Popup de Activación Exitosa -->
        <div v-if="showActivationPopup" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md">
                <div class="text-center">
                    <i class="fa fa-check-circle text-green-500 text-4xl mb-4"></i>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        ¡Cuenta Activada Exitosamente!
                    </h3>
                    <p class="text-gray-600 mb-6">
                        Tu cuenta ha sido activada. ¿Qué te gustaría hacer ahora?
                    </p>
                    <div class="flex flex-col space-y-4">
                        <button 
                            @click="handleNavigation('buy')"
                            class="bg-fountain-blue-600 text-white py-2 px-6 rounded hover:bg-fountain-blue-500"
                        >
                            Comprar Weblox
                        </button>
                        <button 
                            @click="handleNavigation('trial')"
                            class="border border-fountain-blue-600 text-fountain-blue-600 py-2 px-6 rounded hover:bg-gray-50"
                        >
                            Ir a mi sitio de prueba
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative hidden w-0 flex-1 lg:block">
            <img class="absolute inset-0 h-full w-full object-cover" src="/img/login-picture.jpg" alt="" />
        </div>
    </div>
</template>