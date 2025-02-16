import React, { useState, useEffect } from "react";
import {
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormInput,
  CFormSelect,
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
} from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setDailyStats,
  setYearlyStats,
  setMonthlyStats,
} from "../../date/statsSlice.js";
import { useGetStatsQuery, useSaveStatsMutation } from "../../date/firebaseApi.js";
import { DateTime } from "luxon"; // Importa Luxon para manejar fechas

const TradingTable = () => {
  const dispatch = useDispatch();

  // Obtener datos de Firebase usando RTK Query
  const { data: stats, isLoading, isError } = useGetStatsQuery();
  const [saveStats] = useSaveStatsMutation();

  // Estado local para las operaciones
  const [operations, setOperations] = useState({
    dailyStats: [],
    monthlyStats: [],
    yearlyStats: [],
  });

  const [newOperation, setNewOperation] = useState({
    id: null,
    fechaHora: "",
    activo: "",
    tipoOperacion: "",
    cantidad: "",
    precioEntrada: "",
    precioSalida: "",
    stopLoss: "",
    takeProfit: "",
    gananciaPerdida: "",
    roi: "",
    razonEntrada: "",
    emocion: "",
    errores: "",
  });

  // Cargar datos de Firebase al montar el componente
  useEffect(() => {
    if (stats) {
      setOperations({
        dailyStats: stats.dailyStats || [],
        monthlyStats: stats.monthlyStats || [],
        yearlyStats: stats.yearlyStats || [],
      });
      dispatch(setDailyStats(stats.dailyStats || []));
      dispatch(setMonthlyStats(stats.monthlyStats || []));
      dispatch(setYearlyStats(stats.yearlyStats || []));
    }
  }, [stats, dispatch]);

  // Estilos
  const cardStyle = { backgroundColor: "#0c161c", color: "#e0003d" };
  const inputStyle = { backgroundColor: "#0c161c", color: "#e0003d" };
  const tableCellStyle = { backgroundColor: "#0c161c", color: "#e0003d" };

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOperation({ ...newOperation, [name]: value });
  };

  // Validar la operación
  const validateOperation = () => {
    const { fechaHora, activo, tipoOperacion } = newOperation;
    if (!fechaHora || !activo || !tipoOperacion) {
      alert("Por favor, completa los campos obligatorios: Fecha y Hora, Activo y Tipo de Operación.");
      return false;
    }
    return true;
  };

  // Función para clasificar la operación
  const classifyOperation = (operation) => {
    const fechaHora = DateTime.fromISO(operation.fechaHora); // Convertir la fecha a objeto DateTime

    return {
      dailyStats: {
        date: fechaHora.toISODate(), // Fecha en formato YYYY-MM-DD
        operations: [operation], // Agrega la operación a la lista del día
      },
      monthlyStats: {
        month: fechaHora.toFormat("yyyy-MM"), // Mes en formato YYYY-MM
        operations: [operation], // Agrega la operación a la lista del mes
      },
      yearlyStats: {
        year: fechaHora.toFormat("yyyy"), // Año en formato YYYY
        operations: [operation], // Agrega la operación a la lista del año
      },
    };
  };

  // Agregar una nueva operación
  const addOperation = async () => {
    // Validar la operación antes de continuar
    if (!validateOperation()) return;

    // Crear una nueva operación con un ID único
    const operationWithId = { ...newOperation, id: Date.now() };

    // Clasificar la operación en dailyStats, monthlyStats y yearlyStats
    const classified = classifyOperation(operationWithId);

    // Actualizar el estado local
    const updatedDailyStats = [...operations.dailyStats];
    const updatedMonthlyStats = [...operations.monthlyStats];
    const updatedYearlyStats = [...operations.yearlyStats];

    // Buscar si ya existe una entrada para el día, mes o año de la operación
    const dailyIndex = updatedDailyStats.findIndex(
      (entry) => entry.date === classified.dailyStats.date
    );
    const monthlyIndex = updatedMonthlyStats.findIndex(
      (entry) => entry.month === classified.monthlyStats.month
    );
    const yearlyIndex = updatedYearlyStats.findIndex(
      (entry) => entry.year === classified.yearlyStats.year
    );

    // Si existe una entrada para el día, agregar la operación a la lista existente
    if (dailyIndex !== -1) {
      updatedDailyStats[dailyIndex].operations.push(operationWithId);
    } else {
      // Si no existe, crear una nueva entrada para el día
      updatedDailyStats.push(classified.dailyStats);
    }

    // Si existe una entrada para el mes, agregar la operación a la lista existente
    if (monthlyIndex !== -1) {
      updatedMonthlyStats[monthlyIndex].operations.push(operationWithId);
    } else {
      // Si no existe, crear una nueva entrada para el mes
      updatedMonthlyStats.push(classified.monthlyStats);
    }

    // Si existe una entrada para el año, agregar la operación a la lista existente
    if (yearlyIndex !== -1) {
      updatedYearlyStats[yearlyIndex].operations.push(operationWithId);
    } else {
      // Si no existe, crear una nueva entrada para el año
      updatedYearlyStats.push(classified.yearlyStats);
    }

    // Actualizar el estado local
    setOperations({
      dailyStats: updatedDailyStats,
      monthlyStats: updatedMonthlyStats,
      yearlyStats: updatedYearlyStats,
    });

    // Actualizar el estado global
    dispatch(setDailyStats(updatedDailyStats));
    dispatch(setMonthlyStats(updatedMonthlyStats));
    dispatch(setYearlyStats(updatedYearlyStats));

    // Guardar en Firebase
    const stats = {
      dailyStats: updatedDailyStats,
      monthlyStats: updatedMonthlyStats,
      yearlyStats: updatedYearlyStats,
    };
    await saveStats(stats);

    // Reiniciar el formulario
    setNewOperation({
      id: null,
      fechaHora: "",
      activo: "",
      tipoOperacion: "",
      cantidad: "",
      precioEntrada: "",
      precioSalida: "",
      stopLoss: "",
      takeProfit: "",
      gananciaPerdida: "",
      roi: "",
      razonEntrada: "",
      emocion: "",
      errores: "",
    });
  };

  // Mostrar carga o error
  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  // Verificar si no hay datos
  const noData =
    !operations.dailyStats.length &&
    !operations.monthlyStats.length &&
    !operations.yearlyStats.length;

  return (
    <CContainer
      className="mt-4"
      style={{ backgroundColor: "#121212", padding: "20px", borderRadius: "10px" }}
    >
      <CCard style={cardStyle}>
        <CCardHeader className="text-center" style={cardStyle}>
          <h1>Registro de Operaciones de Trading</h1>
        </CCardHeader>
        <CCardBody style={cardStyle}>
          <h2 className="mb-3 text-center">Agregar Nueva Operación</h2>
          <div className="row g-3 mb-4">
            <CFormInput
              style={inputStyle}
              type="datetime-local"
              name="fechaHora"
              label="Fecha y Hora *"
              value={newOperation.fechaHora}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="text"
              name="activo"
              label="Activo *"
              value={newOperation.activo}
              onChange={handleInputChange}
            />
            <CFormSelect
              style={inputStyle}
              name="tipoOperacion"
              label="Tipo de Operación *"
              value={newOperation.tipoOperacion}
              onChange={handleInputChange}
            >
              <option value="">Selecciona</option>
              <option value="Compra">Compra</option>
              <option value="Venta">Venta</option>
              <option value="Long">Long</option>
              <option value="Short">Short</option>
            </CFormSelect>
            <CFormInput
              style={inputStyle}
              type="number"
              name="cantidad"
              label="Cantidad Operada"
              value={newOperation.cantidad}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="number"
              name="precioEntrada"
              label="Precio de Entrada"
              value={newOperation.precioEntrada}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="number"
              name="precioSalida"
              label="Precio de Salida"
              value={newOperation.precioSalida}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="number"
              name="stopLoss"
              label="Stop Loss"
              value={newOperation.stopLoss}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="number"
              name="takeProfit"
              label="Take Profit"
              value={newOperation.takeProfit}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="number"
              name="gananciaPerdida"
              label="Ganancia/Perdida"
              value={newOperation.gananciaPerdida}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="number"
              name="roi"
              label="ROI"
              value={newOperation.roi}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="text"
              name="razonEntrada"
              label="Razón de Entrada"
              value={newOperation.razonEntrada}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="text"
              name="emocion"
              label="Emoción"
              value={newOperation.emocion}
              onChange={handleInputChange}
            />
            <CFormInput
              style={inputStyle}
              type="text"
              name="errores"
              label="Errores"
              value={newOperation.errores}
              onChange={handleInputChange}
            />
          </div>
          <CButton
            color="danger"
            onClick={addOperation}
            style={{ backgroundColor: "rgba(224,0,61,255)", border: "none" }}
          >
            Agregar Operación
          </CButton>
        </CCardBody>
      </CCard>

      <CTable striped hover responsive className="mt-4">
        <CTableHead style={tableCellStyle}>
          <CTableRow>
            <CTableHeaderCell style={tableCellStyle}>Fecha y Hora</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Activo</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Tipo de Operación</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Cantidad</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Precio de Entrada</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Precio de Salida</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Stop Loss</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Take Profit</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Ganancia/Pérdida</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>ROI</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Razón Entrada</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Emoción</CTableHeaderCell>
            <CTableHeaderCell style={tableCellStyle}>Errores</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody style={tableCellStyle}>
          {noData ? (
            <CTableRow>
              <CTableDataCell colSpan={13}>No hay operaciones registradas</CTableDataCell>
            </CTableRow>
          ) : (
            operations.yearlyStats.map((yearlyStat) =>
              yearlyStat.operations.map((op) => (
                <CTableRow key={op.id} style={tableCellStyle}>
                  <CTableDataCell>{op.fechaHora}</CTableDataCell>
                  <CTableDataCell>{op.activo}</CTableDataCell>
                  <CTableDataCell>{op.tipoOperacion}</CTableDataCell>
                  <CTableDataCell>{op.cantidad}</CTableDataCell>
                  <CTableDataCell>{op.precioEntrada}</CTableDataCell>
                  <CTableDataCell>{op.precioSalida}</CTableDataCell>
                  <CTableDataCell>{op.stopLoss}</CTableDataCell>
                  <CTableDataCell>{op.takeProfit}</CTableDataCell>
                  <CTableDataCell>{op.gananciaPerdida}</CTableDataCell>
                  <CTableDataCell>{op.roi}</CTableDataCell>
                  <CTableDataCell>{op.razonEntrada}</CTableDataCell>
                  <CTableDataCell>{op.emocion}</CTableDataCell>
                  <CTableDataCell>{op.errores}</CTableDataCell>
                </CTableRow>
              ))
            )
          )}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default TradingTable;