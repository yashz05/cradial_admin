import { TransactionBaseService } from "@medusajs/medusa"
import { HomePage } from "../models/home_page"

class HomePageService extends TransactionBaseService {
    // ...

    async list(): Promise<HomePage[]> {
        const postRepo = this.activeManager_.getRepository(
            HomePage
        )
        return await postRepo.find()
    }
    async insertorupdatecategory(): Promise<boolean> {
        const postRepo = this.activeManager_.getRepository(
            HomePage
        )
        let n = false;
        const meAndBearsPhoto = await postRepo.findOneBy({
            title: "category",
        })
        if (meAndBearsPhoto == null) {
            await postRepo.save({
                title: "category",
                value: "true"
            })
            n = true
        } else {
            n = Boolean(meAndBearsPhoto['value'])
        }

        return n;
        // ...
    }
}