import axios from 'axios';
interface Section {
    id: number;
    position: number;
    widget: {
        id: number;
        name: string;
        element: {
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
    private static authToken: string = '';
    private static baseURL: string = '';
    
    static set setAuthToken(token: string) {
        PageTemplateService.authToken = token;
    }

    static get setAuthToken(): string {
        return PageTemplateService.authToken;
    }

    static setBaseURL(url: string) {
        PageTemplateService.baseURL = url;
    }

    // Initialize the auth token
    static initAuthToken() {
        if (process.client) {
            PageTemplateService.authToken = localStorage.getItem('accessToken') || '';
        }
    }
    
    static async fetchPagesListByUserId(userId: number): Promise<Page[] | null> {
        try {
            let pages = null;

            const config = {
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                }
            };

            pages = await axios.get<Page[]>(`${PageTemplateService.baseURL}/pages/user/${userId}`, config);

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
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
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
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                }
            };

            page = await this.fetchPage(userId, pageId);

            if(page) {
                response = await axios.get<PageTemplate>(`${PageTemplateService.baseURL}/page_templates/${page?.templateId}`, config);
            } else {
                //TODO: Hacer un page de 404 para redirigir
                navigateTo("/");
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
                url: `${PageTemplateService.baseURL}/page_templates`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
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
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                }
            };
    
            const data = {sections: [...sections]};
    
