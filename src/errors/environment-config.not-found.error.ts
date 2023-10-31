import { InternalServerErrorException } from "@nestjs/common";

export class EnvironmentConfigNotFoundError extends InternalServerErrorException {
    static errorCode = "ENV_NOT_FOUND";

    constructor(args?: Array<string> | string) {
        super(
            args
                ? `${EnvironmentConfigNotFoundError.errorCode}: ${args}`
                : `${EnvironmentConfigNotFoundError.errorCode}`
        );
    }
}
