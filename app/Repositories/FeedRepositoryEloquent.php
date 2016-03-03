<?php

namespace App\Repositories;

//use Prettus\Repository\Eloquent\BaseRepository;
//use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Interfaces\FeedRepository;
use App\Entities\Feed;
use App\Entities\BaseCategory;
use stdClass;

/**
 * Class FeedRepositoryEloquent
 * @package namespace App\Repositories;
 */
class FeedRepositoryEloquent extends ModelRepositoryEloquent implements FeedRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Feed::class;
    }

    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
//        $this->pushCriteria(app(RequestCriteria::class));
    }

    public function modelFromUrl($url)
    {
        $model = new $this->model();

        $model->url = $url;
        $model->data = file_get_contents($url);
        $model->type = $this->checkDataType($model->data);

        return $model;
    }

    public function storeFromUrl($url)
    {
        $this->modelFromUrl($url)->save();
    }

    private function checkDataType($data)
    {
        if ($this->jsonCheck($data)) return 'json';
        else if ($this->xmlCheck($data)) return 'xml';
    }

    private function jsonCheck($data)
    {
        return !!json_decode($data);
    }

    private function xmlCheck($data)
    {
        $xml_errors = LIBXML_NOERROR+LIBXML_ERR_FATAL+LIBXML_ERR_NONE;
        $xml = simplexml_load_string($data, 'SimpleXmlElement', $xml_errors);

        return !!$xml;
    }
}
