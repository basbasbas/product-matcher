<?php

namespace App\Repositories\Interfaces;

//use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Interface FeedRepository
 * @package namespace App\Repositories;
 */
interface BaseCategoryRepository
{
    public function feedToArray($feed);
}

