"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validBody = void 0;
class validBody {
    static execute(schema) {
        return (req, res, next) => {
            req.body = schema.parse(req.body);
            return next();
        };
    }
}
exports.validBody = validBody;
