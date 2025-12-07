import * as Joi from 'joi';

export const validateEnv = (config: Record<string, unknown>) => {
  const schema = Joi.object({
    PORT: Joi.number().default(3000),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().default(5432),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
  });
  const result = schema.validate(config, {
    allowUnknown: true,
  }) as Joi.ValidationResult<Record<string, unknown>>;
  if (result.error)
    throw new Error(`Config validation error: ${result.error.message}`);
  return result.value;
};
