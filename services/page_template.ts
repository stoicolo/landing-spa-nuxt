import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Asegúrate de cambiar esto por la URL correcta de tu API.
const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTcxOTUzNTg2OCwiZXhwIjoxNzE5NTM3NjY4LCJ0eXBlIjoiYWNjZXNzIn0.zj84GKJqx2BJIJjknmpPfBuqfDP-7XQcxEPWfn3P4oU';

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

interface Page {
    id: number;
    templateId: number;
    userId: number;
    pageName: string;
    createdAt: string;
    updatedAt: string;
}

class PageTemplateService {
    static async fetchPage(pageName: string): Promise<Page | null> {
        try {
            let page = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };
            //TODO: fijo se va anecesitar pasarle el user ID aqui
            page = await axios.get<Page>(`${baseURL}/v1/pages/page/${pageName}`, config);
            

            return page ? page.data : null;
        } catch (error) {
            console.error('Error fetching page:', error);
            return null;
        }
    }
    // Obtener un template por ID
    static async fetchPageTemplate(userId: number = 0, pageName: string): Promise<PageTemplate | null> {
        try {
            let response = null;
            let page = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };
            //TODO, necesitamos el userID para saber de cual esuario obtener la page
            page = await this.fetchPage(pageName);

            response = await axios.get<PageTemplate>(`${baseURL}/v1/page_templates/${page?.templateId}`, config);

            return response ? response.data : null;
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

    //Obtener lista de backups
    static async getBackups(userId: number): Promise<any | null> {
        try {
            let response = null;
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            const data = {
                "userId": userId
              };

            response = await axios.post<any>(`${baseURL}/v1/page_template_backups/user`, data, config);
            console.log("Backups List", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error getting backups list:', error);
            return null;
        }
    }
    
    // Crear nuevo Backup
    static async backupPageTemplate(userId: number, sections: Section[], backupName: string, pageTemplateId: number, pageName: string): Promise<PageTemplate | null> {
        try {
            let response = null;
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };
    
            const data = {
                "userId": userId,
                "sections": [...sections],
                "backupName": backupName,
                "pageTemplateId": pageTemplateId,
                "pageName": pageName
              };
    
            // Realizar la petición PATCH y obtener directamente la propiedad data del resultado
            const axiosResponse = await axios.post<PageTemplate>(`${baseURL}/v1/page_template_backups`, data, config);
            response = axiosResponse.data; // Accediendo a los datos directamente
    
            return response;
        } catch (error) {
            console.error('Error backup page template:', error);
            return null;
        }
    }  

     //Obtener lista de backups
     static async removeBackupById(backupId: number): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'delete',
                url: `${baseURL}/v1/page_template_backups/id`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: {
                  pageTemplateBackupId: backupId
                }
              });
            console.log("Backups List", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error delete backups by id:', error);
            return null;
        }
    }

    
}

export default PageTemplateService;
