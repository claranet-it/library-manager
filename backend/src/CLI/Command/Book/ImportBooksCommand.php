<?php

namespace App\CLI\Command\Book;

use App\Book\Infrastructure\BookImporter;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportBooksCommand extends Command
{
    public function __construct(
        private readonly BookImporter $bookImporter
    ) {
        parent::__construct(null);
    }

    protected function configure(): void
    {
        $this->setName('import-books');
        $this->setDescription('Imports books from a csv file');
        $this->addArgument('file', InputArgument::REQUIRED, 'The file to import books from');
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $file = $input->getArgument('file');
        $this->bookImporter->import($output, $file);

        return self::SUCCESS;
    }
}
