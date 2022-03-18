import axios from 'axios'
const setAuthToken = (token, url )=>{




    const defaultOptions = {
        baseURL:url,
        headers: {
          'Content-Type': 'application/json',
        },
      };

    let instance = axios.create(defaultOptions);
    
      // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('token');
        config.headers.Authorization =  token ? `Bearer ${token}` : '';
        return config;
    });

      
    if(token){
         //  axios.defaults.headers.common['authorization'] = token;
        // axios.defaults.headers.common['x-auth-token'] = token ;
        



    }
    else
    { 
    // delete axios.defaults.headers.common['Authorization'];
        // delete axios.defaults.headers.common['x-auth-token']
    }

}

export default setAuthToken