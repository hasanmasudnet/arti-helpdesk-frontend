import apiInstance from "@/lib/apiInstance";

export const useAuth = () => {
    const login = async (email, password) => {
        const response = await apiInstance.post("auth/login", {
            email,
            password,
        });
        const { access_token, user } = response.data;

        // Store token and user info in localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user", JSON.stringify(user));

        return response.data;
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    };

    const getToken = () => {
        return localStorage.getItem("access_token");
    };

    return { login, logout, getToken };
};
