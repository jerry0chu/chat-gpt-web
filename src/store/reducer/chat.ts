import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Chat} from "../../components/ChatList/ChatList";
import {chatList, currentTabKey} from "../../util/constanst";

export interface ChatState {
    loading: boolean;
    chatList: Chat[]
}

const key = localStorage.getItem(currentTabKey) || ''
const initialState: ChatState = {
    loading: false,
    chatList: JSON.parse(localStorage.getItem(key) || '[]')
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setChatList: (state, action: PayloadAction<Chat[]>) => {
            state.chatList = action.payload;
            const key = localStorage.getItem(currentTabKey)
            key && localStorage.setItem(key, JSON.stringify(state.chatList));
        },
        updateChatListFromLocalStorage: (state) => {
            const key = localStorage.getItem(currentTabKey) || ''
            state.chatList = JSON.parse(localStorage.getItem(key) || '[]') || []
        }
    }
})

export const {setLoading, setChatList, updateChatListFromLocalStorage} = chatSlice.actions;
export default chatSlice.reducer;