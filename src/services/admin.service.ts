import HttpServices from "@/services/https.service";

class AdminService extends HttpServices {
    async getGigsList(params?: { per_page?: number, page?: number }) {
        try {
            const response = await this.getRequest({
                url: `admin/gig/list`,
                config: {
                    auth: true,
                    params
                }
            })
            return response?.data
        } catch (error) {
            throw error;
        }
    }
    async getInfluencerList(params?: { per_page?: number, page?: number }) {
        try {
            const response = await this.getRequest({
                url: `admin/influencer/list`,
                config: {
                    auth: true,
                    params
                }
            })
            return response?.data
        } catch (error) {
            throw error;
        }
    }
    async getBrandList(params?: { per_page?: number, page?: number }) {
        try {
            const response = await this.getRequest({
                url: `admin/brand/list`,
                config: {
                    auth: true,
                    params
                }
            })
            return response?.data
        } catch (error) {
            throw error;
        }
    }
    async getPaymentList( params?: { per_page?: number, page?: number }) {
        try {
            const response = await this.getRequest({
                url: `admin/payment/list`,
                config: {
                    auth: true,
                    params
                }
            })
            return response?.data
        } catch (error) {
            throw error;
        }
    }
}


const adminService = new AdminService();
export default adminService