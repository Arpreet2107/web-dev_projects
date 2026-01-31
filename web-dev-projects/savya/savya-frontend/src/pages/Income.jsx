import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import axiosConfig from "../util/axiosConfig.jsx";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList.jsx";
import {Plus} from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import Modal from "../components/Modal.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";

const Income = () =>{
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState([]);
    const[openAddIncomeModal,setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });


    const handleDownloadIncomeDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType="blob"});
            const url : string = window. URL. createObjectURL(new Blob([response.data]));
            const link : HTMLAnchorElement = document. createElement("a");
            link.href = url;
            link. setAttribute("download",filename);
                document.body.appendChild(link);
            link.click();
            link. parentNode. removeChild(link);
            window.URL.revokeObjectURL(url);
            toast. success("Download income details successfully");
        }catch(error){
            console.error('Error downloading the income details.', error);
            toast.error(error.response?.data?.message || "Failed to download income");
        }
    }

    const handleEmailIncomeDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);
            if(response.status === 200){
                toast.success("Income details email successfully.");
            }
        }catch (error){
            console.error("Error emailing income details:", error);
            toast.error(error.response?.data?.message || "Failed to email the income details.");
        }
    }

    //fetch income details from API
    const fetchIncomeDetails = async()=> {
        if(loading) return;
        setLoading(true);

        try{
            const response = axiosConfig(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200){
                console.log("Income list",response.data);
                setIncomeData(response.data);
            }
        }catch(error){
            console.error("Failed to fetch the income details",error);
            toast.error(error.response?.data?.message || "Failed to fetch the income details");
        }finally {
            setLoading(false);
        }
    }

    //fetch categories for income
    const fetchIncomeCategories = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if(response.status===200){
                setCategories(response.data);
            }
        }catch(error){
            console.log('Failed to fetch income categories.');
            toast.error(error.data?.message || "Failed  to fetch income categories");
        }
    }

    //save the income details
    const handleAddIncome = async (income) => {
        const {name,amount,date,icon,categoryId} = income;
        //validation
        if(!name.trim()){
            toast.error("Please enter a name");
            return;
        }

        if(!amount || isNan(amount) || Number(amount) <= 0){
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if(!date){
            toast.error("Please select a date");
            return;
        }
        const today = new Date().toISOString().split('T')[0];
        if(date>today){
            toast.error("Date cannot be in the future");
            return;
        }
        if(!categoryId){
            toast.error("Please select a category");
            return;
        }
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount);
                date,
                icon,
                categoryId
            })
            if(response.status ===201){
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully.");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        }catch (error){
            console.log('Error adding income',error);
            toast.error(error.response?.data?.message || "Failed adding income");

        }
    }

    //delete the income details
    const deleteIncome= async (id) =>{
         try{
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show:false, data:null});
            toast.success("Income deleted successfully.");
            fetchIncomeDetails();
        }catch (error){
            console.log("Error deleting the income.",error);
            toast.error(error.response?.data?.message || "Failed to delete income.");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    return(
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/*overview for income with line char*/}
                        <IncomeOverview transaction={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)}/>
                    </div>
                    <IncomeList

                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({show:true, data:id})}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />
                    {/*Add Income Modal*/}
                    <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() =>  setOpenAddIncomeModal(false)}
                    title="Add income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    {/*delete income modal*/}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false;data:null})}
                        title="Delete Income">
                            <DeleteAlert
                             content="Are you sure? You want to delete this income details?"
                                onDelete={() => deleteIncome(openDeleteAlert.data)}/>
                    </Modal>
                </div>

            </div>
        </Dashboard>
    )
}

export default Income;