const User = require('../models/user');
const Project = require('../models/project');
const { model } = require('mongoose');

const createProject = async (req, res) => {
  const { login } = req.login;
  const { title } = req.body;

  try {
    const project = new Project({ title, shapes: [] });
    const createdProject = await project.save();

    const user = await User.findOneAndUpdate(
      { login },
      { $addToSet: { projects: createdProject._id } },
      { new: true }
    );


    return res.status(201).json({ result: createdProject, message: "Project successfully created!" });
  } catch (error) {

    return res.status(500).json({
      message: "Failed to create an event",
      error: error.message
    });
  }

}

const getAllProjects = async (req, res) => {
  const { login } = req.login;

  try {
    const userWithProjects = await User.findOne({ login }).populate('projects');

    return res.status(201).json({ result: userWithProjects.projects, message: "Project successfully loaded!" });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Failed to load a project",
      error: error.message
    });
  }

}


module.exports = { createProject, getAllProjects };
