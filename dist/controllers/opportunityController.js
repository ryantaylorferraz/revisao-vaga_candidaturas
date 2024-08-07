"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpportunityController = void 0;
const opportunityService_1 = require("../services/opportunityService");
const tsyringe_1 = require("tsyringe");
let OpportunityController = class OpportunityController {
    constructor(opportunityService) {
        this.opportunityService = opportunityService;
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = res.locals.decode.id;
            const response = yield this.opportunityService.create(req.body, Number(id));
            return res.status(201).json(response);
        });
    }
    findMany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const id = (_a = res.locals.decode) === null || _a === void 0 ? void 0 : _a.id;
            const response = yield this.opportunityService.findMany(id);
            return res.status(200).json(response);
        });
    }
    findOne(req, res) {
        const response = this.opportunityService.findOne(res.locals.opportunity);
        return res.status(200).json(response);
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.opportunityService.update(Number(req.params.id), req.body);
            return res.status(200).json(response);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.opportunityService.delete(Number(req.params.id));
            return res.status(204).json();
        });
    }
};
exports.OpportunityController = OpportunityController;
exports.OpportunityController = OpportunityController = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("OpportunityService")),
    __metadata("design:paramtypes", [opportunityService_1.OpportunityService])
], OpportunityController);
