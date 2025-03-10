import { create } from "zustand";

export const usePersonneStore = create((set) => ({
    personne: [],
    
    setPersonne: (personne) => set({ personne }),
    
    createPersonne: async (newPersonne) => {
        if (!newPersonne.name || !newPersonne.password || !newPersonne.cin || !newPersonne.prenom) {
            return { success: false, message: "Please fill in all fields" };
        }

        try {
            const res = await fetch("/api/personne", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newPersonne),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return { success: false, message: errorData.message || "Failed to add personne" };
            }

            const data = await res.json();
            
            if (!data?.data) {
                return { success: false, message: "Invalid response from server" };
            }

            set((state) => ({ personne: [...state.personne, data.data] }));

            return { success: true, message: "Personne added successfully" };
        } catch (error) {
            return { success: false, message: "Network error, please try again" };
        }
    },
}));
