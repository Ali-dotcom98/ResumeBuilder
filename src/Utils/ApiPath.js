export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
    AUTH: {
        REGISTER: "Auth/register",
        LOGIN: "/Auth/login",
        GET_PROFILE: "/Auth/profile"
    },

    RESUME: {
        CREATE: "/Resume/CreateR",
        GET_ALL: "/Resume/GetR",
        GET_BY_ID: (id) => `/Resume/GetR/${id}`,
        UPDATE: (id) => `/Resume/UpdateR/${id}`,
        DELETE: (id) => `/Resume/DeleteR/${id}`,
        UPLOAD_IMAGES: (id) => `/Resume/${id}/upload-image`
    },

    IMAGE: {
        UPLOAD_IMAGE: "/Auth/uploadImg"
    }
};
