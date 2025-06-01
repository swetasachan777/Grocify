import Address from "../models/Address.js"

// Add Address : POST /api/address/add
// Assumes `authUser` middleware is applied
export const addAddress = async (req, res) => {
  try {
    const { address } = req.body;
    const userId = req.user?.id;

    if (!address || !userId) {
      return res.status(400).json({ success: false, message: "Address and authenticated userId are required" });
    }

    await Address.create({ ...address, userId });

    res.status(201).json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Address : GET /api/address/get?userId=...
export const getAddress = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId query param is required" });
    }
    
const addresses = await Address.find({ userId: userId.toString() });

    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
