    import Spinner from "../../components/Spinner";
    import { useGetStatsQuery } from "../../date/firebaseApi";
    import { useEffect, useState } from "react";

    const RoiOperations = () => {
        const { data: operation, isLoading } = useGetStatsQuery();
        const [operations, setOperations] = useState([]);
        const [roiAverage, setRoiAverage] = useState(0);

        useEffect(() => {
            if (operation) {
                const ops = operation.yearlyStats[0].operations;
                setOperations(ops);            
                if (ops.length > 0) {
                    const totalROI = ops.reduce((acc, op) => acc + parseFloat(op.roi), 0);
                    setRoiAverage(totalROI / ops.length);
                }    }
        }, [operation]);

        if (isLoading) {
            return <Spinner />;
        }

        return (
            <div className="container">
                <h1 className="text-center mt-2" style={{ color: "#e0003d" }}>
                    ROI de las operaciones: {roiAverage.toFixed(2)}%
                </h1>
                <ul style={{ color: "#e0003d", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} >
                    {operations.map((op, index) => (
                        <li key={index}>Operación {index + 1}: {op.roi}%</li>
                    ))}
                </ul>
            </div>
        );
    };

    export default RoiOperations;
