import { Milestone, Project, User, Bid } from "../models/index.js";



export const createProject = async ( req, res) => {
    const { title, description, location} = req.body;

    try{
        const project = await Project.create({
            title,
            description,
            location,
            homeownerId: req.user.id,
        });
        res.status(201).json(project);

    } catch(error){
        console.error("Error creating project:", error);
        return res.status(500).json({
            message: "Internal server error while creating project",
            error: error.message
        });
    }
};


export const getAllProjects = async (req, res) => {
    try {
        const prjects = await Project.findAll({
            where: { status: "Pending"},
            include: {
                model: User,
                as: "homeowner",
                attributes: ["name", "email"]
            }
            
            
        });

        res.status(200).json(prjects);

    } catch(error) {
        console.error("Error fetching projects:", error);
        return res.status(500).json({
            message: "Internal server error while fetching projects",
            error: error.message
        });
    }
};

export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findByPk(req.params.id, {
            include: [
                {model: User, as: "homeowner", attributes: ["name", "email"]},
                {
                    model: Bid,
                    as: "bids",
                    include: {model: User, as: "contractor", attributes: ["name", "email"]}
                },
                {model: Milestone, as: "milestones"}
            ]
        });

        if(!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (req.user.role === 'homeowner' && project.homeownerId !== req.user.id) {
            return res.status(403).json({ message: 'Forbidden: You can only view your own projects.' });
        }

        res.status(200).json(project);

    } catch(error) {
        console.error("Error fetching project by ID:", error);
        return res.status(500).json({
            message: "Internal server error while fetching project by ID",
            error: error.message
        });
    }
}