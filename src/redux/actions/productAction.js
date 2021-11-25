export const dataAction=(data)=>{
    console.log(`DATA UI`,data)
    return{
        type:"DATA_TERAMBIL",
        payload:data
    }
}