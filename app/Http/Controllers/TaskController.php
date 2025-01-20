<?php

namespace App\Http\Controllers;

use Illuminate\Console\View\Components\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $todos = Task::all();

        return response()->json($todos);
    }

    public function store(Request $request)
    {
        $task = Task::create([
            'content' => $request->content,
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }
}
