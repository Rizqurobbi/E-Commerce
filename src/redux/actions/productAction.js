import axios from "axios"
import { API_URL } from "../../helper"
// export const dataAction=(data)=>{
//     console.log(`DATA UI`,data)
//     return{
//         type:"DATA_TERAMBIL",
//         payload:data
//     }
// }


// Sebelum Perubahan
// export const getProductsAction = (data) => {
//     return {
//         type: "GET_DATA_PRODUCTS",
//         payload: data
//     }   
// }

// Cara ke 1
// export const getProductsAction = () => {
//     return(dispatch) => {
//         axios.get(`${API_URL}/products`)
//         .then((response)=>{
//             if(response.data.length>0){
//                 dispatch({
//                     type: "GET_DATA_PRODUCTS",
//                     payload: response.data
//                 })
//             }


//         }) .catch((err)=>{
//             console.log(err)
//         })
//     }

// }
// Cara ke 2 (async)
// export const getProductsAction = (search) => {
//     return async (dispatch) => {
//         try {
//             let res = await axios.get(`${API_URL}/products${search ? `?nama=${search}` : ""}`)
//             dispatch({
//                 type: "GET_DATA_PRODUCTS",
//                 payload: res.data
//             })
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

export const getProductsAction = (search, minimum, maximum) => {
    return async (dispatch) => {
        try {
            let res;
            // Cara 1
            if (search) {
                res = await axios.get(`${API_URL}/products?nama=${search}`)
            } else if (minimum, maximum) {
                res = await axios.get(`${API_URL}/products?harga_gte=${minimum}&harga_lte=${maximum}`)
            } else {
                res = await axios.get(`${API_URL}/products`)
            }
            // Cara 2
            // res = await axios.get(`${API_URL}/products${search? `?nama=${search}` : ""}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export const sortingProduct = (sort) => {
    return async (dispatch) => {
        try {
            let res = await axios.get(`${API_URL}/products?_sort=${sort.field}&_order=${sort.sortType}`)
            dispatch({
                type: "GET_DATA_PRODUCTS",
                payload: res.data
            })

        } catch (error) {
            console.log(error)
        }
    }
}

// export const sortingProduct = (sort = null) => {
//     return async (dispatch) => {
//         try {
//             let res;
//             if (sort) {

//                 if (sort.namaAsc) {
//                     res = await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
//                 } else if (sort.namaDesc) {
//                     res = await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)

//                 } else if (sort.hargaAsc) {
//                     res = await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)

//                 } else if (sort.hargaDesc) {
//                     res = await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)

//                 }
//             } else {
//                 res = await axios.get(`${API_URL}/products`)

//             }
//             dispatch({
//                 type: "GET_DATA_PRODUCTS",
//                 payload: res.data
//             })

//         } catch (error) {
//             console.log(error)
//         }
//     }
// }

// export const sortingProduct = (namaAsc, namaDesc, hargaAsc, hargaDesc) => {
//     return async (dispatch) => {
//         try {
//             let res;
//             if (namaAsc) {
//                 res = await axios.get(`${API_URL}/products?_sort=nama&_order=asc`)
//             } else if (namaDesc) {
//                 res = await axios.get(`${API_URL}/products?_sort=nama&_order=desc`)

//             } else if (hargaAsc) {
//                 res = await axios.get(`${API_URL}/products?_sort=harga&_order=asc`)

//             } else if (hargaDesc) {
//                 res = await axios.get(`${API_URL}/products?_sort=harga&_order=desc`)

//             } else {
//                 res = await axios.get(`${API_URL}/products`)

//             }

//             dispatch({
//                 type: "GET_DATA_PRODUCTS",
//                 payload: res.data
//             })

//         } catch (error) {
//             console.log(error)
//         }
//     }
// }