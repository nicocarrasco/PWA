import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export class EnvironmentVariables {
  @IsNumber()
  PORT: number = 3001;

  @IsString()
  MONGODB_URL: string = 'mongodb://127.0.0.1:27017/pwa';

  @IsString()
  JWT_SECRET: string = 'PWA-AHZJDFK1324';
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) throw new Error(errors.toString());
  return validatedConfig;
}
