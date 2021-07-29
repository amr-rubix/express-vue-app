const Joi = require('joi')

module.exports = {
  async register (req, res, next) {
    const schema = Joi.object({
      email: Joi.string()
        .min(3)
        .max(30)
        .email()
        .required(),

      password: Joi.string()
        // eslint-disable-next-line prefer-regex-literals
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })

    try {
      await schema.validateAsync(req.body)
      next()
    } catch (err) {
      const { details } = err
      res.status(400).send({
        message: 'Validation process failed, Please try again.',
        details
      })
    }
  }
}
