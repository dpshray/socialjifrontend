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

    async getInfluencerCampaigns(params?: { per_page?: number, page?: number, search?: string }) {
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
            const result: any = await this.postRequest({
                url: `/update-campaign/${id}`,
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
            throw error
        }
    }

    async getBidsForCampaign(id: number, params?: { per_page?: number, page?: number }) {
        try {
            const result: any = await this.getRequest({
                //campaign-bidders/20?per_page=10&page=1
                url: `/campaign-bidders/${id}`,
                config: {
                    auth: true,
                    params
                }
            })
            return result?.data
        } catch (error) {
            throw error
        }
    }


    async assignCampaignToInfluencer(id: number) {
        try {
            return await this.getRequest({
                //bids/1/toggle-assignment
                url: `/bids/${id}/toggle-assignment`,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }

    async getBrandCampaignPayments(params?: { per_page?: number, page?: number }) {
        try {
            const result: any = await this.getRequest({
                //trustap/campaign/fetch-transaction-list?per_page=10
                url: `/trustap/campaign/fetch-transaction-list`,
                config: {
                    auth: true,
                    params
                }
            })
            return result?.data
        } catch (error) {
            throw error
        }
    }
    async getInfluencerCampaignPayments(params?: { per_page?: number, page?: number }) {
        try {
            const result: any = await this.getRequest({
                //trustap/campaign/get-bids-status?
                url: `/trustap/campaign/get-bids-status`,
                config: {
                    auth: true,
                    params
                }
            })
            return result?.data
        } catch (error) {
            throw error
        }
    }

    //trustap/campaign/get-brand-transaction-lists-no-trustap-user
    async getBrandCampaignPaymentsNoTrustapUser(params?: { per_page?: number, page?: number }) {
        try {
            const result: any = await this.getRequest({
                //trustap/campaign/get-brand-transaction-lists-no-trustap-user
                url: `/trustap/campaign/get-brand-transaction-lists-no-trustap-user`,
                config: {
                    auth: true,
                    params
                }
            })
            return result?.data
        } catch (error) {
            throw error
        }
    }
}

const campaignService = new CampaignService();
export default campaignService