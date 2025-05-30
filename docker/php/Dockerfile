FROM php:8.1-apache
RUN apt-get update \
  && apt-get install -y \
     zip \
     unzip \
     libzip-dev \
     zlib1g-dev \
     libonig-dev \
     libicu-dev \
     libxml2-dev \
     libcurl4-openssl-dev \
     pkg-config \
     git \
  && docker-php-ext-install \
     pdo_mysql \
     mysqli \
     mbstring \
     zip \
     intl \
     xml \
  && docker-php-ext-enable mysqli \
  && a2enmod rewrite

# composerのインストール
RUN curl -sS https://getcomposer.org/installer | php \
  && mv composer.phar /usr/local/bin/composer \
  && chmod +x /usr/local/bin/composer

WORKDIR /var/www/html

ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
ENV PATH $PATH:/composer/vendor/bin
# タイムゾーン設定
ENV TZ=Asia/Tokyo
