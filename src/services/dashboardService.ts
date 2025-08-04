import HttpsService from "@/services/https.service";

class DashboardService extends HttpsService {
    async insightsInfluencer(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                //client/explorer/influencer?per_page=10&page=1
                url: "/client/explorer/influencer",
                config: {
                    params
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async brandInsights(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                //client/explorer/influencer?per_page=10&page=1
                url: "/client/explorer/brand",
                config: {
                    params
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async gigInsights(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                //client/explorer/influencer?per_page=10&page=1
                url: "client/explorer/top_sales",
                config: {
                    params
                },
            });
        } catch (error) {
            throw error;
        }
    }
}

const dashboardService = new DashboardService();
export default dashboardService;