import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { useState } from "react";
import { Search } from "lucide-react";
import axiosConfig from "../util/axiosConfig.jsx";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment"; // import Search icon

const Filter = () => {
    useUser();

    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState(""); // e.g. "2024-08-01"
    const [endDate, setEndDate] = useState(""); // e.g. "2024-08-31"
    const [keyword, setKeyword] = useState(""); // search keyword/filter
    const [sortOrder, setSortOrder] = useState("asc"); // sort direction: "asc" or "desc"
    const [sortField, setSortField] = useState("date");
    const [transactions, setTransactions] = useState([]); // array of transaction data
    const [loading, setLoading] = useState(false); // loading state (boolean)

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS,{
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder,
            });
            setTransactions(response.data);
        } catch (error) {
            console.error("Failed to fetch the transactions",error);
            toast.error(error.message || "Failed to fetch transactions. Please try again.")
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto max-w-7xl px-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold">Filter Transactions</h2>
                </div>
                <div className="card p-4 mb-4 bg-white rounded shadow">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-lg font-semibold">Select the filters</h5>
                    </div>
                    <form
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4"
                        onSubmit={handleSearch}
                    >
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="type"
                            >
                                Type
                            </label>
                            <select
                                value={type}
                                id="type"
                                className="w-full border rounded px-3 py-2"
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="startdate"
                                className="block text-sm font-medium mb-1"
                            >
                                Start Date
                            </label>
                            <input
                                id="startdate"
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="enddate"
                                className="block text-sm font-medium mb-1"
                            >
                                End Date
                            </label>
                            <input
                                id="enddate"
                                type="date"
                                className="w-full border rounded px-3 py-2"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="sortorder"
                                className="block text-sm font-medium mb-1"
                            >
                                Sort Order
                            </label>
                            <select
                                id="sortorder"
                                className="w-full border rounded px-3 py-2"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="sortfield" className="block text-sm font-medium mb-1">
                                Sort Field
                            </label>
                            <select
                                id="sortfield"
                                className="w-full border rounded px-3 py-2"
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                                {/* Add more sort field options as needed */}
                            </select>
                        </div>

                        <div className="sm:col-span-1 md:col-span-2 flex items-end">
                            <div className="w-full">
                                <label
                                    htmlFor="keyword"
                                    className="block text-sm font-medium mb-1"
                                >
                                    Search
                                </label>
                                <input
                                    id="keyword"
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full border rounded px-3 py-2"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                type="submit"
                                className="ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-900 text-white rounded flex items-center justify-center cursor-pointer"
                                disabled={loading}
                            >
                                <Search size={20} />
                                <span className="ml-2">{loading ? "Searching..." : "Search"}</span>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="card p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-lg font-semibold">Transactions</h5>
                    </div>
                    {transactions.length === 0 && !loading?(
                        <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
                    ): ""
                    }
                    {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                        title={transaction.name}
                        icon={transaction.icon}
                        date={moment(transaction.date).format("Do MMM YYYY")}
                        amount={transaction.amount}
                        type={type}
                        hideDeleteBtn/>
                    ))}

                </div>

                {/*/!* Optional: render the filtered transactions or loading indicator *!/*/}
                {/*<div>*/}
                {/*    {loading && (*/}
                {/*        <p className="text-center text-gray-500">Loading transactions...</p>*/}
                {/*    )}*/}
                {/*    {!loading && transactions.length === 0 && (*/}
                {/*        <p className="text-center text-gray-500">No transactions found.</p>*/}
                {/*    )}*/}
                {/*    {!loading && transactions.length > 0 && (*/}
                {/*        <ul className="mt-4 space-y-2">*/}
                {/*            {transactions.map((txn) => (*/}
                {/*                <li*/}
                {/*                    key={txn.id}*/}
                {/*                    className="border rounded p-3 flex justify-between items-center"*/}
                {/*                >*/}
                {/*                    <div>*/}
                {/*                        <p className="font-semibold">{txn.description || "No description"}</p>*/}
                {/*                        <p className="text-sm text-gray-600">{txn.date}</p>*/}
                {/*                    </div>*/}
                {/*                    <div*/}
                {/*                        className={`font-bold ${*/}
                {/*                            txn.type === "income" ? "text-green-600" : "text-red-600"*/}
                {/*                        }`}*/}
                {/*                    >*/}
                {/*                        {txn.amount}*/}
                {/*                    </div>*/}
                {/*                </li>*/}
                {/*            ))}*/}
                {/*        </ul>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </Dashboard>
    );
};

export default Filter;
