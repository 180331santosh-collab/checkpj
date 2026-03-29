export interface CountryRule {
    name: string;
    slug: string;
    minGPA: number;
    minIELTS: number;
    acceptsBacklogs: boolean;
    budgetLevel: "high" | "medium" | "low";
}

export const countries: CountryRule[] = [
    {
        name: "USA",
        slug: "usa",
        minGPA: 3.0,
        minIELTS: 6.5,
        acceptsBacklogs: false,
        budgetLevel: "high", // > $40k or $20k-$40k (We'll map budget levels loosely)
    },
    {
        name: "UK",
        slug: "uk",
        minGPA: 2.6,
        minIELTS: 6.0,
        acceptsBacklogs: true,
        budgetLevel: "medium",
    },
    {
        name: "Canada",
        slug: "canada",
        minGPA: 3.0,
        minIELTS: 6.5,
        acceptsBacklogs: false,
        budgetLevel: "high",
    },
    {
        name: "Australia",
        slug: "australia",
        minGPA: 2.8,
        minIELTS: 6.0,
        acceptsBacklogs: true,
        budgetLevel: "high",
    },
    {
        name: "Germany",
        slug: "germany",
        minGPA: 3.2,
        minIELTS: 6.5,
        acceptsBacklogs: false,
        budgetLevel: "low", // Below $10k
    },
    {
        name: "South Korea",
        slug: "south-korea",
        minGPA: 2.8,
        minIELTS: 5.5,
        acceptsBacklogs: true,
        budgetLevel: "low",
    },
    {
        name: "Japan",
        slug: "japan",
        minGPA: 3.0,
        minIELTS: 6.0,
        acceptsBacklogs: false,
        budgetLevel: "medium",
    }
];
