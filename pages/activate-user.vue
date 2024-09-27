<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import PageTemplateService from '@/services/page_template';

const route = useRoute();
const router = useRouter();

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

onMounted(async () => {
    token.value = route.query.token as string;
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

    console.log(userDevice.value);
    console.log(userBrowser.value);
    console.log(userIp.value);
});

const activateUser = async () => {
    isActivating.value = true;
    errorMessage.value = "";

    try {
        //await PageTemplateService.userAcceptedConditions(currentDate, userIp.value, userDevice.value, userBrowser.value);
        await PageTemplateService.activateUser(token.value);
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
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
        termsRead.value = true;
    }
};
</script>

<template>
    <div class="flex h-screen min-h-full flex-1">
        <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="mx-auto w-full max-w-sm lg:w-96">
                <div>
                    <div class="flex items-center">
                        <img class="h-28 w-auto" src="/img/logo-weblox.png" alt="Footprint Initiative" />
                        <span class="ml-1 text-[32px]">WEBLOX</span>
                    </div>
                    <h2 class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Activación de Cuenta <i class="fa fa-user-plus" aria-hidden="true"></i>
                    </h2>
                </div>

                <div class="mt-10">
                    <div v-if="showTerms" class="text-center">
                        <h3 class="text-lg font-medium text-gray-900 mb-2">Términos y Condiciones de Uso de Weblox</h3>
                        <div class="h-60 overflow-y-scroll border p-4 mb-4 text-left" @scroll="handleScroll">
                            <p class="text-sm mb-2"><strong>Fecha de Vigencia:</strong> {{ currentDate }}</p>

                            <h4 class="text-base font-semibold mb-2">1. Partes del Contrato</h4>
                            <p class="text-sm mb-2">El presente contrato de Términos y Condiciones de Uso (en adelante,
                                el "Contrato") es celebrado entre Softstoic Soluciones S.R.L., sociedad debidamente
                                constituida bajo las leyes de Costa Rica, propietaria de la plataforma Weblox (en
                                adelante, el "Proveedor"), y la persona que accede o utiliza los servicios ofrecidos por
                                el Proveedor (en adelante, el "Usuario").</p>

                            <h4 class="text-base font-semibold mb-2">2. Aceptación de los Términos</h4>
                            <p class="text-sm mb-2">Al acceder y utilizar los servicios proporcionados por el Proveedor
                                a través de la plataforma Weblox, el Usuario declara haber leído, comprendido y aceptado
                                en su totalidad los términos y condiciones establecidos en este Contrato. Si el Usuario
                                no está de acuerdo con alguno de los términos aquí expuestos, deberá abstenerse de
                                utilizar los servicios ofrecidos.</p>

                            <h4 class="text-base font-semibold mb-2">3. Objeto del Contrato</h4>
                            <p class="text-sm mb-2">El Proveedor ofrece al Usuario una plataforma en línea que permite
                                la creación de sitios web sin necesidad de conocimientos avanzados de programación (en
                                adelante, el "Servicio"). El presente Contrato regula el uso del Servicio por parte del
                                Usuario.</p>

                            <h4 class="text-base font-semibold mb-2">4. Registro y Cuenta de Usuario</h4>
                            <p class="text-sm mb-2">Para acceder al Servicio, el Usuario deberá crear una cuenta
                                proporcionando información veraz y actualizada. El Usuario es responsable de mantener la
                                confidencialidad de sus credenciales de acceso y de todas las actividades realizadas
                                bajo su cuenta. El Usuario se compromete a notificar al Proveedor de manera inmediata
                                sobre cualquier uso no autorizado de su cuenta o vulneración de seguridad.</p>

                            <h4 class="text-base font-semibold mb-2">5. Uso Adecuado del Servicio</h4>
                            <p class="text-sm mb-2">El Usuario se compromete a utilizar el Servicio de conformidad con
                                las leyes aplicables y los términos de este Contrato. Queda prohibido el uso del
                                Servicio para:</p>
                            <ul class="list-disc list-inside text-sm mb-2">
                                <li>Publicar contenido ilegal, ofensivo, difamatorio o que infrinja derechos de
                                    terceros.</li>
                                <li>Realizar actividades que puedan dañar, sobrecargar o perjudicar el funcionamiento
                                    del Servicio.</li>
                                <li>Intentar acceder sin autorización a cuentas de otros usuarios o sistemas
                                    informáticos del Proveedor.</li>
                            </ul>

                            <h4 class="text-base font-semibold mb-2">6. Contenido Generado por el Usuario</h4>
                            <p class="text-sm mb-2">El Usuario es el único responsable del contenido que publique,
                                cargue o transmita a través del Servicio. Al publicar contenido, el Usuario garantiza
                                que posee todos los derechos necesarios y que dicho contenido no infringe derechos de
                                terceros ni viola leyes aplicables. El Proveedor podrá, previa notificación al Usuario,
                                eliminar o bloquear el contenido que considere que incumple con estos términos o con
                                normativas legales.</p>

                            <h4 class="text-base font-semibold mb-2">7. Propiedad Intelectual</h4>
                            <p class="text-sm mb-2">Todos los derechos de propiedad intelectual relacionados con el
                                Servicio, incluyendo pero no limitándose a software, diseños, logotipos, textos y
                                gráficos, son propiedad del Proveedor o sus licenciantes. El Usuario se compromete a
                                respetar dichos derechos y a no reproducir, modificar, distribuir ni utilizar de manera
                                no autorizada el material protegido.</p>

                            <h4 class="text-base font-semibold mb-2">8. Disponibilidad y Modificaciones del Servicio
                            </h4>
                            <p class="text-sm mb-2">El Proveedor hará todos los esfuerzos razonables para mantener el
                                Servicio disponible de manera continua. No obstante, el Proveedor se reserva el derecho
                                de realizar mejoras, actualizaciones o modificaciones al Servicio. En caso de
                                interrupciones planificadas que puedan afectar significativamente al Usuario, el
                                Proveedor procurará informar al Usuario con antelación razonable.</p>

                            <h4 class="text-base font-semibold mb-2">9. Suspensión y Terminación del Servicio</h4>
                            <p class="text-sm mb-2">El Proveedor se reserva el derecho de suspender temporalmente el
                                acceso del Usuario al Servicio en caso de detectar actividades que puedan constituir una
                                violación a este Contrato o a la legislación aplicable. En casos graves o reiterados, el
                                Proveedor podrá proceder a la terminación definitiva del acceso al Servicio, notificando
                                al Usuario las razones que motivan dicha decisión.</p>

                            <h4 class="text-base font-semibold mb-2">10. Limitación de Responsabilidad</h4>
                            <p class="text-sm mb-2">Dentro de los límites permitidos por la ley, el Proveedor no será
                                responsable por daños indirectos, especiales o emergentes que pudieran derivarse del uso
                                o imposibilidad de uso del Servicio. La responsabilidad total del Proveedor hacia el
                                Usuario, por cualquier concepto, estará limitada al monto efectivamente abonado por el
                                Usuario al Proveedor en los doce (12) meses anteriores al evento que dio origen a la
                                reclamación.</p>

                            <h4 class="text-base font-semibold mb-2">11. Indemnización</h4>
                            <p class="text-sm mb-2">El Usuario se compromete a indemnizar y mantener indemne al
                                Proveedor, sus afiliados y empleados, frente a cualquier reclamo, demanda o acción legal
                                derivada del incumplimiento por parte del Usuario de este Contrato o de la violación de
                                derechos de terceros.</p>

                            <h4 class="text-base font-semibold mb-2">12. Modificaciones al Contrato</h4>
                            <p class="text-sm mb-2">El Proveedor se reserva el derecho de modificar los términos de este
                                Contrato. Cualquier modificación será notificada al Usuario a través de los medios de
                                contacto proporcionados o mediante su publicación en la plataforma. Las modificaciones
                                entrarán en vigor en un plazo de treinta (30) días desde su notificación. Si el Usuario
                                no está de acuerdo con las modificaciones, podrá rescindir el Contrato sin penalización
                                antes de la fecha de entrada en vigor de los cambios.</p>

                            <h4 class="text-base font-semibold mb-2">13. Ley Aplicable y Jurisdicción</h4>
                            <p class="text-sm mb-2">Este Contrato se regirá e interpretará de acuerdo con las leyes de
                                Costa Rica. Las partes se someten a la jurisdicción de los tribunales competentes de San
                                José, Costa Rica, para la resolución de cualquier controversia derivada del presente
                                Contrato.</p>

                            <h4 class="text-base font-semibold mb-2">14. Resolución de Disputas</h4>
                            <p class="text-sm mb-2">En caso de discrepancias o disputas, las partes se comprometen a
                                intentar resolverlas de manera amistosa y de buena fe. Si no se alcanza un acuerdo,
                                podrán optar por someter la controversia a mediación o arbitraje de conformidad con las
                                normas de la Cámara de Comercio de Costa Rica.</p>

                            <h4 class="text-base font-semibold mb-2">15. Política de Privacidad</h4>
                            <p class="text-sm mb-2">El uso del Servicio está sujeto a la Política de Privacidad del
                                Proveedor, la cual forma parte integral de este Contrato. Al utilizar el Servicio, el
                                Usuario acepta las prácticas de manejo de información descritas en dicha política.</p>

                            <h4 class="text-base font-semibold mb-2">16. Fuerza Mayor</h4>
                            <p class="text-sm mb-2">Ninguna de las partes será responsable por retrasos o
                                incumplimientos en sus obligaciones debido a causas fuera de su control razonable,
                                incluyendo pero no limitado a desastres naturales, actos gubernamentales, conflictos
                                laborales o interrupciones en servicios públicos.</p>

                            <h4 class="text-base font-semibold mb-2">17. Divisibilidad</h4>
                            <p class="text-sm mb-2">Si alguna disposición de este Contrato es declarada inválida o
                                inaplicable, las disposiciones restantes permanecerán en pleno vigor y efecto.</p>

                            <h4 class="text-base font-semibold mb-2">18. Acuerdo Completo</h4>
                            <p class="text-sm mb-2">Este Contrato constituye el acuerdo completo entre el Usuario y el
                                Proveedor con respecto al objeto del mismo, y reemplaza cualquier entendimiento o
                                acuerdo previo, ya sea oral o escrito.</p>

                            <h4 class="text-base font-semibold mb-2">19. Contacto</h4>
                            <p class="text-sm mb-2">Para cualquier consulta o comunicación relacionada con este
                                Contrato, el Usuario puede contactar al Proveedor a través de los medios disponibles en
                                la plataforma Weblox.</p>

                            <p class="text-sm mt-4 font-medium">Al utilizar el Servicio, el Usuario reconoce haber
                                leído, comprendido y aceptado los términos y condiciones establecidos en este Contrato.
                            </p>
                        </div>
                        <div class="flex items-center justify-center mb-4">
                            <input type="checkbox" id="acceptTerms" v-model="termsAccepted" :disabled="!termsRead"
                                class="mr-2">
                            <label for="acceptTerms">He leído y acepto los Términos y Condiciones</label>
                        </div>
                        <button @click="activateUser" :disabled="!termsAccepted"
                            class="w-full bg-fountain-blue-600 text-white py-2 px-4 rounded hover:bg-fountain-blue-500 disabled:opacity-50">
                            Activar Cuenta
                        </button>
                    </div>



                    <div v-if="isActivating" class="text-center">
                        <i class="fa fa-spinner fa-spin text-fountain-blue-500 text-4xl mb-4" aria-hidden="true"></i>
                        <p class="text-lg text-gray-600">Activando tu cuenta...</p>
                    </div>

                    <div v-else-if="activationSuccess" class="text-center">
                        <i class="fa fa-check-circle text-green-500 text-4xl mb-4" aria-hidden="true"></i>
                        <h3 class="text-lg font-medium text-gray-900 mb-2">¡Bienvenido a WEBLOX!</h3>
                        <p class="text-sm text-gray-600 mb-4">
                            Tu cuenta ha sido activada con éxito. Ahora puedes iniciar sesión y comenzar a usar nuestros
                            servicios.
                        </p>
                        <router-link to="/login"
                            class="text-fountain-blue-600 hover:text-fountain-blue-500 font-semibold">
                            Ir al inicio de sesión
                        </router-link>
                    </div>

                    <div v-else-if="errorMessage" class="text-center">
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