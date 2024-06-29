import { defineStore } from 'pinia';

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
      this.menu.push(item);
    },
    getCombinedNavigation() {
      return [...this.sortedNavigation, ...this.sortedMenu];
    },
    setCurrentNavigationItem(name: string) {
      this.navigation.forEach(item => {
        item.current = item.name === name;
      });
    }
  }
});