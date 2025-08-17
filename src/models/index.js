import sequelize from "../config/database.js";
import Bid from "./Bid.js";
import Milestone from "./Milestone.js";
import Project from "./Project.js";
import User from "./User.js";


User.hasMany(Project, { foreignKey:"homeownerId", as:"projects"});
Project.belongsTo(User, { foreignKey:"homeownerId", as:"homeowner"});


User.hasMany(Bid, { foreignKey: "contractorId", as: "bids"});
Bid.belongsTo(User, { foreignKey:"contractorId", as:"contractor"});

Project.hasMany(Bid, { foreignKey: "projectId",as:"bids"});
Bid.belongsTo(Project, { foreignKey:"projectId", as: "project"});

Project.hasMany(Milestone, { foreignKey: "projectId", as:"milestones"});
Milestone.belongsTo(Project, { foreignKey: " projectId", as:"project"});



export { User, Project, Bid, Milestone, sequelize};