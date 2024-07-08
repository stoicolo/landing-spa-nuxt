import { defineStore } from 'pinia';
import PageTemplateService from '@/services/page_template';
import { useUserStore } from '~/stores/user';

interface MenuItem {
  name: string;
  href: string;
  iconName?: string;
  target?: string;
  order: number;
  current: boolean;
  subitems?: MenuItem[];
}

export const useMenuStore = defineStore('menu', {
  state: () => ({
    navigation: [
      { name: "Dashboard", href: "#", iconName: "HomeIcon", current: true, order: 0 },
      { name: "Reportes", href: "#", iconName: "CursorArrowRippleIcon", current: false, order: 1 },
      { name: "Menu", href: "#", iconName: "Bars3Icon", current: false, order: 2 },
    ] as MenuItem[],
    menu: [] as MenuItem[]
  }),
  getters: {
    sortedNavigation: (state) => [...state.navigation].sort((a, b) => a.order - b.order),
    sortedMenu: (state) => [...state.menu].sort((a, b) => a.order - b.order)
  },
  actions: {
    loadMenu() {
      // Lógica para cargar el menú puede ser implementada aquí
      console.log('Menu loaded');
    },
    addMenuItem(item: MenuItem) {
      this.saveNewItemOnDB(item);
      this.menu.push(item);
    },
    getCombinedNavigation() {
      return [...this.sortedNavigation, ...this.sortedMenu];
    },
    setCurrentNavigationItem(name: string) {
      this.navigation.forEach(item => {
        item.current = item.name === name;
      });
    },
    async saveNewItemOnDB(item: MenuItem) {
        const userStore = useUserStore();
        debugger;
        const currentUser = parseInt(userStore.id);
        debugger;
        try {
            const newWebSite = await PageTemplateService.createWebSite(currentUser);
            const newPageTemplate = await PageTemplateService.createPageTemplate(currentUser, []);
            const newPage = await PageTemplateService.createNewPage(currentUser, newPageTemplate?.id ? newPageTemplate?.id : 0, item.name, newWebSite?.id);

            if (newPage) {
                navigateTo("/builder/" + newPage.id);
            }
        } catch (error) {
            console.error('Error creating page:', error);
        }
    }
  }
});