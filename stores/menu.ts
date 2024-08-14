import { defineStore } from 'pinia';
import PageTemplateService from '@/services/page_template';
import { useUserStore } from '~/stores/user';
import { useCurrentStore } from '~/stores/current';

//TODO: Crear un modelo separado
interface MenuItem {
  menuName: string;
  href?: string;
  iconName?: string;
  target?: string;
  order: number;
  current?: boolean;
  slug?: string;
  subitems?: MenuItem[];
}

const currentStore = useCurrentStore();
const userStore = useUserStore();

//Agrego el current user id al current store
currentStore.setUserId(parseInt(userStore.id));

export const useMenuStore = defineStore('menu', {
  state: () => ({
    navigation: [
      { menuName: "Dashboard", href: "/builder/1", iconName: "HomeIcon", current: false, order: 0 },
      { menuName: "Respaldos", href: "/backups", iconName: "DocumentDuplicateIcon", current: false, order: 1 },
      { menuName: "Menu", href: "#", iconName: "Bars3Icon", current: false, order: 2 },
    ] as MenuItem[],
    menu: [] as MenuItem[]
  }),
  getters: {
    sortedNavigation: (state) => [...state.navigation].sort((a, b) => a.order - b.order),
    sortedMenu: (state) => [...state.menu].sort((a, b) => a.order - b.order)
  },
  actions: {
    async loadMenu() {
      if (!currentStore.menuHeaderId) {
        //Si no existe un menuHeaderId en el currentStore, lo busco y lo guardo
        const menuHeaderLoaded = await PageTemplateService.getMenuHeader(currentStore.userId, currentStore.websiteId);
        currentStore.setMenuHeaderId(menuHeaderLoaded[0].id);
      }
    },

    setActiveMenu(path: string) {
      debugger;
      this.navigation.forEach((item) => {
        item.current = path === item.href;
      });
      this.menu.forEach((item) => {
        item.current = path === item.href;
      });
    },

    async addMenuItem(item: MenuItem) {
      let newPageTemplate;
      let newPage;
      let newItemMenu;
      try {
        newPageTemplate = await PageTemplateService.createPageTemplate(currentStore.userId, []);
      } catch(error){
        console.error('Error creating new Page Template:', error);
      }
      try {
        newPage = await PageTemplateService.createNewPage(currentStore.userId, newPageTemplate?.id ? newPageTemplate?.id : 0, item.menuName, currentStore.websiteId);
      } catch(error){
        console.error('Error creating new Page:', error);
      }
      try {
        //Creo un nuevo item en el menu, se lo asigno al menu y redirijo a la pagina de builder
        newItemMenu = await PageTemplateService.updateMenu(currentStore.websiteId, currentStore.menuHeaderId, newPage?.id, item);

        if(newItemMenu){
          //Agrego el nuevo item al menu y asigno el href con el id de la pagina creada
          this.menu.push({...item, href: `/builder/${newItemMenu.id}`});
        }

        if (newPage) {
          navigateTo("/builder/" + newPage.id);
        }

      } catch(error) {
        console.error('Error creating new Item Menu:', error);
      }
    },

    getCombinedNavigation() {
      return [...this.sortedNavigation, ...this.sortedMenu];
    },

    async createFirstPageAndMenuItem(item: MenuItem) {
        try {
            //Creo todos los datos de un nuevo website
            const newWebSite = await PageTemplateService.createWebSite(currentStore.userId);
            const newPageTemplate = await PageTemplateService.createPageTemplate(currentStore.userId, []);
            const newPage = await PageTemplateService.createNewPage(currentStore.userId, newPageTemplate?.id ? newPageTemplate?.id : 0, item.menuName, newWebSite?.id);
            const newMenu = await PageTemplateService.createNewMenu(currentStore.userId, newWebSite?.id, [{...item, pageId: newPage?.id}]);
            
            //Seteo todos los valores en el current store
            currentStore.setWebsiteId(newWebSite?.id);
            currentStore.setPageTemplateId(newPageTemplate?.id ? newPageTemplate?.id : 0);
            currentStore.setPageId(newPage?.id ? newPage?.id : 0);
            currentStore.setMenuHeaderId(newMenu.menuHeader);

            console.log("newMenu::", newMenu);
            //Agrego el nuevo item default "Inicio" al menu
            this.menu.push(newMenu.menuDetails[0]);

            //Redirijo a la pagina de builder con el id de la pagina defailt "Inicio"
            if (newPage) {
                navigateTo("/builder/" + newPage.id);
            }
        } catch (error) {
            console.error('Error creating page:', error);
        }
    },

    setMenuList(items: MenuItem[]){
      this.menu = [];
      items.forEach(item => {
        const itemMenuValue = {...item, current: false};
        this.menu.push(itemMenuValue);
      });
    },
  }
});