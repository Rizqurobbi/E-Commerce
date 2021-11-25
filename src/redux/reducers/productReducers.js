const INITIAL_STATE = {
    nama: "",
    deskripsi: "",
    brand: "",
    kategori: "",
    harga: null,
    id: null
}

export const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "DATA_TERAMBIL":
            console.log("DATA DARI ACTION PAYLOAD", action.payload)
            return {
                ...state,
                nama: action.payload.nama,
                deskripsi: action.payload.deskripsi,
                brand: action.payload.brand,
                kategori: action.payload.kategori,
                harga: action.payload.harga,
                id: action.payload.id,
            }



        default:
            return state
    }
}