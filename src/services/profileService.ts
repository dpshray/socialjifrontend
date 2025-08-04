import HttpServices from "@/services/https.service";

class ProfileService extends HttpServices {
    async getProfile() {
        try {
            const result: any = await this.getRequest({
                url: "/profile",
                config: {auth: true},
            });
            return result?.data;
        } catch (error: any) {
            console.log(`getProfile Error:`, error);
            throw error
        }
    }
}

const profileService = new ProfileService();
export default profileService;