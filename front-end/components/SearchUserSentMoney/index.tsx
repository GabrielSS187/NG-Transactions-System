import { useEffect, useState } from "react";
import ImgNext from "next/image";

import { TFindUserResponse } from "../../services/endpoints/types";
import { Load } from "../Load";
import logoUser from "../../assets/imgs/person-icon.png";

interface IProps {
  inputHandle: string;
  data: TFindUserResponse[] | [];
  getUserOnClick: (userName: string) => void;
  refetch: () => void;
  load: boolean
};

export default function SearchUserSentMoney({
  data,
  getUserOnClick,
  inputHandle,
  refetch,
  load
}: IProps) {
  const [ verifyImg, setVerifyImg  ] = useState<boolean>(false);
  
  useEffect(() => {
    if (inputHandle?.trim()?.length > 0) refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputHandle]);


  const image = new Image();

  return (
    <div className="w-3/12 max-md:w-7/12 bg-indigo-500 absolute z-10 rounded-md">
      <ul className="cursor-pointer">
        {
          load && (
            <div className="w-full p-2 rounded-md hover:bg-indigo-700">
              <Load />
            </div>
          )
        }

        {
          inputHandle?.length > 0 &&
          data?.map((user) => {
              image.src = user.photo_url;
              image.onload = () => {
                setVerifyImg(true);
              };
              image.onerror = () => {
                setVerifyImg(false);
              };
            return (
              <li
                key={user.id_user}
                className={`w-full ${data.length >= 10 && "h-12"} rounded-md pl-1 py-1 flex items-center gap-1 text-white hover:bg-indigo-700`}
                onClick={() => getUserOnClick(user.user_name)}
              >
                <ImgNext
                  className="rounded-full"
                  src={verifyImg ? `${user.photo_url}` : logoUser}
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

        {data?.length! <= 0 && inputHandle?.length > 0 && !load && (
          <h1 className="text-white p-1">Ninguém encontrado!</h1>
        )}
      </ul>
    </div>
  );
};