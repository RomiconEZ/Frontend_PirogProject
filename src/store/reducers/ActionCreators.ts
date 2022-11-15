import {AppDispatch} from "../store";
import axios from "axios";
import {IUser} from "../../models/IUser";
import {userSlice} from "./UserSlice";
import {createAsyncThunk} from "@reduxjs/toolkit";

// Асинхронный редусер

// Упрощение для toolkit

// Данный редусер не используется
export const fetchUser = createAsyncThunk(
    'user',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser>('https://jsonplaceholder.typicode.com/user2s')
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить пользователя")
        }
    }
)