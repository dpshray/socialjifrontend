import HttpsService from "@/services/https.service";


class GlobalService extends HttpsService {

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


}


const globalService = new GlobalService();
export default globalService