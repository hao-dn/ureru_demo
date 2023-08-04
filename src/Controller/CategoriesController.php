<?php

namespace App\Controller;

use Crud\Controller\ControllerTrait;

class CategoriesController extends ApiController
{
    use ControllerTrait;

    public $components = [
        'RequestHandler',
    ];
    public $paginate = [
        'page' => 1,
        'maxLimit' => 100,
        'fields' => [
            'id', 'name', 'description','created', 'modified'
        ],
        'sortWhitelist' => [
            'id', 'name', 'description','created', 'modified'
        ],
    ];

    public function initialize()
    {
        parent::initialize();
        $this->Crud->on('beforePaginate', function ($e) {
            //get params from request, id , title ,content
            if ($this->request->getQuery('id')) {
                $this->paginate['conditions']['Categories.id'] = $this->request->getQuery('id');
            }
            if ($this->request->getQuery('name')) {
                //lowercase
                $name = ($this->request->getQuery('name'));
                $this->paginate['conditions']['Categories.name LIKE'] = '%' . $name . '%';
            }
            if ($this->request->getQuery('description')) {
                $description = ($this->request->getQuery('description'));
                $this->paginate['conditions']['Categories.description LIKE'] = '%' . $description . '%';
            }
        });
    }
}
