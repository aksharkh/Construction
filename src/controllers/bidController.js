import { Bid, Project } from '../models/index.js';


export const submitBid = async (req, res) => {
    const { price, estimatedDuration } = req.body;
    const { projectId } = req.params;


    try {
        const project = await Project.findByPk(projectId);
        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if(project.status !== "Planning") {
            return res.status(400).json({
                message: "This project is not currently accepting bids."
        });
        }

        const bid = await Bid.create({
            price,
            estimatedDuration,
            projectId,
            contractorId: req.user.id
        });

        res.status(201).json(bid);

    } catch (error) {
        console.error("Error submitting bid:", error);
        return res.status(500).json({
            message: "Internal server error while submitting bid",
            error: error.message
        });
    }
}