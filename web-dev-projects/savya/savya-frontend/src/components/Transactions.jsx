import React from "react";
import moment from "moment";
import { ArrowRight } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";

const Transactions = ({ title, onMore, transactions,type}) => {
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
                <button
                    className="card-btn"
                    onClick={onMore}>

                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        name={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
                {transactions.length === 0 && (
                    <p className="text-center text-gray-500">No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default Transactions;
