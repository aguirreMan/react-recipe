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
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT || '') || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/recipes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    const number = parseInt(String(req.query.number), 10) || 60;
    const offset = parseInt(String(req.query.offset), 10) || 0;
    const random = req.query.random === 'true';
    const apiKey = process.env.SPOONACULAR_API_KEY || '';
    if (!query) {
        return res.status(400).json({ error: 'Missing query' });
    }
    try {
        let apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${number}&apiKey=${apiKey}`;
        if (random) {
            apiUrl += '&sort=random';
        }
        else {
            apiUrl += `&offset=${offset}`;
        }
        const response = yield fetch(apiUrl);
        const data = yield response.json();
        res.json(data);
    }
    catch (error) {
        console.error('Error fetching recipes');
        res.status(500).json({ error: 'something went wrong' });
    }
}));
app.get('/api/recipes/:id/instructions', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const apiKey = process.env.SPOONACULAR_API_KEY;
    if (!id) {
        return res.status(400).json({ error: 'Missing recipe id' });
    }
    try {
        const instructionsEndpoint = `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${apiKey}`;
        const ingredientsEnpoint = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;
        const [instructionData, ingredientData] = yield Promise.all([
            fetch(instructionsEndpoint),
            fetch(ingredientsEnpoint)
        ]);
        if (!instructionData.ok || !ingredientData.ok) {
            return res.status(502).json({ error: 'Failed to fetch recipe data' });
        }
        const instructionInfo = yield instructionData.json();
        const ingredientInfo = yield ingredientData.json();
    }
    finally {
    }
}));
const recipeId = 794273;
