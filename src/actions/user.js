import { FirebaseAuth, FirebaseDB } from "../lib/firebase";

export const FETCH_USER = "FETCH_USER";
export const FETCH_ADMIN = "FETCH_ADMIN";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";
export const LOGIN_USER_FAIL = "LOGIN_USER_FAIL";
export const RESET_ERROR = "RESET_ERROR";

export const fetchUser = () => dispatch => {
    FirebaseAuth.onAuthStateChanged(user => {
        if (user) {
            const userRef = FirebaseDB.collection("users").doc(user.uid).get().then(
                doc => { 
                    const data = doc.data();
                    if (data.role == "Maintainer") {
                        dispatch({
                            type: FETCH_ADMIN,
                            data: user,
                        })
                    } else {
                        dispatch({
                            type: FETCH_USER,
                            data: user
                        })
                    }
                }
            );
        } else {
            dispatch({
                type: FETCH_USER,
                data: null
            });
        }
    });
};

export const signIn = (email, password) => async dispatch => {
    dispatch({
        type: RESET_ERROR,
        data: null
    });

    try {
        const user = await FirebaseAuth.signInWithEmailAndPassword(email, password);
        const userRef = await FirebaseDB.collection("users").doc(user.user.uid).get();
        const data = userRef.data();
        console.log(data.role);
        if (data.role == "Maintainer") {
            dispatch({
                type: FETCH_ADMIN,
                data: user.user,
            })
        } else {
            dispatch({
                type: FETCH_USER,
                data: user.user
            })
        }
    }
    catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            data: error.message
        })
    }
};

export const signOut = () => async dispatch => {
    try {
        await FirebaseAuth.signOut();
    }
    catch (error) {
        console.log(error);
    }
};

export const signUp = (email, password, website, nickname) => async dispatch => {
    dispatch({
        type: RESET_ERROR,
        data: null
    });

    try {
        const user = await FirebaseAuth.createUserWithEmailAndPassword(email, password);
        const response = await FirebaseDB.collection("users").doc(user.user.uid).set({
            email: user.user.email,
            website: website ?? "",
            nickname: nickname,
            role: "Contributor"
        });
        dispatch({
            type: FETCH_USER,
            data: user.user,
        })

    }
    catch (error) {
        dispatch({
            type: CREATE_USER_FAIL,
            data: error.message
        });
    }
};
