import TablePatients from "../patientsTablesComponents/TablePatients"
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {routes} from "../common/BreadCrumb";
import {NavLink} from "react-router-dom";
import React, {useEffect} from "react";
import Loader from "../common/Loader";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";

import {PaginationPatientsForCertainDoctor, patientAPI} from "../../services/PatientService";
import {patientsSlice} from "../../store/reducers/PatientsSlice";
import Button from "../common/Button";

const PatientsTablePage = () =>{
    const breadcrumbs = useBreadcrumbs(routes);

    const {user} = useAppSelector(state => state.userReducer);
    const body: PaginationPatientsForCertainDoctor = {
        doctorID: user!.id | 0,
        limit: 100,
        numofpage: -1,
    }

    const {data, error, isLoading: preloading, refetch}  = patientAPI.useFetchPatientsQuery(body)

    const dispatch = useAppDispatch()

    const RefetchRequest = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log("Обновление таблицы пациентов")
        refetch()
    }

    useEffect(() => {
        dispatch(patientsSlice.actions.patientsRequested())
    }, [])

    useEffect(() => {

        if ((preloading === false) && (data.data != undefined))
        {
            dispatch(patientsSlice.actions.patientsReceived(Array.from(data.data)))
        }
    }, [preloading])





    return(
        <div className="flex justify-center">
            <div className="w-4/5 bg-white px-12 mt-5 py-5 rounded-md">
                {preloading && <Loader/>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                <>
                    {breadcrumbs.map(({ match, breadcrumb }) => (
                        <NavLink key={match.pathname} to={match.pathname} className="text-our-greenish-300 text-xs mr-1">
                            /{breadcrumb}
                        </NavLink>
                    ))}
                </>
                <Button onClick={RefetchRequest} className="w-1/12 absolute top-0 right-0 ">
                    обновить
                </Button>
                <TablePatients/>
            </div>
        </div>
    )
}
export default PatientsTablePage