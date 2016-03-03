<?php

namespace App\Entities;

use Illuminate\Database\Eloquent\Model;

class Feed extends Model
{
    protected $table = 'feed';

    protected $fillable = ['url'];
}
