// Importa las dependencias necesarias de Pinia
import { defineStore } from 'pinia'

// Define el store
export const useTemplateStore = defineStore('template_store', {
  state: () => ({
    isLoading: false,
    structure: {
      page_template: {
        id: 0,
        sections: []
      }
    }
  }),
  getters: {
    // Aquí puedes añadir getters si necesitas calcular algún valor derivado del estado
  },
  actions: {
    async loadTemplateStructure() {
        this.isLoading = true;
        try {
            const response = await fetch('mocks/template_mock.json'); // Cambiar para obtener de BD
            if (!response.ok) {
              throw new Error('Failed to fetch page structure');
            }
            const data = await response.json();
            this.structure = data;
            this.isLoading = false;
          } catch (error) {
            console.error('Error loading the page structure:', error);
          }
    },
    // Encuentra una sección por su ID y actualiza la sección completa
    updateSectionById(sectionId, newSectionData) {
      const sectionIndex = this.structure.structure.page_template.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        this.structure.structure.page_template.sections[sectionIndex] = {...this.structure.structure.page_template.sections[sectionIndex], ...newSectionData};
      }
    },
    // Actualiza solo la posición de una sección específica
    updateSectionPosition(sectionId, newPosition) {
      const section = this.structure.structure.page_template.sections.find(s => s.id === sectionId);
      if (section) {
        section.position = newPosition;
      }
    },
    // Actualiza solo el widget de una sección específica
    updateWidgetInSection(sectionId, newWidgetElementData) {
      const section = this.structure.structure.page_template.sections.find(s => s.id === sectionId);
      if (section && section.widget) {
        section.widget.element = {...section.widget.element, ...newWidgetElementData};
      }
    },
    // Añadir una nueva sección
    addSection(newSection) {
      this.structure.structure.page_template.sections.push(newSection);
    },
    // Eliminar una sección por ID
    removeSectionById(sectionId) {
      const sectionIndex = this.structure.structure.page_template.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        this.structure.structure.page_template.sections.splice(sectionIndex, 1);
      }
    }
  },
  persist: true
});
