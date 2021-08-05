export enum SignInState {
    Unknown,
    OperationOngoing,
    LoginNeeded,
    VerificationCodeNeeded,
    VerificationCodeSent,
    Completed,
    Error,
}

export const initialState = {
    signInStatus: {
        state: SignInState.Unknown
    },
};
