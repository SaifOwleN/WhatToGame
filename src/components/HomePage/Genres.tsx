import gameServices from "@/services/gameServices";
import { Genre } from "@/types";
import { useEffect, useState } from "react";
import { TbCategoryFilled } from "react-icons/tb";
import { buttonVariants } from "../ui/button";
import { Link } from "react-router-dom";

const Genres = () => {
  const [genres, setGenres] = useState<Genre[]>();
  useEffect(function getGenres() {
    const fetch = async () => {
      const data = await gameServices.getGamesGenres();
      setGenres(data.results);
    };
    fetch();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mr-6 mb-10 flex items-center gap-3">
        Genres
        <span>
          <TbCategoryFilled />
        </span>
      </h1>
      <div className="flex flex-col gap-5">
        {genres
          ? genres.map((genre) => (
              <Link
                className={
                  buttonVariants({ variant: "link" }) +
                  "flex text-start justify-start"
                }
                to={"/?genre=" + genre.id}
              >
                {genre.name}
              </Link>
            ))
          : null}
      </div>
    </>
  );
};

export default Genres;
