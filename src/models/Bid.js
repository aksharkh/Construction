import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Bid = sequelize.define("Bid",{
    id:{type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true},
    price:{type: DataTypes.DECIMAL(10,2), allowNull: false},
    estimatedDuration:{type: DataTypes.STRING, allowNull: false},
    status:{type: DataTypes.ENUM("Pending", "Accepted", "Rejected"), defaultValue: "Pending"}
});

export default Bid;