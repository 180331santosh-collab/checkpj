import { countries, CountryRule } from "../data/countries";

export interface CountryScoreResult {
    name: string;
    slug: string;
    score: number;
    reason: string;
}

export function parseGPA(input: string): number {
    if (!input) return 0;
    const str = input.toLowerCase().replace(/[^0-9.]/g, '');
    const num = parseFloat(str);
    if (isNaN(num)) return 0;
    
    // Attempt basic normalization to 4.0 scale
    if (input.includes('%') || num > 10) {
        return (num / 100) * 4.0; 
    }
    return num <= 4.0 ? num : 4.0;
}

export function parseToIELTS(type: string, scoreStr: string): number {
    if (!scoreStr) return 0;
    const score = parseFloat(scoreStr);
    if (isNaN(score)) return 0;
    
    if (type === 'IELTS') return score;
    if (type === 'TOEFL') {
        if (score >= 110) return 8.0;
        if (score >= 102) return 7.5;
        if (score >= 94) return 7.0;
        if (score >= 79) return 6.5;
        if (score >= 60) return 6.0;
        return 5.5;
    }
    if (type === 'PTE') {
        if (score >= 76) return 8.0;
        if (score >= 66) return 7.0;
        if (score >= 58) return 6.5;
        if (score >= 50) return 6.0;
        return 5.5;
    }
    return 0;
}

export function scoreCountries(profile: any): CountryScoreResult[] {
    const userGPA = parseGPA(profile.gpaOrPercent);
    const userIELTS = parseToIELTS(profile.englishTestType, profile.englishTestScore);
    const userBacklogs = profile.backlogs ? parseInt(profile.backlogs) : 0;
    const hasGreOrSat = !!(profile.greScore || profile.satScore);
    
    // Map budget
    let userBudgetLevel = "high";
    if (profile.budget === "Below $10,000") userBudgetLevel = "low";
    if (profile.budget === "$10,000 – $20,000") userBudgetLevel = "medium";
    // "$20,000 – $40,000" and "Above $40,000" are "high"

    const results: CountryScoreResult[] = countries.map(country => {
        let score = 0;
        const reasons: string[] = [];

        // 1. GPA (30 points)
        if (userGPA >= country.minGPA) {
            score += 30;
            reasons.push("Strong academic profile");
        } else if (userGPA > 0 && userGPA >= country.minGPA - 0.5) {
            score += 15; // Partial points for being close
            reasons.push("Academics slightly below average");
        } else if (userGPA > 0) {
            reasons.push("Academics might be a hurdle");
        }

        // 2. IELTS/English (25 points)
        if (userIELTS >= country.minIELTS) {
            score += 25;
            reasons.push("Meets English requirements");
        } else if (userIELTS > 0 && userIELTS >= country.minIELTS - 0.5) {
            score += 10;
        }

        // 3. Budget (20 points)
        if (profile.budget === "Not sure" || userBudgetLevel === country.budgetLevel || userBudgetLevel === "high") {
            score += 20;
            reasons.push("Fits your budget");
        } else if (userBudgetLevel === "medium" && country.budgetLevel === "high") {
            score += 10; // Might stretch budget
        }

        // 4. Backlogs (15 points)
        if (userBacklogs === 0) {
            score += 15;
        } else if (country.acceptsBacklogs) {
            score += 15;
            reasons.push("Accepts your backlog history");
        } else {
            // Country strictly avoids backlogs, user has them
            reasons.push("Backlogs could be an issue");
        }

        // 5. GRE/SAT (10 points)
        // If they have GRE/SAT, give them the bonus points. 
        if (hasGreOrSat) {
            score += 10;
            reasons.push("Standardized tests add value");
        }

        // Combine reasons
        let finalReason = reasons.slice(0, 2).join(", ");
        if (!finalReason) finalReason = "Moderate match for your profile";

        return {
            name: country.name,
            slug: country.slug,
            score,
            reason: finalReason
        };
    });

    // Sort descending by score
    return results.sort((a, b) => b.score - a.score);
}
