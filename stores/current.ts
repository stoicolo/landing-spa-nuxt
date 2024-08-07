export const useCurrentStore = defineStore("current", {
    state: () => ({
      userId: 0,
      websiteId: 1,
      pageId: 0,
      menuHeaderId: 0,
      pageTemplateId: 0,
      publishHistoryId: 0,
      domain: "test.com" //TODO: Obtener esto del dominio registrado, aun no existe el modulo para esto
    }),
    getters: {},
    actions: {
        setUserId(id: number) {
            this.userId = id;
        },
        setWebsiteId(id: number) {
            this.websiteId = id;
        },
        setPageId(id: number) {
            this.pageId = id;
        },
        setMenuHeaderId(id: number) {
            this.menuHeaderId = id;
        },
        setPageTemplateId(id: number) {
            this.pageTemplateId = id;
        },
        setDomain(domain: string) {
            this.domain = domain;
        },
        setPublishHistoryId(id: number) {
            this.publishHistoryId = id;
        }
    }
  });