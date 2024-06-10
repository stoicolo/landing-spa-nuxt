import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Asegúrate de cambiar esto por la URL correcta de tu API.

interface Section {
    id: number;
    position: number;
    widget: {
        id: number;
        name: string;
        element: {
            backgroundImage: string;
            title: string;
            icon: string;
            template: string;
        };
    };
}

interface PageTemplate {
    id?: number | undefined;
    sections: Section[] | undefined;
}

class PageTemplateService {
    // Obtener un template por ID
    static async fetchPageTemplate(templateid: number = 0): Promise<PageTemplate | null> {
        try {
            // Asume que tienes el token guardado o accesible desde algún lugar seguro
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNzk4MzA0NiwiZXhwIjoxNzE3OTg0ODQ2LCJ0eXBlIjoiYWNjZXNzIn0.A9-Qqrc-g_3kARGXox6DpQ63FyLfcZVZkXBoCuBhRT0'; // Reemplaza con la forma de obtener tu token real
            let response = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            //TODO: deberiamos obtener este array de page_template en base al id del usuario
            response = await axios.get<PageTemplate[]>(`${baseURL}/v1/page_templates`, config);

            const templateSelected = response.data.find((template) => template.id === templateid);

            return templateSelected ? templateSelected : null;
        } catch (error) {
            console.error('Error fetching page template:', error);
            return null;
        }
    }

    // Crear un nuevo template
    static async createPageTemplate(userId: number, sections: Section[]): Promise<PageTemplate | null> {
        try {
            const response = await axios.post<PageTemplate>(`${baseURL}/v1/page_templates`, { userId, sections });
            return response.data;
        } catch (error) {
            console.error('Error creating page template:', error);
            return null;
        }
    }

    // Actualizar un template existente
    static async updatePageTemplate(id: number, sections: Section[]): Promise<PageTemplate | null> {
        try {
            const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxNzk4MzA0NiwiZXhwIjoxNzE3OTg0ODQ2LCJ0eXBlIjoiYWNjZXNzIn0.A9-Qqrc-g_3kARGXox6DpQ63FyLfcZVZkXBoCuBhRT0';
            let response = null;
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };
    
            const data = {sections: [...sections]};
    
            // Realizar la petición PATCH y obtener directamente la propiedad data del resultado
            const axiosResponse = await axios.patch<PageTemplate>(`${baseURL}/v1/page_templates/${id}`, data, config);
            response = axiosResponse.data; // Accediendo a los datos directamente
    
            return response;
        } catch (error) {
            console.error('Error updating page template:', error);
            return null;
        }
    }    

    // Eliminar un template
    static async deletePageTemplate(id: number): Promise<void> {
        try {
            await axios.delete(`${baseURL}/v1/page_templates/${id}`);
        } catch (error) {
            console.error('Error deleting page template:', error);
        }
    }
}

export default PageTemplateService;
