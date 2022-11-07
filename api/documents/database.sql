create database test_manager;


-- não encontrei um comando SQL para conectar na database.


create type user_permission AS ENUM ('ADMIN', 'TECHNICIAN', 'VISITOR');
create type user_status AS ENUM ('ACTIVE', 'INACTIVE');

create type test_case_status AS ENUM ('PROPOSAL', 'DISABLED', 'CONFIRMED', 'NEED_TO_UPDATE');
create type test_case_priority AS ENUM ('URGENT', 'HIGH', 'AVERAGE', 'LOW');

create type execution_status AS ENUM ('NOT_INITIATED', 'FINISHED', 'IN_PROGRESS');
create type execution_result AS ENUM ('ERROR', 'FAILED','OK', 'BLOCKED');

create table tb_user(
	user_id serial not null primary key,
	name varchar(50) not null,
	email varchar(100) unique not null,
	username varchar(50) unique not null,
	password varchar(50) unique not null,
	permission user_permission not null,
	status user_status not null,
	date_disabled date,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int
);



create table tb_product(
	product_id serial not null primary key,
	name varchar(50) not null,
	description varchar(255),
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int
);

create table tb_module(
	module_id serial not null primary key,
	name varchar(50) not null,
	description varchar(255),
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int
);

create table tb_product_module(
	product_module_id serial not null primary key,
	product_id int not null,
	module_id int not null,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key(product_id) references tb_product(product_id),
	foreign key(module_id) references tb_module(module_id)
);

create table tb_version(
	version_id serial not null primary key,
	product_id int not null,
	value int not null,
	foreign key(product_id) references tb_product(product_id),
	CONSTRAINT no_duplicate_tag UNIQUE (product_id, value)
);

create table tb_test_plan(
 	test_plan_id serial not null primary key,
	name varchar(100) not null,
	product_id int not null,
	version_id int not null,
	document text not null, 
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key(product_id) references tb_product(product_id),
	foreign key(version_id) references tb_version(version_id)
);

create table tb_test_case(
	test_case_id serial not null primary key,
	name varchar(100) not null,
	document text not null,
	notes varchar(255),
	product_id int,
	module_id int,
	status test_case_status not null,
	priority test_case_priority not null,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key(product_id) references tb_product(product_id),
	foreign key(module_id) references tb_module(module_id)
);

create table tb_test_execution(
	test_execution_id serial not null primary key,
	name varchar(100) not null,
	notes varchar(255),
	estimated_start_date date not null,
	estimated_end_date date not null,
	product_id int not null,
	test_plan_id int not null,
	user_id int not null,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key (test_plan_id) references tb_test_plan(test_plan_id),
	foreign key (user_id) references tb_user(user_id)
);

create table tb_test_case_execution(
	test_case_execution_id serial not null primary key,
	test_case_id int not null,
	test_execution_id int not null,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key (test_case_id) references tb_test_case(test_case_id),
	foreign key (test_execution_id) references tb_test_execution(test_execution_id)
);


create table tb_execution_record(
	execution_record_id serial not null primary key,
	test_execution_id int not null,
	start_date timestamp not null,
	end_date timestamp,
	result execution_result,
	status execution_status,
	execution_version int not null,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key (test_execution_id) references tb_test_execution(test_execution_id)
);

create table tb_execution_record_test_case(
	execution_record_test_case_id serial not null primary key,
	test_case_id int not null,
	execution_record_id int not null,
	document text,
	result execution_result,
	created_date timestamp,
	created_by int,
	last_modified_date timestamp,
	last_modified_by int,
	foreign key (test_case_id) references tb_test_case(test_case_id),
	foreign key (execution_record_id) references tb_execution_record(execution_record_id)
);


insert into tb_user (email, name, password, permission, status, username, created_date, created_by, last_modified_date, last_modified_by) 
	values ('admin@email.com', 'Admin', 'YWRtaW4=', 'ADMIN', 'ACTIVE', 'admin', '2021-11-12 00:00:00', 1, '2021-11-12 00:00:00', 1);
