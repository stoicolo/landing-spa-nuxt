import axios from "axios";
import PageTemplateService from "~/services/page_template";

class WebSiteService {
  static async createWebSite(
    userId: number,
    websiteName: string,
    domain: string,
    slug: string,
    websiteGlobalConfig: any,
  ): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Post",
        url: `${PageTemplateService.baseURL}/websites/`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: {
          userId,
          websiteName,
          domain,
          slug,
          websiteGlobalConfig,
        },
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error creating site:", error);
      return null;
    }
  }

  static async getWebSite(userId: number): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Get",
        url: `${PageTemplateService.baseURL}/websites/user/${userId}`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
      });
      console.log("getWebSite is working");
      return response ? response.data : null;
    } catch (error) {
      console.error("Error getting site:", error);
      return null;
    }
  }

  static async updateWebSite(
    websiteName: string,
    websiteGlobalConfig: any,
    websiteId: number,
  ): Promise<any | null> {
    try {
      let response = null;

      response = await axios({
        method: "Patch",
        url: `${PageTemplateService.baseURL}/websites/id/${websiteId}`,
        headers: {
          Authorization: `Bearer ${PageTemplateService.authToken}`,
        },
        data: {
          websiteName,
          websiteGlobalConfig,
        },
      });
      return response ? response.data : null;
    } catch (error) {
      console.error("Error updating site:", error);
      return null;
    }
  }
}

if (import.meta.client) {
  PageTemplateService.initAuthToken();
}

export default WebSiteService;
