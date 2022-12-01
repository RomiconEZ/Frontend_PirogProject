import React from 'react';

import validatorConfig from './validatorConfig';
import {TextField, TextFieldProps} from "@mui/material";
import {useAppSelector} from "../../../../hooks/redux";
import {additionalSlice} from "../../../../store/reducers/AdditionalSlice";
import {ResidenseRegions} from "../../../../DataLists/ResidenseRegions";
import {Regions} from "../../../../DataLists/Regions";
import {Form, useForm} from "../../../../hooks/useForm";
import {genderItems} from "../../../../DataLists/genderItems";
import {patientAPI} from "../../../../services/PatientService";
import {Race} from "../../../../DataLists/Race";
import {IPatientUpdate} from "../../../../models/IPatientUpdate";
import {useAppDispatch} from "../../../../store/store";
import {DatePickerField, InputField, RadioGroup, SelectField} from "../../../common/Fields";
import Button from "../../../common/Button";
import {useNavigate, useParams} from "react-router-dom";


const ComputerTomographyEdit = () => {

    const {user} = useAppSelector(state => state.userReducer)
    const {SelectedPatient, IsEditButtonPressed} = useAppSelector(state => state.additionalReducer)
    const navigate = useNavigate();
    const params = useParams<string>()
    const dispatch = useAppDispatch()


    const initialAnthropometricData: any = {
    }
    const {data, errors, handleInputChange, handleKeyDown, validate} = useForm(initialAnthropometricData, true, validatorConfig);
    const [updatePatient, {}] = patientAPI.useUpdatePatientMutation();// {}-функция, которую мы можем вызвать, чтобы произошла мутация, createPost - объект с полями

    const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(data))
        {
            const UpdatePatientData: IPatientUpdate = {
                patientID: SelectedPatient.patientID,
                employee_id: user!.id,
            }
            await updatePatient(UpdatePatientData)
            navigate(`/auth/menu/patients/${SelectedPatient.patientID}/computer-aided-tomography`)

        }
    }
    return (
        <>
            <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>

                <Button type='submit' onClick={handleUpdate} fullWidth disabled={Object.keys(errors).length !== 0}>
                    Сохранить
                </Button>
        </Form>
        </>
    );
};

export default ComputerTomographyEdit;