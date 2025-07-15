const Joi = require('joi');

exports.taskValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().optional().allow(''),
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').default('Pending'),
  dueDate: Joi.date().required(),
});

exports.statusValidation = Joi.object({
  status: Joi.string().valid('Pending', 'In Progress', 'Completed').required(),
});