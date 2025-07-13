// fetchprod.js

const API_BASE_URL = "http://localhost:8080/products"; // adapte si besoin

/**
 * Récupère tous les produits depuis l'API backend.
 * @returns {Promise<Array>} Liste des produits
 */
export async function fetchAllProducts() {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // Aucune donnée disponible
            return [];
        }

        if (!response.ok) {
            throw new Error(`Erreur lors du fetch: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
        throw error;
    }
}
