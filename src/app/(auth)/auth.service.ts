import httpsService from "@/services/https.service";
import {toast} from "sonner"


class AuthService extends httpsService {

    async handleLogin(email: string, password: string) {
        try {
            const result: any = await this.postRequest({
                url: "/login",
                data: {email, password},
            });
console.log(`Login Result:`, result)
            return result?.data;
        } catch (error: any) {

            throw error;
        }
    }

    async fetchRole() {
        try {
            return await this.getRequest({
                url: "/get-roles",
            });
        } catch (error: any) {
            console.log(`getRoles Error:`, error);
            throw error
        }
    }

    async handleRegister(data: any) {
        try {
            return await this.postRequest({
                url: "/register",
                data,
                config: {
                    file: true
                }
            });
        } catch (error: any) {
            console.log(`handleRegister Error:`, error);
            throw error;
        }
    }


    async handleEmailVerification(email: string) {
        try {
            const token = localStorage.getItem("_at");
            if (!token) {
                throw new Error("Unauthorized: No token found");
            }
            const result: any = await this.postRequest({
                url: "/email/verification-notification",
                config: {auth: true},
                data: {email},
            });
            return result?.data;
        } catch (error: any) {
            console.log(`Resend Email Verification Error:`, error);
            throw error
        }
    }

    async getLoggedInUser() {
        try {
            const result: any = await this.getRequest({
                url: "/profile",
                config: {auth: true},
            });
            return result?.data;
        } catch (error: any) {
            console.log(`getLoggedInUser Error:`, error);
            throw error
        }
    }

    async logout() {
        try {
            const result: any = await this.postRequest({
                url: "logout",
                config: {auth: true},
            });

            localStorage.removeItem("_at");

            return result?.data;
        } catch (error: any) {
            console.log(`logout Error:`, error);
            throw error
        }
    }


    async handleForgotPassword(email: string) {
        try {
            return await this.postRequest({
                url: "/forgot-password",
                data: {email},
            });
        } catch (error: any) {
            if (error?.message?.includes('Expected response code "250/251/252" but got code')) {
                toast.error('There was an issue sending the email. Please wait and try again.');
            } else {
                toast.error(error?.message || 'An unexpected error occurred. Please try again.');
            }

            throw error;
        }
    }

    async handleResetPassword(data: any) {
        try {
            const result: any = await this.postRequest({
                url: "/reset-password",
                data: data
            });
            return result?.data;
        } catch (error: any) {
            if (error?.message?.includes('Invalid OTP')) {
                toast.error('Invalid OTP. Please try again.');
            } else {
                toast.error(error?.message || 'An unexpected error occurred. Please try again.');
            }
            throw error;
        }
    }



}

export const authService = new AuthService();