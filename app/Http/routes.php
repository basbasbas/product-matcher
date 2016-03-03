<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Interface implementations
$this->app->bind('App\Repositories\Interfaces\ProductRepository', 'App\Repositories\ProductRepositoryEloquent');
$this->app->bind('App\Repositories\Interfaces\FeedRepository', 'App\Repositories\FeedRepositoryEloquent');
$this->app->bind('App\Repositories\Interfaces\BaseCategoryRepository', 'App\Repositories\BaseCategoryRepositoryDefault');
$this->app->bind('App\Repositories\Interfaces\CategoryRepository', 'App\Repositories\CategoryRepositoryEloquent');


Route::get('/', function () {
    return view('welcome');
});

// Mock data
Route::get('/product/mock/{number?}', 'ProductController@mock');

// Admin
Route::get('/admin', 'Admin\AdminController@show');
Route::get('/admin/categories', 'Admin\CategoryController@show');

Route::get('/json/base-categories', 'Admin\CategoryController@jsonBaseCategories');

// Tests
Route::get('/api/test', function () { return 'dit is een test API'; });
Route::get('/regex/{regex}', function () {
    return 'regex';
})->where('regex', '[0-9]+');

// Authentication routes
Route::get('auth/login', 'Auth\AuthController@getLogin');
Route::post('auth/login', 'Auth\AuthController@postLogin');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration routes
Route::get('auth/register', 'Auth\AuthController@getRegister');
Route::post('auth/register', 'Auth\AuthController@postRegister');

// Model routes
//Route::resource('category', 'Admin\CategoryController');
Route::post('/category/store', 'Admin\CategoryController@postCategory');
