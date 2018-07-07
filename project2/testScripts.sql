INSERT INTO user_file(username, user_password)
VALUES ('test_user_2', 'test_pass');
INSERT INTO journal(journal_title) VALUES ('Test Journal 2');
INSERT INTO journal(journal_title) VALUES ('Test hournal 3');
INSERT INTO user_journal(user_fk, journal_fk) VALUES ('2', '2');
INSERT INTO user_journal(user_fk, journal_fk) VALUES ('1', '3');

SELECT user_file.user_id, journal.journal_id, journal.journal_title FROM user_file
INNER JOIN user_journal ON user_file.user_id = user_journal.user_fk AND user_journal.user_fk = 1
INNER JOIN journal ON user_journal.journal_fk = journal.journal_id;
