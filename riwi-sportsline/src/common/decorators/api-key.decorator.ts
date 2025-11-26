import { SetMetadata } from "@nestjs/common";

export const API_REQUIRED_KEY = "apiKeyRequired";
export const ApiKey = () => SetMetadata(API_REQUIRED_KEY, true)