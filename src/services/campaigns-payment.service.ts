import HttpsService from "@/services/https.service";


class CampaignsPaymentService extends HttpsService {

//     /trustap/campaign/create_transaction/1  brand
    async createTransactionCampaignBrand(campaignId: number, data: any) {
        try {
            return await this.postRequest({
                url: '/trustap/campaign/create_transaction/' + campaignId,
                data,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }
    //trustap/campaign/item-delivery-confirmation/11
    async itemDeliveryConfirmationInfluencer(paymentId: number) {
        try {
            return await this.postRequest({
                url: '/trustap/campaign/item-delivery-confirmation/' + paymentId,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }
    //trustap/campaign/bidder-accept-deposit/11
    async bidderAcceptDepositInfluencer(paymentId: number) {
        try {
            return await this.postRequest({
                url: '/trustap/campaign/bidder-accept-deposit/' + paymentId,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }
    async handoverCampaignInfluencer(paymentId: number) {
        try {
            return await this.postRequest({
                url: '/trustap/campaign/handover-campaign/' + paymentId,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }
    //trustap/campaign/item-delivery-confirmation/11
    async deliverCampaignInfluencer(paymentId: number) {
        try {
            return await this.getRequest({
                url: '/trustap/campaign/item-delivery-confirmation/' + paymentId,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }
}

const campaignsPaymentService = new CampaignsPaymentService();
export default campaignsPaymentService

