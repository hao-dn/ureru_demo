<?php

use Migrations\AbstractMigration;

class CreatePosts extends AbstractMigration
{
    /**
     * Change Method.
     *
     * More information on this method is available here:
     * https://book.cakephp.org/phinx/0/en/migrations.html#the-change-method
     * @return void
     */
    public function change()
    {
        $table = $this->table('posts');
        $table->addColumn('title', 'string', [
            'default' => null,
            'limit' => 255,
            'null' => false,
            'comment' => 'Title of the post',
        ]);
        $table->addColumn('content', 'text', [
            'default' => null,
            'null' => true,
            'comment' => 'Content of the post',
        ]);
        //category_id
        $table->addColumn('category_id', 'integer', [
            'default' => null,
            'null' => true,
            'comment' => 'Category id of the post',
        ]);
        $table->addColumn('created', 'datetime', [
            'default' => null,
            'null' => false,
            'comment' => 'Date of creation',
        ]);
        $table->addColumn('modified', 'datetime', [
            'default' => null,
            'null' => false,
            'comment' => 'Date of modification',
        ]);
        $table->create();
    }
}
