<?php

namespace App\CLI\Command\Book;

use App\Book\Infrastructure\BookImporter;
use App\Book\Infrastructure\CsvFileHandler;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ImportBooksCommand extends Command
{
    public function __construct(
        private readonly BookImporter $bookImporter,
        private readonly CsvFileHandler $csvFileHandler
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
        $books = $this->csvFileHandler->csvToBookList($file);
        $this->bookImporter->import($books);

        return self::SUCCESS;
    }
}
