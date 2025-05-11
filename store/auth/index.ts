import { type authStoreType } from "./type";
import { zustandStorage } from "../storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { regenerateTokens, tokenExpiration } from "@/services/auth";

const authStore = create<authStoreType, [["zustand/persist", unknown]]>(
    persist(
        (set,get) => ({
            authTokens: null,
            user: null,
            expirationStatus:null,
            logoutUser: () => {
                set({ authTokens: null, user: null })
            },
            tokensReGenerate: async () => {
    const { authTokens } = get();
    if (!authTokens) return false;
    try {
        const result = await regenerateTokens(authTokens);
        if (result) {
            // Extract username or user_id as needed
            const decoded = result.decodedUser;
            set({
                authTokens: result.updatedTokens,
                user: { 
                    user_id: decoded.user_id 
                }
            });
            return true;
        }
        
        set({ authTokens: null, user: null });
        return false;
    } catch (error) {
        set({ authTokens: null, user: null });
        return false;
    }
},
            isTokenExpired: ()=>{
                const {authTokens}=get()
                const expireStatus=tokenExpiration(authTokens)
                return expireStatus
            },
        }), {
            name: "Knozify-auth",
            storage: createJSONStorage(() => zustandStorage)
        }
    )
)

export {authStore}