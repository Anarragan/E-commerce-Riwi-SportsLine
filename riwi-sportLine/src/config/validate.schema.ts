import * as Joi from 'joi';

export const validateEnv = (config: Record<string, unknown>) => {
  const schema = Joi.object({
    PORT: Joi.number().default(3000),
    DB_URI: Joi.string().uri().required(),
    DB_NAME: Joi.string().default('riwi-sportline'),
  });
  const { error, value } = schema.validate(config, { allowUnknown: true });
  if (error) throw new Error(`Config validation error: ${error.message}`);
  return value;
};
