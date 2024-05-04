const User = require('../models/user.model')
const PlantingSite = require('../models/plantingSite.model')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json(user)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'User deleted successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }
        await User.findByIdAndUpdate(req.params.id, req.body, {
            useFindAndModify: false,
        })
        res.status(200).json({ message: 'User updated successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error' })
    }
}

// const checkPermission = async (req, res) => {
//     try {
//       const { hasPermission } = req.body;
  
//       const userId = req.user.id;
  
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
    
//       user.hasLocationPermission = hasPermission;
//       await user.save();
  
//       console.log(`User with ID ${userId} granted location permission: ${hasPermission}`);
  
//       if (hasPermission) {
//         const userLocation = req.user.location; 
//         if (!userLocation) {
//           return res.status(400).json({ message: "User location data not available" });
//         }
  
//         try {
//           const nearestSites = await PlantingSite.findNearestPlantingSites(userLocation);
//           res.status(200).json({
//             message: "Permission status received successfully",
//             nearestSites,
//           });
//         } catch (error) {
//           console.error("Error finding nearest planting sites:", error);
          
//         }
//       } else {
//         res.status(200).json({ message: "Permission status received successfully" });
//       }
//     } catch (error) {
//       console.error("Error handling user location permission:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   };

module.exports = {
    getUsers,
    getUser,
    deleteUser,
    updateUser,
}
