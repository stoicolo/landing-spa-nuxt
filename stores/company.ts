interface Company {
  id?: string;
  email?: string;
  name?: string;
  address?: string;
  country?: string;
  city?: string;
  state?: string;
  zip?: string;
  contactName?: string;
  contactLastName?: string;
  contactEmail?: string;
  contactPhone?: string;
};

export const useCompanyStore = defineStore("company", {
  state: () => ({
    id: "",
    email: "",
    name: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    contactName: "",
    contactLastName: "",
    contactEmail: "",
    contactPhone: "",
  }),
  getters: {},
  actions: {
    saveCompanyInformation(companyData: any) {
      this.id = companyData.id;
      this.email = companyData.email;
      this.name = companyData.name;
      this.address = companyData.address;
      this.country = companyData.country;
      this.city = companyData.city;
      this.state = companyData.state;
      this.zip = companyData.zip;
      this.contactName = companyData.contactName;
      this.contactLastName = companyData.contactLastName;
      this.contactEmail = companyData.contactEmail;
      this.contactPhone = companyData.contactPhone;
    },
  },
  persist: true,
});
