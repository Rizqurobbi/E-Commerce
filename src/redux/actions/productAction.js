// export const dataAction=(data)=>{
//     console.log(`DATA UI`,data)
//     return{
//         type:"DATA_TERAMBIL",
//         payload:data
//     }
// }
export const getProductsAction = (data) => {
    return {
        type: "GET_DATA_PRODUCTS",
        payload: data
    }
}