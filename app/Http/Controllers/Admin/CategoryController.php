<?php

namespace App\Http\Controllers\Admin;

//use App\Repositories\CategoryRepository;
use App\Repositories\Interfaces\BaseCategoryRepository;
use App\Repositories\Interfaces\CategoryRepository;
use Illuminate\Http\Request;

use App\Entities\Feed;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Auth;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, CategoryRepository $repository)
    {
        $json = Request::json();

        print_r($json);

//        $repository->storeFromData($data);
    }

    public function postCategory(Request $request, CategoryRepository $repository)
    {

        $json = $request->json()->all();

//        $json = Request::json();
//
//        print_r($json);

        $repository->storeFromData($json);
    }

    public function getBaseCategories(BaseCategoryRepository $repository)
    {
        $feed = Feed::first();

        return $repository->feedToArray($feed);
    }

    public function jsonBaseCategories(BaseCategoryRepository $repository)
    {
        return get_object_vars($this->getBaseCategories($repository));
    }

    private function sortByProductCountAscending($obj) { return $this->sortByProductCount($obj, true); }
    private function sortByProductCountDescending($obj) { return $this->sortByProductCount($obj); }

    private function sortByProductCount($obj, $reverse = false)
    {
        $sortFunc = function($a, $b) use ($reverse) {
            if ($reverse) return $a->count - $b->count;
            else return $b->count - $a->count;
        };

        $this->sortBy($obj, $sortFunc);

        return $obj;
    }

    private function sortByName($obj, $reverse = false)
    {
        $sortFunc = function($a, $b) use ($reverse) {
            if ($reverse) return strcmp($b->name, $a->name);
            else return strcmp($a->name, $b->name);
        };

        $this->sortBy($obj, $sortFunc);

        return $obj;
    }

    private function sortBy($obj, $callback)
    {
        usort($obj->categories, $callback);

        foreach($obj->categories as $obj) {
           if (count($obj->categories) > 1) {
               $this->sortBy($obj, $callback);
           }
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(BaseCategoryRepository $repository)
    {
        $categories = $this->getBaseCategories($repository);

        $categories = $this->sortByProductCountDescending($categories);

        return view('admin.categories', ['user' => Auth::user(), 'categories' => $categories->categories]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
