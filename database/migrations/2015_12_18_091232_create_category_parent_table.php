<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCategoryParentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('category_parent', function (Blueprint $table) {
            $table->integer('category_id')->unsigned();
            $table->integer('parent_id')->unsigned();
            $table->timestamps();

            // Keys
            $table->primary(['category_id', 'parent_id']);
            $table->foreign('category_id')->references('id')->on('category');
            $table->foreign('parent_id')->references('id')->on('category');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('category_parent');
    }
}
