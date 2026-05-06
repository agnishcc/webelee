import { ServiceError } from "@repo/exception";
import { CreateHomeDto } from "./dto";

export class CreateHomeRepo {
    private dto: CreateHomeDto;
    constructor() {
        this.dto = new CreateHomeDto();
    }

    /**
     * @description Creates a new home
     * @param title 
     * @param userId 
     * @returns Created home
     */
    async createHome(title: string, userId: number) {
        try {
            const result = await this.dto.createHome(title, userId);
            return result;
        } catch (error) {
            throw ServiceError.catch(error, 'Error in CreateHomeRepo.createHome');
        }
    }

    /**
     * @description Adds a user to a home
     * @param homeId 
     * @param userId 
     */
    async addUserToHome(homeId: number, userId: number) {
        try {
            await this.dto.addUserToHome(homeId, userId);
        } catch (error) {
            throw ServiceError.catch(error, 'Error in CreateHomeRepo.addUserToHome');
        }
    }
}