import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const dataOperations = [
  { name: "Compra", value: 10 },
  { name: "Venta", value: 7 }
];

const dataAssets = [
  { name: "BTC", value: 5 },
  { name: "ETH", value: 8 },
  { name: "ADA", value: 4 }
];

const COLORS = ["#0088FE", "#FF8042", "#00C49F"];

const Performances = () => {
  return (
    <div className="container-fluid">
      <h2 className="text-center text-white mb-5">Distribución de Operaciones</h2>
      
      <div className="row">
        {/* Gráfico de Tipos de Operación */}
        <div className="col-md-6">
          <h5 className="text-center text-white">Tipo de Operaciones</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataOperations}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {dataOperations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Activos Más Operados */}
        <div className="col-md-6">
          <h5 className="text-center text-white">Activos Más Operados</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dataAssets}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                dataKey="value"
                label
              >
                {dataAssets.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Performances;
