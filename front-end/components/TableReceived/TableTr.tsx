import Image from "next/image";

import { TReceived } from ".";
import logoUser from "../../assets/imgs/person-icon.png";

export function TableTr(listReceived: TReceived[]) {
  return listReceived?.map((received) => {
    return (
      <tr key={received.id_transaction}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <Image
                className="rounded-full"
                src={logoUser}
                width="40"
                height="40"
                alt="Alex Shatov"
              />
            </div>
            <div className="font-medium text-gray-800">
              {received.user_name_debited}
            </div>
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left font-medium text-green-500">
            R$ {received.value_received}
          </div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-left">{received.created_at}</div>
        </td>
        <td className="p-2 whitespace-nowrap">
          <div className="text-center">
            <time>{received.hour}</time>
          </div>
        </td>
      </tr>
    );
  });
};
