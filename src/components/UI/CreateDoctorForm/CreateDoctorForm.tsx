import {TextField, TextFieldProps} from '@mui/material';
import React, {useMemo} from 'react';
import {DatePickerField, InputField, RadioGroup, SelectField} from '../../common/Fields';
import validatorConfig from './validatorConfig';
import {Form, useForm} from "../../../hooks/useForm";
import withPassword from '../../common/Fields/HOC/withPassword';
import Button from "../../common/Button";
import {useAppSelector} from "../../../hooks/redux";
import {IDoctorCreate} from "../../../models/IDoctorCreate";
import {doctorAPI} from "../../../services/DoctorService";
import {PlacesOfWork} from "../../../DataLists/PlacesOfWork";
import {Occupations} from "../../../DataLists/Occupations";
import {Regions} from "../../../DataLists/Regions";
import {Roles} from "../../../DataLists/Roles";
import {genderItems} from "../../../DataLists/genderItems";

const {user} = useAppSelector(state => state.userReducer)


const initialData: IDoctorCreate = {

  name: '',
  surname: '',
  patronymic: '',
  birthdate: Date.now(),
    workExperience: 0,
  sex: 'male',
  region: user?.region || 'Северо-западный регоин',
  city: user?.city || 'Санкт-Петербург',
    placeOfWork: user?.placeofwork || 'нет',
    occupation: user?.occupation || 'нет',
    email: '',
    password: '',
    role: 'соразработчик'


}


const CreateDoctorForm = () => {
  const {data, errors, handleInputChange, handleKeyDown, validate} = useForm(initialData, true, validatorConfig);

  const [createDoctor, {}] = doctorAPI.useCreateDoctorMutation();// {}-функция, которую мы можем вызвать, чтобы произошла мутация, createPost - объект с полями

    const handleCreate = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate(data)) {await createDoctor(data)}
    }

    const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

    return (
      <>

        <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
          <InputField autoFocus name='name' label='Имя'/>
          <InputField name='surname' label='Фамилия'/>
            <InputField name='patronymic' label='Отчество'/>
            <InputField name='workExperience' label='Опыт работы'/>
          <RadioGroup name='sex' items={genderItems}/>

            <DatePickerField
              value={data.birthdate}
              onChange={handleInputChange}
              openTo='year'
              mask='__.__.____'
              label='Дата Рождения'
              name='birthdate'
              minDate={new Date('1900-01-01')}
              renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
            <TextField {...params} {...(errors?.birthYear && { error: true, helperText: errors?.birthYear })} />
          )}
        />
            <SelectField label='Регион' name='region' options={Regions}  />
            <SelectField label='Город' name='city' options={Cities}  />


            <SelectField label='Место работы' name='placeOfWork' options={PlacesOfWork}  />
            <SelectField label='Профиль' name='occupation' options={Occupations}  />
            <SelectField label='Роль' name='role' options={Roles}  />

            <InputField name='email' label='Почта' />
            <InputFieldWithPassword name='password' label='Пароль' type='password' />


            <Button type='submit' onClick={handleCreate} fullWidth disabled={Object.keys(errors).length !== 0}>
          Создать
        </Button>
      </Form>
    </>
  );
};

export default CreateDoctorForm;