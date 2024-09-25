<template>
    <div class="flex min-h-screen">
      <div class="flex-1 flex flex-col justify-center px-4 py-2 overflow-y-auto">
        <div class="w-full mx-auto max-w-3xl">
          <div>
            <div class="flex items-center justify-center mb-8 bg-[#ccc] p-4">
              <img class="h-24 w-auto" src="/img/weblox-logo-name.png" alt="Weblox Logo" />
            </div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              ¡Felicidades! 🎉
            </h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Has desbloqueado un mundo de posibilidades con Weblox
            </p>
            
            <!-- Botón de soporte arriba -->
            <div class="mt-8 flex justify-center">
              <a 
                href="https://wa.me/50663469873" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Contactar Soporte
              </a>
            </div>
          </div>
  
          <div class="mt-10 space-y-6">
            <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4">
              <p class="text-sm font-semibold text-yellow-700">
                ¡Bienvenido al club de los creadores web exitosos! Con Weblox, ahora puedes:
              </p>
              <ul class="mt-2 list-disc list-inside text-sm text-yellow-600">
                <li>Crear sitios web impresionantes sin conocimientos de programación</li>
                <li>Lanzar tu negocio en línea en cuestión de minutos</li>
                <li>Personalizar tu sitio con nuestra biblioteca de plantillas profesionales</li>
                <li>Atraer más clientes con un diseño adaptable a todos los dispositivos.</li>
                <li>Expandir tu presencia en línea sin límites</li>
              </ul>
            </div>
  
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Siguiente paso: Configurar tu dominio</h3>
              <p class="mt-1 text-sm text-gray-600">Estás a un paso de tener tu sitio web en línea. Sigue estas instrucciones para vincular tu dominio a Weblox:</p>
            </div>
  
            <div class="bg-gray-100 p-4 rounded-md">
              <ol class="list-decimal list-inside text-sm text-gray-700">
                <li class="mb-2">Agrega un registro CNAME para 'www' apuntando a <span class="font-mono bg-gray-200 px-1 py-0.5 rounded text-xs">landing-spa-nuxt.onrender.com</span></li>
                <li class="mb-2">Para el dominio raíz, agrega un registro ANAME o ALIAS apuntando a <span class="font-mono bg-gray-200 px-1 py-0.5 rounded text-xs">landing-spa-nuxt.onrender.com</span></li>
                <li>Si tu proveedor DNS no soporta registros ANAME o ALIAS, usa un registro A apuntando a <span class="font-mono bg-gray-200 px-1 py-0.5 rounded text-xs">216.24.57.1</span></li>
              </ol>
              <p class="text-xs italic mt-2 text-red-600">Nota: Los cambios en DNS pueden tardar hasta 48 horas en propagarse completamente.</p>
            </div>
  
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Video tutorial</h3>
              <div class="mt-2 aspect-w-16 aspect-h-9">
                <iframe 
                  src="https://www.youtube.com/embed/VIDEO_ID" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen
                  class="rounded-md shadow"
                ></iframe>
              </div>
            </div>
  
            <div>
              <h3 class="text-lg font-medium leading-6 text-gray-900">Instrucciones por proveedor</h3>
              <div class="mt-2 space-y-2">
                <details class="bg-white border border-gray-200 rounded-lg">
                  <summary class="px-4 py-2 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">GoDaddy</summary>
                  <div class="px-4 py-2">
                    <ol class="list-decimal list-inside text-sm text-gray-700">
                      <li>Inicia sesión en tu cuenta de GoDaddy</li>
                      <li>Ve a "Mis productos" y selecciona tu dominio</li>
                      <li>Haz clic en "Administrar DNS"</li>
                      <li>Agrega un registro CNAME con host 'www' y apunta a landing-spa-nuxt.onrender.com</li>
                      <li>Para el dominio raíz, agrega un registro A apuntando a 216.24.57.1</li>
                    </ol>
                  </div>
                </details>
                <details class="bg-white border border-gray-200 rounded-lg">
                  <summary class="px-4 py-2 cursor-pointer font-medium bg-gray-50 hover:bg-gray-100 transition-colors">Namecheap</summary>
                  <div class="px-4 py-2">
                    <ol class="list-decimal list-inside text-sm text-gray-700">
                      <li>Inicia sesión en tu cuenta de Namecheap</li>
                      <li>Ve a "Domain List" y haz clic en "Manage" junto a tu dominio</li>
                      <li>Ve a la pestaña "Advanced DNS"</li>
                      <li>Agrega un registro CNAME con host 'www' y valor landing-spa-nuxt.onrender.com</li>
                      <li>Para el dominio raíz, agrega un registro A con host '@' y valor 216.24.57.1</li>
                    </ol>
                  </div>
                </details>
              </div>
            </div>
  
            <div>
              <p class="text-sm text-gray-600 mb-2">¿Necesitas ayuda? Nuestro equipo de soporte está listo para asistirte.</p>
              <div class="flex justify-center">
                <a 
                  href="https://wa.me/50663469873" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Contactar Soporte
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block lg:w-1/3 relative">
    <div class="fixed inset-y-0 right-0 w-1/3">
      <div class="absolute inset-0 bg-[#1d1d1d] flex items-center justify-center">
        <img
          class="h-[500px] w-[300px] object-contain"
          src="/img/treje_espacial_transparencia.png"
          alt="Jetpack"
        />
      </div>
    </div>
  </div>
    </div>
  </template>
  
  <script setup lang="ts">
  // Aquí puedes agregar cualquier lógica necesaria para la página
  </script>
  
  <style scoped>
  /* Estilos adicionales si son necesarios */
  </style>