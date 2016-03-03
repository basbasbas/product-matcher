<?php

namespace App\Repositories\Interfaces;

use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Interface FeedRepository
 * @package namespace App\Repositories;
 */
interface ModelRepository extends RepositoryInterface
{
//    public function all();
    public function toObject($id);
}
