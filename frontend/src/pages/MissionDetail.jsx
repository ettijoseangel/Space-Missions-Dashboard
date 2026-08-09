import { useParams } from "react-router-dom";

export const MissionDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalle de la Misión</h2>
      <p>Mostrando información para la misión ID: {id} </p>
    </div>
  );
};
