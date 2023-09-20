INSERT INTO department (id, name)
VALUES
  (1, 'Sales'),
  (2, 'Engineering'),
  (3, 'Reasearch and Development'),
  (4, 'Marketing'),
  (5, 'Human Resources'),
  (6, 'Legal'),
  (7, 'Finance'),
  (8, 'Customer Service'),
  (9, 'Adminstration');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, 'Sales Lead', 100000.00, 1),
    (2, 'Salesperson', 80000.00, 1),
    (3, 'Lead Engineer', 150000.00, 2),
    (4, 'Software Engineer', 120000.00, 2),
    (5, 'Account Manager', 125000.00, 4),
    (6, 'Legal Team Lead', 250000.00, 6),
    (7, 'Lawyer', 190000.00, 6),
    (8, 'Lead Customer Service Agent', 75000.00, 8),
    (9, 'Customer Service Agent', 60000.00, 8),
    (10, 'HR Manager', 150000.00, 5),
    (11, 'HR Representative', 100000.00, 5),
    (12, 'Lead Researcher', 150000.00, 3),
    (13, 'Researcher', 100000.00, 3),
    (14, 'Lead Marketer', 150000.00, 4),
    (15, 'Marketer', 100000.00, 4),
    (16, 'Adminstrator', 250000.00, 9);
    (17, 'Finance Director', 150000.00, 7),
    (18, 'Finance Representative', 100000.00, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, 'John', 'Doe', 1, 24),
    (2, 'Mike', 'Chan', 2, 1),
    (3, 'Ashley', 'Rodriguez', 2, 1),
    (4, 'Kevin', 'Tupik', 3, 24),
    (5, 'Malia', 'Brown', 4, 4),
    (6, 'Sarah', 'Lourd', 4, 4),
    (7, 'Mike', 'Wayne', 4, 4),
    (8, 'Tom', 'Allen', 5, 24),
    (9, 'Sam', 'Smith', 6, 24),
    (10, 'Karen', 'Johnson', 7, 8),
    (11, 'Allen', 'Walker' 7, 8),
    (12, 'Ben', 'Peterson', 8, 24),
    (13, 'Jane', 'Doe', 9, 12),
    (14, 'Larry', 'Smith', 9, 12),
    (15, 'Taylor', 'Nickles', 10, 24),
    (16, 'Katie', 'Smith', 11, 15),
    (17, 'Kevin', 'Garner', 11, 15),
    (18, 'Walter', 'White', 12, 24),
    (19, 'Jesse', 'Pinkman', 13, 18),
    (20, 'Saul', 'Goodman', 13, 18),
    (21, 'Tim', 'Cook' 14, 24),
    (22, 'Seth', 'Green' 15, 21),
    (23, 'Paul', 'Walker' 15, 21),
    (24, 'Sully', 'Sullivan' 16, NULL),
    (25, 'Mike', 'Wazowski' 17, 24),
    (26, 'James', 'Franklin' 18, 25),
    (27, 'Michael', 'Scott' 18, 25);

