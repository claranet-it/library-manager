<?php

namespace App\CLI\Command\Book;

use App\Book\Infrastructure\BookImporter;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'import-books')]
class ImportBooksCommand extends Command
{

    public function __construct(
        private readonly BookImporter $bookImporter
    )
    {
        parent::__construct(null);
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->bookImporter->import($output);
        return self::SUCCESS;
    }

}

//class ImportMagentoOrders extends Command
//{
//    protected static $defaultName = 'tannico:active-invoicing:import-magento-orders';
//
//    public function __construct(
//        private readonly MagentoOrderImporter $magentoOrderImporter,
//    ) {
//        parent::__construct(null);
//    }
//
//    protected function execute(InputInterface $input, OutputInterface $output): int
//    {
//        $io = new SymfonyStyle($input, $output);
//
//        $timer = new Timer();
//        $timer->start();
//
//        $this->magentoOrderImporter->import($output);
//
//        $duration = $timer->stop();
//
//        $io->success('Magento orders imported successfully');
//        $io->info('Elapsed time: '.$duration->asString());
//
//        return self::SUCCESS;
//    }
//}