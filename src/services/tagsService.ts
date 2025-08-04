import HttpServices from "@/services/https.service";

class TagsService extends HttpServices {

    async addTags(tag: string) {
        try {
            const result: any =await this.postRequest({
                url: "/influencer/tag",
                data: {name: tag},
                config: {
                    auth: true
                }
            })
            return result?.data;
        } catch (error) {
            throw error;
        }

    }
    async getAllTags() {
        try {
            return await this.getRequest({
               url: "/influencer/tag",
               config: {
                   auth: true,
               }
           })
        } catch (error) {
            throw error;
        }

    }
}

export const tagsService = new TagsService();