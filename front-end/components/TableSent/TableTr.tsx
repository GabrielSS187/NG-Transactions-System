import Image from "next/image";

import { TTransactionsSentData } from "../../services/endpoints/types";
import logoUser from "../../assets/imgs/person-icon.png";

export function TableTr (listSent: TTransactionsSentData[]) {
  return listSent?.map((sent) => {
    return (
      <tr key={sent.id_transaction}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <Image
                className="rounded-full"
                src={`http://localhost:8000${sent.photo_url}`}
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
