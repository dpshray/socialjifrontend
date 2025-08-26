import HttpServices from "@/services/https.service";
import {toast} from "sonner";

class GigsService extends HttpServices {
    async createGig(data: any) {
        try {
            return await this.postRequest({
                url: "/influencer/gig",
                data,
                config: {
                    auth: true,
                    file: true
                }
            })
        } catch (error: any) {
            console.error("Error creating gig:", error);
            const errorMessage = error?.data;
            if (errorMessage?.errors?.email?.length) {
                errorMessage.errors.email.forEach((message: any) => {
                    toast(message);
                });
            }
            throw error;

        }
    }

    async GetAllGigs(page: number = 1) {
        try {
            const response = await this.getRequest({
                url: "/influencer/gig",
                config: {auth: true, params: {page}}
            });

            return response?.data || {};
        } catch (error: any) {
            console.error("Error fetching gigs:",error);
            throw error;
        }
    }


    async DeleteGig(id: number) {
        try {
            return await this.deleteRequest({
                url: `/influencer/gig/${id}`,
                config: {
                    auth: true
                }
            })

        } catch (error) {
            throw error;
        }
    }

    async GetGigById(id: number) {
        try {
            return await this.getRequest({
                url: `/influencer/gig/${id}`,
                config: {
                    auth: true
                }
            })

        } catch (error) {
            throw error;
        }
    }

    async updateGig(id: number, data: any) {
        try {
            const result: any = await this.putRequest({
                url: `/influencer/gig/${id}`,
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

    async getAllPricingTiers() {
        try {
            const response = await this.getRequest({
                url: "/pricing-tier",
                config: {auth: true}
            });
            return response?.data || [];
        } catch (error: any) {
            console.error("Error fetching pricing tiers:", error?.response?.data || error.message);
            throw error;
        }
    }


}

export const gigsService = new GigsService();