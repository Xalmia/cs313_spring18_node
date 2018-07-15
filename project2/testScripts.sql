INSERT INTO user_file(username, user_password)
VALUES ('test_user_2', 'test_pass');
INSERT INTO journal(journal_title) VALUES ('Test Journal 2');
INSERT INTO journal(journal_title) VALUES ('Test hournal 3');
INSERT INTO user_journal(user_fk, journal_fk) VALUES ('2', '2');
INSERT INTO user_journal(user_fk, journal_fk) VALUES ('1', '3');


SELECT user_file.user_id, journal.journal_id, journal.journal_title FROM user_file
INNER JOIN user_journal ON user_file.user_id = user_journal.user_fk AND user_journal.user_fk = 1
INNER JOIN journal ON user_journal.journal_fk = journal.journal_id;

SELECT user_file.user_id, journal.journal_id, journal.journal_title FROM user_file
INNER JOIN user_journal ON user_file.user_id = user_journal.user_fk AND user_journal.user_fk = 1
INNER JOIN journal ON user_journal.journal_fk = journal.journal_id;

SELECT page_in_section.page_id, text_box.text_box_id FROM page_in_section
INNER JOIN page_text ON page_in_section.page_id = page_text.page_fk AND page_text.page_fk = 1
INNER JOIN text_box ON page_text.text_fk = text_box.text_box_id;

SELECT text_box.text_content, page_in_section.page_title FROM text_box
INNER JOIN page_in_section ON page_in_section.page_id = 1 WHERE text_box.text_box_id = 1;
