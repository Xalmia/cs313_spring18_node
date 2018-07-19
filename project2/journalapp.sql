CREATE TABLE text_box
(
    text_box_id SERIAL PRIMARY KEY,
    text_content TEXT NOT NULL
);

CREATE TABLE image_handler
(
    image_id SERIAL PRIMARY KEY,
    image_storage_location VARCHAR(200) NOT NULL
);

CREATE TABLE image_box
(
    image_box_id SERIAL PRIMARY KEY,
    image_fk INTEGER REFERENCES image_handler(image_id)
);

CREATE TABLE page_in_section
(
    page_id SERIAL PRIMARY KEY,
    page_title VARCHAR(100) NOT NULL
);

CREATE TABLE section
(
    section_id SERIAL PRIMARY KEY,
    section_title VARCHAR(100) NOT NULL
);

CREATE TABLE journal
(
    journal_id SERIAL PRIMARy KEY,
    journal_title VARCHAR(100) NOT NULL
);

CREATE TABLE journal_section
(
    journal_fk INTEGER REFERENCES journal(journal_id),
    section_fk INTEGER REFERENCES section(section_id)
);

CREATE TABLE section_page
(
    section_fk INTEGER REFERENCES section(section_id),
    page_fk INTEGER REFERENCES page_in_section(page_id)
);

CREATE TABLE page_text
(
    page_fk INTEGER REFERENCES page_in_section(page_id),
    text_fk INTEGER REFERENCES text_box(text_box_id)
);

CREATE TABLE page_image
(
    page_fk INTEGER REFERENCES page_in_section(page_id),
    image_box_fk INTEGER REFERENCES image_box(image_box_id)
);

CREATE TABLE user_file
(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    image_fk INTEGER REFERENCES image_handler(image_id),
    user_password CHKPASS NOT NULL
);

CREATE TABLE user_journal
(
    user_fk INTEGER REFERENCES user_file(user_id),
    journal_fk INTEGER REFERENCES journal(journal_id)
);

INSERT INTO text_box (text_content)
VALUES ('This is test test for testing the read-only database.');

INSERT INTO page_in_section (page_title)
VALUES ('Test Page 1');

INSERT INTO section (section_title)
VALUES ('Test Section 1');

INSERT INTO journal (journal_title)
VALUES ('Test Journal 1');

INSERT INTO journal (journal_title)
VALUES ('Test Journal 2');

INSERT INTO section(section_title)
VALUES ('Test Section 2');

INSERT INTO section(section_title)
VALUES ('Test Section 3');

INSERT INTO user_file(username, user_password)
VALUES ('test_user_1', 'test_pass');

INSERT INTO user_file(username, user_password)
VALUES ('test_user_2', 'password');

INSERT INTO text_box (text_content)
VALUES ('Lorem ipsum dolor sit amet, vestibulum egestas vivamus urna, lectus risus eget placerat dui. Vel nullam erat diam placerat pellentesque etiam, integer pede ut porta quam mauris, non posuere tellus sed consectetuer, aliquam purus eu, turpis nec et eget sagittis euismod. Rhoncus scelerisque labore beatae quam at, consectetuer luctus mauris tellus magnis, dolor justo est, ipsum ac, habitant lacus feugiat at gravida ullamcorper. Ullamcorper aenean eligendi tellus lacus donec sit, sed erat suscipit viverra a tempus, semper ut velit et non, mollis tortor. Sit arcu risus amet pellentesque, massa mauris nunc, viverra dis nonummy condimentum odio egestas mi, integer laoreet dui nam faucibus ipsum, sem metus diam ante scelerisque sem. Nunc dui varius lectus cras, a ridiculus nam et risus scelerisque, nonummy integer nec donec odio amet autem, libero nunc ipsa eros accumsan placerat. Elementum et nibh veritatis ut enim, sapien mi lacus aliquam. Faucibus velit, morbi malesuada mi, natoque neque ultrices facilisi, adipiscing metus neque. Est integer, et ut dignissim justo elit risus in, ultricies risus sit ut tortor in, id libero lorem felis justo. Lorem vulputate id et lectus at, gravida curabitur ut commodo urna etiam, in id, nec facilisis, nascetur consectetuer molestie varius ut.');

INSERT INTO page_in_section(page_title)
VALUES ('Test Page 2');

INSERT INTO section(section_title)
VALUES ('Test Section 4');

INSERT INTO journal(journal_title)
VALUES ('Test Journal 3');

INSERT INTO section(section_title)
VALUES ('Test Section 5');

INSERT INTO user_journal(user_fk, journal_fk)
VALUES ('1', '1');

INSERT INTO user_journal(user_fk, journal_fk)
VALUES ('1', '2');

INSERT INTO user_journal(user_fk, journal_fk)
VALUES ('2', '3');

INSERT INTO journal_section(journal_fk, section_fk)
VALUES ('1', '1');

INSERT INTO journal_section(journal_fk, section_fk)
VALUES ('1', '2');

INSERT INTO journal_section(journal_fk, section_fk)
VALUES ('2', '3');

INSERT INTO journal_section(journal_fk, section_fk)
VALUES ('3', '4');

INSERT INTO journal_section(journal_fk, section_fk)
VALUES ('3', '5');

INSERT INTO section_page(section_fk, page_fk)
VALUES ('1', '1');

INSERT INTO section_page(section_fk, page_fk)
VALUES ('4', '2');

INSERT INTO page_text(page_fk, text_fk)
VALUES ('1', '1');

INSERT INTO page_text(page_fk, text_fk)
VALUES ('2', '2');

/* This code is for a local database only, not on Heroku :)
CREATE USER journal_user WITH PASSWORD 'journal_pass';
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO journal_user;
GRANT INSERT, UPDATE, SELECT ON ALL TABLES IN SCHEMA public TO journal_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO journal_user;
*/

DROP TABLE image_box, image_handler, journal, journal_section, page_image, page_in_section, page_text, section, section_page, text_box, user_file, user_journal;