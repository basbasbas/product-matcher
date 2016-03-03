<?php

namespace App\Repositories;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\CategorySynony,Repository;
use App\Entities\CategorySynony,;

/**
 * Class CategorySynony,RepositoryEloquent
 * @package namespace App\Repositories;
 */
class CategorySynony,RepositoryEloquent extends BaseRepository implements CategorySynony,Repository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return CategorySynony,::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(RequestCriteria::class));
    }
}
