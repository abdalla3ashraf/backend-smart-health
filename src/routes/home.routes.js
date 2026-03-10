import express from "express";

const router = express.Router();

router.get("/home-data", async (req, res) => {
  try {

    const data = {
      user: {
        name: "Omar"
      },

      specialties: [
        { name: "Joints", doctors: 80, icon: "bone.png" },
        { name: "Brain and Nerves", doctors: 95, icon: "brain.png" },
        { name: "Teeth", doctors: 103, icon: "tooth.png" },
        { name: "Heart", doctors: 69, icon: "heart.png" },
        { name: "The lung", doctors: 84, icon: "lung.png" },
        { name: "Digestion", doctors: 74, icon: "stomach.png" }
      ],

      statistics: {
        doctors: 30000,
        patients: 50000,
        hospitals: 10000,
        medicines: 15000
      }

    };

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: "Failed to load home data" });
  }
});

export default router;