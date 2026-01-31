import {useEffect, useState} from "react";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import income from "../pages/Income.jsx";
import Input from "./Input.jsx";

const AddIncomeForm = ({onAddIncome,categories}) => {
    const AddIncomeForm =({onAddIncome, categories}) => {
        const [income, setIncome] = useState({
            name:'',
            amount:'',
            date:'',
            icon:'',
            categoryId:''
        })
        const categoryOptions = categories.map(category => ({
            value: category.id,
                label:category.name
        }))

        const handleChange = (key,value) => {
            setIncome({...income,[key]: value});
        }
    }

    const [loading,setLoading] = useState(false);

    const handleAddIncome = async () => {
        setLoading(true);
        try{
            await onAddIncome(income);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(categories.length > 0 && !income.categoryId){
            setIncome((prev) => ({...prev,categoryId: categories[0].id}))
        }
    }, [categories,income.categoryId]);

    return(
        <div>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
            />
            <Input
                value={income.name}
                onChange={({target}) => handleChange('name',target.value)}
                label="Income Source"
                placeholder="eg., Salary,Freelance Bonus"
                type="text"
            />
            <Input
                label="Category"
                value={income.categoryId}
                onChange={({target}) => handleChange('categroyId', target.value)}
                isSelect={true}
                options={categoryOptions}
            />
            <Input
                value={income.amount}
                onChange={({target}) => handleChange('amount', target.value)}
                label="amount"
                placeholder="eg., 500.00"
                type="number"
            />
            <Input
                value={income.date}
                onChange={({target}) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />
            <div className="flex justify-end mt-6">
                <button
                onClick={() =>{handleAddIncome}
                    disabled={laoding}
                className="add-btn add-btn fill"
                {loading ? (
                    <>
                        <LoaderCircle className="w-4 h-4 animate-spin" />
                    Adding...
                    </>
                    ):(
                        <>
                            Add Income
                        </>
                    )}
                >

                </button>

            </div>

        </div>
    )

}

export default AddIncomeForm;