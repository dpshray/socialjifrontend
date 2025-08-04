import HttpServices from "@/services/https.service";

class InfluencerService extends HttpServices {
    async influencerTransactionList(params: { per_page?: number, page?: number }) {
        const data = {
            per_page: params.per_page,
            page: params.page
        }
        try {
            return await this.getRequest({
                // ///trustap/get-influencer-transaction-lists?per_page=5&page=1
                url: '/trustap/get-influencer-transaction-lists',
                config: {auth: true, params: data}
            })
        } catch (error) {
            console.error('Error in brandPaymentList:', error);
        }
    }
}

const influencerService = new InfluencerService()
export default influencerService