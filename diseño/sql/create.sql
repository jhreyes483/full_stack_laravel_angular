create database full_stack_laravel;

use full_stack_laravel;
create table users(
id int not null primary key auto_increment,
name varchar(250),
surname varchar(250),
email varchar(250),
password varchar(250),
role int,
description varchar(250),
image varchar(250),
created_at datetime,
updated_at datetime,
remember_token varchar(250)
);
use full_stack_laravel;
create table categories(
id int not null primary key auto_increment,
name varchar(250),
created_at datetime,
updated_at datetime
);
use full_stack_laravel;
create table posts(
id int not null primary key auto_increment,
category_id int,
title varchar(250),
content varchar(250),
image varchar(250),
user_id int,
created_at datetime,
updated_at datetime,
CONSTRAINT fk_posts_users FOREIGN KEY (user_id) REFERENCES users(id),
CONSTRAINT fk_posts_categories FOREIGN KEY (category_id) REFERENCES categories(id)
);