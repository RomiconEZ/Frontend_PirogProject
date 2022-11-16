import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {checkAuth, fetchUser, login, logout} from "./ActionCreators";

interface UserState {
    user: IUser | null;
    isLoading: boolean;
    error: string;
    isAuth: boolean;

}

const initialState: UserState = {
    user: {
        id: "",
        name: "",
        surname: "",
        patronymic: "",
        region: "",
        city: "",
        placeofwork:"",
        birthdate: 0,
        sex: "",
        workExperience: -1,
        occupation: "",
        email: "",
        role: -1,
        isActivated: false,
    },
    isLoading: false,
    error: '',
    isAuth: false,
}

// slice - reducer в контексте toolkit
// Затем можем вытащить отдельно reducer и action creator
export const userSlice = createSlice({
    name: 'user', // у каждого слайса уникальное название
    initialState, // дефолтное значение состояния
    reducers:
        {
            ChangeIsLoading (state, action: PayloadAction<boolean>)
            {
                state.isLoading = action.payload
            },
            ChangeIsAuth (state, action: PayloadAction<boolean>)
            {
                state.isLoading = action.payload
            },
            ChangeUser (state, action: PayloadAction<IUser>)
            {
                state.user = action.payload
            },
            ChangeError (state, action: PayloadAction<string>)
            {
                state.error = action.payload
            },
        },
    extraReducers: {
        // эти редусеры НЕ ИСПОЛЬЗУЕМ !!!
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.error = ''
            state.user = action.payload;
            state.isLoading = false;

        },
        [fetchUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchUser.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;

        },

        [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.error = '';
            state.isAuth=true;
            state.user = action.payload;
            state.isLoading = false;

        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isAuth=false; // !!! эксперементально
            state.error = action.payload
            state.isLoading = false;

        },


        [logout.fulfilled.type]: (state) => {
            state.isAuth=false;
            state.user = {} as IUser
            state.isLoading = false;

        },
        [logout.pending.type]: (state) => {
            state.isLoading = true;
        },
        [logout.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;
        },

        [checkAuth.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isAuth=true;
            state.user = action.payload
            state.isLoading = false;

        },
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true;
        },
        [checkAuth.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.error = action.payload
            state.isLoading = false;

        },

        [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.error = '';
            state.isAuth=true;
            state.user = action.payload;
            state.isLoading = false;

        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state,  action: PayloadAction<string>) => {
            state.isAuth=false; // !!! эксперементально
            state.error = action.payload
            state.isLoading = false;

        },

    }
})

export default userSlice.reducer; // вытаскиваем reducer
