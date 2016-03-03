<?php

namespace App\Entities;

//use Illuminate\Database\Eloquent\Model;

class BaseCategory
{
    public $name;
    public $count;
    public $categories = Array();

    public function __construct($name) {
        $this->name = $name;
        $this->count = 0;
    }
}
