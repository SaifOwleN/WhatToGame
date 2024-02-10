import { Link } from "react-router-dom";
import { results } from "../../types";
import PlatformIcons from "../platformIcons";
import { Card, CardContent } from "../ui/card";

const GamesCards = ({ games }: { games: results }) => {
  return (
    <Link key={games.id} className="mt-10 sm:mr-5" to={`/game/${games.id}`}>
      <Card className="sm:w-[392px] relative h-[350px] flex flex-col rounded-3xl overflow-hidden hover:transform hover:scale-110 duration-300 transition-transform ">
        <div className="absolute right-3 dark:mix-blend-difference top-2">
          <PlatformIcons games={games} />
        </div>
        <img
          alt={games.name}
          src={games.background_image}
          className="min-h-[240px] object-cover"
        />
        <CardContent className="flex justify-center flex-col px-6 h-full text-xl dark:text-white ">
          <p className="mb-2">{games.name}</p>
          <p className="text-xs text-gray-400">
            <span
              className={
                "p-0.5 rounded-sm px-1.5 mx-1" +
                (Number(games.rating) >= 4.5
                  ? " text-green-700 border border-green-700"
                  : Number(games.rating) >= 3.5
                    ? " text-green-600 border border-green-600"
                    : Number(games.rating) >= 2.5
                      ? " text-yellow-500 border border-yellow-500"
                      : Number(games.rating) >= 1.5
                        ? " text-red-500 border border-red-500"
                        : undefined)
              }
            >
              {games.rating > 0 ? games.rating : null}
            </span>
            {games.rating && games.released ? "·" : null}{" "}
            {games.released?.slice(0, 4)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GamesCards;
