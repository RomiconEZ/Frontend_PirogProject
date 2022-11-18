import React, {useEffect} from 'react';
import {useAppSelector} from "../../hooks/redux";
import {useAppDispatch} from "../../store/store";
import {checkAuth, login, logout} from "../../store/reducers/ActionCreators";
import LoginForm from "../UI/LoginForm";
import {useNavigate} from "react-router-dom";



const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const {user, isLoading, error, isAuth} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        // проверка на токен
        if (localStorage.getItem('token')) {
            dispatch(checkAuth())
        }
    }, []) // отрабатывает только при первом запуске приложения


    if (isLoading) {
        return <div>Загрузка...</div>
    }

    if (isAuth === true) {
        navigate('/menu');
    }

    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default LoginPage; // длоя отслеживание изменений в данных мобыксом
