FROM php:8.1.13-fpm AS php-build

RUN apt-get update && apt-get install -y curl libzip-dev zip unzip wget libxslt-dev libpq-dev

RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql zip xsl

RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN curl -sSk https://getcomposer.org/installer | php -- --disable-tls && \
	mv composer.phar /usr/local/bin/composer

ENV COMPOSER_ALLOW_SUPERUSER=1

WORKDIR /var/www
COPY . /var/www

#RUN composer install --prefer-dist --no-dev --no-scripts --no-progress --no-suggest \
#	&& composer clear-cache --no-ansi \
#    && composer dump-autoload --optimize --classmap-authoritative --no-dev \
#    && composer dump-env prod \
#    && composer run-script --no-dev --no-ansi post-install-cmd \
#    && chmod +x bin/console \
#    && bin/console cache:clear --no-warmup && bin/console cache:warmup \
#    && composer clear-cache --no-ansi \
#    && chown -R www-data:www-data /var/www \
#    && sync

COPY docker/php/config/php.ini /etc/php.ini

RUN  wget https://get.symfony.com/cli/installer -O - | bash && \
     mv /root/.symfony5/bin/symfony /usr/local/bin/symfony

