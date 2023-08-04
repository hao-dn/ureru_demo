<?php

namespace App\Controller;

use Crud\Controller\ControllerTrait;

class PostsController extends ApiController
//class PostsController extends AppController
{
    use ControllerTrait;
    public $paginate = [
        'limit' => 20,
        'maxLimit' => 100,
        'fields' => [
            'id', 'title', 'content', 'created'
        ],
        'contain' => [
            'Categories' => [
                'fields' => [
                    'id', 'name'
                ]
            ],
        ],
        'sortWhitelist' => [
            'id', 'title', 'content', 'Categories.name', 'created', 'modified'
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

//
//    public function index()
//    {
//        // Paginate the ORM table.
//        $this->set('data', $this->paginate($this->Posts));
//        //get params from request, id , title ,content
//        if ($this->request->getQuery('id')) {
//            $this->paginate['conditions']['Posts.id'] = $this->request->getQuery('id');
//        }
//        if ($this->request->getQuery('title')) {
//            //lowercase
//            $title = ($this->request->getQuery('title'));
//            $this->paginate['conditions']['Posts.title LIKE'] = '%' . $title . '%';
//        }
//        if ($this->request->getQuery('content')) {
//            $content = ($this->request->getQuery('content'));
//            $this->paginate['conditions']['Posts.content LIKE'] = '%' . $content . '%';
//        }
//        //category_id
//        if ($this->request->getQuery('category_id')) {
//            $this->paginate['conditions']['Posts.category_id'] = $this->request->getQuery('category_id');
//        }
//        //category_name
//        if ($this->request->getQuery('category_name')) {
//            $category_name = ($this->request->getQuery('category_name'));
//            $this->paginate['conditions']['Categories.name LIKE'] = '%' . $category_name . '%';
//        }
//        $this->set([
//            'data' => $this->paginate($this->Posts),
//            '_serialize' => ['data', 'pagination'],
//            'pagination' => $this->request->getParam('paging')['Posts']
//        ]);
//    }
//
//    public function view($id)
//    {
//        $post = $this->Posts->get($id);
//        $this->set([
//            'data' => $post,
//            '_serialize' => ['data'],
//        ]);
//    }
//
//    public function add()
//    {
//        $this->request->allowMethod(['post', 'put', 'get']);
//        $post = $this->Posts->newEntity($this->request->getData());
//        if ($this->Posts->save($post)) {
//            $message = 'Saved';
//        } else {
//            $message = 'Error';
//        }
//        $this->set([
//            'message' => $message,
//            'data' => $post,
//            '_serialize' => ['message', 'data']
//        ]);
//    }
//
//    public function edit($id)
//    {
//        $post = $this->Posts->get($id);
//
////        $this->request->allowMethod(['patch', 'post', 'put']);
//        if (in_array($this->request->getMethod(), ['patch', 'post', 'put'])) {
//            $post = $this->Posts->patchEntity($post, $this->request->getData());
//            if ($this->Posts->save($post)) {
//                $message = 'Saved';
//            } else {
//                $message = 'Error';
//            }
//            $this->set([
//                'message' => $message,
//            ]);
//        }
//        $this->set([
//            'data' => $post,
//            '_serialize' => ['message', 'data']
//        ]);
//    }
//
//    public function delete($id)
//    {
//        $this->request->allowMethod(['delete']);
//        $post = $this->Posts->get($id);
//        $message = 'Deleted';
//        if (!$this->Posts->delete($post)) {
//            $message = 'Error';
//        }
//        $this->set([
//            'message' => $message,
//            '_serialize' => ['message']
//        ]);
//    }
}

