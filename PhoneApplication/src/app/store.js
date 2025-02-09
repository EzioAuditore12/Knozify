import {configureStore} from '@reduxjs/toolkit';

import authReducer from '../features/user/user.auth';

const store=configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store;