            // Realizar la petición PATCH y obtener directamente la propiedad data del resultado
            const axiosResponse = await axios.patch<PageTemplate>(`${PageTemplateService.baseURL}/page_templates/${id}`, data, config);
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
            await axios.delete(`${PageTemplateService.baseURL}/page_templates/${id}`);
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
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                }
            };

            const data = {
                "userId": userId
              };

            response = await axios.post<any>(`${PageTemplateService.baseURL}/page_template_backups/user`, data, config);
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
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
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
            const axiosResponse = await axios.post<PageTemplate>(`${PageTemplateService.baseURL}/page_template_backups`, data, config);
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
                url: `${PageTemplateService.baseURL}/page_template_backups/id`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
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

    static async createWebSite(userId: number, websiteName: string, domain: string, slug: string): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/websites/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    userId,
                    websiteName,
                    domain,
                    slug
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
                url: `${PageTemplateService.baseURL}/pages/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
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

    //TODO: SACAR ESTA LOGICA A UN NUEVO SERVICIO DE MENU SERVICE

    static async createNewMenu(userId: number, websiteId: number, menuDetails: any): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/menus/create-menu-with-details/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    userId,
                    websiteId,
                    menuDetails
                }
              });
            console.log("New Menu Created", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error creating menu:', error);
            return null;
        }
    }

    static async getMenuHeader(userId: number, websiteId: number): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/menus/menu/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    userId,
                    websiteId
                }
              });
            console.log("Get Menu Header Success", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error getting menu header:', error);
            return null;
        }
    }

    static async getMenuByHeaderId(menuHeaderId: number): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/menus/get-menu-pages/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    menuHeaderId
                }
              });
            console.log("Get Menu Success", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error getting menu:', error);
            return null;
        }
    }

    static async updateMenuItem(websiteId: number, menuHeaderId: number, pageId: number, item: any): Promise<any | null> {
        try {
            let response = null;

            const itemData = {
                websiteId,
                menuHeaderId,
                pageId,
                href: `/builder/${pageId}`,
                ...item
            }

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/menus/menu-page/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: itemData
              });
            console.log("Update Menu Success", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error updating menu:', error);
            return null;
        }
    }

    static async updateAllMenu(menuHeaderId: number, menuPages: any[]): Promise<any | null> {
        try {
            let response = null;

            const itemData = {
                menuHeaderId,
                menuPages: [...menuPages]
            }

            response = await axios({
                method: 'Patch',
                url: `${PageTemplateService.baseURL}/menus/menu-pages-bulk/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: itemData
              });
            console.log("Update Menu Success", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error updating menu:', error);
            return null;
        }
    }

    static async getMenuList(websiteId: number, userId: number): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/menus/get-menu-with-details/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    websiteId,
                    userId
                }
              });
            console.log("Get Menu List Success", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error getting menu list:', error);
            return null;
        }
    }

    static async deleteMenuBulkOfItems(websiteId: number, menuHeaderId: number, itemsIds: any[]): Promise<any | null> {
        try {
            let response = null;

            const itemData = {
                websiteId,
                menuHeaderId,
                menuPagesIds: [...itemsIds]
            }

            response = await axios({
                method: 'Delete',
                url: `${PageTemplateService.baseURL}/menus/menu-pages-bulk/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: itemData
              });
            console.log("Delete Menu Bulk Success", response.data);
            return response ? response.data : null;
            
        } catch (error) {
            console.error('Error Delete Menu Bulk menu:', error);
            return null;
        }
    }

    //TODO: Sacar esto a un servicio de WEBSITE
    static async createPublishRequest(domain: string, websiteId: number, userId: number, menuHeaderId: number, isActive: boolean, isPublic: boolean): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/publish_histories/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    domain,
                    websiteId,
                    userId,
                    menuHeaderId,
                    isActive,
                    isPublic,
                    publishedAt: new Date().toISOString()
                }
            });
            console.log("Publish Request Created", response.data);
            return response ? response.data : null;

        } catch (error) {
            console.error('Error creating publish request:', error);
            return null;
        }
    }

    static async getPublishHistoryByWebsiteId(websiteId: number): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Post',
                url: `${PageTemplateService.baseURL}/publish_histories/website/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    websiteId
                }
            });
            console.log("Getting PublishHistory Success", response.data);
            return response ? response.data : null;

        } catch (error) {
            console.error('Error Getting PublishHistory:', error);
            return null;
        }
    }

    static async changeActiveSite(publishHistoryId: number, domain: string, isActive: boolean, isPublic: boolean, publishedAt: string): Promise<any | null> {
        try {
            let response = null;

            response = await axios({
                method: 'Patch',
                url: `${PageTemplateService.baseURL}/publish_histories/website/`,
                headers: {
                    'Authorization': `Bearer ${PageTemplateService.authToken}`
                },
                data: {
                    publishHistoryId,
                    domain,
                    isActive,
                    isPublic,
                    publishedAt
                }
            });
            console.log("Change Active Site Success", response.data);
            return response ? response.data : null;

        } catch (error) {
            console.error('Error changing active site:', error);
            return null;
        }
    }

    //TODO: SACAR ESTO A UN SERVICIO DE CLIENTE

    static async fetchClientSiteByDomain(domain: number): Promise<any | null> {
        try {
            let website = null;

            website = await axios.get<Page[]>(`${PageTemplateService.baseURL}/public_websites/domain/${domain}`,);

            return website.data ? website.data[0] : null;
            
        } catch (error) {
            console.error('Error fetching public website:', error);
            return null;
        }
    }

    //TODO: SACAR ESTO A UN SERVICIO DE iDrive

    static async getListOfImagesByWebsite(websiteId: number): Promise<any | null> {
        try {
          const response = await axios({
            method: 'GET',
            url: `${PageTemplateService.baseURL}/media/images`,
            params: { websiteId: websiteId },
            headers: {
              'Authorization': `Bearer ${PageTemplateService.authToken}`
            }
          });
          console.log("Getting images Success", response.data);
          return response.data;
        } catch (error) {
          console.error('Getting images Error:', error);
          throw error;
        }
      }

    static async saveImageiDrive(formData: any, websiteId: number, userId: number): Promise<any | null> {
        try {
          const imageFile = formData.get('image') as File;
          const imageType = imageFile.type === 'image/png' ? 'image/png' : 'image/jpeg';
          formData.append('imageType', imageType);
          formData.append('websiteId', websiteId);
          formData.append('userId', userId);
          const response = await axios({
            method: 'POST',
            url: `${PageTemplateService.baseURL}/media/images`,
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${PageTemplateService.authToken}`
            },
            data: formData
          });
          console.log("Uploading image Success", response.data);
          return response.data;
        } catch (error) {
          console.error('Error Uploading image:', error);
          throw error;
        }
      }

    
}

if (process.client) {
    PageTemplateService.initAuthToken();
}

export default PageTemplateService;
