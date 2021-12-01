import axios from "axios"
import { API_URL } from "../../helper"

// Sebelum Perubahan
// export const loginAction=(data)=>{
//     console.log(`DATA DARI UI/COMPONENT==>`,data)
//     return {
//         type:"LOGIN_SUCCESS",
//         payload:data

//     }
// }

export const loginAction = (email, password) => {
    // Cara ke 1

    // return (dispatch) => {
    //     axios.get(`${API_URL}/dataUser?email=${email}&password=${password}`)
    //         .then((response) => {
    //             if (response.data.length > 0) {
    //                 localStorage.setItem("data", JSON.stringify(response.data[0]))
    //                 // dispatch : meneruskan data ke reducer
    //                 dispatch({
    //                     type: "LOGIN_SUCCESS",
    //                     payload: response.data[0]

    //                 })
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })

    // }

    // Cara ke 2
    return async (dispatch) => {
        try {
            let response = await axios.get(`${API_URL}/dataUser?email=${email}&password=${password}`)
            if (response.data.length > 0) {
                localStorage.setItem("data", JSON.stringify(response.data[0]))
                // dispatch : meneruskan data ke reducer
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: response.data[0]
                })
                return { success: true }
            }
        } catch (err) {
            console.log(err)
        }
    }
}

export const logOutAction = () => {
    return {
        type: "LOGOUT",

    }

}