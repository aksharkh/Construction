import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Project = sequelize.define("Project",{
    id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    title:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.TEXT, allowNull: false},
    location:{type: DataTypes.STRING, allowNull: false},
    status:{ type: DataTypes.ENUM("Planning", "In Progress","Completed"), defaultValue: "Planning"}
});

export default Project;