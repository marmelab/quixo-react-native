CREATE TABLE IF NOT EXISTS game (
    id SERIAL PRIMARY KEY,
    board json NOT NULL,
    rows integer NOT NULL,
    cols integer NOT NULL,
    current_player integer NOT NULL,
    selected_cube json,
    player1 json,
    player2 json,
    winner integer,
    winning_line json,
    solo boolean
);

CREATE TABLE IF NOT EXISTS player (
    pseudo text PRIMARY KEY,
    played integer DEFAULT 0,
    won integer DEFAULT 0
);

INSERT INTO public.player (pseudo) VALUES ('anonymous');

ALTER TABLE game OWNER TO quixo;
