import HttpsService from "@/services/https.service";

class DashboardService extends HttpsService {
    async explorerInfluencer(params: { per_page?: number, page?: number }) {
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

    async explorerBrand(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                url: "/client/explorer/brand",
                config: {
                    params
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async explorerTopSales(params: { per_page?: number, page?: number }) {
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

    //Insights
    async getTopCreators(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                url: "/client/insights/top-brands",
                config: {
                    params
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getTopCategories(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                url: "/client/insights/brands-by-category",
                config: {
                    params
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getPlatformPieChart() {
        try {
            return await this.getRequest({
                url: "client/insights/new-influencers-monthly",
            });
        } catch (error) {
            throw error;
        }
    }

    async getInsightsStats() {
        try {
            const response = await this.getRequest({
                url: "client/insights/insight-card"
            });
            return response.data
        } catch (error) {
            throw error;
        }
    }
}

const dashboardService = new DashboardService();
export default dashboardService;