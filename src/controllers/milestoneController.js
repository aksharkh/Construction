import { Milestone, Project } from '../models/index.js';


export const createMilestone = async (req, res) => {
    const { name, description, dueDate } = req.body;
    const { projectId } = req.params;

    try {

        const project = await Project.findByPk(projectId);

        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if(req.user.role == "homeowner" && project.homeownerId !== req.user.id) {
            return res.status(403).json({
                message: "You can only add milestones to your own projects."
            });
        }

        const milestone = await Milestone.create({
            name,
            description,
            dueDate,
            projectId
            
        });


        res.status(201).json(milestone);

    } catch (error) {
        console.error("Error creating milestone:", error);
        return res.status(500).json({
            message: "Internal server error while creating milestone",
            error: error.message
        });
    }
};


export const getMilestonesForProject = async (req, res) => {
    try {

        const milestones = await Milestone.findAll({ where: { projectId: req.params.projectId } });
        res.status(200).json(milestones);

    } catch (error) {
        console.error("Error fetching milestones:", error);
        return res.status(500).json({
            message: "Internal server error while fetching milestones",
            error: error.message
        });
    }
}