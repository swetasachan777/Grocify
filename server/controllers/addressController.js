import Address from "../models/Address.js"

// Add Address : POST /api/address/add
export const addAddress = async (req, res) => {
  try {
    const { address, userId } = req.body;
    if (!address || !userId) {
      return res.status(400).json({ success: false, message: "Address and userId are required" });
    }
    await Address.create({ ...address, userId });
    res.status(201).json({ success: true, message: "Address added successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}

// Get Address : GET /api/address/get?userId=...
export const getAddress = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ success: false, message: "userId query param is required" });
    }
    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
}
