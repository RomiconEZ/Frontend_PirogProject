import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import CreatePatientForm from "../UI/CreatePatientForm";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {routes} from "../common/BreadCrumb";
import {NavLink} from "react-router-dom";

const CreatePatientPage = () => {
    const {isLoading, error} = useAppSelector(state => state.userReducer);
    const breadcrumbs = useBreadcrumbs(routes);

    return (
        <div className="ml-5 mb-10">
            <>
                {breadcrumbs.map(({ match, breadcrumb }) => (
                    <NavLink key={match.pathname} to={match.pathname} className="text-our-greenish-300 text-xs mr-1">
                        /{breadcrumb}
                    </NavLink>
                ))}
            </>

            <div>
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                <CreatePatientForm />
            </div>
        </div>
    );
};

export default CreatePatientPage;
