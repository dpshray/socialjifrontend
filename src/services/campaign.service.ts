import HttpsService from "@/services/https.service";

class CampaignService extends HttpsService {

    async createCampaign(data: any) {
        try {
            const result: any = await this.postRequest({
                url: '/campaign',
                data,
                config: {
                    auth: true,
                    file: true
                }
            });
            console.log(' Response from createCampaign:', result.data);
            return result?.data;
        } catch (error) {
            throw error;
        }

    }

    async getCampaigns(params?: { per_page?: number, page?: number }) {
        try {

            const result: any = await this.getRequest({
                url: '/campaign',
                config: {
                    auth: true,
                    params
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }

    }

    async getCampaignById(id: number) {
        try {
            const result: any = await this.getRequest({
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

    async getInfluencerCampaigns(params?: { per_page?: number, page?: number }) {
        try {

            const result: any = await this.getRequest({
                url: '/campaign-list',
                config: {
                    auth: true,
                    params
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
                    auth: true,
                    file: true
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }

    }

    async deleteCampaign(id: number) {
        try {
            return await this.deleteRequest({
                url: `/campaign/${id}`,
                config: {
                    auth: true
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async getCampaignTags() {
        try {
            const result: any = await this.getRequest({
                url: '/campaign/get-brand-tag',
                config: {
                    auth: true
                }
            });
            return result?.data;
        } catch (error) {
            throw error;
        }
    }

    async createBidForCampaign(id: number, data: any) {
        try {
            return await this.postRequest({
                url: `/campaign/${id}/bid`,
                data,
                config: {auth: true}
            })
        } catch (error) {
            console.error('Error in brandPaymentList:', error);
        }
    }
}

const campaignService = new CampaignService();
export default campaignService