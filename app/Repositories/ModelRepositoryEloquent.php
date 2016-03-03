<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Interfaces\ModelRepository;

/**
 * Class FeedRepositoryEloquent
 * @package namespace App\Repositories;
 */
class ModelRepositoryEloquent extends BaseRepository implements ModelRepository
{
    public function model() { }
    public function boot() { }

//    public function all()
//    {
//        return $this->model()->all();
//    }
    public function toObject($id)
    {
        return $this->model()->find($id);
    }
}
