import React from 'react';
import {useAppSelector} from "../../hooks/redux";
import CreatePatientForm from "../UI/CreatePatientForm";

const PostContainer = () => {
    const {isLoading, error} = useAppSelector(state => state.userReducer);

// нужна кнопка создать
    return (
        <div>
            <div className="post__list">
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                <CreatePatientForm />
            </div>
        </div>
    );
};

export default PostContainer;
