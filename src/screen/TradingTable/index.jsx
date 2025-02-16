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

const TradingTable = () => {
  const userId = 123; // ID de usuario fijo (puedes cambiarlo dinámicamente)
  const dispatch = useDispatch();

  // Obtener datos de Firebase usando RTK Query
  const { data: stats, isLoading, isError } = useGetStatsQuery(userId);
  const [saveStats] = useSaveStatsMutation();

  // Estado local para las operaciones
  const [operations, setOperations] = useState([]);
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
      setOperations(stats.yearlyStats || []);
      dispatch(setYearlyStats(stats.yearlyStats || []));
      dispatch(setMonthlyStats(stats.monthlyStats || []));
      dispatch(setDailyStats(stats.dailyStats || []));
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

  // Agregar una nueva operación
  const addOperation = async () => {
    if (!validateOperation()) return;

    const operationWithId = { ...newOperation, id: Date.now() };
    const updatedOperations = [...operations, operationWithId];

    // Actualizar el estado local
    setOperations(updatedOperations);

    // Actualizar el estado global
    dispatch(setYearlyStats(updatedOperations));
    dispatch(setMonthlyStats(updatedOperations));
    dispatch(setDailyStats(updatedOperations));

    // Guardar en Firebase
    const stats = {
      yearlyStats: updatedOperations,
      monthlyStats: updatedOperations,
      dailyStats: updatedOperations,
    };
    await saveStats({ userId, stats });

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


  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

  const noData = !stats || !stats.yearlyStats || stats.yearlyStats.length === 0;

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
            operations.map((op) => (
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
          )}
        </CTableBody>
      </CTable>
    </CContainer>
  );
};

export default TradingTable;