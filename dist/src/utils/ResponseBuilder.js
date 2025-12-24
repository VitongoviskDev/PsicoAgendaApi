"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseBuilder = void 0;
class ResponseBuilder {
    static success(message, data, status = 200) {
        return { message, data, status };
    }
    static error(message, error, status = 400) {
        return { message, error, status };
    }
    static paginated(message, data, meta, status = 200) {
        return { message, data, status, pagination: meta };
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=ResponseBuilder.js.map