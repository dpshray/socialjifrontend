import HttpsService from "@/services/https.service";

class PaymentService extends HttpsService {
    async createPaymentIntent(amount: number) {
        const response = await this.postRequest({
            url: '/trustap/create/guest_user',
            data: {amount}
        });
        console.log('Response from createPaymentIntent:', response);
        return response
    }

    async redirectToFormPage() {
        try {
            const response = await this.getRequest({
                url: '/trustap/auth/redirect',
                config: {auth: true}
            });
            console.log('Response from redirectToFormPage:', response.data);
            return response
        } catch (error) {
            console.error('Error in redirectToFormPage:', error);
        }
    }

    async createGuestUser(data: any) {
        try {
            const response = await this.postRequest({
                url: '/trustap/create/guest_user',
                data,
                config: {auth: true}
            });
            console.log('Response from createGuestUser:', response.data);
            return response
        } catch (error) {
            console.error('Error in createGuestUser:', error);
        }
    }

    async brandPaymentList(params: { per_page?: number, page?: number }) {
        try {
            return await this.getRequest({
                url: '/trustap/get-brand-transaction-lists',
                config: {auth: true, params}
            })
        } catch (error) {
            console.error('Error in brandPaymentList:', error);
        }
    }

    async brandPaymentComplaint(complaintId: number, data: any) {
        try {
            return await this.postRequest({
                url: `/trustap/buyer-submit-complaint/${complaintId}`,
                data,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }

    async createTransaction(gigId: number, data: any) {
        try {
            return await this.postRequest({
                url: '/trustap/create_transaction/' + gigId,
                data,
                config: {auth: true}
            })
        } catch (error) {
            throw error
        }
    }
}

const paymentService = new PaymentService();
export default paymentService