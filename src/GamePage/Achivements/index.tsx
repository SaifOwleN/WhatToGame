import gameServices from "@/services/gameServices";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AchievementList } from "../type";

const Achievements = () => {
  const id = useParams().id;
  const [achv, setAchv] = useState<AchievementList>();

  useEffect(() => {
    (async () => {
      if (achv?.next) {
        const { data }: { data: AchievementList } = await axios.get(
          achv.next as string,
        );
        setAchv({ ...data, results: achv.results.concat(data.results) });
      } else if (!achv) {
        const achievements = await gameServices.getGameAchievements(
          id as string,
        );
        setAchv(achievements);
      }
    })();
  }, [id, achv]);

  return (
    <div className="flex flex-col">
      <div className="mx-16 mb-6 mt-2 flex justify-between">
        <h1 className="text-3xl font-bold dark:text-white">Achievements</h1>
      </div>
      <p className="mx-20 text-lg">Game Has {achv?.count} Achievements</p>
      <div className="flex w-full flex-col items-center">
        {achv?.results.map((achiev) => (
          <div
            className="bg-gray-800 sm:h-24 sm:w-[480px] h-fit dark:bg-gray-200 sm:mx-20 my-3 rounded flex relative group"
            key={achiev.id}
          >
            <img
              className="p-3 w-24 aspect-square"
              src={achiev.image}
              alt={achiev.name}
            />
            <div className="absolute dark:bg-gray-200 dark:text-black text-white bg-gray-800 text-sm p-2 transition-all rounded-md opacity-0 sm:group-hover:opacity-100 -right-56 top-5 w-52 ">
              {`${achiev.percent}% of players have this achievement`}
            </div>
            <div className="mt-3 mr-1">
              <h2 className="text-lg dark:text-black text-white">
                {achiev.name}
              </h2>
              <label className="dark:text-gray-500 text-sm text-gray-300">
                {achiev.description.length > 1 ? achiev.description : "????"}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Achievements;
