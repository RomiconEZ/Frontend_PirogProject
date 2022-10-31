import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IDoctorShort} from "../models/IDoctorShort";
import {IDoctorUpdate} from "../models/IDoctorUpdate";
import {IDoctorFull} from "../models/IDoctorFull";
import {IDoctorCreate} from "../models/IDoctorCreate";

interface PaginationDoctors
{
    doctorID: string
    limit: number
    numofpage: number
}
interface DoctorForDoctor
{
    doctorID: string
    selecteddoctorID: string
}

export const doctorAPI = createApi({
    reducerPath: 'doctorAPI', // уникальное название
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Doctor'],
    endpoints: (build) => ({

        fetchDoctors: build.query<IDoctorShort[], PaginationDoctors>({

            query: (PaginationDoctorsForCertainDoctor) => ({
                url: `/doctors`,
                params: {
                    _doctorID: PaginationDoctorsForCertainDoctor.doctorID,
                    _limit: PaginationDoctorsForCertainDoctor.limit,
                    _numofpage: PaginationDoctorsForCertainDoctor.numofpage,
                }
            }),
            providesTags: result => ['Doctor']
        }),

        fetchSelectedDoctor: build.query<IDoctorFull, DoctorForDoctor>({

            query: (DoctorForDoctor) => ({
                url: `/doctors/${DoctorForDoctor.selecteddoctorID}`,
                params: {
                    _doctorID: DoctorForDoctor.doctorID,
                    _selecteddoctorID: DoctorForDoctor.selecteddoctorID,
                }
            }),
            providesTags: result => ['Doctor']
        }),

        createDoctor: build.mutation<void, IDoctorCreate>({ // передаем только те данные, которые нужны для первичного создания пользователя регистратурой
            query: (DoctorCreate) => ({
                url: `/newdoctor`,
                method: 'POST',
                body: DoctorCreate
            }),
            invalidatesTags: ['Doctor']
        }),
        updatePost: build.mutation<IDoctorUpdate, IDoctorUpdate>({ // отправляем только те данные, которые изменяем. И обратно принимаем также только изменившиеся данные
            query: (DoctorUpdate) => ({
                url: `/doctors/${DoctorUpdate.id}`,
                method: 'PUT',
                body: DoctorUpdate
            }),
            invalidatesTags: ['Doctor']
        }),
        deletePost: build.mutation<void, IDoctorUpdate>({
            query: (DoctorUpdate) => ({
                url: `/doctors/${DoctorUpdate.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Doctor']
        }),
    })
})
