import axios from 'axios';

const baseURL = 'http://localhost:4000'; // Asegúrate de cambiar esto por la URL correcta de tu API.
const accessToken = useCookie('accessToken')
const authToken = accessToken.value;

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
    static async fetchPagesListByUserId(userId: number): Promise<Page[] | null> {
        try {
            let pages = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            pages = await axios.get<Page[]>(`${baseURL}/v1/pages/user/${userId}`, config);

            return pages.data ? pages.data : null;
            
        } catch (error) {
            console.error('Error fetching page:', error);
            return null;
        }
    }
    static async fetchPage(userId: number, pageId: number): Promise<Page | null> {
        try {
            let pages = null;
            let page = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            pages = await this.fetchPagesListByUserId(userId);
            page = pages?.find((p: Page) => p.id === pageId);

            return page ? page : null;
        } catch (error) {
            console.error('Error fetching page:', error);
            return null;
        }
    }
    // Obtener un template por ID
    static async fetchPageTemplate(userId: number = 0, pageId: number): Promise<PageTemplate | null> {
        try {
            let response = null;
            let page = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            page = await this.fetchPage(userId, pageId);

            if(page) {
                response = await axios.get<PageTemplate>(`${baseURL}/v1/page_templates/${page?.templateId}`, config);
            } else {
                //TODO: Hacer un page de 404 para redirigir
                navigateTo("/builder/2");
            }

            return response ? response.data : null;
        } catch (error) {
            console.error('Error fetching page template:', error);
            return null;
        }
    }

    // Crear un nuevo template
    static async createPageTemplate(userId: number, sections: Section[]): Promise<PageTemplate | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${baseURL}/v1/page_templates`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: {
                    userId,
                    sections
                }
              });
            console.log("New Page Template Created", response.data);
            return response ? response.data : null;
            
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
    static async backupPageTemplate(userId: number, sections: Section[], backupName: string, pageTemplateId: number, pageId: number): Promise<PageTemplate | null> {
        try {
            let response = null;
            let page = null;
    
            const config = {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            };

            page = await this.fetchPage(userId, pageId);
    
            const data = {
                "userId": userId,
                "sections": [...sections],
                "backupName": backupName,
                "pageTemplateId": pageTemplateId,
                "pageName": page?.pageName
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

    //TODO: SACAR ESTA LOGICA A UN NUEVO SERVICIO DE WEBPAGE SERVICE

    static async createWebSite(userId: number, websiteName: string = "Default Page"): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${baseURL}/v1/websites/`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: {
                    userId,
                    websiteName
                }
              });
            console.log("New Site Created", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error creating site:', error);
            return null;
        }
    }

    //TODO: SACAR ESTA LOGICA A UN NUEVO SERVICIO DE PAGE SERVICE

    static async checkIfPageExist(pageId: number, userId: number) {
        let listPages = null;
        let pageExists = null;
        try {
            listPages = await this.fetchPagesListByUserId(userId);
        } catch (error) {
            console.log("No hay paginas para este usuario");
        }
        
        if(listPages){
            pageExists = listPages?.filter((page: Page) => page.id === pageId || page.pageName === 'Inicio');
        }
        
        return pageExists;
    }

    static async createNewPage(userId: number, templateId: number, pageName: string, websiteId: number): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${baseURL}/v1/pages/`,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                data: {
                    userId,
                    templateId,
                    pageName,
                    websiteId
                }
              });
            console.log("New Page Created", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error creating page:', error);
            return null;
        }
    }

    
}

export default PageTemplateService;
