import { call, put, takeLatest } from 'redux-saga/effects'
import auth from "@react-native-firebase/auth";


function* fetchUser(action) {
    console.log("callSingIn")
    const instance = auth()
    instance.settings.appVerificationDisabledForTesting = true
    const unused = yield call([instance, instance.signInWithPhoneNumber],"+12345678901");
    console.log("returnSignIn")
    yield put({type: "signIn/loginRequest"});

}

function* loginSaga() {
    yield takeLatest("signIn/loginNeeded", fetchUser);
}

export default loginSaga;
