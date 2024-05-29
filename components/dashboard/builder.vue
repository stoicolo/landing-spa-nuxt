<template>
    <div>
        <template v-for="(section, index) in sortedSections" :key="section.id">
            <component v-if="section.widget && section.widget.element"
                :is="getComponent(section.widget.name, section.widget.element)" v-bind="section.widget.element" />
        </template>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    name: 'Builder',
    props: {
        structure: {
            type: Object,
            required: true
        }
    },
    computed: {
        sortedSections() {
            if (!this.structure || !this.structure.page_template || !this.structure.page_template.sections) {
                console.log("Estructura no definida o incompleta");
                return [];
            }
            return this.structure.page_template.sections.sort((a, b) => a.position - b.position);
        }
    },
    methods: {
        getComponent(widgetName, element) {
            // Uso de defineAsyncComponent para manejar la carga dinámica
            return defineAsyncComponent(() =>
                import(`@/components/sections/${widgetName}.vue`)
                    .catch(error => {
                        console.error('Failed to load component:', error);
                        //return import('@/components/ErrorComponent.vue'); // Componente de error como fallback
                    })
            );
        }
    }
};
</script>