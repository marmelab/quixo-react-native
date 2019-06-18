CREATE TABLE IF NOT EXISTS game (
    id SERIAL PRIMARY KEY,
    board json NOT NULL,
    rows integer NOT NULL,
    cols integer NOT NULL,
    winner integer,
    current_player integer NOT NULL,
    selected_cube json,
    player1 integer,
    player2 integer
);

ALTER TABLE game OWNER TO quixo;
