
--中文编码问题一定要设置utf-8
create table books(
  id int not null auto_increment primary key,
  isbn varchar(20) not null,
  openid varchar(50) not null,
  title varchar(100) not null,
  image varchar(100),
  alt varchar(100) not null,
  publisher varchar(100),
  summary varchar(1000),
  price varchar(100),
  rate float,
  tags varchar(100),
  author varchar(100)
)character set = utf8;

--修改表结构，增加列
alter table books add column count int default 0;

--评论建表
create table comments(
  id int not null auto_increment primary key,
  openid varchar(100) not null,
  bookid varchar(100) not null,
  comment varchar(100) not null,
  phone varchar(100),
  location varchar(100),
) character set = utf8;
