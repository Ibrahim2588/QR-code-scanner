import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const historiqueSlice = createSlice({
    name: 'historique',
    initialState,
    reducers: {
        addHistoriqueElement: (state, action) => {
            return (state = [action.payload, ...state])
        },
        addHistoriqueMultipleElement: (state, action) => {
            state.concat(action.payload)
        },
    },
})

export const { addHistoriqueElement, addHistoriqueMultipleElement } =
    historiqueSlice.actions
