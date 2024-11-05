import models from "../models/models.js";

class ConsumptionController {
    async getAllConsumptions () {
        try {
            const consumptions = await models.Consumption.findAll()

            return consumptions
        } catch (e) {
            throw e
        }
    }
}

export default new ConsumptionController()