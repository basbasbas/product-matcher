<?php

namespace App\Console\Commands;

use App\Repositories\Interfaces\FeedRepository;
use Illuminate\Console\Command;

class GetFeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'feed:pull {url}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get product feed, place in database';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(FeedRepository $repository)
    {
        $url = $this->argument('url');
        $repository->storeFromUrl($url);
    }
}
