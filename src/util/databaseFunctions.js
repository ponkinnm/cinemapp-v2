import {push, ref} from "firebase/database";
import {database} from "../firebaseConfig";

export default async function uploadScoreToFirebase(user, score) {
    if (score === 0) {
        return;
    }
    const dbRef = await ref(database, `users/${user.uid}/highScore`);

    push(dbRef, score);
}