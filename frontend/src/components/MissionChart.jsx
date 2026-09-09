import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const MissionChart = ({ missions }) => {
  const processData = () => {
    const counts = {
      Activa: 0,
      "En Progreso": 0,
      Completada: 0,
      Fallida: 0,
      Cancelada: 0,
    };

    missions.forEach((m) => {
      if (counts[m.estado] !== undefined) {
        counts[m.estado]++;
      }
    });

    return [
      { name: "Activas", value: counts["Activa"], color: "#3b82f6" }, // blue-500
      { name: "En Progreso", value: counts["En Progreso"], color: "#eab308" }, // yellow-500
      { name: "Completadas", value: counts["Completada"], color: "#22c55e" }, // green-500
      { name: "Fallidas", value: counts["Fallida"], color: "#e31937" }, // jpl-red
      { name: "Canceladas", value: counts["Cancelada"], color: "#9ca3af" }, // gray-400
    ].filter((item) => item.value > 0); // Ocultamos los estados que tienen 0 misiones
  };

  const data = processData();

  if (!missions || missions.length === 0) {
    return (
      <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-center h-80 transition-colors duration-300">
        <p className="text-gray-500 dark:text-gray-400 font-mono animate-pulse">
          Esperando datos de telemetría...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-space-panel border border-gray-200 dark:border-gray-800 p-6 flex flex-col h-80 transition-colors duration-300 group hover:border-blue-500/50">
      <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-4">
        Estado de la Flota
      </h3>
      {/* ResponsiveContainer hace que la gráfica se adapte al ancho de la pantalla */}
      <div className="flex-grow w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%" // Centro X
              cy="50%" // Centro Y
              innerRadius={60} // El hueco del medio (hace que sea una dona y no un pastel)
              outerRadius={80} // El grosor
              paddingAngle={5} // Separación entre rebanadas
              dataKey="value"
              stroke="none" // Quitamos el borde blanco por defecto
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#111827",
                borderColor: "#374151",
                color: "#fff",
                borderRadius: "0.5rem",
              }}
              itemStyle={{ color: "#fff" }}
            />

            <Legend position="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
