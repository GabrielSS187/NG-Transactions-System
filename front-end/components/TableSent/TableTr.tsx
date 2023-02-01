import ImgNext from "next/image";

import { TTransactionsSentData } from "../../services/endpoints/types";
import { useState } from "react";
import logoUser from "../../assets/imgs/person-icon.png";

export function TableTr (listSent: TTransactionsSentData[]) {
  const [ verifyImg, setVerifyImg  ] = useState<boolean>(false);
  const image = new Image();
  
  return listSent?.map((sent) => {
    image.src = sent.photo_url;
    image.onload = () => {
      setVerifyImg(true);
    };
    image.onerror = () => {
      setVerifyImg(false);
    };
    return (
      <tr key={sent.id_transaction}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <ImgNext
                className="rounded-full"
                src={verifyImg ? sent.photo_url : logoUser}
                width="40"
                height="40"
                alt={sent.user_name_credited}
              />
            </div>
            <div className="font-medium text-gray-800">
              {sent.user_name_credited}
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center font-medium text-green-500">
            R$ {sent.value_sent}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{sent.created_at}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center">
            <time>{sent.hour}</time>
          </div>
        </td>
      </tr>
    );
  });
}
