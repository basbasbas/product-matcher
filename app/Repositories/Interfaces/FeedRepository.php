<?php

namespace App\Repositories\Interfaces;

use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Interface FeedRepository
 * @package namespace App\Repositories;
 */
interface FeedRepository extends RepositoryInterface
{
    public function modelFromUrl($url);
    public function storeFromUrl($url);
}
