<?php

use Migrations\AbstractSeed;

/**
 * Categories seed.
 */
class CategoriesSeed extends AbstractSeed
{
    /**
     * Run Method.
     *
     * Write your database seeder using this method.
     *
     * More information on writing seeds is available here:
     * https://book.cakephp.org/phinx/0/en/seeding.html
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'name' => 'Category 1',
                'description' => 'Category Description 1',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Category 2',
                'description' => 'Category Description 2',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Category 3',
                'description' => 'Category Description 3',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Category 4',
                'description' => 'Category Description 4',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Category 5',
                'description' => 'Category Description 5',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s'),],
            [
                'name' => 'Category 6',
                'description' => 'Category Description 6',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s')],
            [
                'name' => 'Category 7',
                'description' => 'Category Description 7',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s')],
            [
                'name' => 'Category 8',
                'description' => 'Category Description 8',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s')],
            [
                'name' => 'Category 9',
                'description' => 'Category Description 9',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s')],
            [
                'name' => 'Category 10',
                'description' => 'Category Description 10',
                'created' => date('Y-m-d H:i:s'),
                'modified' => date('Y-m-d H:i:s')
            ]
        ];

        $table = $this->table('categories');
        $table->insert($data)->save();
    }
}
