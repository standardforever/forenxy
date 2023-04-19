-- prepares a MySQL server for the project

CREATE DATABASE IF NOT EXISTS forenxy;
CREATE USER IF NOT EXISTS 'forenxy_user'@'localhost' IDENTIFIED BY 'forenxy_pwd';
GRANT ALL PRIVILEGES ON `forenxy`.* TO 'forenxy_user'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'forenxy_user'@'localhost';
FLUSH PRIVILEGES;