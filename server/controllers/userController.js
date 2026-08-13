const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        return res.status(200).json({
            user: req.user
        });
    } catch (error) {
        console.error("Get profile error:", error.message);

        return res.status(500).json({
            message: "Server error while fetching profile"
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const {
            name,
            department,
            year,
            phone,
            profileImage
        } = req.body;

        const updates = {};

        if (name !== undefined) {
            if (!name.trim()) {
                return res.status(400).json({
                    message: "Name cannot be empty"
                });
            }

            updates.name = name.trim();
        }

        if (department !== undefined) {
            if (!department.trim()) {
                return res.status(400).json({
                    message: "Department cannot be empty"
                });
            }

            updates.department = department.trim();
        }

        if (year !== undefined) {
            const numericYear = Number(year);

            if (!Number.isInteger(numericYear) || numericYear < 1 || numericYear > 4) {
                return res.status(400).json({
                    message: "Year must be between 1 and 4"
                });
            }

            updates.year = numericYear;
        }

        if (phone !== undefined) {
            updates.phone = phone.trim();
        }

        if (profileImage !== undefined) {
            updates.profileImage = profileImage.trim();
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                message: "No profile fields were provided"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            updates,
            {
                new: true,
                runValidators: true
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Update profile error:", error.message);

        return res.status(500).json({
            message: "Server error while updating profile"
        });
    }
};

module.exports = {
    getProfile,
    updateProfile
};