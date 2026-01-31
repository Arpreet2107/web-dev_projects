// CustomPieChartData.jsx

/**
 * Colors corresponding to each data slice (Balance, Expenses, Income)
 */
export const financePieChartColors = [
    "#59160",   // Balance - dark red/burgundy shade
    "#016630",  // Expenses - green shade
    "#FF6384",  // Income - pink/red shade
];

/**
 * Creates the data array for the financial overview pie chart.
 *
 * @param {number} totalBalance - Total balance amount (default 0)
 * @param {number} totalExpense - Total expenses amount (default 0)
 * @param {number} totalIncome - Total income amount (default 0)
 * @returns {Array<{name: string, amount: number}>} Array of objects for pie chart slices
 */
export const getFinancePieChartData = (
    totalBalance = 0,
    totalExpense = 0,
    totalIncome = 0
) => [
    { name: "Balance", amount: totalBalance },
    { name: "Expenses", amount: totalExpense },
    { name: "Income", amount: totalIncome },
];

/**
 * Optional helper to format the totalBalance with thousands separator and currency symbol.
 * Example: 1000000 => "₹1,000,000"
 * Customize this if you want or remove if you handle formatting elsewhere.
 *
 * @param {number|string} amount
 * @returns {string}
 */
export const addThousandsSeparator = (amount) => {
    if (typeof amount === "number") {
        return amount.toLocaleString("en-IN"); // format for India locale as example
    }
    if (typeof amount === "string") {
        const num = Number(amount);
        if (!isNaN(num)) {
            return num.toLocaleString("en-IN");
        }
    }
    return amount;
};
