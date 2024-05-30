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
    addSection(position) {
      this.structure.structure.page_template.sections.push(
        {
            "id": Math.random().toString(36).substr(2, 9),
            "position": position,
            "widget": {
              "id": Math.random().toString(36).substr(2, 9),
              "name": "header",
              "element": {
                "backgroundImage": "https://via.placeholder.com/1200x300",
                "title": "New Header",
                "icon": "https://via.placeholder.com/150"
              }
            }
          }
      );
    },
    // Eliminar una sección por ID
    removeSectionById(sectionId) {
      const sectionIndex = this.structure.structure.page_template.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        this.structure.structure.page_template.sections.splice(sectionIndex, 1);
      }
    },
    moveWidgetInSection(sectionId, direction) {
        const sectionIndex = this.structure.structure.page_template.sections.findIndex(s => s.id === sectionId);
        if (sectionIndex !== -1) {
            const section = this.structure.structure.page_template.sections[sectionIndex];
            const newPosition = direction === 'up' ? section.position - 1 : section.position + 1;
            
            // Check if it's the first element and trying to move up
            if (direction === 'up' && sectionIndex === 0) {
                console.log('Cannot move up. It is the first element.');
                return;
            }
            
            // Check if it's the last element and trying to move down
            if (direction === 'down' && sectionIndex === this.structure.structure.page_template.sections.length - 1) {
                console.log('Cannot move down. It is the last element.');
                return;
            }
            
            section.position = newPosition;
            
            // Update positions of other sections
            this.structure.structure.page_template.sections.forEach((s, index) => {
                if (s.id !== sectionId) {
                    if (direction === 'up' && s.position === newPosition) {
                        s.position += 1;
                    } else if (direction === 'down' && s.position === newPosition) {
                        s.position -= 1;
                    }
                }
            });
        }
    }
  },
  persist: true
});
