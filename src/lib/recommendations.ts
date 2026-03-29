import { scoreCountries } from "./engine/scoreCountry";
import { scoreUniversities } from "./engine/scoreUniversity";

export interface Recommendation {
    countries: string[];
    universities: {
        category: "Ambitious" | "Moderate" | "Safe";
        names: string[];
    }[];
}

export function getRecommendations(profile: any): Recommendation {
    // 1. Score countries
    const rankedCountries = scoreCountries(profile);
    
    // 2. Pick top 2-3 countries
    // Currently, our university dataset is only USA, but let's logically pick the best matches.
    // If the top matches include USA, great. If not, USA will still be passed, but let's just use top 3.
    const topCountries = rankedCountries.slice(0, 3);
    const topCountryNames = topCountries.map(c => `${c.name} (${c.reason})`);
    
    // We only have USA universities, so if USA isn't in top 3, let's inject it for testing
    // to ensure universities actually show up.
    let targetCountriesForUnis = topCountries.map(c => c.slug);
    if (!targetCountriesForUnis.includes("usa")) {
        targetCountriesForUnis.push("usa"); // Fallback for US dataset
    }

    // 3. Filter and score universities by those countries
    const rankedUniversities = scoreUniversities(profile, targetCountriesForUnis);

    // 4. Bucket universities
    const ambitious = rankedUniversities.filter(u => u.category === "Ambitious").map(u => u.name);
    const moderate = rankedUniversities.filter(u => u.category === "Moderate").map(u => u.name);
    const safe = rankedUniversities.filter(u => u.category === "Safe").map(u => u.name);

    // 5. Structure the return result
    // The UI expects an array of categories so it maps them visually
    return {
        countries: topCountryNames,
        universities: [
            {
                category: "Ambitious",
                names: ambitious.slice(0, 5) // Return top 5 in each category
            },
            {
                category: "Moderate",
                names: moderate.slice(0, 5)
            },
            {
                category: "Safe",
                names: safe.slice(0, 5)
            }
        ]
    };
}
