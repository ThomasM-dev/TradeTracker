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
import { DateTime } from "luxon";

const TradingTable = () => {
  const dispatch = useDispatch();
  const { data: stats, isLoading, isError } = useGetStatsQuery();
  const [saveStats] = useSaveStatsMutation();

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

  const cardStyle = { backgroundColor: "#0c161c", color: "#e0003d" };
  const inputStyle = { backgroundColor: "#0c161c", color: "#e0003d" };
  const tableCellStyle = { backgroundColor: "#0c161c", color: "#e0003d" };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOperation({ ...newOperation, [name]: value });
  };

  const validateOperation = () => {
    const { fechaHora, activo, tipoOperacion } = newOperation;
    if (!fechaHora || !activo || !tipoOperacion) {
      alert("Por favor, completa los campos obligatorios: Fecha y Hora, Activo y Tipo de Operación.");
      return false;
    }
    return true;
  };

  const classifyOperation = (operation) => {
    const fechaHora = DateTime.fromFormat(operation.fechaHora, "yyyy-MM-dd'T'HH:mm");

    if (!fechaHora.isValid) {
      console.error("Fecha no válida:", operation.fechaHora);
      return null;
    }

    return {
      dailyStats: {
        date: fechaHora.toISODate(),
        operations: [operation],
      },
      monthlyStats: {
        month: fechaHora.toFormat("yyyy-MM"),
        operations: [operation],
      },
      yearlyStats: {
        year: fechaHora.toFormat("yyyy"),
        operations: [operation],
      },
    };
  };

  const addOperation = async () => {
    if (!validateOperation()) return;

    const operationWithId = { ...newOperation, id: Date.now() };
    const classified = classifyOperation(operationWithId);

    if (!classified) {
      alert("Error: La fecha no es válida.");
      return;
    }

    // Hacer copias profundas de los arrays antes de modificar
    const updatedDailyStats = JSON.parse(JSON.stringify(operations.dailyStats));
    const dailyEntry = updatedDailyStats.find((entry) => entry.date === classified.dailyStats.date);
    if (dailyEntry) {
      dailyEntry.operations.push(operationWithId);
    } else {
      updatedDailyStats.push(classified.dailyStats);
    }

    const updatedMonthlyStats = JSON.parse(JSON.stringify(operations.monthlyStats));
    const monthlyEntry = updatedMonthlyStats.find((entry) => entry.month === classified.monthlyStats.month);
    if (monthlyEntry) {
      monthlyEntry.operations.push(operationWithId);
    } else {
      updatedMonthlyStats.push(classified.monthlyStats);
    }

    const updatedYearlyStats = JSON.parse(JSON.stringify(operations.yearlyStats));
    const yearlyEntry = updatedYearlyStats.find((entry) => entry.year === classified.yearlyStats.year);
    if (yearlyEntry) {
      yearlyEntry.operations.push(operationWithId);
    } else {
      updatedYearlyStats.push(classified.yearlyStats);
    }

    // Actualizar el estado y Redux
    setOperations({
      dailyStats: updatedDailyStats,
      monthlyStats: updatedMonthlyStats,
      yearlyStats: updatedYearlyStats,
    });
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

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar los datos</p>;

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
              <CTableDataCell style={tableCellStyle} colSpan={13}>No hay operaciones registradas</CTableDataCell>
            </CTableRow>
          ) : (
            operations.yearlyStats.map((yearlyStat) =>
              yearlyStat.operations.map((op) => (
                <CTableRow key={op.id} style={tableCellStyle}>
                  <CTableDataCell style={tableCellStyle}>{op.fechaHora}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.activo}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.tipoOperacion}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.cantidad}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.precioEntrada}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.precioSalida}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.stopLoss}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.takeProfit}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.gananciaPerdida}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.roi}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.razonEntrada}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.emocion}</CTableDataCell>
                  <CTableDataCell style={tableCellStyle}>{op.errores}</CTableDataCell>
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
