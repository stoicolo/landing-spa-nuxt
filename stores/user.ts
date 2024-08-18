import { defineStore } from 'pinia'

interface UserState {
  id: string;
  email: string;
  name: string;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    id: "",
    email: "",
    name: ""
  }),
  getters: {
    isAuthenticated(): boolean {
      return !!this.id
    }
  },
  actions: {
    setUser(user: UserState) {
      this.id = user.id;
      this.email = user.email;
      this.name = user.name;
    },
    clearUser() {
      this.id = "";
      this.email = "";
      this.name = "";
    },
    // Si estás usando localStorage para persistencia
    initializeFromStorage() {
      if (process.client) {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            this.setUser(userData);
          } catch (error) {
            console.error('Error parsing user data from localStorage:', error);
          }
        }
      }
    }
  }
});
