import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import PersonalDataReadOnly from "./readOnlyForms/PersonalDataReadOnly";
import PersonalDataEdit from "./editForms/PersonalDataEdit";




const PersonalData = () => {
    const {IsEditButtonPressed} = useAppSelector(state => state.additionalReducer)

    return (
        <div>
            {!IsEditButtonPressed && <PersonalDataReadOnly />}
            {IsEditButtonPressed && <PersonalDataEdit/>}
        </div>
    );
};

export default PersonalData;