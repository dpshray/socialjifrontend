import HttpServices from "@/services/https.service";

interface ReviewQueryParams {
    page?: number;
    per_page?: number;
}

class ReviewsService extends HttpServices {
    async getReviewById(id: number, params?: ReviewQueryParams) {
        try {
            const response = await this.getRequest({
                url: `/list-gig-review/${id}`,
                config: {
                    params,
                },
            });

            return response?.data;
        } catch (error: any) {
            console.error(
                "Error fetching reviews from getReviewById:",
                error?.response?.data || error.message
            );
            throw error;
        }
    }

    async createReview(data: any) {
        try {
            return await this.postRequest({
                url: "/list-gig-review",
                data,
                config: {
                    auth: true,
                },
            });
        } catch (error: any) {
            console.error("Error creating review:", error);
            throw error;
        }
    }

    async saveReview(data: any, gigId: number) {
        try {
            return await this.postRequest({
                url: `save-review/${gigId}`,
                data,
                config: {
                    auth: true,
                },
            });
        } catch (error: any) {
            console.error("Error creating review:", error);
            throw error;
        }
    }

    async getAllReview(params?: ReviewQueryParams) {
        try {
            const response = await this.getRequest({
                url: "/infuencer-gig-reviews",
                config: {
                    auth: true,
                    params,
                }
            })
            return response?.data;
        } catch (error: any) {
            console.error("Error fetching reviews from getAllReview:", error);
            throw error;
        }
    }

}

export const reviewsService = new ReviewsService();
