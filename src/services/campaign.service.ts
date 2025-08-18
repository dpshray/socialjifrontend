import HttpsService from "@/services/https.service";

class CampaignService extends HttpsService {

    async createCampaign(data: any) {
        try {
            const result: any = await this.postRequest({
                url: '/campaign',
                data,
                config: {
                    auth: true
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }

    }

    async getCampaigns() {
        try {
            const result: any = await this.getRequest({
                url: '/campaign',
                config: {
                    auth: true
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }

    }

    async updateCampaign(id: number, data: any) {
        try {
            const result: any = await this.putRequest({
                url: `/campaign/${id}`,
                data,
                config: {
                    auth: true
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }

    }

    async deleteCampaign(id: number) {
        try {
            const result: any = await this.deleteRequest({
                url: `/campaign/${id}`,
                config: {
                    auth: true
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }
    }
}

const campaignService = new CampaignService();
export default campaignService