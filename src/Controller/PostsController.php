<?php

namespace App\Controller;

use Crud\Controller\ControllerTrait;

class PostsController extends AppController
{
    use ControllerTrait;

    public $components = [
        'RequestHandler',
    ];
    public $paginate = [
        'page' => 1,
        'limit' => 5,
        'maxLimit' => 100,
        'fields' => [
            'id', 'title', 'content',
        ],
        'contain' => [
            'Categories' => [
                'fields' => [
                    'id', 'name'
                ]
            ]
        ],
        'sortWhitelist' => [
            'id', 'title', 'content', 'Categories.name'
        ],
    ];

    /**
     * @return void
     */
    public function initialize()
    {
        parent::initialize();
        $this->Crud->on('beforePaginate', function ($e) {
            //get params from request, id , title ,content
            if ($this->request->getQuery('id')) {
                $this->paginate['conditions']['Posts.id'] = $this->request->getQuery('id');
            }
            if ($this->request->getQuery('title')) {
                //lowercase
                $title = ($this->request->getQuery('title'));
                $this->paginate['conditions']['Posts.title LIKE'] = '%' . $title . '%';
            }
            if ($this->request->getQuery('content')) {
                $content = ($this->request->getQuery('content'));
                $this->paginate['conditions']['Posts.content LIKE'] = '%' . $content . '%';
            }
            //category_id
            if ($this->request->getQuery('category_id')) {
                $this->paginate['conditions']['Posts.category_id'] = $this->request->getQuery('category_id');
            }
            //category_name
            if ($this->request->getQuery('category_name')) {
                $category_name = ($this->request->getQuery('category_name'));
                $this->paginate['conditions']['Categories.name LIKE'] = '%' . $category_name . '%';
            }
        });
    }
}
