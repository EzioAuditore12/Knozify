import { handleSendingOTP } from "./sendOtpHook";
import { suggestUsernames } from "./suggestUsernameHook";
import { validateOTPHandler } from "./validateOTPHook";
import { checkUsernameHook } from "./checkUsernameHook";
import { finalizeRegisteration } from "./finalizeRegister";

export function useRegisterFormHook() {
   
    return {
        sendOTP: handleSendingOTP,
        validateOTP: validateOTPHandler,
        suggestUsername: suggestUsernames,
        checkUsername:checkUsernameHook,
        finalizeRegisteration
    }
}