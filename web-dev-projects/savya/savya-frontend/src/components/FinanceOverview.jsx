import React from "react";
import CustomPieChart from "./CustomPieChartData.jsx";

const FinanceOverview = ({ totalBalance = 0, totalExpense = 0, totalIncome = 0 }) => {
    const colors = ["#59160", "#016630", "#FF6384"];

    // Data for the pie chart and summary
    const data = [
        { name: "Balance", amount: totalBalance },
        { name: "Expenses", amount: totalExpense },
        { name: "Income", amount: totalIncome },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart data={balanceData} label="TotalBalances" totalAmount={`₹{addThousandsSeparator(totalBalance)}`}
            colors={COLORS}
            showTextAnchor/>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {data.map(({ name, amount }, index) => (
                    <div key={index} className="p-4 rounded-lg bg-gray-100">
                        <p className="text-md font-medium text-gray-700">{name}</p>
                        <p className="text-xl font-semibold mt-2">${amount.toLocaleString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FinanceOverview;
