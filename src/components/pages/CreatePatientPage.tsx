import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import CreatePatientForm from "../UI/CreatePatientForm";


const CreatePatientPage = () => {
    const {isLoading, error} = useAppSelector(state => state.userReducer);

    return (
        <div className="ml-5 mb-10">

            <div>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                <CreatePatientForm />
            </div>
        </div>
    );
};

export default CreatePatientPage;
