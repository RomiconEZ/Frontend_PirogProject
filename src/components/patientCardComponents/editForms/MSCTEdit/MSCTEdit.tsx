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
import {yesNo} from "../../../../DataLists/yesNo";



const MSCTEdit = () => {
    const {user} = useAppSelector(state => state.userReducer)
    const {SelectedPatient, IsEditButtonPressed} = useAppSelector(state => state.additionalReducer)
    const navigate = useNavigate();
    const params = useParams<string>()
    const dispatch = useAppDispatch()


    const initialMCT: any = {
        AV_annulus_fibrosis: SelectedPatient.MCT.AV_annulus_fibrosis, // Фиброзное кольцо аортального клапана
        sinuses_valsalva: SelectedPatient.MCT.sinuses_valsalva, // Синусы Вальсальвы
        sinotubular_junction: SelectedPatient.MCT.sinotubular_junction, // Синотубулярное соединение
        asc_aorta_pulm_art_bif: SelectedPatient.MCT.asc_aorta_pulm_art_bif, // Восходящий отдел аорты на уровне бифуркации легочной артерии
        asc_aorta_before_BCS: SelectedPatient.MCT.asc_aorta_before_BCS, // Восходящий отдел аорты перед БЦС
        aortic_arch_before_CCA: SelectedPatient.MCT.aortic_arch_before_CCA, // Дуги аорты перед ЛОСА
        aortic_arch_before_LSA: SelectedPatient.MCT.aortic_arch_before_LSA, // Дуги аорты перед левой подключичной артерии
        aorticlsthmus: SelectedPatient.MCT.aorticlsthmus, // перешеек
        desc_aorta_middle_part: SelectedPatient.MCT.desc_aorta_middle_part, // средняя часть нисходящей аорты
        abdominal_aorta: SelectedPatient.MCT.abdominal_aorta, // брюшная аорта
    }
    const {data, errors, handleInputChange, handleKeyDown, validate} = useForm(initialMCT, true, validatorConfig);
    const [updatePatient, {}] = patientAPI.useUpdatePatientMutation();// {}-функция, которую мы можем вызвать, чтобы произошла мутация, createPost - объект с полями

    const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(data))
        {
            const UpdatePatientData: IPatientUpdate = {
                patientID: SelectedPatient.patientID,
                employee_id: user!.id,
                MCT: {
                    AV_annulus_fibrosis: data.AV_annulus_fibrosis, // Фиброзное кольцо аортального клапана
                    sinuses_valsalva: data.sinuses_valsalva, // Синусы Вальсальвы
                    sinotubular_junction: data.sinotubular_junction, // Синотубулярное соединение
                    asc_aorta_pulm_art_bif: data.asc_aorta_pulm_art_bif, // Восходящий отдел аорты на уровне бифуркации легочной артерии
                    asc_aorta_before_BCS: data.asc_aorta_before_BCS, // Восходящий отдел аорты перед БЦС
                    aortic_arch_before_CCA: data.aortic_arch_before_CCA, // Дуги аорты перед ЛОСА
                    aortic_arch_before_LSA: data.aortic_arch_before_LSA, // Дуги аорты перед левой подключичной артерии
                    aorticlsthmus: data.aorticlsthmus, // перешеек
                    desc_aorta_middle_part: data.desc_aorta_middle_part, // средняя часть нисходящей аорты
                    abdominal_aorta: data.abdominal_aorta, // брюшная аорта

                }
            }
            await updatePatient(UpdatePatientData)
            navigate(`/auth/menu/patients/${SelectedPatient.patientID}/msct`)

        }
    }
    return (
        <>
        <h2 className='font-medium text-lg text-slate-800 pb-4'> Диаметр в мм на уровне:</h2>
        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
            <InputField autoFocus name='AV_annulus_fibrosis' label='Фиброзного кольца аортального клапана'/>
            <InputField autoFocus name='sinuses_valsalva' label='Синуса Вальсальвы'/>
            <InputField autoFocus name='sinotubular_junction' label='Синотубулярного соединения'/>
            <InputField autoFocus name='asc_aorta_pulm_art_bif' label='Восходящего отдела аорты на уровне бифуркации легочной артерии'/>
            <InputField autoFocus name='asc_aorta_before_BCS' label='Восходящего отдела аорты перед БЦС'/>
            <InputField autoFocus name='aortic_arch_before_CCA' label='Дуги аорты перед ЛОСА'/>
            <InputField autoFocus name='aortic_arch_before_LSA' label='Дуги аорты перед левой подключичной артерии'/>
            <InputField autoFocus name='aorticlsthmus' label='Перешейка'/>
            <InputField autoFocus name='desc_aorta_middle_part' label='Средней части нисходящей аорты'/>
            <InputField autoFocus name='abdominal_aorta' label='Брюшной аорты'/>

            <Button type='submit' onClick={handleUpdate} fullWidth disabled={Object.keys(errors).length !== 0}>
                Сохранить
            </Button>
        </Form>
        </>
    );
};

export default MSCTEdit;