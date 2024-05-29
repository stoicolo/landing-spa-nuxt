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
import { useTemplateStore } from '~/stores/template';

export default {
    name: 'Builder',
    setup() {
        const templateStore = useTemplateStore();
        const sortedSections = computed(() => {
            if (!templateStore.structure.structure || !templateStore.structure.structure.page_template || !templateStore.structure.structure.page_template.sections) {
                console.log("Estructura no definida o incompleta");
                return [];
            }
            return templateStore.structure.structure.page_template.sections.sort((a, b) => a.position - b.position);
        });

        function getComponent(widgetName, element) {
            return defineAsyncComponent(() =>
                import(`@/components/sections/${widgetName}.vue`)
                    .catch(error => {
                        console.error('Failed to load component:', error);
                        // Puedes manejar el componente de error como fallback aquí
                    })
            );
        }

        return { sortedSections, getComponent };
    }
};
</script>