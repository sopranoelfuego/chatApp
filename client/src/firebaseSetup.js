import firebase from "firebase"
import {firebaseConfig} from "./config/firebaseconfig"


const firebaseSetup=()=>firebase.initializeApp(firebaseConfig)
const auth=firebaseSetup.auth()
export {auth}
