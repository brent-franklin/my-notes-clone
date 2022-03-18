-- From the terminal run this
-- command to populate the database
-- psql < my-notes-clone.pgsql

-- Drop database if it exists
DROP DATABASE IF EXISTS my_notes_clone;

-- Create database
CREATE DATABASE my_notes_clone;

-- Connect to database
\c my_notes_clone

-- Drop tables if they are found in database
DROP TABLE IF EXISTS notes;
DROP TABLE IF EXISTS folders;

-- Create folders table for notes
CREATE TABLE folders (
       name VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY
);

-- Create folders and insert into folders table
INSERT INTO folders
       (name)
VALUES
	('Notes'),
	('On My Phone'),
	('Recently Deleted');

-- Create notes table
CREATE TABLE notes (
       id SERIAL PRIMARY KEY,
       content TEXT NOT NULL,
       timeCreated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       timeModified TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
       folderName VARCHAR(255) REFERENCES folders NOT NULL
);

-- Create initial sample notes for user to see interface in action

INSERT INTO notes
       (content, timeCreated, folderName)
VALUES
	(E'Camilla and Bob anniversary\nCall 4-5 days ahead of party reservation and invite them to restaurant', (CURRENT_TIMESTAMP - INTERVAL '4' HOUR), 'Notes'),
	(E'Kitchen Model Ideas Romano\nwants white marble or granite counter tops for his design',(CURRENT_TIMESTAMP - INTERVAL '3' HOUR), 'Notes'),
	(E'Romano Contractor Notes\nThe inspector will visit Thursday. Check progress before inspection',(CURRENT_TIMESTAMP - INTERVAL '2' HOUR), 'Notes'),
	(E'Romano birthday getaway\nideas Los Angeles. Napa. Baja. Yosemite?',(CURRENT_TIMESTAMP - INTERVAL '1' HOUR), 'Notes');
