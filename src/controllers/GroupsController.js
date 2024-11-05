import models from "../models/models.js";

class GroupsController {
    async getAllGroups () {
        try {
            const groups = models.Group.findAll()

            return groups;
        } catch (e) {
            throw e
        }
    }
}

export default new GroupsController();