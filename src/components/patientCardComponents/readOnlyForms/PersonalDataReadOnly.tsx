import React from 'react';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useParams} from "react-router-dom";
import {patientAPI, PatientForDoctor} from "../../../services/PatientService";
import {additionalSlice} from "../../../store/reducers/AdditionalSlice";

const {user} = useAppSelector(state => state.userReducer)

const PersonalDataReadOnly = () => {
    const dispatch = useAppDispatch()

    const params = useParams<string>()
    const body: PatientForDoctor = {
        doctorID: user?.id || '',
        patientID: params || ''
    }
    const {data: patient, error, isLoading, refetch} =  patientAPI.useFetchSelectedPatientQuery(body)

    const {SelectedPatient, IsEditButtonPressed} = useAppSelector(state => state.additionalReducer)

    if (patient != undefined)
    {
        dispatch(additionalSlice.actions.ChangeSelectedPatient(patient))
    }

    const birthday = new Date(patient?.personal_data.birthday || 0)
    return (

        <div className='p-8'>
            <h1 className='font-medium text-lg text-slate-800 pb-4'>Персональные данные режим чтения</h1>

            <div className='grid grid-cols-2 gap-y-3 mb-4'>

                <div className='col-span-2 flex'>
                    <span className='text-slate-400 w-1/4'>ФИО</span>
                    <span className='text-slate-800'>{patient?.personal_data.second_name + ' ' +
                        patient?.personal_data.first_name + ' ' + patient?.personal_data.patronymic}</span>
                </div>

                <div className='flex'>
                    <span className='text-slate-400 w-1/2'>Дата рождения</span>
                    <span className='text-slate-800 w-1/2'>{birthday.toLocaleDateString()}</span>
                </div>

                <div className='flex'>
                    <span className='text-slate-400 w-1/2'>Место обследования</span>
                    <span className='text-slate-800 w-1/2'>{patient?.personal_data.clinic}</span>
                </div>

                <div className='flex'>
                    <span className='text-slate-400 w-1/2'>Регион</span>
                    <span className='text-slate-800 w-1/2'>{patient?.personal_data.region}</span>
                </div>

                <div className='flex'>
                    <span className='text-slate-400 w-1/2'>Пол</span>
                    {patient?.personal_data.sex && <span className='text-slate-800 w-1/2'>мужской</span>}
                    {!patient?.personal_data.sex && <span className='text-slate-800 w-1/2'>женский</span>}
                </div>

            </div>


            <button
                onClick={()=>dispatch(additionalSlice.actions.ChangeIsEditButtonPressed(true))}
                className="relative mt-8 bottom-2 left-3/4 p-2 bg-transparent
                text-blue-600 font-semibold border border-blue-600
                rounded hover:bg-blue-600 hover:text-white hover:border-transparent
                transition ease-in duration-200 transform hover:-translate-y-1 active:translate-y-0">
                Редактировать
            </button>

        </div>
    );
};

export default PersonalDataReadOnly;