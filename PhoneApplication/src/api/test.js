const axios = require('axios')

const generateRefreshToken = async (refresh='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczOTU1MTQ3MywiaWF0IjoxNzM5MjkyMjczLCJqdGkiOiI3Y2MyZThlNGM1YzM0NWIzYWE4Y2FjYjgyYjVlN2E2NiIsInVzZXJfaWQiOiI2N2E5YmI4OWQ1ODdjMTU5MDA1MGUzNzcifQ.rBgP0miRtrvjJU58I1IEx-BjC8QR1AA5jtQ90Vw3VWQ') => {   
    try {
        if (!refresh) {
            console.log("Unable to fetch refresh token")
            throw new Error("Refresh token not received")
        }

        const response = await axios.post('http://65.0.179.194:7256/api/user/refresh/', 
            { refresh }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data && response.data['new-access']) {
            console.log('New access token:', response.data['new-access']);
            return response.data;
        } else {
            throw new Error('No access token in response');
        }
    } catch (err) {
        console.error('Refresh token error:', {
            status: err.response?.status,
            data: err.response?.data,
            message: err.message
        });
        throw err; // Re-throw to handle it in the calling code
    }
}

// Execute and handle any errors
generateRefreshToken()
    .then(data => console.log('Success:', data))
    .catch(error => console.log('Failed:', error.message));