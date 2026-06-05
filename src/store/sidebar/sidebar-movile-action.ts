import { create } from "zustand";


type Store = {
    openSidebar: boolean,
    toogleSidebar: (value: boolean) => void
}

export const useSidebarAction = create<Store>()(
    (set, get) => ({
        openSidebar: true,
        toogleSidebar: (value: boolean) => {
            set({ openSidebar: value })
        }
    })
)