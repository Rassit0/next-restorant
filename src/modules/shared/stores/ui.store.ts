import { create, StateCreator } from "zustand";


interface UIState {
    isOpenMenu: boolean
}

interface Actions {
    handleMenuOpen: () => void
}

// LOGICA DE PROGRAMACION de tipo genericos<>
const storeApi: StateCreator<UIState & Actions> = (set, get) => ({
    isOpenMenu: false, //inicializa en false
    handleMenuOpen: () => {
        const { isOpenMenu } = get()
        set({
            isOpenMenu: !isOpenMenu
        })
    }
})

// PROVEEDORE DE LOGICA DE PROGRAMACION
export const useUIStore = create(
    storeApi
)