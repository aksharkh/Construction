import express from 'express';
import { sequelize } from './models/index.js';
import "dotenv/config.js";
import authRoutes from './routes/authRoutes.js';
import projectRoutes from './routes/projectRoutes.js'; 
import bidRoutes from './routes/bidRoutes.js';         
import milestoneRoutes from './routes/milestoneRoutes.js';

const app = express();

app.use(express.json());


app.get("/", (req, res)=>{
    res.status(200).json({
        message: "API is running"
    });
});


app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/bids", bidRoutes);
app.use("/api/milestones", milestoneRoutes);

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        await sequelize.sync({ force: false});
        console.log("Database synchronized successfully");

        app.listen(PORT, ()=>{
            console.log(`server id is running on port ${PORT}`);
        });


    } catch (error) {
        console.error("Error starting server:", error);
       
    }
};

startServer();