// Importa las dependencias necesarias de Pinia
import { defineStore } from 'pinia';
import PageTemplateService from '@/services/page_template';

// Define el store
export const useTemplateStore = defineStore('template_store', {
  state: () => ({
    isLoading: false,
    structure: {
      page_template: {}
    }
  }),
  getters: {
    // Aquí puedes añadir getters si necesitas calcular algún valor derivado del estado
  },
  actions: {
    async loadTemplateStructure(templateId: number) {
      this.isLoading = true;
      try {
          const data = await PageTemplateService.fetchPageTemplate(templateId);
          if (!data) {
              throw new Error('Failed to fetch page structure');
          }
          console.log('Loaded page structure:', data);
          this.structure = {
            page_template: {...data}
        };
      } catch (error) {
          console.error('Error loading the page structure:', error);
      } finally {
          this.isLoading = false;
      }
  },
    // Actualiza el estado de template
    updateTemplateStructure(sectionId: any, newTemplate: any) {
      const section = this.structure.page_template.sections.find(s => s.id === sectionId);
      if (section) {
        section.widget.element.template = newTemplate;
      }
    },
    // Selecciona el estado de template por ID
    selectTemplateStructure(sectionId: any) {
      const section = this.structure.page_template.sections.find(s => s.id === sectionId);
      if (section) {
        return section.widget.element.template;
      }
    },
    // Encuentra una sección por su ID y actualiza la sección completa
    updateSectionById(sectionId: any, newSectionData: any) {
      const sectionIndex = this.structure.page_template.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        this.structure.page_template.sections[sectionIndex] = {...this.structure.page_template.sections[sectionIndex], ...newSectionData};
      }
    },
    // Actualiza solo la posición de una sección específica
    updateSectionPosition(sectionId, newPosition) {
      const section = this.structure.page_template.sections.find(s => s.id === sectionId);
      if (section) {
        section.position = newPosition;
      }
    },
    // Actualiza solo el widget de una sección específica
    updateWidgetInSection(sectionId, newWidgetElementData) {
      const section = this.structure.page_template.sections.find(s => s.id === sectionId);
      if (section && section.widget) {
        section.widget.element = {...section.widget.element, ...newWidgetElementData};
      }
    },
    // Añadir una nueva sección
    addSection(component, position) {
        // Calculate the new position for the added section
        let newPosition = position;

        const newComponent = { 
          id: Math.random().toString(36).substr(2, 9),
          position: newPosition,
          widget: {
            id: Math.random().toString(36).substr(2, 9),
            name: component.name,
            element: {
              ...component.element
            }
          }
        }

        this.structure.page_template.sections.push(newComponent);

        // Update positions of other sections
        this.structure.page_template.sections.forEach((section) => {
            if (section.id !== this.structure.page_template.sections[this.structure.page_template.sections.length - 1].id) {
                if (section.position >= newPosition) {
                    section.position++;
                }
            }
        });

        this.matchPositionWithIndex();
    },
    // Eliminar una sección por ID
    removeSectionById(sectionId) {
        const sectionIndex = this.structure.page_template.sections.findIndex(s => s.id === sectionId);
        if (sectionIndex !== -1) {
            this.structure.page_template.sections.splice(sectionIndex, 1);
            this.structure.page_template.sections.forEach((section, index) => {
                section.position = index;
            });
        }
    },
    moveWidgetInSection(sectionId, direction) {
        const section = this.structure.page_template.sections.find(s => s.id === sectionId);
        if (section) {
            const currentPosition = section.position;
            const newPosition = direction === 'up' ? currentPosition - 1 : currentPosition + 1;
            
            // Check if it's the first element and trying to move up
            if (direction === 'up' && currentPosition === 0) {
                console.log('Cannot move up. It is the first element.');
                return;
            }
            
            // Check if it's the last element and trying to move down
            if (direction === 'down' && currentPosition === this.structure.page_template.sections.length - 1) {
                console.log('Cannot move down. It is the last element.');
                return;
            }
            
            section.position = newPosition;
            
            // Update positions of other sections
            this.structure.page_template.sections.forEach(s => {
                if (s.id !== sectionId) {
                    if (direction === 'up' && s.position === newPosition) {
                        s.position += 1;
                    } else if (direction === 'down' && s.position === newPosition) {
                        s.position -= 1;
                    }
                }
            });

            this.matchPositionWithIndex();
        }
    },
    matchPositionWithIndex() {
        this.structure.page_template.sections.sort((a, b) => a.position - b.position);
        console.log('Sorted sections:', this.structure.page_template.sections);
        this.structure.page_template.sections.forEach((section, index) => {
            section.position = index;
        });
    }
  },
  persist: true
});
