<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'category' => ['sometimes', 'string', 'max:80'],
            'per_page' => ['sometimes', 'integer', 'min:1', 'max:50'],
        ]);

        $projects = Project::query()
            ->select(['id', 'title', 'category', 'summary', 'status'])
            ->when(
                $filters['category'] ?? null,
                fn ($query, $category) => $query->where('category', $category)
            )
            ->orderBy('id')
            ->paginate($filters['per_page'] ?? 10);

        return response()->json([
            'data' => $projects->items(),
            'meta' => [
                'current_page' => $projects->currentPage(),
                'last_page' => $projects->lastPage(),
                'total' => $projects->total(),
            ],
        ]);
    }
}