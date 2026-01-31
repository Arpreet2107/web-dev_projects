import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../util/apiEndpoints.js";
import axiosConfig from "../util/axiosConfig.jsx";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";
import toast from "react-hot-toast";
import axios from "axios";

const Category = () =>{
    useUser();
    const [loading,setLoading] = useState(false);
    const [categoryData,setCategoryData] = useState([]);
    const [openAddCategoryModal,setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal,setOpenEditCategoryModal] = useState(false);
    const [selectedCategory,setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if(loading) return;
        setLoading(true);
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200){
                console.log('categories',response.data);
            }
        }catch(error){
            console.error('Something went wrong. Please try again.',error);
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory =  async (category) => {
        const {name,type,icon} = category;
        if(!name.trim()){
            toast.error("Category name is required");
            return;
        }

        const handleEditCategory = (categoryToEdit) => {
            setSelectedCategory(categoryToEdit);
            setOpenEditCategoryModal(true);
        }

        const handleUpdateCategory = async (updatedCategory) => {
            const{id,name,type,icon} = updatedCategory;
            if(!name.trim()){
                toast.error("Category Name is required");
                return;
            }

            if(!id){
                toast.error("Category ID is missing for update");
                return;
            }
            try{
                const response = await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});
                setOpenEditCategoryModal(false);
                setSelectedCategory(null);
                toast.success("Category updated successfully!!");
                fetchCategoryDetails();
            }catch(error){
                console.error("Error updating the category:",error.response?.data?.message || error.message);
                toast.error(error.response?.data?.message || "Failed to update category.");
            }
        }

        //check if the category already exists or not
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })
        if(isDuplicate){
            toast.error("Category name already exists.");
            return;
        }
        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon});
            if(response.status === 201){
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        }catch(error){
            console.error("Error adding category:",error);
            toast.error(error.response?.data?.message || "Failed to add category.");
        }
    }

    ;
    return(
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/*Add button to add category*/}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">All categories</h2>
                    <button
                        onClick={() => setOpenAddCategoryModal(true)}
                        className="add-btn flex items-center gap-1">
                        <Plus size={15} />
                    </button>
                </div>
                {/*CategoryList*/}
                <CategoryList categories={categoryData} onEditCategorty={handleEditCategory}/>

                {/*Adding category modal*/}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>

                </Modal>
                {/*Updating category modal*/}

                <Modal
                    isOpen={openEditCategoryModal}
                    onClose={() =>
                        setOpenEditCategoryModal(false)
                        setSelectedCategory(null)
                }}
                    isOpen={openEditCategoryModal}
                    title="Update Category"
                >
                    <AddCategoryForm
                        intitialCategoryData = {selectedCategory}
                        onAddCategory={handleAddCategory}
                        isEditing={true}/>

                </Modal>

            </div>
        </Dashboard>
    )
}

export default Category;