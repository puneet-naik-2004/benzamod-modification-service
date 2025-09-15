const Service = require("../models/Service");

exports.getService = async (req, res) => {
  try {
    const service = await Service.find();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: "Error fetching service" });
  }
};

exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.json(newService);
    console.get(err)
  } catch (err) {
        res.status(500).json({ error: "Error adding service" });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Error updating service" });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting service" });
  }
};
