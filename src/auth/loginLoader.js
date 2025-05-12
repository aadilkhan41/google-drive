import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { redirect } from "react-router-dom";

function waitForFirebaseAuth() {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        },(error)=>{
            reject(error);
        });
    });
}

export async function loginLoader(){
    try{
        const user = await waitForFirebaseAuth();
        if(user) return(redirect('/', { replace: true }));
        else return null;
    }catch{
        console.error("Error during authentication:", error);
        return null;
    }
}