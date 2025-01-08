import {collection, getDocs} from "firebase/firestore";
import {FIREBASE_DB} from "@/services/FirebaseConfig";

export interface UserData {
    account_block: boolean;
    account_confirm: boolean;
    address: string;
    confirm_number: string;
    email: string;
    height: number;
    id: string;
    id_post: number[];
    name: string;
    password: string;
    phoneNumber: number;
    store_steps: {
        mon: number;
        tue: number;
        wed: number;
        thu: number;
        fri: number;
        sat: number;
        sun: number;
    };
    store_weight: {
        jan: number;
        feb: number;
        mar: number;
        apr: number;
        may: number;
        jun: number;
        jul: number;
        aug: number;
        sep: number;
        oct: number;
        nov: number;
        dec: number;
    };
    target_steps: number;
    weight: number;
}


export const fetchUsers = async (setUsers: (users: any[]) => void) => {
    try {
        const usersCollectionRef = collection(FIREBASE_DB, "Users");
        const querySnapshot = await getDocs(usersCollectionRef);
        const users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsers(users);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
