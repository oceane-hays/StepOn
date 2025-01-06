import auth from '@react-native-firebase/auth';


export const loginPhone = async (countryCode: string, phoneNumber: string, setConfirm: (confirm: any) => void) => {
    // try {
    //     const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    //     const confirmation = await auth().signInWithPhoneNumber(fullPhoneNumber);
    //     setConfirm(confirmation);
    // } catch (error) {
    //     console.error('Error during phone authentication:', error);
    //     throw error;
    // }
}

