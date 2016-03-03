<?php

namespace App\Repositories;

use App\Repositories\Interfaces\BaseCategoryRepository;
use App\Entities\BaseCategory;
use stdClass;

/**
 * Class FeedRepositoryEloquent
 * @package namespace App\Repositories;
 */
class BaseCategoryRepositoryDefault implements BaseCategoryRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return BaseCategory::class;
    }

    private function indexFromCategoriesByName($categories, $name)
    {
        foreach ($categories as $i => $category) {
            if ($category instanceof BaseCategory && $category->name == $name) {
                return $i;
            }
        }
    }

    public function feedToArray($feed)
    {
        $data = '{}';

        if ($feed->type == 'json') {
            $data = json_decode($feed->data);
        }

        $products = $data->products;
        $seperator = $this->getSeperator($products);
        $arr = $this->getPaths($products);

        return $this->sortFromArray($arr, $seperator);
    }

    private function getPaths($products, $limit = false)
    {
        $paths = array();
        $noLimit = !is_numeric($limit) || $limit <= 0 ? true : false;

        foreach ($products as $product) {
            if ($noLimit || $limit > 0) {
                foreach ($product->properties->categoryPath as $categoryPath) {
                    array_push($paths, $categoryPath);
                }
                if (!$noLimit) $limit--;
            }
        }
        return $paths;
    }
    
    private function getSeperator($products)
    {
        $seperators = [ '#' => 0,
                        '/' => 0,
                        '>' => 0 ];

        // Paths to count to determine dominant category seperator
        $pathCount = 20;

        $paths = $this->getPaths($products, $pathCount);

        foreach ($paths as $path) {
            foreach ($seperators as $seperator => $count) {
                $hits = substr_count($path, $seperator);
                $seperators[$seperator] += $hits;
            }
        }

        return array_keys($seperators, max($seperators))[0];
    }

    private function sortFromArray($arr, $seperator)
    {
        $obj = new stdClass();
        $obj->categories = array();

        foreach ($arr as $string) {
           $obj = $this->sortFromProduct($string, $seperator, $obj);
        }

        return $obj;
    }

    private function sortFromProduct($string, $seperator, $obj)
    {
        $strings = explode($seperator, $string);

        return $this->sort($strings, 0, $obj, null);
    }

    private function sort($strings, $index, $obj, $objChild)
    {
        $objScope = null;
        $name = &$strings[$index];

        if ($objChild) {
            $objScope = &$objChild;
        } else {
            $objScope = &$obj;
        }

        // Find top level index if cat already exists there
        $i = $this->indexFromCategoriesByName($objScope->categories, $name);

        if (is_numeric($i)) {
            $objNext = $objScope->categories[$i];
        }
        else {
            // Add new cat to top level, set as top level index
            array_push($objScope->categories, new BaseCategory($name));
            $objNext = end($objScope->categories);
        }

        $objNext->count++;

        $index++;
        if (isset($strings[$index])) {
            $this->sort($strings, $index, $obj, $objNext);
        }

        return $obj;
    }

}
