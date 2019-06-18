module.exports = `
CREATE TABLE IF NOT EXISTS public.game (
    id integer NOT NULL,
    board json NOT NULL,
    rows integer NOT NULL,
    cols integer NOT NULL,
    winner integer,
    current_player integer NOT NULL,
    selected_cube json,
    player1 integer,
    player2 integer,
    constraint game_pkey primary key (id)
);

ALTER TABLE public.game OWNER TO quixo;
`;
