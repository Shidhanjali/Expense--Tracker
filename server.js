import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost:27017/ExpenseTracker",{ useNewUrlParser:true, useUnifiedTopology:true })
.then(() => {
    console.log("Connected to database");
})
.catch((err) => {
    console.error("Error connecting to database:", err);
});

app.use(bodyParser.urlencoded({ extended:false }));
app.use(express.json());

const expenseSchema = new mongoose.Schema({
    description: String,
    amount: Number,
});

const Expense = mongoose.model("Expense", expenseSchema);

app.post("/api/expenses", async (req, res) => {
    try {
        const { description, amount } = req.body;
        const newExpense = await Expense.create({ description, amount });
        res.status(200).json({ success: true, expense: newExpense });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to add expense", error: error.message });
    }
});

app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.status(200).json({ success: true, expenses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch expenses", error: error.message });
    }
});

app.put("/api/expenses/:id", async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, updatedExpense });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to update expense", error: error.message });
    }
});

app.delete("/api/expenses/:id", async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete expense", error: error.message });
    }
});

app.listen(4500, () => {
    console.log("Server is running at http://localhost:4500");
});
