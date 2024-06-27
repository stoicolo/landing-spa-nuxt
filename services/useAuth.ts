// useAuth.ts
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import jwt_decode from "jwt-decode";

const usersUrl = "/api/users";

export function useAuth() {
  const router = useRouter();
  const isOnSession = ref(false);
  const decodedToken = reactive({
    personalId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const getToken = (): string | null => {
    return localStorage.getItem("access_token");
  };

  const decodeToken = (token: string) => {
    if (token) {
      const decoded = jwt_decode(token);
      Object.assign(decodedToken, decoded);
      return decoded;
    }
    return null;
  };

  const isOnSessionCheck = () => {
    const token = getToken();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          isOnSession.value = false;
          // Aquí puedes agregar una notificación de sesión expirada
          return false;
        } else {
          isOnSession.value = true;
          return decoded;
        }
      }
    }
    isOnSession.value = false;
    return false;
  };

  const isAuthorized = (allowedRoles: string[]): boolean => {
    if (allowedRoles.length === 0) return true;

    const token = getToken();
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded._doc && decoded._doc.role) {
        return allowedRoles.includes(decoded._doc.role[0]);
      }
    }
    return false;
  };

  const signUp = async (newUser: any) => {
    try {
      const response = await axios.post(`${usersUrl}/signUp`, newUser);
      // Aquí puedes manejar el estado de la aplicación, por ejemplo con Pinia
      return response.data;
    } catch (error) {
      console.error("Error en el registro:", error);
      throw error;
    }
  };

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${usersUrl}/signIn`, credentials);
      if (response.data && response.data.token) {
        localStorage.setItem("access_token", response.data.token);
        decodeToken(response.data.token);
        isOnSession.value = true;
      }
      return response.data;
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      throw error;
    }
  };

  const signOut = async (personalId: string) => {
    try {
      await axios.delete(`${usersUrl}/signOut/?personalId=${personalId}`);
      localStorage.removeItem("access_token");
      isOnSession.value = false;
      router.push("/login"); // Ajusta la ruta según tu aplicación
    } catch (error) {
      console.error("Error en el cierre de sesión:", error);
      throw error;
    }
  };

  const refreshToken = async () => {
    const token = getToken();
    if (token) {
      const payload = decodeToken(token);
      if (payload) {
        delete payload.exp;
        delete payload.iat;
        delete payload.__v;
        delete payload._id;

        try {
          const response = await axios.post(`${usersUrl}/getToken/`, payload);
          if (response.data && response.data.token) {
            localStorage.setItem("access_token", response.data.token);
            setTimeout(() => {
              router.push("/tools"); // Ajusta la ruta según tu aplicación
            }, 3000);
          }
        } catch (error) {
          console.error("Error al actualizar el token:", error);
        }
      }
    }
  };

  return {
    isOnSession,
    decodedToken,
    getToken,
    decodeToken,
    isOnSessionCheck,
    isAuthorized,
    signUp,
    signIn,
    signOut,
    refreshToken,
  };
}
