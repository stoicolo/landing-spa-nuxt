import axios from "axios";
import PageTemplateService from "~/services/page_template";

class NavigationService {
  static async createNewMenu(
    userId: number,
    websiteId: number,
    menuDetails: any,
  ): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Post",
        url: `${PageTemplateService.baseURL}/menus/create-menu-with-details/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: {
          userId,
          websiteId,
          menuDetails,
        },
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error creating menu:", error);
      return null;
    }
  }

  static async getMenuHeader(
    userId: number,
    websiteId: number,
  ): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Post",
        url: `${PageTemplateService.baseURL}/menus/menu/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: {
          userId,
          websiteId,
        },
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error getting menu header:", error);
      return null;
    }
  }

  static async getMenuByHeaderId(menuHeaderId: number): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Post",
        url: `${PageTemplateService.baseURL}/menus/get-menu-pages/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: {
          menuHeaderId,
        },
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error getting menu:", error);
      return null;
    }
  }

  static async updateMenuItem(
    websiteId: number,
    menuHeaderId: number,
    pageId: number,
    item: any,
  ): Promise<any | null> {
    try {
      let response = null;

      const itemData = {
        websiteId,
        menuHeaderId: menuHeaderId,
        pageId,
        href: `/builder/${pageId}`,
        ...item,
      };

      response = await axios({
        method: "Post",
        url: `${PageTemplateService.baseURL}/menus/menu-page/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: itemData,
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error updating menu:", error);
      return null;
    }
  }

  static async updateAllMenu(
    menuHeaderId: number,
    menuPages: any[],
  ): Promise<any | null> {
    try {
      let response = null;

      const itemData = {
        menuHeaderId,
        menuPages: [...menuPages],
      };

      response = await axios({
        method: "Patch",
        url: `${PageTemplateService.baseURL}/menus/menu-pages-bulk/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: itemData,
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error updating menu:", error);
      return null;
    }
  }

  static async getMenuList(
    websiteId: number,
    userId: number,
  ): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Post",
        url: `${PageTemplateService.baseURL}/menus/get-menu-with-details/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: {
          websiteId,
          userId,
        },
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error getting menu list:", error);
      return null;
    }
  }

  static async deleteMenuBulkOfItems(
    websiteId: number,
    menuHeaderId: number,
    itemsIds: any[],
  ): Promise<any | null> {
    try {
      let response = null;

      const itemData = {
        websiteId,
        menuHeaderId,
        menuPagesIds: [...itemsIds],
      };

      response = await axios({
        method: "Delete",
        url: `${PageTemplateService.baseURL}/menus/menu-pages-bulk/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: itemData,
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error Delete Menu Bulk menu:", error);
      return null;
    }
  }
}

if (import.meta.client) {
  PageTemplateService.initAuthToken();
}

export default NavigationService;
