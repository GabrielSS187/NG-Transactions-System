import { useEffect } from "react";
import Image from "next/image";

import { TFindUserResponse } from "../../services/endpoints/types";
import logoUser from "../../assets/imgs/person-icon.png";

interface IProps {
  inputHandle: string;
  data: TFindUserResponse[] | [];
  getUserOnClick: (userName: string) => void;
  refetch: () => void;
};

export default function SearchUserSentMoney({
  data,
  getUserOnClick,
  inputHandle,
  refetch,
}: IProps) {
  
  useEffect(() => {
    if (inputHandle?.trim()?.length >= 1) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputHandle]);

  return (
    <div className="w-3/12 max-md:w-7/12 bg-indigo-500 absolute z-10 rounded-md">
      <ul className="cursor-pointer">
        {
          inputHandle?.length >= 1 &&
          data?.map((user) => {
            return (
              <li
                key={user.id_user}
                className={`w-full ${data.length >= 10 && "h-12"} rounded-md pl-1 py-1 flex items-center gap-1 text-white hover:bg-indigo-700`}
                onClick={() => getUserOnClick(user.user_name)}
              >
                <Image
                  className="rounded-full"
                  src={`http://localhost:8000${user!.photo_url}`}
                  width="25"
                  height="25"
                  alt={user.user_name}
                />
                <p className="w-full truncate px-1">
                  <strong>{user?.user_name}</strong>
                </p>
              </li>
            );
          })}

        {data?.length! <= 0 && inputHandle?.length > 0 && (
          <h1 className="text-white p-1">Ninguém encontrado!</h1>
        )}
      </ul>
    </div>
  );
};