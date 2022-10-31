import { configureStore } from '@reduxjs/toolkit'

import { historiqueSlice } from './slices/historique.slice'

export const store = configureStore({
    reducer: { historique: historiqueSlice.reducer },
})
