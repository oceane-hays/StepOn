import { signInWithEmailAndPassword, Auth } from "@firebase/auth";

export const loginEmail = async (email: string, password: string, setLoading: (loading: boolean) => void, auth: Auth) => {
    setLoading(true);
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user; // Return the user object
    } catch (error: any) {
        console.error(error);
        throw new Error(`Failed to login: ${error.message}`);
    } finally {
        setLoading(false);
    }
}

