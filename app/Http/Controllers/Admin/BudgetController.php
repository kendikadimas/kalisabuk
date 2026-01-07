<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Budget;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BudgetController extends Controller
{

    public function index()
    {
        return Inertia::render('Admin/Budgets/Index', [
            'budgets' => Budget::orderBy('year', 'desc')->paginate(10),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Budgets/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
            'name' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'realized_amount' => 'nullable|numeric|min:0',
        ]);

        Budget::create($validated);

        return redirect()->route('budgets.index')->with('success', 'Data APBDes berhasil ditambahkan.');
    }

    public function edit(Budget $budget)
    {
        return Inertia::render('Admin/Budgets/Edit', [
            'budget' => $budget,
        ]);
    }

    public function update(Request $request, Budget $budget)
    {
        $validated = $request->validate([
            'year' => 'required|integer|min:2000|max:2100',
            'name' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'amount' => 'required|numeric|min:0',
            'realized_amount' => 'nullable|numeric|min:0',
        ]);

        $budget->update($validated);

        return redirect()->route('budgets.index')->with('success', 'Data APBDes berhasil diperbarui.');
    }

    public function destroy(Budget $budget)
    {
        $budget->delete();
        return redirect()->route('budgets.index')->with('success', 'Data APBDes berhasil dihapus.');
    }

}
