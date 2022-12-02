import { Chart, ChartWrapperOptions, GoogleDataTableColumn } from "react-google-charts";

interface IProps {
  receivedMoney: number;
  sentMoney: number;
};

export default function GraphicDashboard ({ receivedMoney, sentMoney }: IProps) {

  const data = [
    [" ", "Recebidos total", "Enviados total"],
    [" ", receivedMoney, sentMoney],
  ];
  
  const options: ChartWrapperOptions["options"] = {
    chart: {
      title: "Gráfico de suas movimentações.",
      subtitle: "O total de entradas e saídas de todas as datas.",
    },
    curveType: "function",
    legend: { position: "bottom"},
    hAxis: { format: "currency" },
    animation: {duration: 500, easing: "linear", startup: true},
  };
  
  return (
    <div className="w-4/6 max-sm:w-11/12 mt-5 max-desk850:text-xs">
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};