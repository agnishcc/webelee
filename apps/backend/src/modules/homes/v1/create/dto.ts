import { db, home, userHomeBridge } from "@repo/db";
import { DTOError } from "@repo/exception";


export class CreateHomeDto {
    async createHome(title: string, userId: number) {
        try {
            const result = await db.transaction(async (tx) => {
                const newHome = await tx.insert(home).values({ title }).returning();
                await tx.transaction(async (tx2) => {
                    await tx2.insert(userHomeBridge).values({
                        userId,
                        homeId: newHome[0].id,
                    });
                });
                return newHome;
            });
            return result;
        } catch (error) {
            throw DTOError.catch(error, 'Error creating home');
        }
    }

    async addUserToHome(homeId: number, userId: number) {
        try {
            await db.insert(userHomeBridge).values({
                userId,
                homeId,
            });
        } catch (error) {
            throw DTOError.catch(error, 'Error adding user to home');
        }
    }
}