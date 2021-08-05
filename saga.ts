import { call, put, take, takeLatest } from 'redux-saga/effects'
import auth, {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {eventChannel, EventChannel} from "redux-saga";
import {buildLoginCompleteAction, buildLoginRequestAction, buildOngoingAction} from "./reducer";
import {Action} from "redux";


function* fetchUser(action) {
    console.log("callSingIn")
    yield put(buildOngoingAction());
    const instance = auth()
    instance.settings.appVerificationDisabledForTesting = true
    const unused = yield call([instance, instance.signInWithPhoneNumber],"+12345678901");
    console.log("returnSignIn")
    yield put(buildLoginRequestAction());

}

function createSignInListener(): EventChannel<unknown> {
    const signInService = auth();
    console.debug('onAuthStateChanged: create channel');
    return eventChannel((emitter) => {
        const onUserChange = (data: FirebaseAuthTypes.User | null) => {
            console.debug('onAuthStateChanged: signInUser ' + data);
            if (data !== null) {
                console.debug('onAuthStateChanged: emit login');
                emitter(buildLoginCompleteAction());
            }
        };
        return signInService.onAuthStateChanged(onUserChange);
    });
}

function* watchCompleteSignInUser(): Generator {
    // This is where you wait for a callback from firebase
    const channel = createSignInListener();
    while (true) {
        const event = yield take(channel);
        yield put(event as Action);
    }
}

function* loginSaga() {
    yield takeLatest("signIn/loginNeeded", fetchUser);
    yield takeLatest("signIn/loginNeeded", watchCompleteSignInUser);
}

export default loginSaga;
