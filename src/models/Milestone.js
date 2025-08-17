import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Milestone = sequelize.define( "Milestone", {
    id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    name:{type: DataTypes.STRING, allowNull: false},
    description:{type: DataTypes.TEXT, allowNull: false},
    status: { type: DataTypes.ENUM("Pending", "In Progress", "Completed"), defaultValue: "Pending"},
    dueDate:{ type: DataTypes.DATE}
});

export default Milestone;