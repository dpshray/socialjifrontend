import HttpServices from "@/services/https.service";

class BrandService extends HttpServices {

    searchGigs = async (
        params: { name?: string; from_price?: number; to_price?: number; page?: number }
    ) => {
        try {
            const response = await this.getRequest({
                url: `/gig/search`,
                config: {
                    auth: true,
                    params,
                },
            });
            return response?.data;
        } catch (error: any) {
            console.error("Error fetching gigs from searchGigs:", error?.response?.data || error.message);
            throw error;
        }
    };


    searchCreators = async (
        params: { name?: string; from_price?: number; to_price?: number; page?: number }
    ) => {
        try {
            // search/influencer?name=osh&per_page=2&page=1
            const response = await this.getRequest({
                url: `/search/influencer`,
                // url: `https://socialapi.stage.dworklabs.com/api/v1/search/influencer/`,
                config: {
                    auth: true,
                    params,
                },
            });
            return response?.data;
        } catch (error: any) {
            console.error("Error fetching creators from searchCreators:", error?.response?.data || error.message);
            throw error;
        }
    };


    getInfluencerById = async (id: number) => {
        try {
            const response = await this.getRequest({
                url: `/fetch-auth-user/${id}`,
                config: {
                    auth: true,
                },
            });
            return response?.data;
        } catch (error: any) {
            console.error("Error fetching gig details:", error?.response?.data || error.message);
            throw error;
        }
    }
    brandDashboard = async () => {
        try {
            const response = await this.getRequest({
                url: `/brand/dashboard`,
                config: {
                    auth: true,
                },
            });
            return response?.data;
        } catch (error: any) {
            console.error("Error fetching gig details:", error?.response?.data || error.message);
            throw error;
        }
    }
}

export const brandService = new BrandService();