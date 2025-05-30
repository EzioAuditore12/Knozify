import { create } from "zustand";
import { zustandStorage } from "@/store/storage";
import { createJSONStorage, persist } from "zustand/middleware";
import type { registerSchemaType } from "../schema/registerSchema";

//TODO: Need to add better persistant storage in registeration form

type registerState= Partial<registerSchemaType> & {
    setData: (data:Partial<registerSchemaType>) => void
}

export const registerStateStore=create<registerState>()(
    persist(
        (set) => ({
            setData:(data)=>set((state) => ({ ...state, ...data }))
        }),
        {
            name: 'registerationForm-storage',
            storage:createJSONStorage(()=>zustandStorage)
        }
    )
)