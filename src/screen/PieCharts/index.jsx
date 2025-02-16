import React from 'react';
import { Pie } from 'react-chartjs-2';
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import "./PieCharts.css"

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const PieCharts = () => {  const data1 = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const data2 = {
    labels: ['Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [200, 150, 50],
        backgroundColor: ['#4CAF50', '#9C27B0', '#FF9800'],
        hoverBackgroundColor: ['#4CAF50', '#9C27B0', '#FF9800'],
      },
    ],
  };

  const data3 = {
    labels: ['Apple', 'Banana', 'Grapes'],
    datasets: [
      {
        data: [400, 200, 300],
        backgroundColor: ['#FF5722', '#FFEB3B', '#9C27B0'],
        hoverBackgroundColor: ['#FF5722', '#FFEB3B', '#9C27B0'],
      },
    ],
  };

  return (
    <div className="pie-charts container">
      <CRow>
        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <CCardHeader>Gráfico de Torta 1</CCardHeader>
            <CCardBody>
              <Pie data={data1} />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <CCardHeader>Gráfico de Torta 2</CCardHeader>
            <CCardBody>
              <Pie data={data2} />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm="12" md="4">
          <CCard className="mb-4">
            <CCardHeader>Gráfico de Torta 3</CCardHeader>
            <CCardBody>
              <Pie data={data3} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  );
};

export default PieCharts;
