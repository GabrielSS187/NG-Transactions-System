import Image from "next/image";

import { TTransactionsReceived } from "../../services/endpoints/types";

export function TableTr(listReceived: TTransactionsReceived[]) {
  return listReceived?.map((received) => {
    
    return (
      <tr key={received.id_transaction}>
        <td className="p-2 whitespace-nowrap">
          <div className="flex items-center">
            <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
              <Image
                className="rounded-full"
                src={`${received!.photo_url}`}
                width="40"
                height="40"
                alt={received.user_name_debited}
              />
            </div>
            <div className="font-medium text-gray-800">
                {
                  !received.looked ?
                  (
                    <div className="flex justify-center items-center">
                      <p className="">{received.user_name_debited}</p>
                      <span className="ml-10 p-1 bg-cyan-600 rounded-lg text-white">NOVO</span>
                    </div>
                  )
                  :
                  (<p>{received.user_name_debited}</p>)
                }
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
