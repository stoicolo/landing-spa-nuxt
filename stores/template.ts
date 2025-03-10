import { defineStore } from 'pinia';
import PageTemplateService from '@/services/page_template';
import { useCurrentStore } from '~/stores/current';

// TODO: Sacar modelos de aqui
interface Section {
  id: string | number;
  position: number;
  widget: {
    id: string | number;
    name: string;
    element: {
      template: any;
      [key: string]: any;
    };
  };
}

interface PageTemplate {
  id?: number;
  sections?: Section[];
}

interface TemplateState {
  isLoading: boolean;
  structure: {
    page_template: PageTemplate;
  };
}

export const useTemplateStore = defineStore('template_store', {
  state: (): TemplateState => ({
    isLoading: false,
    structure: {
      page_template: {
        sections: []
      }
    }
  }),

  actions: {
    async loadTemplateStructure(pageId: number = 0, userId: number = 0) {
      this.isLoading = true;

      try {
        const data = await PageTemplateService.fetchPageTemplate(userId, pageId);

        if (!data) {
          throw new Error('Failed to fetch page structure');
        }

        

        const currentStore = useCurrentStore();
        currentStore.setPageTemplateId(data.id ? data.id : 0);

        this.structure.page_template = {
          ...data,
          sections: Array.isArray(data.sections) ? data.sections : []
        };

      } catch (error) {
        console.error('Error loading the page structure:', error);
      } finally {
        this.isLoading = false;
      }
    },

    updateTemplateStructure(sectionId: string | number, newTemplate: any) {
      const section = this.structure.page_template.sections?.find(s => s.id === sectionId);
      if (section) {
        section.widget.element.template = newTemplate;
      }
    },

    selectTemplateStructure(sectionId: string | number) {
      const section = this.structure.page_template.sections?.find(s => s.id === sectionId);
      return section?.widget.element.template;
    },

    updateSectionById(sectionId: string | number, newSectionData: Partial<Section>) {
      const sectionIndex = this.structure.page_template.sections?.findIndex(s => s.id === sectionId);
      if (sectionIndex !== undefined && sectionIndex !== -1) {
        this.structure.page_template.sections![sectionIndex] = {
          ...this.structure.page_template.sections![sectionIndex],
          ...newSectionData
        };
      }
    },

    updateSectionPosition(sectionId: string | number, newPosition: number) {
      const section = this.structure.page_template.sections?.find(s => s.id === sectionId);
      if (section) {
        section.position = newPosition;
      }
    },

    // updateWidgetInSection(sectionId: string | number, newWidgetElementData: Partial<Section['widget']['element']>) {
    //   const section = this.structure.page_template.sections?.find(s => s.id === sectionId);
    //   if (section && section.widget) {
    //     section.widget.element = {...section.widget.element, ...newWidgetElementData};
    //   }
    // },

    updateWidgetInSection(sectionId: string | number, newWidgetElementData: Partial<Section['widget']['element']>) {
      const section = this.structure.page_template.sections?.find(s => s.id === sectionId);
      if (section && section.widget) {
        Object.entries(newWidgetElementData).forEach(([key, value]) => {
          if (key.includes('[') && key.includes(']')) {
            // Handle nested array properties
            const [arrayProp, indexStr, subProp] = key.match(/(\w+)\[(\d+)\]\.(\w+)/)?.slice(1) || [];
            if (arrayProp && indexStr && subProp) {
              const index = parseInt(indexStr, 10);
              if (!Array.isArray(section.widget.element[arrayProp])) {
                section.widget.element[arrayProp] = [];
              }
              if (!section.widget.element[arrayProp][index]) {
                section.widget.element[arrayProp][index] = {};
              }
              section.widget.element[arrayProp][index][subProp] = value;
            }
          } else {
            // Handle simple properties
            section.widget.element[key] = value;
          }
        });
      }
    },

    addSection(component: { name: string; element: any }, position: number) {
      const newSection: Section = {
        id: Math.random().toString(36).substr(2, 9),
        position,
        widget: {
          id: Math.random().toString(36).substr(2, 9),
          name: component.name,
          element: {...component.element}
        }
      };

      if (!this.structure.page_template.sections) {
        this.structure.page_template.sections = [];
      }

      this.structure.page_template.sections.push(newSection);

      this.structure.page_template.sections.forEach((section) => {
        if (section.id !== newSection.id && section.position >= position) {
          section.position++;
        }
      });

      this.matchPositionWithIndex();
    },

    removeSectionById(sectionId: string | number) {
      if (!this.structure.page_template.sections) return;

      const sectionIndex = this.structure.page_template.sections.findIndex(s => s.id === sectionId);
      if (sectionIndex !== -1) {
        this.structure.page_template.sections.splice(sectionIndex, 1);
        this.structure.page_template.sections.forEach((section, index) => {
          section.position = index;
        });
      }
    },

    moveWidgetInSection(sectionId: string | number, direction: 'up' | 'down') {
      if (!this.structure.page_template.sections) return;

      const section = this.structure.page_template.sections.find(s => s.id === sectionId);
     
      if (section) {
        const currentPosition = section.position;
        const newPosition = direction === 'up' ? currentPosition - 1 : currentPosition + 1;
        
        if (direction === 'up' && currentPosition === 0) {
          return;
        }
        
        if (direction === 'down' && currentPosition === this.structure.page_template.sections.length - 1) {
          return;
        }
        
        section.position = newPosition;
        
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
      if (this.structure.page_template.sections) {
        this.structure.page_template.sections.sort((a, b) => a.position - b.position);
        
        this.structure.page_template.sections.forEach((section, index) => {
          section.position = index;
        });
      }
    }
  }
});