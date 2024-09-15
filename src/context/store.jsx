import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const store = create(
  persist(
    (set, get) => ({
      authenticated: false,
      user: null,

      loginSuccess: (user) => {
        set({ authenticated: true, user: user });
      },

      logout: () => {
        set({ authenticated: false, user: null });
        localStorage.removeItem("token");
        localStorage.removeItem("reg_token");
        localStorage.removeItem("userId");
      },
      getUserRole: () => {
        return get().user?.role;
      },
    }),
    {
      name: "mohir",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default store;
