"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController = {
    getAll: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res;
    }),
    add: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res;
    }),
    update: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res;
    }),
    delete: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        return res;
    })
};
const router = express_1.default.Router();
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return userController.getAll(req, res); }));
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return userController.add(req, res); }));
router.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return userController.update(req, res); }));
router.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return userController.delete(req, res); }));
exports.default = router;