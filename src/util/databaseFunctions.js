import {get, set, push, ref} from "firebase/database";
import {database} from "../firebaseConfig";
import {auth} from "../firebaseConfig";

export async function uploadScoreToFirebase(user, score) {
    if (score === 0) {
        return;
    }
    const dbRef = await ref(database, `users/${user.uid}/highScore`);

    push(dbRef, score);
}

export async function checkIfUsernameAlreadyTaken(displayName) {
    return new Promise((resolve, reject) => {
        const dbRef = (ref(database, 'users'));
        get(dbRef)
            .then(response => {
                if (response.hasChildren()) {
                    response.forEach((child) => {
                        const user = child.val()
                        if (user.username === displayName) {
                            return reject({message: "Username taken"});
                        }
                    })
                    return resolve();
                }
            })
    })
}

export function writeUserToDatabase(displayName, email) {
    set(ref(database, 'users/' + auth.currentUser.uid), {
        username: displayName,
        uid: auth.currentUser.uid,
        email: email,
        highScore: []
    }).catch(err => console.error(err.message))
}
