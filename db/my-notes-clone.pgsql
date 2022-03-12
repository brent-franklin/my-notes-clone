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

-- Create folders table
CREATE TABLE folders (
       name VARCHAR(255) UNIQUE NOT NULL PRIMARY KEY
);

-- Create folders for initial use in my-notes-clone
INSERT INTO folders
       (name)
VALUES
	('Notes'),
	('On My iPhone'),
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
       (content, folderName)
VALUES
	('Camilla and Bob anniversary
	Call 4-5 days ahead of party reservation and invite them to restaurant', 'Notes'),
	('Kitchen Model Ideas
	Romano wants white marble or granite counter tops for his design', 'Notes'),
	('Romano Contractor Notes
	The inspector will visit Thursday. Check progress before inspection', 'Notes'),
	('Romano birthday getaway ideas
	Los Angeles. Napa. Baja. Yosemite?', 'Notes');
