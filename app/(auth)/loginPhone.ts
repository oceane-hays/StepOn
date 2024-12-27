import {Auth, signInWithPhoneNumber} from "@firebase/auth";

export const loginPhone = async (phone : string, setLoading: (loading: boolean) => void, auth: Auth, appVerifier    ) => {
    setLoading(true);
    try {
        const response = await signInWithPhoneNumber(auth, phone, appVerifier);
        return response.user; // Return the user object
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to login: ${error.message}`);
    } finally {
        setLoading(false);
    }
}